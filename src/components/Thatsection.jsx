import { useTranslation } from "react-i18next";
import { LuPlane, LuShip, LuTruck } from "react-icons/lu";

const ROUTE_KEYS = ["0", "1", "2", "3"];
const ROUTE_TYPES = ["air", "truck", "air", "truck"];

const TYPE_ICONS = {
  air: LuPlane,
  truck: LuTruck,
  sea: LuShip,
};

const TypeIcon = ({ type }) => {
  const Icon = TYPE_ICONS[type] ?? LuShip;
  return <Icon className="w-4 h-4 text-white/70" />;
};

export default function PromoBanner() {
  const { t } = useTranslation("home");
  const { t: tc } = useTranslation("common");

  return (
    <section className="page-container py-6 sm:py-8 min-w-0">
      <div className="relative rounded-2xl sm:rounded-3xl bg-blue-500 overflow-hidden flex flex-col lg:flex-row lg:min-h-70">

        <div className="flex flex-col justify-center px-5 py-8 sm:px-10 sm:py-10 z-10 w-full lg:max-w-[320px] shrink-0">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white uppercase leading-tight mb-3">
            {t("promo.title")}
          </h2>
          <p className="text-blue-100 text-sm mb-5 sm:mb-6">{t("promo.subtitle")}</p>
          <button
            type="button"
            className="banner-cta w-full sm:w-fit bg-white text-gray-900 text-sm font-bold uppercase
            tracking-wider px-6 py-2.5 rounded-full hover:bg-blue-50
            transition-colors duration-150 cursor-pointer border-none"
          >
            {tc("shared.cta.moreDetails")}
          </button>
        </div>

        <div className="hidden sm:block flex-1 relative min-h-[120px] lg:min-h-0">
          <img
            src="/picto.png"
            alt={t("promo.imageAlt")}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 max-h-full w-auto object-contain pointer-events-none"
          />
        </div>

        <div className="flex flex-col justify-center gap-2.5 sm:gap-3 px-4 pb-6 sm:px-6 sm:pb-8 lg:py-8 z-10 w-full lg:w-auto lg:min-w-0 lg:flex-1 min-w-0">
          {ROUTE_KEYS.map((key, index) => (
            <div
              key={key}
              className="flex items-center gap-2 sm:gap-3 bg-white/15 backdrop-blur-sm
                border border-white/20 rounded-xl sm:rounded-2xl px-3 py-2.5 sm:px-4 sm:py-3 min-w-0"
            >
              <div className="flex-1 min-w-0">
                <p className="text-white font-semibold text-sm truncate">{t(`promo.routes.${key}.from`)}</p>
                <p className="text-blue-100 text-xs">{t(`promo.routes.${key}.fromDate`)}</p>
              </div>
              <div className="shrink-0">
                <TypeIcon type={ROUTE_TYPES[index]} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-semibold text-sm truncate">{t(`promo.routes.${key}.to`)}</p>
                <p className="text-blue-100 text-xs">{t(`promo.routes.${key}.toDate`)}</p>
              </div>
              <div className="shrink-0 text-white font-bold text-sm">
                {t(`promo.routes.${key}.price`)}
              </div>
            </div>
          ))}
        </div>

        <div className="hidden lg:block absolute right-[18rem] top-1/2 -translate-y-1/2 w-60 h-60 xl:w-75 xl:h-75
          rounded-full border-[40px] border-white/10 pointer-events-none" />
      </div>
    </section>
  );
}
