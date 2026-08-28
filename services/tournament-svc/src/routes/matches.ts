import { Router } from 'express';
import { action } from '../actionHandler';
import { requireAdmin } from '../requireAdmin';

const router = Router();

// GET /tournaments — getTournamentsAction (features/tournament/actions.ts)
router.get(
  '/tournaments',
  action(async (supabase) => {
    const { data, error } = await supabase
      .from('tournaments')
      .select('*')
      .order('season', { ascending: false });
    if (error) throw new Error(`Failed to fetch tournaments: ${error.message}`);
    return data;
  }),
);

// GET /tournaments/active — getActiveTournamentsAction (matchmaking-actions.ts)
router.get(
  '/tournaments/active',
  action(async (supabase) => {
    const { data, error } = await supabase
      .from('tournaments')
      .select('id, name, season')
      .eq('status', 'active');
    if (error) {
      console.error('Error fetching tournaments:', error);
      return [];
    }
    return data;
  }),
);

// GET /teams/ready — getReadyTeamsAction (matchmaking-actions.ts)
router.get(
  '/teams/ready',
  action(async (supabase) => {
    const { data, error } = await supabase
      .from('teams')
      .select('id, name, logo_url, status')
      .eq('status', 'ready');
    if (error) {
      console.error('Error fetching ready teams:', error);
      return [];
    }
    return data;
  }),
);

// GET /matches/:tournamentId — getMatchesAction (actions.ts)
router.get(
  '/matches/:tournamentId',
  action(async (supabase, _token, req) => {
    const { tournamentId } = req.params;
    const { data, error } = await supabase
      .from('matches')
      .select('*')
      .eq('tournament_id', tournamentId)
      .order('match_day', { ascending: true });
    if (error) throw new Error(`Failed to fetch matches: ${error.message}`);
    return data;
  }),
);

// GET /matches/:tournamentId/day/:matchDay — getMatchesByDayAction (matchmaking-actions.ts)
router.get(
  '/matches/:tournamentId/day/:matchDay',
  action(async (supabase, _token, req) => {
    const { tournamentId, matchDay } = req.params;
    const { data, error } = await supabase
      .from('matches')
      .select('*')
      .eq('tournament_id', tournamentId)
      .eq('match_day', Number(matchDay))
      .order('created_at', { ascending: true });
    if (error) {
      console.error('Error fetching matches by day:', error);
      return [];
    }
    return data;
  }),
);

// GET /matches/:matchId/stats — getMatchStatsAction (result-actions.ts version — the live one)
router.get(
  '/matches/:matchId/stats',
  action(async (supabase, _token, req) => {
    const { matchId } = req.params;
    const { data, error } = await supabase
      .from('game_stats')
      .select('*')
      .eq('match_id', matchId)
      .order('game_number', { ascending: true });
    if (error) return [];
    return data;
  }),
);

// GET /results/history?matchKey=... — getResultHistoryAction (actions.ts)
router.get(
  '/results/history',
  action(async (supabase) => {
    const { data, error } = await supabase
      .from('audit_logs')
      .select('*, actor:profiles!actor_id(username)')
      .eq('table_name', 'matches')
      .order('created_at', { ascending: false })
      .limit(100);
    if (error) throw new Error(`Failed to fetch history: ${error.message}`);
    return data;
  }),
);

// POST /draw/generate — generateDrawAction (matchmaking-actions.ts, admin only)
router.post(
  '/draw/generate',
  action(async (supabase, token, req) => {
    await requireAdmin(supabase, token);
    const { tournamentId, matchDay } = req.body as { tournamentId: string; matchDay: number };

    const { data: teams, error: teamsError } = await supabase
      .from('teams')
      .select('id, name')
      .eq('status', 'ready');

    if (teamsError) throw new Error(teamsError.message);
    if (!teams || teams.length < 2) {
      throw new Error('ต้องการอย่างน้อย 2 ทีมเพื่อจัดสายการแข่งขัน');
    }

    const shuffledTeams = [...teams];
    for (let i = shuffledTeams.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledTeams[i], shuffledTeams[j]] = [shuffledTeams[j], shuffledTeams[i]];
    }

    const matches: Record<string, unknown>[] = [];
    for (let i = 0; i < shuffledTeams.length; i += 2) {
      if (i + 1 < shuffledTeams.length) {
        const teamBlue = shuffledTeams[i];
        const teamRed = shuffledTeams[i + 1];
        const matchKey = `Day${matchDay}_${teamBlue.name}_vs_${teamRed.name}`.replace(/\s+/g, '');

        matches.push({
          tournament_id: tournamentId,
          match_key: matchKey,
          match_day: matchDay,
          team_blue_id: teamBlue.id,
          team_red_id: teamRed.id,
          team_blue_name: teamBlue.name,
          team_red_name: teamRed.name,
          score_blue: 0,
          score_red: 0,
        });
      } else {
        const teamBlue = shuffledTeams[i];
        const matchKey = `Day${matchDay}_${teamBlue.name}_Bye`.replace(/\s+/g, '');
        matches.push({
          tournament_id: tournamentId,
          match_key: matchKey,
          match_day: matchDay,
          team_blue_id: teamBlue.id,
          team_blue_name: teamBlue.name,
          team_red_name: 'BYE',
          score_blue: 1,
          score_red: 0,
          winner_name: teamBlue.name,
          is_bye_win: true,
        });
      }
    }

    const { error: insertError } = await supabase.from('matches').insert(matches);
    if (insertError) throw new Error(`Failed to generate matches: ${insertError.message}`);

    return { success: true, count: matches.length };
  }),
);

// POST /draw/clear — clearDrawAction (matchmaking-actions.ts, admin only)
router.post(
  '/draw/clear',
  action(async (supabase, token, req) => {
    await requireAdmin(supabase, token);
    const { tournamentId, matchDay } = req.body as { tournamentId: string; matchDay: number };

    const { error } = await supabase
      .from('matches')
      .delete()
      .eq('tournament_id', tournamentId)
      .eq('match_day', matchDay);

    if (error) throw new Error(`Failed to clear draw: ${error.message}`);
    return { success: true };
  }),
);

// PATCH /matches/:matchId/result — updateMatchResultAction (result-actions.ts, admin only)
router.patch(
  '/matches/:matchId/result',
  action(async (supabase, token, req) => {
    await requireAdmin(supabase, token);
    const { matchId } = req.params;
    const resultData = req.body as {
      scoreBlue: number;
      scoreRed: number;
      winner: string;
      isByeWin?: boolean;
      mvp?: string;
    };

    const { data: match } = await supabase
      .from('matches')
      .select('team_blue_name, team_red_name')
      .eq('id', matchId)
      .single();

    if (!match) throw new Error('Match not found');

    let loser = '';
    if (resultData.winner === match.team_blue_name) {
      loser = match.team_red_name;
    } else if (resultData.winner === match.team_red_name) {
      loser = match.team_blue_name;
    }

    const { error } = await supabase
      .from('matches')
      .update({
        score_blue: resultData.scoreBlue,
        score_red: resultData.scoreRed,
        winner_name: resultData.winner,
        loser_name: loser,
        is_bye_win: resultData.isByeWin || false,
        mvp_player: resultData.mvp || null,
      })
      .eq('id', matchId);

    if (error) throw new Error(error.message);
    return { success: true };
  }),
);

interface PlayerStatInput {
  name: string;
  hero: string;
  k: number;
  d: number;
  a: number;
}

// POST /matches/:matchId/stats — saveGameStatsAction (result-actions.ts, admin only)
router.post(
  '/matches/:matchId/stats',
  action(async (supabase, token, req) => {
    await requireAdmin(supabase, token);
    const { matchId } = req.params;
    const stats = req.body as {
      gameNumber: number;
      blueTeam: string;
      redTeam: string;
      winner: 'blue' | 'red';
      mvp: string;
      duration: string;
      blueStats: PlayerStatInput[];
      redStats: PlayerStatInput[];
    };

    await supabase
      .from('game_stats')
      .delete()
      .eq('match_id', matchId)
      .eq('game_number', stats.gameNumber);

    let durationSeconds = 0;
    if (stats.duration) {
      const parts = stats.duration.split(':');
      if (parts.length === 2) {
        durationSeconds = parseInt(parts[0]) * 60 + parseInt(parts[1]);
      }
    }

    const rows: Record<string, unknown>[] = [];
    const isBlueWin = stats.winner === 'blue';

    for (const p of stats.blueStats) {
      if (!p.name) continue;
      rows.push({
        match_id: matchId,
        game_number: stats.gameNumber,
        team_name: stats.blueTeam,
        player_name: p.name,
        hero_name: p.hero,
        kills: p.k || 0,
        deaths: p.d || 0,
        assists: p.a || 0,
        mvp: stats.mvp === p.name,
        game_duration: durationSeconds,
        win: isBlueWin,
      });
    }

    for (const p of stats.redStats) {
      if (!p.name) continue;
      rows.push({
        match_id: matchId,
        game_number: stats.gameNumber,
        team_name: stats.redTeam,
        player_name: p.name,
        hero_name: p.hero,
        kills: p.k || 0,
        deaths: p.d || 0,
        assists: p.a || 0,
        mvp: stats.mvp === p.name,
        game_duration: durationSeconds,
        win: !isBlueWin,
      });
    }

    if (rows.length > 0) {
      const { error } = await supabase.from('game_stats').insert(rows);
      if (error) throw new Error(error.message);
    }

    await supabase.from('match_games').upsert(
      {
        match_id: matchId,
        game_number: stats.gameNumber,
        winner_name: stats.winner === 'blue' ? stats.blueTeam : stats.redTeam,
        duration: durationSeconds,
      },
      { onConflict: 'match_id, game_number' },
    );

    return { success: true };
  }),
);

export default router;
