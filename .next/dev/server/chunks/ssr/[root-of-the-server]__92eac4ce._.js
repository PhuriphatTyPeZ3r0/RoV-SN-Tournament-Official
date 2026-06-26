module.exports = [
"[project]/app/favicon.ico.mjs { IMAGE => \"[project]/app/favicon.ico (static in ecmascript, tag client)\" } [app-rsc] (structured image object, ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/favicon.ico.mjs { IMAGE => \"[project]/app/favicon.ico (static in ecmascript, tag client)\" } [app-rsc] (structured image object, ecmascript)"));
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/app/loading.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/loading.tsx [app-rsc] (ecmascript)"));
}),
"[project]/app/(public)/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/(public)/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/lib/errors.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Base Application Error
 */ __turbopack_context__.s([
    "AppError",
    ()=>AppError,
    "DatabaseError",
    ()=>DatabaseError,
    "NotFoundError",
    ()=>NotFoundError,
    "UnauthorizedError",
    ()=>UnauthorizedError,
    "ValidationError",
    ()=>ValidationError
]);
class AppError extends Error {
    statusCode;
    code;
    constructor(message, statusCode = 500, code = 'INTERNAL_ERROR'){
        super(message);
        this.name = this.constructor.name;
        this.statusCode = statusCode;
        this.code = code;
        Error.captureStackTrace(this, this.constructor);
    }
}
class ValidationError extends AppError {
    constructor(message, code = 'VALIDATION_ERROR'){
        super(message, 400, code);
    }
}
class UnauthorizedError extends AppError {
    constructor(message, code = 'UNAUTHORIZED'){
        super(message, 401, code);
    }
}
class NotFoundError extends AppError {
    constructor(message, code = 'NOT_FOUND'){
        super(message, 404, code);
    }
}
class DatabaseError extends AppError {
    constructor(message, code = 'DATABASE_ERROR'){
        super(message, 500, code);
    }
}
}),
"[project]/lib/services/BaseService.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BaseService",
    ()=>BaseService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/supabase/server.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$errors$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/errors.ts [app-rsc] (ecmascript)");
;
;
class BaseService {
    /**
     * Get initialized Supabase server client
     */ static async getSupabaseClient() {
        return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    }
    /**
     * Resolve the active tournament ID for a given season or the default active season
     */ static async getActiveTournamentId(season) {
        try {
            const supabase = await this.getSupabaseClient();
            if (season) {
                const { data } = await supabase.from('tournaments').select('id').eq('season', season).limit(1).maybeSingle();
                if (data) return data.id;
            }
            const { data } = await supabase.from('tournaments').select('id').eq('status', 'active').order('created_at', {
                ascending: false
            }).limit(1).maybeSingle();
            return data?.id || null;
        } catch (error) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$errors$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["DatabaseError"](`Failed to resolve active tournament ID: ${error.message}`);
        }
    }
}
}),
"[project]/lib/services/TournamentService.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TournamentService",
    ()=>TournamentService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$BaseService$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/services/BaseService.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$errors$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/errors.ts [app-rsc] (ecmascript)");
;
;
class TournamentService extends __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$BaseService$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BaseService"] {
    /**
     * Get list of all tournaments, ordered by season descending
     */ static async getTournaments() {
        try {
            const supabase = await this.getSupabaseClient();
            const { data, error } = await supabase.from('tournaments').select('*').order('season', {
                ascending: false
            });
            if (error) throw error;
            return data || [];
        } catch (error) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$errors$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["DatabaseError"](`Failed to fetch tournaments list: ${error.message}`);
        }
    }
}
}),
"[project]/lib/services/TeamService.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TeamService",
    ()=>TeamService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$BaseService$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/services/BaseService.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$errors$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/errors.ts [app-rsc] (ecmascript)");
;
;
class TeamService extends __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$BaseService$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BaseService"] {
    /**
     * Get a dictionary mapping team names to their logo URLs
     */ static async getTeamLogos() {
        try {
            const supabase = await this.getSupabaseClient();
            const { data: teamsData, error } = await supabase.from('teams').select('name, logo_url');
            if (error) throw error;
            const teamLogos = {};
            for (const t of teamsData || []){
                if (t.name && t.logo_url) teamLogos[t.name] = t.logo_url;
            }
            return teamLogos;
        } catch (error) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$errors$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["DatabaseError"](`Failed to fetch team logos: ${error.message}`);
        }
    }
    /**
     * Get page data for the clubs directory listing
     */ static async getClubsPageData() {
        try {
            const supabase = await this.getSupabaseClient();
            const { data: teamsData, error } = await supabase.from('teams').select('name, logo_url').order('name', {
                ascending: true
            });
            if (error) throw error;
            const teams = (teamsData || []).map((t)=>t.name).filter(Boolean);
            const teamLogos = {};
            for (const t of teamsData || []){
                if (t.name && t.logo_url) teamLogos[t.name] = t.logo_url;
            }
            return {
                teams,
                teamLogos
            };
        } catch (error) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$errors$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["DatabaseError"](`Failed to fetch clubs page data: ${error.message}`);
        }
    }
}
}),
"[project]/lib/services/MatchService.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MatchService",
    ()=>MatchService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$BaseService$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/services/BaseService.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$errors$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/errors.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$TeamService$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/services/TeamService.ts [app-rsc] (ecmascript)");
;
;
;
class MatchService extends __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$BaseService$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BaseService"] {
    /**
     * Get brackets data for the knockout stage (match_day >= 10)
     */ static async getBracketsPageData(season) {
        try {
            const supabase = await this.getSupabaseClient();
            const tournamentId = await this.getActiveTournamentId(season);
            let matches = [];
            if (tournamentId) {
                const { data, error } = await supabase.from('matches').select('*').eq('tournament_id', tournamentId).gte('match_day', 10).order('match_day', {
                    ascending: true
                }).order('created_at', {
                    ascending: true
                });
                if (error) throw error;
                matches = data || [];
            }
            const teamLogos = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$TeamService$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["TeamService"].getTeamLogos();
            return {
                matches,
                teamLogos
            };
        } catch (error) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$errors$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["DatabaseError"](`Failed to fetch brackets page data: ${error.message}`);
        }
    }
    /**
     * Get fixtures and results page data for a season
     */ static async getFixturesPageData(season) {
        try {
            const supabase = await this.getSupabaseClient();
            const tournamentId = await this.getActiveTournamentId(season);
            let schedule = [];
            let results = [];
            if (tournamentId) {
                // 1. Fetch all matches for the tournament
                const { data: matchData, error: matchError } = await supabase.from('matches').select('*').eq('tournament_id', tournamentId).order('match_day', {
                    ascending: true
                }).order('created_at', {
                    ascending: true
                });
                if (matchError) throw matchError;
                if (matchData && matchData.length > 0) {
                    const roundsMap = new Map();
                    matchData.forEach((m)=>{
                        if (!roundsMap.has(m.match_day)) {
                            roundsMap.set(m.match_day, {
                                day: m.match_day,
                                matches: []
                            });
                        }
                        roundsMap.get(m.match_day).matches.push({
                            blue: m.team_blue_name,
                            red: m.team_red_name
                        });
                    });
                    schedule = Array.from(roundsMap.values()).sort((a, b)=>a.day - b.day);
                    results = matchData.filter((m)=>m.score_blue !== 0 || m.score_red !== 0 || m.is_bye_win || m.winner_name).map((m)=>({
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
                            createdAt: m.created_at
                        }));
                } else {
                    // Fallback to legacy schedules table
                    const { data: schedData, error: schedError } = await supabase.from('schedules').select('*').eq('tournament_id', tournamentId).order('created_at', {
                        ascending: false
                    }).limit(1).maybeSingle();
                    if (schedError) throw schedError;
                    if (schedData?.schedule_data) {
                        const rawData = typeof schedData.schedule_data === 'string' ? JSON.parse(schedData.schedule_data) : schedData.schedule_data;
                        const raw = Array.isArray(rawData) ? rawData : [];
                        schedule = raw.map((round)=>({
                                day: round.day,
                                date: round.date,
                                matches: (round.matches || []).map((m)=>({
                                        blue: m.teamA || m.blue || 'Unknown',
                                        red: m.teamB || m.red || 'Unknown',
                                        date: m.date
                                    }))
                            })).sort((a, b)=>a.day - b.day);
                    }
                }
            }
            const teamLogos = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$TeamService$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["TeamService"].getTeamLogos();
            return {
                schedule,
                results,
                teamLogos
            };
        } catch (error) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$errors$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["DatabaseError"](`Failed to fetch fixtures page data: ${error.message}`);
        }
    }
}
}),
"[project]/lib/services/StatsService.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "StatsService",
    ()=>StatsService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$BaseService$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/services/BaseService.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$errors$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/errors.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$TeamService$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/services/TeamService.ts [app-rsc] (ecmascript)");
;
;
;
class StatsService extends __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$BaseService$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BaseService"] {
    /**
     * Get standing board for the current tournament / season
     */ static async getStandingsPageData(season) {
        try {
            const supabase = await this.getSupabaseClient();
            const tournamentId = await this.getActiveTournamentId(season);
            let standings = [];
            if (tournamentId) {
                const { data, error } = await supabase.rpc('calculate_tournament_standings', {
                    p_tournament_id: tournamentId
                });
                if (error) throw error;
                standings = (data || []).map((s)=>({
                        name: s.team_name,
                        p: s.played || 0,
                        w: s.wins || 0,
                        l: s.losses || 0,
                        gd: s.game_diff || 0,
                        pts: s.points || 0,
                        form: s.form
                    }));
            }
            const teamLogos = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$TeamService$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["TeamService"].getTeamLogos();
            return {
                standings,
                teamLogos
            };
        } catch (error) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$errors$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["DatabaseError"](`Failed to fetch standings data: ${error.message}`);
        }
    }
    /**
     * Get season overview stats (total matches, total kills, etc.)
     */ static async getSeasonStatsPageData(season) {
        try {
            const supabase = await this.getSupabaseClient();
            const tournamentId = await this.getActiveTournamentId(season);
            let seasonStats = null;
            if (tournamentId) {
                const { data, error } = await supabase.rpc('get_season_overview', {
                    p_tournament_id: tournamentId
                });
                if (error) throw error;
                seasonStats = data;
            }
            const { data: heroesData, error: heroesError } = await supabase.from('heroes').select('*').order('name', {
                ascending: true
            });
            if (heroesError) throw heroesError;
            const heroes = (heroesData || []).map((h)=>({
                    _id: h.id,
                    name: h.name,
                    imageUrl: h.image_url,
                    createdAt: h.created_at
                }));
            const teamLogos = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$TeamService$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["TeamService"].getTeamLogos();
            return {
                seasonStats,
                heroes,
                teamLogos
            };
        } catch (error) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$errors$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["DatabaseError"](`Failed to fetch season stats: ${error.message}`);
        }
    }
    /**
     * Get statistics grouped by teams
     */ static async getTeamStatsPageData(season) {
        try {
            const supabase = await this.getSupabaseClient();
            const tournamentId = await this.getActiveTournamentId(season);
            let teamStats = [];
            if (tournamentId) {
                const { data, error } = await supabase.rpc('get_team_stats', {
                    p_tournament_id: tournamentId
                });
                if (error) throw error;
                teamStats = (data || []).map((t)=>({
                        teamName: t.team_name,
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
                        realLosses: Number(t.real_losses) || 0
                    }));
            }
            const teamLogos = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$TeamService$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["TeamService"].getTeamLogos();
            return {
                teamStats,
                teamLogos
            };
        } catch (error) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$errors$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["DatabaseError"](`Failed to fetch team stats page data: ${error.message}`);
        }
    }
    /**
     * Get statistics grouped by individual players
     */ static async getPlayerStatsPageData(season) {
        try {
            const supabase = await this.getSupabaseClient();
            const tournamentId = await this.getActiveTournamentId(season);
            let playerStats = [];
            let playerHeroStats = [];
            if (tournamentId) {
                // Player leaderboard via RPC
                const { data: leaderboard, error: leaderboardError } = await supabase.rpc('get_player_leaderboard', {
                    p_tournament_id: tournamentId
                });
                if (leaderboardError) throw leaderboardError;
                playerStats = (leaderboard || []).map((p)=>({
                        realName: p.real_name,
                        playerName: p.player_name,
                        teamName: p.team_name,
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
                        kda: Number(p.kda) || 0
                    }));
                // Player hero stats
                const { data: heroStats, error: heroStatsError } = await supabase.from('game_stats').select('player_name, hero_name, win, match_id!inner(tournament_id)').eq('match_id.tournament_id', tournamentId);
                if (heroStatsError) throw heroStatsError;
                if (heroStats) {
                    const playerHeroMap = new Map();
                    for (const row of heroStats){
                        const pName = row.player_name;
                        if (!playerHeroMap.has(pName)) playerHeroMap.set(pName, new Map());
                        const heroMap = playerHeroMap.get(pName);
                        const current = heroMap.get(row.hero_name) || {
                            gp: 0,
                            w: 0,
                            k: 0,
                            d: 0,
                            a: 0
                        };
                        current.gp++;
                        if (row.win) current.w++;
                        heroMap.set(row.hero_name, current);
                    }
                    playerHeroStats = Array.from(playerHeroMap.entries()).map(([playerName, heroMap])=>({
                            realName: playerName,
                            playerName,
                            topHeroes: Array.from(heroMap.entries()).map(([heroName, stats])=>({
                                    heroName,
                                    gamesPlayed: stats.gp,
                                    wins: stats.w,
                                    totalKills: stats.k,
                                    totalDeaths: stats.d,
                                    totalAssists: stats.a
                                })).sort((a, b)=>b.gamesPlayed - a.gamesPlayed).slice(0, 3)
                        }));
                }
            }
            const { data: heroesData, error: heroesError } = await supabase.from('heroes').select('*').order('name', {
                ascending: true
            });
            if (heroesError) throw heroesError;
            const heroes = (heroesData || []).map((h)=>({
                    _id: h.id,
                    name: h.name,
                    imageUrl: h.image_url,
                    createdAt: h.created_at
                }));
            const teamLogos = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$TeamService$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["TeamService"].getTeamLogos();
            return {
                playerStats,
                playerHeroStats,
                heroes,
                teamLogos
            };
        } catch (error) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$errors$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["DatabaseError"](`Failed to fetch player stats page data: ${error.message}`);
        }
    }
}
}),
"[project]/lib/api.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__,
    "serverApi",
    ()=>serverApi
]);
/**
 * Server-side API Facade (OOP-backed compatibility layer)
 * 
 * Delegates queries to the appropriate Object-Oriented Service classes.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/supabase/server.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$TournamentService$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/services/TournamentService.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$TeamService$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/services/TeamService.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$MatchService$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/services/MatchService.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$StatsService$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/services/StatsService.ts [app-rsc] (ecmascript)");
;
;
;
;
;
const serverApi = {
    /**
     * Get list of all tournaments
     */ getTournaments: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$TournamentService$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["TournamentService"].getTournaments(),
    /**
     * Get page data for the clubs directory
     */ getClubsPageData: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$TeamService$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["TeamService"].getClubsPageData(),
    /**
     * Get brackets page data
     */ getBracketsPageData: (season)=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$MatchService$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["MatchService"].getBracketsPageData(season),
    /**
     * Get fixtures and results page data
     */ getFixturesPageData: (season)=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$MatchService$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["MatchService"].getFixturesPageData(season),
    /**
     * Get standings page data
     */ getStandingsPageData: (season)=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$StatsService$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["StatsService"].getStandingsPageData(season),
    /**
     * Get season statistics page data
     */ getSeasonStatsPageData: (season)=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$StatsService$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["StatsService"].getSeasonStatsPageData(season),
    /**
     * Get team statistics page data
     */ getTeamStatsPageData: (season)=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$StatsService$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["StatsService"].getTeamStatsPageData(season),
    /**
     * Get player statistics page data
     */ getPlayerStatsPageData: (season)=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$StatsService$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["StatsService"].getPlayerStatsPageData(season),
    /**
     * Get home page layout data (coordinates multiple services)
     */ getHomePageData: async (season)=>{
        const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
        // 1. Resolve tournament
        const { data: activeTourData } = season ? await supabase.from('tournaments').select('id').eq('season', season).limit(1).maybeSingle() : await supabase.from('tournaments').select('id').eq('status', 'active').order('created_at', {
            ascending: false
        }).limit(1).maybeSingle();
        const tournamentId = activeTourData?.id || null;
        // 2. Fetch dependencies via Services
        const teamLogos = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$TeamService$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["TeamService"].getTeamLogos();
        let schedule = [];
        let standings = [];
        let latestMatches = [];
        let upcomingMatches = [];
        let results = [];
        let activeTournament = null;
        if (tournamentId) {
            // Fetch active tournament metadata
            const { data: tourMeta } = await supabase.from('tournaments').select('*').eq('id', tournamentId).maybeSingle();
            activeTournament = tourMeta;
            // Fetch standings
            const { data: standData } = await supabase.rpc('calculate_tournament_standings', {
                p_tournament_id: tournamentId
            });
            standings = (standData || []).map((s)=>({
                    name: s.team_name,
                    p: s.played || 0,
                    w: s.wins || 0,
                    l: s.losses || 0,
                    gd: s.game_diff || 0,
                    pts: s.points || 0
                }));
            // Fetch schedule
            const { data: schedData } = await supabase.from('schedules').select('*').eq('tournament_id', tournamentId).order('created_at', {
                ascending: false
            }).limit(1).maybeSingle();
            if (schedData?.schedule_data) {
                const rawData = typeof schedData.schedule_data === 'string' ? JSON.parse(schedData.schedule_data) : schedData.schedule_data;
                const raw = Array.isArray(rawData) ? rawData : [];
                schedule = raw.map((round)=>({
                        day: round.day,
                        date: round.date,
                        matches: (round.matches || []).map((m)=>({
                                blue: m.teamA || m.blue || 'Unknown',
                                red: m.teamB || m.red || 'Unknown',
                                date: m.date
                            }))
                    }));
            }
            // Fetch match results
            const { data: matchData } = await supabase.from('matches').select('*').eq('tournament_id', tournamentId).order('match_day', {
                ascending: true
            });
            const resultsData = (matchData || []).map((m)=>({
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
                    createdAt: m.created_at
                }));
            results = resultsData;
            // Formulate latest matches
            const matchesWithResults = [];
            schedule.forEach((round)=>{
                (round.matches || []).forEach((m, index)=>{
                    const matchKey = `${round.day}_${m.blue}_vs_${m.red}`.replace(/\s+/g, '');
                    const result = resultsData.find((r)=>r.matchId === matchKey);
                    if (result) {
                        matchesWithResults.push({
                            match: m,
                            result: result,
                            day: round.day,
                            index,
                            date: m.date || round.date
                        });
                    }
                });
            });
            latestMatches = matchesWithResults.sort((a, b)=>b.day !== a.day ? b.day - a.day : b.index - a.index).slice(0, 4);
            if (latestMatches.length === 0 && schedule.length > 0) {
                const dayData = schedule.find((r)=>r.day === 1);
                if (dayData) {
                    upcomingMatches = dayData.matches.slice(0, 4);
                }
            }
        }
        return {
            schedule,
            standings,
            teamLogos,
            latestMatches,
            upcomingMatches,
            results,
            activeTournament
        };
    }
};
const __TURBOPACK__default__export__ = serverApi;
}),
"[project]/components/standings/StandingsContent.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/components/standings/StandingsContent.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/components/standings/StandingsContent.tsx <module evaluation>", "default");
}),
"[project]/components/standings/StandingsContent.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/components/standings/StandingsContent.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/components/standings/StandingsContent.tsx", "default");
}),
"[project]/components/standings/StandingsContent.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$standings$2f$StandingsContent$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/components/standings/StandingsContent.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$standings$2f$StandingsContent$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/components/standings/StandingsContent.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$standings$2f$StandingsContent$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/app/(public)/standings/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>StandingsPage,
    "metadata",
    ()=>metadata,
    "revalidate",
    ()=>revalidate
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$standings$2f$StandingsContent$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/standings/StandingsContent.tsx [app-rsc] (ecmascript)");
;
;
;
const metadata = {
    title: 'Standings',
    description: 'ตารางคะแนน League Phase Rankings - RoV SN Tournament',
    openGraph: {
        title: 'Standings',
        description: 'ตารางคะแนนและอันดับทีมในการแข่งขัน'
    }
};
const revalidate = 60;
async function StandingsPage({ searchParams }) {
    const params = await searchParams;
    const seasonNumber = params.season ? parseInt(params.season, 10) : undefined;
    const data = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["serverApi"].getStandingsPageData(seasonNumber);
    const tournaments = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["serverApi"].getTournaments();
    // Find resolved season or fallback to active
    const currentSeason = seasonNumber || data.standings.length > 0 ? tournaments.find((t)=>t.season === seasonNumber)?.season || tournaments.find((t)=>t.status === 'active')?.season || 2026 : 2026;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gray-50 pb-12",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$standings$2f$StandingsContent$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
            standings: data.standings,
            teamLogos: data.teamLogos,
            tournaments: tournaments,
            currentSeason: currentSeason
        }, void 0, false, {
            fileName: "[project]/app/(public)/standings/page.tsx",
            lineNumber: 32,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/(public)/standings/page.tsx",
        lineNumber: 31,
        columnNumber: 9
    }, this);
}
}),
"[project]/app/(public)/standings/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/(public)/standings/page.tsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__92eac4ce._.js.map