import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LuCheck, LuCopy, LuQrCode } from "react-icons/lu";

export default function StepSuccess({ trackingId, onCopy }) {
  const { t } = useTranslation("shipment");

  return (
    <div className="flex flex-col items-center text-center py-8 sm:py-12 px-4 max-w-lg mx-auto">
      <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mb-6">
        <LuCheck className="w-10 h-10 text-emerald-500" strokeWidth={2.5} aria-hidden="true" />
      </div>

      <h2 className="text-2xl sm:text-3xl font-bold text-[#1e2a4a] mb-4">
        {t("success.title")}
      </h2>

      <div className="flex items-center justify-center gap-2 mb-3 flex-wrap">
        <span className="text-lg sm:text-xl font-bold text-blue-500 tracking-wide">{trackingId}</span>
        <button
          type="button"
          onClick={onCopy}
          aria-label={t("success.copyTrackingAria")}
          className="w-8 h-8 rounded-lg bg-gray-100 border-none cursor-pointer hover:bg-gray-200 transition-colors flex items-center justify-center"
        >
          <LuCopy className="w-4 h-4" aria-hidden />
        </button>
      </div>

      <p className="text-sm text-gray-500 mb-8">
        {t("success.pickupHint")}
      </p>

      <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto mb-10">
        <button
          type="button"
          className="inline-flex items-center justify-center gap-2 min-h-[44px] px-6 py-3 rounded-full bg-blue-500 text-white text-xs font-bold uppercase tracking-wider border-none cursor-pointer hover:bg-blue-600 transition-colors font-[inherit]"
        >
          {t("success.downloadPdf")}
          <span aria-hidden="true">↓</span>
        </button>
        <Link
          to="/track"
          className="inline-flex items-center justify-center gap-2 min-h-[44px] px-6 py-3 rounded-full bg-blue-100 text-blue-600 text-xs font-bold uppercase tracking-wider no-underline hover:bg-blue-200 transition-colors"
        >
          {t("success.viewShipments")}
          <span aria-hidden="true">→</span>
        </Link>
      </div>

      <div className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm w-full max-w-sm">
        <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
          <LuQrCode className="w-16 h-16 text-blue-700" aria-hidden="true" />
        </div>
        <p className="text-sm font-medium text-gray-700 text-left">{t("success.qrHint")}</p>
      </div>
    </div>
  );
}
