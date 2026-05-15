-- ============================================================
-- 014_registrations_audit.sql
-- Add audit logging for registration lifecycle
-- ============================================================

-- Attach the generic audit trigger to registrations table
DROP TRIGGER IF EXISTS trg_audit_registrations ON public.registrations;
CREATE TRIGGER trg_audit_registrations
  AFTER INSERT OR UPDATE OR DELETE ON public.registrations
  FOR EACH ROW EXECUTE FUNCTION public.log_audit_event();

COMMENT ON TRIGGER trg_audit_registrations ON public.registrations IS 'Audit trail for student and admin registration requests';
