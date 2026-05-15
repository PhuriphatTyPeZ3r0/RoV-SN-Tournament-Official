-- ============================================================
-- 011_system_audit_trail.sql
-- Phase 3: The System Audit Trail
-- ============================================================

-- 3.1 Audit Table Schema
CREATE TABLE public.audit_logs (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  actor_id    UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  action_type TEXT NOT NULL,
  table_name  TEXT NOT NULL,
  record_id   TEXT NOT NULL, -- TEXT for generic storage of various ID types
  old_data    JSONB,
  new_data    JSONB,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3.2 Generic Trigger Function
CREATE OR REPLACE FUNCTION public.log_audit_event()
RETURNS TRIGGER AS $$
DECLARE
  v_old_data JSONB := NULL;
  v_new_data JSONB := NULL;
  v_record_id TEXT;
BEGIN
  IF (TG_OP = 'UPDATE') THEN
    v_old_data := to_jsonb(OLD);
    v_new_data := to_jsonb(NEW);
    v_record_id := NEW.id::TEXT;
  ELSIF (TG_OP = 'DELETE') THEN
    v_old_data := to_jsonb(OLD);
    v_record_id := OLD.id::TEXT;
  ELSIF (TG_OP = 'INSERT') THEN
    v_new_data := to_jsonb(NEW);
    v_record_id := NEW.id::TEXT;
  END IF;

  INSERT INTO public.audit_logs (actor_id, action_type, table_name, record_id, old_data, new_data)
  VALUES (auth.uid(), TG_OP, TG_TABLE_NAME, v_record_id, v_old_data, v_new_data);

  IF (TG_OP = 'DELETE') THEN
    RETURN OLD;
  ELSE
    RETURN NEW;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3.3 Attach Triggers
-- Critical tables: teams (approval status) and matches (scores)
DROP TRIGGER IF EXISTS trg_audit_teams ON public.teams;
CREATE TRIGGER trg_audit_teams
  AFTER INSERT OR UPDATE OR DELETE ON public.teams
  FOR EACH ROW EXECUTE FUNCTION public.log_audit_event();

DROP TRIGGER IF EXISTS trg_audit_matches ON public.matches;
CREATE TRIGGER trg_audit_matches
  AFTER INSERT OR UPDATE OR DELETE ON public.matches
  FOR EACH ROW EXECUTE FUNCTION public.log_audit_event();

-- Enable RLS on audit_logs
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Only admins can view audit logs
CREATE POLICY "audit_logs_admin_select"
  ON public.audit_logs FOR SELECT
  USING (get_user_role() IN ('admin', 'super_admin'));

COMMENT ON TABLE public.audit_logs IS 'System-wide audit trail for critical actions';
COMMENT ON FUNCTION public.log_audit_event() IS 'Generic trigger to log changes to audit_logs table';
