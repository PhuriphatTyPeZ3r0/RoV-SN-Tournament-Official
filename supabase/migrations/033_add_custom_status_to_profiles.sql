-- ============================================================
-- 033_add_custom_status_to_profiles.sql
-- Add custom_status to public.profiles table
-- ============================================================

ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS custom_status TEXT;

COMMENT ON COLUMN public.profiles.custom_status IS 'Custom status message like Discord presence status';
