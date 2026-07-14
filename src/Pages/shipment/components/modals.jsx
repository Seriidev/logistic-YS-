import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { LuSearch } from "react-icons/lu";
import ShipmentModal, { ModalActions } from "./ShipmentModal";
import PhoneInputField from "../../../components/PhoneInputField";
import { TextInput } from "./shared";
import { getPhoneValidationError } from "../../../utils/phone";
import { COUNTRIES, OBTAIN_OPTIONS, TRANSPORT_OPTIONS, US_STATES } from "../constants";

const emptyLocation = { country: "unitedStates", address: "", city: "", state: "", zip: "" };
const emptyContact = {
  company: "", lastName: "", email: "", phone: "", address: "", city: "", state: "", zip: "",
};

function LocationModal({ isOpen, onClose, onSave, title, initial }) {
  const { t } = useTranslation("shipment");
  const [form, setForm] = useState(emptyLocation);

  useEffect(() => {
    if (isOpen) setForm(initial || emptyLocation);
  }, [isOpen, initial]);

  const set = (key) => (val) => setForm((f) => ({ ...f, [key]: val }));

  const handleSave = () => {
    if (!form.country?.trim()) return alert(t("validation.countryRequired"));
    onSave(form);
    onClose();
  };

  return (
    <ShipmentModal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="flex flex-col gap-4">
        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-medium text-gray-600">{t("fields.countryRegion")}</span>
          <select
            value={form.country}
            onChange={(e) => set("country")(e.target.value)}
            className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-100 text-sm outline-none font-[inherit]"
          >
            {COUNTRIES.map((c) => (
              <option key={c} value={c}>
                {t(`countries.${c}`)}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-medium text-gray-600">{t("fields.address")}</span>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <LuSearch className="w-4 h-4" aria-hidden="true" />
            </span>
            <input
              type="text"
              placeholder={t("placeholders.searchAddress")}
              value={form.address}
              onChange={(e) => set("address")(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl border border-gray-100 text-sm outline-none font-[inherit]"
            />
          </div>
        </label>
        <TextInput label={t("fields.city")} placeholder={t("fields.city")} value={form.city} onChange={set("city")} />
        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-medium text-gray-600">{t("fields.state")}</span>
          <select
            value={form.state}
            onChange={(e) => set("state")(e.target.value)}
            className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-100 text-sm outline-none font-[inherit]"
          >
            <option value="">{t("placeholders.selectState")}</option>
            {US_STATES.map((s) => (
              <option key={s} value={s}>
                {t(`states.${s}`)}
              </option>
            ))}
          </select>
        </label>
        <TextInput label={t("fields.zipCode")} placeholder={t("fields.zipCode")} value={form.zip} onChange={set("zip")} />
        <ModalActions onCancel={onClose} onSave={handleSave} />
      </div>
    </ShipmentModal>
  );
}

function RadioModal({ isOpen, onClose, onSave, title, options, initial, optionKeyPrefix }) {
  const { t } = useTranslation("shipment");
  const [selected, setSelected] = useState("");

  useEffect(() => {
    if (isOpen) setSelected(initial || options[0] || "");
  }, [isOpen, initial, options]);

  const handleSave = () => {
    if (!selected) return alert(t("validation.optionRequired"));
    onSave(selected);
    onClose();
  };

  return (
    <ShipmentModal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="flex flex-col gap-2">
        {options.map((opt) => (
          <label
            key={opt}
            className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border cursor-pointer transition-colors
              ${selected === opt ? "border-blue-400 bg-blue-50" : "border-gray-100 bg-gray-50 hover:border-blue-200"}`}
          >
            <input
              type="radio"
              name={title}
              checked={selected === opt}
              onChange={() => setSelected(opt)}
              className="w-4 h-4 accent-blue-500"
            />
            <span className="text-sm font-medium text-gray-900">{t(`${optionKeyPrefix}.${opt}`)}</span>
          </label>
        ))}
        <ModalActions onSave={handleSave} saveLabel={t("actions.save")} />
      </div>
    </ShipmentModal>
  );
}

function ContactModal({ isOpen, onClose, onSave, title, initial }) {
  const { t } = useTranslation("shipment");
  const { t: tCommon } = useTranslation("common");
  const [form, setForm] = useState(emptyContact);
  const [phoneError, setPhoneError] = useState("");

  useEffect(() => {
    if (isOpen) {
      setForm(initial || emptyContact);
      setPhoneError("");
    }
  }, [isOpen, initial]);

  const set = (key) => (val) => setForm((f) => ({ ...f, [key]: val }));

  const handleSave = () => {
    if (!form.company?.trim() && !form.lastName?.trim()) {
      return alert(t("validation.nameRequired"));
    }
    const err = getPhoneValidationError(form.phone, { required: true });
    if (err) {
      setPhoneError(tCommon(`shared.validation.${err}`));
      return;
    }
    setPhoneError("");
    onSave({ ...form, firstName: form.company });
    onClose();
  };

  return (
    <ShipmentModal isOpen={isOpen} onClose={onClose} title={title} wide>
      <div className="flex flex-col gap-3.5">
        <TextInput
          label={t("fields.fullNameCompany")}
          placeholder={t("fields.fullNameCompany")}
          value={form.company}
          onChange={set("company")}
        />
        <TextInput label={t("fields.lastName")} placeholder={t("fields.lastName")} value={form.lastName} onChange={set("lastName")} />
        <TextInput label={t("fields.email")} placeholder={t("placeholders.email")} value={form.email} onChange={set("email")} type="email" />
        <PhoneInputField
          label={t("fields.phoneNumber")}
          required
          variant="default"
          value={form.phone}
          onChange={(v) => { set("phone")(v); setPhoneError(""); }}
          error={phoneError}
          placeholder={t("placeholders.phoneNumber")}
        />
        <TextInput label={t("fields.address")} placeholder={t("placeholders.streetAddress")} value={form.address} onChange={set("address")} />
        <TextInput label={t("fields.city")} placeholder={t("fields.city")} value={form.city} onChange={set("city")} />
        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-medium text-gray-600">{t("fields.state")}</span>
          <select
            value={form.state}
            onChange={(e) => set("state")(e.target.value)}
            className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-100 text-sm outline-none font-[inherit]"
          >
            <option value="">{t("placeholders.selectState")}</option>
            {US_STATES.map((s) => (
              <option key={s} value={s}>
                {t(`states.${s}`)}
              </option>
            ))}
          </select>
        </label>
        <TextInput label={t("fields.zipCode")} placeholder={t("fields.zipCode")} value={form.zip} onChange={set("zip")} />
        <ModalActions onSave={handleSave} saveLabel={t("actions.save")} />
      </div>
    </ShipmentModal>
  );
}

export function FromModal(props) {
  const { t } = useTranslation("shipment");
  return <LocationModal {...props} title={t("fields.from")} />;
}

export function WhereModal(props) {
  const { t } = useTranslation("shipment");
  return <LocationModal {...props} title={t("fields.where")} />;
}

export function TransportModal(props) {
  const { t } = useTranslation("shipment");
  return (
    <RadioModal
      {...props}
      title={t("modals.transportTitle")}
      options={TRANSPORT_OPTIONS}
      optionKeyPrefix="transportOptions"
    />
  );
}

export function ObtainModal(props) {
  const { t } = useTranslation("shipment");
  return (
    <RadioModal
      {...props}
      title={t("modals.obtainTitle")}
      options={OBTAIN_OPTIONS}
      optionKeyPrefix="obtainOptions"
    />
  );
}

export function SenderModal(props) {
  const { t } = useTranslation("shipment");
  return <ContactModal {...props} title={t("modals.senderTitle")} />;
}

export function RecipientModal(props) {
  const { t } = useTranslation("shipment");
  return <ContactModal {...props} title={t("modals.recipientTitle")} />;
}
