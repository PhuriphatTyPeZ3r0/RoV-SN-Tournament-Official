-- ============================================================
-- 037_revoke_explicit_roles.sql
-- Explicitly revoke execute permission from anon and authenticated roles
-- ============================================================

-- Explicitly revoke from anon and authenticated roles on trigger/system functions
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM anon, authenticated, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.log_audit_event() FROM anon, authenticated, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.log_department_history() FROM anon, authenticated, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.log_position_history() FROM anon, authenticated, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.sync_profile_claims_to_auth() FROM anon, authenticated, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.handle_registration_approval() FROM anon, authenticated, PUBLIC;

-- Explicitly revoke on legacy unused registration attempt functions
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'create_registration_attempt') THEN
    REVOKE EXECUTE ON FUNCTION public.create_registration_attempt(p_email text, p_otp_code text, p_payload jsonb, p_attempt_type text, p_expires_at timestamp with time zone) FROM anon, authenticated, PUBLIC;
  END IF;
  
  IF EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'update_registration_attempt_otp') THEN
    REVOKE EXECUTE ON FUNCTION public.update_registration_attempt_otp(p_email text, p_attempt_type text, p_new_otp text, p_new_expires_at timestamp with time zone) FROM anon, authenticated, PUBLIC;
  END IF;
  
  IF EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'verify_registration_attempt') THEN
    REVOKE EXECUTE ON FUNCTION public.verify_registration_attempt(p_email text, p_attempt_type text, p_otp_code text) FROM anon, authenticated, PUBLIC;
  END IF;
END $$;
