'use client';

/**
 * Client-side API Service — MIGRATED TO SUPABASE
 *
 * Drop-in replacement: same interface, Supabase backend.
 * Admin pages import this for both reads (getTeams, getSchedule, etc.)
 * and writes (createResult, saveGameStats, etc.).
 *
 * All mutations now go through Supabase directly via the browser client.
 * Auth is handled by Supabase session cookies (set by middleware).
 */

import { createClient } from '@/utils/supabase/client';
import type {
    Team,
    Player,
    MatchResult,
    Standing,
    ScheduleItem,
    PlayerStat,
    TeamStat,
    SeasonStats,
    Hero,
    PlayerHeroStat,
} from '@/types';

// ── Helper: get active tournament ID (client-side) ────────────
async function getActiveTournamentId(): Promise<string | null> {
    const supabase = createClient();
    const { data } = await supabase
        .from('tournaments')
        .select('id')
        .eq('status', 'active')
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

    return data?.id || null;
}

export const apiService = {
    // ── Reads ──────────────────────────────────────────────────

    getTeams: async (): Promise<Team[]> => {
        const supabase = createClient();
        const { data, error } = await supabase
            .from('teams')
            .select('id, name, logo_url')
            .order('name', { ascending: true });

        if (error) throw new Error(error.message);
        return (data || []).map(t => ({
            _id: t.id,
            name: t.name,
            logo: t.logo_url || '',
            logoShort: t.logo_url || '',
        }));
    },

    getTeamStats: async (): Promise<TeamStat[]> => {
        const tournamentId = await getActiveTournamentId();
        if (!tournamentId) return [];

        const supabase = createClient();
        const { data, error } = await supabase.rpc('get_team_stats', {
            p_tournament_id: tournamentId,
        });

        if (error) throw new Error(error.message);
        return (data || []).map((t: Record<string, unknown>) => ({
            teamName: t.team_name as string,
            totalKills: Number(t.total_kills) || 0,
            totalDeaths: Number(t.total_deaths) || 0,
            totalAssists: Number(t.total_assists) || 0,
            mvpCount: Number(t.mvp_count) || 0,
            realGamesPlayed: Number(t.real_games_played) || 0,
            realWins: Number(t.real_wins) || 0,
            avgKillsPerGame: Number(t.avg_kills_per_game) || 0,
            avgDeathsPerGame: Number(t.avg_deaths_per_game) || 0,
            avgAssistsPerGame: Number(t.avg_assists_per_game) || 0,
            avgDuration: 0,
            kda: Number(t.kda) || 0,
            winRate: Number(t.win_rate) || 0,
            realLosses: Number(t.real_losses) || 0,
        }));
    },

    getPlayers: async (): Promise<Player[]> => {
        const supabase = createClient();
        const { data, error } = await supabase
            .from('players')
            .select('id, name, team_name, in_game_name, previous_igns, created_at')
            .order('name', { ascending: true });

        if (error) throw new Error(error.message);
        return (data || []).map(p => ({
            _id: p.id,
            name: p.name,
            team: p.team_name || undefined,
            inGameName: p.in_game_name || undefined,
            previousIGNs: p.previous_igns || [],
            createdAt: p.created_at,
        }));
    },

    getPlayerStats: async (): Promise<PlayerStat[]> => {
        const tournamentId = await getActiveTournamentId();
        if (!tournamentId) return [];

        const supabase = createClient();
        const { data, error } = await supabase.rpc('get_player_leaderboard', {
            p_tournament_id: tournamentId,
        });

        if (error) throw new Error(error.message);
        return (data || []).map((p: Record<string, unknown>) => ({
            realName: p.real_name as string,
            playerName: p.player_name as string,
            teamName: p.team_name as string,
            totalKills: Number(p.total_kills) || 0,
            totalDeaths: Number(p.total_deaths) || 0,
            totalAssists: Number(p.total_assists) || 0,
            gamesPlayed: Number(p.games_played) || 0,
            mvpCount: Number(p.mvp_count) || 0,
            wins: Number(p.wins) || 0,
            winRate: Number(p.win_rate) || 0,
            avgKillsPerGame: Number(p.avg_kills) || 0,
            avgDeathsPerGame: Number(p.avg_deaths) || 0,
            avgAssistsPerGame: Number(p.avg_assists) || 0,
            mvpRate: Number(p.mvp_rate) || 0,
            kda: Number(p.kda) || 0,
        }));
    },

    getPlayerHeroStats: async (): Promise<PlayerHeroStat[]> => {
        const tournamentId = await getActiveTournamentId();
        if (!tournamentId) return [];

        const supabase = createClient();
        const { data, error } = await supabase
            .from('game_stats')
            .select('player_name, hero_name, win');

        if (error) throw new Error(error.message);

        const map = new Map<string, Map<string, { gp: number; w: number; k: number; d: number; a: number }>>();
        for (const row of data || []) {
            if (!map.has(row.player_name)) map.set(row.player_name, new Map());
            const heroMap = map.get(row.player_name)!;
            const cur = heroMap.get(row.hero_name) || { gp: 0, w: 0, k: 0, d: 0, a: 0 };
            cur.gp++;
            if (row.win) cur.w++;
            heroMap.set(row.hero_name, cur);
        }

        return Array.from(map.entries()).map(([playerName, heroMap]) => ({
            realName: playerName,
            playerName,
            topHeroes: Array.from(heroMap.entries())
                .map(([heroName, stats]) => ({
                    heroName,
                    gamesPlayed: stats.gp,
                    wins: stats.w,
                    totalKills: stats.k,
                    totalDeaths: stats.d,
                    totalAssists: stats.a,
                }))
                .sort((a, b) => b.gamesPlayed - a.gamesPlayed)
                .slice(0, 3),
        }));
    },

    getResults: async (): Promise<MatchResult[]> => {
        const tournamentId = await getActiveTournamentId();
        if (!tournamentId) return [];

        const supabase = createClient();
        const { data, error } = await supabase
            .from('matches')
            .select('*')
            .eq('tournament_id', tournamentId)
            .order('match_day', { ascending: true });

        if (error) throw new Error(error.message);
        return (data || []).map(m => ({
            _id: m.id,
            matchId: m.match_key,
            matchDay: m.match_day,
            teamBlue: m.team_blue_name,
            teamRed: m.team_red_name,
            scoreBlue: m.score_blue,
            scoreRed: m.score_red,
            winner: m.winner_name,
            loser: m.loser_name,
            gameDetails: [],
            isByeWin: m.is_bye_win,
            mvp: m.mvp_player || '',
            createdAt: m.created_at,
        }));
    },

    getSchedule: async (): Promise<ScheduleItem> => {
        const tournamentId = await getActiveTournamentId();
        if (!tournamentId) return { _id: '', teams: [], potA: [], potB: [], schedule: [], createdAt: '' };

        const supabase = createClient();
        const { data, error } = await supabase
            .from('schedules')
            .select('*')
            .eq('tournament_id', tournamentId)
            .order('created_at', { ascending: false })
            .limit(1)
            .maybeSingle();

        if (error) throw new Error(error.message);

        if (!data) return { _id: '', teams: [], potA: [], potB: [], schedule: [], createdAt: '' };

        // schedule_data is JSON — convert to the legacy shape
        const raw = (data.schedule_data as { day: number; date?: string; matches: { teamA?: string; teamB?: string; blue?: string; red?: string; time?: string; date?: string }[] }[]) || [];
        const schedule = raw.map(round => ({
            day: round.day,
            date: round.date,
            matches: (round.matches || []).map(m => ({
                teamA: m.teamA || m.blue || '',
                teamB: m.teamB || m.red || '',
                blue: m.teamA || m.blue || '',
                red: m.teamB || m.red || '',
                time: m.time,
                date: m.date,
            })),
        }));

        return {
            _id: data.id,
            teams: data.teams || [],
            potA: [],
            potB: [],
            schedule,
            createdAt: data.created_at,
        } as unknown as ScheduleItem;
    },

    getStandings: async (): Promise<Standing[]> => {
        const tournamentId = await getActiveTournamentId();
        if (!tournamentId) return [];

        const supabase = createClient();
        const { data, error } = await supabase.rpc('calculate_tournament_standings', {
            p_tournament_id: tournamentId,
        });

        if (error) throw new Error(error.message);
        return (data || []).map((s: Record<string, unknown>) => ({
            team: s.team_name as string,
            name: s.team_name as string,
            played: Number(s.played) || 0,
            won: Number(s.wins) || 0,
            lost: Number(s.losses) || 0,
            points: Number(s.points) || 0,
            pts: Number(s.points) || 0,
            w: Number(s.wins) || 0,
            l: Number(s.losses) || 0,
            gd: Number(s.game_diff) || 0,
            gamesWon: Number(s.games_won) || 0,
            gamesLost: Number(s.games_lost) || 0,
            gameDiff: Number(s.game_diff) || 0,
        }));
    },

    getSeasonStats: async (): Promise<SeasonStats> => {
        const tournamentId = await getActiveTournamentId();
        if (!tournamentId) return {} as SeasonStats;

        const supabase = createClient();
        const { data, error } = await supabase.rpc('get_season_overview', {
            p_tournament_id: tournamentId,
        });

        if (error) throw new Error(error.message);
        return data as SeasonStats;
    },

    getHeroes: async (): Promise<Hero[]> => {
        const supabase = createClient();
        const { data, error } = await supabase
            .from('heroes')
            .select('*')
            .order('name', { ascending: true });

        if (error) throw new Error(error.message);
        return (data || []).map(h => ({
            _id: h.id,
            name: h.name,
            imageUrl: h.image_url || '',
            createdAt: h.created_at,
        }));
    },

    // ── Writes (Mutations) ─────────────────────────────────────

    createResult: async (resultData: Partial<MatchResult & { blueTeam?: string; redTeam?: string }>): Promise<MatchResult> => {
        const supabase = createClient();
        const tournamentId = await getActiveTournamentId();
        if (!tournamentId) throw new Error('No active tournament found');

        const matchKey = resultData.matchId || '';
        const matchDay = parseInt(String(matchKey.split('_')[0])) || 0;

        const upsertData = {
            tournament_id: tournamentId,
            match_key: matchKey,
            match_day: matchDay,
            team_blue_name: resultData.blueTeam || resultData.teamBlue || '',
            team_red_name: resultData.redTeam || resultData.teamRed || '',
            score_blue: resultData.scoreBlue || 0,
            score_red: resultData.scoreRed || 0,
            winner_name: resultData.winner || '',
            loser_name: '',
            is_bye_win: resultData.isByeWin || false,
            mvp_player: resultData.mvp || null,
        };

        // Determine loser
        if (upsertData.winner_name === upsertData.team_blue_name) {
            upsertData.loser_name = upsertData.team_red_name;
        } else if (upsertData.winner_name === upsertData.team_red_name) {
            upsertData.loser_name = upsertData.team_blue_name;
        }

        // Upsert by match_key + tournament_id
        const { data: existing } = await supabase
            .from('matches')
            .select('id')
            .eq('tournament_id', tournamentId)
            .eq('match_key', matchKey)
            .maybeSingle();

        let result;
        if (existing) {
            const { data, error } = await supabase
                .from('matches')
                .update(upsertData)
                .eq('id', existing.id)
                .select()
                .single();
            if (error) throw new Error(error.message);
            result = data;
        } else {
            const { data, error } = await supabase
                .from('matches')
                .insert(upsertData)
                .select()
                .single();
            if (error) throw new Error(error.message);
            result = data;
        }

        return {
            _id: result.id,
            matchId: result.match_key,
            matchDay: result.match_day,
            teamBlue: result.team_blue_name,
            teamRed: result.team_red_name,
            scoreBlue: result.score_blue,
            scoreRed: result.score_red,
            winner: result.winner_name,
            loser: result.loser_name,
            gameDetails: [],
            isByeWin: result.is_bye_win,
            createdAt: result.created_at,
        };
    },

    createSchedule: async (data: { schedule: unknown[]; teams: string[] }): Promise<ScheduleItem> => {
        const supabase = createClient();
        const tournamentId = await getActiveTournamentId();
        if (!tournamentId) throw new Error('No active tournament found');

        // Delete existing schedule for this tournament, then insert new one
        await supabase
            .from('schedules')
            .delete()
            .eq('tournament_id', tournamentId);

        const { data: result, error } = await supabase
            .from('schedules')
            .insert({
                tournament_id: tournamentId,
                schedule_data: data.schedule,
                teams: data.teams,
            })
            .select()
            .single();

        if (error) throw new Error(error.message);

        return {
            _id: result.id,
            teams: result.teams || [],
            potA: [],
            potB: [],
            schedule: result.schedule_data as ScheduleItem['schedule'],
            createdAt: result.created_at,
        } as unknown as ScheduleItem;
    },

    createTeamLogo: async (data: { teamName: string; logoUrl: string }): Promise<unknown> => {
        const supabase = createClient();

        // Upsert team logo
        const { data: existing } = await supabase
            .from('teams')
            .select('id')
            .eq('name', data.teamName)
            .maybeSingle();

        if (existing) {
            const { error } = await supabase
                .from('teams')
                .update({ logo_url: data.logoUrl })
                .eq('id', existing.id);
            if (error) throw new Error(error.message);
        } else {
            const { error } = await supabase
                .from('teams')
                .insert({ name: data.teamName, logo_url: data.logoUrl });
            if (error) throw new Error(error.message);
        }

        return { success: true };
    },

    deleteResult: async (matchId: string): Promise<unknown> => {
        const supabase = createClient();
        const tournamentId = await getActiveTournamentId();
        if (!tournamentId) throw new Error('No active tournament');

        const { error } = await supabase
            .from('matches')
            .delete()
            .eq('tournament_id', tournamentId)
            .eq('match_key', matchId);

        if (error) throw new Error(error.message);
        return { success: true };
    },

    resetResults: async (day: string | number): Promise<unknown> => {
        const supabase = createClient();
        const tournamentId = await getActiveTournamentId();
        if (!tournamentId) throw new Error('No active tournament');

        const { error } = await supabase
            .from('matches')
            .delete()
            .eq('tournament_id', tournamentId)
            .eq('match_day', Number(day));

        if (error) throw new Error(error.message);
        return { success: true };
    },

    deleteTeamLogo: async (teamName: string): Promise<unknown> => {
        const supabase = createClient();

        const { error } = await supabase
            .from('teams')
            .update({ logo_url: null })
            .eq('name', teamName);

        if (error) throw new Error(error.message);
        return { success: true };
    },

    saveGameStats: async (stats: unknown[]): Promise<unknown> => {
        const supabase = createClient();
        const tournamentId = await getActiveTournamentId();
        if (!tournamentId) throw new Error('No active tournament');

        // Each item has: matchId, gameNumber, blueTeam, redTeam, stats: { blue[], red[], winner, mvp, duration }
        const rows: Record<string, unknown>[] = [];

        for (const gameStat of stats as {
            matchId: string;
            gameNumber: number;
            blueTeam: string;
            redTeam: string;
            stats: {
                blue: { name: string; hero: string; k: number; d: number; a: number }[];
                red: { name: string; hero: string; k: number; d: number; a: number }[];
                winner?: 'blue' | 'red';
                mvp?: string;
                duration?: string;
            };
        }[]) {
            // Get match ID from DB
            const { data: match } = await supabase
                .from('matches')
                .select('id')
                .eq('tournament_id', tournamentId)
                .eq('match_key', gameStat.matchId)
                .maybeSingle();

            if (!match) continue;

            const isBlueWin = gameStat.stats.winner === 'blue';

            // Parse duration
            let durationSeconds = 0;
            if (gameStat.stats.duration) {
                const parts = gameStat.stats.duration.split(':');
                if (parts.length === 2) {
                    durationSeconds = parseInt(parts[0]) * 60 + parseInt(parts[1]);
                }
            }

            // Blue team players
            for (const p of gameStat.stats.blue || []) {
                if (!p.name) continue;
                rows.push({
                    match_id: match.id,
                    game_number: gameStat.gameNumber,
                    team_name: gameStat.blueTeam,
                    player_name: p.name,
                    hero_name: p.hero,
                    kills: p.k || 0,
                    deaths: p.d || 0,
                    assists: p.a || 0,
                    mvp: gameStat.stats.mvp === p.name,
                    game_duration: durationSeconds,
                    win: isBlueWin,
                });
            }

            // Red team players
            for (const p of gameStat.stats.red || []) {
                if (!p.name) continue;
                rows.push({
                    match_id: match.id,
                    game_number: gameStat.gameNumber,
                    team_name: gameStat.redTeam,
                    player_name: p.name,
                    hero_name: p.hero,
                    kills: p.k || 0,
                    deaths: p.d || 0,
                    assists: p.a || 0,
                    mvp: gameStat.stats.mvp === p.name,
                    game_duration: durationSeconds,
                    win: !isBlueWin,
                });
            }
        }

        if (rows.length > 0) {
            const { error } = await supabase.from('game_stats').insert(rows);
            if (error) throw new Error(error.message);
        }

        return { success: true };
    },

    getMatchStats: async (matchId: string): Promise<unknown> => {
        const supabase = createClient();
        const { data, error } = await supabase
            .from('game_stats')
            .select('*')
            .eq('match_id', matchId)
            .order('game_number', { ascending: true });

        if (error) throw new Error(error.message);
        return data;
    },

    // ── Uploads ────────────────────────────────────────────────
    // File uploads go directly to Supabase Storage
    uploadImage: async (formData: FormData): Promise<{ url: string }> => {
        const supabase = createClient();
        const file = formData.get('logo') as File;
        if (!file) throw new Error('No file provided');

        const ext = file.name.split('.').pop() || 'png';
        const path = `logos/${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`;

        const { error } = await supabase.storage
            .from('team-logos')
            .upload(path, file, { upsert: true });

        if (error) throw new Error(error.message);

        const { data: urlData } = supabase.storage
            .from('team-logos')
            .getPublicUrl(path);

        return { url: urlData.publicUrl };
    },
};

export default apiService;
