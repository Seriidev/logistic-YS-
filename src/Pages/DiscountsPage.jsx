import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { LuEye } from "react-icons/lu";
import Footer from "../components/Footer";
import DiscountDetailModal from "../components/DiscountDetailModal";

const CATEGORY_KEYS = ["discounts", "events", "shopping"];
const CATEGORY_COUNTS = { discounts: 5, events: 0, shopping: 0 };

const DISCOUNT_ITEMS = [
  { id: 1, categoryKey: "discounts", articleKey: "xbox", modalKey: "xbox", image: "/discounts/xbox.jpg", views: 325, date: "18.08.2025", path: "/discounts/1", special: true },
  { id: 2, categoryKey: "discounts", articleKey: "promo20", modalKey: "offer20", image: "/discounts/discount1.jpg", views: 325, date: "14.02.2025", path: "/discounts/2", special: false },
  { id: 3, categoryKey: "discounts", articleKey: "promo20", modalKey: "offer20", image: "/discounts/discount2.jpg", views: 325, date: "14.02.2025", path: "/discounts/3", special: false },
  { id: 4, categoryKey: "discounts", articleKey: "promo20", modalKey: "offer20", image: "/discounts/discount3.jpg", views: 325, date: "14.02.2025", path: "/discounts/4", special: false },
];

export default function DiscountsPage() {
  const { t } = useTranslation("discounts");
  const [activeCategory, setActiveCategory] = useState("discounts");
  const [selectedDiscount, setSelectedDiscount] = useState(null);

  const categories = useMemo(
    () =>
      CATEGORY_KEYS.map((key) => ({
        key,
        label: t(`categories.${key}`),
        count: CATEGORY_COUNTS[key],
      })),
    [t],
  );

  const discounts = useMemo(
    () =>
      DISCOUNT_ITEMS.map((item) => {
        const modal = t(`modals.${item.modalKey}`, { returnObjects: true });
        return {
          ...item,
          category: t(`categories.${item.categoryKey}`),
          title: t(`articles.${item.articleKey}.title`),
          description: t(`articles.${item.articleKey}.description`),
          modal: {
            heading: modal.heading,
            paragraphs: modal.paragraphs,
            listTitle: modal.listTitle,
            listItems: modal.listItems,
          },
        };
      }),
    [t],
  );

  const filtered = discounts.filter((n) => n.categoryKey === activeCategory);

  const handleImageError = (e, item) => {
    e.target.style.display = "none";
    const parent = e.target.parentElement;
    if (item.special) {
      parent.innerHTML = `
        <div style="width:100%;height:100%;background:#1a237e;
          display:flex;flex-direction:column;align-items:center;
          justify-content:center;padding:16px;text-align:center">
          <p style="color:white;font-size:11px;font-weight:700;
            text-transform:uppercase;letter-spacing:1px;margin-bottom:8px">
            ${t("fallback.registerWin")}
          </p>
          <p style="color:#90caf9;font-size:24px;font-weight:900;margin-bottom:4px">XBOX</p>
          <p style="color:white;font-size:10px;opacity:0.7">
            ${t("fallback.giveaway")}<br/>${t("fallback.giveawayDates")}
          </p>
        </div>`;
    } else {
      parent.style.display = "flex";
      parent.style.flexDirection = "column";
      parent.style.alignItems = "flex-start";
      parent.style.justifyContent = "flex-end";
      parent.style.padding = "16px";
      parent.innerHTML = `
        <div style="position:absolute;top:0;right:0;width:120px;height:120px;
          border-radius:50%;background:rgba(255,255,255,0.1);
          transform:translate(30px,-30px)"></div>
        <img src="/logo/logo.svg" style="height:20px;margin-bottom:6px"
          onerror="this.style.display='none'"/>
        <p style="color:white;font-weight:700;font-size:12px;
          line-height:1.3;margin-bottom:4px;position:relative">
          ${t("fallback.saveTitle")}
        </p>
        <p style="color:rgba(255,255,255,0.7);font-size:10px;position:relative">
          ${t("fallback.saveSubtitle")}
        </p>`;
    }
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

        <div className="relative bg-blue-500 rounded-2xl sm:rounded-3xl overflow-hidden mb-8 min-h-[140px] sm:min-h-[160px] flex items-center px-5 sm:px-10 py-6">
          <div className="absolute right-0 top-0 bottom-0 w-1/2 sm:w-[400px] max-w-full overflow-hidden pointer-events-none">
            <img
              src="/discounts/gifts-decor.png"
              alt=""
              className="absolute right-0 top-0 h-full object-contain"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          </div>

          <div className="relative z-10">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">{t("title")}</h1>
            <button
              type="button"
              className="banner-cta bg-white text-gray-900 text-xs font-bold uppercase tracking-widest px-6 py-2.5 rounded-full border-none cursor-pointer hover:bg-blue-50 transition-colors duration-150"
            >
              {t("shipNow")}
            </button>
          </div>
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
                    onError={(e) => handleImageError(e, item)}
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

                  <p className="text-sm text-gray-500 leading-relaxed line-clamp-4 mb-3 whitespace-pre-line">
                    {item.description}
                  </p>

                  <button
                    type="button"
                    onClick={() => setSelectedDiscount(item)}
                    className="text-sm text-blue-500 font-medium border-none bg-transparent p-0 cursor-pointer hover:underline font-[inherit]"
                  >
                    {t("readMore")}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      <DiscountDetailModal
        isOpen={Boolean(selectedDiscount)}
        onClose={() => setSelectedDiscount(null)}
        discount={selectedDiscount}
      />

      <Footer />
    </>
  );
}
