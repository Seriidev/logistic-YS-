import { useTranslation } from "react-i18next";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { calculateEconomyPrice } from "../utils/calculateEconomyPrice";
import { calculateExpressPrice } from "../utils/calculateExpressPrice";

function money(n) {
  return `$${Number(n).toFixed(2)}`;
}

function ServiceQuoteCard({ title, quote, selected, onSelect, t }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`text-left bg-white border rounded-2xl p-5 shadow-sm flex flex-col gap-3 min-w-0 cursor-pointer transition-all duration-200 font-[inherit]
        ${selected
          ? "border-blue-500 ring-4 ring-blue-500/15 bg-blue-50/40"
          : "border-gray-100 hover:border-blue-300"
        }`}
    >
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-sm font-bold text-gray-900">{title}</h3>
        {selected && (
          <span className="inline-flex px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-[10px] font-bold uppercase tracking-wider">
            Selected
          </span>
        )}
      </div>
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs text-gray-500">{t("priceCalculator.deliveryTime", { ns: "booking", defaultValue: "Delivery time" })}</span>
        <span className="text-sm font-bold text-blue-500 text-right">
          {t(quote.deliveryTimeKey)}
        </span>
      </div>
      <div className="h-px bg-gray-100" />
      {/* TODO: these labels approximate Zhang Tao's requested breakdown using our existing formula's fields; swap for real carrier-fee fields once a real quote API exists */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs text-gray-500">Origin Pickup</span>
          <span className="text-sm font-medium text-gray-900">{money(quote.baseFee)}</span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs text-gray-500">YuuSell Freight</span>
          <span className="text-sm font-medium text-gray-900">{money(quote.weightFee)}</span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs text-gray-500">Destination Delivery</span>
          <span className="text-sm font-medium text-gray-900">{money(quote.distanceFee)}</span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs text-gray-500">Fuel + Fees</span>
          <span className="text-sm font-medium text-gray-900">{money(quote.insuranceFee)}</span>
        </div>
        <div className="h-px bg-gray-100" />
        <div className="flex items-center justify-between gap-2">
          <span className="text-sm font-bold text-gray-900">Total</span>
          <span className="text-lg font-bold text-teal-500">{money(quote.total)}</span>
        </div>
      </div>
    </button>
  );
}

export default function PriceConfirmation({
  formData,
  service,
  breakdown,
  onSelectService,
  termsAccepted,
  onTermsChange,
  onBack,
  onCancel,
  onContinue,
}) {
  const { t } = useTranslation(["airCargoBooking", "booking"]);

  const quotePayload = {
    ...formData,
    paymentFee: 0,
  };
  const economyQuote = calculateEconomyPrice(quotePayload);
  const expressQuote = calculateExpressPrice(quotePayload);

  const totalInvalid = !Number.isFinite(breakdown?.total) || breakdown.total === 0;

  const fromCountry = formData?.fromCountry || "—";
  const zipCode = formData?.zipCode || "—";
  const destinationCountry = formData?.destinationCountry || "—";
  const weight = formData?.weight || "—";

  if (totalInvalid) {
    return (
      <div className="animate-[fadeIn_0.3s_ease-out] max-w-3xl mx-auto">
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 sm:p-6 flex flex-col gap-4">
          <p className="text-sm text-amber-900">
            No price quote found. Please go back and complete the shipment details first.
          </p>
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center justify-center gap-2 self-start min-h-[44px] px-6 py-2.5 rounded-full border border-amber-300
              bg-white text-amber-900 text-sm font-semibold cursor-pointer hover:bg-amber-100 transition-colors font-[inherit]"
          >
            <LuChevronLeft className="h-4 w-4" />
            ← Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-[fadeIn_0.3s_ease-out] max-w-4xl mx-auto flex flex-col gap-5 sm:gap-6">
      <div className="bg-teal-50 border border-teal-100 rounded-2xl px-4 py-3 sm:px-5 sm:py-3.5">
        <p className="text-sm font-semibold text-teal-800 text-center sm:text-left">
          {fromCountry}, {zipCode} → {destinationCountry} · {weight}kg · AIR
        </p>
      </div>

      <div className="text-center">
        <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-blue-500 mb-2">
          {t("steps.stepOf", { ns: "booking", current: 2, total: 5 })}
        </p>
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-gray-900 mb-2">
          {t("steps.priceConfirmation", { ns: "booking" })}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ServiceQuoteCard
          title="Economy"
          quote={economyQuote}
          selected={service === "economy"}
          onSelect={() => onSelectService("economy")}
          t={t}
        />
        <ServiceQuoteCard
          title="Express"
          quote={expressQuote}
          selected={service === "express"}
          onSelect={() => onSelectService("express")}
          t={t}
        />
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex flex-col gap-3 min-w-0">
        <h3 className="text-sm font-bold text-gray-900">
          {service === "express" ? "Express" : "Economy"} breakdown
        </h3>
        {/* TODO: these labels approximate Zhang Tao's requested breakdown using our existing formula's fields; swap for real carrier-fee fields once a real quote API exists */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs text-gray-500">Origin Pickup</span>
            <span className="text-sm font-medium text-gray-900">{money(breakdown.baseFee)}</span>
          </div>
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs text-gray-500">YuuSell Freight</span>
            <span className="text-sm font-medium text-gray-900">{money(breakdown.weightFee)}</span>
          </div>
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs text-gray-500">Destination Delivery</span>
            <span className="text-sm font-medium text-gray-900">{money(breakdown.distanceFee)}</span>
          </div>
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs text-gray-500">Fuel Surcharge</span>
            <span className="text-sm font-medium text-gray-900">{money(breakdown.insuranceFee)}</span>
          </div>
          <div className="h-px bg-gray-100" />
          <div className="flex items-center justify-between gap-2">
            <span className="text-sm font-bold text-gray-900">Total Due</span>
            <span className="text-lg font-bold text-teal-500">{money(breakdown.total)}</span>
          </div>
        </div>
      </div>

      <label className="flex items-start gap-3 cursor-pointer select-none">
        <input
          type="checkbox"
          checked={!!termsAccepted}
          onChange={(e) => onTermsChange(e.target.checked)}
          className="mt-0.5 accent-blue-500 w-4 h-4 shrink-0"
        />
        <span className="text-sm text-gray-700">
          I agree to YuuSell Terms &amp; Conditions
        </span>
      </label>

      <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center justify-center gap-2 min-h-[44px] px-6 py-2.5 rounded-full border border-gray-200
              bg-white text-gray-700 text-sm font-semibold cursor-pointer hover:border-gray-300 hover:bg-gray-50 transition-colors font-[inherit]"
          >
            <LuChevronLeft className="h-4 w-4" />
            ← Back
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex items-center justify-center min-h-[44px] px-6 py-2.5 rounded-full border border-gray-200
              bg-white text-gray-500 text-sm font-semibold cursor-pointer hover:border-gray-300 hover:bg-gray-50 transition-colors font-[inherit]"
          >
            Cancel Request
          </button>
        </div>
        <button
          type="button"
          onClick={onContinue}
          disabled={!termsAccepted}
          className="inline-flex items-center justify-center gap-2 min-h-[44px] px-6 sm:px-8 py-3 rounded-full bg-blue-500 text-white text-sm font-bold
            uppercase tracking-wider border-none cursor-pointer hover:bg-blue-600 transition-colors font-[inherit]
            disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Accept &amp; Continue to Payment
          <LuChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
