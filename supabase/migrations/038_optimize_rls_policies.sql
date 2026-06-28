-- ============================================================
-- 038_optimize_rls_policies.sql
-- Performance Optimization: Fix Auth RLS InitPlan & Multiple Permissive Policies
-- ============================================================

-- ==========================================
-- 1. Optimize public.profiles policies
-- ==========================================
DROP POLICY IF EXISTS "profiles_admin_delete" ON public.profiles;
DROP POLICY IF EXISTS "profiles_admin_update" ON public.profiles;
DROP POLICY IF EXISTS "profiles_delete_optimized" ON public.profiles;
DROP POLICY IF EXISTS "profiles_insert_optimized" ON public.profiles;
DROP POLICY IF EXISTS "profiles_read_optimized" ON public.profiles;
DROP POLICY IF EXISTS "profiles_update_optimized" ON public.profiles;
DROP POLICY IF EXISTS "profiles_select_all" ON public.profiles;
DROP POLICY IF EXISTS "profiles_self_update" ON public.profiles;

CREATE POLICY "profiles_select" ON public.profiles
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "profiles_insert" ON public.profiles
  FOR INSERT
  TO public
  WITH CHECK ((SELECT auth.uid()) = id);

CREATE POLICY "profiles_update" ON public.profiles
  FOR UPDATE
  TO authenticated
  USING ((SELECT auth.uid()) = id OR (SELECT get_user_role()) IN ('admin', 'super_admin'))
  WITH CHECK ((SELECT auth.uid()) = id OR (SELECT get_user_role()) IN ('admin', 'super_admin'));

CREATE POLICY "profiles_delete" ON public.profiles
  FOR DELETE
  TO authenticated
  USING ((SELECT get_user_role()) IN ('admin', 'super_admin'));

-- ==========================================
-- 2. Optimize public.teams policies
-- ==========================================
DROP POLICY IF EXISTS "teams_admin_all" ON public.teams;
DROP POLICY IF EXISTS "teams_admin_delete" ON public.teams;
DROP POLICY IF EXISTS "teams_admin_update" ON public.teams;
DROP POLICY IF EXISTS "teams_admin_write" ON public.teams;
DROP POLICY IF EXISTS "teams_captain_update" ON public.teams;
DROP POLICY IF EXISTS "teams_delete_optimized" ON public.teams;
DROP POLICY IF EXISTS "teams_insert_optimized" ON public.teams;
DROP POLICY IF EXISTS "teams_public_select" ON public.teams;
DROP POLICY IF EXISTS "teams_select_optimized" ON public.teams;
DROP POLICY IF EXISTS "teams_update_optimized" ON public.teams;
DROP POLICY IF EXISTS "teams_verified_insert" ON public.teams;
DROP POLICY IF EXISTS "teams_public_read" ON public.teams;

CREATE POLICY "teams_select" ON public.teams
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "teams_insert" ON public.teams
  FOR INSERT
  TO authenticated
  WITH CHECK (
    (SELECT get_user_role()) IN ('admin', 'super_admin') OR 
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = (SELECT auth.uid()) AND profiles.registration_status = 'verified'
    )
  );

CREATE POLICY "teams_update" ON public.teams
  FOR UPDATE
  TO authenticated
  USING (
    (SELECT get_user_role()) IN ('admin', 'super_admin') OR 
    (
      EXISTS (
        SELECT 1 FROM public.players
        WHERE players.id = teams.captain_id AND players.profile_id = (SELECT auth.uid())
      ) AND teams.status = 'incomplete'
    )
  )
  WITH CHECK (
    (SELECT get_user_role()) IN ('admin', 'super_admin') OR 
    teams.status IN ('incomplete', 'ready')
  );

CREATE POLICY "teams_delete" ON public.teams
  FOR DELETE
  TO authenticated
  USING ((SELECT get_user_role()) IN ('admin', 'super_admin'));

-- ==========================================
-- 3. Optimize public.players policies
-- ==========================================
DROP POLICY IF EXISTS "Captains can update players in their team" ON public.players;
DROP POLICY IF EXISTS "Players can update their own row" ON public.players;
DROP POLICY IF EXISTS "players_admin_all" ON public.players;
DROP POLICY IF EXISTS "players_read" ON public.players;
DROP POLICY IF EXISTS "players_self_insert" ON public.players;
DROP POLICY IF EXISTS "players_self_update" ON public.players;
DROP POLICY IF EXISTS "players_public_read" ON public.players;

CREATE POLICY "players_select" ON public.players
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "players_insert" ON public.players
  FOR INSERT
  TO authenticated
  WITH CHECK (
    (SELECT get_user_role()) IN ('admin', 'super_admin') OR
    profile_id = (SELECT auth.uid())
  );

CREATE POLICY "players_update" ON public.players
  FOR UPDATE
  TO authenticated
  USING (
    (SELECT get_user_role()) IN ('admin', 'super_admin') OR 
    (
      (
        profile_id = (SELECT auth.uid()) OR 
        EXISTS (
          SELECT 1 FROM public.teams 
          WHERE teams.id = players.team_id 
            AND teams.captain_id IN (
              SELECT c.id FROM public.players c WHERE c.profile_id = (SELECT auth.uid())
            )
        )
      ) 
      AND is_team_editable(team_id)
    )
  )
  WITH CHECK (
    (SELECT get_user_role()) IN ('admin', 'super_admin') OR 
    (
      (
        profile_id = (SELECT auth.uid()) OR 
        EXISTS (
          SELECT 1 FROM public.teams 
          WHERE teams.id = players.team_id 
            AND teams.captain_id IN (
              SELECT c.id FROM public.players c WHERE c.profile_id = (SELECT auth.uid())
            )
        )
      ) 
      AND is_team_editable(team_id)
    )
  );

CREATE POLICY "players_delete" ON public.players
  FOR DELETE
  TO authenticated
  USING ((SELECT get_user_role()) IN ('admin', 'super_admin'));

-- ==========================================
-- 4. Optimize public.registrations policies
-- ==========================================
DROP POLICY IF EXISTS "registrations_admin_all" ON public.registrations;
DROP POLICY IF EXISTS "registrations_admin_select" ON public.registrations;
DROP POLICY IF EXISTS "registrations_admin_update" ON public.registrations;
DROP POLICY IF EXISTS "registrations_owner_insert" ON public.registrations;
DROP POLICY IF EXISTS "registrations_owner_select" ON public.registrations;
DROP POLICY IF EXISTS "registrations_owner_update" ON public.registrations;
DROP POLICY IF EXISTS "registrations_insert_optimized" ON public.registrations;
DROP POLICY IF EXISTS "registrations_select_optimized" ON public.registrations;
DROP POLICY IF EXISTS "registrations_update_optimized" ON public.registrations;

CREATE POLICY "registrations_select" ON public.registrations
  FOR SELECT
  TO authenticated
  USING (
    user_id = (SELECT auth.uid()) OR 
    (SELECT get_user_role()) IN ('admin', 'super_admin')
  );

CREATE POLICY "registrations_insert" ON public.registrations
  FOR INSERT
  TO authenticated
  WITH CHECK (
    user_id = (SELECT auth.uid()) OR 
    (SELECT get_user_role()) IN ('admin', 'super_admin')
  );

CREATE POLICY "registrations_update" ON public.registrations
  FOR UPDATE
  TO authenticated
  USING (
    user_id = (SELECT auth.uid()) OR 
    (SELECT get_user_role()) IN ('admin', 'super_admin')
  )
  WITH CHECK (
    user_id = (SELECT auth.uid()) OR 
    (SELECT get_user_role()) IN ('admin', 'super_admin')
  );

CREATE POLICY "registrations_delete" ON public.registrations
  FOR DELETE
  TO authenticated
  USING ((SELECT get_user_role()) IN ('admin', 'super_admin'));

-- ==========================================
-- 5. Optimize public.sys_user_logs policies
-- ==========================================
DROP POLICY IF EXISTS "user_logs_admin_read" ON public.sys_user_logs;
DROP POLICY IF EXISTS "user_logs_insert" ON public.sys_user_logs;

CREATE POLICY "user_logs_select" ON public.sys_user_logs
  FOR SELECT
  TO authenticated
  USING ((SELECT get_user_role()) IN ('admin', 'super_admin'));

CREATE POLICY "user_logs_insert" ON public.sys_user_logs
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = (SELECT auth.uid()));

-- ==========================================
-- 6. Optimize public.sys_change_requests policies
-- ==========================================
DROP POLICY IF EXISTS "change_requests_insert" ON public.sys_change_requests;
DROP POLICY IF EXISTS "change_requests_select" ON public.sys_change_requests;
DROP POLICY IF EXISTS "change_requests_update" ON public.sys_change_requests;

CREATE POLICY "change_requests_select" ON public.sys_change_requests
  FOR SELECT
  TO authenticated
  USING (
    user_id = (SELECT auth.uid()) OR 
    (SELECT get_user_role()) IN ('admin', 'super_admin')
  );

CREATE POLICY "change_requests_insert" ON public.sys_change_requests
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = (SELECT auth.uid()));

CREATE POLICY "change_requests_update" ON public.sys_change_requests
  FOR UPDATE
  TO authenticated
  USING ((SELECT get_user_role()) IN ('admin', 'super_admin'));

-- ============================================================
-- 7. Fix Multiple Permissive Policies on RBAC Tables & Themes
-- ============================================================

-- sys_authorizations
DROP POLICY IF EXISTS "authorizations_admin_all" ON public.sys_authorizations;
DROP POLICY IF EXISTS "authorizations_read" ON public.sys_authorizations;

CREATE POLICY "authorizations_read" ON public.sys_authorizations FOR SELECT TO authenticated USING (true);
CREATE POLICY "authorizations_admin_insert" ON public.sys_authorizations FOR INSERT TO authenticated WITH CHECK ((SELECT get_user_role()) IN ('admin', 'super_admin'));
CREATE POLICY "authorizations_admin_update" ON public.sys_authorizations FOR UPDATE TO authenticated USING ((SELECT get_user_role()) IN ('admin', 'super_admin'));
CREATE POLICY "authorizations_admin_delete" ON public.sys_authorizations FOR DELETE TO authenticated USING ((SELECT get_user_role()) IN ('admin', 'super_admin'));

-- sys_departments
DROP POLICY IF EXISTS "departments_admin_all" ON public.sys_departments;
DROP POLICY IF EXISTS "departments_read" ON public.sys_departments;

CREATE POLICY "departments_read" ON public.sys_departments FOR SELECT TO authenticated USING (true);
CREATE POLICY "departments_admin_insert" ON public.sys_departments FOR INSERT TO authenticated WITH CHECK ((SELECT get_user_role()) IN ('admin', 'super_admin'));
CREATE POLICY "departments_admin_update" ON public.sys_departments FOR UPDATE TO authenticated USING ((SELECT get_user_role()) IN ('admin', 'super_admin'));
CREATE POLICY "departments_admin_delete" ON public.sys_departments FOR DELETE TO authenticated USING ((SELECT get_user_role()) IN ('admin', 'super_admin'));

-- sys_function_groups
DROP POLICY IF EXISTS "function_groups_admin_all" ON public.sys_function_groups;
DROP POLICY IF EXISTS "function_groups_read" ON public.sys_function_groups;

CREATE POLICY "function_groups_read" ON public.sys_function_groups FOR SELECT TO authenticated USING (true);
CREATE POLICY "function_groups_admin_insert" ON public.sys_function_groups FOR INSERT TO authenticated WITH CHECK ((SELECT get_user_role()) IN ('admin', 'super_admin'));
CREATE POLICY "function_groups_admin_update" ON public.sys_function_groups FOR UPDATE TO authenticated USING ((SELECT get_user_role()) IN ('admin', 'super_admin'));
CREATE POLICY "function_groups_admin_delete" ON public.sys_function_groups FOR DELETE TO authenticated USING ((SELECT get_user_role()) IN ('admin', 'super_admin'));

-- sys_function_mappings
DROP POLICY IF EXISTS "function_mappings_admin_all" ON public.sys_function_mappings;
DROP POLICY IF EXISTS "function_mappings_read" ON public.sys_function_mappings;

CREATE POLICY "function_mappings_read" ON public.sys_function_mappings FOR SELECT TO authenticated USING (true);
CREATE POLICY "function_mappings_admin_insert" ON public.sys_function_mappings FOR INSERT TO authenticated WITH CHECK ((SELECT get_user_role()) IN ('admin', 'super_admin'));
CREATE POLICY "function_mappings_admin_update" ON public.sys_function_mappings FOR UPDATE TO authenticated USING ((SELECT get_user_role()) IN ('admin', 'super_admin'));
CREATE POLICY "function_mappings_admin_delete" ON public.sys_function_mappings FOR DELETE TO authenticated USING ((SELECT get_user_role()) IN ('admin', 'super_admin'));

-- sys_functions
DROP POLICY IF EXISTS "functions_admin_all" ON public.sys_functions;
DROP POLICY IF EXISTS "functions_read" ON public.sys_functions;

CREATE POLICY "functions_read" ON public.sys_functions FOR SELECT TO authenticated USING (true);
CREATE POLICY "functions_admin_insert" ON public.sys_functions FOR INSERT TO authenticated WITH CHECK ((SELECT get_user_role()) IN ('admin', 'super_admin'));
CREATE POLICY "functions_admin_update" ON public.sys_functions FOR UPDATE TO authenticated USING ((SELECT get_user_role()) IN ('admin', 'super_admin'));
CREATE POLICY "functions_admin_delete" ON public.sys_functions FOR DELETE TO authenticated USING ((SELECT get_user_role()) IN ('admin', 'super_admin'));

-- sys_positions
DROP POLICY IF EXISTS "positions_admin_all" ON public.sys_positions;
DROP POLICY IF EXISTS "positions_read" ON public.sys_positions;

CREATE POLICY "positions_read" ON public.sys_positions FOR SELECT TO authenticated USING (true);
CREATE POLICY "positions_admin_insert" ON public.sys_positions FOR INSERT TO authenticated WITH CHECK ((SELECT get_user_role()) IN ('admin', 'super_admin'));
CREATE POLICY "positions_admin_update" ON public.sys_positions FOR UPDATE TO authenticated USING ((SELECT get_user_role()) IN ('admin', 'super_admin'));
CREATE POLICY "positions_admin_delete" ON public.sys_positions FOR DELETE TO authenticated USING ((SELECT get_user_role()) IN ('admin', 'super_admin'));

-- sys_user_assignments
DROP POLICY IF EXISTS "user_assignments_admin_all" ON public.sys_user_assignments;
DROP POLICY IF EXISTS "user_assignments_read" ON public.sys_user_assignments;

CREATE POLICY "user_assignments_read" ON public.sys_user_assignments FOR SELECT TO authenticated USING (true);
CREATE POLICY "user_assignments_admin_insert" ON public.sys_user_assignments FOR INSERT TO authenticated WITH CHECK ((SELECT get_user_role()) IN ('admin', 'super_admin'));
CREATE POLICY "user_assignments_admin_update" ON public.sys_user_assignments FOR UPDATE TO authenticated USING ((SELECT get_user_role()) IN ('admin', 'super_admin'));
CREATE POLICY "user_assignments_admin_delete" ON public.sys_user_assignments FOR DELETE TO authenticated USING ((SELECT get_user_role()) IN ('admin', 'super_admin'));

-- themes
DROP POLICY IF EXISTS "themes_admin_all" ON public.themes;
DROP POLICY IF EXISTS "themes_public_select" ON public.themes;

CREATE POLICY "themes_public_select" ON public.themes FOR SELECT TO public USING (true);
CREATE POLICY "themes_admin_insert" ON public.themes FOR INSERT TO authenticated WITH CHECK ((SELECT get_user_role()) IN ('admin', 'super_admin'));
CREATE POLICY "themes_admin_update" ON public.themes FOR UPDATE TO authenticated USING ((SELECT get_user_role()) IN ('admin', 'super_admin'));
CREATE POLICY "themes_admin_delete" ON public.themes FOR DELETE TO authenticated USING ((SELECT get_user_role()) IN ('admin', 'super_admin'));

-- ============================================================
-- 8. Fix History Tables (Drop redundant SELECT policy)
-- ============================================================
DROP POLICY IF EXISTS "department_history_admin_read" ON public.sys_department_history;
DROP POLICY IF EXISTS "position_history_admin_read" ON public.sys_position_history;
