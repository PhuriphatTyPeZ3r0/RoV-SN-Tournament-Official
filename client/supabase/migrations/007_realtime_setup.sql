-- ============================================================
-- 007_realtime_setup.sql
-- Enable Supabase Realtime for core admin tables
-- ============================================================

-- 1. Add tables to the supabase_realtime publication
-- This allows the client to listen for changes via supabase.channel().on('postgres_changes', ...)

DO $$
BEGIN
  -- Enable for registrations (for new signups)
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' AND tablename = 'registrations'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.registrations;
  END IF;

  -- Enable for teams (for status changes like 'ready')
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' AND tablename = 'teams'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.teams;
  END IF;

  -- Enable for match_history (for audit logs/other admin actions)
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' AND tablename = 'match_history'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.match_history;
  END IF;
END $$;

COMMENT ON TABLE public.registrations IS 'Realtime enabled: New registrations trigger admin notifications';
COMMENT ON TABLE public.teams IS 'Realtime enabled: Team status changes trigger admin notifications';
COMMENT ON TABLE public.match_history IS 'Realtime enabled: Audit logs trigger admin notifications';
