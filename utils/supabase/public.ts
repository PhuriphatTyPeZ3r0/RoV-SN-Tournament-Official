import { createClient as createSupabaseClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder';

// Create a cookie-free, header-free public client for Server Components
// that can be statically rendered and cached by ISR.
export const publicClient = createSupabaseClient(url, key, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  }
});
