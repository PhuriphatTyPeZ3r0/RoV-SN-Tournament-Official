-- ============================================================
-- 004_core_rpcs.sql
-- Stored Procedures (RPC) — replaces Express controller logic
-- ============================================================

-- ============================================================
-- RPC 1: calculate_tournament_standings
-- Replaces: standingsController.ts (246 lines of MongoDB aggregation)
--
-- Logic ported from MongoDB $facet pipeline:
--   1. Split each match into blue/red perspective
--   2. Group by team, count W/L, sum scores
--   3. Calculate points (3 per win), game difference
--   4. Sort by pts DESC → gd DESC → gf DESC → name ASC
--   5. Include last-5-match form (W/L array)
-- ============================================================
CREATE OR REPLACE FUNCTION calculate_tournament_standings(p_tournament_id UUID)
RETURNS TABLE (
  team_name     TEXT,
  played        INT,
  wins          INT,
  losses        INT,
  points        INT,
  games_for     INT,
  games_against INT,
  game_diff     INT,
  form          TEXT[]
)
LANGUAGE plpgsql
STABLE  -- ไม่แก้ไขข้อมูล, ใช้ cache ได้
AS $$
BEGIN
  RETURN QUERY
  WITH team_records AS (
    -- มุมมองฝั่ง Blue
    SELECT
      m.team_blue_name  AS t_name,
      m.score_blue      AS score_for,
      m.score_red       AS score_against,
      m.winner_name,
      m.loser_name,
      m.is_bye_win,
      m.match_day
    FROM public.matches m
    WHERE m.tournament_id = p_tournament_id
      AND m.match_day < 10     -- ไม่รวม Knockout (matchDay >= 10)
      AND m.winner_name IS NOT NULL  -- มีผลการแข่งแล้ว

    UNION ALL

    -- มุมมองฝั่ง Red
    SELECT
      m.team_red_name,
      m.score_red,
      m.score_blue,
      m.winner_name,
      m.loser_name,
      m.is_bye_win,
      m.match_day
    FROM public.matches m
    WHERE m.tournament_id = p_tournament_id
      AND m.match_day < 10
      AND m.winner_name IS NOT NULL
  ),
  aggregated AS (
    SELECT
      tr.t_name,
      COUNT(*)::INT AS played,

      COUNT(*) FILTER (
        WHERE tr.t_name = tr.winner_name
      )::INT AS wins,

      COUNT(*) FILTER (
        WHERE tr.t_name = tr.loser_name
      )::INT AS losses,

      -- 3 แต้มต่อชนะ
      (COUNT(*) FILTER (WHERE tr.t_name = tr.winner_name) * 3)::INT AS points,

      -- Games For/Against (ไม่นับ bye wins)
      COALESCE(SUM(
        CASE WHEN NOT tr.is_bye_win THEN tr.score_for ELSE 0 END
      ), 0)::INT AS games_for,

      COALESCE(SUM(
        CASE WHEN NOT tr.is_bye_win THEN tr.score_against ELSE 0 END
      ), 0)::INT AS games_against,

      COALESCE(SUM(
        CASE WHEN NOT tr.is_bye_win
             THEN tr.score_for - tr.score_against
             ELSE 0 END
      ), 0)::INT AS game_diff,

      -- ฟอร์มล่าสุด 5 แมตช์ (เรียงจากล่าสุด)
      (ARRAY_AGG(
        CASE WHEN tr.t_name = tr.winner_name THEN 'W' ELSE 'L' END
        ORDER BY tr.match_day DESC
      ))[1:5] AS form

    FROM team_records tr
    GROUP BY tr.t_name
  )
  SELECT
    a.t_name,
    a.played,
    a.wins,
    a.losses,
    a.points,
    a.games_for,
    a.games_against,
    a.game_diff,
    a.form
  FROM aggregated a
  ORDER BY
    a.points DESC,
    a.game_diff DESC,
    a.games_for DESC,
    a.t_name ASC;
END;
$$;

COMMENT ON FUNCTION calculate_tournament_standings IS
  'คำนวณตารางคะแนนจากผลการแข่งขัน — replaces standingsController.ts';


-- ============================================================
-- RPC 2: get_player_leaderboard
-- Replaces: statsController.ts → getPlayerStats (125 lines)
--
-- Logic ported from MongoDB aggregation:
--   1. Lookup PlayerPool to resolve real names via previousIGNs
--   2. Group by realName + teamName
--   3. Calculate KDA, win rate, MVP rate, averages
--   4. Sort by KDA DESC → kills DESC → MVP DESC
-- ============================================================
CREATE OR REPLACE FUNCTION get_player_leaderboard(p_tournament_id UUID)
RETURNS TABLE (
  real_name         TEXT,
  player_name       TEXT,
  team_name         TEXT,
  games_played      BIGINT,
  total_kills       BIGINT,
  total_deaths      BIGINT,
  total_assists     BIGINT,
  mvp_count         BIGINT,
  wins              BIGINT,
  win_rate          NUMERIC,
  avg_kills         NUMERIC,
  avg_deaths        NUMERIC,
  avg_assists       NUMERIC,
  mvp_rate          NUMERIC,
  kda               NUMERIC
)
LANGUAGE plpgsql
STABLE
AS $$
BEGIN
  RETURN QUERY
  WITH resolved AS (
    -- Resolve IGN → real name ผ่านตาราง players
    -- ตรวจสอบ: inGameName, name, หรือ previousIGNs
    SELECT
      gs.player_name AS display_name,
      gs.team_name,
      gs.kills,
      gs.deaths,
      gs.assists,
      gs.mvp,
      gs.win,
      COALESCE(p.name, gs.player_name) AS resolved_name
    FROM public.game_stats gs
    JOIN public.matches m ON m.id = gs.match_id
    LEFT JOIN public.players p ON (
      p.in_game_name = gs.player_name
      OR p.name = gs.player_name
      OR gs.player_name = ANY(p.previous_igns)
    )
    WHERE m.tournament_id = p_tournament_id
  ),
  aggregated AS (
    SELECT
      r.resolved_name,
      -- ใช้ IGN ล่าสุดเป็น display name
      (ARRAY_AGG(r.display_name ORDER BY r.display_name))[1] AS latest_display,
      (ARRAY_AGG(r.team_name ORDER BY r.team_name))[1]       AS latest_team,
      COUNT(*)                                                AS gp,
      SUM(r.kills)                                            AS tk,
      SUM(r.deaths)                                           AS td,
      SUM(r.assists)                                          AS ta,
      SUM(CASE WHEN r.mvp THEN 1 ELSE 0 END)                 AS mc,
      SUM(CASE WHEN r.win THEN 1 ELSE 0 END)                 AS w
    FROM resolved r
    GROUP BY r.resolved_name
  )
  SELECT
    a.resolved_name,
    a.latest_display,
    a.latest_team,
    a.gp,
    a.tk,
    a.td,
    a.ta,
    a.mc,
    a.w,
    -- Win Rate (%)
    ROUND(a.w::NUMERIC / NULLIF(a.gp, 0) * 100, 1),
    -- Averages per game
    ROUND(a.tk::NUMERIC / NULLIF(a.gp, 0), 1),
    ROUND(a.td::NUMERIC / NULLIF(a.gp, 0), 1),
    ROUND(a.ta::NUMERIC / NULLIF(a.gp, 0), 1),
    -- MVP Rate (%)
    ROUND(a.mc::NUMERIC / NULLIF(a.gp, 0) * 100, 1),
    -- KDA = (K + A) / D, ถ้า D=0 ให้ใช้ K+A
    ROUND(
      (a.tk + a.ta)::NUMERIC / NULLIF(a.td, 0),
      2
    )
  FROM aggregated a
  ORDER BY
    kda DESC NULLS LAST,
    a.tk DESC,
    a.mc DESC;
END;
$$;

COMMENT ON FUNCTION get_player_leaderboard IS
  'สรุปสถิตินักกีฬา (KDA, MVP, Win Rate) — replaces statsController.getPlayerStats';


-- ============================================================
-- RPC 3: get_season_overview
-- Replaces: statsController.ts → getSeasonStats (106 lines)
--
-- Returns a JSON object with:
--   totalMatches, totalGames, avgGameDuration,
--   topMVPPlayer, topKillerPlayer, mostPickedHero, bestWinRateHero
-- ============================================================
CREATE OR REPLACE FUNCTION get_season_overview(p_tournament_id UUID)
RETURNS JSON
LANGUAGE plpgsql
STABLE
AS $$
DECLARE
  v_result JSON;
BEGIN
  WITH base_counts AS (
    SELECT
      COUNT(DISTINCT m.id) AS total_matches,
      COUNT(DISTINCT (gs.match_id, gs.game_number)) AS total_games,
      AVG(gs.game_duration) FILTER (WHERE gs.game_duration > 0) AS avg_duration
    FROM public.matches m
    LEFT JOIN public.game_stats gs ON gs.match_id = m.id
    WHERE m.tournament_id = p_tournament_id
      AND NOT m.is_bye_win
  ),
  top_mvp AS (
    SELECT gs.player_name AS name, gs.team_name AS team, COUNT(*) AS count
    FROM public.game_stats gs
    JOIN public.matches m ON m.id = gs.match_id
    WHERE m.tournament_id = p_tournament_id AND gs.mvp = TRUE
    GROUP BY gs.player_name, gs.team_name
    ORDER BY count DESC
    LIMIT 1
  ),
  top_killer AS (
    SELECT gs.player_name AS name, gs.team_name AS team, SUM(gs.kills) AS kills
    FROM public.game_stats gs
    JOIN public.matches m ON m.id = gs.match_id
    WHERE m.tournament_id = p_tournament_id
    GROUP BY gs.player_name, gs.team_name
    ORDER BY kills DESC
    LIMIT 1
  ),
  most_picked AS (
    SELECT
      gs.hero_name AS name,
      COUNT(*) AS picks,
      ROUND(
        SUM(CASE WHEN gs.win THEN 1 ELSE 0 END)::NUMERIC / NULLIF(COUNT(*), 0) * 100,
        1
      ) AS win_rate
    FROM public.game_stats gs
    JOIN public.matches m ON m.id = gs.match_id
    WHERE m.tournament_id = p_tournament_id
    GROUP BY gs.hero_name
    ORDER BY picks DESC
    LIMIT 1
  ),
  best_wr_hero AS (
    SELECT
      gs.hero_name AS name,
      COUNT(*) AS picks,
      ROUND(
        SUM(CASE WHEN gs.win THEN 1 ELSE 0 END)::NUMERIC / NULLIF(COUNT(*), 0) * 100,
        1
      ) AS win_rate
    FROM public.game_stats gs
    JOIN public.matches m ON m.id = gs.match_id
    WHERE m.tournament_id = p_tournament_id
    GROUP BY gs.hero_name
    HAVING COUNT(*) >= 5  -- อย่างน้อย 5 picks เพื่อลด bias
    ORDER BY win_rate DESC, picks DESC
    LIMIT 1
  ),
  best_team AS (
    SELECT
      gs.team_name AS name,
      CEIL(COUNT(*)::NUMERIC / 5) AS games,  -- 5 players per game
      CEIL(SUM(CASE WHEN gs.win THEN 1 ELSE 0 END)::NUMERIC / 5) AS team_wins
    FROM public.game_stats gs
    JOIN public.matches m ON m.id = gs.match_id
    WHERE m.tournament_id = p_tournament_id
    GROUP BY gs.team_name
    HAVING CEIL(COUNT(*)::NUMERIC / 5) >= 2
    ORDER BY
      (CEIL(SUM(CASE WHEN gs.win THEN 1 ELSE 0 END)::NUMERIC / 5))::NUMERIC
        / NULLIF(CEIL(COUNT(*)::NUMERIC / 5), 0) DESC
    LIMIT 1
  )
  SELECT json_build_object(
    'totalMatches',    (SELECT total_matches FROM base_counts),
    'totalGames',      (SELECT total_games FROM base_counts),
    'avgGameDuration', ROUND((SELECT avg_duration FROM base_counts)::NUMERIC, 0),
    'topMVPPlayer',    (SELECT CASE WHEN EXISTS (SELECT 1 FROM top_mvp)
                               THEN (SELECT row_to_json(t) FROM top_mvp t)
                               ELSE NULL END),
    'topKillerPlayer', (SELECT CASE WHEN EXISTS (SELECT 1 FROM top_killer)
                               THEN (SELECT row_to_json(t) FROM top_killer t)
                               ELSE NULL END),
    'mostPickedHero',  (SELECT CASE WHEN EXISTS (SELECT 1 FROM most_picked)
                               THEN (SELECT row_to_json(t) FROM most_picked t)
                               ELSE NULL END),
    'bestWinRateHero', (SELECT CASE WHEN EXISTS (SELECT 1 FROM best_wr_hero)
                               THEN (SELECT row_to_json(t) FROM best_wr_hero t)
                               ELSE NULL END),
    'bestTeam',        (SELECT CASE WHEN EXISTS (SELECT 1 FROM best_team)
                               THEN (SELECT json_build_object(
                                 'name', bt.name,
                                 'wins', bt.team_wins,
                                 'games', bt.games,
                                 'winRate', ROUND(bt.team_wins::NUMERIC / NULLIF(bt.games, 0) * 100, 1)
                               ) FROM best_team bt)
                               ELSE NULL END)
  ) INTO v_result;

  RETURN v_result;
END;
$$;

COMMENT ON FUNCTION get_season_overview IS
  'สรุปสถิติรวมทั้ง Season (MVP, Top Killer, Hero Stats) — replaces statsController.getSeasonStats';


-- ============================================================
-- RPC 4: get_team_stats
-- Replaces: statsController.ts → getTeamStats
-- ============================================================
CREATE OR REPLACE FUNCTION get_team_stats(p_tournament_id UUID)
RETURNS TABLE (
  team_name          TEXT,
  total_kills        BIGINT,
  total_deaths       BIGINT,
  total_assists      BIGINT,
  mvp_count          BIGINT,
  real_games_played  NUMERIC,
  real_wins          NUMERIC,
  real_losses        NUMERIC,
  avg_kills_per_game NUMERIC,
  avg_deaths_per_game NUMERIC,
  avg_assists_per_game NUMERIC,
  kda                NUMERIC,
  win_rate           NUMERIC
)
LANGUAGE plpgsql
STABLE
AS $$
BEGIN
  RETURN QUERY
  WITH raw AS (
    SELECT
      gs.team_name,
      SUM(gs.kills)                              AS tk,
      SUM(gs.deaths)                             AS td,
      SUM(gs.assists)                            AS ta,
      COUNT(*)                                    AS individual_rows,
      SUM(CASE WHEN gs.mvp THEN 1 ELSE 0 END)   AS mc,
      SUM(CASE WHEN gs.win THEN 1 ELSE 0 END)   AS individual_wins
    FROM public.game_stats gs
    JOIN public.matches m ON m.id = gs.match_id
    WHERE m.tournament_id = p_tournament_id
    GROUP BY gs.team_name
  )
  SELECT
    r.team_name,
    r.tk,
    r.td,
    r.ta,
    r.mc,
    -- 5 players per game → divide by 5 for actual game count
    CEIL(r.individual_rows::NUMERIC / 5)  AS real_games_played,
    CEIL(r.individual_wins::NUMERIC / 5)  AS real_wins,
    CEIL(r.individual_rows::NUMERIC / 5) - CEIL(r.individual_wins::NUMERIC / 5) AS real_losses,
    ROUND(r.tk::NUMERIC / NULLIF(r.individual_rows::NUMERIC / 5, 0), 1),
    ROUND(r.td::NUMERIC / NULLIF(r.individual_rows::NUMERIC / 5, 0), 1),
    ROUND(r.ta::NUMERIC / NULLIF(r.individual_rows::NUMERIC / 5, 0), 1),
    ROUND((r.tk + r.ta)::NUMERIC / NULLIF(r.td, 0), 2),
    ROUND(
      CEIL(r.individual_wins::NUMERIC / 5)
      / NULLIF(CEIL(r.individual_rows::NUMERIC / 5), 0) * 100,
      1
    )
  FROM raw r
  ORDER BY win_rate DESC NULLS LAST, real_wins DESC, kda DESC NULLS LAST;
END;
$$;

COMMENT ON FUNCTION get_team_stats IS
  'สถิติรวมของทีม (KDA, Win Rate, Averages) — replaces statsController.getTeamStats';
