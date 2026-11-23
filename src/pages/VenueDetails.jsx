import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Users, ArrowLeft, Phone, Mail, Check } from "lucide-react";
import { venues } from "../data/venues";

function VenueDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const venue = venues.find((v) => v.id === Number(id));
  const [activeImage, setActiveImage] = useState(0);

  if (!venue) {
    return (
      <div className="min-h-screen bg-[#F7F4ED] flex items-center justify-center px-6">
        <div className="text-center">
          <h2 className="text-3xl font-serif text-[#1B3028] mb-4">
            Venue not found
          </h2>
          <Link
            to="/venues"
            className="border border-[#1B3028] text-[#1B3028] px-8 py-3 text-sm uppercase tracking-widest hover:bg-[#1B3028] hover:text-white transition"
          >
            Back to Venues
          </Link>
        </div>
      </div>
    );
  }

  const handleBook = () => {
    navigate(`/book?venue=${encodeURIComponent(venue.name)}`);
  };

  return (
    <div className="min-h-screen bg-[#F7F4ED] text-[#1B3028] pt-28 pb-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#C6A56B] transition mb-8"
        >
          <ArrowLeft size={16} />
          Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="relative h-[420px] md:h-[520px] overflow-hidden bg-gray-100">
              <img
                src={venue.images[activeImage]}
                alt={venue.name}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-5 left-5 bg-[#F7F4ED] text-[#1B3028] px-4 py-2 text-xs uppercase tracking-widest">
                {venue.type}
              </span>
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-3 gap-3 mt-4">
              {venue.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`h-24 overflow-hidden border-2 transition ${
                    activeImage === i
                      ? "border-[#C6A56B]"
                      : "border-transparent hover:border-gray-300"
                  }`}
                >
                  <img
                    src={img}
                    alt={`${venue.name} ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col"
          >
            <p className="text-[#C6A56B] uppercase tracking-[4px] text-xs mb-3">
              {venue.type}
            </p>
            <h1 className="text-4xl md:text-5xl font-serif text-[#1B3028] leading-tight">
              {venue.name}
            </h1>

            <p className="flex items-center gap-2 text-gray-500 mt-4">
              <MapPin size={16} />
              {venue.location}
            </p>

            <div className="grid grid-cols-2 gap-6 mt-8 py-6 border-y border-gray-200">
              <div>
                <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">
                  Starting Price
                </p>
                <p className="text-2xl font-serif text-[#1B3028]">
                  {venue.priceLabel}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">
                  Guest Capacity
                </p>
                <p className="flex items-center gap-2 text-2xl font-serif text-[#1B3028]">
                  <Users size={20} />
                  Up to {venue.capacity.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-serif text-[#1B3028] mb-3">
                About this venue
              </h3>
              <p className="text-gray-600 leading-8">{venue.description}</p>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-serif text-[#1B3028] mb-4">
                Amenities
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {venue.amenities.map((a) => (
                  <div key={a} className="flex items-center gap-2 text-sm text-gray-600">
                    <Check size={16} className="text-[#C6A56B] shrink-0" />
                    {a}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 bg-white border border-[#E8E3D9] p-6">
              <h3 className="text-xl font-serif text-[#1B3028] mb-4">
                Contact Information
              </h3>
              <div className="space-y-3">
                <p className="flex items-center gap-3 text-gray-600">
                  <Phone size={16} className="text-[#C6A56B]" />
                  {venue.contact.phone}
                </p>
                <p className="flex items-center gap-3 text-gray-600">
                  <Mail size={16} className="text-[#C6A56B]" />
                  {venue.contact.email}
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleBook}
                className="bg-[#1B3028] text-white px-8 py-4 text-sm uppercase tracking-widest hover:bg-[#C6A56B] hover:text-[#1B3028] transition"
              >
                Book Now
              </button>
              <Link
                to="/venues"
                className="border border-[#1B3028] text-[#1B3028] px-8 py-4 text-sm uppercase tracking-widest hover:bg-[#1B3028] hover:text-white transition text-center"
              >
                View All Venues
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default VenueDetails;
