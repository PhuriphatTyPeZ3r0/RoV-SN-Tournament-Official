import { createClient, SupabaseClient } from '@supabase/supabase-js';

/** Same trust model as the monolith: anon key only, RLS does the gatekeeping. */
export function getSupabaseClient(accessToken?: string): SupabaseClient {
  const url = process.env.SUPABASE_URL;
  const anonKey = process.env.SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error('Missing SUPABASE_URL or SUPABASE_ANON_KEY env vars');
  }

  return createClient(url, anonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: accessToken
      ? { headers: { Authorization: `Bearer ${accessToken}` } }
      : undefined,
  });
}

/** Pulls "Bearer <token>" out of the Authorization header, if present. */
export function extractAccessToken(authHeader?: string): string | undefined {
  if (!authHeader?.startsWith('Bearer ')) return undefined;
  return authHeader.slice('Bearer '.length).trim() || undefined;
}
