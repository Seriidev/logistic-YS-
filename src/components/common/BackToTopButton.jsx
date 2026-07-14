import { LuChevronUp } from "react-icons/lu";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
const SCROLL_THRESHOLD = 400;

export default function BackToTopButton() {
  const { t } = useTranslation("common");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > SCROLL_THRESHOLD);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label={t("shared.backToTop")}
      tabIndex={visible ? 0 : -1}
      className={`
        fixed z-[60]
        bottom-4 right-4 sm:bottom-5 sm:right-5 lg:bottom-6 lg:right-6
        flex items-center justify-center
        w-11 h-11 sm:w-12 sm:h-12
        rounded-full border-none cursor-pointer
        bg-blue-500 text-white
        shadow-[0_4px_16px_rgba(59,130,246,0.35)]
        transition-all duration-300 ease-out
        hover:bg-blue-600 hover:-translate-y-1
        hover:shadow-[0_8px_24px_rgba(59,130,246,0.45)]
        active:translate-y-0
        ${visible
          ? "opacity-100 scale-100 pointer-events-auto"
          : "opacity-0 scale-90 pointer-events-none"}
      `}
    >
      <LuChevronUp className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
    </button>
  );
}
