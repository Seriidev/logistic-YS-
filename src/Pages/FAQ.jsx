import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { LuBuilding, LuChevronDown, LuCreditCard, LuTruck } from "react-icons/lu";
import Footer from "../components/Footer";

const SECTION_IDS = ["shipping", "orders", "business"];

const SECTION_ICONS = {
  shipping: LuTruck,
  orders: LuCreditCard,
  business: LuBuilding,
};

const SCROLL_OFFSET = 128;

function AccordionItem({ question, answer }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`rounded-xl sm:rounded-2xl border bg-white shadow-sm transition-all duration-300 ease-out
        ${open ? "border-blue-200 shadow-md shadow-blue-500/5 ring-1 ring-blue-100" : "border-gray-100 hover:border-gray-200 hover:shadow-md"}`}
    >
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-4 px-4 sm:px-5 py-4 sm:py-4.5 text-left bg-transparent border-none cursor-pointer font-[inherit] min-h-[52px]"
      >
        <span
          className={`text-sm sm:text-[15px] font-medium leading-snug transition-colors duration-200 min-w-0
            ${open ? "text-blue-600" : "text-gray-800"}`}
        >
          {question}
        </span>
        <span
          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300
            ${open ? "bg-blue-500 text-white rotate-180" : "bg-gray-100 text-gray-500"}`}
        >
          <LuChevronDown className="w-3.5 h-3.5" aria-hidden="true" />
        </span>
      </button>

      <div
        className={`faq-accordion-panel grid transition-[grid-template-rows] duration-300 ease-out
          ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <div className="overflow-hidden min-w-0">
          <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-0">
            <div className="h-px bg-gradient-to-r from-blue-100 via-blue-50 to-transparent mb-4" />
            <p className="text-sm text-gray-600 leading-relaxed">{answer}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SidebarNavButton({ section, isActive, onClick, compact = false }) {
  const SectionIcon = SECTION_ICONS[section.id];

  return (
    <button
      type="button"
      onClick={() => onClick(section.id)}
      aria-current={isActive ? "true" : undefined}
      className={`
        group flex items-center gap-2.5 border-none cursor-pointer font-[inherit] transition-all duration-200
        ${compact
          ? `shrink-0 px-4 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap
            ${isActive
              ? "bg-blue-500 text-white shadow-md shadow-blue-500/25"
              : "bg-white text-gray-600 border border-gray-200 hover:border-blue-200 hover:text-blue-600"}`
          : `w-full text-left px-3.5 py-3 rounded-xl text-sm
            ${isActive
              ? "bg-blue-500 text-white shadow-md shadow-blue-500/20 font-semibold"
              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-medium"}`}
      `}
    >
      <span
        className={`flex items-center justify-center w-7 h-7 rounded-lg transition-colors duration-200
          ${isActive
            ? compact ? "text-white/90" : "bg-white/20 text-white"
            : "bg-gray-100 text-gray-500 group-hover:bg-blue-50 group-hover:text-blue-500"}`}
      >
        <SectionIcon className="w-4 h-4 shrink-0" aria-hidden="true" />
      </span>
      <span className="min-w-0 leading-snug">{section.title}</span>
    </button>
  );
}

export default function FAQPage() {
  const { t } = useTranslation("faq");
  const [activeSection, setActiveSection] = useState("shipping");
  const scrollLockRef = useRef(false);
  const scrollLockTimer = useRef(null);

  const faqData = useMemo(
    () =>
      SECTION_IDS.map((id) => ({
        id,
        title: t(`sections.${id}.title`),
        questions: t(`sections.${id}.questions`, { returnObjects: true }),
      })),
    [t],
  );

  const scrollTo = useCallback((id) => {
    setActiveSection(id);
    scrollLockRef.current = true;
    if (scrollLockTimer.current) clearTimeout(scrollLockTimer.current);

    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;
      window.scrollTo({ top, behavior: "smooth" });
    }

    scrollLockTimer.current = setTimeout(() => {
      scrollLockRef.current = false;
    }, 700);
  }, []);

  useEffect(() => {
    const sectionEls = faqData.map((s) => document.getElementById(s.id)).filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        if (scrollLockRef.current) return;

        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target?.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: `-${SCROLL_OFFSET}px 0px -55% 0px`,
        threshold: [0, 0.15, 0.35, 0.5],
      },
    );

    sectionEls.forEach((el) => observer.observe(el));
    return () => {
      observer.disconnect();
      if (scrollLockTimer.current) clearTimeout(scrollLockTimer.current);
    };
  }, [faqData]);

  return (
    <>
      <section className="page-container min-w-0 pt-8 sm:pt-10 lg:pt-12 pb-10 sm:pb-14 lg:pb-16">
        <nav
          aria-label="Breadcrumb"
          className="relative z-10 flex items-center gap-2 text-sm text-gray-500 mb-8 sm:mb-10 lg:mb-12 shrink-0"
        >
          <a href="/" className="hover:text-blue-500 no-underline text-gray-500 transition-colors">
            {t("common:common.main")}
          </a>
          <span className="text-gray-300" aria-hidden="true">›</span>
          <span className="text-gray-900 font-medium">{t("breadcrumb.title")}</span>
        </nav>

        <div className="lg:hidden mb-8 sm:mb-10">
          <div className="flex gap-2 overflow-x-auto pb-2 -mx-0.5 px-0.5 scrollbar-none snap-x snap-mandatory">
            {faqData.map((section) => (
              <div key={section.id} className="snap-start">
                <SidebarNavButton
                  section={section}
                  isActive={activeSection === section.id}
                  onClick={scrollTo}
                  compact
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 xl:gap-12 items-start min-w-0 mt-2 sm:mt-0">
          <aside className="hidden lg:block w-64 xl:w-72 shrink-0 sticky top-28 xl:top-32 self-start">
            <div className="rounded-2xl border border-gray-100 bg-white p-3.5 sm:p-4 shadow-sm">
              <p className="px-3 pt-2 pb-3 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                {t("categories")}
              </p>
              <nav className="flex flex-col gap-1">
                {faqData.map((section) => (
                  <SidebarNavButton
                    key={section.id}
                    section={section}
                    isActive={activeSection === section.id}
                    onClick={scrollTo}
                  />
                ))}
              </nav>
            </div>
          </aside>

          <div className="flex-1 min-w-0 w-full lg:pt-1">
            <div className="rounded-2xl sm:rounded-3xl border border-gray-100 bg-white/80 backdrop-blur-sm p-5 sm:p-6 lg:p-8 shadow-sm">
              <div className="flex flex-col gap-10 sm:gap-11 lg:gap-12 pb-2 sm:pb-4 lg:pb-6">
                {faqData.map((section) => {
                  const SectionIcon = SECTION_ICONS[section.id];
                  return (
                  <div key={section.id} id={section.id} className="scroll-mt-32 sm:scroll-mt-36 min-w-0">
                    <div className="flex items-center gap-3 mb-5 sm:mb-6 pb-4 sm:pb-5 border-b border-gray-100">
                      <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-50 text-blue-500">
                        <SectionIcon className="w-4 h-4 shrink-0" aria-hidden="true" />
                      </span>
                      <h2 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight">
                        {section.title}
                      </h2>
                    </div>
                    <div className="flex flex-col gap-3.5 sm:gap-4">
                      {section.questions.map((item, i) => (
                        <AccordionItem key={i} question={item.q} answer={item.a} />
                      ))}
                    </div>
                  </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
