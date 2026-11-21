import { useState } from "react";
import {
  Menu,
  X,
  ArrowUpRight,
  Check,
  Sparkles,
  Phone,
Mail,
} from "lucide-react";

import { motion } from "framer-motion";
import VenueCard from "./components/VenueCard";
function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    "Home",
    "Venues",
    "Celebrations",
    "Gallery",
    "About Us",
  ];

  return (
    <div className="min-h-screen bg-[#F7F4ED] text-[#1B3028]">

      {/* NAVBAR */}
      <nav className="absolute top-0 left-0 w-full z-50 px-6 md:px-12 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">

          {/* Logo */}
          <div className="text-white">
            <h1 className="text-2xl md:text-3xl font-serif tracking-wide">
              Venue<span className="text-[#C6A56B]">Book</span>
            </h1>
            <p className="text-[9px] tracking-[4px] uppercase mt-1 text-white/70">
              Moments made timeless
            </p>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10 text-sm text-white/90">
            {navLinks.map((link, index) => (
              <a
                key={index}
                href="#"
                className="hover:text-[#C6A56B] transition duration-300"
              >
                {link}
              </a>
            ))}
          </div>

          {/* CTA */}
          <a
            href="#booking"
            className="hidden md:flex items-center gap-2 border border-[#C6A56B] px-6 py-3 text-sm text-white hover:bg-[#C6A56B] hover:text-[#1B3028] transition duration-300"
          >
            Enquire Now
            <ArrowUpRight size={16} />
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-white"
          >
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>

        </div>

        {/* Mobile Navigation */}
        {menuOpen && (
          <div className="md:hidden mt-5 bg-[#1B3028] p-6 space-y-5">
            {navLinks.map((link, index) => (
              <a
                key={index}
                href="#"
                onClick={() => setMenuOpen(false)}
                className="block text-white hover:text-[#C6A56B]"
              >
                {link}
              </a>
            ))}

            <a
              href="#booking"
              className="block border border-[#C6A56B] text-[#C6A56B] text-center py-3"
            >
              Enquire Now
            </a>
          </div>
        )}
      </nav>

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2000&q=90')",
          }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center px-6 max-w-5xl mx-auto"
        >
          <p className="text-[#D8BC8B] uppercase tracking-[5px] text-xs md:text-sm mb-8">
            A destination for unforgettable celebrations
          </p>

          <h1 className="text-white font-serif text-5xl md:text-7xl lg:text-8xl leading-tight font-light">
            Where Dreams
            <br />
            <span className="italic text-[#E3C995]">
              Become Memories
            </span>
          </h1>

          <p className="text-white/80 max-w-xl mx-auto mt-8 text-sm md:text-base leading-8">
            Celebrate life's most beautiful moments in a setting
            designed to make every memory timeless.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">

            <a
              href="#venues"
              className="bg-[#C6A56B] text-[#1B3028] px-8 py-4 text-sm tracking-wide hover:bg-[#D7BB89] transition flex items-center gap-3"
            >
              Explore Our Venues
              <ArrowUpRight size={16} />
            </a>

            <a
              href="#booking"
              className="border border-white/70 text-white px-8 py-4 text-sm tracking-wide hover:bg-white hover:text-[#1B3028] transition"
            >
              Plan Your Celebration
            </a>

          </div>
        </motion.div>

        {/* Bottom Information */}
        <div className="absolute bottom-10 left-6 md:left-12 text-white/70 text-xs tracking-widest uppercase">
          Weddings · Events · Celebrations
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 right-6 md:right-12 flex flex-col items-center gap-3 text-white/70">
          <span className="text-[10px] tracking-[3px] uppercase">
            Scroll
          </span>
          <div className="w-px h-12 bg-[#C6A56B]" />
        </div>

      </section>
{/* OUR VENUES SECTION */}
<section
  id="venues"
  className="py-24 md:py-32 px-6 md:px-12 bg-[#F7F4ED]"
>
<div className="text-center mb-16">
    {/* Section Header */}
    <div className="text-center mb-16">

      <p className="text-[#C6A56B] uppercase tracking-[4px] text-xs mb-5">
        Discover Our Spaces
      </p>

      <h2 className="text-4xl md:text-6xl font-serif text-[#1B3028]">
        Find Your Perfect
        <span className="italic"> Venue</span>
      </h2>

      <p className="text-gray-500 max-w-xl mx-auto mt-6 leading-7">
        From intimate gatherings to grand celebrations,
        discover spaces where your most beautiful moments unfold.
      </p>

    </div>

    {/* Venue Cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch justify-center">

      <VenueCard
        image="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1000&q=85"
        name="The Grand Garden"
        location="Indore, Madhya Pradesh"
        capacity="1,000"
        type="Outdoor"
        price="₹1,50,000"
      />

      <VenueCard
        image="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1000&q=85"
        name="Royal Celebration"
        location="Indore, Madhya Pradesh"
        capacity="500"
        type="Luxury Banquet"
        price="₹85,000"
      />

      <VenueCard
        image="https://images.unsplash.com/photo-1478146896981-b80fe463b330?auto=format&fit=crop&w=1000&q=85"
        name="Garden Paradise"
        location="Indore, Madhya Pradesh"
        capacity="750"
        type="Garden Wedding"
        price="₹1,20,000"
      />

    </div>

    {/* View All Button */}
    <div className="text-center mt-14">

      <button className="border border-[#1B3028] text-[#1B3028] px-10 py-4 text-sm uppercase tracking-widest hover:bg-[#1B3028] hover:text-white transition duration-300">
        Explore All Venues
      </button>

    </div>

  </div>
</section>


{/* WEDDING PACKAGES SECTION */}
<section
  id="packages"
  className="py-24 md:py-32 px-6 md:px-12 bg-[#1B3028]"
>
<div className="text-center mb-16">
    {/* Header */}
    <div className="text-center mb-16">

      <p className="text-[#C6A56B] uppercase tracking-[4px] text-xs mb-5">
        Curated For Your Celebration
      </p>

      <h2 className="text-4xl md:text-6xl font-serif text-white">
        Celebrate In
        <span className="italic text-[#C6A56B]"> Style</span>
      </h2>

      <p className="text-white/60 max-w-xl mx-auto mt-6 leading-7">
        Thoughtfully designed packages to make your special
        day effortless, elegant and unforgettable.
      </p>

    </div>

    {/* Packages */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">

      {/* SILVER PACKAGE */}
      <div className="bg-[#F7F4ED] p-8 md:p-10 flex flex-col">

        <p className="text-xs tracking-[3px] uppercase text-gray-500">
          Essential
        </p>

        <h3 className="text-3xl font-serif mt-4 text-[#1B3028]">
          Silver
        </h3>

        <p className="text-gray-500 text-sm mt-3 leading-6">
          Everything you need for a beautiful celebration.
        </p>

        <div className="mt-8 mb-8">

          <span className="text-4xl font-serif text-[#1B3028]">
            ₹1.5L
          </span>

          <span className="text-gray-500 text-sm ml-2">
            / event
          </span>

        </div>

        <div className="border-t border-gray-200 pt-6 space-y-4 flex-1">

          {[
            "Venue for 8 hours",
            "Basic decoration",
            "Standard lighting",
            "Guest seating",
            "Parking facility",
            "Event coordinator",
          ].map((feature, index) => (

            <div key={index} className="flex gap-3 items-start">

              <Check
                size={17}
                className="text-[#C6A56B] mt-1 shrink-0"
              />

              <span className="text-sm text-gray-600">
                {feature}
              </span>

            </div>

          ))}

        </div>

        <a
          href="#booking"
          className="mt-10 border border-[#1B3028] text-[#1B3028] text-center py-4 text-sm uppercase tracking-widest hover:bg-[#1B3028] hover:text-white transition"
        >
          Choose Silver
        </a>

      </div>

      {/* GOLD PACKAGE */}
      <div className="bg-[#C6A56B] p-8 md:p-10 flex flex-col relative md:-translate-y-4 shadow-2xl">

        {/* Popular Badge */}
        <div className="absolute top-0 right-0 bg-[#1B3028] text-white px-5 py-2 text-[10px] uppercase tracking-[2px]">
          Most Popular
        </div>

        <Sparkles size={24} className="text-[#1B3028] mb-5" />

        <p className="text-xs tracking-[3px] uppercase text-[#1B3028]/70">
          Signature
        </p>

        <h3 className="text-3xl font-serif mt-4 text-[#1B3028]">
          Gold
        </h3>

        <p className="text-[#1B3028]/70 text-sm mt-3 leading-6">
          An elevated experience for unforgettable moments.
        </p>

        <div className="mt-8 mb-8">

          <span className="text-4xl font-serif text-[#1B3028]">
            ₹2.5L
          </span>

          <span className="text-[#1B3028]/70 text-sm ml-2">
            / event
          </span>

        </div>

        <div className="border-t border-[#1B3028]/20 pt-6 space-y-4 flex-1">

          {[
            "Venue for 12 hours",
            "Premium floral decoration",
            "Designer lighting",
            "Premium guest seating",
            "Dedicated parking",
            "Event manager",
            "Bridal room access",
            "Welcome drinks",
          ].map((feature, index) => (

            <div key={index} className="flex gap-3 items-start">

              <Check
                size={17}
                className="text-[#1B3028] mt-1 shrink-0"
              />

              <span className="text-sm text-[#1B3028]">
                {feature}
              </span>

            </div>

          ))}

        </div>

        <a
          href="#booking"
          className="mt-10 bg-[#1B3028] text-white text-center py-4 text-sm uppercase tracking-widest hover:bg-[#294638] transition"
        >
          Choose Gold
        </a>

      </div>

      {/* PLATINUM PACKAGE */}
      <div className="bg-[#F7F4ED] p-8 md:p-10 flex flex-col">

        <p className="text-xs tracking-[3px] uppercase text-gray-500">
          Luxury
        </p>

        <h3 className="text-3xl font-serif mt-4 text-[#1B3028]">
          Platinum
        </h3>

        <p className="text-gray-500 text-sm mt-3 leading-6">
          A grand celebration with exceptional attention to detail.
        </p>

        <div className="mt-8 mb-8">

          <span className="text-4xl font-serif text-[#1B3028]">
            ₹4.5L
          </span>

          <span className="text-gray-500 text-sm ml-2">
            / event
          </span>

        </div>

        <div className="border-t border-gray-200 pt-6 space-y-4 flex-1">

          {[
            "Exclusive venue access",
            "Luxury floral decoration",
            "Custom lighting design",
            "VIP guest seating",
            "Valet parking",
            "Dedicated event team",
            "Luxury bridal suite",
            "Premium catering setup",
            "Welcome experience",
            "Custom event planning",
          ].map((feature, index) => (

            <div key={index} className="flex gap-3 items-start">

              <Check
                size={17}
                className="text-[#C6A56B] mt-1 shrink-0"
              />

              <span className="text-sm text-gray-600">
                {feature}
              </span>

            </div>

          ))}

        </div>

        <a
          href="#booking"
          className="mt-10 border border-[#1B3028] text-[#1B3028] text-center py-4 text-sm uppercase tracking-widest hover:bg-[#1B3028] hover:text-white transition"
        >
          Choose Platinum
        </a>

      </div>

    </div>

    {/* Bottom Text */}
    <p className="text-center text-white/40 text-xs mt-10">
      All packages are customizable according to your celebration.
    </p>

  </div>
</section>


{/* GALLERY SECTION */}
<section
  id="gallery"
  className="bg-[#F7F4ED] py-24 md:py-32 px-6 md:px-12"
>
<div className="text-center mb-16">
    {/* Header */}
    <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-12">

      <div>
        <p className="text-[#C6A56B] uppercase tracking-[4px] text-xs mb-5">
          A Glimpse Of Magic
        </p>

        <h2 className="text-4xl md:text-6xl font-serif text-[#1B3028]">
          Moments That
          <span className="italic"> Stay</span>
        </h2>
      </div>

      <p className="text-gray-500 max-w-md leading-7 text-sm">
        Every corner tells a story. Explore the beauty,
        elegance and unforgettable atmosphere of our celebrations.
      </p>

    </div>

    {/* Gallery Grid */}
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">

      {/* Large Image */}
      <div className="md:col-span-7 relative group overflow-hidden h-[400px] md:h-[550px]">

        <img
          src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1400&q=90"
          alt="Beautiful wedding celebration"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition duration-500" />

        <div className="absolute bottom-8 left-8 text-white">
          <p className="text-xs tracking-[3px] uppercase text-white/70">
            Wedding Celebrations
          </p>

          <h3 className="text-3xl font-serif mt-2">
            A Day To Remember
          </h3>
        </div>

      </div>

      {/* Right Column */}
      <div className="md:col-span-5 grid grid-cols-1 gap-4">

        {/* Image 2 */}
        <div className="relative group overflow-hidden h-[260px] md:h-[267px]">

          <img
            src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1000&q=90"
            alt="Elegant wedding decor"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition" />

          <div className="absolute bottom-6 left-6 text-white">
            <h3 className="text-2xl font-serif">
              Elegant Details
            </h3>
          </div>

        </div>

        {/* Image 3 */}
        <div className="relative group overflow-hidden h-[260px] md:h-[267px]">

          <img
            src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1000&q=90"
            alt="Outdoor wedding venue"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition" />

          <div className="absolute bottom-6 left-6 text-white">
            <h3 className="text-2xl font-serif">
              Magical Evenings
            </h3>
          </div>

        </div>

      </div>

    </div>

    {/* Bottom Gallery Images */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">

      {[
        {
          image:
            "https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?auto=format&fit=crop&w=900&q=85",
          title: "Floral Dreams",
        },
        {
          image:
            "https://images.unsplash.com/photo-1507504031003-b417219a0fde?auto=format&fit=crop&w=900&q=85",
          title: "The Celebration",
        },
        {
          image:
            "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=900&q=85",
          title: "Beautiful Moments",
        },
      ].map((item, index) => (

        <div
          key={index}
          className="relative group overflow-hidden h-[280px]"
        >

          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />

          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition" />

          <div className="absolute bottom-6 left-6 text-white">
            <h3 className="text-2xl font-serif">
              {item.title}
            </h3>
          </div>

        </div>

      ))}

    </div>

    {/* Gallery Button */}
    <div className="text-center mt-12">

      <button className="border border-[#1B3028] text-[#1B3028] px-10 py-4 text-xs uppercase tracking-[3px] hover:bg-[#1B3028] hover:text-white transition duration-300">
        View Full Gallery
      </button>

    </div>

  </div>
</section>


{/* AMENITIES SECTION */}
<section
  id="amenities"
  className="bg-[#1B3028] py-24 md:py-32 px-6 md:px-12"
>
<div className="text-center mb-16">
    {/* Header */}
    <div className="text-center mb-16">

      <p className="text-[#C6A56B] uppercase tracking-[4px] text-xs mb-5">
        Everything You Need
      </p>

      <h2 className="text-4xl md:text-6xl font-serif text-white">
        Crafted For
        <span className="italic text-[#C6A56B]"> Perfection</span>
      </h2>

      <p className="text-white/60 max-w-xl mx-auto mt-6 leading-7">
        Every detail is thoughtfully designed to ensure
        your celebration is effortless, beautiful and memorable.
      </p>

    </div>

    {/* Amenities Grid */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10">

      {[
        {
          icon: "🏛️",
          title: "Grand Venues",
          description:
            "Beautifully designed spaces for celebrations of every scale.",
        },
        {
          icon: "🛏️",
          title: "Luxury Rooms",
          description:
            "Comfortable accommodation for you and your guests.",
        },
        {
          icon: "🍽️",
          title: "Catering",
          description:
            "Delicious dining experiences curated for your special day.",
        },
        {
          icon: "✨",
          title: "Decoration",
          description:
            "Elegant styling and beautiful floral arrangements.",
        },
        {
          icon: "🚗",
          title: "Ample Parking",
          description:
            "Convenient and secure parking for your guests.",
        },
        {
          icon: "🤵",
          title: "Event Planning",
          description:
            "A dedicated team to bring your celebration to life.",
        },
        {
          icon: "🌿",
          title: "Garden Spaces",
          description:
            "Beautiful outdoor settings surrounded by nature.",
        },
        {
          icon: "💎",
          title: "Bridal Suite",
          description:
            "A private and elegant space for special preparations.",
        },
      ].map((amenity, index) => (

        <div
          key={index}
          className="bg-[#1B3028] p-8 md:p-10 group hover:bg-[#243D32] transition duration-500"
        >

          {/* Icon */}
          <div className="text-4xl mb-7 transition-transform duration-500 group-hover:-translate-y-2">
            {amenity.icon}
          </div>

          {/* Title */}
          <h3 className="text-xl md:text-2xl font-serif text-white mb-4">
            {amenity.title}
          </h3>

          {/* Description */}
          <p className="text-white/50 text-sm leading-7">
            {amenity.description}
          </p>

          {/* Decorative Line */}
          <div className="w-10 h-px bg-[#C6A56B] mt-7 group-hover:w-16 transition-all duration-500" />

        </div>

      ))}

    </div>

  </div>
</section>

{/* TESTIMONIALS SECTION */}
<section
  id="testimonials"
  className="bg-[#F7F4ED] py-24 md:py-32 px-6 md:px-12"
>
<div className="text-center mb-16">
    {/* Header */}
    <div className="text-center mb-16">

      <p className="text-[#C6A56B] uppercase tracking-[4px] text-xs mb-5">
        Words From Our Couples
      </p>

      <h2 className="text-4xl md:text-6xl font-serif text-[#1B3028]">
        Love Stories
        <span className="italic"> We've Hosted</span>
      </h2>

      <p className="text-gray-500 max-w-xl mx-auto mt-6 leading-7">
        The greatest reward is being part of the moments
        our guests cherish forever.
      </p>

    </div>

    {/* Testimonials */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

      {[
        {
          name: "Priya & Rahul",
          event: "Wedding Celebration",
          review:
            "Our wedding was everything we had dreamed of and more. The venue was breathtaking, the team was incredibly supportive, and every detail was perfect.",
        },
        {
          name: "Ananya & Rohan",
          event: "Reception",
          review:
            "From the beautiful decor to the seamless event management, everything was exceptional. Our guests are still talking about how magical the evening was.",
        },
        {
          name: "Meera & Arjun",
          event: "Destination Wedding",
          review:
            "The perfect place to celebrate our special day. The ambience, hospitality and attention to detail made our celebration truly unforgettable.",
        },
      ].map((testimonial, index) => (

        <div
          key={index}
          className="bg-white p-8 md:p-10 border border-[#E8E3D9] hover:-translate-y-2 transition duration-500"
        >

          {/* Stars */}
          <div className="flex gap-1 text-[#C6A56B] mb-7">
            {[1, 2, 3, 4, 5].map((star) => (
              <span key={star}>★</span>
            ))}
          </div>

          {/* Quote */}
          <div className="text-[#C6A56B] text-5xl font-serif leading-none mb-4">
            “
          </div>

          <p className="text-gray-600 text-sm leading-8">
            {testimonial.review}
          </p>

          {/* Client */}
          <div className="border-t border-gray-200 mt-8 pt-6">

            <h3 className="text-xl font-serif text-[#1B3028]">
              {testimonial.name}
            </h3>

            <p className="text-xs uppercase tracking-[2px] text-gray-400 mt-2">
              {testimonial.event}
            </p>

          </div>

        </div>

      ))}

    </div>

  </div>
</section>

{/* BOOKING ENQUIRY SECTION */}
<section
  id="booking"
  className="bg-[#F7F4ED] py-24 md:py-32 px-6 md:px-12"
>
  <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">

    {/* LEFT CONTENT */}
    <div>
      <p className="text-[#C6A56B] uppercase tracking-[4px] text-xs mb-5">
        Let's Plan Your Celebration
      </p>

      <h2 className="text-4xl md:text-6xl font-serif text-[#1B3028] leading-tight">
        Your Dream Event
        <span className="italic block">Starts Here</span>
      </h2>

      <p className="text-gray-500 mt-6 leading-8 max-w-lg">
        Tell us a little about your celebration. Our team will help
        you create an unforgettable experience tailored to your vision.
      </p>

      <div className="mt-10 space-y-6">

        <div className="flex gap-4 items-center">
          <div className="w-12 h-12 bg-[#1B3028] flex items-center justify-center text-[#C6A56B]">
            <Phone size={20} />
          </div>

          <div>
            <p className="text-xs text-gray-400 uppercase tracking-widest">
              Call Us
            </p>
            <p className="text-[#1B3028] mt-1">
              +91 98765 43210
            </p>
          </div>
        </div>

        <div className="flex gap-4 items-center">
          <div className="w-12 h-12 bg-[#1B3028] flex items-center justify-center text-[#C6A56B]">
            <Mail size={20} />
          </div>

          <div>
            <p className="text-xs text-gray-400 uppercase tracking-widest">
              Email Us
            </p>
            <p className="text-[#1B3028] mt-1">
              hello@venuebook.com
            </p>
          </div>
        </div>

      </div>
    </div>

    {/* FORM */}
    <div className="bg-white p-8 md:p-12 shadow-sm border border-[#E8E3D9]">

      <h3 className="text-2xl font-serif text-[#1B3028] mb-8">
        Enquire About Your Event
      </h3>

      <form className="space-y-6">

        {/* Name & Phone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div>
            <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">
              Full Name
            </label>

            <input
              type="text"
              placeholder="Your name"
              className="w-full border-b border-gray-300 py-3 outline-none focus:border-[#C6A56B] transition"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">
              Phone Number
            </label>

            <input
              type="tel"
              placeholder="+91"
              className="w-full border-b border-gray-300 py-3 outline-none focus:border-[#C6A56B] transition"
            />
          </div>

        </div>

        {/* Email */}
        <div>
          <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">
            Email Address
          </label>

          <input
            type="email"
            placeholder="your@email.com"
            className="w-full border-b border-gray-300 py-3 outline-none focus:border-[#C6A56B] transition"
          />
        </div>

        {/* Event Type & Guests */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div>
            <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">
              Event Type
            </label>

            <select
              className="w-full border-b border-gray-300 py-3 outline-none focus:border-[#C6A56B] bg-white"
            >
              <option value="">Select Event</option>
              <option>Wedding</option>
              <option>Reception</option>
              <option>Engagement</option>
              <option>Birthday</option>
              <option>Corporate Event</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">
              Expected Guests
            </label>

            <select
              className="w-full border-b border-gray-300 py-3 outline-none focus:border-[#C6A56B] bg-white"
            >
              <option value="">Select Guests</option>
              <option>50 - 100</option>
              <option>100 - 250</option>
              <option>250 - 500</option>
              <option>500 - 1000</option>
              <option>1000+</option>
            </select>
          </div>

        </div>

        {/* Event Date */}
        <div>
          <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">
            Event Date
          </label>

          <input
            type="date"
            className="w-full border-b border-gray-300 py-3 outline-none focus:border-[#C6A56B] transition"
          />
        </div>

        {/* Message */}
        <div>
          <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">
            Tell Us About Your Event
          </label>

          <textarea
            rows="4"
            placeholder="Share your ideas, requirements or preferences..."
            className="w-full border-b border-gray-300 py-3 outline-none focus:border-[#C6A56B] transition resize-none"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-[#1B3028] text-white py-4 uppercase tracking-[3px] text-xs hover:bg-[#C6A56B] hover:text-[#1B3028] transition duration-300"
        >
          Submit Enquiry
        </button>

      </form>

    </div>

  </div>
</section>

    </div>
  );
}

export default App;