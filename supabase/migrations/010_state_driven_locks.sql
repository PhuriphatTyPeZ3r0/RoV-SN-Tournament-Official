-- ============================================================
-- 010_state_driven_locks.sql
-- Phase 2: State-Driven Locks & ABAC (RLS Layer)
-- ============================================================

-- ============================================================
-- 2.1 Registration Privacy
-- ============================================================

-- Drop old policies from 005 and self
DROP POLICY IF EXISTS "Students can view own registration" ON public.registrations;
DROP POLICY IF EXISTS "Students can insert own registration" ON public.registrations;
DROP POLICY IF EXISTS "Admins can view all registrations" ON public.registrations;
DROP POLICY IF EXISTS "Admins can update registrations" ON public.registrations;
DROP POLICY IF EXISTS "registrations_owner_select" ON public.registrations;
DROP POLICY IF EXISTS "registrations_owner_insert" ON public.registrations;
DROP POLICY IF EXISTS "registrations_admin_all" ON public.registrations;

-- New E-CMIS style policies for registrations
CREATE POLICY "registrations_owner_select"
  ON public.registrations FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "registrations_owner_insert"
  ON public.registrations FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "registrations_admin_all"
  ON public.registrations FOR ALL
  USING (get_user_role() IN ('admin', 'super_admin'));


-- ============================================================
-- 2.2 Team State-Locks (The ABAC Core)
-- ============================================================

-- Drop old policies from 006 and self
DROP POLICY IF EXISTS "Public teams are viewable by everyone" ON public.teams;
DROP POLICY IF EXISTS "Verified players can insert teams" ON public.teams;
DROP POLICY IF EXISTS "Captains can update their teams" ON public.teams;
DROP POLICY IF EXISTS "Admins can manage all teams" ON public.teams;
DROP POLICY IF EXISTS "teams_public_select" ON public.teams;
DROP POLICY IF EXISTS "teams_verified_insert" ON public.teams;
DROP POLICY IF EXISTS "teams_captain_update" ON public.teams;
DROP POLICY IF EXISTS "teams_admin_all" ON public.teams;

-- New E-CMIS style policies for teams
CREATE POLICY "teams_public_select"
  ON public.teams FOR SELECT
  USING (true);

CREATE POLICY "teams_verified_insert"
  ON public.teams FOR INSERT
  WITH CHECK (
    get_user_role() IN ('admin', 'super_admin') OR
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND registration_status = 'verified'
    )
  );

-- ABAC: State-Lock for Captains
-- Captains can only update if status is 'incomplete'
CREATE POLICY "teams_captain_update"
  ON public.teams FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.players 
      WHERE players.id = teams.captain_id AND players.profile_id = auth.uid()
    )
    AND status = 'incomplete'
  )
  WITH CHECK (
    status IN ('incomplete', 'ready') -- Can move to ready, but once it's ready, USING will block further updates
  );

CREATE POLICY "teams_admin_all"
  ON public.teams FOR ALL
  USING (get_user_role() IN ('admin', 'super_admin'));

COMMENT ON POLICY "teams_captain_update" ON public.teams IS 'ABAC: Captains restricted by team status';
