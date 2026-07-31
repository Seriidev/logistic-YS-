import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ProgressIndicator from "./components/ProgressIndicator";
import ServiceSelector from "./components/ServiceSelector";
import LCLForm from "./components/LCLForm";
import FCLForm from "./components/FCLForm";
import PaymentMethodStep from "./components/PaymentMethodStep";
import CardPaymentStep from "./components/CardPaymentStep";
import SuccessStep from "./components/SuccessStep";
import Footer from "../components/Footer";
import { getBreakdown } from "./utils/getBreakdown";
import { getPaymentMethod } from "./data/paymentMethods";
import { getPaymentMethodLabel } from "../i18n/paymentMethodLabels";
import { api } from "../utils/api";

function defaultsFor(service) {
  const shared = { weightUnit: "kg", deliveryType: "port-port" };
  if (service === "fcl") return { ...shared, containerType: "20ft" };
  return { ...shared, commodityType: "generalCargo" };
}

export default function SeaCargoBookingPage() {
  const { t } = useTranslation(["seaCargoBooking", "booking"]);
  const [searchParams] = useSearchParams();
  const initialService = searchParams.get("service") === "fcl" ? "fcl" : "lcl";

  const [service, setService] = useState(initialService);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(defaultsFor(initialService));
  const [paymentMethodId, setPaymentMethodId] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState({});
  const [apiTrackingNumber, setApiTrackingNumber] = useState(null);

  const selectedMethod = getPaymentMethod(paymentMethodId);
  const paymentFee = selectedMethod ? selectedMethod.fee : 0;

  const breakdown = getBreakdown(service, { ...formData, paymentFee });

  const handleFormChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleServiceChange = (next) => {
    setService(next);
    setFormData((prev) => ({ ...defaultsFor(next), ...prev }));
  };

  const handlePaymentDetailChange = (field, value) => {
    setPaymentDetails((prev) => ({ ...prev, [field]: value }));
  };

  const goToStep = (n) => {
    setStep(n);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const detailLine =
    service === "fcl"
      ? t("booking.detailLine.fclContainer", {
          ns: "seaCargoBooking",
          label: breakdown.containerLabelKey
            ? t(breakdown.containerLabelKey, { ns: "seaCargoBooking" })
            : t("common.emDash", { ns: "booking" }),
        })
      : t("booking.detailLine.lclUnits", { ns: "seaCargoBooking", count: breakdown.units });

  const booking = {
    serviceType: service,
    serviceLabel: t(breakdown.labelKey, { ns: "seaCargoBooking" }),
    deliveryTime: t(breakdown.deliveryTimeKey, { ns: "seaCargoBooking" }),
    deliveryLabel: breakdown.deliveryLabelKey
      ? t(breakdown.deliveryLabelKey, { ns: "seaCargoBooking" })
      : t("common.notSet", { ns: "booking" }),
    fromCountry: formData.fromCountry,
    zipCode: formData.zipCode,
    destinationCountry: formData.destinationCountry,
    dateOfShipment: formData.dateOfShipment,
    weight: formData.weight,
    weightUnit: formData.weightUnit,
    declaredValue: formData.declaredValue,
    detailLine,
    paymentMethod: selectedMethod
      ? getPaymentMethodLabel(t, selectedMethod, "name")
      : t("common.notSet", { ns: "booking" }),
    total: breakdown.total,
    ...(apiTrackingNumber ? { trackingNumber: apiTrackingNumber } : {}),
  };

  const handleSeaPay = async () => {
    try {
      const res = await api("/shipments", {
        method: "POST",
        body: JSON.stringify({
          recipientName: formData.recipientName,
          recipientEmail: formData.recipientEmail,
          description: formData.commodityDescription || "",
          weight: Number(formData.weight) || 0,
          dimensions: "",
          quantity: service === "lcl" ? (Number(formData.totalUnits) || 1) : 1,
          originAddress: `${formData.fromCountry}, ${formData.zipCode}`,
          destinationAddress: formData.destinationCountry,
          declaredValue: Number(formData.declaredValue) || 0,
          shippingCost: breakdown.total,
          currency: "USD",
          notes: formData.commodityDescription || "",
          type: "SEA",
        }),
      });
      const tracking =
        res?.data?.trackingNumber || res?.trackingNumber || null;
      if (tracking) setApiTrackingNumber(tracking);
    } catch (err) {
      console.error("Failed to create sea shipment:", err);
    }
    goToStep(4);
  };

  return (
    <>
      <main className="min-w-0 bg-gradient-to-b from-blue-50/60 to-white">
        <section className="page-container min-w-0 pt-5 sm:pt-6">
          <nav aria-label={t("aria.breadcrumb", { ns: "booking" })} className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 mb-5 flex-wrap">
            <Link to="/" className="hover:text-blue-500 transition-colors no-underline text-gray-500">{t("breadcrumb.main", { ns: "booking" })}</Link>
            <span aria-hidden="true">›</span>
            <Link to="/sea-cargo" className="hover:text-blue-500 transition-colors no-underline text-gray-500">{t("breadcrumb.seaCargo", { ns: "seaCargoBooking" })}</Link>
            <span aria-hidden="true">›</span>
            <span className="text-gray-900 font-medium">{t("breadcrumb.booking", { ns: "booking" })}</span>
          </nav>

          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 mb-2 sm:mb-3">
              {t("hero.title", { ns: "seaCargoBooking" })}
            </h1>
            <p className="text-sm sm:text-base text-gray-500">
              {t("hero.subtitle", { ns: "seaCargoBooking" })}
            </p>
          </div>
        </section>

        <section className="page-container min-w-0">
          <div className="max-w-4xl mx-auto mb-8 sm:mb-10 lg:mb-12">
            <ProgressIndicator currentStep={step} />
          </div>
        </section>

        <section className="page-container min-w-0 pb-12 sm:pb-16 lg:pb-20">
          {step === 1 && (
            <>
              <ServiceSelector service={service} onSelect={handleServiceChange} />
              {service === "lcl" ? (
                <LCLForm formData={formData} onChange={handleFormChange} onNext={() => goToStep(2)} />
              ) : (
                <FCLForm formData={formData} onChange={handleFormChange} onNext={() => goToStep(2)} />
              )}
            </>
          )}

          {step === 2 && (
            <PaymentMethodStep
              service={service}
              breakdown={breakdown}
              selected={paymentMethodId}
              onSelect={setPaymentMethodId}
              onBack={() => goToStep(1)}
              onContinue={() => goToStep(3)}
            />
          )}

          {step === 3 && (
            <CardPaymentStep
              details={paymentDetails}
              onChange={handlePaymentDetailChange}
              onBack={() => goToStep(2)}
              onPay={handleSeaPay}
              amount={breakdown.total}
            />
          )}

          {step === 4 && <SuccessStep booking={booking} />}
        </section>
      </main>
      <Footer />
    </>
  );
}
