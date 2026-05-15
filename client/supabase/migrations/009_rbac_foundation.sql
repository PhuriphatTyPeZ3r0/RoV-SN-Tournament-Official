-- ============================================================
-- 009_rbac_foundation.sql
-- Phase 1: Identity & RBAC Foundation
-- ============================================================

-- 1.1 Enum Creation
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
        CREATE TYPE public.user_role AS ENUM ('guest', 'student', 'player', 'captain', 'admin', 'super_admin');
    END IF;
END $$;

-- 1.2 Update Profiles Table
-- First, map existing text roles to the new enum values
UPDATE public.profiles SET role = 'student' WHERE role = 'viewer';

-- We skip ALTER COLUMN role TYPE public.user_role because 30+ policies depend on the text column
-- and PostgreSQL forbids altering a column type if policies depend on it unless we drop all of them.
-- Instead, we just add a CHECK constraint to ensure data integrity.
ALTER TABLE public.profiles ADD CONSTRAINT check_valid_role CHECK (role IN ('guest', 'student', 'player', 'captain', 'admin', 'super_admin'));

-- 1.3 Secure Role Function
-- This function allows fetching the current user's role without recursive policy issues
CREATE OR REPLACE FUNCTION public.get_user_role()
RETURNS public.user_role
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  -- Read text and cast to enum
  SELECT role::public.user_role FROM public.profiles WHERE id = auth.uid();
$$;

-- Update the handle_new_user trigger to use the new default role
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER          -- Runs with table owner privileges to bypass RLS
SET search_path = public  -- Prevent search_path injection
AS $$
BEGIN
  INSERT INTO public.profiles (id, username, role)
  VALUES (
    NEW.id,
    COALESCE(
      NEW.raw_user_meta_data ->> 'username',
      SPLIT_PART(NEW.email, '@', 1),
      NEW.id::TEXT
    ),
    'student'
  );
  RETURN NEW;
END;
$$;

COMMENT ON TYPE public.user_role IS 'E-CMIS Inspired Role Hierarchy';
COMMENT ON FUNCTION public.get_user_role() IS 'Fetch current user role securely for RLS policies';
