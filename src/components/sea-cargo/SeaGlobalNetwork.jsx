import { LuGlobe } from "react-icons/lu";
import { useTranslation } from "react-i18next";
import { SectionHeading } from "./shared";

const STAT_KEYS = ["globalPorts", "continents", "tradeLanes", "onTime"];
const REGION_KEYS = ["asia", "europe", "middleEast", "northAmerica", "southAmerica", "africa"];

export default function SeaGlobalNetwork() {
  const { t } = useTranslation("seaCargo");

  return (
    <section className="bg-blue-500 min-w-0 py-12 sm:py-16 lg:py-20">
      <div className="page-container min-w-0">
        <SectionHeading
          eyebrow={t("globalNetwork.eyebrow")}
          title={t("globalNetwork.title")}
          description={t("globalNetwork.description")}
          light
        />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-10 lg:mb-12">
          {STAT_KEYS.map((key) => (
            <div
              key={key}
              className="rounded-2xl bg-white/10 border border-white/20 px-4 py-5 sm:px-6 sm:py-6 text-center min-w-0"
            >
              <p className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-1">
                {t(`globalNetwork.stats.${key}.value`)}
              </p>
              <p className="text-xs sm:text-sm text-blue-100">
                {t(`globalNetwork.stats.${key}.label`)}
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-8 sm:mb-10">
          {REGION_KEYS.map((key) => (
            <article
              key={key}
              className="rounded-2xl sm:rounded-3xl bg-white p-5 sm:p-6 min-w-0
                hover:shadow-lg transition-shadow duration-200"
            >
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3">
                {t(`globalNetwork.regions.${key}.title`)}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
                {t(`globalNetwork.regions.${key}.description`)}
              </p>
              <dl className="space-y-2 text-xs sm:text-sm">
                <div>
                  <dt className="font-semibold text-blue-600">{t("globalNetwork.networkLabel")}</dt>
                  <dd className="text-gray-600 mt-0.5">{t(`globalNetwork.regions.${key}.ports`)}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-blue-600">{t("globalNetwork.transitLabel")}</dt>
                  <dd className="text-gray-600 mt-0.5">{t(`globalNetwork.regions.${key}.transit`)}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>

        <div className="rounded-2xl sm:rounded-3xl overflow-hidden bg-white/10 border border-white/20 min-h-[220px] sm:min-h-[360px] flex items-center justify-center">
          <div className="text-center px-4 py-8 sm:py-12 w-full max-w-2xl">
            <LuGlobe
              className="w-16 h-16 sm:w-24 sm:h-24 mx-auto mb-4 sm:mb-6 opacity-70 text-white"
              strokeWidth={1}
              aria-hidden
            />
            <p className="text-sm sm:text-base text-blue-100 font-medium">
              {t("globalNetwork.mapTitle")}
            </p>
            <p className="text-xs sm:text-sm text-blue-200 mt-2 max-w-md mx-auto">
              {t("globalNetwork.mapDescription")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
