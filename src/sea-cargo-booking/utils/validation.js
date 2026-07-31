const hasValue = (value) => Boolean(String(value || "").trim());

function hasRequiredFields(form, fields) {
  return fields.every((field) => hasValue(form[field]));
}

export function validateLCL(form = {}) {
  return hasRequiredFields(form, [
    "fromCountry",
    "zipCode",
    "destinationCountry",
    "dateOfShipment",
    "totalUnits",
    "weight",
    "commodityType",
    "deliveryType",
    "recipientName",
    "recipientEmail",
  ]);
}

export function validateFCL(form = {}) {
  return hasRequiredFields(form, [
    "fromCountry",
    "zipCode",
    "destinationCountry",
    "dateOfShipment",
    "weight",
    "containerType",
    "hsCode",
    "deliveryType",
    "recipientName",
    "recipientEmail",
  ]);
}

export function validateShipment(service, form) {
  return service === "fcl" ? validateFCL(form) : validateLCL(form);
}

export function validateCard(details = {}) {
  const digits = String(details.cardNumber || "").replace(/\s/g, "");
  return (
    digits.length >= 13 &&
    hasRequiredFields(details, [
      "expiry",
      "cvc",
      "cardholderName",
      "fullName",
      "addressLine1",
      "city",
      "postalCode",
    ])
  );
}
