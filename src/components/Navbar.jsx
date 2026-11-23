import { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Venues", to: "/venues" },
  { label: "Gallery", to: "/gallery" },
  { label: "Celebrations", to: "/#packages" },
  { label: "About Us", to: "/#amenities" },
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (to) => {
    setMenuOpen(false);
    if (to.includes("#")) {
      const hash = to.split("#")[1];
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  const isActive = (to) => {
    const path = to.split("#")[0] || "/";
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const solid = !isHome || scrolled;
  const navBase = solid
    ? "sticky top-0 left-0 w-full z-50 px-6 md:px-12 py-5 bg-[#1B3028]/95 backdrop-blur-md shadow-lg transition-all duration-300"
    : "absolute top-0 left-0 w-full z-50 px-6 md:px-12 py-6 transition-all duration-300";

  return (
    <nav className={navBase}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-white">
          <h1 className="text-2xl md:text-3xl font-serif tracking-wide">
            Venue<span className="text-[#C6A56B]">Book</span>
          </h1>
          <p className="text-[9px] tracking-[4px] uppercase mt-1 text-white/80">
            Moments made timeless
          </p>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-10 text-sm text-white/90">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              to={link.to}
              onClick={() => handleNavClick(link.to)}
              className={`hover:text-[#C6A56B] transition duration-300 ${
                isActive(link.to) ? "text-[#C6A56B]" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <Link
          to="/book"
          className="hidden md:flex items-center gap-2 border border-[#C6A56B] px-6 py-3 text-sm text-white hover:bg-[#C6A56B] hover:text-[#1B3028] transition duration-300"
        >
          Enquire Now
          <ArrowUpRight size={16} />
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="md:hidden mt-5 bg-[#1B3028] p-6 space-y-5 border-t border-white/10">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              to={link.to}
              onClick={() => handleNavClick(link.to)}
              className={`block hover:text-[#C6A56B] ${
                isActive(link.to) ? "text-[#C6A56B]" : "text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}

          <Link
            to="/book"
            onClick={() => setMenuOpen(false)}
            className="block border border-[#C6A56B] text-[#C6A56B] text-center py-3"
          >
            Enquire Now
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
