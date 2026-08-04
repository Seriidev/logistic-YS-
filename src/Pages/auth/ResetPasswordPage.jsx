import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Footer from "../../components/Footer";
import PasswordInput from "../../components/PasswordInput";
import { resetPassword } from "../../utils/auth";

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || "";

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const isValid = useMemo(() => {
    if (!newPassword || newPassword.length < 8) return false;
    if (newPassword !== confirmPassword) return false;
    return true;
  }, [newPassword, confirmPassword]);

  const validationHint = useMemo(() => {
    if (!newPassword && !confirmPassword) return null;
    if (newPassword.length > 0 && newPassword.length < 8) {
      return "Password must be at least 8 characters.";
    }
    if (confirmPassword && newPassword !== confirmPassword) {
      return "Passwords do not match.";
    }
    return null;
  }, [newPassword, confirmPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid || !token) return;
    setLoading(true);
    setError(null);
    try {
      await resetPassword(token, newPassword);
      setSuccess(true);
    } catch (err) {
      setError(
        err?.message ||
          "Invalid or expired token. Please request a new reset link.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="min-w-0 bg-[#f5f6f8]">
        <div className="page-container py-6 sm:py-8 lg:py-10">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-sm text-gray-500 mb-6 sm:mb-8"
          >
            <a href="/" className="hover:text-blue-500 no-underline text-gray-500 transition-colors">
              Main
            </a>
            <span className="text-gray-300" aria-hidden="true">›</span>
            <span className="text-blue-500 font-medium">Reset password</span>
          </nav>

          <div className="w-full max-w-[440px] mx-auto">
            <div className="bg-white rounded-3xl shadow-[0_4px_32px_rgba(0,0,0,0.08)] border border-gray-100 px-6 sm:px-8 py-8 sm:py-10">
              <h1 className="text-xl sm:text-2xl font-bold text-[#1e2a4a] text-center mb-6 uppercase tracking-wide">
                Reset password
              </h1>

              {!token ? (
                <div className="flex flex-col gap-4 text-center">
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Invalid or missing reset link.
                  </p>
                  <Link
                    to="/login"
                    className="text-sm font-semibold text-blue-500 no-underline hover:underline"
                  >
                    Back to log in
                  </Link>
                </div>
              ) : success ? (
                <div className="flex flex-col gap-4 text-center">
                  <p className="text-sm text-green-700 leading-relaxed bg-green-50 border border-green-100 rounded-xl px-4 py-3">
                    Password reset successful. You can now log in with your new password.
                  </p>
                  <Link
                    to="/login"
                    className="w-full min-h-[48px] bg-[#3b63f1] hover:bg-[#2d52e0] text-white text-sm font-bold uppercase tracking-wider rounded-2xl no-underline flex items-center justify-center transition-colors"
                  >
                    Go to log in
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <PasswordInput
                    label="New password"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                  <PasswordInput
                    label="Confirm password"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />

                  {validationHint && (
                    <p className="text-xs text-amber-600">{validationHint}</p>
                  )}
                  {error && (
                    <div className="rounded-xl bg-red-50 border border-red-100 px-4 py-3">
                      <p className="text-xs text-red-600 leading-relaxed">{error}</p>
                      <Link
                        to="/login"
                        className="inline-block mt-2 text-xs font-semibold text-blue-500 no-underline hover:underline"
                      >
                        Request a new reset link
                      </Link>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={!isValid || loading}
                    className={`mt-2 w-full min-h-[48px] text-white text-sm font-bold uppercase tracking-wider rounded-2xl border-none transition-colors duration-150 font-[inherit] flex items-center justify-center gap-2
                      ${isValid && !loading
                        ? "bg-[#3b63f1] hover:bg-[#2d52e0] cursor-pointer"
                        : "bg-[#b8c8f8] cursor-not-allowed"}`}
                  >
                    {loading ? "Saving..." : "Reset password"}
                    <span aria-hidden="true">→</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
