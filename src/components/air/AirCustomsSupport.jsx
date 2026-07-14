import { useMemo } from "react";
import { LuFileText } from "react-icons/lu";
import { useTranslation } from "react-i18next";
import { SectionHeading, CheckItem, ImageBlock } from "./shared";

const SERVICE_KEYS = ["0", "1", "2", "3", "4", "5"];
const DOCUMENT_KEYS = ["commercialInvoice", "packingList", "airWaybill", "customsDeclaration"];

export default function AirCustomsSupport() {
  const { t } = useTranslation("airCargo");

  const services = useMemo(
    () => SERVICE_KEYS.map((key) => t(`customsSupport.services.${key}`)),
    [t],
  );

  return (
    <section className="bg-gray-50 min-w-0 py-12 sm:py-16 lg:py-20">
      <div className="page-container min-w-0">
        <SectionHeading
          eyebrow={t("customsSupport.eyebrow")}
          title={t("customsSupport.title")}
          description={t("customsSupport.description")}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-start min-w-0">
          <ImageBlock
            src="/minibanner5.jpg"
            alt={t("customsSupport.imageAlt")}
            hint={t("shared.imageHint", { path: "/minibanner5.jpg" })}
            className="w-full h-56 sm:h-72 lg:h-[400px] rounded-2xl sm:rounded-3xl"
          />

          <div className="min-w-0">
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-6">
              {t("customsSupport.body")}
            </p>

            <div className="flex flex-col gap-3 mb-6 sm:mb-8">
              {services.map((item) => (
                <CheckItem key={item} text={item} />
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mt-8 sm:mt-10">
          {DOCUMENT_KEYS.map((key) => (
            <article
              key={key}
              className="rounded-2xl bg-white border border-gray-100 p-5 sm:p-6 min-w-0"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center mb-3">
                <LuFileText className="w-5 h-5 text-blue-500" strokeWidth={1.5} aria-hidden />
              </div>
              <h3 className="text-sm font-bold text-gray-900 mb-1">{t(`customsSupport.documents.${key}.name`)}</h3>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">{t(`customsSupport.documents.${key}.desc`)}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
