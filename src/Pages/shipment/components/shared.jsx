import { LuChevronDown, LuChevronRight } from "react-icons/lu";

export function FormBlock({ title, children }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-4 sm:px-6 py-4 border-b border-gray-100">
        <h3 className="text-sm font-bold text-gray-900">{title}</h3>
      </div>
      <div className="px-4 sm:px-6 py-4">{children}</div>
    </div>
  );
}

export function ClickField({ label, value, placeholder, onClick }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && <span className="text-xs font-semibold text-gray-600">{label}</span>}
      <button
        type="button"
        onClick={onClick}
        className="w-full flex items-center justify-between gap-3 px-4 py-3.5 rounded-2xl
          bg-gray-50 border border-gray-100 cursor-pointer
          hover:border-blue-300 hover:bg-blue-50/50 transition-all duration-150 text-left font-[inherit]"
      >
        <span className={`text-sm truncate ${value ? "text-gray-900 font-medium" : "text-gray-400"}`}>
          {value || placeholder}
        </span>
        <LuChevronRight className="w-4 h-4 text-gray-400 shrink-0" aria-hidden="true" />
      </button>
    </div>
  );
}

export function TextInput({ label, placeholder, value, onChange, type = "text" }) {
  return (
    <label className="flex flex-col gap-1.5">
      {label && <span className="text-xs font-medium text-gray-600">{label}</span>}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-100
          text-sm text-gray-900 outline-none font-[inherit]
          focus:border-blue-400 hover:border-gray-200 transition-colors"
      />
    </label>
  );
}

export function SelectInput({ label, placeholder, options, value, onChange, getOptionLabel }) {
  return (
    <label className="flex flex-col gap-1.5">
      {label && <span className="text-xs font-medium text-gray-600">{label}</span>}
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-100
            text-sm text-gray-900 outline-none appearance-none cursor-pointer
            font-[inherit] hover:border-blue-300 transition-colors"
        >
          <option value="">{placeholder}</option>
          {options.map((opt) => {
            const val = typeof opt === "string" ? opt : opt.id;
            const optionLabel = getOptionLabel ? getOptionLabel(opt) : val;
            return <option key={val} value={val}>{optionLabel}</option>;
          })}
        </select>
        <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
          <LuChevronDown className="w-4 h-4 text-gray-400 shrink-0" aria-hidden="true" />
        </span>
      </div>
    </label>
  );
}

export function formatLocation(data, t) {
  if (!data) return null;
  const state = data.state ? t?.(`states.${data.state}`, { defaultValue: data.state }) : null;
  const country = data.country ? t?.(`countries.${data.country}`, { defaultValue: data.country }) : null;
  return [data.city, state, country].filter(Boolean).join(", ") || data.address || null;
}

export function formatContact(data) {
  if (!data) return null;
  const name = [data.firstName, data.lastName].filter(Boolean).join(" ");
  return name || data.email || null;
}
