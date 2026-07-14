import { useState } from "react";
import { useTranslation } from "react-i18next";
import { LuBriefcase, LuChevronDown } from "react-icons/lu";
import PhoneInputField from "./PhoneInputField";
import { getPhoneValidationError } from "../utils/phone";

const SHIPPING_OPTION_KEYS = [
  "business",
  "personal",
  "ecommerce",
  "freightBroker",
  "other",
];

export default function ContactForm() {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [shipping, setShipping] = useState("business");

  const handleSubmit = () => {
    const err = getPhoneValidationError(phone, { required: true });
    if (err) {
      setPhoneError(t(`shared.validation.${err}`));
      return;
    }
    setPhoneError("");
    alert(t("contactForm.successAlert", { name }));
  };

  return (
    <section className="page-container min-w-0 py-16">
      <div className="max-w-175 mx-auto">

        <div className="text-center mb-10">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">
            {t("contactForm.eyebrow")}
          </p>
          <h2 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-4">
            {t("contactForm.title")}
          </h2>
          <p className="text-sm text-gray-500 leading-relaxed">
            {t("contactForm.subtitle")}
          </p>
        </div>

        <div className="flex flex-col gap-6">

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 min-w-0">
              <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                {t("contactForm.fields.name")}
              </label>
              <input
                type="text"
                placeholder={t("contactForm.fields.namePlaceholder")}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-12 px-5 rounded-full border border-gray-200
                  text-sm text-gray-900 outline-none font-[inherit]
                  focus:border-blue-400 transition-colors duration-150
                  hover:border-gray-300"
              />
            </div>
            <div className="flex-1 min-w-0">
              <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                {t("contactForm.fields.email")}
              </label>
              <input
                type="email"
                placeholder={t("contactForm.fields.emailPlaceholder")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-12 px-5 rounded-full border border-gray-200
                  text-sm text-gray-900 outline-none font-[inherit]
                  focus:border-blue-400 transition-colors duration-150
                  hover:border-gray-300"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">

            <PhoneInputField
              label={t("contactForm.fields.phone")}
              required
              variant="rounded"
              value={phone}
              onChange={(v) => { setPhone(v); setPhoneError(""); }}
              error={phoneError}
              placeholder={t("contactForm.fields.phonePlaceholder")}
              className="flex-1 min-w-0 [&_label]:text-sm [&_label]:text-gray-700 [&_label]:font-medium"
            />

            <div className="flex-1">
              <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                {t("contactForm.fields.shippingAs")}
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <LuBriefcase className="w-4 h-4" aria-hidden="true" />
                </div>
                <select
                  value={shipping}
                  onChange={(e) => setShipping(e.target.value)}
                  className="w-full h-12 pl-10 pr-10 rounded-full border border-gray-200
                    text-sm text-gray-900 outline-none bg-white cursor-pointer
                    appearance-none font-[inherit]
                    focus:border-blue-400 hover:border-gray-300
                    transition-colors duration-150"
                >
                  {SHIPPING_OPTION_KEYS.map((key) => (
                    <option key={key} value={key}>
                      {t(`contactForm.shippingOptions.${key}`)}
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                  <LuChevronDown className="w-4 h-4" aria-hidden="true" />
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full h-14 bg-blue-500 text-white font-semibold text-base
              rounded-full border-none cursor-pointer
              hover:bg-blue-600 active:scale-[0.99]
              transition-all duration-150 font-[inherit]"
          >
            {t("contactForm.submit")}
          </button>

        </div>
      </div>
    </section>
  );
}
