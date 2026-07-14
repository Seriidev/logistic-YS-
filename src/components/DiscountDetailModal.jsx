import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { LuX } from "react-icons/lu";

function ModalBulletList({ title, items }) {
  if (!items?.length) return null;

  return (
    <div className="mt-6">
      {title && <p className="text-sm font-bold text-gray-900 mb-3">{title}</p>}
      <ul className="flex flex-col gap-2.5 pl-1">
        {items.map((item, index) => (
          <li key={index} className="flex gap-2.5 text-sm text-gray-800 leading-relaxed">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" aria-hidden="true" />
            <span>
              {item.bold && <strong>{item.bold}</strong>}
              {item.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function DiscountDetailModal({ isOpen, onClose, discount }) {
  const { t } = useTranslation("discounts");

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!isOpen || !discount?.modal) return null;

  const { heading, paragraphs, listTitle, listItems } = discount.modal;
  const titleId = "discount-modal-title";

  return (
    <div
      className="discount-modal-backdrop fixed inset-0 z-[9999] sm:flex sm:items-center sm:justify-center sm:p-4 discount-modal-shell"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onClick={onClose}
    >
      <div
        className="discount-modal-overlay absolute inset-0 bg-black/50 backdrop-blur-sm supports-[backdrop-filter]:bg-black/40"
        aria-hidden="true"
      />

      <div
        className="discount-modal-panel fixed inset-x-0 bottom-0 z-10 w-full sm:static sm:max-w-2xl max-h-[min(92dvh,calc(100dvh-env(safe-area-inset-bottom,0px)))] overflow-y-auto overscroll-contain touch-pan-y bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl pb-[env(safe-area-inset-bottom,0px)] sm:pb-0"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-gray-100 bg-white/95 backdrop-blur-sm px-5 py-4 rounded-t-2xl sm:rounded-t-2xl">
          <h2 id={titleId} className="text-base sm:text-lg font-bold text-gray-900 truncate pr-2">
            {discount.title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label={t("close")}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-none bg-gray-100 cursor-pointer hover:bg-gray-200 transition-colors duration-200"
          >
            <LuX className="w-4 h-4 text-gray-500" aria-hidden="true" />
          </button>
        </div>

        <div className="discount-modal-content p-5 sm:p-6">
          <div className="discount-modal-inner rounded-xl sm:rounded-2xl bg-slate-100/90 p-5 sm:p-7 md:p-8">
            <h3 className="text-xl sm:text-2xl font-bold text-blue-900 leading-snug mb-5 sm:mb-6">{heading}</h3>

            <div className="flex flex-col gap-4 text-sm sm:text-[15px] text-gray-800 leading-relaxed">
              {paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <ModalBulletList title={listTitle} items={listItems} />
          </div>
        </div>
      </div>
    </div>
  );
}
