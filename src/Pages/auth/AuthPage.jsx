import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaApple, FaGoogle } from "react-icons/fa";
import Footer from "../../components/Footer";
import PasswordInput from "../../components/PasswordInput";
import PhoneInputField from "../../components/PhoneInputField";
import { loginUser, registerUser } from "../../utils/auth";
import { getPhoneValidationError } from "../../utils/phone";
import AuthIllustration from "./AuthIllustration";

const inputClass =
  "w-full h-12 px-4 rounded-xl bg-[#f0f2f5] border border-transparent outline-none text-sm text-gray-900 font-[inherit] placeholder:text-gray-400 focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all";

const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

function LegalText() {
  const { t } = useTranslation("auth");
  return (
    <p className="text-[11px] sm:text-xs text-gray-400 leading-relaxed text-center">
      {t("legal.prefix")}{" "}
      <Link to="/privacy" className="text-blue-500 no-underline hover:underline">
        {t("legal.privacyPolicy")}
      </Link>{" "}
      {t("legal.and")}{" "}
      <a href="#" className="text-blue-500 no-underline hover:underline">
        {t("legal.termsOfService")}
      </a>{" "}
      {t("legal.suffix")}
    </p>
  );
}

export default function AuthPage() {
  const { t } = useTranslation("auth");
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";

  const [mode, setMode] = useState(location.pathname === "/signup" ? "signup" : "login");

  useEffect(() => {
    setMode(location.pathname === "/signup" ? "signup" : "login");
  }, [location.pathname]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const isLoginFormValid = useMemo(() => {
    if (!isValidEmail(email)) return false;
    if (!password.trim()) return false;
    return true;
  }, [email, password]);

  const isSignupFormValid = useMemo(() => {
    if (!name.trim() || !surname.trim()) return false;
    if (getPhoneValidationError(phone, { required: true })) return false;
    if (!password || password.length < 8) return false;
    if (!isValidEmail(email)) return false;
    return true;
  }, [name, surname, phone, password, email]);

  const switchMode = (next) => {
    setMode(next);
    const base = next === "signup" ? "/signup" : "/login";
    const query = redirectTo !== "/" ? `?redirect=${encodeURIComponent(redirectTo)}` : "";
    navigate(`${base}${query}`, { replace: true });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await loginUser(email, password);
      window.location.href = "/profile";
    } catch (err) {
      setError(err?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    const err = getPhoneValidationError(phone, { required: true });
    if (err) {
      setPhoneError(t(`shared.validation.${err}`));
      return;
    }
    setPhoneError("");
    setLoading(true);
    setError(null);
    try {
      await registerUser(email, password, phone);
      window.location.href = "/profile";
    } catch (err2) {
      setError(err2?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const breadcrumbLabel = mode === "signup" ? t("breadcrumb.signUp") : t("breadcrumb.logIn");
  const illustrationSrc = mode === "signup" ? "/signup.png" : "/login.png";
  const illustrationAlt = mode === "signup" ? t("illustration.signUpAlt") : t("illustration.loginAlt");

  return (
    <>
      <section className="min-w-0 bg-[#f5f6f8]">
        <div className="page-container py-6 sm:py-8 lg:py-10">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-sm text-gray-500 mb-6 sm:mb-8"
          >
            <a href="/" className="hover:text-blue-500 no-underline text-gray-500 transition-colors">
              {t("breadcrumb.main")}
            </a>
            <span className="text-gray-300" aria-hidden="true">›</span>
            <span className="text-blue-500 font-medium">{breadcrumbLabel}</span>
          </nav>

          {redirectTo !== "/" && (
            <p className="mb-6 max-w-lg text-sm text-gray-600 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3">
              {mode === "signup" ? t("redirectNotice.signUp") : t("redirectNotice.logIn")}
            </p>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center max-w-6xl mx-auto">
            <div className="hidden lg:flex items-center justify-center order-1">
              <AuthIllustration src={illustrationSrc} alt={illustrationAlt} />
            </div>

            <div className="w-full max-w-[440px] mx-auto lg:mx-0 lg:ml-auto order-2">
              <div className="bg-white rounded-3xl shadow-[0_4px_32px_rgba(0,0,0,0.08)] border border-gray-100 px-6 sm:px-8 py-8 sm:py-10">
                <h1 className="text-xl sm:text-2xl font-bold text-[#1e2a4a] text-center mb-6 uppercase tracking-wide">
                  {mode === "signup" ? t("title.signUp") : t("title.login")}
                </h1>

                <div className="grid grid-cols-2 gap-0 mb-6 rounded-xl overflow-hidden bg-gray-100 p-1">
                  <button
                    type="button"
                    onClick={() => switchMode("login")}
                    className={`h-11 text-xs sm:text-sm font-bold uppercase tracking-wide rounded-lg border-none cursor-pointer transition-all duration-200 font-[inherit]
                      ${mode === "login"
                        ? "bg-[#3b63f1] text-white shadow-sm"
                        : "bg-transparent text-gray-500 hover:text-gray-700"}`}
                  >
                    {t("tabs.logIn")}
                  </button>
                  <button
                    type="button"
                    onClick={() => switchMode("signup")}
                    className={`h-11 text-xs sm:text-sm font-bold uppercase tracking-wide rounded-lg border-none cursor-pointer transition-all duration-200 font-[inherit]
                      ${mode === "signup"
                        ? "bg-[#3b63f1] text-white shadow-sm"
                        : "bg-transparent text-gray-500 hover:text-gray-700"}`}
                  >
                    {t("tabs.signUp")}
                  </button>
                </div>

                {mode === "login" ? (
                  <form onSubmit={handleLoginSubmit} className="flex flex-col gap-4">
                    <label className="flex flex-col gap-1.5">
                      <span className="text-xs font-medium text-gray-500">{t("fields.email")}</span>
                      <input
                        type="email"
                        placeholder={t("fields.emailPlaceholder")}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={inputClass}
                      />
                    </label>

                    <PasswordInput
                      label={t("fields.password")}
                      placeholder={t("fields.passwordPlaceholder")}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />

                    <div className="relative flex items-center gap-3 my-2">
                      <div className="flex-1 h-px bg-gray-200" />
                      <span className="text-xs text-gray-400 whitespace-nowrap">{t("divider")}</span>
                      <div className="flex-1 h-px bg-gray-200" />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        className="flex h-12 items-center justify-center rounded-xl bg-[#f0f2f5] border-none cursor-pointer hover:bg-gray-200 transition-colors"
                        aria-label={t("social.google")}
                      >
                        <FaGoogle className="w-5 h-5 text-[#4285F4]" aria-hidden="true" />
                      </button>
                      <button
                        type="button"
                        className="flex h-12 items-center justify-center rounded-xl bg-[#f0f2f5] border-none cursor-pointer hover:bg-gray-200 transition-colors"
                        aria-label={t("social.apple")}
                      >
                        <FaApple className="w-5 h-5 text-gray-900" aria-hidden="true" />
                      </button>
                    </div>

                    <LegalText />

                    <button
                      type="submit"
                      disabled={!isLoginFormValid || loading}
                      className={`mt-2 w-full min-h-[48px] text-white text-sm font-bold uppercase tracking-wider rounded-2xl border-none transition-colors duration-150 font-[inherit] flex items-center justify-center gap-2
                        ${isLoginFormValid && !loading
                          ? "bg-[#3b63f1] hover:bg-[#2d52e0] cursor-pointer"
                          : "bg-[#b8c8f8] cursor-not-allowed"}`}
                    >
                      {t("submit.logIn")}
                      <span aria-hidden="true">→</span>
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleSignupSubmit} className="flex flex-col gap-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <label className="flex flex-col gap-1.5">
                        <span className="text-xs font-medium text-gray-500">{t("fields.name")}</span>
                        <input
                          type="text"
                          placeholder={t("fields.namePlaceholder")}
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className={inputClass}
                        />
                      </label>
                      <label className="flex flex-col gap-1.5">
                        <span className="text-xs font-medium text-gray-500">{t("fields.surname")}</span>
                        <input
                          type="text"
                          placeholder={t("fields.surnamePlaceholder")}
                          value={surname}
                          onChange={(e) => setSurname(e.target.value)}
                          className={inputClass}
                        />
                      </label>
                    </div>

                    <PhoneInputField
                      label={t("fields.phone")}
                      required
                      variant="auth"
                      value={phone}
                      onChange={(v) => { setPhone(v); setPhoneError(""); }}
                      error={phoneError}
                      placeholder={t("fields.phonePlaceholder")}
                    />

                    <PasswordInput
                      label={t("fields.password")}
                      placeholder={t("fields.passwordPlaceholder")}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />

                    <label className="flex flex-col gap-1.5">
                      <span className="text-xs font-medium text-gray-500">{t("fields.email")}</span>
                      <input
                        type="email"
                        placeholder={t("fields.emailPlaceholder")}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={inputClass}
                      />
                    </label>

                    <LegalText />

                    <button
                      type="submit"
                      disabled={!isSignupFormValid || loading}
                      className={`mt-2 w-full min-h-[48px] text-white text-sm font-bold uppercase tracking-wider rounded-2xl border-none transition-colors duration-150 font-[inherit] flex items-center justify-center gap-2
                        ${isSignupFormValid && !loading
                          ? "bg-[#3b63f1] hover:bg-[#2d52e0] cursor-pointer"
                          : "bg-[#b8c8f8] cursor-not-allowed"}`}
                    >
                      {t("submit.signUp")}
                      <span aria-hidden="true">→</span>
                    </button>
                  </form>
                )}
              </div>
            </div>

            <div className="lg:hidden order-1 max-w-sm mx-auto w-full">
              <AuthIllustration src={illustrationSrc} alt={illustrationAlt} />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
