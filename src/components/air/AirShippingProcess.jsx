import { LuBox, LuCalculator, LuPackage, LuPlane, LuTruck } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SectionHeading } from "./shared";
import { isAuthenticated } from "../../utils/auth";

const STEP_CONFIG = [
  { num: "01", Icon: LuCalculator },
  { num: "02", Icon: LuTruck },
  { num: "03", Icon: LuPackage },
  { num: "04", Icon: LuPlane },
  { num: "05", Icon: LuPlane },
  { num: "06", Icon: LuBox },
];

export default function AirShippingProcess() {
  const { t } = useTranslation("airCargo");
  const navigate = useNavigate();

  const handleShipNow = () => {
    if (!isAuthenticated()) {
      navigate("/signup?redirect=/create-shipment");
      return;
    }
    navigate("/create-shipment");
  };

  return (
    <section className="page-container min-w-0 py-12 sm:py-16 lg:py-20">
      <SectionHeading
        eyebrow={t("shippingProcess.eyebrow")}
        title={t("shippingProcess.title")}
        description={t("shippingProcess.description")}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
        {STEP_CONFIG.map((step) => (
          <article
            key={step.num}
            className="relative bg-white border border-gray-100 rounded-2xl sm:rounded-3xl p-5 sm:p-6
              hover:shadow-lg hover:border-blue-100 transition-all duration-200 min-w-0"
          >
            <div
              className="absolute -top-3 left-5 sm:left-6 bg-blue-500 text-white text-xs sm:text-sm
                font-bold w-8 h-8 rounded-full flex items-center justify-center"
            >
              {step.num}
            </div>

            <div className="flex justify-center mt-4 mb-4 sm:mb-5 h-16 sm:h-20">
              <step.Icon className="w-12 h-12 sm:w-16 sm:h-16 text-blue-500" strokeWidth={1.5} aria-hidden />
            </div>

            <h3 className="text-base sm:text-lg font-bold text-gray-900 text-center mb-2">{t(`shippingProcess.steps.${step.num}.title`)}</h3>
            <p className="text-xs sm:text-sm text-gray-500 text-center leading-relaxed">{t(`shippingProcess.steps.${step.num}.description`)}</p>
          </article>
        ))}
      </div>

      <div className="mt-8 sm:mt-10 lg:mt-12 rounded-2xl sm:rounded-3xl bg-blue-500 px-5 py-8 sm:px-10 sm:py-10 flex flex-col md:flex-row items-center justify-between gap-6 min-w-0">
        <div className="text-center md:text-left min-w-0">
          <h3 className="text-lg sm:text-xl font-bold text-white mb-2">{t("shippingProcess.cta.title")}</h3>
          <p className="text-sm sm:text-base text-blue-100 max-w-lg">
            {t("shippingProcess.cta.description")}
          </p>
        </div>
        <button
          type="button"
          onClick={handleShipNow}
          className="shrink-0 w-full sm:w-auto min-h-[44px] px-8 py-3 rounded-full bg-white text-blue-700
            text-sm font-bold uppercase tracking-wider border-none cursor-pointer
            hover:bg-blue-50 transition-colors font-[inherit]"
        >
          {t("shippingProcess.cta.button")}
        </button>
      </div>
    </section>
  );
}
