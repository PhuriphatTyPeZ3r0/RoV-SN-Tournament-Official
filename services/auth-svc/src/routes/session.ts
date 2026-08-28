import { Router } from 'express';
import { action } from '../actionHandler';

const router = Router();

/**
 * POST /session/logout-cleanup — the data-mutation half of signOutAction
 * (features/auth/actions.ts): resets profiles.otp_enabled to false.
 *
 * Deliberately NOT ported here: supabase.auth.signOut() and the httpOnly
 * cookie clearing it triggers. supabase-js's signOut() operates on the
 * client's own internal session state (set via signInWithPassword/
 * setSession), not on an arbitrary bearer token passed via headers — this
 * service never establishes that internal state, so it can't safely revoke
 * or clear cookies. The Next.js wrapper still calls its local SSR client's
 * auth.signOut() (which can) after this succeeds, then redirects.
 */
router.post(
  '/session/logout-cleanup',
  action(async (supabase, token) => {
    if (!token) return { success: true };

    const {
      data: { user },
    } = await supabase.auth.getUser(token);

    if (user) {
      await supabase.from('profiles').update({ otp_enabled: false }).eq('id', user.id);
    }

    return { success: true };
  }),
);

export default router;
