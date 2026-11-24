import { useEffect, useState, useMemo } from "react";
import { supabase } from "../../lib/supabase";

const STATUSES = ["Pending", "Confirmed", "Cancelled"];

function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [error, setError] = useState("");

  const load = async () => {
    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) setError(error.message);
    else {
      setError("");
      setBookings(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) setError(error.message);
      else {
        setError("");
        setBookings(data || []);
      }
      setLoading(false);
    })();
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return bookings.filter((b) => {
      if (statusFilter !== "All" && b.status !== statusFilter) return false;
      if (!q) return true;
      return (
        (b.customer_name || "").toLowerCase().includes(q) ||
        (b.email || "").toLowerCase().includes(q) ||
        (b.phone || "").toLowerCase().includes(q) ||
        (b.event_type || "").toLowerCase().includes(q)
      );
    });
  }, [bookings, query, statusFilter]);

  const updateStatus = async (id, status) => {
    const { error } = await supabase
      .from("bookings")
      .update({ status })
      .eq("id", id);
    if (error) {
      setError(error.message);
      return;
    }
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status } : b))
    );
  };

  return (
    <div>
      <h2 className="text-3xl font-serif text-[#1B3028] mb-6">Bookings</h2>

      <div className="bg-white border border-[#E8E3D9] p-4 mb-6 flex flex-col md:flex-row gap-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, email, phone, event..."
          className="flex-1 border border-gray-200 py-2 px-3 outline-none focus:border-[#C6A56B]"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-gray-200 py-2 px-3 outline-none focus:border-[#C6A56B] bg-white"
        >
          <option value="All">All Status</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <button
          onClick={() => {
            setLoading(true);
            load();
          }}
          className="border border-[#1B3028] text-[#1B3028] px-6 py-2 text-xs uppercase tracking-widest hover:bg-[#1B3028] hover:text-white transition"
        >
          Refresh
        </button>
      </div>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      {loading ? (
        <p className="text-gray-500">Loading bookings...</p>
      ) : filtered.length === 0 ? (
        <div className="bg-white border border-[#E8E3D9] p-10 text-center text-gray-500">
          No bookings found.
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((b) => (
            <div
              key={b.id}
              className="bg-white border border-[#E8E3D9] p-6 shadow-sm"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-xl font-serif text-[#1B3028]">
                    {b.customer_name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {b.email} • {b.phone}
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4 text-sm">
                    <div>
                      <p className="text-xs uppercase tracking-widest text-gray-400">
                        Wedding Date
                      </p>
                      <p>{b.wedding_date}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-widest text-gray-400">
                        Event
                      </p>
                      <p>{b.event_type}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-widest text-gray-400">
                        Guests
                      </p>
                      <p>{b.guest_count}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-widest text-gray-400">
                        Budget
                      </p>
                      <p>{b.budget}</p>
                    </div>
                  </div>
                  {b.message && (
                    <p className="text-sm text-gray-600 mt-4 leading-6">
                      {b.message}
                    </p>
                  )}
                  <p className="text-xs text-gray-400 mt-3">
                    Submitted: {new Date(b.created_at).toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <select
                    value={b.status}
                    onChange={(e) => updateStatus(b.id, e.target.value)}
                    className="border border-gray-200 py-2 px-3 outline-none focus:border-[#C6A56B] bg-white text-sm"
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Bookings;
