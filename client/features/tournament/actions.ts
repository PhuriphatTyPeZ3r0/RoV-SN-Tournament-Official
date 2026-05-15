'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { checkRole } from '@/utils/auth';

/**
 * Tournament Core Server Actions
 * Replaces: resultController.ts + scheduleController.ts
 * Handles: matches, schedules, match results CRUD
 */

// ========================================
// READ Operations (Public)
// ========================================

export async function getMatchesAction(tournamentId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('matches')
    .select('*')
    .eq('tournament_id', tournamentId)
    .order('match_day', { ascending: true });

  if (error) throw new Error(`Failed to fetch matches: ${error.message}`);
  return data;
}

export async function getMatchByKeyAction(matchKey: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('matches')
    .select('*, match_games(*)')
    .eq('match_key', matchKey)
    .single();

  if (error) throw new Error(`Failed to fetch match: ${error.message}`);
  return data;
}

export async function getScheduleAction(tournamentId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('schedules')
    .select('*')
    .eq('tournament_id', tournamentId)
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  if (error && error.code !== 'PGRST116') {
    // PGRST116 = no rows found — ไม่ถือเป็น error
    throw new Error(`Failed to fetch schedule: ${error.message}`);
  }
  return data;
}

export async function getMatchStatsAction(matchId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('game_stats')
    .select('*')
    .eq('match_id', matchId)
    .order('game_number', { ascending: true })
    .order('team_name', { ascending: true });

  if (error) throw new Error(`Failed to fetch match stats: ${error.message}`);
  return data;
}

export async function getResultHistoryAction(matchKey?: string) {
  const supabase = await createClient();

  let query = supabase
    .from('audit_logs')
    .select(`
      *,
      actor:profiles!actor_id(username)
    `)
    .eq('table_name', 'matches')
    .order('created_at', { ascending: false })
    .limit(100);

  const { data, error } = await query;
  if (error) throw new Error(`Failed to fetch history: ${error.message}`);
  return data;
}

// ========================================
// WRITE Operations (Admin Only)
// ========================================

// Helper: verify admin session
async function requireAdmin() {
  const { user } = await checkRole(['admin', 'super_admin']);
  const supabase = await createClient();
  return { supabase, user };
}

export async function saveMatchResultAction(resultData: {
  tournamentId: string;
  matchDay: number;
  teamBlueName: string;
  teamRedName: string;
  scoreBlue: number;
  scoreRed: number;
  gameDetails?: { gameNumber: number; winnerName: string; duration?: number }[];
  isByeWin?: boolean;
  winner?: string;
}) {
  const { supabase, user } = await requireAdmin();

  const teamBlue = resultData.teamBlueName.trim();
  const teamRed = resultData.teamRedName.trim();
  const matchKey = `${resultData.matchDay}_${teamBlue}_vs_${teamRed}`.replace(/\s+/g, '');

  // Determine winner/loser
  let winnerName: string | null = null;
  let loserName: string | null = null;

  if (resultData.isByeWin) {
    winnerName = resultData.winner || teamBlue;
    loserName = winnerName === teamBlue ? teamRed : teamBlue;
  } else {
    if (resultData.scoreBlue > resultData.scoreRed) {
      winnerName = teamBlue;
      loserName = teamRed;
    } else {
      winnerName = teamRed;
      loserName = teamBlue;
    }
  }

  // Check existing for audit trail
  const { data: existing } = await supabase
    .from('matches')
    .select('*')
    .eq('match_key', matchKey)
    .maybeSingle();

  const matchPayload = {
    tournament_id: resultData.tournamentId,
    match_key: matchKey,
    match_day: resultData.matchDay,
    team_blue_name: teamBlue,
    team_red_name: teamRed,
    score_blue: resultData.scoreBlue,
    score_red: resultData.scoreRed,
    winner_name: winnerName,
    loser_name: loserName,
    is_bye_win: resultData.isByeWin || false,
  };

  // Upsert match
  const { data: match, error: matchError } = await supabase
    .from('matches')
    .upsert(matchPayload, { onConflict: 'match_key' })
    .select()
    .single();

  if (matchError) throw new Error(`Failed to save match: ${matchError.message}`);

  // Save game details (normalized)
  if (resultData.gameDetails?.length && match) {
    // Clear old game details first
    await supabase.from('match_games').delete().eq('match_id', match.id);

    const games = resultData.gameDetails.map((g) => ({
      match_id: match.id,
      game_number: g.gameNumber,
      winner_name: g.winnerName,
      duration: g.duration || 0,
    }));

    await supabase.from('match_games').insert(games);
  }

  // Audit trail
  await supabase.from('match_history').insert({
    match_key: matchKey,
    action: existing ? 'update' : 'create',
    previous_data: existing || null,
    new_data: matchPayload,
    changed_by: user.id,
  });

  revalidatePath('/standings');
  revalidatePath('/fixtures');
  revalidatePath('/');
  revalidatePath('/admin/results');

  return match;
}

export async function deleteMatchResultAction(matchKey: string, reason?: string) {
  const { supabase, user } = await requireAdmin();

  const { data: existing } = await supabase
    .from('matches')
    .select('*')
    .eq('match_key', matchKey)
    .maybeSingle();

  if (existing) {
    // Audit trail before delete
    await supabase.from('match_history').insert({
      match_key: matchKey,
      action: 'delete',
      previous_data: existing,
      new_data: null,
      changed_by: user.id,
      reason: reason || 'Manual deletion',
    });

    // CASCADE จะลบ match_games และ game_stats ด้วย
    await supabase.from('matches').delete().eq('match_key', matchKey);
  }

  revalidatePath('/standings');
  revalidatePath('/fixtures');
  revalidatePath('/admin/results');

  return { success: true, matchKey };
}

export async function resetDayResultsAction(
  tournamentId: string,
  day: number,
  reason?: string
) {
  const { supabase, user } = await requireAdmin();

  const { data: dayResults } = await supabase
    .from('matches')
    .select('*')
    .eq('tournament_id', tournamentId)
    .eq('match_day', day);

  // Audit each deletion
  if (dayResults?.length) {
    const historyEntries = dayResults.map((result) => ({
      match_key: result.match_key,
      action: 'delete' as const,
      previous_data: result,
      new_data: null,
      changed_by: user.id,
      reason: reason || `Day ${day} reset`,
    }));

    await supabase.from('match_history').insert(historyEntries);
  }

  await supabase
    .from('matches')
    .delete()
    .eq('tournament_id', tournamentId)
    .eq('match_day', day);

  revalidatePath('/standings');
  revalidatePath('/fixtures');
  revalidatePath('/admin/results');

  return { success: true, count: dayResults?.length || 0 };
}

export async function saveScheduleAction(scheduleData: {
  tournamentId: string;
  teams: string[];
  potA: string[];
  potB: string[];
  scheduleData: unknown[];
}) {
  const { supabase } = await requireAdmin();

  const { data, error } = await supabase
    .from('schedules')
    .insert({
      tournament_id: scheduleData.tournamentId,
      teams: scheduleData.teams,
      pot_a: scheduleData.potA,
      pot_b: scheduleData.potB,
      schedule_data: scheduleData.scheduleData,
    })
    .select()
    .single();

  if (error) throw new Error(`Failed to save schedule: ${error.message}`);

  revalidatePath('/fixtures');
  revalidatePath('/');

  return data;
}

export async function saveGameStatsAction(
  matchId: string,
  stats: {
    gameNumber: number;
    teamName: string;
    playerName: string;
    heroName: string;
    kills: number;
    deaths: number;
    assists: number;
    mvp: boolean;
    gameDuration: number;
    win: boolean;
  }[]
) {
  const { supabase } = await requireAdmin();

  // Clear existing stats for this match
  await supabase.from('game_stats').delete().eq('match_id', matchId);

  const rows = stats.map((s) => ({
    match_id: matchId,
    game_number: s.gameNumber,
    team_name: s.teamName,
    player_name: s.playerName,
    hero_name: s.heroName,
    kills: s.kills,
    deaths: s.deaths,
    assists: s.assists,
    mvp: s.mvp,
    game_duration: s.gameDuration,
    win: s.win,
  }));

  const { data, error } = await supabase
    .from('game_stats')
    .insert(rows)
    .select();

  if (error) throw new Error(`Failed to save stats: ${error.message}`);

  revalidatePath('/stats');

  return { count: data?.length || 0 };
}
