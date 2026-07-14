import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { LuChevronDown, LuHeadphones, LuMessageCircle, LuPhone } from "react-icons/lu";
import Footer from "../components/Footer";

function AccordionItem({ question, answer }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`rounded-2xl border transition-all duration-200
        ${open ? "border-blue-200 bg-blue-50" : "border-gray-100 bg-gray-50"}`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 rounded-full text-left bg-transparent border-none cursor-pointer font-[inherit]"
      >
        <span className={`text-sm font-medium pr-4 transition-colors min-w-0 flex-1 ${open ? "text-blue-500" : "text-gray-800"}`}>
          {question}
        </span>
        <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200 ${open ? "bg-blue-500" : "bg-gray-200"}`}>
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

export default function SupportPage() {
  const { t } = useTranslation("support");
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const faqData = useMemo(() => t("faq", { returnObjects: true }), [t]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setSubmitStatus("success");
      setIsSubmitting(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1500);
  };

  return (
    <>
      <section className="bg-blue-50 py-10 sm:py-16">
        <div className="page-container min-w-0 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">{t("hero.title")}</h1>
          <p className="text-lg text-gray-600">{t("hero.subtitle")}</p>
        </div>
      </section>

      <section className="py-12">
        <div className="page-container min-w-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-900">{t("contact.title")}</h2>
              <p className="text-gray-600">{t("contact.description")}</p>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <LuMessageCircle className="w-5 h-5 text-blue-500" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{t("contact.emailSupport")}</h3>
                    <p className="text-gray-600">
                      <a href={`mailto:${t("contact.email")}`} className="underline">{t("contact.email")}</a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <LuPhone className="w-5 h-5 text-blue-500" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{t("contact.phoneSupport")}</h3>
                    <p className="text-gray-600">
                      <a href="tel:+19412889573" className="underline">{t("contact.phone")}</a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <LuHeadphones className="w-5 h-5 text-blue-500" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{t("contact.liveChat")}</h3>
                    <p className="text-gray-600">{t("contact.liveChatDescription")}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t("form.title")}</h2>
              <p className="text-gray-600 mb-6">{t("form.description")}</p>

              {submitStatus === "success" && (
                <div className="bg-green-50 text-green-800 p-4 rounded mb-6">{t("form.success")}</div>
              )}

              {submitStatus === "error" && (
                <div className="bg-red-50 text-red-800 p-4 rounded mb-6">{t("form.error")}</div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t("form.fullName")}</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t("form.email")}</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t("form.subject")}</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t("form.message")}</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
                    disabled={isSubmitting}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-500 text-white px-6 py-2 rounded-full font-medium hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? t("form.sending") : t("form.send")}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
