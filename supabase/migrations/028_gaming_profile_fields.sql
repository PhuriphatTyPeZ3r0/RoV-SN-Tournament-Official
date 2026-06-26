-- ============================================================
-- 028_gaming_profile_fields.sql
-- Gaming Profile: Rank, Secondary Role, Top Heroes, Experience Bio
-- ============================================================

-- 1. Add new gaming profile columns to players
ALTER TABLE public.players
ADD COLUMN IF NOT EXISTS current_rank TEXT,
ADD COLUMN IF NOT EXISTS secondary_role TEXT,
ADD COLUMN IF NOT EXISTS top_heroes TEXT[] NOT NULL DEFAULT '{}',
ADD COLUMN IF NOT EXISTS experience_bio TEXT;

-- 2. Constraint: secondary_role uses same values as lineup_role
DO $$
BEGIN
    ALTER TABLE public.players DROP CONSTRAINT IF EXISTS players_secondary_role_check;
    ALTER TABLE public.players
    ADD CONSTRAINT players_secondary_role_check
    CHECK (secondary_role IS NULL OR secondary_role IN ('dark_slayer', 'abyssal_dragon', 'mid_lane', 'jungle', 'support'));
EXCEPTION WHEN others THEN NULL;
END $$;

-- 3. Constraint: top_heroes max 3
DO $$
BEGIN
    ALTER TABLE public.players DROP CONSTRAINT IF EXISTS players_top_heroes_max_3;
    ALTER TABLE public.players
    ADD CONSTRAINT players_top_heroes_max_3
    CHECK (array_length(top_heroes, 1) IS NULL OR array_length(top_heroes, 1) <= 3);
EXCEPTION WHEN others THEN NULL;
END $$;

-- 4. Constraint: experience_bio max 500 chars
DO $$
BEGIN
    ALTER TABLE public.players DROP CONSTRAINT IF EXISTS players_experience_bio_max;
    ALTER TABLE public.players
    ADD CONSTRAINT players_experience_bio_max
    CHECK (experience_bio IS NULL OR length(experience_bio) <= 500);
EXCEPTION WHEN others THEN NULL;
END $$;

COMMENT ON COLUMN public.players.current_rank IS 'Current RoV rank tier (e.g. Diamond I, Conqueror)';
COMMENT ON COLUMN public.players.secondary_role IS 'Secondary preferred game position';
COMMENT ON COLUMN public.players.top_heroes IS 'Top 3 best heroes';
COMMENT ON COLUMN public.players.experience_bio IS 'Competition experience description (max 500 chars)';
