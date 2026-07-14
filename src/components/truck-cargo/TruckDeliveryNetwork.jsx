import { LuMap } from "react-icons/lu";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { SectionHeading } from "./shared";

const NETWORK_KEYS = ["domestic", "international", "crossBorder", "regional"];
const STAT_KEYS = ["hubs", "countries", "routes", "onTime"];

export default function TruckDeliveryNetwork() {
  const { t } = useTranslation("truckCargo");

  const networkItems = useMemo(
    () =>
      NETWORK_KEYS.map((key) => ({
        id: key,
        title: t(`deliveryNetwork.items.${key}.title`),
        description: t(`deliveryNetwork.items.${key}.description`),
        coverage: t(`deliveryNetwork.items.${key}.coverage`),
        transit: t(`deliveryNetwork.items.${key}.transit`),
      })),
    [t],
  );

  const stats = useMemo(
    () =>
      STAT_KEYS.map((key) => ({
        value: t(`deliveryNetwork.stats.${key}.value`),
        label: t(`deliveryNetwork.stats.${key}.label`),
      })),
    [t],
  );

  return (
    <section className="bg-blue-500 min-w-0 py-12 sm:py-16 lg:py-20">
      <div className="page-container min-w-0">
        <SectionHeading
          eyebrow={t("deliveryNetwork.eyebrow")}
          title={t("deliveryNetwork.title")}
          description={t("deliveryNetwork.description")}
          light
        />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-10 lg:mb-12">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl bg-white/10 border border-white/20 px-4 py-5 sm:px-6 sm:py-6 text-center min-w-0"
            >
              <p className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-1">{stat.value}</p>
              <p className="text-xs sm:text-sm text-blue-100">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mb-8 sm:mb-10">
          {networkItems.map((item) => (
            <article
              key={item.id}
              className="rounded-2xl sm:rounded-3xl bg-white p-5 sm:p-6 min-w-0
                hover:shadow-lg transition-shadow duration-200"
            >
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3">{item.title}</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">{item.description}</p>
              <dl className="space-y-2 text-xs sm:text-sm">
                <div>
                  <dt className="font-semibold text-blue-600">{t("shared.coverage")}</dt>
                  <dd className="text-gray-600 mt-0.5">{item.coverage}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-blue-600">{t("shared.typicalTransit")}</dt>
                  <dd className="text-gray-600 mt-0.5">{item.transit}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>

        <div className="rounded-2xl sm:rounded-3xl overflow-hidden bg-white/10 border border-white/20 min-h-[220px] sm:min-h-[320px] flex items-center justify-center">
          <div className="text-center px-4 py-8 sm:py-12">
            <LuMap
              className="w-16 h-16 sm:w-24 sm:h-24 mx-auto mb-4 opacity-60 text-white"
              strokeWidth={1}
              aria-hidden
            />
            <p className="text-sm sm:text-base text-blue-100 font-medium">
              {t("deliveryNetwork.mapTitle")}
            </p>
            <p className="text-xs sm:text-sm text-blue-200 mt-2 max-w-md mx-auto">
              {t("deliveryNetwork.mapDescription")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
