import { LuGlobe } from "react-icons/lu";
import { useTranslation } from "react-i18next";
import { SectionHeading } from "./shared";

const STAT_KEYS = ["countries", "partners", "operations", "performance"];
const REGION_IDS = [1, 2, 3, 4, 5, 6];

export default function AirGlobalCoverage() {
  const { t } = useTranslation("airCargo");

  return (
    <section className="bg-blue-500 min-w-0 py-12 sm:py-16 lg:py-20">
      <div className="page-container min-w-0">
        <SectionHeading
          eyebrow={t("globalCoverage.eyebrow")}
          title={t("globalCoverage.title")}
          description={t("globalCoverage.description")}
          light
        />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-10 lg:mb-12">
          {STAT_KEYS.map((key) => (
            <div
              key={key}
              className="rounded-2xl bg-white/10 border border-white/20 px-4 py-5 sm:px-6 sm:py-6 text-center min-w-0"
            >
              <p className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-1">{t(`globalCoverage.stats.${key}.value`)}</p>
              <p className="text-xs sm:text-sm text-blue-100">{t(`globalCoverage.stats.${key}.label`)}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {REGION_IDS.map((id) => (
            <article
              key={id}
              className="rounded-2xl sm:rounded-3xl bg-white p-5 sm:p-6 min-w-0"
            >
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3">{t(`globalCoverage.regions.${id}.name`)}</h3>
              <dl className="space-y-2.5 text-xs sm:text-sm">
                <div>
                  <dt className="font-semibold text-blue-600">{t("globalCoverage.keyHubs")}</dt>
                  <dd className="text-gray-600 mt-0.5">{t(`globalCoverage.regions.${id}.hubs`)}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-blue-600">{t("globalCoverage.typicalTransit")}</dt>
                  <dd className="text-gray-600 mt-0.5">{t(`globalCoverage.regions.${id}.transit`)}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-blue-600">{t("globalCoverage.coverage")}</dt>
                  <dd className="text-gray-600 mt-0.5">{t(`globalCoverage.regions.${id}.coverage`)}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>

        <div className="mt-8 sm:mt-10 rounded-2xl sm:rounded-3xl overflow-hidden bg-white/10 border border-white/20 min-h-[200px] sm:min-h-[280px] flex items-center justify-center">
          <div className="text-center px-4 py-8 sm:py-12">
            <LuGlobe
              className="w-16 h-16 sm:w-24 sm:h-24 mx-auto mb-4 opacity-60 text-white"
              strokeWidth={1}
              aria-hidden
            />
            <p className="text-sm sm:text-base text-blue-100 font-medium">
              {t("globalCoverage.map.title")}
            </p>
            <p className="text-xs sm:text-sm text-blue-200 mt-2">
              {t("globalCoverage.map.subtitle")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
