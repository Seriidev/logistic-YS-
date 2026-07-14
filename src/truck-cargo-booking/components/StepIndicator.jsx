import { useTranslation } from "react-i18next";
import { LuCheck } from "react-icons/lu";

const STEPS = [
  { id: 1, key: "shipmentDetails" },
  { id: 2, key: "paymentMethod" },
  { id: 3, key: "cardPayment" },
  { id: 4, key: "shipmentCreated" },
];

export default function StepIndicator({ currentStep }) {
  const { t } = useTranslation(["truckCargoBooking", "booking"]);

  return (
    <nav aria-label={t("aria.bookingProgress", { ns: "booking" })} className="w-full min-w-0">
      <ol className="flex items-start justify-between gap-1 sm:gap-2">
        {STEPS.map((step, index) => {
          const isComplete = currentStep > step.id;
          const isActive = currentStep === step.id;

          return (
            <li
              key={step.id}
              className="flex flex-1 flex-col items-center min-w-0"
              aria-current={isActive ? "step" : undefined}
            >
              <div className="flex w-full items-center">
                {index > 0 && (
                  <div
                    className={`h-0.5 flex-1 transition-colors duration-300 ${
                      isComplete || isActive ? "bg-blue-500" : "bg-gray-200"
                    }`}
                    aria-hidden="true"
                  />
                )}
                <div
                  className={`flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full text-xs sm:text-sm font-bold transition-all duration-300 ${
                    isComplete
                      ? "bg-blue-500 text-white"
                      : isActive
                        ? "bg-blue-500 text-white ring-4 ring-blue-500/20"
                        : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {isComplete ? (
                    <LuCheck className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={3} />
                  ) : (
                    step.id
                  )}
                </div>
                {index < STEPS.length - 1 && (
                  <div
                    className={`h-0.5 flex-1 transition-colors duration-300 ${
                      isComplete ? "bg-blue-500" : "bg-gray-200"
                    }`}
                    aria-hidden="true"
                  />
                )}
              </div>
              <span
                className={`mt-2 text-center text-[0.625rem] sm:text-xs font-semibold leading-tight transition-colors ${
                  isActive ? "text-blue-500" : isComplete ? "text-gray-700" : "text-gray-400"
                }`}
              >
                {t(`steps.${step.key}`, { ns: "booking" })}
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
