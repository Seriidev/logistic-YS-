import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  LuBriefcase,
  LuBuilding,
  LuGlobe,
  LuHeadphones,
  LuMonitor,
  LuPackage,
  LuShield,
  LuUsers,
} from "react-icons/lu";
import Footer from "../components/Footer";

function useCountUp(target, duration = 2000, started) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, target, duration]);
  return count;
}

function StatCard({ value, suffix, label, icon, started }) {
  const count = useCountUp(value, 2000, started);
  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center
        justify-center shrink-0 text-blue-500">
        {icon}
      </div>
      <div>
        <p className="text-xl font-extrabold text-gray-900">
          {count.toLocaleString()}{suffix}
        </p>
        <p className="text-xs text-gray-500">{label}</p>
      </div>
    </div>
  );
}

function TimelineItem({ year, title, description, image, isLeft, photoPlaceholder }) {
  return (
    <div className={`flex flex-col lg:flex-row items-stretch gap-4 lg:gap-8 min-w-0
      ${isLeft ? "lg:flex-row" : "lg:flex-row-reverse"}`}>

      <div className={`flex-1 min-w-0 text-left ${isLeft ? "lg:text-right" : "lg:text-left"}`}>
        <p className="text-blue-500 font-extrabold text-lg mb-1">{year}</p>
        <h3 className="text-base font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
      </div>

      <div className="hidden lg:flex flex-col items-center shrink-0">
        <div className="w-4 h-4 rounded-full bg-blue-500 border-4 border-blue-100 z-10" />
      </div>

      <div className="flex-1 min-w-0 w-full">
        <div className="rounded-2xl overflow-hidden h-35 bg-gray-100">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = "none";
              e.target.parentElement.style.background = "#e8eaf6";
              e.target.parentElement.style.display = "flex";
              e.target.parentElement.style.alignItems = "center";
              e.target.parentElement.style.justifyContent = "center";
              e.target.parentElement.innerHTML = `
                <p style="font-size:11px;color:#9ca3af;text-align:center">
                  ${photoPlaceholder}<br/>${image}<br/>600×280px
                </p>`;
            }}
          />
        </div>
      </div>
    </div>
  );
}

const TIMELINE = [
  { year: "2018", image: "/about/timeline-2018.jpg", isLeft: true },
  { year: "2019", image: "/about/timeline-2019.jpg", isLeft: false },
  { year: "2021", image: "/about/timeline-2021.jpg", isLeft: true },
  { year: "2024", image: "/about/timeline-2024.jpg", isLeft: false },
];

const WHY_US = [
  { key: "shipments", Icon: LuBriefcase },
  { key: "support", Icon: LuHeadphones },
  { key: "tools", Icon: LuMonitor },
  { key: "integration", Icon: LuGlobe },
  { key: "clients", Icon: LuUsers },
  { key: "security", Icon: LuShield },
];

export default function AboutUsPage() {
  const { t } = useTranslation("aboutUs");
  const [started, setStarted] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section className="page-container min-w-0 py-6">

        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <a href="/" className="hover:text-blue-500 no-underline text-gray-500">
            {t("common:common.main")}
          </a>
          <span>›</span>
          <span className="text-gray-900 font-medium">{t("breadcrumb.title")}</span>
        </div>

        <div className="relative bg-blue-500 rounded-2xl sm:rounded-3xl overflow-hidden min-h-[140px] sm:min-h-55
          flex items-center px-5 sm:px-10 py-6 mb-8 sm:mb-12">
          <div className="absolute right-50 top-1/2 -translate-y-1/2
            w-60 h-60 rounded-full border-48 border-white/10" />
          <img
            src="/about/team-banner.jpg"
            alt={t("banner.teamAlt")}
            className="absolute right-0 bottom-0 h-full object-cover w-1/2 sm:w-[45%] max-w-full pointer-events-none"
            onError={(e) => { e.target.style.display = "none"; }}
          />
          <div className="relative z-10 max-w-full sm:max-w-105 min-w-0 pr-[45%] sm:pr-0">
            <h1 className="text-2xl font-extrabold text-white mb-3 leading-tight">
              {t("banner.title")}
            </h1>
            <p className="text-blue-100 text-xs mb-5 leading-relaxed">
              {t("banner.subtitle")}<br/>
              {t("banner.subtitleLine2")}
            </p>
            <button type="button" className="banner-cta bg-white text-gray-900 text-xs font-bold uppercase
              tracking-widest px-6 py-2.5 rounded-full border-none cursor-pointer
              hover:bg-blue-50 transition-colors">
              {t("banner.shipNow")}
            </button>
          </div>
        </div>

        <div ref={statsRef}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 mb-10 sm:mb-16 bg-white rounded-2xl
            border border-gray-100 shadow-sm px-4 sm:px-8 py-5 sm:py-6">
          <StatCard value={100000} suffix="+" label={t("stats.clients")}
            started={started}
            icon={<LuUsers className="w-5 h-5" aria-hidden="true" />}
          />
          <StatCard value={20} suffix="+" label={t("stats.countries")}
            started={started}
            icon={<LuGlobe className="w-5 h-5" aria-hidden="true" />}
          />
          <StatCard value={26} suffix="+" label={t("stats.offices")}
            started={started}
            icon={<LuBuilding className="w-5 h-5" aria-hidden="true" />}
          />
          <StatCard value={1457000} suffix="" label={t("stats.parcels")}
            started={started}
            icon={<LuPackage className="w-5 h-5" aria-hidden="true" />}
          />
        </div>

        <div className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-2">
              {t("timeline.title")}
            </h2>
            <p className="text-sm text-gray-400">
              {t("timeline.subtitle")}
            </p>
          </div>

          <div className="relative">
            <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0
              w-0.5 bg-blue-100 z-0" />
            <div className="flex flex-col gap-10 relative z-10">
              {TIMELINE.map((item) => (
                <TimelineItem
                  key={item.year}
                  year={item.year}
                  title={t(`timeline.items.${item.year}.title`)}
                  description={t(`timeline.items.${item.year}.description`)}
                  image={item.image}
                  isLeft={item.isLeft}
                  photoPlaceholder={t("timeline.photoPlaceholder")}
                />
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="text-center mb-10">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-2">
              {t("whyUs.title")}
            </h2>
            <p className="text-sm text-gray-400">
              {t("whyUs.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {WHY_US.map((item) => (
              <div key={item.key} className="bg-gray-50 rounded-2xl p-6 flex flex-col gap-3
                hover:bg-blue-50 transition-colors duration-150">
                <div className="w-10 h-10 rounded-full bg-blue-500 text-white
                  flex items-center justify-center shrink-0">
                  <item.Icon className="w-5 h-5" aria-hidden="true" />
                </div>
                <h3 className="text-sm font-bold text-gray-900">
                  {t(`whyUs.items.${item.key}.title`)}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {t(`whyUs.items.${item.key}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>

      </section>
      <Footer />
    </>
  );
}
