import StepWrapper from "./StepWrapper";
import PriceSummary from "./PriceSummary";
import { getBreakdown } from "../utils/getBreakdown";
import { validateFCL } from "../utils/validation";
import { WEIGHT_UNITS } from "../data/commodityTypes";
import { CONTAINER_TYPES } from "../data/containerTypes";
import { DELIVERY_TYPES } from "../data/deliveryTypes";
import { useTranslation } from "react-i18next";

const SERVICE = "fcl";

const inputClass =
  "w-full h-11 sm:h-12 px-4 rounded-xl border border-gray-200 text-sm text-gray-900 outline-none bg-white focus:border-blue-400 transition-colors min-w-0 font-[inherit]";
const labelClass = "text-sm font-medium text-gray-700 mb-1.5 block";

export default function FCLForm({ formData, onChange, onNext }) {
  const { t } = useTranslation(["seaCargoBooking", "booking"]);
  const update = (field) => (e) => onChange(field, e.target.value);
  const breakdown = getBreakdown(SERVICE, formData);
  const valid = validateFCL(formData);
  const deliveryTime = t(breakdown.deliveryTimeKey, { ns: "seaCargoBooking" });

  return (
    <StepWrapper
      eyebrow={t("services.fcl.eyebrow", { ns: "seaCargoBooking" })}
      title={t("steps.shipmentDetails", { ns: "booking" })}
      description={t("services.fcl.description", { ns: "seaCargoBooking", time: deliveryTime })}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto items-start">
        <form
          onSubmit={(e) => { e.preventDefault(); if (valid) onNext(); }}
          className="lg:col-span-2 bg-white rounded-2xl sm:rounded-3xl border border-gray-100 shadow-sm p-5 sm:p-7 lg:p-8 min-w-0"
        >
          {/* Route */}
          <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">{t("form.sections.route", { ns: "booking" })}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mb-6">
            <div className="min-w-0">
              <label htmlFor="fromCountry" className={labelClass}>{t("form.fields.fromCountry", { ns: "booking" })}</label>
              <input id="fromCountry" type="text" placeholder={t("form.placeholders.fromCountrySea", { ns: "booking" })}
                value={formData.fromCountry || ""} onChange={update("fromCountry")} className={inputClass} />
            </div>
            <div className="min-w-0">
              <label htmlFor="zipCode" className={labelClass}>{t("form.fields.zipCode", { ns: "booking" })}</label>
              <input id="zipCode" type="text" placeholder={t("form.placeholders.zipCodeSea", { ns: "booking" })}
                value={formData.zipCode || ""} onChange={update("zipCode")} className={inputClass} />
            </div>
            <div className="min-w-0">
              <label htmlFor="destinationCountry" className={labelClass}>{t("form.fields.destinationCountry", { ns: "booking" })}</label>
              <input id="destinationCountry" type="text" placeholder={t("form.placeholders.destinationCountrySea", { ns: "booking" })}
                value={formData.destinationCountry || ""} onChange={update("destinationCountry")} className={inputClass} />
            </div>
            <div className="min-w-0">
              <label htmlFor="dateOfShipment" className={labelClass}>{t("form.fields.dateOfShipment", { ns: "booking" })}</label>
              <input id="dateOfShipment" type="date"
                value={formData.dateOfShipment || ""} onChange={update("dateOfShipment")} className={inputClass} />
            </div>
          </div>

          {/* Container & cargo */}
          <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">{t("form.sections.containerCargo", { ns: "booking" })}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mb-6">
            <div className="min-w-0">
              <label htmlFor="weight" className={labelClass}>{t("form.fields.packageWeight", { ns: "booking" })}</label>
              <div className="flex gap-2 min-w-0">
                <input id="weight" type="number" min="0" step="0.1" placeholder={t("form.placeholders.zero", { ns: "booking" })}
                  value={formData.weight || ""} onChange={update("weight")} className={inputClass} />
                <select
                  aria-label={t("aria.weightUnit", { ns: "booking" })}
                  value={formData.weightUnit || "kg"}
                  onChange={update("weightUnit")}
                  className="h-11 sm:h-12 px-3 rounded-xl border border-gray-200 text-sm text-gray-900 bg-white outline-none cursor-pointer focus:border-blue-400 transition-colors font-[inherit] shrink-0"
                >
                  {WEIGHT_UNITS.map((u) => (
                    <option key={u.id} value={u.id}>{t(`weightUnits.${u.id}`, { ns: "seaCargoBooking" })}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="min-w-0">
              <label htmlFor="containerType" className={labelClass}>{t("form.fields.containerType", { ns: "booking" })}</label>
              <select id="containerType" value={formData.containerType || ""} onChange={update("containerType")}
                className={`${inputClass} cursor-pointer`}>
                <option value="" disabled>{t("form.placeholders.selectContainer", { ns: "booking" })}</option>
                {CONTAINER_TYPES.map((c) => (
                  <option key={c.id} value={c.id}>{t(c.labelKey, { ns: "seaCargoBooking" })}</option>
                ))}
              </select>
            </div>
            <div className="min-w-0">
              <label htmlFor="hsCode" className={labelClass}>{t("form.fields.hsCode", { ns: "booking" })}</label>
              <input id="hsCode" type="text" placeholder={t("form.placeholders.hsCode", { ns: "booking" })}
                value={formData.hsCode || ""} onChange={update("hsCode")} className={inputClass} />
            </div>
            <div className="min-w-0">
              <label htmlFor="deliveryType" className={labelClass}>{t("form.fields.deliveryType", { ns: "booking" })}</label>
              <select id="deliveryType" value={formData.deliveryType || ""} onChange={update("deliveryType")}
                className={`${inputClass} cursor-pointer`}>
                <option value="" disabled>{t("form.placeholders.selectDelivery", { ns: "booking" })}</option>
                {DELIVERY_TYPES.map((d) => (
                  <option key={d.id} value={d.id}>{t(d.labelKey, { ns: "seaCargoBooking" })}</option>
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
              value={formData.commodityDescription || ""} onChange={update("commodityDescription")}
              className={`${inputClass} h-auto py-3 resize-y`} />
          </div>

          {/* Insurance */}
          <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">{t("form.sections.insurance", { ns: "booking" })}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mb-6">
            <div className="min-w-0">
              <label htmlFor="declaredValue" className={labelClass}>{t("form.fields.declaredValue", { ns: "booking" })}</label>
              <input id="declaredValue" type="number" min="0" step="1" placeholder={t("form.placeholders.zero", { ns: "booking" })}
                value={formData.declaredValue || ""} onChange={update("declaredValue")} className={inputClass} />
            </div>
            <div className="min-w-0">
              <label htmlFor="insuranceFee" className={labelClass}>{t("form.fields.insuranceFee", { ns: "booking" })}</label>
              <input id="insuranceFee" type="text" readOnly tabIndex={-1}
                value={`$${breakdown.insuranceFee.toFixed(2)}`}
                className={`${inputClass} bg-gray-50 text-gray-500 cursor-default`} />
            </div>
          </div>

          <div className="lg:hidden mb-6">
            <PriceSummary service={SERVICE} formData={formData} sticky={false} />
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
          <PriceSummary service={SERVICE} formData={formData} />
        </div>
      </div>
    </StepWrapper>
  );
}
