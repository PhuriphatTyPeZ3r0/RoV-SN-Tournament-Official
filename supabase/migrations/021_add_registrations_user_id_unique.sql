-- ============================================================
-- 021_add_registrations_user_id_unique.sql
-- Add UNIQUE constraint to registrations(user_id) to support upsert operations
-- ============================================================

-- Add the unique constraint to registrations.user_id
ALTER TABLE public.registrations 
ADD CONSTRAINT registrations_user_id_unique UNIQUE (user_id);

COMMENT ON CONSTRAINT registrations_user_id_unique ON public.registrations IS 'Ensure 1-to-1 mapping between a user and their tournament registration request';
