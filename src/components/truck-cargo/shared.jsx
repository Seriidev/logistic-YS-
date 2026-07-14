import { useState } from "react";
import { useTranslation } from "react-i18next";
import { LuChevronDown, LuCircleCheck, LuImage } from "react-icons/lu";

export function SectionHeading({ eyebrow, title, description, light = false }) {
  return (
    <div className="text-center mb-8 sm:mb-10 lg:mb-12 px-2 max-w-3xl mx-auto">
      {eyebrow && (
        <p
          className={`text-xs sm:text-sm font-semibold uppercase tracking-widest mb-2 sm:mb-3 ${
            light ? "text-blue-200" : "text-blue-500"
          }`}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={`text-xl sm:text-2xl lg:text-3xl font-extrabold leading-tight mb-3 sm:mb-4 ${
          light ? "text-white" : "text-gray-900"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p className={`text-sm sm:text-base leading-relaxed ${light ? "text-blue-100" : "text-gray-500"}`}>
          {description}
        </p>
      )}
    </div>
  );
}

export function CheckItem({ text }) {
  return (
    <div className="flex items-start gap-2.5 min-w-0">
      <LuCircleCheck
        className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 mt-0.5 text-blue-500"
        strokeWidth={1.5}
        aria-hidden
      />
      <span className="text-xs sm:text-sm text-gray-600 leading-relaxed">{text}</span>
    </div>
  );
}

export function ImageBlock({ src, alt, hint, className = "" }) {
  const { t } = useTranslation("truckCargo");
  const [failed, setFailed] = useState(false);
  const fallbackHint = hint || t("shared.imageHint", { path: src });

  if (failed) {
    return (
      <div
        className={`overflow-hidden bg-gray-100 flex flex-col items-center justify-center gap-2 ${className}`}
      >
        <LuImage className="w-12 h-12 text-gray-400" strokeWidth={1.5} aria-hidden />
        <p className="text-xs text-gray-400 text-center px-3">{fallbackHint}</p>
      </div>
    );
  }

  return (
    <div className={`overflow-hidden bg-gray-100 ${className}`}>
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        onError={() => setFailed(true)}
      />
    </div>
  );
}

export function AccordionItem({ question, answer }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`rounded-2xl border transition-all duration-200 min-w-0 ${
        open ? "border-blue-200 bg-blue-50" : "border-gray-100 bg-gray-50"
      }`}
    >
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-3 px-4 sm:px-5 py-4
          text-left bg-transparent border-none cursor-pointer font-[inherit] min-w-0"
      >
        <span
          className={`text-sm sm:text-base font-medium min-w-0 flex-1 ${
            open ? "text-blue-600" : "text-gray-800"
          }`}
        >
          {question}
        </span>
        <div
          className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
            open ? "bg-blue-500" : "bg-gray-200"
          }`}
        >
          <LuChevronDown
            className={`w-3 h-3 transition-transform duration-200 ${open ? "rotate-180 text-white" : "text-gray-500"}`}
            strokeWidth={2}
            aria-hidden
          />
        </div>
      </button>
      {open && (
        <div className="px-4 sm:px-5 pb-4 sm:pb-5 min-w-0">
          <div className="h-px bg-blue-200 mb-3 sm:mb-4" />
          <p className="text-sm text-gray-600 leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
}
