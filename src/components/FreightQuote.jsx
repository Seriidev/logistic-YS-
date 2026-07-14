import { LuCircleCheck, LuPackage, LuTruck } from "react-icons/lu";

const CHECKS = [
  "24×7 Real-time Visibility",
  "Secure first and last-mile integrations",
  "Flat rates for small shipments",
  "Freight hubs across major U.S. cities",
];

export default function FreightQuote() {
  return (
    <section className="bg-blue-500 py-10 sm:py-12 px-4 sm:px-6 relative overflow-hidden min-w-0">

      {/* Верхний заголовок */}
      <div className="max-w-[700px] mx-auto text-center mb-12 relative z-10">
        <div className="border border-dashed border-white/40 rounded-2xl px-8 py-5">
          <h2 className="text-xl font-extrabold text-white mb-2">
            Most Trusted LTL & FTL Shipping Solutions in the U.S.
          </h2>
          <p className="text-blue-100 text-xs uppercase tracking-widest">
            YuuSell Truck Freight Services, now powered by AI — Smarter, Faster, Nationwide.
          </p>
        </div>
      </div>

      {/* Основной блок */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-8 relative z-10 min-w-0">

        <div className="relative w-full max-w-md mx-auto lg:mx-0 lg:shrink-0 lg:w-[420px] h-[280px] sm:h-[360px] lg:h-[400px] min-w-0">

          {/* Бейджи */}
          <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm
            border border-white/30 rounded-xl px-4 py-2 z-10">
            <p className="text-white font-bold text-sm">30 seconds</p>
            <p className="text-blue-100 text-xs">To get a free quote</p>
          </div>

          <div className="absolute top-16 left-32 bg-white/20 backdrop-blur-sm
            border border-white/30 rounded-xl px-4 py-2 z-10">
            <p className="text-white font-bold text-sm">100+</p>
            <p className="text-blue-100 text-xs">Carrier Partners in U.S.</p>
          </div>

          <div className="absolute bottom-24 left-40 bg-white/20 backdrop-blur-sm
            border border-white/30 rounded-xl px-4 py-2 z-10">
            <p className="text-white font-bold text-sm">Door-to-door</p>
            <p className="text-blue-100 text-xs">Across the U.S.</p>
          </div>

          {/* Фото людей */}
          <img
            src="/freight-people.png"
            alt="People"
            className="absolute bottom-0 left-0 h-full object-contain"
            onError={(e) => {
              e.target.style.display = "none";
              e.target.parentElement.style.background = "rgba(255,255,255,0.1)";
              e.target.parentElement.style.borderRadius = "24px";
              e.target.parentElement.style.display = "flex";
              e.target.parentElement.style.alignItems = "center";
              e.target.parentElement.style.justifyContent = "center";
              e.target.parentElement.innerHTML += `<p style="color:rgba(255,255,255,0.6);font-size:12px;text-align:center">Add photo:<br/>public/freight-people.png<br/>PNG transparent<br/>500×600px</p>`;
            }}
          />

          {/* YuuSell логотип на коробке */}
          <div className="absolute bottom-4 left-8 flex items-center gap-2 z-10">
            <img src="/logo/logo.svg" alt="YuuSell" className="h-6 w-auto"
              onError={(e) => { e.target.style.display = "none"; }} />
            <span className="text-white font-bold text-sm">YuuSell</span>
          </div>
        </div>

        {/* Правая часть */}
        <div className="flex-1">
          <h3 className="text-2xl font-extrabold text-white mb-6">
            Best Freight Quote in 30 Seconds.
          </h3>

          {/* FTL Card */}
          <div className="bg-white rounded-2xl p-5 mb-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center">
                <LuTruck className="w-5 h-5 text-blue-500" />
              </div>
              <span className="font-bold text-gray-900">FTL Shipping</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
              <div className="min-w-0">
                <p className="text-xs text-gray-400 mb-1">Load Size</p>
                <p className="text-sm font-semibold text-gray-900 break-words">Full Truckload</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Cost Efficiency</p>
                <p className="text-sm font-semibold text-gray-900">Direct Route Efficiency</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Use Case</p>
                <p className="text-sm font-semibold text-gray-900">Bulk, time-sensitive</p>
              </div>
            </div>
          </div>

          {/* LTL Card */}
          <div className="bg-white rounded-2xl p-5 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center">
                <LuPackage className="w-5 h-5 text-blue-500" />
              </div>
              <span className="font-bold text-gray-900">LTL Shipping</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
              <div className="min-w-0">
                <p className="text-xs text-gray-400 mb-1">Load Size</p>
                <p className="text-sm font-semibold text-gray-900 break-words">Partial Truckload</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Cost Efficiency</p>
                <p className="text-sm font-semibold text-gray-900">Shared Load Savings</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Use Case</p>
                <p className="text-sm font-semibold text-gray-900">E-comm, Small Freight</p>
              </div>
            </div>
          </div>

          {/* Checks */}
          <div className="flex flex-col gap-2 mb-6">
            {CHECKS.map((item) => (
              <div key={item} className="flex items-center gap-2">
                <LuCircleCheck className="w-4 h-4 flex-shrink-0 text-white" />
                <span className="text-white text-sm">{item}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <button className="bg-white text-blue-500 font-bold text-sm uppercase
            tracking-wider px-8 py-3 rounded-full border-none cursor-pointer
            hover:bg-blue-50 transition-colors duration-150">
            Get a Quote in 30 Seconds
          </button>

        </div>
      </div>
    </section>
  );
}
