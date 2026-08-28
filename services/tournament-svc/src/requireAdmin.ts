import { SupabaseClient } from '@supabase/supabase-js';

export class HttpError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

/**
 * Ported from utils/auth.ts's checkRole(['admin', 'super_admin']). The
 * monolith resolved identity from the SSR cookie session; this service is
 * stateless, so the caller's access token is validated explicitly.
 */
export async function requireAdmin(supabase: SupabaseClient, accessToken?: string) {
  if (!accessToken) {
    throw new HttpError(401, 'Unauthorized: Authentication required');
  }

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser(accessToken);

  if (authError || !user) {
    throw new HttpError(401, 'Unauthorized: Authentication required');
  }

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profileError || !profile) {
    throw new HttpError(401, 'Unauthorized: User profile not found');
  }

  const userRole = profile.role as string;
  const allowedRoles = ['admin', 'super_admin'];

  if (!allowedRoles.includes(userRole)) {
    throw new HttpError(
      403,
      `Forbidden: Role '${userRole}' does not have permission. Required: [${allowedRoles.join(', ')}]`,
    );
  }

  return { user, role: userRole };
}
