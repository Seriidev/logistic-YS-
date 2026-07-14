import { useTranslation } from "react-i18next";
import { LuDownload } from "react-icons/lu";
import Footer from "../components/Footer";
import { PROHIBITED, SPECIAL } from "../data/prohibitedItems";

function ItemCard({ item, t }) {
  const title = t(item.titleKey);
  const { Icon } = item;
  return (
    <div className="bg-white rounded-2xl p-5 flex flex-col items-center text-center gap-3 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="w-20 h-20 flex items-center justify-center text-gray-700">
        <Icon className="w-16 h-16" aria-hidden="true" />
      </div>
      <p className="text-xs font-semibold text-gray-800 leading-snug">{title}</p>
    </div>
  );
}

export default function ProhibitedItemsPage() {
  const { t } = useTranslation("prohibited");

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

        <div className="text-center mb-8">
          <h1 className="text-2xl font-extrabold text-gray-900 uppercase tracking-wide mb-3">
            {t("header.title")}
          </h1>
          <p className="text-sm text-gray-500 max-w-[560px] mx-auto leading-relaxed mb-3">
            {t("header.description")}
          </p>
          <a
            href="#"
            className="text-xs font-semibold text-red-500 uppercase tracking-widest hover:text-red-600 transition-colors no-underline"
          >
            {t("header.restrictionsLink")}
          </a>
        </div>

        <div className="bg-blue-50 rounded-3xl p-8 mb-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 mb-10">
            {PROHIBITED.map((item) => (
              <ItemCard key={item.id} item={item} t={t} />
            ))}
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-1">{t("specialConditions.title")}</h2>
            <p className="text-sm text-gray-500 mb-5">{t("specialConditions.description")}</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {SPECIAL.map((item) => (
                <ItemCard key={item.id} item={item} t={t} />
              ))}
            </div>
          </div>
        </div>

        <div className="bg-blue-500 rounded-3xl px-10 py-12 flex flex-col items-center text-center gap-6">
          <div className="w-12 h-12 rounded-full border-2 border-white/40 flex items-center justify-center">
            <span className="text-white font-extrabold text-xl">!</span>
          </div>

          <div>
            <h2 className="text-lg font-extrabold text-white uppercase tracking-wide mb-2">
              {t("banner.title")}
            </h2>
          </div>

          <a
            href="/prohibited-items.pdf"
            download
            className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white text-sm font-semibold px-6 py-2.5 no-underline transition-colors duration-150 border border-white/30"
          >
            {t("banner.downloadPdf")}
            <LuDownload className="w-3.5 h-3.5" aria-hidden="true" />
          </a>
        </div>
      </section>
      <Footer />
    </>
  );
}
