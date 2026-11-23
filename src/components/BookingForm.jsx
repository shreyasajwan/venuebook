import { useState } from "react";
import { motion } from "framer-motion";
import { venues } from "../data/venues";

const EVENT_TYPES = [
  "Wedding",
  "Reception",
  "Engagement",
  "Birthday",
  "Corporate Event",
  "Other",
];

const GUEST_OPTIONS = [
  "50 - 100",
  "100 - 250",
  "250 - 500",
  "500 - 1000",
  "1000+",
];

const BUDGET_OPTIONS = [
  "Under ₹5L",
  "₹5L - ₹10L",
  "₹10L - ₹25L",
  "Above ₹25L",
];

function validate(values) {
  const errors = {};
  if (!values.fullName.trim()) errors.fullName = "Full name is required";
  if (!values.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Enter a valid email address";
  }
  if (!values.phone.trim()) {
    errors.phone = "Phone number is required";
  } else if (!/^[0-9+\-\s]{8,15}$/.test(values.phone)) {
    errors.phone = "Enter a valid phone number";
  }
  if (!values.eventDate) errors.eventDate = "Event date is required";
  if (!values.venue) errors.venue = "Please select a venue";
  if (!values.eventType) errors.eventType = "Please select an event type";
  if (!values.guests) errors.guests = "Please select guest count";
  if (!values.budget) errors.budget = "Please select a budget";
  return errors;
}

function BookingForm({ defaultVenue = "", title = "Enquire About Your Event" }) {
  const [values, setValues] = useState({
    fullName: "",
    email: "",
    phone: "",
    eventDate: "",
    venue: defaultVenue,
    eventType: "",
    guests: "",
    budget: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [submitError, setSubmitError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v = validate(values);
    setErrors(v);
    if (Object.keys(v).length > 0) return;

    setStatus("submitting");
    setSubmitError("");
    try {
      // Frontend-only submission. Replace this with a real API call later.
      await new Promise((resolve) => setTimeout(resolve, 900));
      // eslint-disable-next-line no-console
      console.log("Booking enquiry submitted:", values);
      setStatus("success");
      setValues({
        fullName: "",
        email: "",
        phone: "",
        eventDate: "",
        venue: defaultVenue,
        eventType: "",
        guests: "",
        budget: "",
        message: "",
      });
    } catch {
      setStatus("error");
      setSubmitError("Something went wrong. Please try again.");
    }
  };

  const inputClass =
    "w-full border-b border-gray-300 py-3 outline-none focus:border-[#C6A56B] transition bg-transparent";
  const errorClass = "text-red-500 text-xs mt-1";

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 md:p-12 shadow-sm border border-[#E8E3D9] text-center"
      >
        <div className="w-16 h-16 mx-auto bg-[#1B3028] flex items-center justify-center text-[#C6A56B] mb-6">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
        <h3 className="text-2xl font-serif text-[#1B3028] mb-3">
          Enquiry Submitted
        </h3>
        <p className="text-gray-500 leading-7 max-w-md mx-auto">
          Thank you! Our team will get back to you shortly to help plan your
          celebration.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-8 border border-[#1B3028] text-[#1B3028] px-8 py-3 text-sm uppercase tracking-widest hover:bg-[#1B3028] hover:text-white transition"
        >
          Submit Another
        </button>
      </motion.div>
    );
  }

  return (
    <div className="bg-white p-8 md:p-12 shadow-sm border border-[#E8E3D9]">
      <h3 className="text-2xl font-serif text-[#1B3028] mb-8">{title}</h3>

      <form className="space-y-6" onSubmit={handleSubmit} noValidate>
        {/* Name & Phone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              name="fullName"
              value={values.fullName}
              onChange={handleChange}
              placeholder="Your name"
              className={inputClass}
            />
            {errors.fullName && <p className={errorClass}>{errors.fullName}</p>}
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              name="phone"
              value={values.phone}
              onChange={handleChange}
              placeholder="+91"
              className={inputClass}
            />
            {errors.phone && <p className={errorClass}>{errors.phone}</p>}
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            placeholder="your@email.com"
            className={inputClass}
          />
          {errors.email && <p className={errorClass}>{errors.email}</p>}
        </div>

        {/* Venue & Event Type */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">
              Venue *
            </label>
            <select
              name="venue"
              value={values.venue}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="">Select Venue</option>
              {venues.map((v) => (
                <option key={v.id} value={v.name}>
                  {v.name}
                </option>
              ))}
            </select>
            {errors.venue && <p className={errorClass}>{errors.venue}</p>}
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">
              Event Type *
            </label>
            <select
              name="eventType"
              value={values.eventType}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="">Select Event</option>
              {EVENT_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            {errors.eventType && <p className={errorClass}>{errors.eventType}</p>}
          </div>
        </div>

        {/* Guests & Budget */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">
              Expected Guests *
            </label>
            <select
              name="guests"
              value={values.guests}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="">Select Guests</option>
              {GUEST_OPTIONS.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
            {errors.guests && <p className={errorClass}>{errors.guests}</p>}
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">
              Budget *
            </label>
            <select
              name="budget"
              value={values.budget}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="">Select Budget</option>
              {BUDGET_OPTIONS.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
            {errors.budget && <p className={errorClass}>{errors.budget}</p>}
          </div>
        </div>

        {/* Event Date */}
        <div>
          <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">
            Event Date *
          </label>
          <input
            type="date"
            name="eventDate"
            value={values.eventDate}
            onChange={handleChange}
            className={inputClass}
          />
          {errors.eventDate && <p className={errorClass}>{errors.eventDate}</p>}
        </div>

        {/* Message */}
        <div>
          <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">
            Tell Us About Your Event
          </label>
          <textarea
            rows="4"
            name="message"
            value={values.message}
            onChange={handleChange}
            placeholder="Share your ideas, requirements or preferences..."
            className={inputClass + " resize-none"}
          />
        </div>

        {status === "error" && (
          <p className="text-red-500 text-sm">{submitError}</p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={status === "submitting"}
          className="w-full bg-[#1B3028] text-white py-4 uppercase tracking-[3px] text-xs hover:bg-[#C6A56B] hover:text-[#1B3028] transition duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === "submitting" ? "Submitting..." : "Submit Enquiry"}
        </button>
      </form>
    </div>
  );
}

export default BookingForm;
