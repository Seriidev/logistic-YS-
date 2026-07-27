import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
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
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  // Load user data from API
  useEffect(() => {
    if (!isAuthenticated()) {
      window.location.href = "/login";
      return;
    }
    Promise.all([api("/auth/me"), api("/shipments?limit=3&page=1")])
      .then(([me, shipmentsData]) => {
        setUser({
          fullName: me.name || me.email,
          email: me.email,
          phone: me.phone || "",
          country: me.country || "",
          city: me.city || "",
          address: me.address || "",
        });
        setShipments(shipmentsData.data?.data || []);
      })
      .catch(() => setError("Failed to load profile"))
      .finally(() => setLoading(false));
  }, []);

  const stats = useMemo(() => {
    const inTransit = shipments.filter((s) => String(s.status || "").toLowerCase().includes("transit")).length;
    const delivered = shipments.filter((s) => String(s.status || "").toLowerCase().includes("deliver")).length;
    return { total: shipments.length, inTransit, delivered };
  }, [shipments]);

  const initials = useMemo(() => {
    if (!user) return "U";
    const parts = (user.fullName || "").trim().split(/\s+/).filter(Boolean);
    const a = parts[0]?.[0] || "U";
    const b = parts[1]?.[0] || "";
    return (a + b).toUpperCase();
  }, [user]);

  const onSave = async () => {
    setSaving(true);
    try {
      await api("/auth/me", {
        method: "PUT",
        body: JSON.stringify({
          name: user.fullName,
          phone: user.phone,
          country: user.country,
          city: user.city,
          address: user.address,
        }),
      });
      alert("Saved!");
    } catch (err) {
      alert("Failed to save. Please try again.");
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

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">{t("title")}</h1>
            <p className="text-sm text-gray-500 mt-1">{t("subtitle")}</p>
          </div>
          <button
            onClick={onSave}
            disabled={saving}
            className="w-full sm:w-fit min-h-[44px] bg-blue-500 text-white text-xs font-bold uppercase tracking-widest px-6 sm:px-8 py-2.5 rounded-full border-none cursor-pointer hover:bg-blue-600 transition-colors duration-150 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {saving ? t("saving") : t("save")}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-4">
            <div className="bg-gray-50 rounded-2xl sm:rounded-3xl p-5 sm:p-8">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-blue-500 text-white flex items-center justify-center font-extrabold text-lg">
                  {initials}
                </div>
                <div className="min-w-0">
                  <p className="text-base font-bold text-gray-900 truncate">{user.fullName}</p>
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
                  className="w-full bg-white text-gray-900 text-sm font-semibold px-4 py-3 rounded-2xl border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => alert(t("actions.notificationsStub"))}
                >
                  {t("actions.notifications")}
                </button>
                <button
                  className="w-full bg-white text-gray-900 text-sm font-semibold px-4 py-3 rounded-2xl border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => alert(t("actions.securityStub"))}
                >
                  {t("actions.security")}
                </button>
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
          </div>

          <div className="lg:col-span-8 flex flex-col gap-6">
            <div className="bg-gray-50 rounded-2xl sm:rounded-3xl p-5 sm:p-8">
              <h2 className="text-base font-bold text-gray-900 mb-5">{t("personalDetails")}</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="flex flex-col gap-2">
                  <span className="text-xs font-semibold text-gray-500">{t("fields.fullName")}</span>
                  <input
                    value={user.fullName}
                    onChange={(e) => setUser((u) => ({ ...u, fullName: e.target.value }))}
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
                        onClick={() => alert(t("shipments.detailsStub", { id: s.id }))}
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
    </>
  );
}
