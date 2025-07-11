import { createClient, SupabaseClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl) {
  throw new Error("FATAL: NEXT_PUBLIC_SUPABASE_URL environment variable is not defined at runtime!");
}
if (!supabaseAnonKey) {
  throw new Error("FATAL: NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable is not defined at runtime!");
}

// If we've reached here, both URL and Anon Key are present.
export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey);
console.log("Supabase client initialized successfully with URL and Anon Key.");

// Server-side client with service role key
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
let supabaseAdminInstance: SupabaseClient | null = null;

if (supabaseServiceRoleKey) {
  // supabaseUrl is confirmed to be present from checks above
  supabaseAdminInstance = createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
  console.log("Supabase admin client initialized successfully.");
} else {
  console.warn("WARNING: SUPABASE_SERVICE_ROLE_KEY environment variable is not defined. Admin client not initialized. This might be expected for client-side bundles.");
}

export const supabaseAdmin = supabaseAdminInstance;
