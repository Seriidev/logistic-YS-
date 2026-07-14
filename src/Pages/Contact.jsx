import { useState } from "react";
import { useTranslation } from "react-i18next";
import { LuPaperclip } from "react-icons/lu";
import Footer from "../components/Footer";
import PhoneInputField from "../components/PhoneInputField";
import { getPhoneValidationError } from "../utils/phone";

const TAB_KEYS = ["claim", "question", "feedback"];

export default function ContactPage() {
  const { t } = useTranslation("contact");
  const [activeTab, setActiveTab] = useState("feedback");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const [agreed, setAgreed] = useState(false);

  const handleSend = () => {
    if (!agreed) {
      alert(t("alerts.agreeRequired"));
      return;
    }
    const err = getPhoneValidationError(phone, { required: true });
    if (err) {
      setPhoneError(err);
      return;
    }
    setPhoneError("");
    alert(t("alerts.sent"));
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

        <div className="bg-gray-50 rounded-2xl sm:rounded-3xl p-5 sm:p-10 flex flex-col lg:flex-row gap-8 lg:gap-12 min-w-0">
          <div className="flex-1">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-8">{t("title")}</h1>

            <div className="flex flex-col gap-6">
              <div>
                <h3 className="text-base font-bold text-gray-900 mb-2">{t("address.label")}</h3>
                <p className="text-sm text-gray-500">{t("address.value")}</p>
              </div>

              <div className="h-px bg-gray-200" />

              <div>
                <h3 className="text-base font-bold text-gray-900 mb-2">{t("phone.label")}</h3>
                <div className="flex flex-col gap-1">
                  {["+1 862-652-1545", "+1 862-652-1545", "+1 862-652-1545"].map((p, i) => (
                    <a
                      key={i}
                      href={`tel:${p.replace(/\s|-/g, "")}`}
                      className="text-sm text-gray-500 no-underline hover:text-blue-500 transition-colors duration-150"
                    >
                      {p}
                    </a>
                  ))}
                </div>
              </div>

              <div className="h-px bg-gray-200" />

              <div>
                <h3 className="text-base font-bold text-gray-900 mb-2">{t("email.label")}</h3>
                <a
                  href={`mailto:${t("email.value")}`}
                  className="text-sm text-gray-500 no-underline hover:text-blue-500 transition-colors duration-150"
                >
                  {t("email.value")}
                </a>
              </div>

              <div className="h-px bg-gray-200" />

              <div>
                <h3 className="text-base font-bold text-gray-900 mb-2">{t("workingHours.label")}</h3>
                <p className="text-sm text-gray-500">{t("workingHours.weekdays")}</p>
                <p className="text-sm text-gray-500">{t("workingHours.saturday")}</p>
              </div>

              <div className="h-px bg-gray-200" />

              <div>
                <h3 className="text-base font-bold text-gray-900 mb-2">{t("liveHelp.label")}</h3>
                <p className="text-sm text-gray-500">{t("liveHelp.hours")}</p>
              </div>

              <div className="h-px bg-gray-200" />

              <div>
                <h3 className="text-sm font-bold text-gray-900 mb-2">{t("financial.label")}</h3>
                <a
                  href="tel:+18626521545"
                  className="text-sm text-gray-500 no-underline hover:text-blue-500 transition-colors duration-150"
                >
                  {t("financial.phone")}
                </a>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-112.5 lg:shrink-0 bg-blue-500 rounded-2xl p-5 sm:p-6 flex flex-col gap-4 min-w-0">
            <h2 className="text-white font-bold text-sm uppercase tracking-widest">
              {t("form.title")}
            </h2>

            <div className="flex bg-blue-400/40 rounded-full p-1">
              {TAB_KEYS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`
                    flex-1 py-1.5 rounded-full text-xs font-semibold transition-all
                    duration-150 border-none cursor-pointer font-[inherit]
                    ${activeTab === tab
                      ? "bg-white text-blue-500"
                      : "bg-transparent text-white hover:bg-white/10"}
                  `}
                >
                  {t(`tabs.${tab}`)}
                </button>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder={t("form.namePlaceholder")}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="flex-1 h-10 px-4 rounded-full bg-white border-none outline-none text-sm text-gray-900 font-[inherit]"
              />
              <PhoneInputField
                variant="compact"
                placeholder={t("form.phonePlaceholder")}
                value={phone}
                onChange={(v) => {
                  setPhone(v);
                  setPhoneError("");
                }}
                error={phoneError}
                required
                className="flex-1 min-w-0 [&_p[role=alert]]:text-red-100"
              />
            </div>

            <input
              type="email"
              placeholder={t("form.emailPlaceholder")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-10 px-4 rounded-full bg-white border-none outline-none text-sm text-gray-900 font-[inherit]"
            />

            <textarea
              placeholder={t("form.messagePlaceholder")}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
              className="w-full px-4 py-3 rounded-2xl bg-white border-none outline-none text-sm text-gray-900 font-[inherit] resize-none"
            />

            <div>
              <p className="text-blue-100 text-xs mb-2">{t("form.fileExtensions")}</p>
              <label className="flex items-center gap-2 cursor-pointer w-fit">
                <div className="flex items-center gap-2 bg-white/20 hover:bg-white/30 transition-colors px-3 py-1.5 rounded-full">
                  <LuPaperclip className="w-3.5 h-3.5 text-white" aria-hidden="true" />
                  <span className="text-white text-xs font-medium">
                    {file ? file.name : t("form.attachFile")}
                  </span>
                </div>
                <span className="text-blue-200 text-xs">{t("form.extensionsList")}</span>
                <input
                  type="file"
                  accept=".jpg,.jpeg,.png,.xls,.heic,.webp"
                  className="hidden"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                />
              </label>
            </div>

            <label className="flex items-start gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5 shrink-0 accent-white"
              />
              <span className="text-xs text-blue-100 leading-relaxed">
                {t("form.consent")}{" "}
                <a href="mailto:info.usa@yuusell.com" className="text-white underline">
                  {t("form.consentEmail")}
                </a>
              </span>
            </label>

            <button
              onClick={handleSend}
              className="w-fit bg-white text-blue-500 text-xs font-bold uppercase tracking-widest px-8 py-2.5 rounded-full border-none cursor-pointer hover:bg-blue-50 transition-colors duration-150 font-[inherit]"
            >
              {t("form.send")}
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
