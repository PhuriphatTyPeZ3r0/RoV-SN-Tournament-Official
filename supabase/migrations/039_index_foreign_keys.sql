-- ============================================================
-- 039_index_foreign_keys.sql
-- Performance Optimization: Create covering indexes for unindexed foreign keys
-- ============================================================

-- public.registrations
CREATE INDEX IF NOT EXISTS idx_registrations_department_id ON public.registrations(department_id);
CREATE INDEX IF NOT EXISTS idx_registrations_position_id ON public.registrations(position_id);

-- public.sys_authorizations
CREATE INDEX IF NOT EXISTS idx_sys_authorizations_created_by ON public.sys_authorizations(created_by);
CREATE INDEX IF NOT EXISTS idx_sys_authorizations_updated_by ON public.sys_authorizations(updated_by);
CREATE INDEX IF NOT EXISTS idx_sys_authorizations_function_group_id ON public.sys_authorizations(function_group_id);

-- public.sys_change_requests
CREATE INDEX IF NOT EXISTS idx_sys_change_requests_created_by ON public.sys_change_requests(created_by);
CREATE INDEX IF NOT EXISTS idx_sys_change_requests_updated_by ON public.sys_change_requests(updated_by);
CREATE INDEX IF NOT EXISTS idx_sys_change_requests_user_id ON public.sys_change_requests(user_id);
CREATE INDEX IF NOT EXISTS idx_sys_change_requests_department_id ON public.sys_change_requests(department_id);
CREATE INDEX IF NOT EXISTS idx_sys_change_requests_position_id ON public.sys_change_requests(position_id);
CREATE INDEX IF NOT EXISTS idx_sys_change_requests_function_group_id ON public.sys_change_requests(function_group_id);

-- public.sys_department_history
CREATE INDEX IF NOT EXISTS idx_sys_department_history_created_by ON public.sys_department_history(created_by);
CREATE INDEX IF NOT EXISTS idx_sys_department_history_department_id ON public.sys_department_history(department_id);

-- public.sys_departments
CREATE INDEX IF NOT EXISTS idx_sys_departments_created_by ON public.sys_departments(created_by);
CREATE INDEX IF NOT EXISTS idx_sys_departments_updated_by ON public.sys_departments(updated_by);

-- public.sys_function_groups
CREATE INDEX IF NOT EXISTS idx_sys_function_groups_created_by ON public.sys_function_groups(created_by);
CREATE INDEX IF NOT EXISTS idx_sys_function_groups_updated_by ON public.sys_function_groups(updated_by);
CREATE INDEX IF NOT EXISTS idx_sys_function_groups_department_id ON public.sys_function_groups(department_id);
CREATE INDEX IF NOT EXISTS idx_sys_function_groups_position_id ON public.sys_function_groups(position_id);

-- public.sys_function_mappings
CREATE INDEX IF NOT EXISTS idx_sys_function_mappings_created_by ON public.sys_function_mappings(created_by);
CREATE INDEX IF NOT EXISTS idx_sys_function_mappings_updated_by ON public.sys_function_mappings(updated_by);
CREATE INDEX IF NOT EXISTS idx_sys_function_mappings_function_id ON public.sys_function_mappings(function_id);

-- public.sys_functions
CREATE INDEX IF NOT EXISTS idx_sys_functions_created_by ON public.sys_functions(created_by);
CREATE INDEX IF NOT EXISTS idx_sys_functions_updated_by ON public.sys_functions(updated_by);
CREATE INDEX IF NOT EXISTS idx_sys_functions_parent_id ON public.sys_functions(parent_id);

-- public.sys_position_history
CREATE INDEX IF NOT EXISTS idx_sys_position_history_created_by ON public.sys_position_history(created_by);
CREATE INDEX IF NOT EXISTS idx_sys_position_history_position_id ON public.sys_position_history(position_id);

-- public.sys_positions
CREATE INDEX IF NOT EXISTS idx_sys_positions_created_by ON public.sys_positions(created_by);
CREATE INDEX IF NOT EXISTS idx_sys_positions_updated_by ON public.sys_positions(updated_by);

-- public.sys_user_assignments
CREATE INDEX IF NOT EXISTS idx_sys_user_assignments_created_by ON public.sys_user_assignments(created_by);
CREATE INDEX IF NOT EXISTS idx_sys_user_assignments_updated_by ON public.sys_user_assignments(updated_by);
CREATE INDEX IF NOT EXISTS idx_sys_user_assignments_department_id ON public.sys_user_assignments(department_id);
CREATE INDEX IF NOT EXISTS idx_sys_user_assignments_position_id ON public.sys_user_assignments(position_id);

-- public.sys_user_logs
CREATE INDEX IF NOT EXISTS idx_sys_user_logs_actor_id ON public.sys_user_logs(actor_id);
CREATE INDEX IF NOT EXISTS idx_sys_user_logs_user_id ON public.sys_user_logs(user_id);

-- public.tournaments
CREATE INDEX IF NOT EXISTS idx_tournaments_theme_style ON public.tournaments(theme_style);
