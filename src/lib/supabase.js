import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = () =>
  Boolean(
    supabaseUrl &&
      supabaseAnonKey &&
      !String(supabaseUrl).includes("your-project") &&
      !String(supabaseAnonKey).includes("your-anon-public-key")
  );

// Create the client only when credentials exist, so the app never crashes
// on load when env vars are missing (e.g. before Vercel is configured).
export const supabase = isSupabaseConfigured()
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: { persistSession: true, autoRefreshToken: true },
    })
  : null;

// Safe helper for components to test the connection.
export async function testSupabaseConnection() {
  if (!isSupabaseConfigured() || !supabase) {
    return { ok: false, error: "Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY." };
  }
  try {
    const { error } = await supabase.from("gallery_images").select("id", { count: "exact", head: true });
    if (error) return { ok: false, error: error.message };
    return { ok: true, error: null };
  } catch (err) {
    return { ok: false, error: err?.message || "Unknown error" };
  }
}