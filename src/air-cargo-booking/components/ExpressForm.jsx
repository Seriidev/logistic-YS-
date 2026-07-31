import { useTranslation } from "react-i18next";
import PriceCalculator from "./PriceCalculator";
import { getBreakdown } from "../utils/getBreakdown";

const SERVICE = "express";

const inputClass =
  "w-full h-11 sm:h-12 px-4 rounded-xl border border-gray-200 text-sm text-gray-900 outline-none bg-white focus:border-blue-400 transition-colors min-w-0 font-[inherit]";
const labelClass = "text-sm font-medium text-gray-700 mb-1.5 block";

function isValid(form) {
  const req = (v) => Boolean(String(v || "").trim());
  return (
    req(form.fromCountry) &&
    req(form.zipCode) &&
    req(form.destinationCountry) &&
    req(form.weight) &&
    req(form.length) &&
    req(form.width) &&
    req(form.height) &&
    req(form.recipientName) &&
    req(form.recipientEmail)
  );
}

export default function ExpressForm({ formData, onChange, onNext }) {
  const { t } = useTranslation(["airCargoBooking", "booking"]);
  const update = (field) => (e) => onChange(field, e.target.value);
  const breakdown = getBreakdown(SERVICE, formData);
  const valid = isValid(formData);
  const deliveryTime = t(breakdown.deliveryTimeKey);

  return (
    <div className="animate-[fadeIn_0.3s_ease-out]">
      <div className="text-center mb-6 sm:mb-8">
        <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-blue-500 mb-2">
          {t("services.express.eyebrow")}
        </p>
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-gray-900 mb-2">
          {t("steps.shipmentDetails", { ns: "booking" })}
        </h2>
        <p className="text-sm sm:text-base text-gray-500 max-w-xl mx-auto">
          {t("services.express.description", { deliveryTime })}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto items-start">
        <form
          onSubmit={(e) => { e.preventDefault(); if (valid) onNext(); }}
          className="lg:col-span-2 bg-white rounded-2xl sm:rounded-3xl border border-gray-100 shadow-sm p-5 sm:p-7 lg:p-8 min-w-0"
        >
          <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">
            {t("form.sections.route", { ns: "booking" })}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mb-6">
            <div className="min-w-0">
              <label htmlFor="fromCountry" className={labelClass}>{t("form.fields.fromCountry", { ns: "booking" })}</label>
              <input id="fromCountry" type="text" placeholder={t("form.placeholders.fromCountry", { ns: "booking" })}
                value={formData.fromCountry || ""} onChange={update("fromCountry")} className={inputClass} />
            </div>
            <div className="min-w-0">
              <label htmlFor="zipCode" className={labelClass}>{t("form.fields.zipCode", { ns: "booking" })}</label>
              <input id="zipCode" type="text" placeholder={t("form.placeholders.zipCode", { ns: "booking" })}
                value={formData.zipCode || ""} onChange={update("zipCode")} className={inputClass} />
            </div>
            <div className="min-w-0 sm:col-span-2">
              <label htmlFor="destinationCountry" className={labelClass}>{t("form.fields.destinationCountry", { ns: "booking" })}</label>
              <input id="destinationCountry" type="text" placeholder={t("form.placeholders.destinationCountry", { ns: "booking" })}
                value={formData.destinationCountry || ""} onChange={update("destinationCountry")} className={inputClass} />
            </div>
          </div>

          <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">
            {t("form.sections.package", { ns: "booking" })}
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
            <div className="min-w-0">
              <label htmlFor="weight" className={labelClass}>{t("form.fields.weight", { ns: "booking" })}</label>
              <input id="weight" type="number" min="0" step="0.1" placeholder={t("form.placeholders.zero", { ns: "booking" })}
                value={formData.weight || ""} onChange={update("weight")} className={inputClass} />
            </div>
            <div className="min-w-0">
              <label htmlFor="length" className={labelClass}>{t("form.fields.length", { ns: "booking" })}</label>
              <input id="length" type="number" min="0" placeholder={t("form.placeholders.zero", { ns: "booking" })}
                value={formData.length || ""} onChange={update("length")} className={inputClass} />
            </div>
            <div className="min-w-0">
              <label htmlFor="width" className={labelClass}>{t("form.fields.width", { ns: "booking" })}</label>
              <input id="width" type="number" min="0" placeholder={t("form.placeholders.zero", { ns: "booking" })}
                value={formData.width || ""} onChange={update("width")} className={inputClass} />
            </div>
            <div className="min-w-0">
              <label htmlFor="height" className={labelClass}>{t("form.fields.height", { ns: "booking" })}</label>
              <input id="height" type="number" min="0" placeholder={t("form.placeholders.zero", { ns: "booking" })}
                value={formData.height || ""} onChange={update("height")} className={inputClass} />
            </div>
          </div>

          <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">
            Recipient Information
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mb-6">
            <div className="min-w-0">
              <label htmlFor="recipientName" className={labelClass}>Recipient Name *</label>
              <input id="recipientName" type="text" placeholder="Full name"
                value={formData.recipientName || ""} onChange={update("recipientName")} className={inputClass} />
            </div>
            <div className="min-w-0">
              <label htmlFor="recipientEmail" className={labelClass}>Recipient Email *</label>
              <input id="recipientEmail" type="email" placeholder="email@example.com"
                value={formData.recipientEmail || ""} onChange={update("recipientEmail")} className={inputClass} />
            </div>
            <div className="min-w-0 sm:col-span-2">
              <label htmlFor="declaredValue" className={labelClass}>{t("form.fields.declaredValue", { ns: "booking" })}</label>
              <input id="declaredValue" type="number" min="0" step="0.01" placeholder={t("form.placeholders.zero", { ns: "booking" })}
                value={formData.declaredValue ?? 0} onChange={update("declaredValue")} className={inputClass} />
            </div>
          </div>

          <div className="mb-6 min-w-0">
            <label htmlFor="specialInstructions" className={labelClass}>{t("form.fields.specialInstructions", { ns: "booking" })}</label>
            <textarea id="specialInstructions" rows={3} placeholder={t("form.placeholders.specialInstructions", { ns: "booking" })}
              value={formData.specialInstructions || ""} onChange={update("specialInstructions")}
              className={`${inputClass} h-auto py-3 resize-y`} />
          </div>

          <div className="lg:hidden mb-6">
            <PriceCalculator service={SERVICE} formData={formData} sticky={false} />
          </div>

          <button
            type="submit"
            disabled={!valid}
            className="w-full sm:w-auto min-h-[44px] px-10 py-3 rounded-full bg-blue-500 text-white text-sm font-bold
              uppercase tracking-wider border-none cursor-pointer hover:bg-blue-600 transition-colors font-[inherit]
              disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {t("actions.next", { ns: "booking" })}
          </button>
        </form>

        <div className="hidden lg:block min-w-0">
          <PriceCalculator service={SERVICE} formData={formData} />
        </div>
      </div>
    </div>
  );
}
