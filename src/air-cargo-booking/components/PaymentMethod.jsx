import { useTranslation } from "react-i18next";
import { LuChevronLeft } from "react-icons/lu";
import { PAYMENT_METHODS } from "../data/paymentMethods";
import { getPaymentMethodLabel } from "../../i18n/paymentMethodLabels";

export default function PaymentMethod({ selected, onSelect, onBack, onContinue }) {
  const { t } = useTranslation("booking");

  return (
    <div className="animate-[fadeIn_0.3s_ease-out]">
      <div className="text-center mb-6 sm:mb-8">
        <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-blue-500 mb-2">
          {t("steps.stepOf", { current: 2, total: 4 })}
        </p>
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-gray-900 mb-2">
          {t("paymentMethod.title")}
        </h2>
        <p className="text-sm sm:text-base text-gray-500 max-w-xl mx-auto">
          {t("paymentMethod.subtitle")}
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="flex flex-col gap-3 sm:gap-4">
          {PAYMENT_METHODS.map((method) => {
            const isActive = selected === method.id;
            const badge = method.badge ? getPaymentMethodLabel(t, method, "badge") : null;
            return (
              <label
                key={method.id}
                className={`flex items-center gap-4 p-4 sm:p-5 rounded-2xl border cursor-pointer transition-all duration-200 min-w-0
                  ${isActive
                    ? "border-blue-500 bg-blue-50 shadow-sm shadow-blue-500/10"
                    : "border-gray-200 bg-white hover:border-blue-300"
                  }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value={method.id}
                  checked={isActive}
                  onChange={() => onSelect(method.id)}
                  className="accent-blue-500 w-4 h-4 shrink-0"
                />
                <div className="flex items-center justify-center w-11 h-11 shrink-0 rounded-xl bg-gray-100 text-gray-700 text-xs font-extrabold">
                  {method.initials}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm sm:text-base font-bold text-gray-900">
                      {getPaymentMethodLabel(t, method, "name")}
                    </span>
                    {badge && (
                      <span className="inline-flex px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-[10px] font-bold uppercase tracking-wider">
                        {badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-gray-500 truncate">
                    {getPaymentMethodLabel(t, method, "tagline")}
                  </p>
                </div>
                <span className="text-sm font-semibold text-gray-900 shrink-0">
                  {method.fee > 0
                    ? t("paymentMethod.fee", { amount: method.fee.toFixed(2) })
                    : t("paymentMethod.free")}
                </span>
              </label>
            );
          })}
        </div>

        <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 mt-8">
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
            type="button"
            onClick={onContinue}
            disabled={!selected}
            className="inline-flex items-center justify-center min-h-[44px] px-10 py-3 rounded-full bg-blue-500 text-white text-sm font-bold
              uppercase tracking-wider border-none cursor-pointer hover:bg-blue-600 transition-colors font-[inherit]
              disabled:opacity-50 disabled:cursor-not-allowed sm:ml-auto"
          >
            {t("actions.continue")}
          </button>
        </div>
      </div>
    </div>
  );
}
