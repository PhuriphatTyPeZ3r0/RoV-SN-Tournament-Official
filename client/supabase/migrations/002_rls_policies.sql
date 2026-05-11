-- ============================================================
-- 002_rls_policies.sql
-- Row Level Security — Public read, Admin-only write
-- ============================================================

-- ============================================================
-- Helper: reusable admin check expression
-- An admin is an authenticated user whose profiles.role = 'admin'
-- ============================================================

-- 1. profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "profiles_select_all"
  ON public.profiles FOR SELECT
  USING (true);

CREATE POLICY "profiles_self_update"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "profiles_admin_all"
  ON public.profiles FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- 2. tournaments
ALTER TABLE public.tournaments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "tournaments_public_read"
  ON public.tournaments FOR SELECT
  USING (true);

CREATE POLICY "tournaments_admin_write"
  ON public.tournaments FOR INSERT
  WITH CHECK (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "tournaments_admin_update"
  ON public.tournaments FOR UPDATE
  USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "tournaments_admin_delete"
  ON public.tournaments FOR DELETE
  USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- 3. teams
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;

CREATE POLICY "teams_public_read"
  ON public.teams FOR SELECT
  USING (true);

CREATE POLICY "teams_admin_write"
  ON public.teams FOR INSERT
  WITH CHECK (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "teams_admin_update"
  ON public.teams FOR UPDATE
  USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "teams_admin_delete"
  ON public.teams FOR DELETE
  USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- 4. heroes
ALTER TABLE public.heroes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "heroes_public_read"
  ON public.heroes FOR SELECT
  USING (true);

CREATE POLICY "heroes_admin_write"
  ON public.heroes FOR INSERT
  WITH CHECK (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "heroes_admin_update"
  ON public.heroes FOR UPDATE
  USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "heroes_admin_delete"
  ON public.heroes FOR DELETE
  USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- 5. players
ALTER TABLE public.players ENABLE ROW LEVEL SECURITY;

CREATE POLICY "players_public_read"
  ON public.players FOR SELECT
  USING (true);

CREATE POLICY "players_admin_write"
  ON public.players FOR INSERT
  WITH CHECK (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "players_admin_update"
  ON public.players FOR UPDATE
  USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "players_admin_delete"
  ON public.players FOR DELETE
  USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- 6. schedules
ALTER TABLE public.schedules ENABLE ROW LEVEL SECURITY;

CREATE POLICY "schedules_public_read"
  ON public.schedules FOR SELECT
  USING (true);

CREATE POLICY "schedules_admin_write"
  ON public.schedules FOR INSERT
  WITH CHECK (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "schedules_admin_update"
  ON public.schedules FOR UPDATE
  USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "schedules_admin_delete"
  ON public.schedules FOR DELETE
  USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- 7. matches
ALTER TABLE public.matches ENABLE ROW LEVEL SECURITY;

CREATE POLICY "matches_public_read"
  ON public.matches FOR SELECT
  USING (true);

CREATE POLICY "matches_admin_write"
  ON public.matches FOR INSERT
  WITH CHECK (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "matches_admin_update"
  ON public.matches FOR UPDATE
  USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "matches_admin_delete"
  ON public.matches FOR DELETE
  USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- 8. match_games
ALTER TABLE public.match_games ENABLE ROW LEVEL SECURITY;

CREATE POLICY "match_games_public_read"
  ON public.match_games FOR SELECT
  USING (true);

CREATE POLICY "match_games_admin_write"
  ON public.match_games FOR INSERT
  WITH CHECK (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "match_games_admin_update"
  ON public.match_games FOR UPDATE
  USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "match_games_admin_delete"
  ON public.match_games FOR DELETE
  USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- 9. game_stats
ALTER TABLE public.game_stats ENABLE ROW LEVEL SECURITY;

CREATE POLICY "game_stats_public_read"
  ON public.game_stats FOR SELECT
  USING (true);

CREATE POLICY "game_stats_admin_write"
  ON public.game_stats FOR INSERT
  WITH CHECK (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "game_stats_admin_update"
  ON public.game_stats FOR UPDATE
  USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "game_stats_admin_delete"
  ON public.game_stats FOR DELETE
  USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- 10. match_history
ALTER TABLE public.match_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "match_history_public_read"
  ON public.match_history FOR SELECT
  USING (true);

CREATE POLICY "match_history_admin_write"
  ON public.match_history FOR INSERT
  WITH CHECK (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "match_history_admin_update"
  ON public.match_history FOR UPDATE
  USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "match_history_admin_delete"
  ON public.match_history FOR DELETE
  USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );
