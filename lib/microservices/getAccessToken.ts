import { createClient } from '@/utils/supabase/server';

/** Shared by every *ServiceClient.ts — this lives in the monolith, not a service, so sharing it is fine. */
export async function getAccessToken(): Promise<string | undefined> {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return session?.access_token;
}
