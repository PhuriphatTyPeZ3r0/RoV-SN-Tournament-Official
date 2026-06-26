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
"[project]/features/tournament/actions.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"004450085de9c4d560042866ad35e1c590a2721872":"getThemesAction","0065133cfdef9e6b51a2fdfd0c9727e7b23236617b":"getTournamentsAction","40007a059a29c3a73d1f66d5635e82ba6a221adc09":"saveMatchResultAction","4023e0445e6b2029daf1c13d39cf99d2961494dc39":"getResultHistoryAction","402d068542291a7b18c7137768ac86dae24e22e4a6":"getMatchStatsAction","40573b3343722eb5e2bb423fc6f415766d4470706c":"getScheduleAction","407790ee470765b46fde9d4b451fa1a5bf5467da69":"saveScheduleAction","40820af2be85ca1225e25420e8c9755126bf546093":"createThemeAction","4082bf5df3c99cfc52ed643b231ce143be05e0e6ed":"getMatchesAction","40920c661f0f8aa96a95cc403670062fb1ba3848a2":"deleteThemeAction","40e30c1481b25c68304a7fffb300621ed87aa5b155":"getMatchByKeyAction","60102cb212fad02aa779061b88000edce3eab190a2":"updateThemeAction","602a9bf9afd01bb67e82e540fb25fc87054e0af4bf":"updateTournamentThemeAction","602c91816706287fbec4b50c7db9fa143de0dadb71":"saveGameStatsAction","603d623d2ba24dce2434a6497742c00e1c2d182b47":"deleteMatchResultAction","7015c886b8d0efc3f2eb186c881d29412fd9d7ded8":"resetDayResultsAction"},"",""] */ __turbopack_context__.s([
    "createThemeAction",
    ()=>createThemeAction,
    "deleteMatchResultAction",
    ()=>deleteMatchResultAction,
    "deleteThemeAction",
    ()=>deleteThemeAction,
    "getMatchByKeyAction",
    ()=>getMatchByKeyAction,
    "getMatchStatsAction",
    ()=>getMatchStatsAction,
    "getMatchesAction",
    ()=>getMatchesAction,
    "getResultHistoryAction",
    ()=>getResultHistoryAction,
    "getScheduleAction",
    ()=>getScheduleAction,
    "getThemesAction",
    ()=>getThemesAction,
    "getTournamentsAction",
    ()=>getTournamentsAction,
    "resetDayResultsAction",
    ()=>resetDayResultsAction,
    "saveGameStatsAction",
    ()=>saveGameStatsAction,
    "saveMatchResultAction",
    ()=>saveMatchResultAction,
    "saveScheduleAction",
    ()=>saveScheduleAction,
    "updateThemeAction",
    ()=>updateThemeAction,
    "updateTournamentThemeAction",
    ()=>updateTournamentThemeAction
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/supabase/server.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/cache.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/auth.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/external.js [app-rsc] (ecmascript) <export * as z>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
;
async function getMatchesAction(tournamentId) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { data, error } = await supabase.from('matches').select('*').eq('tournament_id', tournamentId).order('match_day', {
        ascending: true
    });
    if (error) throw new Error(`Failed to fetch matches: ${error.message}`);
    return data;
}
async function getMatchByKeyAction(matchKey) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { data, error } = await supabase.from('matches').select('*, match_games(*)').eq('match_key', matchKey).single();
    if (error) throw new Error(`Failed to fetch match: ${error.message}`);
    return data;
}
async function getScheduleAction(tournamentId) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { data, error } = await supabase.from('schedules').select('*').eq('tournament_id', tournamentId).order('created_at', {
        ascending: false
    }).limit(1).single();
    if (error && error.code !== 'PGRST116') {
        // PGRST116 = no rows found — ไม่ถือเป็น error
        throw new Error(`Failed to fetch schedule: ${error.message}`);
    }
    return data;
}
async function getMatchStatsAction(matchId) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { data, error } = await supabase.from('game_stats').select('*').eq('match_id', matchId).order('game_number', {
        ascending: true
    }).order('team_name', {
        ascending: true
    });
    if (error) throw new Error(`Failed to fetch match stats: ${error.message}`);
    return data;
}
async function getResultHistoryAction(matchKey) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    let query = supabase.from('audit_logs').select(`
      *,
      actor:profiles!actor_id(username)
    `).eq('table_name', 'matches').order('created_at', {
        ascending: false
    }).limit(100);
    const { data, error } = await query;
    if (error) throw new Error(`Failed to fetch history: ${error.message}`);
    return data;
}
// ========================================
// WRITE Operations (Admin Only)
// ========================================
// Helper: verify admin session
async function requireAdmin() {
    const { user } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["checkRole"])([
        'admin',
        'super_admin'
    ]);
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    return {
        supabase,
        user
    };
}
async function saveMatchResultAction(resultData) {
    const { supabase, user } = await requireAdmin();
    const teamBlue = resultData.teamBlueName.trim();
    const teamRed = resultData.teamRedName.trim();
    const matchKey = `${resultData.matchDay}_${teamBlue}_vs_${teamRed}`.replace(/\s+/g, '');
    // Determine winner/loser
    let winnerName = null;
    let loserName = null;
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
    const { data: existing } = await supabase.from('matches').select('*').eq('match_key', matchKey).maybeSingle();
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
        is_bye_win: resultData.isByeWin || false
    };
    // Upsert match
    const { data: match, error: matchError } = await supabase.from('matches').upsert(matchPayload, {
        onConflict: 'match_key'
    }).select().single();
    if (matchError) throw new Error(`Failed to save match: ${matchError.message}`);
    // Save game details (normalized)
    if (resultData.gameDetails?.length && match) {
        // Clear old game details first
        await supabase.from('match_games').delete().eq('match_id', match.id);
        const games = resultData.gameDetails.map((g)=>({
                match_id: match.id,
                game_number: g.gameNumber,
                winner_name: g.winnerName,
                duration: g.duration || 0
            }));
        await supabase.from('match_games').insert(games);
    }
    // Audit trail
    await supabase.from('match_history').insert({
        match_key: matchKey,
        action: existing ? 'update' : 'create',
        previous_data: existing || null,
        new_data: matchPayload,
        changed_by: user.id
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/standings');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/fixtures');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/admin/results');
    return match;
}
async function deleteMatchResultAction(matchKey, reason) {
    const { supabase, user } = await requireAdmin();
    const { data: existing } = await supabase.from('matches').select('*').eq('match_key', matchKey).maybeSingle();
    if (existing) {
        // Audit trail before delete
        await supabase.from('match_history').insert({
            match_key: matchKey,
            action: 'delete',
            previous_data: existing,
            new_data: null,
            changed_by: user.id,
            reason: reason || 'Manual deletion'
        });
        // CASCADE จะลบ match_games และ game_stats ด้วย
        await supabase.from('matches').delete().eq('match_key', matchKey);
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/standings');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/fixtures');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/admin/results');
    return {
        success: true,
        matchKey
    };
}
async function resetDayResultsAction(tournamentId, day, reason) {
    const { supabase, user } = await requireAdmin();
    const { data: dayResults } = await supabase.from('matches').select('*').eq('tournament_id', tournamentId).eq('match_day', day);
    // Audit each deletion
    if (dayResults?.length) {
        const historyEntries = dayResults.map((result)=>({
                match_key: result.match_key,
                action: 'delete',
                previous_data: result,
                new_data: null,
                changed_by: user.id,
                reason: reason || `Day ${day} reset`
            }));
        await supabase.from('match_history').insert(historyEntries);
    }
    await supabase.from('matches').delete().eq('tournament_id', tournamentId).eq('match_day', day);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/standings');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/fixtures');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/admin/results');
    return {
        success: true,
        count: dayResults?.length || 0
    };
}
async function saveScheduleAction(scheduleData) {
    const { supabase } = await requireAdmin();
    const { data, error } = await supabase.from('schedules').insert({
        tournament_id: scheduleData.tournamentId,
        teams: scheduleData.teams,
        pot_a: scheduleData.potA,
        pot_b: scheduleData.potB,
        schedule_data: scheduleData.scheduleData
    }).select().single();
    if (error) throw new Error(`Failed to save schedule: ${error.message}`);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/fixtures');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/');
    return data;
}
async function saveGameStatsAction(matchId, stats) {
    const { supabase } = await requireAdmin();
    // Clear existing stats for this match
    await supabase.from('game_stats').delete().eq('match_id', matchId);
    const rows = stats.map((s)=>({
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
            win: s.win
        }));
    const { data, error } = await supabase.from('game_stats').insert(rows).select();
    if (error) throw new Error(`Failed to save stats: ${error.message}`);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/stats');
    return {
        count: data?.length || 0
    };
}
async function getTournamentsAction() {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { data, error } = await supabase.from('tournaments').select('*').order('season', {
        ascending: false
    });
    if (error) throw new Error(`Failed to fetch tournaments: ${error.message}`);
    return data;
}
async function updateTournamentThemeAction(tournamentId, themeStyle) {
    const { supabase } = await requireAdmin();
    const { data, error } = await supabase.from('tournaments').update({
        theme_style: themeStyle
    }).eq('id', tournamentId).select().single();
    if (error) throw new Error(`Failed to update theme: ${error.message}`);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/', 'layout');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/admin/themes');
    return data;
}
// ========================================
// THEMES CRUD Actions (Admin Only for Write)
// ========================================
const colorHexSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().regex(/^#[0-9A-F]{6}$/i, 'รหัสสีต้องเป็น Hex Code ขึ้นต้นด้วย # ตามด้วยเลขฐานสิบหก 6 หลัก (เช่น #15C8FF)');
const themeValidationSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1, 'ไอดีธีมต้องไม่ว่างเปล่า').regex(/^[a-z0-9-]+$/, 'ไอดีต้องเป็นภาษาอังกฤษพิมพ์เล็ก ตัวเลข หรือเครื่องหมาย - เท่านั้น'),
    name: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1, 'ชื่อธีมต้องไม่ว่างเปล่า'),
    description: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().nullable().optional(),
    primary_color: colorHexSchema,
    secondary_color: colorHexSchema,
    bg_deep: colorHexSchema,
    bg_surface: colorHexSchema,
    primary_light: colorHexSchema,
    primary_dark: colorHexSchema
});
async function getThemesAction() {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { data, error } = await supabase.from('themes').select('*').order('created_at', {
        ascending: true
    });
    if (error) throw new Error(`Failed to fetch themes: ${error.message}`);
    return data;
}
async function createThemeAction(themeData) {
    const { supabase } = await requireAdmin();
    const validated = themeValidationSchema.safeParse(themeData);
    if (!validated.success) {
        throw new Error(validated.error.issues[0].message);
    }
    const { data, error } = await supabase.from('themes').insert({
        ...validated.data,
        is_preset: false
    }).select().single();
    if (error) throw new Error(`Failed to create theme: ${error.message}`);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/', 'layout');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/admin/themes');
    return data;
}
async function updateThemeAction(themeId, themeData) {
    const { supabase } = await requireAdmin();
    // We validate name, description, and colors
    const updateSchema = themeValidationSchema.omit({
        id: true
    });
    const validated = updateSchema.safeParse(themeData);
    if (!validated.success) {
        throw new Error(validated.error.issues[0].message);
    }
    // Check if it is a preset theme
    const { data: existing, error: fetchError } = await supabase.from('themes').select('is_preset').eq('id', themeId).maybeSingle();
    if (fetchError) throw new Error(`Failed to check theme: ${fetchError.message}`);
    if (!existing) throw new Error('ไม่พบข้อมูลธีมนี้');
    const { data, error } = await supabase.from('themes').update(validated.data).eq('id', themeId).select().single();
    if (error) throw new Error(`Failed to update theme: ${error.message}`);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/', 'layout');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/admin/themes');
    return data;
}
async function deleteThemeAction(themeId) {
    const { supabase } = await requireAdmin();
    // Check if it is a preset theme
    const { data: existing, error: fetchError } = await supabase.from('themes').select('is_preset').eq('id', themeId).maybeSingle();
    if (fetchError) throw new Error(`Failed to check theme: ${fetchError.message}`);
    if (!existing) throw new Error('ไม่พบข้อมูลธีมนี้');
    if (existing.is_preset) {
        throw new Error('ไม่สามารถลบธีมระบบได้');
    }
    const { error } = await supabase.from('themes').delete().eq('id', themeId);
    if (error) throw new Error(`Failed to delete theme: ${error.message}`);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/', 'layout');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/admin/themes');
    return {
        success: true,
        themeId
    };
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    getMatchesAction,
    getMatchByKeyAction,
    getScheduleAction,
    getMatchStatsAction,
    getResultHistoryAction,
    saveMatchResultAction,
    deleteMatchResultAction,
    resetDayResultsAction,
    saveScheduleAction,
    saveGameStatsAction,
    getTournamentsAction,
    updateTournamentThemeAction,
    getThemesAction,
    createThemeAction,
    updateThemeAction,
    deleteThemeAction
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getMatchesAction, "4082bf5df3c99cfc52ed643b231ce143be05e0e6ed", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getMatchByKeyAction, "40e30c1481b25c68304a7fffb300621ed87aa5b155", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getScheduleAction, "40573b3343722eb5e2bb423fc6f415766d4470706c", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getMatchStatsAction, "402d068542291a7b18c7137768ac86dae24e22e4a6", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getResultHistoryAction, "4023e0445e6b2029daf1c13d39cf99d2961494dc39", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(saveMatchResultAction, "40007a059a29c3a73d1f66d5635e82ba6a221adc09", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteMatchResultAction, "603d623d2ba24dce2434a6497742c00e1c2d182b47", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(resetDayResultsAction, "7015c886b8d0efc3f2eb186c881d29412fd9d7ded8", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(saveScheduleAction, "407790ee470765b46fde9d4b451fa1a5bf5467da69", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(saveGameStatsAction, "602c91816706287fbec4b50c7db9fa143de0dadb71", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getTournamentsAction, "0065133cfdef9e6b51a2fdfd0c9727e7b23236617b", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateTournamentThemeAction, "602a9bf9afd01bb67e82e540fb25fc87054e0af4bf", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getThemesAction, "004450085de9c4d560042866ad35e1c590a2721872", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createThemeAction, "40820af2be85ca1225e25420e8c9755126bf546093", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateThemeAction, "60102cb212fad02aa779061b88000edce3eab190a2", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteThemeAction, "40920c661f0f8aa96a95cc403670062fb1ba3848a2", null);
}),
"[project]/.next-internal/server/app/admin/themes/page/actions.js { ACTIONS_MODULE0 => \"[project]/features/tournament/actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$tournament$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/tournament/actions.ts [app-rsc] (ecmascript)");
;
;
;
;
;
;
}),
"[project]/.next-internal/server/app/admin/themes/page/actions.js { ACTIONS_MODULE0 => \"[project]/features/tournament/actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "004450085de9c4d560042866ad35e1c590a2721872",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$features$2f$tournament$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getThemesAction"],
    "0065133cfdef9e6b51a2fdfd0c9727e7b23236617b",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$features$2f$tournament$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getTournamentsAction"],
    "40820af2be85ca1225e25420e8c9755126bf546093",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$features$2f$tournament$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createThemeAction"],
    "40920c661f0f8aa96a95cc403670062fb1ba3848a2",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$features$2f$tournament$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["deleteThemeAction"],
    "60102cb212fad02aa779061b88000edce3eab190a2",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$features$2f$tournament$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateThemeAction"],
    "602a9bf9afd01bb67e82e540fb25fc87054e0af4bf",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$features$2f$tournament$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateTournamentThemeAction"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$admin$2f$themes$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$features$2f$tournament$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/admin/themes/page/actions.js { ACTIONS_MODULE0 => "[project]/features/tournament/actions.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$tournament$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/tournament/actions.ts [app-rsc] (ecmascript)");
}),
];

//# sourceMappingURL=_9239fa05._.js.map