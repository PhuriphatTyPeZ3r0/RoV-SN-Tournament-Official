-- ============================================================
-- 013_expand_profile_fields.sql
-- Phase 1: Database Schema Expansion (Recruitment Form Sync)
-- ============================================================

-- 1.1 Add mandatory fields to profiles
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS prefix             TEXT,
ADD COLUMN IF NOT EXISTS nickname           TEXT,
ADD COLUMN IF NOT EXISTS class_grade        TEXT,
ADD COLUMN IF NOT EXISTS phone              TEXT,
ADD COLUMN IF NOT EXISTS main_role          TEXT,
ADD COLUMN IF NOT EXISTS is_profile_complete BOOLEAN DEFAULT false;

-- 1.2 Add constraint to student_id (Must be exactly 5 digits)
-- Note: student_id was added in 005_student_registrations.sql
DO $$
BEGIN
    -- Remove existing constraint if it exists to allow update
    ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS student_id_format;
    
    ALTER TABLE public.profiles 
    ADD CONSTRAINT student_id_format 
    CHECK (student_id ~ '^[0-9]{5}$');
EXCEPTION
    WHEN others THEN NULL;
END $$;

-- 1.3 Create Index for fast lookups
CREATE INDEX IF NOT EXISTS idx_profiles_student_id ON public.profiles(student_id);

COMMENT ON COLUMN public.profiles.is_profile_complete IS 'Flag to force onboarding for new users';
COMMENT ON COLUMN public.profiles.main_role IS 'Preferred game position (Jungle, Mid, etc.)';
