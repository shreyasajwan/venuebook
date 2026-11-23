import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, X } from "lucide-react";
import VenueCard from "../components/VenueCard";
import {
  venues,
  cities,
  types,
  priceRanges,
  capacityRanges,
} from "../data/venues";

function Venues() {
  const [query, setQuery] = useState("");
  const [city, setCity] = useState("All");
  const [type, setType] = useState("All");
  const [priceRange, setPriceRange] = useState(0);
  const [capacityRange, setCapacityRange] = useState(0);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const pr = priceRanges[priceRange];
    const cr = capacityRanges[capacityRange];
    return venues.filter((v) => {
      if (q && !v.name.toLowerCase().includes(q) && !v.location.toLowerCase().includes(q) && !v.city.toLowerCase().includes(q)) {
        return false;
      }
      if (city !== "All" && v.city !== city) return false;
      if (type !== "All" && v.type !== type) return false;
      if (v.price < pr.min || v.price > pr.max) return false;
      if (v.capacity < cr.min || v.capacity > cr.max) return false;
      return true;
    });
  }, [query, city, type, priceRange, capacityRange]);

  const hasActiveFilters =
    query.trim() !== "" ||
    city !== "All" ||
    type !== "All" ||
    priceRange !== 0 ||
    capacityRange !== 0;

  const clearFilters = () => {
    setQuery("");
    setCity("All");
    setType("All");
    setPriceRange(0);
    setCapacityRange(0);
  };

  return (
    <div className="min-h-screen bg-[#F7F4ED] text-[#1B3028] pt-28 pb-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <p className="text-[#C6A56B] uppercase tracking-[4px] text-xs mb-5">
            Discover Our Spaces
          </p>
          <h1 className="text-4xl md:text-6xl font-serif text-[#1B3028]">
            Find Your Perfect
            <span className="italic"> Venue</span>
          </h1>
          <p className="text-gray-500 max-w-xl mx-auto mt-6 leading-7">
            Search and filter through our curated collection of venues to find
            the space that matches your vision.
          </p>
        </motion.div>

        {/* Search + Filters */}
        <div className="bg-white border border-[#E8E3D9] p-6 md:p-8 shadow-sm mb-12">
          {/* Search bar */}
          <div className="relative mb-6">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search venues by name or location..."
              className="w-full pl-12 pr-4 py-4 border border-gray-200 outline-none focus:border-[#C6A56B] transition"
            />
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">
                Location
              </label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full border border-gray-200 py-3 px-3 outline-none focus:border-[#C6A56B] bg-white"
              >
                <option value="All">All Locations</option>
                {cities.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">
                Venue Type
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full border border-gray-200 py-3 px-3 outline-none focus:border-[#C6A56B] bg-white"
              >
                <option value="All">All Types</option>
                {types.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">
                Price Range
              </label>
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full border border-gray-200 py-3 px-3 outline-none focus:border-[#C6A56B] bg-white"
              >
                {priceRanges.map((r, i) => (
                  <option key={r.label} value={i}>
                    {r.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">
                Guest Capacity
              </label>
              <select
                value={capacityRange}
                onChange={(e) => setCapacityRange(Number(e.target.value))}
                className="w-full border border-gray-200 py-3 px-3 outline-none focus:border-[#C6A56B] bg-white"
              >
                {capacityRanges.map((r, i) => (
                  <option key={r.label} value={i}>
                    {r.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Clear filters */}
          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Showing {filtered.length} of {venues.length} venues
            </p>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-2 text-sm text-[#1B3028] hover:text-[#C6A56B] transition"
              >
                <X size={16} />
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* Results */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <SlidersHorizontal className="mx-auto text-gray-300 mb-4" size={48} />
            <h3 className="text-2xl font-serif text-[#1B3028] mb-2">
              No venues found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or filters to find the perfect venue.
            </p>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="mt-6 border border-[#1B3028] text-[#1B3028] px-8 py-3 text-sm uppercase tracking-widest hover:bg-[#1B3028] hover:text-white transition"
              >
                Clear Filters
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((v, index) => (
              <motion.div
                key={v.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <VenueCard
                  id={v.id}
                  image={v.images[0]}
                  name={v.name}
                  location={v.location}
                  capacity={v.capacity.toLocaleString()}
                  type={v.type}
                  price={v.priceLabel}
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Venues;
