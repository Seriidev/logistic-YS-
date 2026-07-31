import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Footer from "../../components/Footer";
import { api } from "../../utils/api";
import { isAuthenticated } from "../../utils/auth";

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
      {status || "—"}
    </span>
  );
}

function DetailRow({ label, value }) {
  return (
    <div className="min-w-0">
      <p className="text-xs font-semibold text-gray-500 mb-1">{label}</p>
      <p className="text-sm font-medium text-gray-900 break-words">{value ?? "—"}</p>
    </div>
  );
}

export default function ShipmentDetailsPage() {
  const { id } = useParams();
  const [shipment, setShipment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isAuthenticated()) {
      window.location.href = "/login";
      return;
    }
    if (!id) {
      setError("Shipment not found");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    api(`/shipments/${id}`)
      .then((res) => {
        setShipment(res?.data || res || null);
      })
      .catch((err) => {
        setError(err?.message || "Failed to load shipment");
        setShipment(null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-500">Loading shipment...</div>
      </div>
    );
  }

  return (
    <>
      <section className="page-container py-4 sm:py-6 min-w-0">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link to="/profile" className="hover:text-blue-500 no-underline text-gray-500">
            ← Back to Profile
          </Link>
        </div>

        {error || !shipment ? (
          <div className="bg-gray-50 rounded-2xl sm:rounded-3xl p-5 sm:p-8">
            <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-2">Shipment unavailable</h1>
            <p className="text-sm text-gray-500">{error || "Shipment not found"}</p>
            <Link
              to="/profile"
              className="inline-flex mt-5 min-h-[44px] items-center px-6 py-2.5 rounded-full bg-blue-500 text-white text-xs font-bold uppercase tracking-widest no-underline hover:bg-blue-600"
            >
              Back to Profile
            </Link>
          </div>
        ) : (
          <div className="bg-gray-50 rounded-2xl sm:rounded-3xl p-5 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
              <div className="min-w-0">
                <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">Tracking number</p>
                <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 break-all">
                  {shipment.trackingNumber || "—"}
                </h1>
              </div>
              <StatusPill status={shipment.status} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
              <DetailRow label="Type" value={shipment.type} />
              <DetailRow label="Status" value={shipment.status} />
              <DetailRow label="Recipient name" value={shipment.recipientName} />
              <DetailRow label="Recipient email" value={shipment.recipientEmail} />
              <DetailRow label="Origin address" value={shipment.originAddress} />
              <DetailRow label="Destination address" value={shipment.destinationAddress} />
              <DetailRow label="Weight" value={shipment.weight != null ? `${shipment.weight} kg` : null} />
              <DetailRow label="Dimensions" value={shipment.dimensions} />
              <DetailRow label="Quantity" value={shipment.quantity} />
              <DetailRow
                label="Declared value"
                value={
                  shipment.declaredValue != null
                    ? `$${Number(shipment.declaredValue).toFixed(2)}`
                    : null
                }
              />
              <DetailRow
                label="Shipping cost"
                value={
                  shipment.shippingCost != null
                    ? `$${Number(shipment.shippingCost).toFixed(2)} ${shipment.currency || "USD"}`
                    : null
                }
              />
              <DetailRow
                label="Created"
                value={
                  shipment.createdAt
                    ? new Date(shipment.createdAt).toLocaleString()
                    : null
                }
              />
              <div className="sm:col-span-2 min-w-0">
                <DetailRow label="Description" value={shipment.description} />
              </div>
              <div className="sm:col-span-2 min-w-0">
                <DetailRow label="Notes" value={shipment.notes} />
              </div>
            </div>
          </div>
        )}
      </section>
      <Footer />
    </>
  );
}
