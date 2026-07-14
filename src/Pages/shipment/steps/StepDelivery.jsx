import { CARRIERS, SHIPPING_SPEEDS } from "../constants";
import { useTranslation } from "react-i18next";
import { LuPlane, LuShip } from "react-icons/lu";
import { FormBlock } from "../components/shared";

export default function StepDelivery({ data, onChange }) {
  const { t } = useTranslation("shipment");
  const set = (key) => (val) => onChange({ ...data, [key]: val });
  const selectedCarrier = CARRIERS.find((c) => c.id === data.carrierId) || CARRIERS[1];
  const shippingCost = selectedCarrier.price;

  return (
    <div className="flex flex-col gap-4">
      <FormBlock title={t("delivery.addToCartOrSkip")}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {SHIPPING_SPEEDS.map((speed) => {
            const selected = data.speedId === speed.id;
            const Icon = speed.mode === "air" ? LuPlane : LuShip;
            return (
              <button
                key={speed.id}
                type="button"
                onClick={() => set("speedId")(speed.id)}
                className={`flex flex-col rounded-2xl border overflow-hidden text-left cursor-pointer transition-all font-[inherit]
                  ${selected ? "border-blue-400 ring-2 ring-blue-100" : "border-gray-100 hover:border-blue-200"}`}
              >
                <div className="flex items-center gap-3 px-4 py-3 bg-white">
                  <input type="radio" readOnly checked={selected} className="accent-blue-500" />
                  <Icon className="w-6 h-6 text-blue-500" aria-hidden="true" />
                  <span className="text-sm font-medium text-gray-900">{t(`shippingSpeeds.${speed.labelKey}`)}</span>
                </div>
                <div className={`px-4 py-2 text-sm font-bold ${selected ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-700"}`}>
                  {speed.price}$
                </div>
              </button>
            );
          })}
        </div>
      </FormBlock>

      <FormBlock title={t("delivery.carrier")}>
        <div className="flex flex-col gap-2">
          {CARRIERS.map((carrier) => {
            const selected = data.carrierId === carrier.id;
            return (
              <button
                key={carrier.id}
                type="button"
                onClick={() => set("carrierId")(carrier.id)}
                className={`flex items-center justify-between gap-4 px-4 py-3.5 rounded-xl border cursor-pointer transition-all font-[inherit]
                  ${selected ? "border-blue-400 bg-blue-50/50" : "border-gray-100 bg-gray-50 hover:border-blue-200"}`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-xs font-bold text-blue-600 bg-blue-100 px-2 py-1 rounded shrink-0">
                    {t(`carrierLogos.${carrier.id}`)}
                  </span>
                  <span className="text-sm text-gray-700 truncate">{t(`carriers.${carrier.nameKey}`)}</span>
                </div>
                <span className="text-sm font-bold text-gray-900 shrink-0">{carrier.price.toFixed(2)}$</span>
              </button>
            );
          })}
        </div>
      </FormBlock>

      <FormBlock title={t("delivery.total")}>
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">{t("delivery.shippingCost")}</span>
            <span className="text-lg font-bold text-blue-500">{shippingCost.toFixed(2)}$</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">{t("delivery.deliveryDate")}</span>
            <span className="text-sm font-bold text-blue-500">{data.deliveryDate || "10.07.2025"}</span>
          </div>
        </div>
      </FormBlock>

      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-medium text-gray-700">{t("delivery.shipmentDate")}</span>
        <input
          type="date"
          value={data.shipmentDate || "2025-07-07"}
          onChange={(e) => set("shipmentDate")(e.target.value)}
          className="w-full sm:max-w-xs px-4 py-3 bg-gray-50 rounded-xl border border-gray-100 text-sm outline-none font-[inherit]"
        />
      </label>
    </div>
  );
}
