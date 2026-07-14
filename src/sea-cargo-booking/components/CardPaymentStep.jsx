import StepWrapper from "./StepWrapper";
import { validateCard } from "../utils/validation";
import { useTranslation } from "react-i18next";
import { LuChevronLeft } from "react-icons/lu";

const inputClass =
  "w-full h-11 sm:h-12 px-4 rounded-xl border border-gray-200 text-sm text-gray-900 outline-none bg-white focus:border-blue-400 transition-colors min-w-0 font-[inherit]";
const labelClass = "text-sm font-medium text-gray-700 mb-1.5 block";

function formatCardNumber(value) {
  return value.replace(/\D/g, "").slice(0, 19).replace(/(.{4})/g, "$1 ").trim();
}

function formatExpiry(value) {
  const v = value.replace(/\D/g, "").slice(0, 4);
  return v.length <= 2 ? v : `${v.slice(0, 2)}/${v.slice(2)}`;
}

export default function CardPaymentStep({ details, onChange, onBack, onPay, amount }) {
  const { t } = useTranslation("booking");
  const update = (field) => (e) => onChange(field, e.target.value);
  const valid = validateCard(details);

  return (
    <StepWrapper
      eyebrow={t("steps.stepOf", { current: 3, total: 4 })}
      title={t("cardPayment.title")}
      description={t("cardPayment.subtitle")}
    >
      <form
        onSubmit={(e) => { e.preventDefault(); if (valid) onPay(); }}
        className="max-w-3xl mx-auto bg-white rounded-2xl sm:rounded-3xl border border-gray-100 shadow-sm p-5 sm:p-7 lg:p-8 min-w-0"
      >
        {/* Card */}
        <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">{t("cardPayment.sections.card")}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mb-6">
          <div className="min-w-0 sm:col-span-2">
            <label htmlFor="cardNumber" className={labelClass}>{t("cardPayment.fields.cardNumber")}</label>
            <input id="cardNumber" type="text" inputMode="numeric" placeholder={t("cardPayment.placeholders.cardNumber")}
              value={details.cardNumber || ""}
              onChange={(e) => onChange("cardNumber", formatCardNumber(e.target.value))} className={inputClass} />
          </div>
          <div className="min-w-0">
            <label htmlFor="expiry" className={labelClass}>{t("cardPayment.fields.expiry")}</label>
            <input id="expiry" type="text" inputMode="numeric" placeholder={t("cardPayment.placeholders.expiry")}
              value={details.expiry || ""}
              onChange={(e) => onChange("expiry", formatExpiry(e.target.value))} className={inputClass} />
          </div>
          <div className="min-w-0">
            <label htmlFor="cvc" className={labelClass}>{t("cardPayment.fields.cvc")}</label>
            <input id="cvc" type="text" inputMode="numeric" placeholder={t("cardPayment.placeholders.cvc")} maxLength={4}
              value={details.cvc || ""}
              onChange={(e) => onChange("cvc", e.target.value.replace(/\D/g, "").slice(0, 4))} className={inputClass} />
          </div>
          <div className="min-w-0 sm:col-span-2">
            <label htmlFor="cardholderName" className={labelClass}>{t("cardPayment.fields.cardholderName")}</label>
            <input id="cardholderName" type="text" placeholder={t("cardPayment.placeholders.cardholderName")}
              value={details.cardholderName || ""} onChange={update("cardholderName")} className={inputClass} />
          </div>
        </div>

        {/* Billing */}
        <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">{t("cardPayment.sections.billing")}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mb-6">
          <div className="min-w-0 sm:col-span-2">
            <label htmlFor="fullName" className={labelClass}>{t("cardPayment.fields.fullName")}</label>
            <input id="fullName" type="text" placeholder={t("cardPayment.placeholders.fullName")}
              value={details.fullName || ""} onChange={update("fullName")} className={inputClass} />
          </div>
          <div className="min-w-0 sm:col-span-2">
            <label htmlFor="addressLine1" className={labelClass}>{t("cardPayment.fields.addressLine1")}</label>
            <input id="addressLine1" type="text" placeholder={t("cardPayment.placeholders.addressLine1")}
              value={details.addressLine1 || ""} onChange={update("addressLine1")} className={inputClass} />
          </div>
          <div className="min-w-0 sm:col-span-2">
            <label htmlFor="addressLine2" className={labelClass}>{t("cardPayment.fields.addressLine2")}</label>
            <input id="addressLine2" type="text" placeholder={t("cardPayment.placeholders.addressLine2")}
              value={details.addressLine2 || ""} onChange={update("addressLine2")} className={inputClass} />
          </div>
          <div className="min-w-0">
            <label htmlFor="city" className={labelClass}>{t("cardPayment.fields.city")}</label>
            <input id="city" type="text" placeholder={t("cardPayment.placeholders.city")}
              value={details.city || ""} onChange={update("city")} className={inputClass} />
          </div>
          <div className="min-w-0">
            <label htmlFor="province" className={labelClass}>{t("cardPayment.fields.province")}</label>
            <input id="province" type="text" placeholder={t("cardPayment.placeholders.province")}
              value={details.province || ""} onChange={update("province")} className={inputClass} />
          </div>
          <div className="min-w-0">
            <label htmlFor="postalCode" className={labelClass}>{t("cardPayment.fields.postalCode")}</label>
            <input id="postalCode" type="text" placeholder={t("cardPayment.placeholders.postalCode")}
              value={details.postalCode || ""} onChange={update("postalCode")} className={inputClass} />
          </div>
        </div>

        {/* VAT */}
        <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">{t("cardPayment.sections.vat")}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mb-6">
          <div className="min-w-0 sm:col-span-2">
            <label htmlFor="businessName" className={labelClass}>{t("cardPayment.fields.businessName")}</label>
            <input id="businessName" type="text" placeholder={t("cardPayment.placeholders.businessName")}
              value={details.businessName || ""} onChange={update("businessName")} className={inputClass} />
          </div>
          <div className="min-w-0">
            <label htmlFor="vatCountry" className={labelClass}>{t("cardPayment.fields.vatCountry")}</label>
            <input id="vatCountry" type="text" placeholder={t("cardPayment.placeholders.vatCountry")}
              value={details.vatCountry || ""} onChange={update("vatCountry")} className={inputClass} />
          </div>
          <div className="min-w-0">
            <label htmlFor="vatNumber" className={labelClass}>{t("cardPayment.fields.vatNumber")}</label>
            <input id="vatNumber" type="text" placeholder={t("cardPayment.placeholders.vatNumber")}
              value={details.vatNumber || ""} onChange={update("vatNumber")} className={inputClass} />
          </div>
        </div>

        <label className="flex items-center gap-2.5 mb-6 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={Boolean(details.savePayment)}
            onChange={(e) => onChange("savePayment", e.target.checked)}
            className="accent-blue-500 w-4 h-4"
          />
          <span className="text-sm text-gray-700">{t("cardPayment.savePaymentFuture")}</span>
        </label>

        <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center justify-center gap-2 min-h-[44px] px-6 py-2.5 rounded-full border border-gray-200
              bg-white text-gray-700 text-sm font-semibold cursor-pointer hover:border-gray-300 hover:bg-gray-50 transition-colors font-[inherit]"
          >
            <LuChevronLeft className="h-4 w-4" />
            {t("actions.back")}
          </button>
          <button
            type="submit"
            disabled={!valid}
            className="inline-flex items-center justify-center min-h-[44px] px-10 py-3 rounded-full bg-blue-500 text-white text-sm font-bold
              uppercase tracking-wider border-none cursor-pointer hover:bg-blue-600 transition-colors font-[inherit]
              disabled:opacity-50 disabled:cursor-not-allowed sm:ml-auto"
          >
            {t("cardPayment.payButton", { amount: amount.toFixed(2) })}
          </button>
        </div>
      </form>
    </StepWrapper>
  );
}
