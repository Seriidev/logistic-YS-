import { useState } from "react";
import { LuGlobe, LuHeadphones, LuImage, LuLayers, LuMonitor, LuSettings } from "react-icons/lu";

const FEATURES = [
  {
    id: 1,
    title: "Competitive LTL and FTL shipping rates",
    description: "Affordable rates with optimized routes.",
    icon: LuLayers,
  },
  {
    id: 2,
    title: "Nationwide coverage with top truck freight carriers",
    description: "Seamless truck freight service across the U.S.",
    icon: LuGlobe,
  },
  {
    id: 3,
    title: "Easy-to-use platform with 24/7 visibility",
    description: "Amazing user experience with full visibility.",
    icon: LuMonitor,
  },
  {
    id: 4,
    title: "Personalized support with real humans, anytime",
    description: "Dedicated logistics specialists available anytime.",
    icon: LuHeadphones,
  },
  {
    id: 5,
    title: "Full control over cost, speed, and tracking",
    description: "Stay updated with live shipment tracking.",
    icon: LuSettings,
  },
];

export default function WhyUs() {
  const [imageError, setImageError] = useState(false);

  return (
    <section className="page-container min-w-0 py-12">
      <h2 className="text-2xl font-extrabold text-gray-900 mb-8">
        Why Businesses Trust YuuSell for LTL & FTL
      </h2>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-stretch min-w-0">

        {/* Левая часть — список */}
        <div className="flex-1 flex flex-col gap-3">
          {FEATURES.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.id}
                className="flex items-start gap-4 bg-blue-50 rounded-2xl px-5 py-4">
                <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center flex-shrink-0 shadow-sm">
                  <Icon className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-blue-500 mb-0.5">
                    {feature.title}
                  </p>
                  <p className="text-xs text-gray-500">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Правая часть — фото */}
        <div className="w-full lg:w-[420px] lg:shrink-0 h-64 sm:h-80 lg:h-[380px] rounded-2xl sm:rounded-3xl overflow-hidden bg-gray-100 border-2 border-dashed border-gray-200 flex items-center justify-center min-w-0">
          {imageError ? (
            <div className="text-center text-gray-400">
              <LuImage className="w-12 h-12 mx-auto mb-3" strokeWidth={1.5} />
              <p className="text-[13px]">Add photo: public/truck-why.jpg</p>
              <p className="text-[11px] mt-1">Recommended: 840×760px</p>
            </div>
          ) : (
            <img
              src="/truck-why.jpg"
              alt="Truck cargo"
              className="w-full h-full object-cover"
              onError={() => setImageError(true)}
            />
          )}
        </div>

      </div>
    </section>
  );
}
