'use server';

import { createClient } from '@/utils/supabase/server';

/**
 * Analytics & Standings Server Actions
 * Replaces: standingsController.ts + statsController.ts
 * All heavy computation is done by PostgreSQL RPCs
 */

// ดึงตารางคะแนน — calls RPC: calculate_tournament_standings
export async function getStandingsAction(tournamentId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc('calculate_tournament_standings', {
    p_tournament_id: tournamentId,
  });

  if (error) throw new Error(`Failed to fetch standings: ${error.message}`);
  return data;
}

// ดึง Leaderboard ผู้เล่น — calls RPC: get_player_leaderboard
export async function getPlayerLeaderboardAction(tournamentId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc('get_player_leaderboard', {
    p_tournament_id: tournamentId,
  });

  if (error) throw new Error(`Failed to fetch leaderboard: ${error.message}`);
  return data;
}

// ดึงภาพรวมสถิติซีซั่น — calls RPC: get_season_overview
export async function getSeasonOverviewAction(tournamentId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc('get_season_overview', {
    p_tournament_id: tournamentId,
  });

  if (error) throw new Error(`Failed to fetch season overview: ${error.message}`);
  return data;
}

// ดึงสถิติทีม — calls RPC: get_team_stats
export async function getTeamStatsAction(tournamentId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc('get_team_stats', {
    p_tournament_id: tournamentId,
  });

  if (error) throw new Error(`Failed to fetch team stats: ${error.message}`);
  return data;
}

// ดึง Hero stats จาก game_stats โดยตรง (ไม่ต้อง RPC เพราะ query เบา)
export async function getHeroPickStatsAction(tournamentId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('game_stats')
    .select('hero_name, win, match_id!inner(tournament_id)')
    .eq('match_id.tournament_id', tournamentId);

  if (error) throw new Error(`Failed to fetch hero stats: ${error.message}`);

  // Aggregate ฝั่ง server เพราะข้อมูลน้อย
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
      winRate: stats.picks > 0
        ? Math.round((stats.wins / stats.picks) * 1000) / 10
        : 0,
    }))
    .sort((a, b) => b.picks - a.picks);
}
