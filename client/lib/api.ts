/**
 * Server-side API Service — MIGRATED TO SUPABASE
 *
 * This file maintains the same interface as the original Express-backed api.ts
 * so all existing page.tsx files continue to work without changes.
 * Under the hood, it now queries Supabase directly instead of proxying to Express.
 *
 * TODO (Phase 7): Once all pages are verified working, inline these calls
 * directly into page files and delete this compatibility layer.
 */

import { createClient } from '@/utils/supabase/server';

// Re-export existing types for compatibility
import type {
    PlayerStat,
    TeamStat,
    SeasonStats,
    Hero,
    PlayerHeroStat,
} from '@/types';

// ── Helper: get active tournament ID ──────────────────────────
// ในช่วง migration ใช้ tournament ล่าสุดที่ active อยู่
async function getActiveTournamentId(): Promise<string | null> {
    const supabase = await createClient();
    const { data } = await supabase
        .from('tournaments')
        .select('id')
        .eq('status', 'active')
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

    return data?.id || null;
}

// ── Types (kept for page compatibility) ───────────────────────
export interface ScheduleMatch {
    blue: string;
    red: string;
    date?: string;
}

export interface ScheduleRound {
    day: number;
    date?: string;
    matches: ScheduleMatch[];
}

export interface ProcessedStanding {
    name: string;
    p: number;
    w: number;
    l: number;
    gd: number;
    pts: number;
    form?: string[];
}

export interface MatchWithResult {
    match: ScheduleMatch;
    result: {
        matchId: string;
        match_key?: string;
        scoreBlue: number;
        scoreRed: number;
        winner: string;
        loser: string;
        isByeWin: boolean;
        teamBlue: string;
        teamRed: string;
        [key: string]: any;
    };
    day: number;
    index: number;
    date?: string;
}

// ── Server API (Supabase-backed) ──────────────────────────────
export const serverApi = {
    // --- Standings Page ---
    getStandingsPageData: async () => {
        const supabase = await createClient();
        const tournamentId = await getActiveTournamentId();

        let standings: ProcessedStanding[] = [];

        if (tournamentId) {
            const { data } = await supabase.rpc('calculate_tournament_standings', {
                p_tournament_id: tournamentId,
            });

            standings = (data || []).map((s: Record<string, unknown>) => ({
                name: s.team_name as string,
                p: (s.played as number) || 0,
                w: (s.wins as number) || 0,
                l: (s.losses as number) || 0,
                gd: (s.game_diff as number) || 0,
                pts: (s.points as number) || 0,
                form: s.form as string[] | undefined,
            }));
        }

        // Team logos
        const { data: teamsData } = await supabase
            .from('teams')
            .select('name, logo_url');

        const teamLogos: Record<string, string> = {};
        for (const t of teamsData || []) {
            if (t.name && t.logo_url) teamLogos[t.name] = t.logo_url;
        }

        return { standings, teamLogos };
    },

    // --- Fixtures Page ---
    getFixturesPageData: async () => {
        const supabase = await createClient();
        const tournamentId = await getActiveTournamentId();

        let schedule: ScheduleRound[] = [];
        let results: Record<string, unknown>[] = [];

        if (tournamentId) {
            // 1. Fetch all matches for the tournament
            const { data: matchData } = await supabase
                .from('matches')
                .select('*')
                .eq('tournament_id', tournamentId)
                .order('match_day', { ascending: true })
                .order('created_at', { ascending: true });

            if (matchData && matchData.length > 0) {
                // Build schedule rounds from match data
                const roundsMap = new Map<number, ScheduleRound>();
                
                matchData.forEach(m => {
                    if (!roundsMap.has(m.match_day)) {
                        roundsMap.set(m.match_day, {
                            day: m.match_day,
                            matches: []
                        });
                    }
                    roundsMap.get(m.match_day)!.matches.push({
                        blue: m.team_blue_name,
                        red: m.team_red_name,
                    });
                });

                schedule = Array.from(roundsMap.values()).sort((a, b) => a.day - b.day);

                // Map results for component compatibility
                // A match is considered "played" if scores are non-zero OR it's a bye OR it has a winner
                results = matchData
                    .filter(m => m.score_blue !== 0 || m.score_red !== 0 || m.is_bye_win || m.winner_name)
                    .map((m) => ({
                        _id: m.id,
                        matchId: m.match_key,
                        matchDay: m.match_day,
                        teamBlue: m.team_blue_name,
                        teamRed: m.team_red_name,
                        scoreBlue: m.score_blue,
                        scoreRed: m.score_red,
                        winner: m.winner_name,
                        loser: m.loser_name,
                        isByeWin: m.is_bye_win,
                        createdAt: m.created_at,
                    }));
            } else {
                // Fallback to legacy schedules table if no matches exist
                const { data: schedData } = await supabase
                    .from('schedules')
                    .select('*')
                    .eq('tournament_id', tournamentId)
                    .order('created_at', { ascending: false })
                    .limit(1)
                    .maybeSingle();

                if (schedData?.schedule_data) {
                    const rawData = typeof schedData.schedule_data === 'string' ? JSON.parse(schedData.schedule_data) : schedData.schedule_data;
                    const raw = Array.isArray(rawData) ? rawData : [];
                    
                    schedule = (raw as any[]).map((round) => ({
                        day: round.day,
                        date: round.date,
                        matches: (round.matches || []).map((m: any) => ({
                            blue: m.teamA || m.blue || 'Unknown',
                            red: m.teamB || m.red || 'Unknown',
                            date: m.date,
                        })),
                    })).sort((a, b) => a.day - b.day);
                }
            }
        }

        // Logos
        const { data: teamsData } = await supabase
            .from('teams')
            .select('name, logo_url');

        const teamLogos: Record<string, string> = {};
        for (const t of teamsData || []) {
            if (t.name && t.logo_url) teamLogos[t.name] = t.logo_url;
        }

        return { schedule, results, teamLogos };
    },

    // --- Home Page ---
    getHomePageData: async () => {
        const supabase = await createClient();
        const tournamentId = await getActiveTournamentId();

        let schedule: ScheduleRound[] = [];
        let standings: ProcessedStanding[] = [];
        const teamLogos: Record<string, string> = {};
        let latestMatches: MatchWithResult[] = [];
        let upcomingMatches: ScheduleMatch[] = [];
        let results: Record<string, unknown>[] = [];

        // Logos (always needed)
        const { data: teamsData } = await supabase
            .from('teams')
            .select('name, logo_url');

        for (const t of teamsData || []) {
            if (t.name && t.logo_url) teamLogos[t.name] = t.logo_url;
        }

        if (tournamentId) {
            // Standings via RPC
            const { data: standData } = await supabase.rpc('calculate_tournament_standings', {
                p_tournament_id: tournamentId,
            });

            standings = (standData || []).map((s: Record<string, unknown>) => ({
                name: s.team_name as string,
                p: (s.played as number) || 0,
                w: (s.wins as number) || 0,
                l: (s.losses as number) || 0,
                gd: (s.game_diff as number) || 0,
                pts: (s.points as number) || 0,
            }));

            // Schedule
            const { data: schedData } = await supabase
                .from('schedules')
                .select('*')
                .eq('tournament_id', tournamentId)
                .order('created_at', { ascending: false })
                .limit(1)
                .maybeSingle();

            if (schedData?.schedule_data) {
                const rawData = typeof schedData.schedule_data === 'string' ? JSON.parse(schedData.schedule_data) : schedData.schedule_data;
                const raw = Array.isArray(rawData) ? rawData : [];
                
                schedule = (raw as any[]).map((round) => ({
                    day: round.day,
                    date: round.date,
                    matches: (round.matches || []).map((m: any) => ({
                        blue: m.teamA || m.blue || 'Unknown',
                        red: m.teamB || m.red || 'Unknown',
                        date: m.date,
                    })),
                }));
            }

            // Match results
            const { data: matchData } = await supabase
                .from('matches')
                .select('*')
                .eq('tournament_id', tournamentId)
                .order('match_day', { ascending: true });

            const resultsData = (matchData || []).map((m) => ({
                _id: m.id,
                matchId: m.match_key,
                matchDay: m.match_day,
                teamBlue: m.team_blue_name,
                teamRed: m.team_red_name,
                scoreBlue: m.score_blue,
                scoreRed: m.score_red,
                winner: m.winner_name,
                loser: m.loser_name,
                isByeWin: m.is_bye_win,
                createdAt: m.created_at,
            }));

            results = resultsData;

            // Build latest matches with results
            const matchesWithResults: MatchWithResult[] = [];
            schedule.forEach((round) => {
                (round.matches || []).forEach((m, index) => {
                    const matchKey = `${round.day}_${m.blue}_vs_${m.red}`.replace(/\s+/g, '');
                    const result = resultsData.find((r) => r.matchId === matchKey);
                    if (result) {
                        matchesWithResults.push({
                            match: m,
                            result: result as MatchWithResult['result'],
                            day: round.day,
                            index,
                            date: m.date || round.date,
                        });
                    }
                });
            });

            latestMatches = matchesWithResults
                .sort((a, b) => (b.day !== a.day ? b.day - a.day : b.index - a.index))
                .slice(0, 4);

            if (latestMatches.length === 0 && schedule.length > 0) {
                const dayData = schedule.find((r) => r.day === 1);
                if (dayData) {
                    upcomingMatches = dayData.matches.slice(0, 4);
                }
            }
        }

        return { schedule, standings, teamLogos, latestMatches, upcomingMatches, results };
    },

    // --- Clubs Page ---
    getClubsPageData: async () => {
        const supabase = await createClient();
        const { data: teamsData } = await supabase
            .from('teams')
            .select('name, logo_url')
            .order('name', { ascending: true });

        const teams = (teamsData || []).map((t) => t.name).filter(Boolean) as string[];
        const teamLogos: Record<string, string> = {};
        for (const t of teamsData || []) {
            if (t.name && t.logo_url) teamLogos[t.name] = t.logo_url;
        }

        return { teams, teamLogos };
    },

    // --- Season Stats Page ---
    getSeasonStatsPageData: async () => {
        const supabase = await createClient();
        const tournamentId = await getActiveTournamentId();

        let seasonStats: SeasonStats | null = null;

        if (tournamentId) {
            const { data } = await supabase.rpc('get_season_overview', {
                p_tournament_id: tournamentId,
            });
            seasonStats = data as SeasonStats | null;
        }

        const { data: heroesData } = await supabase
            .from('heroes')
            .select('*')
            .order('name', { ascending: true });

        const heroes: Hero[] = (heroesData || []).map((h) => ({
            _id: h.id,
            name: h.name,
            imageUrl: h.image_url,
            createdAt: h.created_at,
        }));

        const { data: teamsData } = await supabase
            .from('teams')
            .select('name, logo_url');

        const teamLogos: Record<string, string> = {};
        for (const t of teamsData || []) {
            if (t.name && t.logo_url) teamLogos[t.name] = t.logo_url;
        }

        return { seasonStats, heroes, teamLogos };
    },

    // --- Team Stats Page ---
    getTeamStatsPageData: async () => {
        const supabase = await createClient();
        const tournamentId = await getActiveTournamentId();

        let teamStats: TeamStat[] = [];

        if (tournamentId) {
            const { data } = await supabase.rpc('get_team_stats', {
                p_tournament_id: tournamentId,
            });

            teamStats = (data || []).map((t: Record<string, unknown>) => ({
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
        }

        const { data: teamsData } = await supabase
            .from('teams')
            .select('name, logo_url');

        const teamLogos: Record<string, string> = {};
        for (const t of teamsData || []) {
            if (t.name && t.logo_url) teamLogos[t.name] = t.logo_url;
        }

        return { teamStats, teamLogos };
    },

    // --- Player Stats Page ---
    getPlayerStatsPageData: async () => {
        const supabase = await createClient();
        const tournamentId = await getActiveTournamentId();

        let playerStats: PlayerStat[] = [];
        let playerHeroStats: PlayerHeroStat[] = [];

        if (tournamentId) {
            // Player leaderboard via RPC
            const { data: leaderboard } = await supabase.rpc('get_player_leaderboard', {
                p_tournament_id: tournamentId,
            });

            playerStats = (leaderboard || []).map((p: Record<string, unknown>) => ({
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

            // Player hero stats (top 3 heroes per player)
            const { data: heroStats } = await supabase
                .from('game_stats')
                .select('player_name, hero_name, win, match_id!inner(tournament_id)')
                .eq('match_id.tournament_id', tournamentId);

            if (heroStats) {
                const playerHeroMap = new Map<string, Map<string, { gp: number; w: number; k: number; d: number; a: number }>>();
                for (const row of heroStats) {
                    const pName = row.player_name;
                    if (!playerHeroMap.has(pName)) playerHeroMap.set(pName, new Map());
                    const heroMap = playerHeroMap.get(pName)!;
                    const current = heroMap.get(row.hero_name) || { gp: 0, w: 0, k: 0, d: 0, a: 0 };
                    current.gp++;
                    if (row.win) current.w++;
                    heroMap.set(row.hero_name, current);
                }

                playerHeroStats = Array.from(playerHeroMap.entries()).map(([playerName, heroMap]) => ({
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
            }
        }

        const { data: heroesData } = await supabase
            .from('heroes')
            .select('*')
            .order('name', { ascending: true });

        const heroes: Hero[] = (heroesData || []).map((h) => ({
            _id: h.id,
            name: h.name,
            imageUrl: h.image_url,
            createdAt: h.created_at,
        }));

        const { data: teamsData } = await supabase
            .from('teams')
            .select('name, logo_url');

        const teamLogos: Record<string, string> = {};
        for (const t of teamsData || []) {
            if (t.name && t.logo_url) teamLogos[t.name] = t.logo_url;
        }

        return { playerStats, playerHeroStats, heroes, teamLogos };
    },
};

export default serverApi;
