-- ============================================================
-- 035_security_advisor_remediations.sql
-- Security Hardening and Remediation of Supabase Linter Warnings
-- ============================================================

-- 1. Fix Function Search Path Mutable (Linter 0011)
-- Explicitly lock search_path to public schema for security definer/invoker functions
ALTER FUNCTION public.calculate_tournament_standings(p_tournament_id UUID) SET search_path = public;
ALTER FUNCTION public.get_season_overview(p_tournament_id UUID) SET search_path = public;
ALTER FUNCTION public.get_player_leaderboard(p_tournament_id UUID) SET search_path = public;
ALTER FUNCTION public.get_team_stats(p_tournament_id UUID) SET search_path = public;

-- Fix trigger functions search path
ALTER FUNCTION public.log_position_history() SET search_path = public;
ALTER FUNCTION public.log_department_history() SET search_path = public;
ALTER FUNCTION public.generate_team_invite_code() SET search_path = public;
ALTER FUNCTION public.log_audit_event() SET search_path = public;
ALTER FUNCTION public.sync_profile_claims_to_auth() SET search_path = public;
ALTER FUNCTION public.handle_registration_approval() SET search_path = public;

-- Fix schema-specific functions search path
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_namespace WHERE nspname = 'internal') THEN
    ALTER FUNCTION internal.handle_registration_approval() SET search_path = public;
  END IF;
END $$;

-- Fix registration OTP functions search path (if they exist)
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'create_registration_attempt') THEN
    ALTER FUNCTION public.create_registration_attempt(p_email text, p_otp_code text, p_payload jsonb, p_attempt_type text, p_expires_at timestamp with time zone) SET search_path = public;
  END IF;
  IF EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'update_registration_attempt_otp') THEN
    ALTER FUNCTION public.update_registration_attempt_otp(p_email text, p_attempt_type text, p_new_otp text, p_new_expires_at timestamp with time zone) SET search_path = public;
  END IF;
  IF EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'verify_registration_attempt') THEN
    ALTER FUNCTION public.verify_registration_attempt(p_email text, p_attempt_type text, p_otp_code text) SET search_path = public;
  END IF;
END $$;


-- 2. Revoke Public Execution of Privileged Functions (Linter 0028/0029)
-- Restrict direct execution from PUBLIC (anon/authenticated roles) on internal system/trigger functions
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.log_audit_event() FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.log_department_history() FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.log_position_history() FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.sync_profile_claims_to_auth() FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.generate_team_invite_code() FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.handle_registration_approval() FROM PUBLIC;

DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_namespace WHERE nspname = 'internal') AND EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'handle_registration_approval' AND pronamespace = (SELECT oid FROM pg_namespace WHERE nspname = 'internal')) THEN
    REVOKE EXECUTE ON FUNCTION internal.handle_registration_approval() FROM PUBLIC;
  END IF;
END $$;


-- 3. Fix Public Bucket Allows Listing (Linter 0025)
-- Drop broad SELECT policies on storage.objects for public buckets.
-- Public buckets do not require SELECT policies for file retrieval via public URLs.
DROP POLICY IF EXISTS "Allow public read of avatars" ON storage.objects;
DROP POLICY IF EXISTS "Allow public read of team-logos" ON storage.objects;
DROP POLICY IF EXISTS "team_logos_select" ON storage.objects;


-- 4. Fix RLS Enabled No Policy (Linter 0008)
-- Define a policy for the registration_attempts table to satisfy the linter warning
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'registration_attempts') THEN
    DROP POLICY IF EXISTS "Admins can view and manage registration attempts" ON public.registration_attempts;
    CREATE POLICY "Admins can view and manage registration attempts"
    ON public.registration_attempts
    FOR ALL
    TO authenticated
    USING (get_user_role() IN ('admin', 'super_admin'))
    WITH CHECK (get_user_role() IN ('admin', 'super_admin'));
  END IF;
END $$;
