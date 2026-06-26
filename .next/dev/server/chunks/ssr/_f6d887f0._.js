module.exports = [
"[project]/utils/auth.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "checkRole",
    ()=>checkRole
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/supabase/server.ts [app-rsc] (ecmascript)");
;
async function checkRole(allowedRoles) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
        throw new Error('Unauthorized: Authentication required');
    }
    // Fetch role from profile (using the secure function or direct query)
    const { data: profile, error: profileError } = await supabase.from('profiles').select('role').eq('id', user.id).single();
    if (profileError || !profile) {
        throw new Error('Unauthorized: User profile not found');
    }
    const userRole = profile.role;
    if (!allowedRoles.includes(userRole)) {
        throw new Error(`Forbidden: Role '${userRole}' does not have permission. Required: [${allowedRoles.join(', ')}]`);
    }
    return {
        user,
        role: userRole
    };
}
}),
"[project]/features/analytics/dashboard-actions.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"0051c469751c97ba89aaa51c0f42591be8f1367109":"getAllUsersWithRolesAction","0086f2ca8c8dcc04e668a5e2938b2cdaf9dbf00176":"getAdminDashboardKPIsAction","00922306ddf08e9258f6c8114646d4cb8269d509d3":"getDashboardToDosAction","00ae9b2741cebcd3f4730e33812b4b515cedc2ed32":"getDashboardTopPerformersAction","4030c135c765ca00bea5f4977fb0ac6ccd7528b63b":"promoteUserToAdminAction","40e6e8655afdc09c9c58551844152497ca34ff2cb2":"getRecentActivityAction","60a5367786ca2718050eae0da245855e8d80c50575":"updateUserRoleAction"},"",""] */ __turbopack_context__.s([
    "getAdminDashboardKPIsAction",
    ()=>getAdminDashboardKPIsAction,
    "getAllUsersWithRolesAction",
    ()=>getAllUsersWithRolesAction,
    "getDashboardToDosAction",
    ()=>getDashboardToDosAction,
    "getDashboardTopPerformersAction",
    ()=>getDashboardTopPerformersAction,
    "getRecentActivityAction",
    ()=>getRecentActivityAction,
    "promoteUserToAdminAction",
    ()=>promoteUserToAdminAction,
    "updateUserRoleAction",
    ()=>updateUserRoleAction
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/supabase/server.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/auth.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
async function promoteUserToAdminAction(userId) {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["checkRole"])([
        'super_admin'
    ]);
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { error } = await supabase.from('profiles').update({
        role: 'admin'
    }).eq('id', userId);
    if (error) throw new Error(error.message);
    return {
        success: true
    };
}
async function getAllUsersWithRolesAction() {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["checkRole"])([
        'super_admin'
    ]);
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { data, error } = await supabase.from('profiles').select('id, username, role, student_id, created_at').order('created_at', {
        ascending: false
    });
    if (error) throw new Error(error.message);
    return data;
}
async function updateUserRoleAction(userId, newRole) {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["checkRole"])([
        'super_admin'
    ]);
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { error } = await supabase.from('profiles').update({
        role: newRole
    }).eq('id', userId);
    if (error) throw new Error(error.message);
    return {
        success: true
    };
}
async function getActiveTournamentId(supabase) {
    const { data } = await supabase.from('tournaments').select('id').eq('status', 'active').order('created_at', {
        ascending: false
    }).limit(1).maybeSingle();
    return data?.id || null;
}
async function getAdminDashboardKPIsAction() {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const tournamentId = await getActiveTournamentId(supabase);
    // 1. Team Stats
    const { count: totalTeams } = await supabase.from('teams').select('*', {
        count: 'exact',
        head: true
    });
    const { count: readyTeams } = await supabase.from('teams').select('*', {
        count: 'exact',
        head: true
    }).eq('status', 'ready');
    const { count: approvedTeams } = await supabase.from('teams').select('*', {
        count: 'exact',
        head: true
    }).eq('status', 'approved');
    // 2. Registration Stats
    const { count: pendingRegistrations } = await supabase.from('registrations').select('*', {
        count: 'exact',
        head: true
    }).eq('status', 'pending');
    // 3. Player Stats
    const { count: totalPlayers } = await supabase.from('players').select('*', {
        count: 'exact',
        head: true
    });
    // 4. Tournament Progress (Matches)
    let matchesPlayed = 0;
    let totalMatches = 0;
    if (tournamentId) {
        const { count: played } = await supabase.from('matches').select('*', {
            count: 'exact',
            head: true
        }).eq('tournament_id', tournamentId).not('winner_name', 'is', null);
        const { count: total } = await supabase.from('matches').select('*', {
            count: 'exact',
            head: true
        }).eq('tournament_id', tournamentId);
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
            progress: totalMatches > 0 ? Math.round(matchesPlayed / totalMatches * 100) : 0
        }
    };
}
async function getDashboardToDosAction() {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    // 1. Pending Registrations
    const { data: pendingRegs } = await supabase.from('registrations').select('id, full_name, in_game_name, created_at').eq('status', 'pending').order('created_at', {
        ascending: true
    }).limit(3);
    // 2. Ready Teams needing Approval
    const { data: readyTeams } = await supabase.from('teams').select('id, name, created_at').eq('status', 'ready').order('created_at', {
        ascending: true
    }).limit(3);
    // 3. Recent matches without results
    const { data: pendingMatches } = await supabase.from('matches').select('match_key, team_blue_name, team_red_name, match_day').is('winner_name', null).order('match_day', {
        ascending: true
    }).limit(3);
    return {
        registrations: pendingRegs || [],
        teams: readyTeams || [],
        matches: pendingMatches || []
    };
}
async function getRecentActivityAction(limit = 10) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { data, error } = await supabase.from('audit_logs').select(`
      *,
      actor:profiles!actor_id(username)
    `).order('created_at', {
        ascending: false
    }).limit(limit);
    if (error) {
        console.error('Error fetching recent activity:', error);
        return [];
    }
    return data;
}
async function getDashboardTopPerformersAction() {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const tournamentId = await getActiveTournamentId(supabase);
    if (!tournamentId) return null;
    // Get Top 3 Players by KDA using existing RPC logic or simplified query
    const { data: players } = await supabase.rpc('get_player_leaderboard', {
        p_tournament_id: tournamentId
    });
    // Get Top 3 Heroes by Pick Rate
    const { data: heroStats } = await supabase.from('game_stats').select('hero_name, match_id!inner(tournament_id)').eq('match_id.tournament_id', tournamentId);
    const heroMap = new Map();
    for (const row of heroStats || []){
        heroMap.set(row.hero_name, (heroMap.get(row.hero_name) || 0) + 1);
    }
    const topHeroes = Array.from(heroMap.entries()).map(([name, count])=>({
            name,
            count
        })).sort((a, b)=>b.count - a.count).slice(0, 3);
    return {
        topPlayers: (players || []).slice(0, 3),
        topHeroes
    };
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    promoteUserToAdminAction,
    getAllUsersWithRolesAction,
    updateUserRoleAction,
    getAdminDashboardKPIsAction,
    getDashboardToDosAction,
    getRecentActivityAction,
    getDashboardTopPerformersAction
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(promoteUserToAdminAction, "4030c135c765ca00bea5f4977fb0ac6ccd7528b63b", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getAllUsersWithRolesAction, "0051c469751c97ba89aaa51c0f42591be8f1367109", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateUserRoleAction, "60a5367786ca2718050eae0da245855e8d80c50575", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getAdminDashboardKPIsAction, "0086f2ca8c8dcc04e668a5e2938b2cdaf9dbf00176", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getDashboardToDosAction, "00922306ddf08e9258f6c8114646d4cb8269d509d3", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getRecentActivityAction, "40e6e8655afdc09c9c58551844152497ca34ff2cb2", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getDashboardTopPerformersAction, "00ae9b2741cebcd3f4730e33812b4b515cedc2ed32", null);
}),
"[project]/.next-internal/server/app/admin/page/actions.js { ACTIONS_MODULE0 => \"[project]/features/analytics/dashboard-actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$analytics$2f$dashboard$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/analytics/dashboard-actions.ts [app-rsc] (ecmascript)");
;
;
;
;
}),
"[project]/.next-internal/server/app/admin/page/actions.js { ACTIONS_MODULE0 => \"[project]/features/analytics/dashboard-actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "0086f2ca8c8dcc04e668a5e2938b2cdaf9dbf00176",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$features$2f$analytics$2f$dashboard$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getAdminDashboardKPIsAction"],
    "00922306ddf08e9258f6c8114646d4cb8269d509d3",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$features$2f$analytics$2f$dashboard$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getDashboardToDosAction"],
    "00ae9b2741cebcd3f4730e33812b4b515cedc2ed32",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$features$2f$analytics$2f$dashboard$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getDashboardTopPerformersAction"],
    "40e6e8655afdc09c9c58551844152497ca34ff2cb2",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$features$2f$analytics$2f$dashboard$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getRecentActivityAction"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$admin$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$features$2f$analytics$2f$dashboard$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/admin/page/actions.js { ACTIONS_MODULE0 => "[project]/features/analytics/dashboard-actions.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$analytics$2f$dashboard$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/analytics/dashboard-actions.ts [app-rsc] (ecmascript)");
}),
"[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/* eslint-disable import/no-extraneous-dependencies */ Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "registerServerReference", {
    enumerable: true,
    get: function() {
        return _server.registerServerReference;
    }
});
const _server = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)"); //# sourceMappingURL=server-reference.js.map
}),
"[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This function ensures that all the exported values are valid server actions,
// during the runtime. By definition all actions are required to be async
// functions, but here we can only check that they are functions.
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ensureServerEntryExports", {
    enumerable: true,
    get: function() {
        return ensureServerEntryExports;
    }
});
function ensureServerEntryExports(actions) {
    for(let i = 0; i < actions.length; i++){
        const action = actions[i];
        if (typeof action !== 'function') {
            throw Object.defineProperty(new Error(`A "use server" file can only export async functions, found ${typeof action}.\nRead more: https://nextjs.org/docs/messages/invalid-use-server-value`), "__NEXT_ERROR_CODE", {
                value: "E352",
                enumerable: false,
                configurable: true
            });
        }
    }
} //# sourceMappingURL=action-validate.js.map
}),
];

//# sourceMappingURL=_f6d887f0._.js.map