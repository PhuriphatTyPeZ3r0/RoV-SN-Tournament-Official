-- ============================================================
-- 025_extend_team_and_player_fields.sql
-- Add description to teams and lineup_role to players
-- ============================================================

-- 1. Add description column to teams
ALTER TABLE public.teams 
ADD COLUMN IF NOT EXISTS description TEXT;

-- 2. Add lineup_role column to players with CHECK constraint for RoV lanes
ALTER TABLE public.players
ADD COLUMN IF NOT EXISTS lineup_role TEXT 
CONSTRAINT check_lineup_role CHECK (lineup_role IN ('dark_slayer', 'abyssal_dragon', 'mid_lane', 'jungle', 'support', 'substitute'));

-- 3. Re-enable or verify policies remain intact
-- Captains can update their team details (which implicitly covers the new description column)
-- Captains can also update player lineup roles (we need to make sure captains can update players in their team)

-- Add policy to allow captains to update lineup_role of players in their own team
-- First, drop if exists
DROP POLICY IF EXISTS "Captains can update players in their team" ON public.players;

CREATE POLICY "Captains can update players in their team"
ON public.players FOR UPDATE
USING (
  -- The authenticated user is the captain of the team the player belongs to
  EXISTS (
    SELECT 1 FROM public.teams
    WHERE teams.id = players.team_id 
      AND EXISTS (
        SELECT 1 FROM public.players AS captain
        WHERE captain.id = teams.captain_id AND captain.profile_id = auth.uid()
      )
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.teams
    WHERE teams.id = players.team_id 
      AND EXISTS (
        SELECT 1 FROM public.players AS captain
        WHERE captain.id = teams.captain_id AND captain.profile_id = auth.uid()
      )
  )
);
