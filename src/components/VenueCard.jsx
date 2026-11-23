import { ArrowUpRight, MapPin, Users } from "lucide-react";
import { Link } from "react-router-dom";

function VenueCard({ id, image, name, location, capacity, type, price }) {
  return (
    <div className="group bg-white overflow-hidden">

      {/* Image */}
      <div className="relative h-[350px] overflow-hidden">

        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

        {/* Venue Type */}
        <span className="absolute top-5 left-5 bg-[#F7F4ED] text-[#1B3028] px-4 py-2 text-xs uppercase tracking-widest">
          {type}
        </span>

        {/* Price */}
        <div className="absolute bottom-5 left-5 text-white">
          <p className="text-xs uppercase tracking-widest text-white/70">
            Starting from
          </p>

          <p className="text-2xl font-serif mt-1">
            {price}
          </p>
        </div>

      </div>

      {/* Content */}
      <div className="p-6">

        <div className="flex justify-between items-start gap-4">

          <div>
            <h3 className="text-2xl font-serif text-[#1B3028]">
              {name}
            </h3>

            <p className="flex items-center gap-2 text-sm text-gray-500 mt-3">
              <MapPin size={15} />
              {location}
            </p>
          </div>

          {id ? (
            <Link
              to={`/venues/${id}`}
              className="border border-[#C6A56B] p-3 text-[#1B3028] hover:bg-[#C6A56B] transition inline-flex"
            >
              <ArrowUpRight size={20} />
            </Link>
          ) : (
            <button className="border border-[#C6A56B] p-3 text-[#1B3028] hover:bg-[#C6A56B] transition">
              <ArrowUpRight size={20} />
            </button>
          )}

        </div>

        <div className="border-t border-gray-200 mt-6 pt-5">

          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Users size={16} />

            <span>
              Up to {capacity} guests
            </span>
          </div>

        </div>

      </div>

    </div>
  );
}

export default VenueCard;