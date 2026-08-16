import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import StepIndicator from "./components/StepIndicator";
import ServiceTabs from "./components/ServiceTabs";
import LTLForm from "./components/LTLForm";
import FTLForm from "./components/FTLForm";
import PriceConfirmation from "./components/PriceConfirmation";
import PaymentMethodStep from "./components/PaymentMethodStep";
import CardPaymentStep from "./components/CardPaymentStep";
import SuccessStep from "./components/SuccessStep";
import Footer from "../components/Footer";
import { getBreakdown } from "./utils/getBreakdown";
import { getPaymentMethod, getCountry } from "./data/shippingOptions";
import { getPaymentMethodLabel } from "../i18n/paymentMethodLabels";
import { api } from "../utils/api";

function defaultsFor(service) {
  const shared = { country: "asia", category: "generalGoods" };
  if (service === "ftl") return { ...shared, weightUnit: "kg", deliveryType: "doorToDoor" };
  return { ...shared, dimensionUnit: "cm" };
}

export default function TruckCargoBookingPage() {
  const { t } = useTranslation(["truckCargoBooking", "booking"]);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialService = searchParams.get("service") === "ftl" ? "ftl" : "ltl";

  const [service, setService] = useState(initialService);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(defaultsFor(initialService));
  const [paymentMethodId, setPaymentMethodId] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState({});
  const [apiTrackingNumber, setApiTrackingNumber] = useState(null);
  const [attachedFile, setAttachedFile] = useState(null);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const selectedMethod = getPaymentMethod(paymentMethodId);
  const paymentFee = selectedMethod ? selectedMethod.fee : 0;

  const breakdown = getBreakdown(service, { ...formData, paymentFee });

  const handleFormChange = (field, value) => setFormData((prev) => ({ ...prev, [field]: value }));

  const handleServiceChange = (next) => {
    setService(next);
    setFormData((prev) => ({ ...defaultsFor(next), ...prev }));
  };

  const handlePaymentDetailChange = (field, value) =>
    setPaymentDetails((prev) => ({ ...prev, [field]: value }));

  const goToStep = (n) => {
    setStep(n);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const detailLine =
    service === "ftl"
      ? t("summary.ftlDetail", {
        ns: "truckCargoBooking",
        vehicle: t(`options.vehicles.${breakdown.vehicleId}`, { ns: "truckCargoBooking" }),
        delivery: t(`options.delivery.${breakdown.deliveryId}`, { ns: "truckCargoBooking" }),
      })
      : t("summary.ltlDetail", {
        ns: "truckCargoBooking",
        weight: breakdown.chargeableWeight,
        category: t(`options.categories.${breakdown.categoryId}`, { ns: "truckCargoBooking" }),
      });

  const booking = {
    serviceType: service,
    serviceLabel: t(`pricing.${service}.label`, { ns: "truckCargoBooking" }),
    deliveryTime: t(`pricing.${service}.deliveryTime`, { ns: "truckCargoBooking" }),
    countryLabel: getCountry(formData.country)
      ? t(`options.countries.${formData.country}`, { ns: "truckCargoBooking" })
      : t("common.notSet", { ns: "booking" }),
    weight: formData.weight,
    weightUnit: service === "ftl" ? formData.weightUnit || "kg" : "kg",
    declaredValue: formData.declaredValue,
    detailLine,
    paymentMethodId,
    paymentMethod: selectedMethod
      ? getPaymentMethodLabel(t, selectedMethod, "name")
      : t("common.notSet", { ns: "booking" }),
    total: breakdown.total,
    ...(apiTrackingNumber ? { trackingNumber: apiTrackingNumber } : {}),
  };

  const handleTruckPay = async () => {
    try {
      const res = await api("/shipments", {
        method: "POST",
        body: JSON.stringify({
          recipientName: formData.recipientName,
          recipientEmail: formData.recipientEmail,
          description: formData.commodityDescription || "",
          weight: Number(formData.weight) || 0,
          dimensions: service === "ltl"
            ? [formData.length, formData.width, formData.height].filter(Boolean).join("x")
            : "",
          quantity: 1,
          originAddress: `${formData.country}, ${formData.fromLocation}`,
          destinationAddress: service === "ltl" ? formData.receiverInfo : formData.shipperInfo,
          declaredValue: Number(formData.declaredValue) || 0,
          shippingCost: breakdown.total,
          currency: "USD",
          notes: formData.commodityDescription || "",
          type: "TRUCK",
        }),
      });
      const tracking =
        res?.data?.trackingNumber || res?.trackingNumber || null;
      if (tracking) setApiTrackingNumber(tracking);
      const shipmentId = res?.data?.id || res?.id || null;
      if (shipmentId && attachedFile) {
        try {
          const formDataUpload = new FormData();
          formDataUpload.append("file", attachedFile);
          formDataUpload.append("type", "OTHER");
          await api(`/shipments/${shipmentId}/documents`, {
            method: "POST",
            body: formDataUpload,
          });
        } catch (uploadErr) {
          console.error("Document upload failed (shipment was still created successfully):", uploadErr);
        }
      }
    } catch (err) {
      console.error("Failed to create truck shipment:", err);
    }
    goToStep(5);
  };

  return (
    <>
      <main className="min-w-0 bg-gradient-to-b from-blue-50/60 to-white">
        <section className="page-container min-w-0 pt-5 sm:pt-6">
          <nav
            aria-label={t("aria.breadcrumb", { ns: "booking" })}
            className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 mb-5 flex-wrap"
          >
            <Link to="/" className="hover:text-blue-500 transition-colors no-underline text-gray-500">
              {t("breadcrumb.main", { ns: "booking" })}
            </Link>
            <span aria-hidden="true">›</span>
            <Link to="/truck-cargo" className="hover:text-blue-500 transition-colors no-underline text-gray-500">
              {t("breadcrumb.truckCargo", { ns: "truckCargoBooking" })}
            </Link>
            <span aria-hidden="true">›</span>
            <span className="text-gray-900 font-medium">{t("breadcrumb.booking", { ns: "booking" })}</span>
          </nav>

          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 mb-2 sm:mb-3">
              {t("page.title", { ns: "truckCargoBooking" })}
            </h1>
            <p className="text-sm sm:text-base text-gray-500">
              {t("page.subtitle", { ns: "truckCargoBooking" })}
            </p>
          </div>
        </section>

        <section className="page-container min-w-0">
          <div className="max-w-4xl mx-auto mb-8 sm:mb-10 lg:mb-12">
            <StepIndicator currentStep={step} />
          </div>
        </section>

        <section className="page-container min-w-0 pb-12 sm:pb-16 lg:pb-20">
          {step === 1 && (
            <>
              <ServiceTabs service={service} onSelect={handleServiceChange} />
              {service === "ltl" ? (
                <LTLForm formData={formData} onChange={handleFormChange} onNext={() => goToStep(2)} />
              ) : (
                <FTLForm formData={formData} onChange={handleFormChange} onNext={() => goToStep(2)} />
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
            <PaymentMethodStep
              service={service}
              breakdown={breakdown}
              selected={paymentMethodId}
              onSelect={setPaymentMethodId}
              onBack={() => goToStep(2)}
              onContinue={() => goToStep(4)}
            />
          )}

          {step === 4 && (
            <CardPaymentStep
              details={paymentDetails}
              onChange={handlePaymentDetailChange}
              onBack={() => goToStep(3)}
              onPay={handleTruckPay}
              amount={breakdown.total}
            />
          )}

          {step === 5 && <SuccessStep booking={booking} />}
        </section>
      </main>
      <Footer />
    </>
  );
}
