-- ============================================================
-- 016_fix_constraints_and_rls.sql
-- Fix database check constraints, OAuth onboarding bypass,
-- and implement players self-update RLS with ABAC team state-locks.
-- ============================================================

-- 1. Drop old conflicting profiles.role check constraint
ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_role_check;

-- 2. Modify profiles.registration_status check constraint and default value
-- First drop the constraint
ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_registration_status_check;

-- Update existing NULL or invalid status values to 'none'
UPDATE public.profiles 
SET registration_status = 'none' 
WHERE registration_status IS NULL 
   OR registration_status NOT IN ('pending', 'verified', 'rejected');

-- Add the new constraint supporting 'none'
ALTER TABLE public.profiles 
ADD CONSTRAINT profiles_registration_status_check 
CHECK (registration_status IN ('none', 'pending', 'verified', 'rejected'));

-- Alter default value to 'none'
ALTER TABLE public.profiles ALTER COLUMN registration_status SET DEFAULT 'none';

-- 3. Modify registrations.status check constraint to support 'verified'
ALTER TABLE public.registrations DROP CONSTRAINT IF EXISTS registrations_status_check;
ALTER TABLE public.registrations 
ADD CONSTRAINT registrations_status_check 
CHECK (status IN ('pending', 'approved', 'rejected', 'verified'));

-- 4. Create public.is_team_editable helper function
-- Runs as SECURITY DEFINER to bypass RLS when checking team status
CREATE OR REPLACE FUNCTION public.is_team_editable(team_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT COALESCE(
    (SELECT status = 'incomplete' FROM public.teams WHERE id = team_id),
    TRUE
  );
$$;

-- 5. Drop old policies on players
DROP POLICY IF EXISTS "players_admin_write" ON public.players;
DROP POLICY IF EXISTS "players_admin_update" ON public.players;
DROP POLICY IF EXISTS "players_admin_delete" ON public.players;
DROP POLICY IF EXISTS "players_admin_all" ON public.players;
DROP POLICY IF EXISTS "players_self_insert" ON public.players;
DROP POLICY IF EXISTS "players_self_update" ON public.players;

-- 6. Create updated RLS policies for players
-- Admins and Super Admins can manage all players
CREATE POLICY "players_admin_all" ON public.players
  FOR ALL
  USING (get_user_role() IN ('admin', 'super_admin'))
  WITH CHECK (get_user_role() IN ('admin', 'super_admin'));

-- Authenticated users can insert their own player row
CREATE POLICY "players_self_insert" ON public.players
  FOR INSERT
  WITH CHECK (profile_id = auth.uid());

-- Players can update their own row (e.g. IGN, grade, team_id)
-- USING checks if the OLD team is editable (not locked)
-- WITH CHECK checks if the NEW team is editable (not locked)
CREATE POLICY "players_self_update" ON public.players
  FOR UPDATE
  USING (
    profile_id = auth.uid()
    AND public.is_team_editable(team_id)
  )
  WITH CHECK (
    profile_id = auth.uid()
    AND public.is_team_editable(team_id)
  );

COMMENT ON FUNCTION public.is_team_editable(UUID) IS 'Bypasses RLS to verify if a team status allows roster updates';
COMMENT ON POLICY "players_self_update" ON public.players IS 'ABAC: Players can self-update if old and new teams are incomplete';
