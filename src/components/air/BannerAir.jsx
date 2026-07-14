import { LuPlane } from "react-icons/lu";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const HERO_STAT_KEYS = ["countries", "delivery", "support"];

export default function AirHero() {
  const { t } = useTranslation("airCargo");

  return (
    <div className="page-container py-4 sm:py-6 min-w-0">
      <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 mb-4 flex-wrap">
        <Link to="/" className="hover:text-blue-500 transition-colors no-underline text-gray-500">
          {t("common:common.main")}
        </Link>
        <span aria-hidden="true">›</span>
        <span className="text-gray-900 font-medium">{t("breadcrumb.title")}</span>
      </div>

      <div
        className="relative rounded-2xl sm:rounded-3xl bg-blue-500 overflow-hidden
          px-5 py-10 sm:px-10 sm:py-14 lg:px-14 lg:py-16
          w-full max-w-[1920px] mx-auto aspect-[24/7]
          min-h-[440px] sm:min-h-[500px] lg:min-h-0 lg:h-[560px]
          flex flex-col justify-center"
      >
        <div className="hidden md:block absolute top-6 right-[35%] lg:right-[280px] opacity-80 pointer-events-none">
          <img
            src="/box-decor.png"
            alt=""
            className="w-12 sm:w-16"
            onError={(e) => { e.target.style.display = "none"; }}
          />
        </div>
        <div className="hidden md:block absolute bottom-6 left-[35%] lg:left-[320px] opacity-60 pointer-events-none">
          <img
            src="/box-decor2.png"
            alt=""
            className="w-10"
            onError={(e) => { e.target.style.display = "none"; }}
          />
        </div>

        <LuPlane
          aria-hidden
          className="hidden sm:block absolute right-4 lg:right-10 bottom-4 sm:bottom-6
            h-24 sm:h-32 md:h-40 lg:h-48 w-auto max-w-[45%] pointer-events-none opacity-90 text-white/90"
          strokeWidth={1.25}
        />

        <div
          className="hidden md:block absolute right-16 lg:right-32 top-1/2 -translate-y-1/2
            w-28 h-28 lg:w-48 lg:h-48 rounded-full border-[20px] lg:border-[36px]
            border-white/10 pointer-events-none"
        />

        <div className="relative z-10 w-full max-w-full lg:max-w-[560px] min-w-0 pr-0 sm:pr-28 md:pr-36">
          <p className="text-blue-200 text-xs sm:text-sm font-semibold uppercase tracking-widest mb-3">
            {t("hero.eyebrow")}
          </p>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-4 leading-tight">
            {t("hero.title")}
          </h1>
          <p className="text-blue-100 text-sm sm:text-base leading-relaxed mb-6 max-w-lg">
            {t("hero.description")}
          </p>

          <div className="flex flex-wrap gap-4 sm:gap-6 mb-6 sm:mb-8">
            {HERO_STAT_KEYS.map((key) => (
              <div key={key} className="min-w-0">
                <p className="text-xl sm:text-2xl font-extrabold text-white">{t(`hero.stats.${key}.value`)}</p>
                <p className="text-xs sm:text-sm text-blue-200">{t(`hero.stats.${key}.label`)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
