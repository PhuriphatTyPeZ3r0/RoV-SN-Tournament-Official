-- ============================================================
-- 015_add_tournament_theme.sql
-- Add theme selection support to tournaments table
-- ============================================================

-- 1. Add theme_style column to public.tournaments
ALTER TABLE public.tournaments
ADD COLUMN IF NOT EXISTS theme_style TEXT NOT NULL DEFAULT 'echo'
CONSTRAINT check_valid_theme CHECK (theme_style IN ('echo', 'arena', 'cyberpunk', 'void'));

COMMENT ON COLUMN public.tournaments.theme_style IS 'Theme preset name for the tournament website style';
