import { LuQuote } from "react-icons/lu";
import { useTranslation } from "react-i18next";
import { SectionHeading } from "./shared";

const METRIC_KEYS = ["shipments", "quote", "delivery", "claims"];
const TESTIMONIAL_IDS = [1, 2, 3];

export default function AirSuccessMetrics() {
  const { t } = useTranslation("airCargo");

  return (
    <section className="bg-gray-50 min-w-0 py-12 sm:py-16 lg:py-20">
      <div className="page-container min-w-0">
        <SectionHeading
          eyebrow={t("successMetrics.eyebrow")}
          title={t("successMetrics.title")}
          description={t("successMetrics.description")}
        />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-8 sm:mb-10 lg:mb-12">
          {METRIC_KEYS.map((key) => (
            <article
              key={key}
              className="rounded-2xl sm:rounded-3xl bg-white border border-gray-100 p-4 sm:p-6 text-center min-w-0"
            >
              <p className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-blue-600 mb-1 sm:mb-2">
                {t(`successMetrics.metrics.${key}.value`)}
              </p>
              <p className="text-xs sm:text-sm font-bold text-gray-900 mb-1">{t(`successMetrics.metrics.${key}.label`)}</p>
              <p className="text-[10px] sm:text-xs text-gray-500 leading-relaxed">{t(`successMetrics.metrics.${key}.detail`)}</p>
            </article>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
          {TESTIMONIAL_IDS.map((id) => (
            <blockquote
              key={id}
              className="rounded-2xl sm:rounded-3xl bg-white border border-gray-100 p-5 sm:p-6 min-w-0"
            >
              <LuQuote className="w-8 h-8 text-blue-500 opacity-30 mb-3" aria-hidden />
              <p className="text-sm text-gray-600 leading-relaxed mb-4">&ldquo;{t(`successMetrics.testimonials.${id}.quote`)}&rdquo;</p>
              <footer>
                <p className="text-sm font-bold text-gray-900">{t(`successMetrics.testimonials.${id}.author`)}</p>
                <p className="text-xs text-gray-500">{t(`successMetrics.testimonials.${id}.role`)}</p>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
