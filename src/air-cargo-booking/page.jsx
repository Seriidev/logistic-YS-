import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import ProgressIndicator from "./components/ProgressIndicator";
import ServiceSelector from "./components/ServiceSelector";
import EconomyForm from "./components/EconomyForm";
import ExpressForm from "./components/ExpressForm";
import PriceConfirmation from "./components/PriceConfirmation";
import PaymentMethod from "./components/PaymentMethod";
import PaymentDetails from "./components/PaymentDetails";
import ShipmentSuccess from "./components/ShipmentSuccess";
import Footer from "../components/Footer";
import { getBreakdown } from "./utils/getBreakdown";
import { getPaymentMethod } from "./data/paymentMethods";
import { getPaymentMethodLabel } from "../i18n/paymentMethodLabels";
import { api } from "../utils/api";

export default function AirCargoBookingPage() {
  const { t } = useTranslation(["airCargoBooking", "booking"]);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialService = searchParams.get("service") === "express" ? "express" : "economy";

  const [service, setService] = useState(initialService);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [paymentMethodId, setPaymentMethodId] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState({});
  const [apiTrackingNumber, setApiTrackingNumber] = useState(null);
  const [attachedFile, setAttachedFile] = useState(null);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [createdShipmentId, setCreatedShipmentId] = useState(null);
  const [shipmentCreating, setShipmentCreating] = useState(false);
  const [shipmentCreateError, setShipmentCreateError] = useState(null);

  const selectedMethod = getPaymentMethod(paymentMethodId);
  const paymentFee = selectedMethod ? selectedMethod.fee : 0;

  const breakdown = getBreakdown(service, { ...formData, paymentFee });

  const handleFormChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleServiceChange = (next) => {
    setService(next);
  };

  const handlePaymentDetailChange = (field, value) => {
    setPaymentDetails((prev) => ({ ...prev, [field]: value }));
  };

  const goToStep = (n) => {
    setStep(n);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const booking = {
    serviceType: service,
    serviceLabel: t(breakdown.labelKey),
    deliveryTime: t(breakdown.deliveryTimeKey),
    fromCountry: formData.fromCountry,
    zipCode: formData.zipCode,
    destinationCountry: formData.destinationCountry,
    weight: formData.weight,
    length: formData.length,
    width: formData.width,
    height: formData.height,
    declaredValue: formData.declaredValue,
    paymentMethod: selectedMethod
      ? getPaymentMethodLabel(t, selectedMethod, "name")
      : t("common.notSet", { ns: "booking" }),
    total: breakdown.total,
    ...(apiTrackingNumber ? { trackingNumber: apiTrackingNumber } : {}),
  };

  const createDraftShipment = async () => {
    setShipmentCreateError(null);
    const res = await api("/shipments", {
      method: "POST",
      body: JSON.stringify({
        recipientName: formData.recipientName,
        recipientEmail: formData.recipientEmail,
        description: formData.specialInstructions || "",
        weight: Number(formData.weight) || 0,
        dimensions: [formData.length, formData.width, formData.height].filter(Boolean).join("x"),
        quantity: 1,
        originAddress: `${formData.fromCountry}, ${formData.zipCode}`,
        destinationAddress: formData.destinationCountry,
        declaredValue: Number(formData.declaredValue) || 0,
        shippingCost: breakdown.total,
        currency: "USD",
        notes: formData.specialInstructions || "",
        type: "AIR",
      }),
    });
    const tracking =
      res?.data?.trackingNumber || res?.trackingNumber || null;
    if (tracking) setApiTrackingNumber(tracking);
    const shipmentId = res?.data?.id || res?.id || null;
    if (!shipmentId) {
      throw new Error("Shipment created but no id returned");
    }
    setCreatedShipmentId(shipmentId);
    console.log("createdShipmentId:", shipmentId);
    if (shipmentId && attachedFile) {
      try {
        const uploadBody = new FormData();
        uploadBody.append("file", attachedFile);
        uploadBody.append("type", "OTHER");
        await api(`/shipments/${shipmentId}/documents`, {
          method: "POST",
          body: uploadBody,
        });
      } catch (uploadErr) {
        console.error("Document upload failed (shipment was still created successfully):", uploadErr);
      }
    }
    return res;
  };

  const handlePaymentMethodContinue = async () => {
    if (shipmentCreating) return;
    setShipmentCreating(true);
    setShipmentCreateError(null);
    try {
      await createDraftShipment();
      goToStep(4);
    } catch (err) {
      console.error("Failed to create draft shipment:", err);
      setShipmentCreateError(
        err?.message || "Failed to create shipment. Please try again.",
      );
    } finally {
      setShipmentCreating(false);
    }
  };

  const handleEconomyPay = async () => {
    goToStep(5);
  };

  const handleExpressPay = async () => {
    goToStep(5);
  };

  return (
    <>
      <main className="min-w-0 bg-gradient-to-b from-blue-50/60 to-white">
        <section className="page-container min-w-0 pt-5 sm:pt-6">
          <nav aria-label={t("aria.breadcrumb", { ns: "booking" })} className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 mb-5 flex-wrap">
            <Link to="/" className="hover:text-blue-500 transition-colors no-underline text-gray-500">
              {t("breadcrumb.main", { ns: "booking" })}
            </Link>
            <span aria-hidden="true">›</span>
            <Link to="/air-cargo" className="hover:text-blue-500 transition-colors no-underline text-gray-500">
              {t("breadcrumb.airCargo")}
            </Link>
            <span aria-hidden="true">›</span>
            <span className="text-gray-900 font-medium">{t("breadcrumb.booking", { ns: "booking" })}</span>
          </nav>

          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 mb-2 sm:mb-3">
              {t("hero.title")}
            </h1>
            <p className="text-sm sm:text-base text-gray-500">
              {t("hero.subtitle")}
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
              {service === "economy" ? (
                <EconomyForm
                  formData={formData}
                  onChange={handleFormChange}
                  onNext={() => goToStep(2)}
                />
              ) : (
                <ExpressForm
                  formData={formData}
                  onChange={handleFormChange}
                  onNext={() => goToStep(2)}
                />
              )}
              <div className="max-w-5xl mx-auto mt-4 min-w-0">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Attach document (optional)
                </label>
                <input
                  type="file"
                  onChange={(e) => setAttachedFile(e.target.files?.[0] || null)}
                  className="w-full h-11 sm:h-12 px-4 rounded-xl border border-gray-200 text-sm text-gray-900 outline-none bg-white focus:border-blue-400 transition-colors min-w-0 font-[inherit]"
                />
              </div>
            </>
          )}

          {step === 2 && (
            <PriceConfirmation
              formData={formData}
              service={service}
              breakdown={breakdown}
              onSelectService={handleServiceChange}
              termsAccepted={termsAccepted}
              onTermsChange={setTermsAccepted}
              onBack={() => goToStep(1)}
              onCancel={() => navigate("/")}
              onContinue={() => goToStep(3)}
            />
          )}

          {step === 3 && (
            <>
              <PaymentMethod
                selected={paymentMethodId}
                onSelect={setPaymentMethodId}
                onBack={() => goToStep(2)}
                onContinue={handlePaymentMethodContinue}
              />
              {shipmentCreating && (
                <p className="max-w-2xl mx-auto mt-3 text-sm text-gray-500 text-center">
                  Creating shipment…
                </p>
              )}
              {shipmentCreateError && (
                <p className="max-w-2xl mx-auto mt-3 text-sm text-red-500 text-center">
                  {shipmentCreateError}
                </p>
              )}
            </>
          )}

          {step === 4 && (
            <PaymentDetails
              details={paymentDetails}
              onChange={handlePaymentDetailChange}
              onBack={() => goToStep(3)}
              onPay={service === "economy" ? handleEconomyPay : handleExpressPay}
              amount={breakdown.total}
            />
          )}

          {step === 5 && <ShipmentSuccess booking={booking} />}
        </section>
      </main>
      <Footer />
    </>
  );
}
