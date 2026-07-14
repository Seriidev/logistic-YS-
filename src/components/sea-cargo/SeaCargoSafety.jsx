import {
  LuClipboardCheck,
  LuCrosshair,
  LuLock,
  LuShield,
  LuShieldCheck,
} from "react-icons/lu";
import { useTranslation } from "react-i18next";
import { SectionHeading, ImageBlock } from "./shared";

const SAFETY_BLOCK_KEYS = [
  "containerSecurity",
  "cargoInsurance",
  "gpsTracking",
  "customsCompliance",
  "professionalHandling",
];

const SAFETY_ICONS = [
  LuLock,
  LuShieldCheck,
  LuCrosshair,
  LuClipboardCheck,
  LuShield,
];

const BADGE_KEYS = ["iso9001", "ctpat", "aeo", "imdg", "solas"];

export default function SeaCargoSafety() {
  const { t } = useTranslation("seaCargo");

  return (
    <section className="bg-gray-50 min-w-0 py-12 sm:py-16 lg:py-20">
      <div className="page-container min-w-0">
        <SectionHeading
          eyebrow={t("safety.eyebrow")}
          title={t("safety.title")}
          description={t("safety.description")}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center min-w-0 mb-8 sm:mb-10">
          <ImageBlock
            src="/sea-safety.jpg"
            alt={t("safety.imageAlt")}
            hint={t("safety.photoHint")}
            className="w-full h-56 sm:h-72 lg:h-[420px] rounded-2xl sm:rounded-3xl"
          />

          <div className="min-w-0">
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-6">
              {t("safety.intro")}
            </p>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {BADGE_KEYS.map((key) => (
                <span
                  key={key}
                  className="inline-flex items-center px-3 py-1.5 rounded-full bg-blue-50 text-blue-700
                    text-xs font-semibold border border-blue-100"
                >
                  {t(`safety.badges.${key}`)}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-5">
          {SAFETY_BLOCK_KEYS.map((key, index) => {
            const Icon = SAFETY_ICONS[index];
            return (
              <article
                key={key}
                className="bg-white rounded-2xl sm:rounded-3xl border border-gray-100 p-5 sm:p-6
                  hover:shadow-md hover:border-blue-200 transition-all duration-200 min-w-0"
              >
                <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-blue-500" strokeWidth={1.5} aria-hidden />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-2">
                  {t(`safety.blocks.${key}.title`)}
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                  {t(`safety.blocks.${key}.description`)}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
