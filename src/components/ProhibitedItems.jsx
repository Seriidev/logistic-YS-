import { PROHIBITED, SPECIAL } from "../data/prohibitedItems";

const TITLES = {
  "items.explosives": "Explosives",
  "items.firearms": "Firearms & ammunition",
  "items.flammable": "Flammable liquids",
  "items.toxic": "Toxic substances",
  "items.radioactive": "Radioactive materials",
  "items.lithiumBatteries": "Lithium batteries",
  "items.perishable": "Perishable goods",
  "items.culturalAssets": "Cultural assets",
  "special.dryIce": "Dry ice",
  "special.medicines": "Medicines",
};

const ItemCard = ({ item }) => {
  const { Icon } = item;
  return (
    <div className="bg-white rounded-2xl p-5 flex flex-col items-center text-center gap-3">
      <div className="w-20 h-20 flex items-center justify-center">
        <Icon className="w-16 h-16 text-blue-500" aria-hidden />
      </div>
      <p className="text-xs font-semibold text-gray-800 leading-snug">{TITLES[item.titleKey]}</p>
    </div>
  );
};

export default function ProhibitedItems() {
  return (
    <section className="page-container min-w-0 py-10 sm:py-16">

      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-xl font-extrabold text-gray-900 uppercase tracking-wide mb-3">
          It is prohibited to send in parcels
        </h2>
        <p className="text-sm text-gray-500 max-w-2xl mx-auto leading-relaxed px-2">
          The following items are strictly prohibited in shipments for safety, legal, and customs reasons.
          Please review the list carefully before sending your parcel.
        </p>
        <a href="#" className="inline-block mt-3 text-xs font-semibold text-red-500
          uppercase tracking-widest hover:text-red-600 transition-colors rounded-full">
          Please check destination country restrictions for incoming shipments
        </a>
      </div>

      {/* Main container */}
      <div className="bg-blue-50 rounded-2xl sm:rounded-3xl p-4 sm:p-8">

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
          {PROHIBITED.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>

        {/* Special conditions */}
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-1">Special conditions</h3>
          <p className="text-sm text-gray-500 mb-4">
            Some items can only be transported *under special conditions*:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {SPECIAL.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
