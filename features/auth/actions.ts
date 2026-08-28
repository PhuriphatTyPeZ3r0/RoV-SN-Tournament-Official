'use server';

import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { authFetch } from '@/lib/microservices/authServiceClient';

/**
 * Auth Server Actions
 *
 * experiment/microservices-k8s: only signOutAction is rewired — see
 * services/README.md for why login/signup/OTP stay direct (httpOnly
 * cookie session, incompatible with a stateless service).
 *
 * Dropped: signInAction, signUpAction, getSessionAction, isAdminAction —
 * confirmed dead (0 callers anywhere in app/components/features/lib/utils)
 * as of this rewrite. Real login goes through
 * features/auth/student-actions.ts's loginStudentAction instead.
 */

export async function signOutAction() {
  const supabase = await createClient();

  // Data-mutation half now goes through auth-svc (resets otp_enabled).
  await authFetch('/session/logout-cleanup', { method: 'POST' });

  // Cookie-clearing half stays local — only the Next.js SSR client's own
  // signOut() can write the Set-Cookie headers that actually end the
  // browser session; a stateless service can't.
  await supabase.auth.signOut();
  revalidatePath('/', 'layout');
  redirect('/login');
}
