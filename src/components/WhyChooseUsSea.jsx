import { useState } from "react";
import { LuCrosshair, LuHeadphones, LuImage, LuLayers, LuShield, LuStar, LuTruck } from "react-icons/lu";

const FEATURES = [
  {
    id: 1,
    title: "Trusted Ocean Freight Forwarder",
    description: "With 25+ years of Industry experience with a proven track record of reliability.",
    icon: LuStar,
  },
  {
    id: 2,
    title: "Secure & Affordable Ocean Freight Options",
    description: "Be it FCL or LCL, YuuSell ensures security with flexible shipment facilities.",
    icon: LuShield,
  },
  {
    id: 3,
    title: "Real-Time Tracking & Live ETAs",
    description: "Real-Time Tracking & Live ETAs for all your shipments worldwide.",
    icon: LuCrosshair,
  },
  {
    id: 4,
    title: "Low-Cost Ocean Freight with LCL & FCL Options",
    description: "Ideal for cost-sensitive shipments.",
    icon: LuLayers,
  },
  {
    id: 5,
    title: "End-to-End Ocean Freight Logistics Company",
    description: "Handling everything from booking to compliance & delivery.",
    icon: LuTruck,
  },
  {
    id: 6,
    title: "Expert Support, 24/7",
    description: "A dedicated team ready to assist with every shipment.",
    icon: LuHeadphones,
  },
];

export default function WhyChooseUsSea() {
  const [imageError, setImageError] = useState(false);

  return (
    <section className="page-container min-w-0 py-10 sm:py-16">

      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 text-center mb-8 sm:mb-10 px-2">
        Why Businesses Choose YuuSell for Ocean Freight
      </h2>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-stretch min-w-0">

        {/* Фото */}
        <div className="w-full lg:w-[420px] lg:shrink-0 h-64 sm:h-80 lg:h-[480px] rounded-2xl sm:rounded-3xl overflow-hidden bg-gray-100 min-w-0 flex items-center justify-center">
          {imageError ? (
            <div className="flex flex-col items-center gap-2 text-gray-400">
              <LuImage className="w-12 h-12" strokeWidth={1.5} />
              <p className="text-xs text-center">
                Add photo:<br />public/sea-why.jpg<br />840×960px
              </p>
            </div>
          ) : (
            <img
              src="/sea-why.jpg"
              alt="Sea Cargo"
              className="w-full h-full object-cover"
              onError={() => setImageError(true)}
            />
          )}
        </div>

        {/* Список */}
        <div className="flex-1 min-w-0 flex flex-col gap-3">
          {FEATURES.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.id}
                className="flex items-start gap-4 bg-gray-50 rounded-2xl px-5 py-4
                  hover:bg-blue-50 transition-colors duration-150">
                <div className="w-9 h-9 rounded-xl bg-white flex items-center
                  justify-center flex-shrink-0 shadow-sm mt-0.5">
                  <Icon className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-blue-500 mb-0.5">
                    {feature.title}
                  </p>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
