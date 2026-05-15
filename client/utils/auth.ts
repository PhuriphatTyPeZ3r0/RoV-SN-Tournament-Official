import { createClient } from '@/utils/supabase/server';

/**
 * Enterprise-grade Role Check for Server Actions
 * Inspired by E-CMIS patterns
 */
export async function checkRole(allowedRoles: string[]) {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error('Unauthorized: Authentication required');
  }

  // Fetch role from profile (using the secure function or direct query)
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profileError || !profile) {
    throw new Error('Unauthorized: User profile not found');
  }

  const userRole = profile.role as string;

  if (!allowedRoles.includes(userRole)) {
    throw new Error(`Forbidden: Role '${userRole}' does not have permission. Required: [${allowedRoles.join(', ')}]`);
  }

  return { user, role: userRole };
}
