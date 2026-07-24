import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const HERO_STAT_KEYS = ["countries", "delivery", "support"];

export default function TruckCargoHero() {
  const { t } = useTranslation("truckCargo");

  const heroStats = useMemo(
    () =>
      HERO_STAT_KEYS.map((key) => ({
        value: t(`hero.stats.${key}.value`),
        label: t(`hero.stats.${key}.label`),
      })),
    [t],
  );

  return (
    <div className="page-container py-4 sm:py-6 min-w-0">
      <nav
        aria-label={t("hero.breadcrumbAria")}
        className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 mb-4 flex-wrap"
      >
        <Link to="/" className="hover:text-blue-500 transition-colors no-underline text-gray-500">
          {t("common:common.main")}
        </Link>
        <span aria-hidden="true">›</span>
        <span className="text-gray-900 font-medium">{t("hero.breadcrumbCurrent")}</span>
      </nav>

      <header
        className="relative rounded-2xl sm:rounded-3xl bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900
          overflow-hidden px-5 py-10 sm:px-10 sm:py-14 lg:px-14 lg:py-16
          w-full max-w-[1920px] mx-auto aspect-[24/7]
          min-h-[440px] sm:min-h-[500px] lg:min-h-0 lg:h-[560px]
          flex flex-col justify-center"
      >
        <div className="relative z-10 w-full max-w-full lg:max-w-[580px] min-w-0 pr-0 sm:pr-28 md:pr-40">
          <p className="text-blue-300 text-xs sm:text-sm font-semibold uppercase tracking-widest mb-3">
            {t("hero.eyebrow")}
          </p>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-extrabold text-white mb-4 leading-tight">
            {t("hero.title")}
          </h1>
          <p className="text-gray-300 text-sm sm:text-base lg:text-lg leading-relaxed mb-6 max-w-lg">
            {t("hero.description")}
          </p>

          <div className="flex flex-wrap gap-4 sm:gap-6 mb-6 sm:mb-8">
            {heroStats.map((stat) => (
              <div key={stat.label} className="min-w-0">
                <p className="text-xl sm:text-2xl font-extrabold text-white">{stat.value}</p>
                <p className="text-xs sm:text-sm text-blue-200">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </header>
    </div>
  );
}
