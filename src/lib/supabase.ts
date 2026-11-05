import { createClient } from "@supabase/supabase-js";

/**
 * Browser (anon) client - safe to use in client components.
 * Created lazily to avoid build-time env var requirements.
 */
let browserClient: ReturnType<typeof createClient> | null = null;

export function getSupabaseBrowserClient() {
  if (browserClient) return browserClient;
  
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Missing Supabase environment variables. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY."
    );
  }
  
  browserClient = createClient(supabaseUrl, supabaseAnonKey);
  return browserClient;
}

/**
 * Server-side client with service role key for admin operations.
 * Only use in API routes, never expose to the browser.
 */
export function createServerClient() {
  // TypeScript cannot narrow process.env types; runtime check guarantees string
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  
  if (!serviceRoleKey || !supabaseUrl) {
    throw new Error("Missing Supabase environment variables (SUPABASE_SERVICE_ROLE_KEY or NEXT_PUBLIC_SUPABASE_URL).");
  }
  
  return createClient(supabaseUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

export type ContactSubmission = {
  id: string;
  name: string;
  email: string;
  company: string | null;
  project: string | null;
  message: string | null;
  created_at: string;
  ip_hash: string | null;
  user_agent: string | null;
};

// Backward compatibility export
export const supabase = new Proxy({} as ReturnType<typeof createClient>, {
  get(_, prop) {
    return getSupabaseBrowserClient()[prop as keyof ReturnType<typeof createClient>];
  },
});