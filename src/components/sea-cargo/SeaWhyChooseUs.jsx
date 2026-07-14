import {
  LuCrosshair,
  LuDollarSign,
  LuFileText,
  LuGlobe,
  LuPackage,
  LuShield,
} from "react-icons/lu";
import { useTranslation } from "react-i18next";
import { SectionHeading, ImageBlock } from "./shared";

const BENEFIT_KEYS = [
  "costEffective",
  "globalCoverage",
  "largeCapacity",
  "secureTransportation",
  "customsAssistance",
  "realTimeTracking",
];

const BENEFIT_ICONS = [
  LuDollarSign,
  LuGlobe,
  LuPackage,
  LuShield,
  LuFileText,
  LuCrosshair,
];

export default function SeaWhyChooseUs() {
  const { t } = useTranslation("seaCargo");

  return (
    <section className="bg-gray-50 min-w-0 py-12 sm:py-16 lg:py-20">
      <div className="page-container min-w-0">
        <SectionHeading
          eyebrow={t("whyChooseUs.eyebrow")}
          title={t("whyChooseUs.title")}
          description={t("whyChooseUs.description")}
        />

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-stretch min-w-0">
          <ImageBlock
            src="/sea-why-choose.jpg"
            alt={t("whyChooseUs.imageAlt")}
            hint={t("whyChooseUs.photoHint")}
            className="w-full lg:w-[420px] lg:shrink-0 h-64 sm:h-80 lg:h-[480px] rounded-2xl sm:rounded-3xl"
          />

          <div className="flex-1 min-w-0 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {BENEFIT_KEYS.map((key, index) => {
              const Icon = BENEFIT_ICONS[index];
              return (
                <article
                  key={key}
                  className="flex items-start gap-4 bg-white rounded-2xl px-4 sm:px-5 py-4
                    hover:bg-blue-50 hover:shadow-md transition-all duration-200 border border-gray-100 min-w-0"
                >
                  <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-blue-500" strokeWidth={1.5} aria-hidden />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold text-blue-600 mb-0.5">
                      {t(`whyChooseUs.benefits.${key}.title`)}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                      {t(`whyChooseUs.benefits.${key}.description`)}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
