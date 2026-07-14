import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LuCheck, LuChevronDown, LuMenu, LuPhone, LuSearch, LuX } from "react-icons/lu";
import yuuLogo from "../logo/logo.svg";
import i18n, { LOCALE_BY_CODE } from "../i18n";

const LANGUAGES = [
  { code: "RU", flag: "🇷🇺", nameKey: "russian", popular: true },
  { code: "EN", flag: "EN", nameKey: "english", popular: true },
  { code: "ZH", flag: "🇨🇳", nameKey: "chinese", popular: true },
  { code: "UZ", flag: "🇺🇿", nameKey: "uzbek", popular: true },
  { code: "DE", flag: "🇩🇪", nameKey: "german", popular: false },
  { code: "TR", flag: "🇹🇷", nameKey: "turkish", popular: false },
  { code: "KZ", flag: "🇰🇿", nameKey: "kazakh", popular: false },
  { code: "JA", flag: "🇯🇵", nameKey: "japanese", popular: false },
  { code: "KO", flag: "🇰🇷", nameKey: "korean", popular: false },
  { code: "AR", flag: "🇦🇪", nameKey: "arabic", popular: false },
];

const NAV_LINKS = [
  { labelKey: "shipNow", href: "/ship-now" },
  { labelKey: "track", href: "/track" },
  { labelKey: "locations", href: "/location" },
  { labelKey: "services", href: "/serviceshead" },
  { labelKey: "contactUs", href: "/contact" },
  { labelKey: "calculate", href: "/calculate" },
];

function getLangByCode(code) {
  return LANGUAGES.find((l) => l.code === code) ?? LANGUAGES.find((l) => l.code === "EN");
}

function getCodeByLocale(locale) {
  const entry = Object.entries(LOCALE_BY_CODE).find(([, lng]) => lng === locale);
  return entry ? entry[0] : "EN";
}

function NavLink({ href, label, active, onClick, mobile = false }) {
  const isRoute = href.startsWith("/");
  const base = mobile
    ? "block w-full text-left text-base font-medium px-4 py-3.5 bg-transparent border-0 shadow-none transition-colors duration-150"
    : "text-sm font-medium px-3 py-1.5 bg-transparent border-0 shadow-none rounded-none transition-colors duration-150";
  const stateClass = active
    ? "text-blue-500"
    : "text-gray-700 hover:text-blue-500";

  const className = `${base} no-underline ${stateClass}`;

  if (isRoute) {
    return (
      <Link to={href} onClick={onClick} className={className}>
        {label}
      </Link>
    );
  }

  return (
    <a href={href} onClick={(e) => { e.preventDefault(); onClick?.(); }} className={className}>
      {label}
    </a>
  );
}

function SearchBar({ compact = false }) {
  const { t } = useTranslation();
  const [focused, setFocused] = useState(false);
  return (
    <div
      className={`
        relative w-full h-11
        ${compact ? "max-w-none" : "max-w-full lg:max-w-[26rem]"}
      `}
    >
      <div
        className={`
          flex items-center h-full w-full rounded-full pl-3 pr-[5.5rem] sm:pr-[6.25rem]
          transition-all duration-200
          ${focused ? "bg-white border border-blue-500 shadow-sm" : "bg-gray-100 border border-transparent"}
        `}
      >
        <LuSearch className="w-4 h-4 text-gray-400 mr-2 shrink-0" />
        <input
          type="search"
          placeholder={t("header.search.placeholder")}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="flex-1 min-w-0 h-full bg-transparent outline-none text-sm text-gray-700 placeholder:text-gray-400"
        />
      </div>
      <button
        type="button"
        className="search-field-btn absolute right-1 top-1/2 -translate-y-1/2
          bg-blue-600 hover:bg-blue-700 text-white text-[11px] sm:text-xs font-semibold
          px-3 sm:px-4 h-8 rounded-full transition-colors whitespace-nowrap"
      >
        {t("header.search.button")}
      </button>
    </div>
  );
}

function LangItem({ lang, name, isSelected, onSelect }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`flex items-center gap-2 w-full h-10 px-3.5 mx-1.5 my-0.5 border-none rounded-xl text-sm font-medium cursor-pointer transition-colors font-[inherit]
        ${isSelected ? "bg-blue-50 text-blue-600" : "bg-transparent text-gray-900 hover:bg-gray-50"}`}
    >
      <span className="text-base w-5 text-center leading-none shrink-0">{lang.flag}</span>
      <span className="flex-1 text-left truncate">{name}</span>
      <span className={`text-blue-500 shrink-0 ${isSelected ? "opacity-100" : "opacity-0"}`}>
        <LuCheck className="w-3.5 h-3.5" />
      </span>
    </button>
  );
}

function LanguageSwitcher({ className = "", preferPlacement = "auto", elevated = false }) {
  const { t } = useTranslation();
  const [selected, setSelected] = useState(() => getLangByCode(getCodeByLocale(i18n.language)));
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState("bottom");
  const [fixedStyle, setFixedStyle] = useState(null);
  const ref = useRef(null);
  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const sync = (lng) => setSelected(getLangByCode(getCodeByLocale(lng)));
    sync(i18n.language);
    i18n.on("languageChanged", sync);
    return () => i18n.off("languageChanged", sync);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (!open) {
      setFixedStyle(null);
      return;
    }

    const updatePlacement = () => {
      const button = buttonRef.current;
      if (!button) return;

      const rect = button.getBoundingClientRect();
      const dropdownHeight = dropdownRef.current?.offsetHeight ?? 360;
      const viewportHeight = window.visualViewport?.height ?? window.innerHeight;
      const spaceBelow = viewportHeight - rect.bottom;
      const spaceAbove = rect.top;

      let nextPlacement = "bottom";
      if (preferPlacement === "top") {
        nextPlacement = spaceAbove >= dropdownHeight || spaceAbove >= spaceBelow ? "top" : "bottom";
      } else if (preferPlacement === "bottom") {
        nextPlacement = "bottom";
      } else {
        nextPlacement = spaceBelow >= dropdownHeight || spaceBelow >= spaceAbove ? "bottom" : "top";
      }

      setPlacement(nextPlacement);

      if (elevated || nextPlacement === "top") {
        setFixedStyle({
          left: Math.max(16, Math.min(rect.left, window.innerWidth - 224 - 16)),
          width: Math.min(224, window.innerWidth - 32),
          ...(nextPlacement === "top"
            ? { bottom: viewportHeight - rect.top + 8 }
            : { top: rect.bottom + 8 }),
        });
      } else {
        setFixedStyle(null);
      }
    };

    updatePlacement();
    const raf = requestAnimationFrame(updatePlacement);
    window.addEventListener("resize", updatePlacement);
    window.visualViewport?.addEventListener("resize", updatePlacement);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", updatePlacement);
      window.visualViewport?.removeEventListener("resize", updatePlacement);
    };
  }, [open, preferPlacement, elevated]);

  const handleSelect = (lang) => {
    setSelected(lang);
    setOpen(false);
    const locale = LOCALE_BY_CODE[lang.code] ?? "en";
    i18n.changeLanguage(locale);
  };

  const popular = LANGUAGES.filter((l) => l.popular);
  const others = LANGUAGES.filter((l) => !l.popular);

  const useFixed = Boolean(fixedStyle);
  const placementClasses = useFixed
    ? ""
    : placement === "top"
      ? "absolute bottom-[calc(100%+8px)] right-0 top-auto"
      : "absolute top-[calc(100%+8px)] right-0";
  const openClasses = open
    ? "opacity-100 translate-y-0 pointer-events-auto"
    : placement === "top"
      ? "opacity-0 translate-y-1 pointer-events-none"
      : "opacity-0 -translate-y-1 pointer-events-none";

  return (
    <div ref={ref} className={`relative shrink-0 ${className}`}>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="listbox"
        className={`
          flex items-center justify-center gap-1.5 h-10 min-h-[44px] min-w-[4.25rem] px-3.5 rounded-full cursor-pointer
          text-sm font-semibold tracking-wide text-gray-800 transition-all duration-200 border font-[inherit]
          ${open
            ? "border-blue-500 bg-blue-50 text-blue-600 shadow-sm shadow-blue-500/10"
            : "border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50/80 hover:text-blue-600"}
        `}
      >
        <span>{selected.code}</span>
        <LuChevronDown className={`w-3.5 h-3.5 shrink-0 transition-transform duration-200 ${open ? "rotate-180" : "rotate-0"} ${open ? "text-blue-500" : "text-gray-400"}`} />
      </button>

      <div
        ref={dropdownRef}
        role="listbox"
        style={useFixed ? { ...fixedStyle, position: "fixed" } : undefined}
        className={`
          ${placementClasses} w-56 max-w-[calc(100vw-2rem)]
          bg-white border border-gray-200 rounded-2xl
          shadow-lg shadow-gray-200/80 overflow-hidden
          ${elevated ? "z-[10200]" : "z-[9999]"}
          transition-all duration-200 ease-out
          ${openClasses}
        `}
      >
        <div className="text-[11px] font-semibold text-gray-400 px-3.5 pt-2.5 pb-1 tracking-wide uppercase">
          {t("header.languages.popular")}
        </div>
        {popular.map((lang) => (
          <LangItem
            key={lang.code}
            lang={lang}
            name={t(`header.languages.${lang.nameKey}`)}
            isSelected={selected.code === lang.code}
            onSelect={() => handleSelect(lang)}
          />
        ))}
        <div className="h-px bg-gray-100 my-1" />
        <div className="text-[11px] font-semibold text-gray-400 px-3.5 pt-2.5 pb-1 tracking-wide uppercase">
          {t("header.languages.other")}
        </div>
        {others.map((lang) => (
          <LangItem
            key={lang.code}
            lang={lang}
            name={t(`header.languages.${lang.nameKey}`)}
            isSelected={selected.code === lang.code}
            onSelect={() => handleSelect(lang)}
          />
        ))}
      </div>
    </div>
  );
}

export default function Header() {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const activeLink = location.pathname || "#services";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className={`
        sticky top-0 z-50 w-full bg-white border-b border-gray-100
        transition-shadow duration-300 min-w-0
        ${scrolled ? "shadow-[0_1px_3px_rgba(0,0,0,0.07),0_4px_16px_rgba(0,0,0,0.05)]" : "shadow-none"}
      `}
    >
      <div className="page-container">
        <div className="flex items-center gap-3 h-14 sm:h-16 min-w-0">
          <a href="/" className="flex items-center gap-2 no-underline shrink-0">
            <img src={yuuLogo} alt={t("header.logoAlt")} className="h-7 sm:h-8 w-auto" />
          </a>

          <div className="hidden lg:block flex-1 min-w-0" />

          <div className="hidden lg:flex items-center gap-3 min-w-0 flex-1 max-w-md">
            <SearchBar />
          </div>

          <a
            href="tel:+78005553535"
            className="hidden xl:flex items-center gap-1.5 text-sm font-medium text-gray-900
              no-underline px-2.5 py-1.5 rounded-lg hover:bg-gray-100 transition-colors shrink-0"
          >
            <span className="text-blue-500"><LuPhone className="w-4 h-4" /></span>
            +7 (800) 555-35-35
          </a>

          <div className="hidden lg:flex items-center gap-2 shrink-0">
            <LanguageSwitcher />
            <Link
              to="/signup"
              className="flex items-center h-10 px-4 bg-gray-100 text-gray-900 rounded-full text-sm font-semibold
                no-underline cursor-pointer hover:bg-blue-600 hover:text-white transition-all font-[inherit]">
              {t("header.auth.signUp")}
            </Link>
            <Link
              to="/login"
              className="flex items-center h-10 px-4 bg-blue-500 text-white rounded-full text-sm font-semibold
                no-underline hover:bg-blue-600 font-[inherit]">
              {t("header.auth.logIn")}
            </Link>
          </div>

          <button
            type="button"
            className="lg:hidden ml-auto flex items-center justify-center w-11 h-11 rounded-xl
              text-gray-800 hover:bg-gray-100 border-none bg-transparent cursor-pointer"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? t("header.menu.close") : t("header.menu.open")}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <LuX className="w-6 h-6" /> : <LuMenu className="w-6 h-6" />}
          </button>
        </div>

        <div className="pb-3 lg:hidden min-w-0">
          <SearchBar compact />
        </div>

        <nav className="hidden lg:flex items-center justify-center gap-0.5 pb-2 overflow-x-auto scrollbar-none">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              label={t(`header.nav.${link.labelKey}`)}
              active={activeLink === link.href}
            />
          ))}
        </nav>
      </div>

      {menuOpen && (
        <div className="lg:hidden fixed inset-0 z-[100] flex justify-end">
          <button
            type="button"
            className="absolute inset-0 bg-black/40 border-none cursor-pointer"
            onClick={closeMenu}
            aria-label={t("header.menu.closeOverlay")}
          />
          <div
            className="relative w-full max-w-sm bg-white shadow-xl flex flex-col overflow-hidden
              animate-[slideIn_0.2s_ease-out]
              h-[100dvh] max-h-[100dvh]
              pt-[env(safe-area-inset-top,0px)] pb-[env(safe-area-inset-bottom,0px)]"
          >
            <div className="shrink-0 flex items-center justify-between px-4 py-3 border-b border-gray-100">
              <span className="text-sm font-bold text-gray-900">{t("header.menu.title")}</span>
              <button
                type="button"
                onClick={closeMenu}
                className="w-11 h-11 flex items-center justify-center rounded-xl hover:bg-gray-100 border-none bg-transparent cursor-pointer"
                aria-label={t("header.menu.close")}
              >
                <LuX className="w-6 h-6" />
              </button>
            </div>

            <nav className="flex-1 min-h-0 overflow-y-auto overscroll-contain flex flex-col gap-1 p-3">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.href}
                  href={link.href}
                  label={t(`header.nav.${link.labelKey}`)}
                  active={activeLink === link.href}
                  onClick={closeMenu}
                  mobile
                />
              ))}
            </nav>

            <div className="shrink-0 p-4 border-t border-gray-100 flex flex-col gap-3">
              <a
                href="tel:+78005553535"
                className="flex items-center justify-center gap-2 h-11 rounded-xl bg-gray-50 text-gray-900
                  no-underline text-sm font-semibold"
              >
                <span className="text-blue-500"><LuPhone className="w-4 h-4" /></span>
                +7 (800) 555-35-35
              </a>
              <LanguageSwitcher
                className="w-full [&>button]:w-full [&>button]:justify-center"
                preferPlacement="top"
                elevated
              />
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/signup"
                  onClick={closeMenu}
                  className="flex h-11 items-center justify-center rounded-full border border-gray-200 bg-white text-sm font-semibold text-gray-900 no-underline"
                >
                  {t("header.auth.signUp")}
                </Link>
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="h-11 flex items-center justify-center rounded-full bg-blue-500 text-white text-sm font-semibold no-underline"
                >
                  {t("header.auth.logIn")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
