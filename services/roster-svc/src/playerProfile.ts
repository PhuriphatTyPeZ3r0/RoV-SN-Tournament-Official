import { SupabaseClient } from '@supabase/supabase-js';

/**
 * Ported from features/teams/actions.ts. The monolith relied on the SSR
 * client's cookie-backed session for `supabase.auth.getUser()`; this
 * service is stateless, so the caller's access token is passed explicitly
 * and validated against the Supabase Auth server on every call.
 */
export async function getPlayerProfile(supabase: SupabaseClient, accessToken?: string) {
  if (!accessToken) return null;

  const { data: { user } } = await supabase.auth.getUser(accessToken);
  if (!user) return null;

  const { data: player, error } = await supabase
    .from('players')
    .select('*, profiles(registration_status)')
    .eq('profile_id', user.id)
    .single();

  if (error || !player) return null;
  return player;
}
