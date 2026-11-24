import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase, isSupabaseConfigured } from "../lib/supabase";

function ProtectedRoute({ children }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(isSupabaseConfigured());

  useEffect(() => {
    if (!isSupabaseConfigured()) return;
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F7F4ED]">
        <div className="text-[#1B3028] font-serif text-xl">Loading...</div>
      </div>
    );
  }

  if (!isSupabaseConfigured()) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F7F4ED] px-6">
        <div className="max-w-md text-center">
          <h2 className="text-2xl font-serif text-[#1B3028] mb-3">
            Supabase not configured
          </h2>
          <p className="text-gray-500">
            Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env.local.
          </p>
        </div>
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
