import { LuCircleCheck } from "react-icons/lu";

const SOLUTIONS = [
  {
    id: 1,
    title: "Less Than Truck Load",
    description: "Our LTL trucking services connect your freight with optimized routes, secure handling, and shared carrier space — saving you time and cost.",
    image: "/truck-ltl.jpg",
    imageLeft: true,
    checks: [
      "Perfect for small to mid-size shipments",
      "Pay less, move often with smaller shipments",
      "Instant LTL freight quotes",
      "Access to top LTL carriers nationwide",
      "Affordable LTL shipping rates",
    ],
  },
  {
    id: 2,
    title: "Full Freight",
    description: "FTL transport ensures direct delivery with no stops, no splitting, and no handling in between. Ideal for time-sensitive, bulk, or fragile cargo.",
    image: "/truck-ftl.jpg",
    imageLeft: false,
    checks: [
      "Dedicated truck space for your shipment",
      "Faster transit with direct routing",
      "Ideal for heavy, palletized, or oversized freight",
      "Access to trusted FTL trucking companies",
      "Optimized FTL freight pricing across U.S. lanes",
    ],
  },
  {
    id: 3,
    title: "Drayage & Cartage",
    description: "From container pickups at ports to door-to-door deliveries, YuuSell ensures reliable and timely movement of your freight.",
    image: "/truck-drayage.jpg",
    imageLeft: true,
    checks: [
      "Drayage trucking for seamless port-to-warehouse transfers",
      "Cartage services for same-city and last-mile deliveries",
      "White-glove handling and short-haul expertise",
      "Perfect for event logistics and import/export handling",
      "Full compliance with port schedules and route requirements",
    ],
  },
];

const CheckItem = ({ text }) => (
  <div className="flex items-center gap-2">
    <LuCircleCheck className="w-4 h-4 flex-shrink-0 text-blue-500" />
    <span className="text-sm text-gray-600">{text}</span>
  </div>
);

export default function TruckSolutions() {
  return (
    <section className="page-container min-w-0 py-16">

      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-2xl font-extrabold text-gray-900 mb-2">
          Comprehensive Truck Freight Solutions
        </h2>
        <p className="text-sm text-gray-400">What we offer</p>
      </div>

      {/* Solutions */}
      <div className="flex flex-col gap-6">
        {SOLUTIONS.map((item) => (
          <div key={item.id}
            className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 bg-gray-50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 min-w-0">

            {/* Image */}
            {item.imageLeft && (
              <div className="w-full md:w-[320px] h-48 md:h-[220px] md:flex-shrink-0 rounded-2xl overflow-hidden bg-gray-200">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.parentElement.style.display = "flex";
                    e.target.parentElement.style.alignItems = "center";
                    e.target.parentElement.style.justifyContent = "center";
                    e.target.parentElement.innerHTML = `<p style="font-size:11px;color:#9ca3af;text-align:center">Add photo:<br/>${item.image}<br/>640×440px</p>`;
                  }}
                />
              </div>
            )}

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed mb-4">{item.description}</p>
              <div className="flex flex-col gap-2">
                {item.checks.map((check) => (
                  <CheckItem key={check} text={check} />
                ))}
              </div>
            </div>

            {/* Image right */}
            {!item.imageLeft && (
              <div className="w-full md:w-[320px] h-48 md:h-[220px] md:flex-shrink-0 rounded-2xl overflow-hidden bg-gray-200 order-first md:order-none">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.parentElement.style.display = "flex";
                    e.target.parentElement.style.alignItems = "center";
                    e.target.parentElement.style.justifyContent = "center";
                    e.target.parentElement.innerHTML = `<p style="font-size:11px;color:#9ca3af;text-align:center">Add photo:<br/>${item.image}<br/>640×440px</p>`;
                  }}
                />
              </div>
            )}

          </div>
        ))}
      </div>
    </section>
  );
}
