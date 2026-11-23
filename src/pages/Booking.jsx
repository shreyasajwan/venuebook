import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import BookingForm from "../components/BookingForm";

function Booking() {
  const [searchParams] = useSearchParams();
  const venue = searchParams.get("venue") || "";

  return (
    <div className="min-h-screen bg-[#F7F4ED] text-[#1B3028] pt-28 pb-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-[#C6A56B] uppercase tracking-[4px] text-xs mb-5">
            Let's Plan Your Celebration
          </p>
          <h1 className="text-4xl md:text-6xl font-serif text-[#1B3028] leading-tight">
            Your Dream Event
            <span className="italic block">Starts Here</span>
          </h1>
          <p className="text-gray-500 mt-6 leading-8 max-w-lg">
            Tell us a little about your celebration. Our team will help you
            create an unforgettable experience tailored to your vision.
          </p>
        </motion.div>

        {/* FORM */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <BookingForm defaultVenue={venue} />
        </motion.div>
      </div>
    </div>
  );
}

export default Booking;
