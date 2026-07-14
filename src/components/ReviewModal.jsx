import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaStar } from "react-icons/fa";
import { LuX } from "react-icons/lu";

function StarRating({ rating, setRating, t }) {
  const [hovered, setHovered] = useState(0);

  return (
    <div className="flex gap-1" role="group" aria-label={t("reviewModal.ratingGroup")}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => setRating(star)}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          aria-label={t("reviewModal.star", { count: star })}
          className="border-none bg-transparent cursor-pointer p-0.5 rounded-md transition-transform hover:scale-110"
        >
          <FaStar
            className="w-7 h-7 sm:w-8 sm:h-8 transition-colors duration-150"
            color={star <= (hovered || rating) ? "#f59e0b" : "#e5e7eb"}
            aria-hidden="true"
          />
        </button>
      ))}
    </div>
  );
}

export function ReviewModal({ isOpen, onClose }) {
  const { t } = useTranslation("home");
  const { t: tc } = useTranslation("common");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(5);

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

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      alert(t("reviewModal.errors.required"));
      return;
    }
    alert(t("reviewModal.success"));
    setName("");
    setEmail("");
    setMessage("");
    setRating(5);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center p-0 sm:p-4 footer-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="review-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" aria-hidden="true" />

      <div className="relative w-full sm:max-w-md bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl z-10 max-h-[92dvh] overflow-y-auto footer-modal-panel">
        <div className="sticky top-0 flex items-center justify-between gap-3 px-5 py-4 border-b border-gray-100 bg-white rounded-t-2xl sm:rounded-t-2xl">
          <h2 id="review-modal-title" className="text-lg font-bold text-gray-900">
            {t("reviewModal.title")}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label={tc("shared.modal.close")}
            className="w-9 h-9 shrink-0 rounded-full bg-gray-100 flex items-center justify-center border-none cursor-pointer hover:bg-gray-200 transition-colors"
          >
            <LuX className="w-4 h-4 text-gray-500" aria-hidden="true" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 sm:p-6 flex flex-col gap-5">
          <div className="flex flex-col items-center gap-2 py-1">
            <span className="text-sm font-medium text-gray-600">{t("reviewModal.ratingLabel")}</span>
            <StarRating rating={rating} setRating={setRating} t={t} />
          </div>

          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{tc("shared.fields.name")}</span>
            <input
              type="text"
              placeholder={t("reviewModal.namePlaceholder")}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full h-11 px-4 rounded-xl bg-gray-50 border border-gray-200 outline-none text-sm text-gray-900 font-[inherit] focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
            />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{tc("shared.fields.email")}</span>
            <input
              type="email"
              placeholder={tc("shared.fields.emailPlaceholder")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-11 px-4 rounded-xl bg-gray-50 border border-gray-200 outline-none text-sm text-gray-900 font-[inherit] focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
            />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{t("reviewModal.review")}</span>
            <textarea
              placeholder={t("reviewModal.reviewPlaceholder")}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows={4}
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 outline-none text-sm text-gray-900 font-[inherit] resize-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
            />
          </label>

          <button
            type="submit"
            className="w-full min-h-[44px] bg-blue-500 text-white font-bold text-sm uppercase tracking-wider rounded-full border-none cursor-pointer hover:bg-blue-600 active:scale-[0.98] transition-all duration-150 font-[inherit]"
          >
            {t("reviewModal.submit")}
          </button>
        </form>
      </div>
    </div>
  );
}
