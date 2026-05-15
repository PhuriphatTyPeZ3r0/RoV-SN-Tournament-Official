-- ============================================================
-- 012_auto_profile_trigger.sql
-- Phase 1: Database & Auth Triggers (Profile Sync)
-- ============================================================

-- 1.1 Add email and full_name columns to profiles if they don't exist
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS email TEXT,
ADD COLUMN IF NOT EXISTS full_name TEXT;

-- 1.2 Replace the trigger function to extract Google OAuth metadata
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER          -- Runs with table owner privileges to bypass RLS
SET search_path = public  -- Prevent search_path injection
AS $$
BEGIN
  INSERT INTO public.profiles (id, username, email, full_name, avatar_url, role)
  VALUES (
    NEW.id,
    -- username fallback
    COALESCE(
      NEW.raw_user_meta_data ->> 'user_name',
      NEW.raw_user_meta_data ->> 'preferred_username',
      SPLIT_PART(NEW.email, '@', 1),
      NEW.id::TEXT
    ),
    NEW.email,
    -- extract full_name from Google OAuth if available
    NEW.raw_user_meta_data ->> 'full_name',
    -- extract avatar_url from Google OAuth if available
    NEW.raw_user_meta_data ->> 'avatar_url',
    'student'::public.user_role
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    full_name = COALESCE(public.profiles.full_name, EXCLUDED.full_name),
    avatar_url = COALESCE(public.profiles.avatar_url, EXCLUDED.avatar_url);
    
  RETURN NEW;
END;
$$;

-- The trigger "on_auth_user_created" is already attached to auth.users in 003_auth_triggers.sql.
-- By using CREATE OR REPLACE FUNCTION, the existing trigger will automatically use this new logic.
