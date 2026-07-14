import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaStar } from "react-icons/fa";
import { LuArrowRight, LuPaperclip } from "react-icons/lu";

function StarRating({ rating, setRating }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => setRating(star)}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          className="border-none bg-transparent cursor-pointer p-0 rounded-full"
        >
          <FaStar
            className="w-6 h-6 transition-colors duration-100"
            color={star <= (hovered || rating) ? "#f59e0b" : "#d1d5db"}
            aria-hidden="true"
          />
        </button>
      ))}
    </div>
  );
}

export default function ReviewPage() {
  const { t } = useTranslation("review");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(3);
  const [file, setFile] = useState(null);

  const handleSend = () => {
    if (!name || !message) {
      alert(t("alerts.required"));
      return;
    }
    alert(t("alerts.thanks"));
  };

  return (
    <div className="min-h-screen bg-blue-500 py-8 sm:py-12 px-4 min-w-0 overflow-x-clip">
      <div className="max-w-4xl mx-auto w-full min-w-0">
        <h1 className="text-2xl sm:text-3xl font-bold text-white text-center mb-6 sm:mb-8">{t("title")}</h1>

        <div className="bg-white rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-2xl">
          <div className="flex-1 min-w-0 p-6 sm:p-10 flex flex-col justify-between bg-blue-500">
            <div>
              <h2 className="text-2xl font-extrabold text-white mb-6">{t("left.heading")}</h2>

              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 flex items-start gap-3 w-full max-w-full sm:max-w-[320px] mb-6 sm:mb-8">
                <img
                  src="/logo/logo.svg"
                  alt={t("logoAlt")}
                  className="h-8 w-8 flex-shrink-0 mt-0.5"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.parentElement.innerHTML += `<div style="width:32px;height:32px;background:rgba(255,255,255,0.3);border-radius:8px;flex-shrink:0"></div>`;
                  }}
                />
                <p className="text-white text-sm leading-relaxed">{t("left.description")}</p>
              </div>
            </div>

            <div className="flex items-end justify-center">
              <img
                src="/review-illustration.png"
                alt={t("left.illustrationAlt")}
                className="w-full max-w-[220px] h-auto max-h-[220px] object-contain mx-auto"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            </div>
          </div>

          <div className="w-full md:w-[360px] flex-shrink-0 bg-white m-4 md:m-4 rounded-2xl p-6 flex flex-col gap-4">
            <h3 className="text-lg font-bold text-gray-900 border-b-2 border-dashed border-blue-200 pb-3">
              {t("form.title")}
            </h3>

            <textarea
              placeholder={t("form.namePlaceholder")}
              value={name}
              onChange={(e) => setName(e.target.value)}
              rows={2}
              className="w-full px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 outline-none text-sm text-gray-900 font-[inherit] resize-none focus:border-blue-400 transition-colors"
            />
            <textarea
              placeholder={t("form.emailPlaceholder")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              rows={2}
              className="w-full px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 outline-none text-sm text-gray-900 font-[inherit] resize-none focus:border-blue-400 transition-colors"
            />

            <input
              type="text"
              placeholder={t("form.locationPlaceholder")}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full h-10 px-3 rounded-lg bg-gray-50 border border-gray-200 outline-none text-sm text-gray-900 font-[inherit] focus:border-blue-400 transition-colors"
            />

            <textarea
              placeholder={t("form.messagePlaceholder")}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className="w-full px-3 py-2.5 rounded-lg bg-gray-50 border border-gray-200 outline-none text-sm text-gray-900 font-[inherit] resize-none focus:border-blue-400 transition-colors"
            />

            <div className="flex items-center justify-between border-t border-b border-dashed border-gray-200 py-3">
              <span className="text-sm text-gray-500 font-medium">{t("form.rating")}</span>
              <StarRating rating={rating} setRating={setRating} />
            </div>

            <label className="flex items-center gap-2 cursor-pointer">
              <div className="flex items-center gap-1.5 text-gray-500 hover:text-blue-500 transition-colors">
                <LuPaperclip className="w-4 h-4" aria-hidden="true" />
                <span className="text-sm font-medium">{file ? file.name : t("form.selectFile")}</span>
              </div>
              <input
                type="file"
                className="hidden"
                accept=".jpg,.gif,.jpeg,.log,.txt,.html,.png,.tiff,.tif,.pdf,.doc,.docx,.zip,.rar,.gz,.tar.gz,.7z,.rdp,.odt,.csv,.conf,.cfg,.xls,.xlsx"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
            </label>
            <p className="text-[10px] text-gray-400 -mt-2 leading-relaxed">{t("form.fileExtensions")}</p>

            <button
              onClick={handleSend}
              className="w-full h-11 bg-blue-500 text-white font-bold text-sm uppercase tracking-wider rounded-full border-none cursor-pointer hover:bg-blue-600 active:scale-[0.98] transition-all duration-150 font-[inherit] flex items-center justify-center gap-2"
            >
              {t("form.send")}
              <LuArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
