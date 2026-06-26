module.exports = [
"[project]/lib/api-client.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/supabase/client.ts [app-ssr] (ecmascript)");
'use client';
;
// ── Helper: get active tournament ID (client-side) ────────────
async function getActiveTournamentId() {
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createClient"])();
    const { data } = await supabase.from('tournaments').select('id').eq('status', 'active').order('created_at', {
        ascending: false
    }).limit(1).maybeSingle();
    return data?.id || null;
}
const apiService = {
    // ── Reads ──────────────────────────────────────────────────
    getTeams: async ()=>{
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createClient"])();
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
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createClient"])();
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
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createClient"])();
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
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createClient"])();
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
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createClient"])();
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
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createClient"])();
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
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createClient"])();
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
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createClient"])();
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
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createClient"])();
        const { data, error } = await supabase.rpc('get_season_overview', {
            p_tournament_id: tournamentId
        });
        if (error) throw new Error(error.message);
        return data;
    },
    getHeroes: async ()=>{
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createClient"])();
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
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createClient"])();
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
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createClient"])();
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
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createClient"])();
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
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createClient"])();
        const tournamentId = await getActiveTournamentId();
        if (!tournamentId) throw new Error('No active tournament');
        const { error } = await supabase.from('matches').delete().eq('tournament_id', tournamentId).eq('match_key', matchId);
        if (error) throw new Error(error.message);
        return {
            success: true
        };
    },
    resetResults: async (day)=>{
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createClient"])();
        const tournamentId = await getActiveTournamentId();
        if (!tournamentId) throw new Error('No active tournament');
        const { error } = await supabase.from('matches').delete().eq('tournament_id', tournamentId).eq('match_day', Number(day));
        if (error) throw new Error(error.message);
        return {
            success: true
        };
    },
    deleteTeamLogo: async (teamName)=>{
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createClient"])();
        const { error } = await supabase.from('teams').update({
            logo_url: null
        }).eq('name', teamName);
        if (error) throw new Error(error.message);
        return {
            success: true
        };
    },
    saveGameStats: async (stats)=>{
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createClient"])();
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
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createClient"])();
        const { data, error } = await supabase.from('game_stats').select('*').eq('match_id', matchId).order('game_number', {
            ascending: true
        });
        if (error) throw new Error(error.message);
        return data;
    },
    // ── Uploads ────────────────────────────────────────────────
    // File uploads go directly to Supabase Storage
    uploadImage: async (formData)=>{
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createClient"])();
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
}),
"[project]/app/admin/schedule/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AdminSchedulePage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sweetalert2$2f$dist$2f$sweetalert2$2e$esm$2e$all$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sweetalert2/dist/sweetalert2.esm.all.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$providers$2f$LanguageProvider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/providers/LanguageProvider.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api-client.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
// Helper function to convert day number to display label
const getDayLabel = (day)=>{
    switch(day){
        case 90:
            return 'Semi Finals';
        case 91:
            return 'Grand Finals';
        default:
            return `Day ${day}`;
    }
};
function AdminSchedulePage() {
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$providers$2f$LanguageProvider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useLanguage"])();
    const [schedule, setSchedule] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [results, setResults] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [selectedDay, setSelectedDay] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [searchTerm, setSearchTerm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const fetchData = async ()=>{
            try {
                const [scheduleData, resultsData] = await Promise.all([
                    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiService"].getSchedule(),
                    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiService"].getResults()
                ]);
                // Handle schedule data structure: { schedule: [...] } or [...]
                const scheduleList = scheduleData.schedule || scheduleData || [];
                setSchedule(scheduleList);
                setResults(resultsData || []);
                if (scheduleList.length > 0 && selectedDay === null) {
                    setSelectedDay(scheduleList[0]?.day || 1);
                }
            } catch (error) {
                console.error('Error fetching schedule:', error);
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sweetalert2$2f$dist$2f$sweetalert2$2e$esm$2e$all$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].fire({
                    icon: 'error',
                    title: t.common.error
                });
            } finally{
                setLoading(false);
            }
        };
        fetchData();
    }, []); // Empty dependency array to fetch only once on mount
    const getMatchId = (day, index, blue, red)=>{
        return `${day}_${blue}_vs_${red}`.replace(/\s+/g, '');
    };
    const getMatchStatus = (matchId)=>{
        const result = results.find((r)=>r.matchId === matchId);
        if (result) {
            if (result.isByeWin || result.scoreBlue === 0 && result.scoreRed === 0 && result.winner) {
                return {
                    status: 'bye',
                    result
                };
            }
            return {
                status: 'completed',
                result
            };
        }
        return {
            status: 'pending',
            result: null
        };
    };
    const getDayStats = (day)=>{
        const total = day.matches?.length || 0;
        const completed = day.matches?.filter((m, idx)=>{
            const matchId = getMatchId(day.day, idx, m.blue, m.red);
            return getMatchStatus(matchId).status !== 'pending';
        }).length || 0;
        return {
            total,
            completed,
            pending: total - completed
        };
    };
    const filteredSchedule = schedule.filter((day)=>{
        if (!searchTerm) return true;
        return day.matches?.some((m)=>m.blue?.toLowerCase().includes(searchTerm.toLowerCase()) || m.red?.toLowerCase().includes(searchTerm.toLowerCase()));
    });
    const selectedDayData = schedule.find((d)=>d.day === selectedDay);
    const handleViewMatchDetails = (match, matchId)=>{
        const { status, result } = getMatchStatus(matchId);
        let content = `
            <div class="text-center">
                <div class="flex items-center justify-center gap-4 mb-4">
                    <div class="text-xl font-bold">${match.blue}</div>
                    <div class="text-gray-400">vs</div>
                    <div class="text-xl font-bold">${match.red}</div>
                </div>
        `;
        // Note: Using t.admin.schedulePage... directly requires strict types or updated translations.
        // Fallback or explicit checks are safer if translation keys are new.
        const winnerLabel = t.admin?.dashboard?.completed || 'Winner';
        if (status === 'completed' && result) {
            content += `
                <div class="bg-green-50 rounded-lg p-4 mb-4">
                    <div class="text-3xl font-bold text-green-600">${result.scoreBlue} - ${result.scoreRed}</div>
                    <div class="text-sm text-green-500 mt-1">${winnerLabel}: ${result.winner}</div>
                </div>
            `;
        } else if (status === 'bye') {
            content += `
                <div class="bg-yellow-50 rounded-lg p-4 mb-4">
                    <div class="text-xl font-bold text-yellow-600">BYE</div>
                    <div class="text-sm text-yellow-500 mt-1">${winnerLabel}: ${result?.winner}</div>
                </div>
            `;
        } else {
            const notPlayedLabel = t.admin.schedulePage.notPlayed;
            content += `
                <div class="bg-gray-50 rounded-lg p-4 mb-4">
                    <div class="text-xl font-bold text-gray-400">${notPlayedLabel}</div>
                </div>
            `;
        }
        content += `
            <div class="text-sm text-gray-500">Match ID: ${matchId}</div>
        </div>`;
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sweetalert2$2f$dist$2f$sweetalert2$2e$esm$2e$all$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].fire({
            title: `Match Details`,
            html: content,
            showCloseButton: true,
            showConfirmButton: false,
            width: 450
        });
    };
    const handleRefresh = ()=>{
        window.location.reload();
    };
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-center h-64",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "animate-spin rounded-full h-12 w-12 border-4 border-cyan-aura border-t-transparent"
            }, void 0, false, {
                fileName: "[project]/app/admin/schedule/page.tsx",
                lineNumber: 146,
                columnNumber: 17
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/admin/schedule/page.tsx",
            lineNumber: 145,
            columnNumber: 13
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-2xl font-display font-bold text-uefa-dark",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                        className: "fas fa-calendar-check mr-3 text-cyan-aura"
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/schedule/page.tsx",
                                        lineNumber: 157,
                                        columnNumber: 25
                                    }, this),
                                    t.admin.schedulePage.title
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/admin/schedule/page.tsx",
                                lineNumber: 156,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-gray-500 mt-1",
                                children: [
                                    schedule.length,
                                    " ",
                                    t.admin.schedulePage.matchDays,
                                    " • ",
                                    schedule.reduce((acc, d)=>acc + (d.matches?.length || 0), 0),
                                    " ",
                                    t.admin.schedulePage.totalMatches
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/admin/schedule/page.tsx",
                                lineNumber: 160,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/admin/schedule/page.tsx",
                        lineNumber: 155,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleRefresh,
                        className: "px-4 py-2 bg-cyan-aura text-white rounded-lg hover:bg-cyan-500 transition-colors",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                className: "fas fa-sync-alt mr-2"
                            }, void 0, false, {
                                fileName: "[project]/app/admin/schedule/page.tsx",
                                lineNumber: 168,
                                columnNumber: 21
                            }, this),
                            t.admin.schedulePage.refresh
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/admin/schedule/page.tsx",
                        lineNumber: 164,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/admin/schedule/page.tsx",
                lineNumber: 154,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white rounded-xl shadow-sm p-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                            className: "fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                        }, void 0, false, {
                            fileName: "[project]/app/admin/schedule/page.tsx",
                            lineNumber: 176,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            type: "text",
                            placeholder: t.admin.teamsPage.search,
                            value: searchTerm,
                            onChange: (e)=>setSearchTerm(e.target.value),
                            className: "w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cyan-aura focus:border-transparent"
                        }, void 0, false, {
                            fileName: "[project]/app/admin/schedule/page.tsx",
                            lineNumber: 177,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/admin/schedule/page.tsx",
                    lineNumber: 175,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/admin/schedule/page.tsx",
                lineNumber: 174,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 lg:grid-cols-4 gap-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "lg:col-span-1",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white rounded-xl shadow-sm p-4 sticky top-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "font-bold text-uefa-dark mb-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                            className: "fas fa-calendar-day mr-2 text-cyan-aura"
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/schedule/page.tsx",
                                            lineNumber: 192,
                                            columnNumber: 29
                                        }, this),
                                        t.admin.schedulePage.matchDays
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/admin/schedule/page.tsx",
                                    lineNumber: 191,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-2 max-h-96 overflow-y-auto",
                                    children: filteredSchedule.map((day)=>{
                                        const stats = getDayStats(day);
                                        const isCompleted = stats.completed === stats.total && stats.total > 0;
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setSelectedDay(day.day),
                                            className: `w-full p-3 rounded-lg text-left transition-all ${selectedDay === day.day ? 'bg-cyan-aura text-white shadow-md' : 'bg-gray-50 hover:bg-gray-100 text-gray-700'}`,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center justify-between",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-bold",
                                                            children: getDayLabel(day.day)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/admin/schedule/page.tsx",
                                                            lineNumber: 210,
                                                            columnNumber: 45
                                                        }, this),
                                                        isCompleted ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                            className: `fas fa-check-circle ${selectedDay === day.day ? 'text-white' : 'text-green-500'}`
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/admin/schedule/page.tsx",
                                                            lineNumber: 212,
                                                            columnNumber: 49
                                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: `text-xs ${selectedDay === day.day ? 'text-white/80' : 'text-gray-400'}`,
                                                            children: [
                                                                stats.completed,
                                                                "/",
                                                                stats.total
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/admin/schedule/page.tsx",
                                                            lineNumber: 214,
                                                            columnNumber: 49
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/admin/schedule/page.tsx",
                                                    lineNumber: 209,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: `text-xs mt-1 ${selectedDay === day.day ? 'text-white/70' : 'text-gray-400'}`,
                                                    children: [
                                                        stats.total,
                                                        " ",
                                                        t.admin.schedulePage.matches
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/admin/schedule/page.tsx",
                                                    lineNumber: 219,
                                                    columnNumber: 41
                                                }, this)
                                            ]
                                        }, day.day, true, {
                                            fileName: "[project]/app/admin/schedule/page.tsx",
                                            lineNumber: 201,
                                            columnNumber: 37
                                        }, this);
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/schedule/page.tsx",
                                    lineNumber: 195,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/admin/schedule/page.tsx",
                            lineNumber: 190,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/admin/schedule/page.tsx",
                        lineNumber: 189,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "lg:col-span-3",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white rounded-xl shadow-sm",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-5 border-b border-gray-100",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "font-bold text-uefa-dark",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                className: "fas fa-gamepad mr-2 text-cyan-aura"
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/schedule/page.tsx",
                                                lineNumber: 234,
                                                columnNumber: 33
                                            }, this),
                                            selectedDay ? `${getDayLabel(selectedDay)} - ${selectedDayData?.matches?.length || 0} ${t.admin.schedulePage.matches}` : t.admin.schedulePage.selectDay
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/admin/schedule/page.tsx",
                                        lineNumber: 233,
                                        columnNumber: 29
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/schedule/page.tsx",
                                    lineNumber: 232,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-5",
                                    children: selectedDayData && selectedDayData.matches && selectedDayData.matches.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-3",
                                        children: selectedDayData.matches.map((match, index)=>{
                                            const matchId = getMatchId(selectedDayData.day, index, match.blue, match.red);
                                            const { status, result } = getMatchStatus(matchId);
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                onClick: ()=>handleViewMatchDetails(match, matchId),
                                                className: `p-4 rounded-xl border cursor-pointer transition-all hover:shadow-md ${status === 'completed' ? 'bg-green-50 border-green-200' : status === 'bye' ? 'bg-yellow-50 border-yellow-200' : 'bg-gray-50 border-gray-200 hover:border-cyan-aura'}`,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center justify-between",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center gap-4 flex-1",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: `flex-1 text-right font-bold ${result?.winner === match.blue ? 'text-green-600' : ''}`,
                                                                        children: match.blue
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/admin/schedule/page.tsx",
                                                                        lineNumber: 256,
                                                                        columnNumber: 57
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "px-4 py-2 rounded-lg bg-white shadow-sm min-w-[80px] text-center",
                                                                        children: status === 'completed' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "font-bold text-uefa-dark",
                                                                            children: [
                                                                                result?.scoreBlue,
                                                                                " - ",
                                                                                result?.scoreRed
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/admin/schedule/page.tsx",
                                                                            lineNumber: 262,
                                                                            columnNumber: 65
                                                                        }, this) : status === 'bye' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "font-bold text-yellow-600 text-sm",
                                                                            children: "BYE"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/admin/schedule/page.tsx",
                                                                            lineNumber: 266,
                                                                            columnNumber: 65
                                                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-gray-400 text-sm",
                                                                            children: "VS"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/admin/schedule/page.tsx",
                                                                            lineNumber: 268,
                                                                            columnNumber: 65
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/admin/schedule/page.tsx",
                                                                        lineNumber: 260,
                                                                        columnNumber: 57
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: `flex-1 text-left font-bold ${result?.winner === match.red ? 'text-green-600' : ''}`,
                                                                        children: match.red
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/admin/schedule/page.tsx",
                                                                        lineNumber: 272,
                                                                        columnNumber: 57
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/admin/schedule/page.tsx",
                                                                lineNumber: 255,
                                                                columnNumber: 53
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "ml-4",
                                                                children: [
                                                                    status === 'completed' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full",
                                                                        children: t.admin.schedulePage.completed
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/admin/schedule/page.tsx",
                                                                        lineNumber: 279,
                                                                        columnNumber: 61
                                                                    }, this),
                                                                    status === 'bye' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "px-3 py-1 bg-yellow-500 text-white text-xs font-bold rounded-full",
                                                                        children: "BYE"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/admin/schedule/page.tsx",
                                                                        lineNumber: 284,
                                                                        columnNumber: 61
                                                                    }, this),
                                                                    status === 'pending' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "px-3 py-1 bg-gray-300 text-gray-600 text-xs font-bold rounded-full",
                                                                        children: t.admin.schedulePage.pending
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/admin/schedule/page.tsx",
                                                                        lineNumber: 289,
                                                                        columnNumber: 61
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/admin/schedule/page.tsx",
                                                                lineNumber: 277,
                                                                columnNumber: 53
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/admin/schedule/page.tsx",
                                                        lineNumber: 254,
                                                        columnNumber: 49
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "mt-2 text-xs text-gray-400",
                                                        children: [
                                                            "Match ID: ",
                                                            matchId
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/admin/schedule/page.tsx",
                                                        lineNumber: 296,
                                                        columnNumber: 49
                                                    }, this)
                                                ]
                                            }, index, true, {
                                                fileName: "[project]/app/admin/schedule/page.tsx",
                                                lineNumber: 246,
                                                columnNumber: 45
                                            }, this);
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/schedule/page.tsx",
                                        lineNumber: 240,
                                        columnNumber: 33
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-center py-12",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                className: "fas fa-calendar-times text-5xl text-gray-300 mb-4"
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/schedule/page.tsx",
                                                lineNumber: 305,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-gray-500",
                                                children: t.admin.schedulePage.noMatchesToday
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/schedule/page.tsx",
                                                lineNumber: 306,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/admin/schedule/page.tsx",
                                        lineNumber: 304,
                                        columnNumber: 33
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/schedule/page.tsx",
                                    lineNumber: 238,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/admin/schedule/page.tsx",
                            lineNumber: 231,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/admin/schedule/page.tsx",
                        lineNumber: 230,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/admin/schedule/page.tsx",
                lineNumber: 187,
                columnNumber: 13
            }, this),
            schedule.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white rounded-xl shadow-sm p-12 text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                        className: "fas fa-calendar-plus text-6xl text-gray-300 mb-4"
                    }, void 0, false, {
                        fileName: "[project]/app/admin/schedule/page.tsx",
                        lineNumber: 316,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-xl font-bold text-gray-600 mb-2",
                        children: t.admin.schedulePage.noSchedule
                    }, void 0, false, {
                        fileName: "[project]/app/admin/schedule/page.tsx",
                        lineNumber: 317,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-400 mb-6",
                        children: t.admin.schedulePage.createScheduleHint
                    }, void 0, false, {
                        fileName: "[project]/app/admin/schedule/page.tsx",
                        lineNumber: 318,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        href: "/admin/draw",
                        className: "inline-flex items-center gap-2 px-6 py-3 bg-cyan-aura text-white rounded-lg hover:bg-cyan-500 transition-colors",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                className: "fas fa-random"
                            }, void 0, false, {
                                fileName: "[project]/app/admin/schedule/page.tsx",
                                lineNumber: 323,
                                columnNumber: 25
                            }, this),
                            t.admin.schedulePage.goToDraw
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/admin/schedule/page.tsx",
                        lineNumber: 319,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/admin/schedule/page.tsx",
                lineNumber: 315,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/admin/schedule/page.tsx",
        lineNumber: 152,
        columnNumber: 9
    }, this);
}
}),
];

//# sourceMappingURL=_60f527b0._.js.map