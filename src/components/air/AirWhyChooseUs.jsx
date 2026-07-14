import {
  LuClock,
  LuCrosshair,
  LuHeadphones,
  LuLayers,
  LuPlane,
  LuTruck,
} from "react-icons/lu";
import { useTranslation } from "react-i18next";
import { SectionHeading, ImageBlock } from "./shared";

const FEATURE_IDS = [1, 2, 3, 4, 5, 6];

const FEATURE_ICONS = {
  1: LuPlane,
  2: LuClock,
  3: LuCrosshair,
  4: LuLayers,
  5: LuTruck,
  6: LuHeadphones,
};

export default function AirWhyChooseUs() {
  const { t } = useTranslation("airCargo");

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
            src="/minibanner1.jpg"
            alt={t("whyChooseUs.imageAlt")}
            hint={t("shared.imageHint", { path: "/minibanner1.jpg" })}
            className="w-full lg:w-[420px] lg:shrink-0 h-64 sm:h-80 lg:h-[480px] rounded-2xl sm:rounded-3xl"
          />

          <div className="flex-1 min-w-0 flex flex-col gap-3 sm:gap-4">
            {FEATURE_IDS.map((id) => {
              const Icon = FEATURE_ICONS[id];
              return (
                <div
                  key={id}
                  className="flex items-start gap-4 bg-white rounded-2xl px-4 sm:px-5 py-4
                    hover:bg-blue-50 transition-colors duration-150 border border-gray-100"
                >
                  <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-blue-500" strokeWidth={1.5} aria-hidden />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-blue-600 mb-0.5">{t(`whyChooseUs.features.${id}.title`)}</p>
                    <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">{t(`whyChooseUs.features.${id}.description`)}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
