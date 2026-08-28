import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { extractAccessToken, getSupabaseClient } from '../supabaseClient';

const router = Router();

const paramsSchema = z.object({
  tournamentId: z.string().uuid(),
});

/**
 * Wraps a route handler with param validation + a Supabase client built
 * from the caller's (optional) bearer token — mirrors how each Server
 * Action in the monolith called `createClient()` per-request.
 */
function handler(
  fn: (
    supabase: ReturnType<typeof getSupabaseClient>,
    tournamentId: string,
  ) => Promise<unknown>,
) {
  return async (req: Request, res: Response) => {
    const parsed = paramsSchema.safeParse(req.params);
    if (!parsed.success) {
      return res.status(400).json({ error: 'tournamentId must be a UUID' });
    }

    try {
      const token = extractAccessToken(req.headers.authorization);
      const supabase = getSupabaseClient(token);
      const data = await fn(supabase, parsed.data.tournamentId);
      return res.json({ data });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      return res.status(502).json({ error: message });
    }
  };
}

// ดึงตารางคะแนน — calls RPC: calculate_tournament_standings
router.get(
  '/standings/:tournamentId',
  handler(async (supabase, tournamentId) => {
    const { data, error } = await supabase.rpc('calculate_tournament_standings', {
      p_tournament_id: tournamentId,
    });
    if (error) throw new Error(`Failed to fetch standings: ${error.message}`);
    return data;
  }),
);

// ดึง Leaderboard ผู้เล่น — calls RPC: get_player_leaderboard
router.get(
  '/leaderboard/:tournamentId',
  handler(async (supabase, tournamentId) => {
    const { data, error } = await supabase.rpc('get_player_leaderboard', {
      p_tournament_id: tournamentId,
    });
    if (error) throw new Error(`Failed to fetch leaderboard: ${error.message}`);
    return data;
  }),
);

// ดึงภาพรวมสถิติซีซั่น — calls RPC: get_season_overview
router.get(
  '/season-overview/:tournamentId',
  handler(async (supabase, tournamentId) => {
    const { data, error } = await supabase.rpc('get_season_overview', {
      p_tournament_id: tournamentId,
    });
    if (error) throw new Error(`Failed to fetch season overview: ${error.message}`);
    return data;
  }),
);

// ดึงสถิติทีม — calls RPC: get_team_stats
router.get(
  '/team-stats/:tournamentId',
  handler(async (supabase, tournamentId) => {
    const { data, error } = await supabase.rpc('get_team_stats', {
      p_tournament_id: tournamentId,
    });
    if (error) throw new Error(`Failed to fetch team stats: ${error.message}`);
    return data;
  }),
);

// ดึง Hero stats จาก game_stats โดยตรง (ไม่ต้อง RPC เพราะ query เบา)
router.get(
  '/hero-stats/:tournamentId',
  handler(async (supabase, tournamentId) => {
    const { data, error } = await supabase
      .from('game_stats')
      .select('hero_name, win, match_id!inner(tournament_id)')
      .eq('match_id.tournament_id', tournamentId);
    if (error) throw new Error(`Failed to fetch hero stats: ${error.message}`);

    const heroMap = new Map<string, { picks: number; wins: number }>();
    for (const row of data || []) {
      const current = heroMap.get(row.hero_name) || { picks: 0, wins: 0 };
      current.picks++;
      if (row.win) current.wins++;
      heroMap.set(row.hero_name, current);
    }

    return Array.from(heroMap.entries())
      .map(([name, stats]) => ({
        name,
        picks: stats.picks,
        winRate:
          stats.picks > 0 ? Math.round((stats.wins / stats.picks) * 1000) / 10 : 0,
      }))
      .sort((a, b) => b.picks - a.picks);
  }),
);

export default router;
