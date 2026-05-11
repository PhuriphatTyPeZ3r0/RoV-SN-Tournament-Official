-- ============================================================
-- 001_initial_schema.sql
-- RoV SN Tournament — PostgreSQL Schema (Supabase)
-- Replaces: 7 Mongoose models → 9 normalized PostgreSQL tables
-- ============================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- 1. profiles — Central user identity (linked to auth.users)
--    Replaces: implicit admin user in authController.ts
-- ============================================================
CREATE TABLE public.profiles (
  id          UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username    TEXT UNIQUE NOT NULL,
  role        TEXT NOT NULL DEFAULT 'viewer'
              CHECK (role IN ('admin', 'player', 'viewer')),
  avatar_url  TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE public.profiles IS 'Central user profile — SSO identity linked to auth.users';

-- ============================================================
-- 2. tournaments — Multi-season support (new table)
-- ============================================================
CREATE TABLE public.tournaments (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name        TEXT NOT NULL,
  season      INT NOT NULL,
  status      TEXT NOT NULL DEFAULT 'active'
              CHECK (status IN ('draft', 'active', 'completed')),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE public.tournaments IS 'Tournament/season container for multi-season support';

-- ============================================================
-- 3. teams — Replaces: TeamLogo.ts (teamName + logoUrl)
-- ============================================================
CREATE TABLE public.teams (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name        TEXT UNIQUE NOT NULL,
  logo_url    TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE public.teams IS 'Team master data with logo — replaces TeamLogo Mongoose model';

-- ============================================================
-- 4. heroes — Replaces: Hero.ts (name + imageUrl)
-- ============================================================
CREATE TABLE public.heroes (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name        TEXT UNIQUE NOT NULL,
  image_url   TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE public.heroes IS 'Hero master data — replaces Hero Mongoose model';

-- ============================================================
-- 5. players — Replaces: PlayerPool.ts
--    Fields: name, grade, team, inGameName, previousIGNs, openId
-- ============================================================
CREATE TABLE public.players (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id      UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  team_id         UUID REFERENCES public.teams(id) ON DELETE SET NULL,
  name            TEXT NOT NULL,
  grade           TEXT,
  in_game_name    TEXT,
  previous_igns   TEXT[] NOT NULL DEFAULT '{}',
  open_id         TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE public.players IS 'Player pool — replaces PlayerPool Mongoose model';

-- ============================================================
-- 6. schedules — Replaces: Schedule.ts
--    Stores pot draws and round-robin fixture data as JSONB
-- ============================================================
CREATE TABLE public.schedules (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tournament_id   UUID NOT NULL REFERENCES public.tournaments(id) ON DELETE CASCADE,
  teams           TEXT[] NOT NULL DEFAULT '{}',
  pot_a           TEXT[] NOT NULL DEFAULT '{}',
  pot_b           TEXT[] NOT NULL DEFAULT '{}',
  schedule_data   JSONB NOT NULL DEFAULT '[]',
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE public.schedules IS 'Tournament fixture schedule — replaces Schedule Mongoose model';

-- ============================================================
-- 7. matches — Replaces: Result.ts (normalized)
--    matchDay mixed type (Number|String) → strict INT
-- ============================================================
CREATE TABLE public.matches (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tournament_id   UUID NOT NULL REFERENCES public.tournaments(id) ON DELETE CASCADE,
  match_key       TEXT UNIQUE NOT NULL,
  match_day       INT NOT NULL,
  team_blue_id    UUID REFERENCES public.teams(id) ON DELETE SET NULL,
  team_red_id     UUID REFERENCES public.teams(id) ON DELETE SET NULL,
  team_blue_name  TEXT NOT NULL,
  team_red_name   TEXT NOT NULL,
  score_blue      INT NOT NULL DEFAULT 0 CHECK (score_blue >= 0),
  score_red       INT NOT NULL DEFAULT 0 CHECK (score_red >= 0),
  winner_name     TEXT,
  loser_name      TEXT,
  is_bye_win      BOOLEAN NOT NULL DEFAULT FALSE,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE public.matches IS 'Match results — replaces Result Mongoose model. matchDay normalized to INT';

-- ============================================================
-- 8. match_games — Normalized from Result.gameDetails[]
--    Replaces embedded array with proper relational structure
-- ============================================================
CREATE TABLE public.match_games (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  match_id      UUID NOT NULL REFERENCES public.matches(id) ON DELETE CASCADE,
  game_number   INT NOT NULL CHECK (game_number > 0),
  winner_name   TEXT,
  duration      INT DEFAULT 0,
  UNIQUE(match_id, game_number)
);

COMMENT ON TABLE public.match_games IS 'Individual games within a match (BO3/BO5) — normalized from gameDetails[]';

-- ============================================================
-- 9. game_stats — Replaces: GameStat.ts
--    Per-player per-game statistics
-- ============================================================
CREATE TABLE public.game_stats (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  match_id        UUID NOT NULL REFERENCES public.matches(id) ON DELETE CASCADE,
  game_number     INT NOT NULL CHECK (game_number > 0),
  team_name       TEXT NOT NULL,
  player_name     TEXT NOT NULL,
  hero_name       TEXT NOT NULL,
  kills           INT NOT NULL DEFAULT 0 CHECK (kills >= 0),
  deaths          INT NOT NULL DEFAULT 0 CHECK (deaths >= 0),
  assists         INT NOT NULL DEFAULT 0 CHECK (assists >= 0),
  mvp             BOOLEAN NOT NULL DEFAULT FALSE,
  game_duration   INT NOT NULL DEFAULT 0,
  win             BOOLEAN NOT NULL DEFAULT FALSE,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE public.game_stats IS 'Per-player game statistics — replaces GameStat Mongoose model';

-- ============================================================
-- 10. match_history — Replaces: ResultHistory.ts (audit log)
-- ============================================================
CREATE TABLE public.match_history (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  match_key       TEXT NOT NULL,
  action          TEXT NOT NULL CHECK (action IN ('create', 'update', 'delete')),
  previous_data   JSONB,
  new_data        JSONB,
  changed_by      UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  reason          TEXT,
  changed_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE public.match_history IS 'Audit trail for match result changes — replaces ResultHistory Mongoose model';

-- ============================================================
-- Indexes for query performance
-- ============================================================
CREATE INDEX idx_players_team       ON public.players(team_id);
CREATE INDEX idx_players_ign        ON public.players(in_game_name);
CREATE INDEX idx_schedules_tour     ON public.schedules(tournament_id);
CREATE INDEX idx_matches_tour       ON public.matches(tournament_id);
CREATE INDEX idx_matches_day        ON public.matches(match_day);
CREATE INDEX idx_matches_key        ON public.matches(match_key);
CREATE INDEX idx_match_games_match  ON public.match_games(match_id);
CREATE INDEX idx_game_stats_match   ON public.game_stats(match_id);
CREATE INDEX idx_game_stats_player  ON public.game_stats(player_name);
CREATE INDEX idx_game_stats_hero    ON public.game_stats(hero_name);
CREATE INDEX idx_match_history_key  ON public.match_history(match_key);
CREATE INDEX idx_match_history_time ON public.match_history(changed_at DESC);

-- ============================================================
-- updated_at auto-refresh trigger
-- ============================================================
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER trg_matches_updated_at
  BEFORE UPDATE ON public.matches
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
