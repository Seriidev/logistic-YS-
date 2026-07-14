import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { LuChevronDown } from "react-icons/lu";
import Footer from "../components/Footer";

const SECTION_IDS = ["shipping-options", "how-to-ship", "customs"];

const SECTION_QUESTION_KEYS = {
  "shipping-options": ["q1", "q2", "q3", "q4", "q5", "q6"],
  "how-to-ship": ["q7", "q8", "q9", "q10", "q11"],
  customs: ["q12", "q13", "q14", "q15", "q16"],
};

function renderAnswer(t, sectionId, qKey) {
  const base = `sections.${sectionId}.questions.${qKey}`;

  switch (qKey) {
    case "q1":
      return (
        <div className="flex flex-col gap-3">
          <p className="text-sm text-gray-600">{t(`${base}.intro`)}</p>
          <ul className="list-disc pl-5 flex flex-col gap-1.5 text-sm text-gray-600">
            <li>
              <strong>{t(`${base}.seaFreightBold`)}</strong> — {t(`${base}.seaFreightText`)}
            </li>
            <li>
              <strong>{t(`${base}.airFreightBold`)}</strong> — {t(`${base}.airFreightText`)}
            </li>
            <li>
              <strong>{t(`${base}.expressBold`)}</strong> — {t(`${base}.expressText`)}
            </li>
          </ul>
          <p className="text-sm text-gray-600">{t(`${base}.outro`)}</p>
          <div className="rounded-xl overflow-hidden h-40 bg-gray-100">
            <img src="/shipping/sea-freight.jpg" alt={t(`${base}.seaFreightAlt`)}
              className="w-full h-full object-cover"
              onError={(e) => { e.target.style.display = "none"; }} />
          </div>
        </div>
      );
    case "q2":
      return (
        <div className="flex flex-col gap-3">
          <ul className="list-disc pl-5 flex flex-col gap-1.5 text-sm text-gray-600">
            <li>
              <strong>{t(`${base}.fclBold`)}</strong> — {t(`${base}.fclText`)}
            </li>
            <li>
              <strong>{t(`${base}.lclBold`)}</strong> — {t(`${base}.lclText`)}
            </li>
          </ul>
          <div className="rounded-xl overflow-hidden h-40 bg-gray-100">
            <img src="/shipping/fcl-lcl.jpg" alt={t(`${base}.fclLclAlt`)}
              className="w-full h-full object-cover"
              onError={(e) => { e.target.style.display = "none"; }} />
          </div>
          <p className="text-sm text-gray-600">{t(`${base}.note1`)}</p>
          <p className="text-sm text-gray-600">{t(`${base}.note2`)}</p>
          <div className="rounded-xl overflow-hidden h-40 bg-gray-100">
            <img src="/shipping/fcl-lcl-calc.jpg" alt={t(`${base}.fclLclCalcAlt`)}
              className="w-full h-full object-cover"
              onError={(e) => { e.target.style.display = "none"; }} />
          </div>
        </div>
      );
    case "q3": {
      const rows = [
        { method: t(`${base}.express`), time: t(`${base}.expressTime`) },
        { method: t(`${base}.airFreight`), time: t(`${base}.airFreightTime`) },
        { method: t(`${base}.seaFreight`), time: t(`${base}.seaFreightTime`) },
      ];
      return (
        <div className="flex flex-col gap-3">
          <p className="text-sm text-gray-600">{t(`${base}.intro`)}</p>
          <div className="overflow-hidden rounded-xl border border-gray-100">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left px-4 py-2.5 text-gray-600 font-semibold">
                    {t(`${base}.tableMethod`)}
                  </th>
                  <th className="text-left px-4 py-2.5 text-gray-600 font-semibold">
                    {t(`${base}.tableTime`)}
                  </th>
                  <th className="text-left px-4 py-2.5 text-gray-600 font-semibold">
                    {t(`${base}.tablePriority`)}
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="px-4 py-2.5 text-gray-700">{row.method}</td>
                    <td className="px-4 py-2.5 text-gray-700">{row.time}</td>
                    <td className="px-4 py-2.5 text-gray-700">{t(`${base}.priority`)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }
    case "q7": {
      const steps = t(`${base}.steps`, { returnObjects: true });
      return (
        <ol className="list-decimal pl-5 flex flex-col gap-2 text-sm text-gray-600">
          {steps.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>
      );
    }
    case "q11": {
      const items = t(`${base}.items`, { returnObjects: true });
      return (
        <ul className="list-disc pl-5 flex flex-col gap-1.5 text-sm text-gray-600">
          {items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      );
    }
    case "q16": {
      const items = t(`${base}.items`, { returnObjects: true });
      return (
        <div className="flex flex-col gap-3">
          <p className="text-sm text-gray-600">{t(`${base}.intro`)}</p>
          <ul className="list-disc pl-5 flex flex-col gap-1.5 text-sm text-gray-600">
            {items.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      );
    }
    default:
      return <p className="text-sm text-gray-600">{t(`${base}.a`)}</p>;
  }
}

function AccordionItem({ question, answer }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`rounded-2xl border transition-all duration-200
      ${open ? "border-blue-200 bg-blue-50" : "border-gray-100 bg-gray-50"}`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 rounded-full
          text-left bg-transparent border-none cursor-pointer font-[inherit]"
      >
        <span className={`text-sm font-medium transition-colors duration-150 pr-4 min-w-0
          ${open ? "text-blue-500" : "text-gray-800"}`}>
          {question}
        </span>
        <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center
          justify-center transition-all duration-200
          ${open ? "bg-blue-500" : "bg-gray-200"}`}>
          <LuChevronDown
            className={`w-3 h-3 transition-transform duration-200 ${open ? "rotate-180 text-white" : "text-gray-500"}`}
            aria-hidden="true"
          />
        </div>
      </button>

      {open && (
        <div className="px-5 pb-5">
          <div className="h-px bg-blue-200 mb-4" />
          {answer}
        </div>
      )}
    </div>
  );
}

export default function ShippingMethodsPage() {
  const { t } = useTranslation("shippingMethod");
  const [activeSection, setActiveSection] = useState("shipping-options");

  const sections = useMemo(
    () =>
      SECTION_IDS.map((id) => ({
        id,
        title: t(`sections.${id}.title`),
        questionKeys: SECTION_QUESTION_KEYS[id],
      })),
    [t],
  );

  const scrollTo = (id) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <>
    <section className="page-container min-w-0 py-6">

      <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <a href="/" className="hover:text-blue-500 no-underline text-gray-500">
          {t("common:common.main")}
        </a>
        <span>›</span>
        <span className="text-gray-900 font-medium">{t("breadcrumb.title")}</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-stretch min-w-0">

        <div className="page-sidebar page-sidebar--wide">
          <nav>
            {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollTo(section.id)}
                  className={`
                    text-left text-sm px-3 py-2 rounded-full transition-all duration-150
                    border-none cursor-pointer font-[inherit] leading-snug
                    ${section.id === "customs" ? "!whitespace-normal" : ""}
                    ${activeSection === section.id
                      ? "bg-blue-50 text-blue-500 font-semibold"
                      : "bg-transparent text-gray-500 hover:text-gray-900 hover:bg-gray-50"}
                  `}
                >
                {section.id === "customs" ? (
                  <span className="block">
                    <span className="block">{t("sections.customs.sidebarLine1")}</span>
                    <span className="block">{t("sections.customs.sidebarLine2")}</span>
                  </span>
                ) : (
                  section.title
                )}
              </button>
            ))}
          </nav>
        </div>

        <div className="flex-1 min-w-0 flex flex-col gap-12 pb-20">
          {sections.map((section) => (
            <div key={section.id} id={section.id}>
              <h2 className="text-xl font-bold text-gray-900 mb-5">
                {section.title}
              </h2>
              <div className="flex flex-col gap-3">
                {section.questionKeys.map((qKey) => (
                  <AccordionItem
                    key={qKey}
                    question={t(`sections.${section.id}.questions.${qKey}.q`)}
                    answer={renderAnswer(t, section.id, qKey)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
    <Footer/>
    </>
  );
}
