import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SectionHeading, CheckItem, ImageBlock } from "./shared";

const TABS = ["ftl", "ltl"];

const TAB_IMAGES = {
  ftl: "/minibanner2.jpg",
  ltl: "/minibanner5.jpg",
};

export default function TruckTransportTypes() {
  const { t } = useTranslation("truckCargo");
  const [activeTab, setActiveTab] = useState("ftl");

  const transportTypes = useMemo(
    () =>
      Object.fromEntries(
        TABS.map((tab) => [
          tab,
          {
            id: tab,
            label: t(`transportTypes.tabs.${tab}.label`),
            shortLabel: t(`transportTypes.tabs.${tab}.shortLabel`),
            description: t(`transportTypes.tabs.${tab}.description`),
            delivery: t(`transportTypes.tabs.${tab}.delivery`),
            capacity: t(`transportTypes.tabs.${tab}.capacity`),
            image: TAB_IMAGES[tab],
            advantages: t(`transportTypes.tabs.${tab}.advantages`, { returnObjects: true }),
          },
        ]),
      ),
    [t],
  );

  const active = transportTypes[activeTab];

  return (
    <section className="page-container min-w-0 py-12 sm:py-16 lg:py-20" aria-labelledby="transport-types-heading">
      <SectionHeading
        eyebrow={t("transportTypes.eyebrow")}
        title={t("transportTypes.title")}
        description={t("transportTypes.description")}
      />

      <div
        role="tablist"
        aria-label={t("transportTypes.tablistAria")}
        className="flex flex-col sm:flex-row gap-2 sm:gap-3 mb-8 sm:mb-10 max-w-xl mx-auto"
      >
        {TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            role="tab"
            aria-selected={activeTab === tab}
            aria-controls={`panel-${tab}`}
            id={`tab-${tab}`}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 min-h-[44px] px-4 sm:px-6 py-3 rounded-full text-xs sm:text-sm font-bold uppercase
              tracking-wider border-none cursor-pointer font-[inherit] transition-all duration-200
              ${activeTab === tab
                ? "bg-blue-500 text-white shadow-md shadow-blue-500/25"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
          >
            {transportTypes[tab].label}
          </button>
        ))}
      </div>

      <div
        id={`panel-${activeTab}`}
        role="tabpanel"
        aria-labelledby={`tab-${activeTab}`}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-start min-w-0
          animate-[fadeIn_0.3s_ease-out]"
      >
        <ImageBlock
          src={active.image}
          alt={t("transportTypes.imageAlt", { type: active.shortLabel })}
          hint={t("shared.imageHint", { path: `public${active.image}` })}
          className="w-full h-56 sm:h-72 lg:h-[420px] rounded-2xl sm:rounded-3xl"
        />

        <div className="min-w-0">
          <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider mb-4">
            {active.shortLabel}
          </span>

          <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-5">
            {active.description}
          </p>

          <div className="rounded-2xl bg-gray-50 border border-gray-100 p-4 sm:p-5 mb-5 sm:mb-6 space-y-3">
            <div>
              <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">{t("shared.delivery")}</p>
              <p className="text-sm text-gray-600">{active.delivery}</p>
            </div>
            <div className="h-px bg-gray-200" />
            <div>
              <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">{t("shared.capacity")}</p>
              <p className="text-sm text-gray-600">{active.capacity}</p>
            </div>
          </div>

          <p className="text-sm font-semibold text-gray-900 mb-3">{t("shared.keyAdvantages")}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 sm:mb-8">
            {active.advantages.map((item) => (
              <CheckItem key={item} text={item} />
            ))}
          </div>

          <Link
            to={`/truck-cargo-booking?service=${activeTab}`}
            className="inline-flex items-center justify-center min-h-[44px] px-6 py-2.5
              rounded-full bg-blue-500 text-white text-sm font-bold uppercase tracking-wider
              no-underline hover:bg-blue-600 transition-colors"
          >
            {t("shared.getQuote", { type: active.shortLabel })}
          </Link>
        </div>
      </div>
    </section>
  );
}
