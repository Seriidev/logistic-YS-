import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { LuEye } from "react-icons/lu";
import Footer from "../components/Footer";
import { NewsModal } from "./NewsModal";

const CATEGORY_KEYS = ["promotion", "events", "shopping"];

const NEWS_ITEMS = [
  { id: 1, categoryKey: "promotion", articleKey: "promo20", image: "/news/news1.jpg", views: 325, date: "14.02.2025", path: "/news/1" },
  { id: 2, categoryKey: "promotion", articleKey: "promo20", image: "/news/news2.jpg", views: 325, date: "14.02.2025", path: "/news/2" },
  { id: 3, categoryKey: "promotion", articleKey: "promo20", image: "/news/news3.jpg", views: 325, date: "14.02.2025", path: "/news/3" },
  { id: 4, categoryKey: "promotion", articleKey: "promo20", image: "/news/news4.jpg", views: 325, date: "14.02.2025", path: "/news/4" },
];

const CATEGORY_COUNTS = { promotion: 5, events: 0, shopping: 0 };

export default function NewsPage() {
  const { t } = useTranslation("news");
  const [activeCategory, setActiveCategory] = useState("promotion");
  const [selectedNews, setSelectedNews] = useState(null);

  const categories = useMemo(
    () =>
      CATEGORY_KEYS.map((key) => ({
        key,
        label: t(`categories.${key}`),
        count: CATEGORY_COUNTS[key],
      })),
    [t],
  );

  const news = useMemo(
    () =>
      NEWS_ITEMS.map((item) => ({
        ...item,
        category: t(`categories.${item.categoryKey}`),
        title: t(`articles.${item.articleKey}.title`),
        description: t(`articles.${item.articleKey}.description`),
      })),
    [t],
  );

  const filtered = news.filter((n) => n.categoryKey === activeCategory);

  const handleImageError = (e) => {
    e.target.style.display = "none";
    const parent = e.target.parentElement;
    parent.style.display = "flex";
    parent.style.flexDirection = "column";
    parent.style.alignItems = "flex-start";
    parent.style.justifyContent = "flex-end";
    parent.style.padding = "16px";
    parent.innerHTML = `
      <div style="position:absolute;top:0;right:0;width:120px;height:120px;
        border-radius:50%;background:rgba(255,255,255,0.1);
        transform:translate(30px,-30px)"></div>
      <img src="/logo/logo.svg" style="height:24px;margin-bottom:8px"
        onerror="this.style.display='none'"/>
      <p style="color:white;font-weight:700;font-size:13px;line-height:1.3;margin-bottom:4px">
        ${t("fallback.saveTitle")}
      </p>
      <p style="color:rgba(255,255,255,0.7);font-size:10px">
        ${t("fallback.saveSubtitle")}
      </p>`;
  };

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

        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold
                border-none cursor-pointer transition-all duration-150 font-[inherit]
                ${activeCategory === cat.key ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}
              `}
            >
              {cat.label}
              <span
                className={`text-xs px-1.5 py-0.5 rounded-full font-bold
                  ${activeCategory === cat.key ? "bg-white/20 text-white" : "bg-gray-200 text-gray-500"}`}
              >
                {cat.count}
              </span>
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-5">
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-gray-400 text-sm">{t("empty")}</div>
          ) : (
            filtered.map((item) => (
              <div
                key={item.id}
                className="article-card gap-0 sm:gap-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className="article-card__media bg-blue-500">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    onError={handleImageError}
                  />
                </div>

                <div className="article-card__body sm:pr-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1.5 text-xs text-gray-400">
                      <LuEye className="w-3.5 h-3.5" aria-hidden="true" />
                      {item.views}
                    </div>
                    <span className="text-xs text-gray-400">{item.date}</span>
                  </div>

                  <h2 className="text-base font-bold text-gray-900 mb-2">{item.title}</h2>

                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                    {t("descriptionLabel")}
                  </p>

                  <p className="text-sm text-gray-500 leading-relaxed line-clamp-4 mb-3">{item.description}</p>

                  <button
                    onClick={() => setSelectedNews(item)}
                    className="text-sm text-blue-500 font-medium bg-transparent border-none cursor-pointer p-0 hover:underline font-[inherit] rounded-full"
                  >
                    {t("readMore")}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      <NewsModal isOpen={!!selectedNews} onClose={() => setSelectedNews(null)} news={selectedNews} />
      <Footer />
    </>
  );
}
