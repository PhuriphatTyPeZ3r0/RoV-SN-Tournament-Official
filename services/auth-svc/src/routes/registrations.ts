import { Router } from 'express';
import { action } from '../actionHandler';

const router = Router();

// GET /registrations/pending — getPendingRegistrations (features/auth/student-actions.ts)
router.get(
  '/registrations/pending',
  action(async (supabase) => {
    const { data } = await supabase
      .from('registrations')
      .select('*')
      .order('created_at', { ascending: false });

    if (!data) return [];

    const mapped = await Promise.all(
      data.map(async (reg) => {
        if (reg.verification_doc_url) {
          if (reg.verification_doc_url.startsWith('http')) {
            const publicPrefix = 'verification-docs/';
            const index = reg.verification_doc_url.indexOf(publicPrefix);
            if (index !== -1) {
              const path = reg.verification_doc_url.substring(index + publicPrefix.length);
              const { data: signed } = await supabase.storage
                .from('verification-docs')
                .createSignedUrl(path, 60);
              return { ...reg, verification_doc_url: signed?.signedUrl || reg.verification_doc_url };
            }
          } else {
            const { data: signed } = await supabase.storage
              .from('verification-docs')
              .createSignedUrl(reg.verification_doc_url, 60);
            return { ...reg, verification_doc_url: signed?.signedUrl || null };
          }
        }
        return reg;
      }),
    );

    return mapped;
  }),
);

// PATCH /registrations/:id/status — updateRegistrationStatus (features/auth/student-actions.ts)
router.patch(
  '/registrations/:id/status',
  action(async (supabase, _token, req) => {
    const { id } = req.params;
    const { status, notes } = req.body as { status: 'approved' | 'rejected'; notes: string };

    const { error } = await supabase
      .from('registrations')
      .update({ status, screening_notes: notes })
      .eq('id', id);

    if (error) return { success: false, error: error.message };
    return { success: true };
  }),
);

export default router;
