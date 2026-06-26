(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/lib/api-client.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "apiService",
    ()=>apiService,
    "default",
    ()=>__TURBOPACK__default__export__
]);
/**
 * Client-side API Service — MIGRATED TO SUPABASE
 *
 * Drop-in replacement: same interface, Supabase backend.
 * Admin pages import this for both reads (getTeams, getSchedule, etc.)
 * and writes (createResult, saveGameStats, etc.).
 *
 * All mutations now go through Supabase directly via the browser client.
 * Auth is handled by Supabase session cookies (set by middleware).
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/supabase/client.ts [app-client] (ecmascript)");
'use client';
;
// ── Helper: get active tournament ID (client-side) ────────────
async function getActiveTournamentId() {
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
    const { data } = await supabase.from('tournaments').select('id').eq('status', 'active').order('created_at', {
        ascending: false
    }).limit(1).maybeSingle();
    return data?.id || null;
}
const apiService = {
    // ── Reads ──────────────────────────────────────────────────
    getTeams: async ()=>{
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
        const { data, error } = await supabase.from('teams').select('id, name, logo_url').order('name', {
            ascending: true
        });
        if (error) throw new Error(error.message);
        return (data || []).map((t)=>({
                _id: t.id,
                name: t.name,
                logo: t.logo_url || '',
                logoShort: t.logo_url || ''
            }));
    },
    getTeamStats: async ()=>{
        const tournamentId = await getActiveTournamentId();
        if (!tournamentId) return [];
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
        const { data, error } = await supabase.rpc('get_team_stats', {
            p_tournament_id: tournamentId
        });
        if (error) throw new Error(error.message);
        return (data || []).map((t)=>({
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
    },
    getPlayers: async ()=>{
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
        const { data, error } = await supabase.from('players').select('id, name, teams!team_id(name), in_game_name, previous_igns, created_at').order('name', {
            ascending: true
        });
        if (error) throw new Error(error.message);
        return (data || []).map((p)=>({
                _id: p.id,
                name: p.name,
                team: p.teams?.name || undefined,
                inGameName: p.in_game_name || undefined,
                previousIGNs: p.previous_igns || [],
                createdAt: p.created_at
            }));
    },
    getPlayerStats: async ()=>{
        const tournamentId = await getActiveTournamentId();
        if (!tournamentId) return [];
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
        const { data, error } = await supabase.rpc('get_player_leaderboard', {
            p_tournament_id: tournamentId
        });
        if (error) throw new Error(error.message);
        return (data || []).map((p)=>({
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
    },
    getPlayerHeroStats: async ()=>{
        const tournamentId = await getActiveTournamentId();
        if (!tournamentId) return [];
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
        const { data, error } = await supabase.from('game_stats').select('player_name, hero_name, win');
        if (error) throw new Error(error.message);
        const map = new Map();
        for (const row of data || []){
            if (!map.has(row.player_name)) map.set(row.player_name, new Map());
            const heroMap = map.get(row.player_name);
            const cur = heroMap.get(row.hero_name) || {
                gp: 0,
                w: 0,
                k: 0,
                d: 0,
                a: 0
            };
            cur.gp++;
            if (row.win) cur.w++;
            heroMap.set(row.hero_name, cur);
        }
        return Array.from(map.entries()).map(([playerName, heroMap])=>({
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
    },
    getResults: async ()=>{
        const tournamentId = await getActiveTournamentId();
        if (!tournamentId) return [];
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
        const { data, error } = await supabase.from('matches').select('*').eq('tournament_id', tournamentId).order('match_day', {
            ascending: true
        });
        if (error) throw new Error(error.message);
        return (data || []).map((m)=>({
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
                createdAt: m.created_at
            }));
    },
    getSchedule: async ()=>{
        const tournamentId = await getActiveTournamentId();
        if (!tournamentId) return {
            _id: '',
            teams: [],
            potA: [],
            potB: [],
            schedule: [],
            createdAt: ''
        };
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
        const { data, error } = await supabase.from('schedules').select('*').eq('tournament_id', tournamentId).order('created_at', {
            ascending: false
        }).limit(1).maybeSingle();
        if (error) throw new Error(error.message);
        if (!data) return {
            _id: '',
            teams: [],
            potA: [],
            potB: [],
            schedule: [],
            createdAt: ''
        };
        // schedule_data is JSON — convert to the legacy shape
        const rawData = typeof data.schedule_data === 'string' ? JSON.parse(data.schedule_data) : data.schedule_data;
        const raw = rawData || [];
        const schedule = raw.map((round)=>({
                day: round.day,
                date: round.date,
                matches: (round.matches || []).map((m)=>({
                        teamA: m.teamA || m.blue || '',
                        teamB: m.teamB || m.red || '',
                        blue: m.teamA || m.blue || '',
                        red: m.teamB || m.red || '',
                        time: m.time,
                        date: m.date
                    }))
            }));
        return {
            _id: data.id,
            teams: data.teams || [],
            potA: [],
            potB: [],
            schedule,
            createdAt: data.created_at
        };
    },
    getStandings: async ()=>{
        const tournamentId = await getActiveTournamentId();
        if (!tournamentId) return [];
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
        const { data, error } = await supabase.rpc('calculate_tournament_standings', {
            p_tournament_id: tournamentId
        });
        if (error) throw new Error(error.message);
        return (data || []).map((s)=>({
                team: s.team_name,
                name: s.team_name,
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
                gameDiff: Number(s.game_diff) || 0
            }));
    },
    getSeasonStats: async ()=>{
        const tournamentId = await getActiveTournamentId();
        if (!tournamentId) return {};
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
        const { data, error } = await supabase.rpc('get_season_overview', {
            p_tournament_id: tournamentId
        });
        if (error) throw new Error(error.message);
        return data;
    },
    getHeroes: async ()=>{
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
        const { data, error } = await supabase.from('heroes').select('*').order('name', {
            ascending: true
        });
        if (error) throw new Error(error.message);
        return (data || []).map((h)=>({
                _id: h.id,
                name: h.name,
                imageUrl: h.image_url || '',
                createdAt: h.created_at
            }));
    },
    // ── Writes (Mutations) ─────────────────────────────────────
    createResult: async (resultData)=>{
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
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
            mvp_player: resultData.mvp || null
        };
        // Determine loser
        if (upsertData.winner_name === upsertData.team_blue_name) {
            upsertData.loser_name = upsertData.team_red_name;
        } else if (upsertData.winner_name === upsertData.team_red_name) {
            upsertData.loser_name = upsertData.team_blue_name;
        }
        // Upsert by match_key + tournament_id
        const { data: existing } = await supabase.from('matches').select('id').eq('tournament_id', tournamentId).eq('match_key', matchKey).maybeSingle();
        let result;
        if (existing) {
            const { data, error } = await supabase.from('matches').update(upsertData).eq('id', existing.id).select().single();
            if (error) throw new Error(error.message);
            result = data;
        } else {
            const { data, error } = await supabase.from('matches').insert(upsertData).select().single();
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
            createdAt: result.created_at
        };
    },
    createSchedule: async (data)=>{
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
        const tournamentId = await getActiveTournamentId();
        if (!tournamentId) throw new Error('No active tournament found');
        // Delete existing schedule for this tournament, then insert new one
        await supabase.from('schedules').delete().eq('tournament_id', tournamentId);
        const { data: result, error } = await supabase.from('schedules').insert({
            tournament_id: tournamentId,
            schedule_data: data.schedule,
            teams: data.teams
        }).select().single();
        if (error) throw new Error(error.message);
        return {
            _id: result.id,
            teams: result.teams || [],
            potA: [],
            potB: [],
            schedule: typeof result.schedule_data === 'string' ? JSON.parse(result.schedule_data) : result.schedule_data,
            createdAt: result.created_at
        };
    },
    createTeamLogo: async (data)=>{
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
        // Upsert team logo
        const { data: existing } = await supabase.from('teams').select('id').eq('name', data.teamName).maybeSingle();
        if (existing) {
            const { error } = await supabase.from('teams').update({
                logo_url: data.logoUrl
            }).eq('id', existing.id);
            if (error) throw new Error(error.message);
        } else {
            const { error } = await supabase.from('teams').insert({
                name: data.teamName,
                logo_url: data.logoUrl
            });
            if (error) throw new Error(error.message);
        }
        return {
            success: true
        };
    },
    deleteResult: async (matchId)=>{
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
        const tournamentId = await getActiveTournamentId();
        if (!tournamentId) throw new Error('No active tournament');
        const { error } = await supabase.from('matches').delete().eq('tournament_id', tournamentId).eq('match_key', matchId);
        if (error) throw new Error(error.message);
        return {
            success: true
        };
    },
    resetResults: async (day)=>{
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
        const tournamentId = await getActiveTournamentId();
        if (!tournamentId) throw new Error('No active tournament');
        const { error } = await supabase.from('matches').delete().eq('tournament_id', tournamentId).eq('match_day', Number(day));
        if (error) throw new Error(error.message);
        return {
            success: true
        };
    },
    deleteTeamLogo: async (teamName)=>{
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
        const { error } = await supabase.from('teams').update({
            logo_url: null
        }).eq('name', teamName);
        if (error) throw new Error(error.message);
        return {
            success: true
        };
    },
    saveGameStats: async (stats)=>{
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
        const tournamentId = await getActiveTournamentId();
        if (!tournamentId) throw new Error('No active tournament');
        // Each item has: matchId, gameNumber, blueTeam, redTeam, stats: { blue[], red[], winner, mvp, duration }
        const rows = [];
        for (const gameStat of stats){
            // Get match ID from DB
            const { data: match } = await supabase.from('matches').select('id').eq('tournament_id', tournamentId).eq('match_key', gameStat.matchId).maybeSingle();
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
            for (const p of gameStat.stats.blue || []){
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
                    win: isBlueWin
                });
            }
            // Red team players
            for (const p of gameStat.stats.red || []){
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
                    win: !isBlueWin
                });
            }
        }
        if (rows.length > 0) {
            const { error } = await supabase.from('game_stats').insert(rows);
            if (error) throw new Error(error.message);
        }
        return {
            success: true
        };
    },
    getMatchStats: async (matchId)=>{
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
        const { data, error } = await supabase.from('game_stats').select('*').eq('match_id', matchId).order('game_number', {
            ascending: true
        });
        if (error) throw new Error(error.message);
        return data;
    },
    // ── Uploads ────────────────────────────────────────────────
    // File uploads go directly to Supabase Storage
    uploadImage: async (formData)=>{
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
        const file = formData.get('logo');
        if (!file) throw new Error('No file provided');
        const ext = file.name.split('.').pop() || 'png';
        const path = `logos/${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`;
        const { error } = await supabase.storage.from('team-logos').upload(path, file, {
            upsert: true
        });
        if (error) throw new Error(error.message);
        const { data: urlData } = supabase.storage.from('team-logos').getPublicUrl(path);
        return {
            url: urlData.publicUrl
        };
    }
};
const __TURBOPACK__default__export__ = apiService;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/admin/game-stats/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AdminGameStatsPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sweetalert2$2f$dist$2f$sweetalert2$2e$all$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sweetalert2/dist/sweetalert2.all.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$providers$2f$LanguageProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/providers/LanguageProvider.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api-client.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function AdminGameStatsPage() {
    _s();
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$providers$2f$LanguageProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLanguage"])();
    const [playerStats, setPlayerStats] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [searchTerm, setSearchTerm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [sortBy, setSortBy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('kda');
    const [filterTeam, setFilterTeam] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const Toast = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sweetalert2$2f$dist$2f$sweetalert2$2e$all$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AdminGameStatsPage.useEffect": ()=>{
            fetchStats();
        }
    }["AdminGameStatsPage.useEffect"], []);
    const fetchStats = async ()=>{
        try {
            const data = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiService"].getPlayerStats();
            setPlayerStats(data || []);
        } catch (error) {
            console.error('Error fetching stats:', error);
            Toast.fire({
                icon: 'error',
                title: t.common.error
            });
        } finally{
            setLoading(false);
        }
    };
    const uniqueTeams = [
        ...new Set(playerStats.map((p)=>p.teamName))
    ].sort();
    const filteredStats = playerStats.filter((p)=>{
        const matchesSearch = (p.realName || '').toLowerCase().includes(searchTerm.toLowerCase()) || (p.playerName || '').toLowerCase().includes(searchTerm.toLowerCase()) || (p.teamName || '').toLowerCase().includes(searchTerm.toLowerCase());
        const matchesTeam = !filterTeam || p.teamName === filterTeam;
        return matchesSearch && matchesTeam;
    }).sort((a, b)=>{
        switch(sortBy){
            case 'kills':
                return (b.totalKills || 0) - (a.totalKills || 0);
            case 'mvp':
                return (b.mvpCount || 0) - (a.mvpCount || 0);
            case 'winRate':
                return (b.winRate || 0) - (a.winRate || 0);
            case 'kda':
            default:
                return (b.kda || 0) - (a.kda || 0);
        }
    });
    const handleViewPlayerDetails = (player)=>{
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sweetalert2$2f$dist$2f$sweetalert2$2e$all$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].fire({
            title: player.realName || player.playerName,
            html: `
                <div class="text-left space-y-4">
                    <div class="bg-gray-50 rounded-lg p-4">
                        <div class="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <span class="text-gray-500">IGN:</span>
                                <span class="ml-2 font-bold">${player.playerName}</span>
                            </div>
                            <div>
                                <span class="text-gray-500">${t.admin.team || 'Team'}:</span>
                                <span class="ml-2 font-bold">${player.teamName}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="grid grid-cols-3 gap-3 text-center">
                        <div class="bg-green-50 rounded-lg p-3">
                            <div class="text-2xl font-bold text-green-600">${player.gamesPlayed || 0}</div>
                            <div class="text-xs text-gray-500">Matches</div>
                        </div>
                        <div class="bg-blue-50 rounded-lg p-3">
                            <div class="text-2xl font-bold text-blue-600">${player.wins || 0}</div>
                            <div class="text-xs text-gray-500">${t.stats.wins}</div>
                        </div>
                        <div class="bg-purple-50 rounded-lg p-3">
                            <div class="text-2xl font-bold text-purple-600">${player.winRate || 0}%</div>
                            <div class="text-xs text-gray-500">${t.stats.winRate}</div>
                        </div>
                    </div>
                    
                    <div class="grid grid-cols-4 gap-3 text-center">
                        <div class="bg-gray-50 rounded-lg p-3">
                            <div class="text-xl font-bold text-blue-500">${player.totalKills || 0}</div>
                            <div class="text-xs text-gray-500">${t.stats.kills || 'K'}</div>
                        </div>
                        <div class="bg-gray-50 rounded-lg p-3">
                            <div class="text-xl font-bold text-red-500">${player.totalDeaths || 0}</div>
                            <div class="text-xs text-gray-500">Deaths</div>
                        </div>
                        <div class="bg-gray-50 rounded-lg p-3">
                            <div class="text-xl font-bold text-green-500">${player.totalAssists || 0}</div>
                            <div class="text-xs text-gray-500">${t.stats.assists || 'A'}</div>
                        </div>
                        <div class="bg-gray-50 rounded-lg p-3">
                            <div class="text-xl font-bold text-yellow-500">${player.mvpCount || 0}</div>
                            <div class="text-xs text-gray-500">MVP</div>
                        </div>
                    </div>
                    
                    <div class="bg-cyan-50 rounded-lg p-4 text-center">
                        <div class="text-3xl font-bold text-cyan-600">${(player.kda || 0).toFixed(2)}</div>
                        <div class="text-sm text-gray-500">KDA Ratio</div>
                    </div>
                </div>
            `,
            showCloseButton: true,
            showConfirmButton: false,
            width: 450
        });
    };
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-center h-64",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "animate-spin rounded-full h-12 w-12 border-4 border-cyan-aura border-t-transparent"
            }, void 0, false, {
                fileName: "[project]/app/admin/game-stats/page.tsx",
                lineNumber: 129,
                columnNumber: 17
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/admin/game-stats/page.tsx",
            lineNumber: 128,
            columnNumber: 13
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col md:flex-row md:items-center justify-between gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-2xl font-display font-bold text-uefa-dark",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                        className: "fas fa-chart-line mr-3 text-cyan-aura"
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/game-stats/page.tsx",
                                        lineNumber: 140,
                                        columnNumber: 25
                                    }, this),
                                    t.admin.playerStatsTitle || 'Player Statistics'
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/admin/game-stats/page.tsx",
                                lineNumber: 139,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-gray-500 mt-1",
                                children: t.admin.playerStatsSubtitle.replace('{count}', String(filteredStats.length))
                            }, void 0, false, {
                                fileName: "[project]/app/admin/game-stats/page.tsx",
                                lineNumber: 143,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/admin/game-stats/page.tsx",
                        lineNumber: 138,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: fetchStats,
                        className: "flex items-center justify-center gap-2 px-4 py-2 bg-cyan-aura text-white rounded-lg hover:bg-cyan-500 transition-colors w-full md:w-auto",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                className: "fas fa-sync-alt"
                            }, void 0, false, {
                                fileName: "[project]/app/admin/game-stats/page.tsx",
                                lineNumber: 149,
                                columnNumber: 21
                            }, this),
                            t.common.retry
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/admin/game-stats/page.tsx",
                        lineNumber: 145,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/admin/game-stats/page.tsx",
                lineNumber: 137,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white rounded-xl shadow-sm p-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col md:flex-row gap-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative flex-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                    className: "fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/game-stats/page.tsx",
                                    lineNumber: 159,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    placeholder: t.admin.searchPlayer || 'Search players...',
                                    value: searchTerm,
                                    onChange: (e)=>setSearchTerm(e.target.value),
                                    className: "w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cyan-aura focus:border-transparent"
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/game-stats/page.tsx",
                                    lineNumber: 160,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/admin/game-stats/page.tsx",
                            lineNumber: 158,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-full md:w-48",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                value: filterTeam,
                                onChange: (e)=>setFilterTeam(e.target.value),
                                className: "w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cyan-aura focus:border-transparent",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "",
                                        children: t.admin.allTeams || 'All Teams'
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/game-stats/page.tsx",
                                        lineNumber: 176,
                                        columnNumber: 29
                                    }, this),
                                    uniqueTeams.map((team)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: team,
                                            children: team
                                        }, team, false, {
                                            fileName: "[project]/app/admin/game-stats/page.tsx",
                                            lineNumber: 178,
                                            columnNumber: 33
                                        }, this))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/admin/game-stats/page.tsx",
                                lineNumber: 171,
                                columnNumber: 25
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/admin/game-stats/page.tsx",
                            lineNumber: 170,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-full md:w-48",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                value: sortBy,
                                onChange: (e)=>setSortBy(e.target.value),
                                className: "w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cyan-aura focus:border-transparent",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "kda",
                                        children: "KDA"
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/game-stats/page.tsx",
                                        lineNumber: 190,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "kills",
                                        children: "Kills"
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/game-stats/page.tsx",
                                        lineNumber: 191,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "mvp",
                                        children: "MVP"
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/game-stats/page.tsx",
                                        lineNumber: 192,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "winRate",
                                        children: "Win Rate"
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/game-stats/page.tsx",
                                        lineNumber: 193,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/admin/game-stats/page.tsx",
                                lineNumber: 185,
                                columnNumber: 25
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/admin/game-stats/page.tsx",
                            lineNumber: 184,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/admin/game-stats/page.tsx",
                    lineNumber: 156,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/admin/game-stats/page.tsx",
                lineNumber: 155,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white rounded-xl shadow-sm overflow-hidden hidden md:block",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "overflow-x-auto",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                        className: "w-full",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                className: "bg-gray-50 border-b border-gray-200",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase",
                                            children: "#"
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/game-stats/page.tsx",
                                            lineNumber: 205,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase",
                                            children: t.stats.playerShort
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/game-stats/page.tsx",
                                            lineNumber: 206,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase",
                                            children: t.admin.dashboard.manageTeamsDesc
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/game-stats/page.tsx",
                                            lineNumber: 207,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "px-4 py-3 text-center text-xs font-bold text-gray-500 uppercase",
                                            children: "G"
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/game-stats/page.tsx",
                                            lineNumber: 208,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "px-4 py-3 text-center text-xs font-bold text-gray-500 uppercase",
                                            children: "WR%"
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/game-stats/page.tsx",
                                            lineNumber: 209,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "px-4 py-3 text-center text-xs font-bold text-blue-500 uppercase",
                                            children: "K"
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/game-stats/page.tsx",
                                            lineNumber: 210,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "px-4 py-3 text-center text-xs font-bold text-red-500 uppercase",
                                            children: "D"
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/game-stats/page.tsx",
                                            lineNumber: 211,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "px-4 py-3 text-center text-xs font-bold text-green-500 uppercase",
                                            children: "A"
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/game-stats/page.tsx",
                                            lineNumber: 212,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "px-4 py-3 text-center text-xs font-bold text-yellow-500 uppercase",
                                            children: "MVP"
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/game-stats/page.tsx",
                                            lineNumber: 213,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "px-4 py-3 text-center text-xs font-bold text-cyan-500 uppercase",
                                            children: "KDA"
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/game-stats/page.tsx",
                                            lineNumber: 214,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "px-4 py-3 text-center text-xs font-bold text-gray-500 uppercase",
                                            children: "Action"
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/game-stats/page.tsx",
                                            lineNumber: 215,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/admin/game-stats/page.tsx",
                                    lineNumber: 204,
                                    columnNumber: 29
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/admin/game-stats/page.tsx",
                                lineNumber: 203,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                className: "divide-y divide-gray-100",
                                children: filteredStats.map((player, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        className: "hover:bg-gray-50 transition-colors",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "px-4 py-3",
                                                children: index < 3 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: `w-7 h-7 rounded-full flex items-center justify-center text-white font-bold text-sm ${index === 0 ? 'bg-gradient-to-br from-yellow-400 to-yellow-600' : index === 1 ? 'bg-gradient-to-br from-gray-300 to-gray-500' : 'bg-gradient-to-br from-orange-400 to-orange-600'}`,
                                                    children: index + 1
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/game-stats/page.tsx",
                                                    lineNumber: 223,
                                                    columnNumber: 45
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-gray-400 font-bold",
                                                    children: index + 1
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/game-stats/page.tsx",
                                                    lineNumber: 230,
                                                    columnNumber: 45
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/game-stats/page.tsx",
                                                lineNumber: 221,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "px-4 py-3",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "font-bold text-uefa-dark",
                                                            children: player.realName || player.playerName
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/admin/game-stats/page.tsx",
                                                            lineNumber: 235,
                                                            columnNumber: 45
                                                        }, this),
                                                        player.realName && player.playerName && player.realName !== player.playerName && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-xs text-gray-400",
                                                            children: [
                                                                "IGN: ",
                                                                player.playerName
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/admin/game-stats/page.tsx",
                                                            lineNumber: 237,
                                                            columnNumber: 49
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/admin/game-stats/page.tsx",
                                                    lineNumber: 234,
                                                    columnNumber: 41
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/game-stats/page.tsx",
                                                lineNumber: 233,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "px-4 py-3 text-sm text-gray-600",
                                                children: player.teamName
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/game-stats/page.tsx",
                                                lineNumber: 241,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "px-4 py-3 text-center font-mono font-bold text-gray-600",
                                                children: player.gamesPlayed
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/game-stats/page.tsx",
                                                lineNumber: 242,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "px-4 py-3 text-center",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: `font-bold text-sm ${player.winRate >= 70 ? 'text-green-600' : player.winRate >= 50 ? 'text-cyan-600' : 'text-orange-500'}`,
                                                    children: [
                                                        player.winRate,
                                                        "%"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/admin/game-stats/page.tsx",
                                                    lineNumber: 244,
                                                    columnNumber: 41
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/game-stats/page.tsx",
                                                lineNumber: 243,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "px-4 py-3 text-center font-mono font-bold text-blue-600",
                                                children: player.totalKills
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/game-stats/page.tsx",
                                                lineNumber: 251,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "px-4 py-3 text-center font-mono font-bold text-red-500",
                                                children: player.totalDeaths
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/game-stats/page.tsx",
                                                lineNumber: 252,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "px-4 py-3 text-center font-mono font-bold text-green-600",
                                                children: player.totalAssists
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/game-stats/page.tsx",
                                                lineNumber: 253,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "px-4 py-3 text-center",
                                                children: (player.mvpCount || 0) > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "inline-flex items-center gap-1 bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full font-bold text-sm",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                            className: "fas fa-crown text-xs"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/admin/game-stats/page.tsx",
                                                            lineNumber: 257,
                                                            columnNumber: 49
                                                        }, this),
                                                        player.mvpCount
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/admin/game-stats/page.tsx",
                                                    lineNumber: 256,
                                                    columnNumber: 45
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-gray-300",
                                                    children: "-"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/game-stats/page.tsx",
                                                    lineNumber: 261,
                                                    columnNumber: 45
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/game-stats/page.tsx",
                                                lineNumber: 254,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "px-4 py-3 text-center",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-lg font-bold text-cyan-aura",
                                                    children: (player.kda || 0).toFixed(2)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/game-stats/page.tsx",
                                                    lineNumber: 265,
                                                    columnNumber: 41
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/game-stats/page.tsx",
                                                lineNumber: 264,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "px-4 py-3 text-center",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>handleViewPlayerDetails(player),
                                                    className: "w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center mx-auto text-gray-500 hover:bg-cyan-aura hover:text-white transition-all transform hover:scale-110 shadow-sm",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                        className: "fas fa-eye"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/admin/game-stats/page.tsx",
                                                        lineNumber: 272,
                                                        columnNumber: 45
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/game-stats/page.tsx",
                                                    lineNumber: 268,
                                                    columnNumber: 41
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/game-stats/page.tsx",
                                                lineNumber: 267,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, `${player.teamName}-${player.realName}`, true, {
                                        fileName: "[project]/app/admin/game-stats/page.tsx",
                                        lineNumber: 220,
                                        columnNumber: 33
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/admin/game-stats/page.tsx",
                                lineNumber: 218,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/admin/game-stats/page.tsx",
                        lineNumber: 202,
                        columnNumber: 21
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/admin/game-stats/page.tsx",
                    lineNumber: 201,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/admin/game-stats/page.tsx",
                lineNumber: 200,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "md:hidden space-y-4",
                children: [
                    filteredStats.map((player, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white p-4 rounded-xl border border-gray-100 shadow-sm relative",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex justify-between items-start mb-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: `w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${index === 0 ? 'bg-gradient-to-br from-yellow-400 to-yellow-600' : index === 1 ? 'bg-gradient-to-br from-gray-300 to-gray-500' : index === 2 ? 'bg-gradient-to-br from-orange-400 to-orange-600' : 'bg-gray-100 text-gray-500'}`,
                                                    children: index + 1
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/game-stats/page.tsx",
                                                    lineNumber: 288,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "font-bold text-uefa-dark",
                                                            children: player.realName || player.playerName
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/admin/game-stats/page.tsx",
                                                            lineNumber: 296,
                                                            columnNumber: 37
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-xs text-gray-500",
                                                            children: player.teamName
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/admin/game-stats/page.tsx",
                                                            lineNumber: 297,
                                                            columnNumber: 37
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/admin/game-stats/page.tsx",
                                                    lineNumber: 295,
                                                    columnNumber: 33
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/admin/game-stats/page.tsx",
                                            lineNumber: 287,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>handleViewPlayerDetails(player),
                                            className: "w-8 h-8 rounded-lg bg-gray-50 text-gray-500 flex items-center justify-center hover:bg-cyan-aura hover:text-white transition-colors",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                className: "fas fa-eye"
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/game-stats/page.tsx",
                                                lineNumber: 304,
                                                columnNumber: 33
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/game-stats/page.tsx",
                                            lineNumber: 300,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/admin/game-stats/page.tsx",
                                    lineNumber: 286,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-3 gap-2 mb-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-gray-50 p-2 rounded text-center",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-xs text-gray-400",
                                                    children: "Matches"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/game-stats/page.tsx",
                                                    lineNumber: 310,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "font-bold text-gray-700",
                                                    children: player.gamesPlayed
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/game-stats/page.tsx",
                                                    lineNumber: 311,
                                                    columnNumber: 33
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/admin/game-stats/page.tsx",
                                            lineNumber: 309,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-gray-50 p-2 rounded text-center",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-xs text-gray-400",
                                                    children: "Win Rate"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/game-stats/page.tsx",
                                                    lineNumber: 314,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: `font-bold ${player.winRate >= 50 ? 'text-green-600' : 'text-orange-500'}`,
                                                    children: [
                                                        player.winRate,
                                                        "%"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/admin/game-stats/page.tsx",
                                                    lineNumber: 315,
                                                    columnNumber: 33
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/admin/game-stats/page.tsx",
                                            lineNumber: 313,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-cyan-50 p-2 rounded text-center border border-cyan-100",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-xs text-cyan-600",
                                                    children: "KDA"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/game-stats/page.tsx",
                                                    lineNumber: 320,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "font-bold text-cyan-700",
                                                    children: (player.kda || 0).toFixed(2)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/game-stats/page.tsx",
                                                    lineNumber: 321,
                                                    columnNumber: 33
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/admin/game-stats/page.tsx",
                                            lineNumber: 319,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/admin/game-stats/page.tsx",
                                    lineNumber: 308,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between text-sm bg-gray-50 px-3 py-2 rounded-lg",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex gap-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-blue-500 font-bold",
                                                            children: player.totalKills
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/admin/game-stats/page.tsx",
                                                            lineNumber: 327,
                                                            columnNumber: 38
                                                        }, this),
                                                        " ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-gray-400 text-xs",
                                                            children: "K"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/admin/game-stats/page.tsx",
                                                            lineNumber: 327,
                                                            columnNumber: 107
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/admin/game-stats/page.tsx",
                                                    lineNumber: 327,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-red-500 font-bold",
                                                            children: player.totalDeaths
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/admin/game-stats/page.tsx",
                                                            lineNumber: 328,
                                                            columnNumber: 38
                                                        }, this),
                                                        " ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-gray-400 text-xs",
                                                            children: "D"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/admin/game-stats/page.tsx",
                                                            lineNumber: 328,
                                                            columnNumber: 107
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/admin/game-stats/page.tsx",
                                                    lineNumber: 328,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-green-500 font-bold",
                                                            children: player.totalAssists
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/admin/game-stats/page.tsx",
                                                            lineNumber: 329,
                                                            columnNumber: 38
                                                        }, this),
                                                        " ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-gray-400 text-xs",
                                                            children: "A"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/admin/game-stats/page.tsx",
                                                            lineNumber: 329,
                                                            columnNumber: 110
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/admin/game-stats/page.tsx",
                                                    lineNumber: 329,
                                                    columnNumber: 33
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/admin/game-stats/page.tsx",
                                            lineNumber: 326,
                                            columnNumber: 29
                                        }, this),
                                        (player.mvpCount || 0) > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "flex items-center gap-1 text-yellow-600 font-bold text-xs bg-yellow-50 px-2 py-0.5 rounded-full",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                    className: "fas fa-crown"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/game-stats/page.tsx",
                                                    lineNumber: 333,
                                                    columnNumber: 37
                                                }, this),
                                                " ",
                                                player.mvpCount,
                                                " MVP"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/admin/game-stats/page.tsx",
                                            lineNumber: 332,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/admin/game-stats/page.tsx",
                                    lineNumber: 325,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, `${player.teamName}-${player.realName}`, true, {
                            fileName: "[project]/app/admin/game-stats/page.tsx",
                            lineNumber: 285,
                            columnNumber: 21
                        }, this)),
                    filteredStats.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-200",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                className: "fas fa-chart-bar text-4xl text-gray-300 mb-3"
                            }, void 0, false, {
                                fileName: "[project]/app/admin/game-stats/page.tsx",
                                lineNumber: 342,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-gray-500",
                                children: t.common.noData
                            }, void 0, false, {
                                fileName: "[project]/app/admin/game-stats/page.tsx",
                                lineNumber: 343,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/admin/game-stats/page.tsx",
                        lineNumber: 341,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/admin/game-stats/page.tsx",
                lineNumber: 283,
                columnNumber: 13
            }, this),
            playerStats.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-2 md:grid-cols-4 gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-5 text-white",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-3xl font-bold",
                                children: playerStats.reduce((acc, p)=>acc + (p.totalKills || 0), 0)
                            }, void 0, false, {
                                fileName: "[project]/app/admin/game-stats/page.tsx",
                                lineNumber: 352,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-blue-100 text-sm",
                                children: t.stats.kills
                            }, void 0, false, {
                                fileName: "[project]/app/admin/game-stats/page.tsx",
                                lineNumber: 353,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/admin/game-stats/page.tsx",
                        lineNumber: 351,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-5 text-white",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-3xl font-bold",
                                children: playerStats.reduce((acc, p)=>acc + (p.totalAssists || 0), 0)
                            }, void 0, false, {
                                fileName: "[project]/app/admin/game-stats/page.tsx",
                                lineNumber: 356,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-green-100 text-sm",
                                children: t.stats.assists
                            }, void 0, false, {
                                fileName: "[project]/app/admin/game-stats/page.tsx",
                                lineNumber: 357,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/admin/game-stats/page.tsx",
                        lineNumber: 355,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl p-5 text-white",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-3xl font-bold",
                                children: playerStats.reduce((acc, p)=>acc + (p.mvpCount || 0), 0)
                            }, void 0, false, {
                                fileName: "[project]/app/admin/game-stats/page.tsx",
                                lineNumber: 360,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-yellow-100 text-sm",
                                children: "Total MVP"
                            }, void 0, false, {
                                fileName: "[project]/app/admin/game-stats/page.tsx",
                                lineNumber: 361,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/admin/game-stats/page.tsx",
                        lineNumber: 359,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl p-5 text-white",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-3xl font-bold",
                                children: (playerStats.reduce((acc, p)=>acc + (p.kda || 0), 0) / playerStats.length).toFixed(2)
                            }, void 0, false, {
                                fileName: "[project]/app/admin/game-stats/page.tsx",
                                lineNumber: 364,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-cyan-100 text-sm",
                                children: "Avg KDA"
                            }, void 0, false, {
                                fileName: "[project]/app/admin/game-stats/page.tsx",
                                lineNumber: 367,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/admin/game-stats/page.tsx",
                        lineNumber: 363,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/admin/game-stats/page.tsx",
                lineNumber: 350,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/admin/game-stats/page.tsx",
        lineNumber: 135,
        columnNumber: 9
    }, this);
}
_s(AdminGameStatsPage, "uTpi4gcfAdADnlyJN+2Ii6l0z6w=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$providers$2f$LanguageProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLanguage"]
    ];
});
_c = AdminGameStatsPage;
var _c;
__turbopack_context__.k.register(_c, "AdminGameStatsPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_5e1f3cf3._.js.map