import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { SectionHeading, AccordionItem } from "./shared";

export default function TruckFAQ() {
  const { t } = useTranslation("truckCargo");

  const faqItems = useMemo(
    () => t("faq.items", { returnObjects: true }),
    [t],
  );

  return (
    <section className="page-container min-w-0 py-12 sm:py-16 lg:py-20">
      <SectionHeading
        eyebrow={t("faq.eyebrow")}
        title={t("faq.title")}
        description={t("faq.description")}
      />

      <div className="max-w-3xl mx-auto flex flex-col gap-3 sm:gap-4 min-w-0">
        {faqItems.map((item) => (
          <AccordionItem key={item.q} question={item.q} answer={item.a} />
        ))}
      </div>
    </section>
  );
}
