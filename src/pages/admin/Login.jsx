import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase, isSupabaseConfigured } from "../../lib/supabase";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  if (!isSupabaseConfigured()) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F7F4ED] px-6">
        <p className="text-gray-500">Supabase not configured. Set env vars.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F4ED] flex items-center justify-center px-6">
      <div className="bg-white border border-[#E8E3D9] shadow-sm p-8 md:p-12 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif text-[#1B3028]">
            Venue<span className="text-[#C6A56B]">Book</span>
          </h1>
          <p className="text-xs tracking-[4px] uppercase text-gray-400 mt-2">
            Admin Login
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-b border-gray-300 py-3 outline-none focus:border-[#C6A56B] transition"
              required
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-b border-gray-300 py-3 outline-none focus:border-[#C6A56B] transition"
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1B3028] text-white py-4 uppercase tracking-[3px] text-xs hover:bg-[#C6A56B] hover:text-[#1B3028] transition disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
