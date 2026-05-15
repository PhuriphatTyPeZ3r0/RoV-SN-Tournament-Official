'use server';

import { createClient } from '@/utils/supabase/server';
import { checkRole } from '@/utils/auth';

/**
 * Admin Dashboard Analytics Actions
 * Provides summarized data for the Tournament Command Center
 */

export async function promoteUserToAdminAction(userId: string) {
  await checkRole(['super_admin']);
  const supabase = await createClient();
  const { error } = await supabase
    .from('profiles')
    .update({ role: 'admin' })
    .eq('id', userId);
  
  if (error) throw new Error(error.message);
  return { success: true };
}

export async function getAllUsersWithRolesAction() {
  await checkRole(['super_admin']);
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('profiles')
    .select('id, username, role, student_id, created_at')
    .order('created_at', { ascending: false });
  
  if (error) throw new Error(error.message);
  return data;
}

export async function updateUserRoleAction(userId: string, newRole: string) {
  await checkRole(['super_admin']);
  const supabase = await createClient();
  const { error } = await supabase
    .from('profiles')
    .update({ role: newRole })
    .eq('id', userId);
  
  if (error) throw new Error(error.message);
  return { success: true };
}

async function getActiveTournamentId(supabase: any): Promise<string | null> {
  const { data } = await supabase
    .from('tournaments')
    .select('id')
    .eq('status', 'active')
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  return data?.id || null;
}

export async function getAdminDashboardKPIsAction() {
  const supabase = await createClient();
  const tournamentId = await getActiveTournamentId(supabase);

  // 1. Team Stats
  const { count: totalTeams } = await supabase
    .from('teams')
    .select('*', { count: 'exact', head: true });

  const { count: readyTeams } = await supabase
    .from('teams')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'ready');

  const { count: approvedTeams } = await supabase
    .from('teams')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'approved');

  // 2. Registration Stats
  const { count: pendingRegistrations } = await supabase
    .from('registrations')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'pending');

  // 3. Player Stats
  const { count: totalPlayers } = await supabase
    .from('players')
    .select('*', { count: 'exact', head: true });

  // 4. Tournament Progress (Matches)
  let matchesPlayed = 0;
  let totalMatches = 0;

  if (tournamentId) {
    const { count: played } = await supabase
      .from('matches')
      .select('*', { count: 'exact', head: true })
      .eq('tournament_id', tournamentId)
      .not('winner_name', 'is', null);
    
    const { count: total } = await supabase
      .from('matches')
      .select('*', { count: 'exact', head: true })
      .eq('tournament_id', tournamentId);
    
    matchesPlayed = played || 0;
    totalMatches = total || 0;
  }

  return {
    teams: {
      total: totalTeams || 0,
      ready: readyTeams || 0,
      approved: approvedTeams || 0,
      incomplete: (totalTeams || 0) - (readyTeams || 0) - (approvedTeams || 0)
    },
    registrations: {
      pending: pendingRegistrations || 0
    },
    players: {
      total: totalPlayers || 0
    },
    tournament: {
      played: matchesPlayed,
      total: totalMatches,
      progress: totalMatches > 0 ? Math.round((matchesPlayed / totalMatches) * 100) : 0
    }
  };
}

export async function getDashboardToDosAction() {
  const supabase = await createClient();
  
  // 1. Pending Registrations
  const { data: pendingRegs } = await supabase
    .from('registrations')
    .select('id, full_name, in_game_name, created_at')
    .eq('status', 'pending')
    .order('created_at', { ascending: true })
    .limit(3);

  // 2. Ready Teams needing Approval
  const { data: readyTeams } = await supabase
    .from('teams')
    .select('id, name, created_at')
    .eq('status', 'ready')
    .order('created_at', { ascending: true })
    .limit(3);

  // 3. Recent matches without results
  const { data: pendingMatches } = await supabase
    .from('matches')
    .select('match_key, team_blue_name, team_red_name, match_day')
    .is('winner_name', null)
    .order('match_day', { ascending: true })
    .limit(3);

  return {
    registrations: pendingRegs || [],
    teams: readyTeams || [],
    matches: pendingMatches || []
  };
}

export async function getRecentActivityAction(limit = 10) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('audit_logs')
    .select(`
      *,
      actor:profiles!actor_id(username)
    `)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching recent activity:', error);
    return [];
  }

  return data;
}

export async function getDashboardTopPerformersAction() {
  const supabase = await createClient();
  const tournamentId = await getActiveTournamentId(supabase);
  if (!tournamentId) return null;

  // Get Top 3 Players by KDA using existing RPC logic or simplified query
  const { data: players } = await supabase.rpc('get_player_leaderboard', {
    p_tournament_id: tournamentId
  });

  // Get Top 3 Heroes by Pick Rate
  const { data: heroStats } = await supabase
    .from('game_stats')
    .select('hero_name, match_id!inner(tournament_id)')
    .eq('match_id.tournament_id', tournamentId);

  const heroMap = new Map<string, number>();
  for (const row of heroStats || []) {
    heroMap.set(row.hero_name, (heroMap.get(row.hero_name) || 0) + 1);
  }

  const topHeroes = Array.from(heroMap.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 3);

  return {
    topPlayers: (players || []).slice(0, 3),
    topHeroes
  };
}
