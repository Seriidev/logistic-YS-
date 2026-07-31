import PriceCalculator from "./PriceCalculator";
import { useTranslation } from "react-i18next";
import { getBreakdown } from "../utils/getBreakdown";
import { COUNTRIES, CATEGORIES, DIMENSION_UNITS } from "../data/shippingOptions";

const SERVICE = "ltl";

const inputClass =
  "w-full h-11 sm:h-12 px-4 rounded-xl border border-gray-200 text-sm text-gray-900 outline-none bg-white focus:border-blue-400 transition-colors min-w-0 font-[inherit]";
const labelClass = "text-sm font-medium text-gray-700 mb-1.5 block";

function isValid(f) {
  const req = (v) => Boolean(String(v || "").trim());
  return (
    req(f.country) && req(f.fromLocation) && req(f.receiverInfo) &&
    req(f.weight) && req(f.length) && req(f.width) && req(f.height) &&
    req(f.hsCode) && req(f.category) &&
    req(f.recipientName) && req(f.recipientEmail)
  );
}

export default function LTLForm({ formData, onChange, onNext }) {
  const { t } = useTranslation(["truckCargoBooking", "booking"]);
  const update = (field) => (e) => onChange(field, e.target.value);
  const breakdown = getBreakdown(SERVICE, formData);
  const valid = isValid(formData);

  return (
    <div className="animate-[fadeIn_0.3s_ease-out]">
      <div className="text-center mb-6 sm:mb-8">
        <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-blue-500 mb-2">
          {t("ltl.badge", { ns: "truckCargoBooking" })}
        </p>
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-gray-900 mb-2">
          {t("steps.shipmentDetails", { ns: "booking" })}
        </h2>
        <p className="text-sm sm:text-base text-gray-500 max-w-xl mx-auto">
          {t("ltl.intro", {
            ns: "truckCargoBooking",
            time: t("pricing.ltl.deliveryTime", { ns: "truckCargoBooking" }),
          })}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto items-start">
        <form
          onSubmit={(e) => { e.preventDefault(); if (valid) onNext(); }}
          className="lg:col-span-2 bg-white rounded-2xl sm:rounded-3xl border border-gray-100 shadow-sm p-5 sm:p-7 lg:p-8 min-w-0"
        >
          {/* Origin */}
          <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">
            {t("form.sections.origin", { ns: "booking" })}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mb-6">
            <div className="min-w-0 sm:col-span-2">
              <label htmlFor="country" className={labelClass}>{t("form.fields.country", { ns: "booking" })}</label>
              <select id="country" value={formData.country || ""} onChange={update("country")} className={`${inputClass} cursor-pointer`}>
                <option value="" disabled>{t("form.placeholders.selectCountry", { ns: "booking" })}</option>
                {COUNTRIES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {t(`options.countries.${c.id}`, { ns: "truckCargoBooking" })}
                  </option>
                ))}
              </select>
            </div>
            <div className="min-w-0">
              <label htmlFor="fromLocation" className={labelClass}>{t("form.fields.fromLocation", { ns: "booking" })}</label>
              <input id="fromLocation" type="text" placeholder={t("form.placeholders.fromLocation", { ns: "booking" })}
                value={formData.fromLocation || ""} onChange={update("fromLocation")} className={inputClass} />
            </div>
            <div className="min-w-0">
              <label htmlFor="fromStorage" className={labelClass}>{t("form.fields.fromStorage", { ns: "booking" })}</label>
              <input id="fromStorage" type="text" placeholder={t("form.placeholders.fromStorage", { ns: "booking" })}
                value={formData.fromStorage || ""} onChange={update("fromStorage")} className={inputClass} />
            </div>
          </div>

          {/* Receiver */}
          <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">
            {t("form.sections.receiver", { ns: "booking" })}
          </h3>
          <div className="mb-6 min-w-0">
            <label htmlFor="receiverInfo" className={labelClass}>{t("form.fields.receiverInfo", { ns: "booking" })}</label>
            <textarea id="receiverInfo" rows={2} placeholder={t("form.placeholders.receiverInfo", { ns: "booking" })}
              value={formData.receiverInfo || ""} onChange={update("receiverInfo")} className={`${inputClass} h-auto py-3 resize-y`} />
          </div>

          {/* Package */}
          <div className="flex items-center justify-between mb-3 gap-3 flex-wrap">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
              {t("form.sections.package", { ns: "booking" })}
            </h3>
            <div className="inline-flex rounded-full bg-gray-100 p-1">
              {DIMENSION_UNITS.map((u) => (
                <button
                  key={u.id}
                  type="button"
                  onClick={() => onChange("dimensionUnit", u.id)}
                  className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border-none cursor-pointer transition-colors font-[inherit]
                    ${(formData.dimensionUnit || "cm") === u.id ? "bg-blue-500 text-white" : "bg-transparent text-gray-600"}`}
                >
                  {t(`options.units.${u.id}`, { ns: "truckCargoBooking" })}
                </button>
              ))}
            </div>
          </div>
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

          {/* Customs */}
          <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">
            {t("form.sections.customs", { ns: "booking" })}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mb-6">
            <div className="min-w-0">
              <label htmlFor="hsCode" className={labelClass}>{t("form.fields.hsCode", { ns: "booking" })}</label>
              <input id="hsCode" type="text" placeholder={t("form.placeholders.hsCodeLtl", { ns: "booking" })}
                value={formData.hsCode || ""} onChange={update("hsCode")} className={inputClass} />
            </div>
            <div className="min-w-0">
              <label htmlFor="category" className={labelClass}>{t("form.fields.category", { ns: "booking" })}</label>
              <select id="category" value={formData.category || ""} onChange={update("category")} className={`${inputClass} cursor-pointer`}>
                <option value="" disabled>{t("form.placeholders.selectCategory", { ns: "booking" })}</option>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {t(`options.categories.${c}`, { ns: "truckCargoBooking" })}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">Recipient Information</h3>
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
          </div>

          <div className="mb-6 min-w-0">
            <label htmlFor="commodityDescription" className={labelClass}>{t("form.fields.commodityDescription", { ns: "booking" })}</label>
            <textarea id="commodityDescription" rows={3} placeholder={t("form.placeholders.commodityDescription", { ns: "booking" })}
              value={formData.commodityDescription || ""} onChange={update("commodityDescription")} className={`${inputClass} h-auto py-3 resize-y`} />
          </div>

          {/* Insurance */}
          <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">
            {t("form.sections.insurance", { ns: "booking" })}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mb-6">
            <div className="min-w-0">
              <label htmlFor="declaredValue" className={labelClass}>{t("form.fields.declaredValue", { ns: "booking" })}</label>
              <input id="declaredValue" type="number" min="0" step="1" placeholder={t("form.placeholders.zero", { ns: "booking" })}
                value={formData.declaredValue || ""} onChange={update("declaredValue")} className={inputClass} />
            </div>
            <div className="min-w-0">
              <label htmlFor="insuranceFee" className={labelClass}>{t("form.fields.insuranceFee", { ns: "booking" })}</label>
              <input id="insuranceFee" type="text" readOnly tabIndex={-1}
                value={`$${breakdown.insuranceFee.toFixed(2)}`} className={`${inputClass} bg-gray-50 text-gray-500 cursor-default`} />
            </div>
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
