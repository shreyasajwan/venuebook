import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

function Dashboard() {
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    confirmed: 0,
    gallery: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const [bookingsRes, galleryRes] = await Promise.all([
        supabase.from("bookings").select("status"),
        supabase.from("gallery_images").select("id", { count: "exact", head: true }),
      ]);
      const bookings = bookingsRes.data || [];
      setStats({
        total: bookings.length,
        pending: bookings.filter((b) => b.status === "Pending").length,
        confirmed: bookings.filter((b) => b.status === "Confirmed").length,
        gallery: galleryRes.count || 0,
      });
      setLoading(false);
    };
    load();
  }, []);

  const cards = [
    { label: "Total Bookings", value: stats.total },
    { label: "Pending Enquiries", value: stats.pending },
    { label: "Confirmed Bookings", value: stats.confirmed },
    { label: "Gallery Images", value: stats.gallery },
  ];

  return (
    <div>
      <h2 className="text-3xl font-serif text-[#1B3028] mb-8">Dashboard Overview</h2>
      {loading ? (
        <p className="text-gray-500">Loading stats...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((c) => (
            <div
              key={c.label}
              className="bg-white border border-[#E8E3D9] p-6 shadow-sm"
            >
              <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">
                {c.label}
              </p>
              <p className="text-4xl font-serif text-[#1B3028]">{c.value}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
