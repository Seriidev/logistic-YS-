import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LuBox, LuCalculator, LuPackage, LuPlane, LuTruck } from "react-icons/lu";
import { isAuthenticated } from "../utils/auth";

export default function ShippingProcess() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleSendParcel = () => {
    if (!isAuthenticated()) {
      navigate("/signup?redirect=/create-shipment");
      return;
    }
    navigate("/create-shipment");
  };

  const steps = [
    { num: "01", Icon: LuCalculator, titleKey: "step1", altKey: "step1" },
    { num: "02", Icon: LuTruck, titleKey: "step2", altKey: "step2" },
    { num: "03", Icon: LuPackage, titleKey: "step3", altKey: "step3" },
    { num: "04", Icon: LuPlane, titleKey: "step4", altKey: "step4" },
  ];

  return (
    <section className="py-10 sm:py-16 bg-white min-w-0">
      <div className="page-container">
        <div className="text-center mb-8 sm:mb-12 px-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-blue-500 uppercase tracking-wide mb-3 sm:mb-4">
            {t("steps.title")}
          </h2>
          <p className="text-gray-600 text-base sm:text-lg">
            {t("steps.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 sm:gap-8">
          {steps.map((step) => (
            <div
              key={step.num}
              className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-8 hover:shadow-xl transition-shadow relative"
            >
              <div className="absolute -top-4 left-8 bg-blue-500 text-white text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center">
                {step.num}
              </div>

              <div className="flex justify-center mb-6 mt-4 h-24 items-center">
                <step.Icon className="w-16 h-16 text-blue-500" aria-label={t(`steps.${step.altKey}.title`)} />
              </div>

              <h3 className="text-xl font-semibold text-center mb-2">
                {t(`steps.${step.titleKey}.title`)}
              </h3>
              <p className="text-gray-600 text-center text-sm leading-relaxed">
                {t(`steps.${step.titleKey}.description`)}
              </p>
            </div>
          ))}

          <div className="bg-blue-500 border border-gray-200 rounded-2xl p-5 sm:p-8 hover:shadow-xl transition-shadow relative lg:col-span-1">
            <div className="flex justify-center mb-6 mt-4 h-20 items-center">
              <LuBox className="w-16 h-16 text-white" aria-label={t("steps.cta.title")} />
            </div>

            <h3 className="text-xl text-white font-semibold text-center mb-2">
              {t("steps.cta.title")}
            </h3>
            <p className="text-white text-center text-sm leading-relaxed">
              {t("steps.cta.description")}
            </p>
            <button
              type="button"
              onClick={handleSendParcel}
              className="w-full bg-white text-[#1E3A8A] font-semibold py-3 rounded-full hover:bg-blue-50 transition-colors mt-4 border-none cursor-pointer font-[inherit]"
            >
              {t("steps.cta.button")}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
