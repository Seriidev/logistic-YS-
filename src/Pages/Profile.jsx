import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import toast, { Toaster } from "react-hot-toast";
import Footer from "../components/Footer";
import PhoneInputField from "../components/PhoneInputField";
import { api } from "../utils/api";
import { logoutUser, isAuthenticated } from "../utils/auth";

function StatusPill({ status }) {
  const style = useMemo(() => {
    const s = (status || "").toLowerCase();
    if (s.includes("deliver")) return { bg: "bg-green-50", text: "text-green-700", dot: "bg-green-500" };
    if (s.includes("transit")) return { bg: "bg-blue-50", text: "text-blue-700", dot: "bg-blue-500" };
    if (s.includes("process")) return { bg: "bg-amber-50", text: "text-amber-700", dot: "bg-amber-500" };
    return { bg: "bg-gray-100", text: "text-gray-700", dot: "bg-gray-400" };
  }, [status]);

  return (
    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${style.bg} ${style.text}`}>
      <span className={`w-2 h-2 rounded-full ${style.dot}`} />
      {status}
    </span>
  );
}

export default function ProfilePage() {
  const { t } = useTranslation("profile");
  const [user, setUser] = useState(null);
  const [shipments, setShipments] = useState([]);
  const [totalShipments, setTotalShipments] = useState(0);
  const [shipmentStats, setShipmentStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [wallet, setWallet] = useState(null);
  const [walletLoading, setWalletLoading] = useState(true);
  const [walletUnavailable, setWalletUnavailable] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [showTxHistory, setShowTxHistory] = useState(false);
  const [transferOpen, setTransferOpen] = useState(false);
  const [toUserId, setToUserId] = useState("");
  const [amount, setAmount] = useState("");
  const [transferring, setTransferring] = useState(false);

  // Load user data from API
  useEffect(() => {
    if (!isAuthenticated()) {
      window.location.href = "/login";
      return;
    }
    setWalletLoading(true);
    Promise.all([
      api("/auth/me"),
      api("/shipments?limit=3&page=1"),
      api("/wallet/me").catch((err) => ({ __walletError: err })),
      api("/wallet/transactions?limit=3").catch(() => ({ data: [] })),
      api("/shipments/stats").catch((err) => ({ __statsError: err })),
    ])
      .then(([me, shipmentsData, walletData, txData, statsData]) => {
        setUser({
          id: me.data?.id || "",
          firstName: me.data?.firstName || "",
          lastName: me.data?.lastName || "",
          email: me.data?.email || me.email || "",
          phone: me.data?.phone || me.phone || "",
          country: me.data?.country || me.country || "",
          city: me.data?.city || me.city || "",
          address: me.data?.address || me.address || "",
        });
        setShipments(shipmentsData.data?.data || []);
        setTotalShipments(shipmentsData.data?.meta?.total ?? 0);

        if (walletData?.__walletError) {
          const err = walletData.__walletError;
          const is403 = err?.statusCode === 403 || err?.status === 403;
          if (is403 || err) {
            setWalletUnavailable(true);
            setWallet(null);
          }
        } else {
          setWalletUnavailable(false);
          setWallet(walletData?.data || null);
        }

        const txList = Array.isArray(txData?.data?.data)
          ? txData.data.data
          : Array.isArray(txData?.data)
            ? txData.data
            : [];
        setTransactions(txList.slice(0, 3));

        console.log("shipments/stats response:", statsData);
        if (!statsData?.__statsError) {
          setShipmentStats(statsData?.data ?? statsData ?? null);
        }
      })
      .catch(() => setError("Failed to load profile"))
      .finally(() => {
        setLoading(false);
        setWalletLoading(false);
      });
  }, []);

  const refreshWallet = async () => {
    try {
      const walletData = await api("/wallet/me");
      setWalletUnavailable(false);
      setWallet(walletData?.data || null);
      const txData = await api("/wallet/transactions?limit=3");
      const txList = Array.isArray(txData?.data?.data)
        ? txData.data.data
        : Array.isArray(txData?.data)
          ? txData.data
          : [];
      setTransactions(txList.slice(0, 3));
    } catch (_) {
      /* keep current wallet state */
    }
  };

  const onTransfer = async () => {
    setTransferring(true);
    try {
      await api("/wallet/transfer", {
        method: "POST",
        body: JSON.stringify({
          toUserId: toUserId.trim(),
          amount: Number(amount),
        }),
      });
      toast.success("Transfer successful!");
      setTransferOpen(false);
      setToUserId("");
      setAmount("");
      await refreshWallet();
    } catch (err) {
      toast.error(err?.message || "Transfer failed");
    } finally {
      setTransferring(false);
    }
  };

  const stats = useMemo(() => {
    if (shipmentStats) {
      return {
        total: Number(shipmentStats?.total ?? shipmentStats?.totalShipments ?? 0) || 0,
        inTransit: Number(shipmentStats?.inTransit ?? shipmentStats?.in_transit ?? 0) || 0,
        delivered: Number(shipmentStats?.delivered ?? 0) || 0,
      };
    }
    const inTransit = shipments.filter((s) => String(s.status || "").toLowerCase().includes("transit")).length;
    const delivered = shipments.filter((s) => String(s.status || "").toLowerCase().includes("deliver")).length;
    return { total: totalShipments, inTransit, delivered };
  }, [shipments, totalShipments, shipmentStats]);

  const initials = useMemo(() => {
    if (!user) return "U";
    const a = (user.firstName || "").trim()[0] || "U";
    const b = (user.lastName || "").trim()[0] || "";
    return (a + b).toUpperCase();
  }, [user]);

  const onSave = async () => {
    setSaving(true);
    try {
      await api("/auth/me", {
        method: "PATCH",
        body: JSON.stringify({
          firstName: user.firstName || "",
          lastName: user.lastName || "",
          phone: user.phone || "",
          country: user.country || "",
          city: user.city || "",
          address: user.address || "",
        }),
      });
      toast.success("Profile saved!");
    } catch (err) {
      toast.error("Failed to save. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-500">Loading...</div>
      </div>
    );

  if (!user) return null;

  return (
    <>
      <section className="page-container py-4 sm:py-6 min-w-0">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <a href="/" className="hover:text-blue-500 no-underline text-gray-500">
            {t("common:common.main")}
          </a>
          <span>›</span>
          <span className="text-gray-900 font-medium">{t("breadcrumb.title")}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="bg-gray-50 rounded-2xl sm:rounded-3xl p-5 sm:p-8">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-blue-500 text-white flex items-center justify-center font-extrabold text-lg">
                  {initials}
                </div>
                <div className="min-w-0">
                  <p className="text-base font-bold text-gray-900 truncate">
                    {`${user.firstName || ""} ${user.lastName || ""}`.trim()}
                  </p>
                  <p className="text-sm text-gray-500 truncate">{user.email}</p>
                </div>
              </div>

              <div className="h-px bg-gray-200 my-6" />

              <div className="grid grid-cols-3 gap-2 sm:gap-3 min-w-0">
                <div className="bg-white rounded-xl sm:rounded-2xl p-2.5 sm:p-4 min-w-0">
                  <p className="text-[10px] sm:text-xs text-gray-400 truncate">{t("stats.total")}</p>
                  <p className="text-lg sm:text-xl font-extrabold text-gray-900 mt-1">{stats.total}</p>
                </div>
                <div className="bg-white rounded-xl sm:rounded-2xl p-2.5 sm:p-4 min-w-0">
                  <p className="text-[10px] sm:text-xs text-gray-400 truncate">{t("stats.inTransit")}</p>
                  <p className="text-lg sm:text-xl font-extrabold text-gray-900 mt-1">{stats.inTransit}</p>
                </div>
                <div className="bg-white rounded-xl sm:rounded-2xl p-2.5 sm:p-4 min-w-0">
                  <p className="text-[10px] sm:text-xs text-gray-400 truncate">{t("stats.delivered")}</p>
                  <p className="text-lg sm:text-xl font-extrabold text-gray-900 mt-1">{stats.delivered}</p>
                </div>
              </div>

              <div className="h-px bg-gray-200 my-6" />

              <div className="flex flex-col gap-3">
                <button
                  className="w-full bg-white text-red-600 text-sm font-semibold px-4 py-3 rounded-2xl border border-red-100 cursor-pointer hover:bg-red-50 transition-colors"
                  onClick={async () => {
                    await logoutUser();
                    window.location.href = "/login";
                  }}
                >
                  {t("actions.logout")}
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={onSave}
              disabled={saving}
              className="w-full min-h-[44px] bg-blue-500 text-white text-xs font-bold uppercase tracking-widest px-6 py-2.5 rounded-full border-none cursor-pointer hover:bg-blue-600 transition-colors duration-150 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {saving ? t("saving") : t("save")}
            </button>
          </div>

          <div className="lg:col-span-8 flex flex-col gap-6">
            <div className="rounded-2xl shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white p-5 sm:p-8">
              {walletLoading ? (
                <p className="text-white/90 text-sm font-medium">Loading wallet...</p>
              ) : walletUnavailable ? (
                <p className="text-white/90 text-sm font-medium">Wallet unavailable</p>
              ) : (
                <>
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <h2 className="text-xl sm:text-2xl font-bold">
                      My Wallet
                    </h2>
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-white/20 text-xs font-bold tracking-wide">
                      {wallet?.currency || "USD"}
                    </span>
                  </div>

                  <p className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                    ${Number(wallet?.balance ?? 0).toFixed(2)}
                  </p>
                  <p className="text-sm text-white/80 mt-1.5 font-medium">
                    Bonus: ${Number(wallet?.bonusBalance ?? 0).toFixed(2)}
                  </p>

                  <div className="flex items-center justify-between gap-3 mt-1.5">
                    <p className="text-sm text-white/80 font-medium min-w-0 truncate">
                      Your ID: {user?.id}
                    </p>
                    <button
                      type="button"
                      onClick={async () => {
                        try {
                          await navigator.clipboard.writeText(String(user?.id || ""));
                          toast.success("Copied!");
                        } catch (_) {
                          toast.error("Failed to copy");
                        }
                      }}
                      className="text-sm font-semibold text-white/90 underline underline-offset-2 bg-transparent border-none cursor-pointer hover:text-white shrink-0"
                    >
                      copy ID
                    </button>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 mt-6">
                    <button
                      type="button"
                      onClick={() => setTransferOpen(true)}
                      className="w-full sm:w-auto min-h-[44px] px-5 py-2.5 rounded-full bg-white text-blue-600 text-sm font-bold border-none cursor-pointer hover:bg-blue-50 transition-colors"
                    >
                      Transfer Funds
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowTxHistory((v) => !v)}
                      className="w-full sm:w-auto text-left sm:text-center text-sm font-semibold text-white/90 underline underline-offset-2 bg-transparent border-none cursor-pointer hover:text-white"
                    >
                      Transaction History
                    </button>
                  </div>

                  {showTxHistory && (
                    <div className="mt-5 pt-4 border-t border-white/20 flex flex-col gap-2">
                      {transactions.length === 0 ? (
                        <p className="text-sm text-white/70">No recent transactions</p>
                      ) : (
                        transactions.map((tx, i) => (
                          <div
                            key={tx.id || i}
                            className="flex items-center justify-between gap-3 bg-white/10 rounded-xl px-3.5 py-2.5"
                          >
                            <div className="min-w-0">
                              <p className="text-sm font-semibold truncate">
                                {tx.type || tx.description || "Transaction"}
                              </p>
                              {(tx.createdAt || tx.date) && (
                                <p className="text-xs text-white/70 mt-0.5">
                                  {new Date(tx.createdAt || tx.date).toLocaleDateString()}
                                </p>
                              )}
                            </div>
                            <p className="text-sm font-bold shrink-0">
                              ${Number(tx.amount ?? 0).toFixed(2)}
                            </p>
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </>
              )}
            </div>

            <div className="bg-gray-50 rounded-2xl sm:rounded-3xl p-5 sm:p-8">
              <h2 className="text-base font-bold text-gray-900 mb-5">{t("personalDetails")}</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="flex flex-col gap-2">
                  <span className="text-xs font-semibold text-gray-500">{t("fields.firstName")}</span>
                  <input
                    value={user.firstName}
                    onChange={(e) => setUser((u) => ({ ...u, firstName: e.target.value }))}
                    className="h-11 px-4 rounded-2xl bg-white border border-gray-200 outline-none text-sm text-gray-900 focus:border-blue-400"
                  />
                </label>

                <label className="flex flex-col gap-2">
                  <span className="text-xs font-semibold text-gray-500">{t("fields.lastName")}</span>
                  <input
                    value={user.lastName}
                    onChange={(e) => setUser((u) => ({ ...u, lastName: e.target.value }))}
                    className="h-11 px-4 rounded-2xl bg-white border border-gray-200 outline-none text-sm text-gray-900 focus:border-blue-400"
                  />
                </label>

                <label className="flex flex-col gap-2">
                  <span className="text-xs font-semibold text-gray-500">{t("fields.email")}</span>
                  <input
                    value={user.email}
                    onChange={(e) => setUser((u) => ({ ...u, email: e.target.value }))}
                    className="h-11 px-4 rounded-2xl bg-white border border-gray-200 outline-none text-sm text-gray-900 focus:border-blue-400"
                  />
                </label>

                <PhoneInputField
                  label={t("fields.phone")}
                  variant="default"
                  value={user.phone}
                  onChange={(v) => setUser((u) => ({ ...u, phone: v }))}
                  className="[&_label]:text-xs [&_label]:font-semibold [&_label]:text-gray-500"
                />

                <label className="flex flex-col gap-2">
                  <span className="text-xs font-semibold text-gray-500">{t("fields.country")}</span>
                  <input
                    value={user.country}
                    onChange={(e) => setUser((u) => ({ ...u, country: e.target.value }))}
                    className="h-11 px-4 rounded-2xl bg-white border border-gray-200 outline-none text-sm text-gray-900 focus:border-blue-400"
                  />
                </label>

                <label className="flex flex-col gap-2">
                  <span className="text-xs font-semibold text-gray-500">{t("fields.city")}</span>
                  <input
                    value={user.city}
                    onChange={(e) => setUser((u) => ({ ...u, city: e.target.value }))}
                    className="h-11 px-4 rounded-2xl bg-white border border-gray-200 outline-none text-sm text-gray-900 focus:border-blue-400"
                  />
                </label>

                <label className="flex flex-col gap-2 md:col-span-2">
                  <span className="text-xs font-semibold text-gray-500">{t("fields.address")}</span>
                  <input
                    value={user.address}
                    onChange={(e) => setUser((u) => ({ ...u, address: e.target.value }))}
                    className="h-11 px-4 rounded-2xl bg-white border border-gray-200 outline-none text-sm text-gray-900 focus:border-blue-400"
                  />
                </label>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl sm:rounded-3xl p-5 sm:p-8">
              <div className="flex items-center justify-between gap-4 mb-5">
                <h2 className="text-base font-bold text-gray-900">{t("shipments.title")}</h2>
                <a href="/track" className="text-sm font-semibold text-blue-500 no-underline hover:text-blue-600">
                  {t("shipments.goToTracking")}
                </a>
              </div>

              <div className="flex flex-col gap-3">
                {shipments.map((s) => (
                  <div key={s.id} className="bg-white border border-gray-200 rounded-2xl p-4 flex flex-col md:flex-row md:items-center gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-gray-900">{s.trackingNumber}</p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {s.sender?.city} → {s.recipient?.city}
                      </p>
                    </div>
                    <div className="flex items-center justify-between md:justify-end gap-3">
                      <StatusPill status={s.status} />
                      <button
                        className="text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full border-none cursor-pointer bg-gray-100 hover:bg-gray-200 transition-colors"
                        onClick={() => { window.location.href = `/shipments/${s.id}`; }}
                      >
                        {t("shipments.details")}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {transferOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <button
            type="button"
            className="absolute inset-0 bg-black/40 border-none cursor-pointer"
            onClick={() => setTransferOpen(false)}
            aria-label="Close"
          />
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-xl p-5 sm:p-6">
            <div className="flex items-center justify-between gap-3 mb-5">
              <h3 className="text-lg font-bold text-gray-900">Transfer Funds</h3>
              <button
                type="button"
                onClick={() => setTransferOpen(false)}
                className="w-9 h-9 rounded-xl bg-gray-100 text-gray-700 border-none cursor-pointer hover:bg-gray-200 text-lg leading-none"
                aria-label="Close"
              >
                ×
              </button>
            </div>

            <label className="flex flex-col gap-2 mb-4">
              <span className="text-xs font-semibold text-gray-500">Recipient User ID</span>
              <input
                value={toUserId}
                onChange={(e) => setToUserId(e.target.value)}
                className="h-11 px-4 rounded-2xl bg-white border border-gray-200 outline-none text-sm text-gray-900 focus:border-blue-400"
                placeholder="User ID"
              />
            </label>

            <label className="flex flex-col gap-2 mb-6">
              <span className="text-xs font-semibold text-gray-500">Amount ($)</span>
              <input
                type="number"
                min="0"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="h-11 px-4 rounded-2xl bg-white border border-gray-200 outline-none text-sm text-gray-900 focus:border-blue-400"
                placeholder="0.00"
              />
            </label>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setTransferOpen(false)}
                className="flex-1 h-11 rounded-full border border-gray-200 bg-white text-sm font-semibold text-gray-900 cursor-pointer hover:bg-gray-50"
              >
                Close
              </button>
              <button
                type="button"
                onClick={onTransfer}
                disabled={transferring || !toUserId.trim() || !amount}
                className="flex-1 h-11 rounded-full border-none bg-blue-500 text-white text-sm font-semibold cursor-pointer hover:bg-blue-600 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {transferring ? "Sending..." : "Send"}
              </button>
            </div>
          </div>
        </div>
      )}

      <Toaster position="top-right" />
    </>
  );
}
