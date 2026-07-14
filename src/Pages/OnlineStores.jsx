import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { LuChevronDown, LuSearch } from "react-icons/lu";
import Footer from "../components/Footer";

const COUNTRY_KEYS = ["usa", "china", "germany", "uk", "uae", "russia", "uzbekistan"];
const CATEGORY_KEYS = ["electronics", "fashion", "homeGarden", "sports", "beauty", "books", "toys"];

const STORES = [
  { id: 1, name: "AliExpress", logo: "/stores/aliexpress.svg", countryKey: "usa", categoryKey: "electronics", flag: "🇺🇸", color: "#ff6900" },
  { id: 2, name: "Amazon", logo: "/stores/amazon.svg", countryKey: "usa", categoryKey: "electronics", flag: "🇺🇸", color: "#ff9900" },
  { id: 3, name: "eBay", logo: "/stores/ebay.svg", countryKey: "usa", categoryKey: "fashion", flag: "🇺🇸", color: "#e53238" },
  { id: 4, name: "Shopify", logo: "/stores/shopify.svg", countryKey: "usa", categoryKey: "fashion", flag: "🇺🇸", color: "#96bf48" },
  { id: 5, name: "OZON", logo: "/stores/ozon.svg", countryKey: "russia", categoryKey: "electronics", flag: "🇷🇺", color: "#005bff" },
  { id: 6, name: "Wildberries", logo: "/stores/wildberries.svg", countryKey: "russia", categoryKey: "fashion", flag: "🇷🇺", color: "#cb11ab" },
  { id: 7, name: "Etsy", logo: "/stores/etsy.svg", countryKey: "usa", categoryKey: "homeGarden", flag: "🇺🇸", color: "#f56400" },
  { id: 8, name: "iHerb", logo: "/stores/iherb.svg", countryKey: "usa", categoryKey: "beauty", flag: "🇺🇸", color: "#5c8a00" },
];

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
        <span className={`text-sm font-medium pr-4 transition-colors min-w-0 flex-1
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
          <p className="text-sm text-gray-600 leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
}

export default function OnlineStoresPage() {
  const { t } = useTranslation("onlineStores");
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState("usa");
  const [category, setCategory] = useState("electronics");

  const storeDescription = t("storeDescription");

  const faqItems = useMemo(
    () => t("faq.items", { returnObjects: true }),
    [t],
  );

  const filtered = STORES.filter((store) => {
    const matchSearch = store.name.toLowerCase().includes(search.toLowerCase());
    const matchCountry = country === "All" || store.countryKey === country;
    const matchCategory = category === "All" || store.categoryKey === category;
    return matchSearch && matchCountry && matchCategory;
  });

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

      <div className="relative bg-blue-500 rounded-2xl sm:rounded-3xl overflow-hidden mb-8 sm:mb-10
        min-h-[200px] flex flex-col justify-center px-5 py-8 sm:px-10 sm:py-10">

        <div className="hidden md:block absolute right-[20%] lg:right-[260px] top-1/2 -translate-y-1/2
          w-40 h-40 lg:w-[220px] lg:h-[220px] rounded-full border-[24px] lg:border-[40px] border-white/10 pointer-events-none" />

        <img
          src="/freight-people.png"
          alt={t("banner.peopleAlt")}
          className="hidden sm:block absolute left-4 sm:left-6 bottom-0 h-28 sm:h-[190px] max-w-[45%] object-contain pointer-events-none"
          onError={(e) => { e.target.style.display = "none"; }}
        />

        <div className="hidden sm:flex absolute left-8 sm:left-14 bottom-4 items-center gap-1.5 z-10">
          <img src="/logo/logo.svg" alt="" className="h-5"
            onError={(e) => { e.target.style.display = "none"; }} />
          <span className="text-white text-xs font-bold">YuuSell</span>
        </div>

        <div className="relative z-10 w-full max-w-full sm:max-w-[420px] sm:ml-auto sm:mr-0 md:ml-[180px] lg:ml-[220px] min-w-0">
          <h1 className="text-xl sm:text-2xl font-extrabold text-white mb-2 leading-tight">
            {t("banner.title")}
          </h1>
          <p className="text-blue-100 text-xs mb-5 leading-relaxed">
            {t("banner.subtitle")}<br/>
            {t("banner.subtitleLine2")}
          </p>
          <button type="button" className="banner-cta bg-white text-gray-900 text-xs font-bold uppercase
            tracking-widest px-6 py-2.5 rounded-full border-none cursor-pointer
            hover:bg-blue-50 transition-colors duration-150">
            {t("banner.shipNow")}
          </button>
        </div>
      </div>

      <div className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">
          {t("search.title")}
        </h2>

        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
          <div className="flex flex-col sm:flex-row flex-wrap gap-4 items-stretch sm:items-end">

            <div className="w-full sm:flex-1 min-w-0">
              <label className="text-xs text-gray-400 mb-1.5 block">{t("search.label")}</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder={t("search.placeholder")}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full h-10 pl-4 pr-10 rounded-lg bg-gray-50 border
                    border-gray-200 outline-none text-sm text-gray-900 font-[inherit]
                    focus:border-blue-400 transition-colors"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <LuSearch className="w-3.5 h-3.5" aria-hidden="true" />
                </span>
              </div>
            </div>

            <div className="w-full sm:w-[calc(50%-0.5rem)] md:w-[180px] min-w-0">
              <label className="text-xs text-gray-400 mb-1.5 block">{t("search.country")}</label>
              <div className="relative">
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full h-10 pl-4 pr-8 rounded-lg bg-gray-50 border
                    border-gray-200 outline-none text-sm text-gray-900 font-[inherit]
                    appearance-none cursor-pointer focus:border-blue-400 transition-colors"
                >
                  <option value="All">{t("search.allCountries")}</option>
                  {COUNTRY_KEYS.map((key) => (
                    <option key={key} value={key}>{t(`countries.${key}`)}</option>
                  ))}
                </select>
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                  <LuChevronDown className="w-3 h-3" aria-hidden="true" />                </span>
              </div>
            </div>

            <div className="w-full sm:w-[calc(50%-0.5rem)] md:w-[180px] min-w-0">
              <label className="text-xs text-gray-400 mb-1.5 block">{t("search.category")}</label>
              <div className="relative">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full h-10 pl-4 pr-8 rounded-lg bg-gray-50 border
                    border-gray-200 outline-none text-sm text-gray-900 font-[inherit]
                    appearance-none cursor-pointer focus:border-blue-400 transition-colors"
                >
                  <option value="All">{t("search.allCategories")}</option>
                  {CATEGORY_KEYS.map((key) => (
                    <option key={key} value={key}>{t(`categories.${key}`)}</option>
                  ))}
                </select>
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                  <LuChevronDown className="w-3 h-3" aria-hidden="true" />                </span>
              </div>
            </div>

              <button
                onClick={() => {}}
                className="w-full sm:w-auto h-10 px-6 bg-blue-500 text-white text-sm font-bold
                  uppercase tracking-wider rounded-full border-none cursor-pointer
                  hover:bg-blue-600 transition-colors font-[inherit]"
              >
                {t("search.button")}
              </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-10 sm:mb-14">
        {filtered.length === 0 ? (
          <div className="col-span-full text-center py-16 text-gray-400 text-sm">
            {t("search.empty")}
          </div>
        ) : (
          filtered.map((store) => (
            <div key={store.id}
              className="bg-blue-500 rounded-2xl overflow-hidden relative">

              <div className="absolute bottom-0 right-0 w-32 h-32 rounded-full
                border-[28px] border-white/10 translate-x-8 translate-y-8" />

              <div className="bg-white rounded-xl mx-4 mt-4 h-[120px] flex
                items-center justify-center overflow-hidden">
                <img
                  src={store.logo}
                  alt={store.name}
                  className="h-10 w-auto object-contain"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.parentElement.innerHTML = `
                      <span style="font-size:22px;font-weight:900;color:${store.color}">
                        ${store.name}
                      </span>`;
                  }}
                />
              </div>

              <div className="px-4 py-4 relative z-10">
                <p className="text-white font-bold text-sm mb-1">{store.name}</p>
                <p className="text-blue-100 text-xs leading-relaxed mb-4 line-clamp-2">
                  {storeDescription}
                </p>
                <div className="bg-white/20 rounded-full px-3 py-1.5 flex
                  items-center gap-2 w-fit">
                  <span className="text-sm">{store.flag}</span>
                  <span className="text-white text-xs font-semibold">
                    {t(`countries.${store.countryKey}`)}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">
          {t("faq.title")}
        </h2>
        <div className="flex flex-col gap-3 w-full max-w-3xl mx-auto min-w-0">
          {faqItems.map((item, i) => (
            <AccordionItem key={i} question={item.q} answer={item.a} />
          ))}
        </div>
      </div>

    </section>
    <Footer/>
    </>
  );
}
