-- ============================================================
-- 020_add_profiles_insert_policy.sql
-- Add INSERT policy for profiles table to support onboarding upserts
-- ============================================================

-- Create optimized INSERT policy for authenticated users on public.profiles
CREATE POLICY "profiles_insert_optimized" ON public.profiles
  FOR INSERT
  WITH CHECK (auth.uid() = id);

COMMENT ON POLICY "profiles_insert_optimized" ON public.profiles IS 'Optimized: Users can insert their own profile during registration/onboarding';
