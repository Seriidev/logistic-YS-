import { useState } from "react";
import { LuChevronDown, LuSearch } from "react-icons/lu";

const CONTINENTS = [
  "All Continents",
  "Europe",
  "Asia",
  "North America",
  "South America",
  "Africa",
  "Australia",
];

const COUNTRIES = [
  "USA", "Germany", "France", "China", "Japan", "Brazil",
  "Canada", "Australia", "India", "UAE", "UK", "Italy",
  "Spain", "Mexico", "South Korea", "Russia", "Turkey",
];

export default function SeaHero() {
  const [continent, setContinent] = useState("All Continents");
  const [search, setSearch] = useState("");
  const [showResults, setShowResults] = useState(false);

  const filtered = COUNTRIES.filter((c) =>
    c.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page-container py-4 sm:py-6 min-w-0">

      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4 flex-wrap">
        <a href="/" className="hover:text-blue-500 transition-colors no-underline text-gray-500">Main</a>
        <span>›</span>
        <span className="text-gray-900 font-medium">Sea Cargo</span>
      </div>

      <div className="relative rounded-2xl sm:rounded-3xl bg-blue-500 overflow-hidden px-5 py-8 sm:px-10 sm:py-10 min-h-[200px] flex flex-col justify-center">

        <div className="hidden md:block absolute top-4 right-[40%] lg:right-[280px] opacity-80 pointer-events-none">
          <img src="/box-decor.png" alt="" className="w-12 sm:w-16"
            onError={(e) => { e.target.style.display = "none"; }} />
        </div>
        <div className="hidden md:block absolute bottom-4 left-[40%] lg:left-[320px] opacity-60 pointer-events-none">
          <img src="/box-decor2.png" alt="" className="w-10"
            onError={(e) => { e.target.style.display = "none"; }} />
        </div>

        <img
          src="/truck-hero.png"
          alt="Truck"
          className="hidden sm:block absolute right-0 bottom-0 h-24 sm:h-[140px] md:h-[180px] max-w-[55%] object-contain pointer-events-none"
          onError={(e) => { e.target.style.display = "none"; }}
        />

        <div className="hidden md:block absolute right-20 lg:right-[160px] top-1/2 -translate-y-1/2 w-32 h-32 lg:w-[200px] lg:h-[200px]
          rounded-full border-[24px] lg:border-[40px] border-white/10 pointer-events-none" />

        <div className="relative z-10 w-full max-w-full lg:max-w-[500px] min-w-0 pr-0 sm:pr-24 md:pr-32">
          <h1 className="text-xl sm:text-2xl font-extrabold text-white mb-4 leading-tight">
            International shipping from USA
          </h1>

          <button
            type="button"
            className="banner-cta w-full sm:w-auto bg-white text-gray-900 text-sm font-bold uppercase
            tracking-wider px-6 py-2.5 rounded-full border-none cursor-pointer
            hover:bg-blue-50 transition-colors duration-150 mb-5"
          >
            Ship Now
          </button>

          <p className="text-blue-100 text-xs mb-2 font-medium">Continent of delivery</p>

          <div className="flex flex-col sm:flex-row gap-3 min-w-0">

            <div className="relative w-full sm:w-auto">
              <select
                value={continent}
                onChange={(e) => setContinent(e.target.value)}
                className="w-full sm:min-w-[160px] h-11 pl-4 pr-8 rounded-full bg-white text-gray-900
                  text-sm font-medium border-none outline-none cursor-pointer
                  appearance-none font-[inherit]"
              >
                {CONTINENTS.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                <LuChevronDown className="w-3.5 h-3.5" />
              </span>
            </div>

            <div className="relative flex-1 min-w-0 w-full">
              <input
                type="search"
                placeholder="Search country"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setShowResults(true); }}
                onBlur={() => setTimeout(() => setShowResults(false), 150)}
                onFocus={() => search && setShowResults(true)}
                className="h-11 w-full pl-4 pr-10 rounded-full bg-white text-gray-900
                  text-sm border-none outline-none font-[inherit] min-w-0"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                <LuSearch className="w-3.5 h-3.5" />
              </span>

              {showResults && search && filtered.length > 0 && (
                <div className="absolute top-[calc(100%+6px)] left-0 w-full bg-white
                  rounded-2xl shadow-lg overflow-hidden z-50 border border-gray-100 max-h-48 overflow-y-auto">
                  {filtered.map((country) => (
                    <div
                      key={country}
                      onMouseDown={() => { setSearch(country); setShowResults(false); }}
                      className="px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50
                        hover:text-blue-500 cursor-pointer transition-colors duration-100"
                    >
                      {country}
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
