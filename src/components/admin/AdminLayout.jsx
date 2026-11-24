import { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, Inbox, Images, Building2, LogOut, Menu, X } from "lucide-react";
import { supabase } from "../../lib/supabase";

const navItems = [
  { label: "Dashboard", to: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Bookings", to: "/admin/bookings", icon: Inbox },
  { label: "Gallery", to: "/admin/gallery", icon: Images },
  { label: "Venues", to: "/admin/venues", icon: Building2 },
];

function AdminLayout() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-[#F7F4ED] text-[#1B3028] flex">
      {/* Sidebar */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-40 w-64 bg-[#1B3028] text-white transform transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="p-6 border-b border-white/10">
          <h1 className="text-2xl font-serif tracking-wide">
            Venue<span className="text-[#C6A56B]">Book</span>
          </h1>
          <p className="text-[9px] tracking-[4px] uppercase mt-1 text-white/70">
            Admin Panel
          </p>
        </div>
        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = location.pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 text-sm transition ${
                  active
                    ? "bg-[#C6A56B] text-[#1B3028]"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 mt-auto">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 text-sm text-white/80 hover:text-white w-full"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="md:hidden bg-[#1B3028] text-white px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-serif">
            Venue<span className="text-[#C6A56B]">Book</span> Admin
          </h1>
          <button onClick={() => setOpen(!open)} aria-label="Toggle menu">
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </header>
        <main className="flex-1 p-6 md:p-10 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
