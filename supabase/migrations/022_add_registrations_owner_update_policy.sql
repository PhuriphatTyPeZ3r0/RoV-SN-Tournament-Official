-- ============================================================
-- 022_add_registrations_owner_update_policy.sql
-- Add UPDATE policy for registrations table to allow owner to edit their own registrations
-- ============================================================

CREATE POLICY "registrations_owner_update" ON public.registrations
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

COMMENT ON POLICY "registrations_owner_update" ON public.registrations IS 'Allow users to update/modify their own tournament registration data';
