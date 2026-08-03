import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Footer from "../../components/Footer";
import { isAuthenticated } from "../../utils/auth";
import { PARCEL_SIZES } from "./constants";
import { FormBlock, ClickField, SelectInput, TextInput, formatLocation } from "./components/shared";
import { FromModal, WhereModal, TransportModal, ObtainModal } from "./components/modals";

export default function CalculatePage() {
  const navigate = useNavigate();
  const { t } = useTranslation("shipment");

  const [fromData, setFromData] = useState(null);
  const [whereData, setWhereData] = useState(null);
  const [transport, setTransport] = useState("");
  const [obtain, setObtain] = useState("");
  const [parcelSize, setParcelSize] = useState(PARCEL_SIZES[0].id);
  const [cargo, setCargo] = useState("");
  const [height, setHeight] = useState("");
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [result, setResult] = useState(null);

  const [fromOpen, setFromOpen] = useState(false);
  const [whereOpen, setWhereOpen] = useState(false);
  const [transportOpen, setTransportOpen] = useState(false);
  const [obtainOpen, setObtainOpen] = useState(false);

  const selectedSize = PARCEL_SIZES.find((s) => s.id === parcelSize);

  const handleCalculate = () => {
    if (!fromData || !whereData) {
      alert(t("validation.fromWhereRequired"));
      return;
    }
    const days = Math.floor(Math.random() * 20) + 5;
    const price = Math.floor(Math.random() * 500) + 50;
    setResult({ days, price });
  };

  const handleCreateParcel = () => {
    if (!isAuthenticated()) {
      navigate("/signup?redirect=/ship-now");
      return;
    }
    navigate("/ship-now");
  };

  return (
    <>
      <section className="page-container min-w-0 py-6">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <a href="/" className="hover:text-blue-500 no-underline text-gray-500">{t("breadcrumb.main")}</a>
          <span>›</span>
          <span className="text-gray-900 font-medium">{t("breadcrumb.calculate")}</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-stretch min-w-0">
          <div className="flex-1 min-w-0 flex flex-col gap-4">
            <FormBlock title={t("fields.from")}>
              <ClickField
                placeholder={t("placeholders.selectOrigin")}
                value={formatLocation(fromData, t)}
                onClick={() => setFromOpen(true)}
              />
            </FormBlock>

            <FormBlock title={t("fields.where")}>
              <ClickField
                placeholder={t("placeholders.selectDestination")}
                value={formatLocation(whereData, t)}
                onClick={() => setWhereOpen(true)}
              />
            </FormBlock>

            <FormBlock title={t("sections.typeOfService")}>
              <div className="flex flex-col gap-3">
                <ClickField
                  placeholder={t("fields.transport")}
                  value={transport ? t(`transportOptions.${transport}`) : ""}
                  onClick={() => setTransportOpen(true)}
                />
                <ClickField
                  placeholder={t("fields.obtain")}
                  value={obtain ? t(`obtainOptions.${obtain}`) : ""}
                  onClick={() => setObtainOpen(true)}
                />
              </div>
            </FormBlock>

            <FormBlock title={t("sections.parcelSize")}>
              <div className="flex flex-col gap-3">
                <SelectInput
                  placeholder={t("placeholders.selectSize")}
                  options={PARCEL_SIZES}
                  value={parcelSize}
                  onChange={setParcelSize}
                  getOptionLabel={(option) => t(`parcelSizes.${option.id}.label`)}
                />
                {selectedSize && (
                  <p className="text-xs text-blue-400 px-1">{t(`parcelSizes.${selectedSize.id}.desc`)}</p>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <TextInput placeholder={t("fields.heightCm")} value={height} onChange={setHeight} />
                  <TextInput placeholder={t("fields.lengthCm")} value={length} onChange={setLength} />
                  <TextInput placeholder={t("fields.widthCm")} value={width} onChange={setWidth} />
                </div>
              </div>
            </FormBlock>

            <FormBlock title={t("sections.describeCargo")}>
              <textarea
                placeholder={t("placeholders.cargoDescription")}
                value={cargo}
                onChange={(e) => setCargo(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-100 text-sm text-gray-900 outline-none font-[inherit] resize-none focus:border-blue-400 transition-colors"
              />
            </FormBlock>
          </div>

          <div className="w-full lg:w-70 lg:shrink-0 lg:sticky lg:top-24 flex flex-col gap-4 min-w-0">
            <div className="bg-teal-50 border border-teal-100 rounded-2xl p-5">
              <p className="text-sm font-semibold text-teal-800 mb-4">
                {t("calculate.sidebarHint")}
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap gap-2">
                <button
                  type="button"
                  onClick={handleCalculate}
                  className="flex items-center gap-2 bg-teal-500 text-white text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-full border-none cursor-pointer hover:bg-teal-600 transition-colors font-[inherit]"
                >
                  {t("actions.calculate")}
                </button>
                <button
                  type="button"
                  onClick={handleCreateParcel}
                  className="flex items-center gap-2 bg-white text-teal-600 text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-full border border-teal-200 cursor-pointer hover:bg-teal-50 transition-colors font-[inherit]"
                >
                  {t("actions.create")}
                </button>
              </div>
            </div>

            {result && (
              <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                <h3 className="text-sm font-bold text-gray-900 mb-4">{t("calculate.resultTitle")}</h3>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{t("fields.from")}</span>
                    <span className="text-sm font-semibold text-gray-900">{formatLocation(fromData, t)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{t("fields.to")}</span>
                    <span className="text-sm font-semibold text-gray-900">{formatLocation(whereData, t)}</span>
                  </div>
                  <div className="h-px bg-gray-100" />
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{t("calculate.deliveryTime")}</span>
                    <span className="text-sm font-bold text-blue-500">{t("calculate.days", { days: result.days })}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{t("calculate.estimatedPrice")}</span>
                    <span className="text-sm font-bold text-teal-500">{t("calculate.priceFrom", { price: result.price })}</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleCreateParcel}
                    className="w-full h-10 bg-blue-500 text-white text-xs font-bold uppercase tracking-wider rounded-full border-none cursor-pointer hover:bg-blue-600 transition-colors font-[inherit]"
                  >
                    {t("actions.bookShipment")}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <FromModal isOpen={fromOpen} onClose={() => setFromOpen(false)} onSave={setFromData} initial={fromData} />
        <WhereModal isOpen={whereOpen} onClose={() => setWhereOpen(false)} onSave={setWhereData} initial={whereData} />
        <TransportModal isOpen={transportOpen} onClose={() => setTransportOpen(false)} onSave={setTransport} initial={transport} />
        <ObtainModal isOpen={obtainOpen} onClose={() => setObtainOpen(false)} onSave={setObtain} initial={obtain} />
      </section>
      <Footer />
    </>
  );
}
