-- ============================================================
-- 036_additional_security_hardening.sql
-- Additional security fixes for remaining Security Definer warnings
-- ============================================================

-- 1. Switch RLS helper functions from SECURITY DEFINER to SECURITY INVOKER
-- These functions do not need elevated privileges because the calling users
-- already have read access to the referenced public tables (profiles, teams).
ALTER FUNCTION public.get_user_role() SECURITY INVOKER;
ALTER FUNCTION public.is_team_editable(team_id UUID) SECURITY INVOKER;

-- 2. Revoke execute permission from PUBLIC for legacy/unused registration attempt RPCs
-- These functions are not utilized by the current Next.js application.
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'create_registration_attempt') THEN
    REVOKE EXECUTE ON FUNCTION public.create_registration_attempt(p_email text, p_otp_code text, p_payload jsonb, p_attempt_type text, p_expires_at timestamp with time zone) FROM PUBLIC;
  END IF;
  
  IF EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'update_registration_attempt_otp') THEN
    REVOKE EXECUTE ON FUNCTION public.update_registration_attempt_otp(p_email text, p_attempt_type text, p_new_otp text, p_new_expires_at timestamp with time zone) FROM PUBLIC;
  END IF;
  
  IF EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'verify_registration_attempt') THEN
    REVOKE EXECUTE ON FUNCTION public.verify_registration_attempt(p_email text, p_attempt_type text, p_otp_code text) FROM PUBLIC;
  END IF;
END $$;
