-- ============================================================
-- 023_fix_admin_rls_policies.sql
-- Update administrative RLS policies across all tables to 
-- support both 'admin' and 'super_admin' roles using get_user_role().
-- ============================================================

-- 1. Profiles Table Admin Policies
DROP POLICY IF EXISTS "profiles_admin_update" ON public.profiles;
DROP POLICY IF EXISTS "profiles_admin_delete" ON public.profiles;
CREATE POLICY "profiles_admin_update" ON public.profiles
  FOR UPDATE USING (get_user_role() IN ('admin', 'super_admin'));
CREATE POLICY "profiles_admin_delete" ON public.profiles
  FOR DELETE USING (get_user_role() IN ('admin', 'super_admin'));

-- 2. Tournaments Table Admin Policies
DROP POLICY IF EXISTS "tournaments_admin_write" ON public.tournaments;
DROP POLICY IF EXISTS "tournaments_admin_update" ON public.tournaments;
DROP POLICY IF EXISTS "tournaments_admin_delete" ON public.tournaments;
CREATE POLICY "tournaments_admin_write" ON public.tournaments
  FOR INSERT WITH CHECK (get_user_role() IN ('admin', 'super_admin'));
CREATE POLICY "tournaments_admin_update" ON public.tournaments
  FOR UPDATE USING (get_user_role() IN ('admin', 'super_admin'));
CREATE POLICY "tournaments_admin_delete" ON public.tournaments
  FOR DELETE USING (get_user_role() IN ('admin', 'super_admin'));

-- 3. Teams Table Admin Policies
DROP POLICY IF EXISTS "teams_admin_write" ON public.teams;
DROP POLICY IF EXISTS "teams_admin_update" ON public.teams;
DROP POLICY IF EXISTS "teams_admin_delete" ON public.teams;
CREATE POLICY "teams_admin_write" ON public.teams
  FOR INSERT WITH CHECK (get_user_role() IN ('admin', 'super_admin'));
CREATE POLICY "teams_admin_update" ON public.teams
  FOR UPDATE USING (get_user_role() IN ('admin', 'super_admin'));
CREATE POLICY "teams_admin_delete" ON public.teams
  FOR DELETE USING (get_user_role() IN ('admin', 'super_admin'));

-- 4. Heroes Table Admin Policies
DROP POLICY IF EXISTS "heroes_admin_write" ON public.heroes;
DROP POLICY IF EXISTS "heroes_admin_update" ON public.heroes;
DROP POLICY IF EXISTS "heroes_admin_delete" ON public.heroes;
CREATE POLICY "heroes_admin_write" ON public.heroes
  FOR INSERT WITH CHECK (get_user_role() IN ('admin', 'super_admin'));
CREATE POLICY "heroes_admin_update" ON public.heroes
  FOR UPDATE USING (get_user_role() IN ('admin', 'super_admin'));
CREATE POLICY "heroes_admin_delete" ON public.heroes
  FOR DELETE USING (get_user_role() IN ('admin', 'super_admin'));

-- 5. Schedules Table Admin Policies
DROP POLICY IF EXISTS "schedules_admin_write" ON public.schedules;
DROP POLICY IF EXISTS "schedules_admin_update" ON public.schedules;
DROP POLICY IF EXISTS "schedules_admin_delete" ON public.schedules;
CREATE POLICY "schedules_admin_write" ON public.schedules
  FOR INSERT WITH CHECK (get_user_role() IN ('admin', 'super_admin'));
CREATE POLICY "schedules_admin_update" ON public.schedules
  FOR UPDATE USING (get_user_role() IN ('admin', 'super_admin'));
CREATE POLICY "schedules_admin_delete" ON public.schedules
  FOR DELETE USING (get_user_role() IN ('admin', 'super_admin'));

-- 6. Matches Table Admin Policies
DROP POLICY IF EXISTS "matches_admin_write" ON public.matches;
DROP POLICY IF EXISTS "matches_admin_update" ON public.matches;
DROP POLICY IF EXISTS "matches_admin_delete" ON public.matches;
CREATE POLICY "matches_admin_write" ON public.matches
  FOR INSERT WITH CHECK (get_user_role() IN ('admin', 'super_admin'));
CREATE POLICY "matches_admin_update" ON public.matches
  FOR UPDATE USING (get_user_role() IN ('admin', 'super_admin'));
CREATE POLICY "matches_admin_delete" ON public.matches
  FOR DELETE USING (get_user_role() IN ('admin', 'super_admin'));

-- 7. Match Games Table Admin Policies
DROP POLICY IF EXISTS "match_games_admin_write" ON public.match_games;
DROP POLICY IF EXISTS "match_games_admin_update" ON public.match_games;
DROP POLICY IF EXISTS "match_games_admin_delete" ON public.match_games;
CREATE POLICY "match_games_admin_write" ON public.match_games
  FOR INSERT WITH CHECK (get_user_role() IN ('admin', 'super_admin'));
CREATE POLICY "match_games_admin_update" ON public.match_games
  FOR UPDATE USING (get_user_role() IN ('admin', 'super_admin'));
CREATE POLICY "match_games_admin_delete" ON public.match_games
  FOR DELETE USING (get_user_role() IN ('admin', 'super_admin'));

-- 8. Game Stats Table Admin Policies
DROP POLICY IF EXISTS "game_stats_admin_write" ON public.game_stats;
DROP POLICY IF EXISTS "game_stats_admin_update" ON public.game_stats;
DROP POLICY IF EXISTS "game_stats_admin_delete" ON public.game_stats;
CREATE POLICY "game_stats_admin_write" ON public.game_stats
  FOR INSERT WITH CHECK (get_user_role() IN ('admin', 'super_admin'));
CREATE POLICY "game_stats_admin_update" ON public.game_stats
  FOR UPDATE USING (get_user_role() IN ('admin', 'super_admin'));
CREATE POLICY "game_stats_admin_delete" ON public.game_stats
  FOR DELETE USING (get_user_role() IN ('admin', 'super_admin'));

-- 9. Match History Table Admin Policies
DROP POLICY IF EXISTS "match_history_admin_write" ON public.match_history;
DROP POLICY IF EXISTS "match_history_admin_update" ON public.match_history;
DROP POLICY IF EXISTS "match_history_admin_delete" ON public.match_history;
CREATE POLICY "match_history_admin_write" ON public.match_history
  FOR INSERT WITH CHECK (get_user_role() IN ('admin', 'super_admin'));
CREATE POLICY "match_history_admin_update" ON public.match_history
  FOR UPDATE USING (get_user_role() IN ('admin', 'super_admin'));
CREATE POLICY "match_history_admin_delete" ON public.match_history
  FOR DELETE USING (get_user_role() IN ('admin', 'super_admin'));

-- 10. Registrations Table Admin Policies
DROP POLICY IF EXISTS "Admins can view all registrations" ON public.registrations;
DROP POLICY IF EXISTS "Admins can update registrations" ON public.registrations;
DROP POLICY IF EXISTS "registrations_admin_select" ON public.registrations;
DROP POLICY IF EXISTS "registrations_admin_update" ON public.registrations;

CREATE POLICY "registrations_admin_select" ON public.registrations
  FOR SELECT USING (get_user_role() IN ('admin', 'super_admin'));
CREATE POLICY "registrations_admin_update" ON public.registrations
  FOR UPDATE USING (get_user_role() IN ('admin', 'super_admin'));
