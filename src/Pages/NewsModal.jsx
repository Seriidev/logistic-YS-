import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { LuEye, LuX } from "react-icons/lu";

export function NewsModal({ isOpen, onClose, news }) {
  const { t } = useTranslation("news");

  const listItems = useMemo(() => t("modal.listItems", { returnObjects: true }), [t]);

  if (!isOpen || !news) return null;

  return (
    <div
      className="fixed inset-0 z-9999 flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      <div className="relative bg-white rounded-2xl sm:rounded-3xl w-full max-w-lg sm:max-w-2xl lg:max-w-150 mx-4 z-10 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center border-none cursor-pointer hover:bg-gray-200 transition-colors z-10"
        >
          <LuX className="w-3.5 h-3.5 text-gray-500" aria-hidden="true" />
        </button>

        {news.image && (
          <div className="h-50 overflow-hidden">
            <img
              src={news.image}
              alt={news.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          </div>
        )}

        <div className="p-5 sm:p-8 min-w-0">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-1.5 text-xs text-gray-400">
              <LuEye className="w-3.5 h-3.5" aria-hidden="true" />
              {news.views}
            </div>
            <span className="text-xs text-gray-400">{news.date}</span>
          </div>

          <h2 className="text-xl font-bold text-gray-900 mb-4">{news.title}</h2>

          <h3 className="text-lg font-bold text-gray-900 mb-3">{t("modal.includedHeading")}</h3>

          <p className="text-sm text-gray-600 leading-relaxed mb-4">{t("modal.intro1")}</p>

          <p className="text-sm text-gray-600 leading-relaxed mb-6">{t("modal.intro2")}</p>

          <h4 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">{t("modal.listTitle")}</h4>

          <ul className="flex flex-col gap-2.5 mb-6">
            {listItems.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 mt-1.5" />
                <span>
                  <strong className="text-gray-900">{item.bold}</strong>
                  {item.text}
                </span>
              </li>
            ))}
          </ul>

          <button className="w-full h-12 bg-blue-500 text-white font-bold text-sm uppercase tracking-wider rounded-full border-none cursor-pointer hover:bg-blue-600 transition-colors duration-150 font-[inherit]">
            {t("modal.cta")}
          </button>
        </div>
      </div>
    </div>
  );
}
