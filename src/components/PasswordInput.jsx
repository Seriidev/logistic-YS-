import { useState } from "react";
import { LuEye, LuEyeOff } from "react-icons/lu";

const inputClass =
  "w-full h-12 px-4 rounded-xl bg-[#f0f2f5] border border-transparent outline-none text-sm text-gray-900 font-[inherit] placeholder:text-gray-400 focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all";

export default function PasswordInput({ label, value, onChange, placeholder, required = false }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-medium text-gray-500">{label}</span>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`${inputClass} pr-12`}
          required={required}
        />
        <button
          type="button"
          onClick={() => setShowPassword((v) => !v)}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 border-none bg-transparent cursor-pointer transition-colors"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? <LuEyeOff className="w-5 h-5" /> : <LuEye className="w-5 h-5" />}
        </button>
      </div>
    </label>
  );
}
