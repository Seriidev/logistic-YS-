import { Link } from "react-router-dom";
import { LuBan, LuFileText, LuPlane, LuScale, LuShieldCheck, LuTruck } from "react-icons/lu";

const ITEMS = [
  { id: 1, title: "Dimensional Weight", Icon: LuScale, path: "/dimensional-weight" },
  { id: 2, title: "Customs Declaration", Icon: LuFileText, path: "/customs-declaration" },
  { id: 3, title: "Prohibited Items", Icon: LuBan, path: "/prohibited-items" },
  { id: 4, title: "Deliver to US Through FedEx", Icon: LuTruck, path: "/deliver-fedex" },
  { id: 5, title: "Compliance", Icon: LuShieldCheck, path: "/compliance" },
  { id: 6, title: "Restricted Air Freight Items", Icon: LuPlane, path: "/restricted-air" },
];

export default function InternationalShipping() {
  return (
    <section className="page-container min-w-0 py-12">
      <div className="bg-blue-50 rounded-2xl sm:rounded-3xl px-4 py-6 sm:px-10 sm:py-10">

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-extrabold text-blue-500 mb-2">
            International shipping from USA
          </h2>
          <p className="text-sm text-gray-500">
            Country-specific rules and regulations by origin and destination countries
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {ITEMS.map((item) => {
            const ItemIcon = item.Icon;
            return (
            <div
              key={item.id}
              className="border-2 border-dashed border-blue-200 rounded-2xl
                bg-white/60 p-4 sm:p-5 flex flex-col items-center text-center gap-3 sm:gap-4"
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center shrink-0 text-blue-500">
                <ItemIcon className="w-12 h-12 sm:w-14 sm:h-14" aria-hidden="true" />
              </div>

              <p className="text-xs font-extrabold text-gray-900 uppercase leading-tight">
                {item.title}
              </p>

              <Link
                 to={item.path}
                 className="bg-blue-500 text-white text-[10px] font-bold uppercase
                   tracking-wider px-4 py-1.5 rounded-lg no-underline
                   hover:bg-blue-600 transition-colors duration-150"
               >
                 More Details
               </Link>

            </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
