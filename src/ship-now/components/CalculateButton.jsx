import { useTranslation } from "react-i18next";
import { LuLoaderCircle } from "react-icons/lu";

export default function CalculateButton({ onClick, loading, calculated }) {
  const { t } = useTranslation("shipNow");

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={loading}
      className="ship-now-btn-primary w-full sm:w-auto min-w-[220px]"
    >
      {loading ? (
        <>
          <LuLoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />
          {t("actions.calculating")}
        </>
      ) : calculated ? (
        t("actions.recalculate")
      ) : (
        t("actions.calculate")
      )}
    </button>
  );
}
