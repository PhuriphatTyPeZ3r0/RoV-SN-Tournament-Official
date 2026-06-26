-- ============================================================
-- 019_add_privacy_flag.sql
-- Add privacy_flag column to profiles and registrations tables
-- ============================================================

-- 1. Add privacy_flag column to public.profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS privacy_flag BOOLEAN DEFAULT false;

-- 2. Add privacy_flag column to public.registrations table
ALTER TABLE public.registrations 
ADD COLUMN IF NOT EXISTS privacy_flag BOOLEAN DEFAULT false;

-- 3. Add column comments
COMMENT ON COLUMN public.profiles.privacy_flag IS 'PDPA/RoPA Privacy flag to conceal personal info';
COMMENT ON COLUMN public.registrations.privacy_flag IS 'PDPA/RoPA Privacy flag to conceal personal info';
