module.exports = [
"[project]/features/teams/constants.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ROV_RANKS",
    ()=>ROV_RANKS
]);
const ROV_RANKS = [
    'Bronze III',
    'Bronze II',
    'Bronze I',
    'Silver III',
    'Silver II',
    'Silver I',
    'Gold IV',
    'Gold III',
    'Gold II',
    'Gold I',
    'Platinum V',
    'Platinum IV',
    'Platinum III',
    'Platinum II',
    'Platinum I',
    'Diamond V',
    'Diamond IV',
    'Diamond III',
    'Diamond II',
    'Diamond I',
    'Commander V',
    'Commander IV',
    'Commander III',
    'Commander II',
    'Commander I',
    'Conqueror',
    'Overlord Conqueror IV',
    'Overlord Conqueror III',
    'Overlord Conqueror II',
    'Overlord Conqueror I',
    'Supreme Conqueror',
    'Immortal Conqueror',
    'Glorious Ruler'
];
}),
"[project]/features/teams/actions.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"0024b832797b257a7338d55cf7b4165bb1824a2739":"regenerateInviteCodeAction","007c3944f913f0365837adbc300553c7eaf2a9801a":"leaveTeamAction","00b788607b4aa4bc396f57f0fe08e55aa8eed26a74":"getMyTeamData","00bbb754692efe172d268f57d240df770cde01ff7b":"toggleRecruitmentAction","00ef08001e54610504347846a94f2b18bd83ea5e14":"getAllTeamsAction","4015ae6a1daefc25d7c4efcf1f898c81cbda815a00":"joinTeamAction","4034388e38b00902099e60e61af69ce3d9e3839af3":"updatePlayerLineupRoleAction","40493a75d6733d69db2a7c91d49f84418d349935e3":"updatePlayerPersonalDetailsAction","4050156b368956e7f5d27820e454b6f8e4e867518e":"updateGamingProfileAction","405e3ee1dcfd84ad7ba0ad1728e32c79a19abb87d1":"updateTeamContactInfoAction","40888f14288053515b13e29cf0029eae4682622a1d":"toggleTeamReadyAction","40a084307013469ae6624276642950cb20047ceca9":"updateTeamInfoAction","40babc2e9a7e480cb473196ad112bb1933229b6f94":"kickPlayerAction","6077768384985bcc4c5f91e5f8d0a9a7c9657f8aff":"createTeamAction","60c33015f21d96a4ccde3411b8be1e2c8680e8bc41":"updateTeamStatusAction"},"",""] */ __turbopack_context__.s([
    "createTeamAction",
    ()=>createTeamAction,
    "getAllTeamsAction",
    ()=>getAllTeamsAction,
    "getMyTeamData",
    ()=>getMyTeamData,
    "joinTeamAction",
    ()=>joinTeamAction,
    "kickPlayerAction",
    ()=>kickPlayerAction,
    "leaveTeamAction",
    ()=>leaveTeamAction,
    "regenerateInviteCodeAction",
    ()=>regenerateInviteCodeAction,
    "toggleRecruitmentAction",
    ()=>toggleRecruitmentAction,
    "toggleTeamReadyAction",
    ()=>toggleTeamReadyAction,
    "updateGamingProfileAction",
    ()=>updateGamingProfileAction,
    "updatePlayerLineupRoleAction",
    ()=>updatePlayerLineupRoleAction,
    "updatePlayerPersonalDetailsAction",
    ()=>updatePlayerPersonalDetailsAction,
    "updateTeamContactInfoAction",
    ()=>updateTeamContactInfoAction,
    "updateTeamInfoAction",
    ()=>updateTeamInfoAction,
    "updateTeamStatusAction",
    ()=>updateTeamStatusAction
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/supabase/server.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/cache.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/external.js [app-rsc] (ecmascript) <export * as z>");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$teams$2f$constants$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/teams/constants.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
const updateTeamInfoSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    name: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(2, "ชื่อทีมต้องมีอย่างน้อย 2 ตัวอักษร").max(50, "ชื่อทีมต้องไม่เกิน 50 ตัวอักษร"),
    description: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().max(200, "คำอธิบายทีมต้องไม่เกิน 200 ตัวอักษร").nullable(),
    logoUrl: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().nullable()
});
const updatePlayerLineupRoleSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    playerId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().uuid("ID ผู้เล่นไม่ถูกต้อง"),
    lineupRole: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        'dark_slayer',
        'abyssal_dragon',
        'mid_lane',
        'jungle',
        'support',
        'substitute'
    ]).nullable()
});
const updateTeamContactInfoSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    contactPhone: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().max(20, "เบอร์โทรศัพท์ต้องไม่เกิน 20 ตัวอักษร").nullable(),
    contactLine: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().max(50, "Line ID ต้องไม่เกิน 50 ตัวอักษร").nullable(),
    contactDiscord: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().max(100, "ลิงก์ Discord ต้องไม่เกิน 100 ตัวอักษร").nullable()
});
const updatePlayerPersonalDetailsSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    nickname: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().max(30, "ชื่อเล่นต้องไม่เกิน 30 ตัวอักษร").nullable(),
    phone: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().max(20, "เบอร์โทรศัพท์ต้องไม่เกิน 20 ตัวอักษร").nullable(),
    favoriteHeroes: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()).max(5, "เลือกฮีโร่โปรดได้สูงสุด 5 ตัว")
});
;
const updateGamingProfileSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    currentRank: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum(__TURBOPACK__imported__module__$5b$project$5d2f$features$2f$teams$2f$constants$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ROV_RANKS"]).nullable(),
    secondaryRole: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        'dark_slayer',
        'abyssal_dragon',
        'mid_lane',
        'jungle',
        'support'
    ]).nullable(),
    topHeroes: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()).max(3, 'เลือก Hero ถนัดได้สูงสุด 3 ตัว'),
    experienceBio: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().max(500, 'ประสบการณ์ต้องไม่เกิน 500 ตัวอักษร').nullable(),
    nickname: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().max(30, "ชื่อเล่นต้องไม่เกิน 30 ตัวอักษร").nullable().optional(),
    phone: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().max(20, "เบอร์โทรศัพท์ต้องไม่เกิน 20 ตัวอักษร").nullable().optional(),
    favoriteHeroes: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()).max(5, "เลือกฮีโร่โปรดได้สูงสุด 5 ตัว").optional()
});
/**
 * Team Management Server Actions
 * Based on Senior SA blueprint for RoV SN Tournament
 */ async function getPlayerProfile(supabase) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;
    const { data: player, error } = await supabase.from('players').select('*, profiles(registration_status)').eq('profile_id', user.id).single();
    if (error || !player) return null;
    return player;
}
async function createTeamAction(name, logoUrl) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const player = await getPlayerProfile(supabase);
    if (!player) {
        return {
            error: "ไม่พบข้อมูลผู้เล่น กรุณารอการอนุมัติใบสมัคร"
        };
    }
    if (player.team_id) {
        return {
            error: "คุณมีทีมอยู่แล้ว ไม่สามารถสร้างทีมใหม่ได้"
        };
    }
    // 1. สร้างทีมใหม่
    const { data: team, error: teamError } = await supabase.from('teams').insert({
        name,
        logo_url: logoUrl,
        captain_id: player.id,
        status: 'incomplete'
    }).select().single();
    if (teamError) {
        if (teamError.code === '23505') return {
            error: "ชื่อทีมนี้ถูกใช้ไปแล้ว"
        };
        return {
            error: teamError.message
        };
    }
    // 2. อัปเดตตัวผู้เล่นให้เข้าทีมใหม่
    const { error: playerUpdateError } = await supabase.from('players').update({
        team_id: team.id
    }).eq('id', player.id);
    if (playerUpdateError) {
        // Cleanup if possible, but RLS might prevent deleting if not admin
        return {
            error: "สร้างทีมสำเร็จ แต่ไม่สามารถเพิ่มคุณเข้าทีมได้ กรุณาติดต่อแอดมิน"
        };
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/team');
    return {
        success: true,
        teamId: team.id
    };
}
async function joinTeamAction(inviteCode) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const player = await getPlayerProfile(supabase);
    if (!player) {
        return {
            error: "ไม่พบข้อมูลผู้เล่น กรุณารอการอนุมัติใบสมัคร"
        };
    }
    if (player.team_id) {
        return {
            error: "คุณมีทีมอยู่แล้ว กรุณาออกจากทีมเดิมก่อนเข้าร่วมทีมใหม่"
        };
    }
    // 1. ค้นหาทีมจาก Invite Code
    const { data: team, error: teamError } = await supabase.from('teams').select('id, name, status').eq('invite_code', inviteCode.toUpperCase()).single();
    if (teamError || !team) {
        return {
            error: "รหัสเชิญไม่ถูกต้อง หรือทีมนี้ไม่มีอยู่จริง"
        };
    }
    // 1.5 ตรวจสอบสถานะการล็อกรายชื่อทีม
    if (team.status === 'ready' || team.status === 'approved') {
        return {
            error: "ทีมนี้ล็อกรายชื่อแล้ว ไม่สามารถเข้าร่วมทีมได้"
        };
    }
    // 2. ตรวจสอบจำนวนสมาชิก (จำกัด 6 คน: 5 ตัวจริง + 1 สำรอง)
    const { count, error: countError } = await supabase.from('players').select('*', {
        count: 'exact',
        head: true
    }).eq('team_id', team.id);
    if (countError) return {
        error: countError.message
    };
    if (count && count >= 6) {
        return {
            error: "ทีมนี้มีสมาชิกเต็มแล้ว (สูงสุด 6 คน)"
        };
    }
    // 3. อัปเดตตัวผู้เล่นให้เข้าทีม
    const { error: updateError } = await supabase.from('players').update({
        team_id: team.id,
        lineup_role: null
    }) // Reset role on joining
    .eq('id', player.id);
    if (updateError) return {
        error: updateError.message
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/team');
    return {
        success: true,
        teamName: team.name
    };
}
async function leaveTeamAction() {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const player = await getPlayerProfile(supabase);
    if (!player || !player.team_id) {
        return {
            error: "คุณไม่ได้อยู่ในทีมใดๆ"
        };
    }
    // ตรวจสอบความเป็นกัปตันและสถานะทีม
    const { data: team } = await supabase.from('teams').select('captain_id, status').eq('id', player.team_id).single();
    if (team && (team.status === 'ready' || team.status === 'approved')) {
        return {
            error: "ทีมอยู่ในสถานะล็อกรายชื่อแล้ว ไม่สามารถออกจากทีมได้"
        };
    }
    if (team && team.captain_id === player.id) {
        return {
            error: "กัปตันทีมไม่สามารถออกจากทีมได้ กรุณาแต่งตั้งกัปตันใหม่หรือยุบทีม"
        };
    }
    const { error } = await supabase.from('players').update({
        team_id: null,
        lineup_role: null
    }) // Reset role on leaving
    .eq('id', player.id);
    if (error) return {
        error: error.message
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/team');
    return {
        success: true
    };
}
async function getMyTeamData() {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const player = await getPlayerProfile(supabase);
    if (!player || !player.team_id) return null;
    const { data: team, error } = await supabase.from('teams').select(`
      *,
      members:players!team_id(*)
    `).eq('id', player.team_id).single();
    if (error) return null;
    return {
        ...team,
        currentPlayerId: player.id
    };
}
async function kickPlayerAction(playerId) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const player = await getPlayerProfile(supabase);
    if (!player || !player.team_id) return {
        error: "Unauthorized"
    };
    // ตรวจสอบความเป็นกัปตันและสถานะทีม
    const { data: team } = await supabase.from('teams').select('captain_id, status').eq('id', player.team_id).single();
    if (!team || team.captain_id !== player.id) {
        return {
            error: "เฉพาะกัปตันทีมเท่านั้นที่สามารถคัดสมาชิกออกได้"
        };
    }
    if (team.status === 'ready' || team.status === 'approved') {
        return {
            error: "ทีมอยู่ในสถานะล็อกรายชื่อแล้ว ไม่สามารถคัดสมาชิกออกได้"
        };
    }
    if (playerId === player.id) {
        return {
            error: "คุณไม่สามารถคัดตัวเองออกจากทีมได้"
        };
    }
    const { error } = await supabase.from('players').update({
        team_id: null,
        lineup_role: null
    }) // Reset role on kicking
    .eq('id', playerId).eq('team_id', player.team_id) // ตรวจสอบว่ายังอยู่ในทีมเดียวกัน
    ;
    if (error) return {
        error: error.message
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/team');
    return {
        success: true
    };
}
async function getAllTeamsAction() {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { data, error } = await supabase.from('teams').select(`
      *,
      members:players!team_id(*)
    `).order('name', {
        ascending: true
    });
    if (error) {
        console.error('Error fetching all teams:', error);
        return [];
    }
    return data;
}
async function updateTeamStatusAction(teamId, status) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { error } = await supabase.from('teams').update({
        status
    }).eq('id', teamId);
    if (error) return {
        error: error.message
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/admin/teams');
    return {
        success: true
    };
}
async function updateTeamInfoAction(payload) {
    const parsed = updateTeamInfoSchema.safeParse(payload);
    if (!parsed.success) {
        return {
            error: parsed.error.issues[0].message
        };
    }
    const { name, description, logoUrl } = parsed.data;
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const player = await getPlayerProfile(supabase);
    if (!player || !player.team_id) {
        return {
            error: "ไม่พบข้อมูลผู้เล่นหรือสิทธิ์ในการดำเนินการ"
        };
    }
    // Check if current user is captain
    const { data: team, error: teamError } = await supabase.from('teams').select('captain_id, status').eq('id', player.team_id).single();
    if (teamError || !team || team.captain_id !== player.id) {
        return {
            error: "เฉพาะกัปตันทีมเท่านั้นที่สามารถแก้ไขข้อมูลทีมได้"
        };
    }
    // Check lock
    if (team.status === 'ready' || team.status === 'approved') {
        return {
            error: "ทีมอยู่ในสถานะล็อกรายชื่อแล้ว ไม่สามารถแก้ไขข้อมูลได้"
        };
    }
    const { error: updateError } = await supabase.from('teams').update({
        name,
        description,
        logo_url: logoUrl
    }).eq('id', player.team_id);
    if (updateError) {
        if (updateError.code === '23505') return {
            error: "ชื่อทีมนี้ถูกใช้ไปแล้ว"
        };
        return {
            error: updateError.message
        };
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/team');
    return {
        success: true
    };
}
async function updatePlayerLineupRoleAction(payload) {
    const parsed = updatePlayerLineupRoleSchema.safeParse(payload);
    if (!parsed.success) {
        return {
            error: parsed.error.issues[0].message
        };
    }
    const { playerId, lineupRole } = parsed.data;
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const player = await getPlayerProfile(supabase);
    if (!player || !player.team_id) {
        return {
            error: "ไม่พบข้อมูลผู้เล่นหรือสิทธิ์ในการดำเนินการ"
        };
    }
    // Check if current user is captain
    const { data: team, error: teamError } = await supabase.from('teams').select('captain_id, status').eq('id', player.team_id).single();
    if (teamError || !team || team.captain_id !== player.id) {
        return {
            error: "เฉพาะกัปตันทีมเท่านั้นที่สามารถจัดการตำแหน่งในทีมได้"
        };
    }
    // Check lock
    if (team.status === 'ready' || team.status === 'approved') {
        return {
            error: "ทีมอยู่ในสถานะล็อกรายชื่อแล้ว ไม่สามารถแก้ไขตำแหน่งได้"
        };
    }
    const { error: updateError } = await supabase.from('players').update({
        lineup_role: lineupRole
    }).eq('id', playerId).eq('team_id', player.team_id) // Ensure updating a player in own team
    ;
    if (updateError) {
        return {
            error: updateError.message
        };
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/team');
    return {
        success: true
    };
}
async function toggleRecruitmentAction() {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const player = await getPlayerProfile(supabase);
    if (!player || !player.team_id) {
        return {
            error: "ไม่พบข้อมูลผู้เล่นหรือสิทธิ์ในการดำเนินการ"
        };
    }
    const { data: team, error: teamError } = await supabase.from('teams').select('captain_id, status, invite_code').eq('id', player.team_id).single();
    if (teamError || !team || team.captain_id !== player.id) {
        return {
            error: "เฉพาะกัปตันทีมเท่านั้นที่สามารถจัดการการรับสมัครได้"
        };
    }
    // Check lock
    if (team.status === 'ready' || team.status === 'approved') {
        return {
            error: "ทีมอยู่ในสถานะล็อกรายชื่อแล้ว ไม่สามารถแก้ไขสิทธิ์การรับสมัครได้"
        };
    }
    let nextInviteCode = null;
    if (!team.invite_code) {
        // Generate new invite code
        nextInviteCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    }
    const { error: updateError } = await supabase.from('teams').update({
        invite_code: nextInviteCode
    }).eq('id', player.team_id);
    if (updateError) {
        return {
            error: updateError.message
        };
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/team');
    return {
        success: true,
        isRecruiting: !!nextInviteCode
    };
}
async function regenerateInviteCodeAction() {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const player = await getPlayerProfile(supabase);
    if (!player || !player.team_id) {
        return {
            error: "ไม่พบข้อมูลผู้เล่นหรือสิทธิ์ในการดำเนินการ"
        };
    }
    const { data: team, error: teamError } = await supabase.from('teams').select('captain_id, status').eq('id', player.team_id).single();
    if (teamError || !team || team.captain_id !== player.id) {
        return {
            error: "เฉพาะกัปตันทีมเท่านั้นที่สามารถรีเซ็ตรหัสเชิญได้"
        };
    }
    // Check lock
    if (team.status === 'ready' || team.status === 'approved') {
        return {
            error: "ทีมอยู่ในสถานะล็อกรายชื่อแล้ว ไม่สามารถรีเซ็ตรหัสเชิญได้"
        };
    }
    const newInviteCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    const { error: updateError } = await supabase.from('teams').update({
        invite_code: newInviteCode
    }).eq('id', player.team_id);
    if (updateError) {
        return {
            error: updateError.message
        };
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/team');
    return {
        success: true,
        inviteCode: newInviteCode
    };
}
async function toggleTeamReadyAction(targetStatus) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const player = await getPlayerProfile(supabase);
    if (!player || !player.team_id) {
        return {
            error: "ไม่พบข้อมูลผู้เล่นหรือสิทธิ์ในการดำเนินการ"
        };
    }
    const { data: team, error: teamError } = await supabase.from('teams').select('captain_id, status').eq('id', player.team_id).single();
    if (teamError || !team || team.captain_id !== player.id) {
        return {
            error: "เฉพาะกัปตันทีมเท่านั้นที่สามารถเปลี่ยนสถานะทีมได้"
        };
    }
    if (targetStatus === 'ready') {
        // 1. ตรวจสอบจำนวนสมาชิก (ต้องมีอย่างน้อย 5 คน)
        const { count, error: countError } = await supabase.from('players').select('*', {
            count: 'exact',
            head: true
        }).eq('team_id', player.team_id);
        if (countError) return {
            error: countError.message
        };
        if (!count || count < 5) {
            return {
                error: "ทีมของคุณต้องมีสมาชิกอย่างน้อย 5 คนจึงจะสามารถส่งรายชื่อพร้อมแข่งขันได้"
            };
        }
        const { error: updateError } = await supabase.from('teams').update({
            status: 'ready'
        }).eq('id', player.team_id);
        if (updateError) return {
            error: updateError.message
        };
    } else {
        // ปลดล็อกทีมกลับเป็น incomplete
        // ตรวจสอบว่าแอดมินอนุมัติไปหรือยัง
        if (team.status === 'approved') {
            return {
                error: "ทีมของคุณผ่านการอนุมัติแล้ว ไม่สามารถปลดล็อกแก้ไขรายชื่อได้ กรุณาติดต่อแอดมิน"
            };
        }
        const { error: updateError } = await supabase.from('teams').update({
            status: 'incomplete'
        }).eq('id', player.team_id);
        if (updateError) return {
            error: updateError.message
        };
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/team');
    return {
        success: true
    };
}
async function updateTeamContactInfoAction(payload) {
    const parsed = updateTeamContactInfoSchema.safeParse(payload);
    if (!parsed.success) {
        return {
            error: parsed.error.issues[0].message
        };
    }
    const { contactPhone, contactLine, contactDiscord } = parsed.data;
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const player = await getPlayerProfile(supabase);
    if (!player || !player.team_id) {
        return {
            error: "ไม่พบข้อมูลผู้เล่นหรือสิทธิ์ในการดำเนินการ"
        };
    }
    // Check if current user is captain
    const { data: team, error: teamError } = await supabase.from('teams').select('captain_id, status').eq('id', player.team_id).single();
    if (teamError || !team || team.captain_id !== player.id) {
        return {
            error: "เฉพาะกัปตันทีมเท่านั้นที่สามารถแก้ไขข้อมูลการติดต่อได้"
        };
    }
    // Block only if fully approved
    if (team.status === 'approved') {
        return {
            error: "ทีมได้รับการอนุมัติเรียบร้อยแล้ว ไม่สามารถแก้ไขข้อมูลติดต่อได้ กรุณาติดต่อแอดมิน"
        };
    }
    const { error: updateError } = await supabase.from('teams').update({
        contact_phone: contactPhone,
        contact_line: contactLine,
        contact_discord: contactDiscord
    }).eq('id', player.team_id);
    if (updateError) {
        return {
            error: updateError.message
        };
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/team');
    return {
        success: true
    };
}
async function updatePlayerPersonalDetailsAction(payload) {
    const parsed = updatePlayerPersonalDetailsSchema.safeParse(payload);
    if (!parsed.success) {
        return {
            error: parsed.error.issues[0].message
        };
    }
    const { nickname, phone, favoriteHeroes } = parsed.data;
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const player = await getPlayerProfile(supabase);
    if (!player) {
        return {
            error: "ไม่พบข้อมูลผู้เล่นของคุณ"
        };
    }
    const { error: updateError } = await supabase.from('players').update({
        nickname,
        phone,
        favorite_heroes: favoriteHeroes
    }).eq('id', player.id);
    if (updateError) {
        return {
            error: updateError.message
        };
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/team');
    return {
        success: true
    };
}
async function updateGamingProfileAction(payload) {
    const parsed = updateGamingProfileSchema.safeParse(payload);
    if (!parsed.success) {
        return {
            error: parsed.error.issues[0].message
        };
    }
    const { currentRank, secondaryRole, topHeroes, experienceBio, nickname, phone, favoriteHeroes } = parsed.data;
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const player = await getPlayerProfile(supabase);
    if (!player) {
        return {
            error: 'ไม่พบข้อมูลผู้เล่นของคุณ'
        };
    }
    const updateData = {
        current_rank: currentRank,
        secondary_role: secondaryRole,
        top_heroes: topHeroes,
        experience_bio: experienceBio
    };
    if (nickname !== undefined) updateData.nickname = nickname;
    if (phone !== undefined) updateData.phone = phone;
    if (favoriteHeroes !== undefined) updateData.favorite_heroes = favoriteHeroes;
    const { error: updateError } = await supabase.from('players').update(updateData).eq('id', player.id);
    if (updateError) {
        return {
            error: updateError.message
        };
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/student-info');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/team');
    return {
        success: true
    };
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    createTeamAction,
    joinTeamAction,
    leaveTeamAction,
    getMyTeamData,
    kickPlayerAction,
    getAllTeamsAction,
    updateTeamStatusAction,
    updateTeamInfoAction,
    updatePlayerLineupRoleAction,
    toggleRecruitmentAction,
    regenerateInviteCodeAction,
    toggleTeamReadyAction,
    updateTeamContactInfoAction,
    updatePlayerPersonalDetailsAction,
    updateGamingProfileAction
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createTeamAction, "6077768384985bcc4c5f91e5f8d0a9a7c9657f8aff", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(joinTeamAction, "4015ae6a1daefc25d7c4efcf1f898c81cbda815a00", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(leaveTeamAction, "007c3944f913f0365837adbc300553c7eaf2a9801a", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getMyTeamData, "00b788607b4aa4bc396f57f0fe08e55aa8eed26a74", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(kickPlayerAction, "40babc2e9a7e480cb473196ad112bb1933229b6f94", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getAllTeamsAction, "00ef08001e54610504347846a94f2b18bd83ea5e14", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateTeamStatusAction, "60c33015f21d96a4ccde3411b8be1e2c8680e8bc41", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateTeamInfoAction, "40a084307013469ae6624276642950cb20047ceca9", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updatePlayerLineupRoleAction, "4034388e38b00902099e60e61af69ce3d9e3839af3", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(toggleRecruitmentAction, "00bbb754692efe172d268f57d240df770cde01ff7b", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(regenerateInviteCodeAction, "0024b832797b257a7338d55cf7b4165bb1824a2739", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(toggleTeamReadyAction, "40888f14288053515b13e29cf0029eae4682622a1d", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateTeamContactInfoAction, "405e3ee1dcfd84ad7ba0ad1728e32c79a19abb87d1", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updatePlayerPersonalDetailsAction, "40493a75d6733d69db2a7c91d49f84418d349935e3", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateGamingProfileAction, "4050156b368956e7f5d27820e454b6f8e4e867518e", null);
}),
"[project]/features/players/actions.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"00232b583978212d7c8cf0ba9f6f82c5ce3d79e01f":"getHeroesAction","004401dece5456c933b6dc4cfb1a3869319b75c9d2":"getPlayersAction","008ce2b0c04da243ef361fb583a6d1800d768d9005":"getTeamsAction","009dbf769540f77458925375f41d52b7b60362cdf0":"getTeamLogosAction","4030efca7865278072b65ec58ca667b6667b6f641a":"deletePlayerAction","4081dd42730096eef3da1c7425567225893e0e6d76":"deleteTeamAction","408e44ce4192a519c4aa5495b7d39198477fe808f4":"importPlayersAction","40f766a21587a07eb8c09641472beec96dcadba2f8":"createPlayerAction","6044a807f5c4edc129a60a9d4d3306cba67c50580b":"upsertHeroAction","60a08983ab9b869bf6bb7a71fe8efa9873664c631b":"createTeamAction","60b4f242de134995b1f97830fb9aa0a8d8b02a793a":"updatePlayerAction"},"",""] */ __turbopack_context__.s([
    "createPlayerAction",
    ()=>createPlayerAction,
    "createTeamAction",
    ()=>createTeamAction,
    "deletePlayerAction",
    ()=>deletePlayerAction,
    "deleteTeamAction",
    ()=>deleteTeamAction,
    "getHeroesAction",
    ()=>getHeroesAction,
    "getPlayersAction",
    ()=>getPlayersAction,
    "getTeamLogosAction",
    ()=>getTeamLogosAction,
    "getTeamsAction",
    ()=>getTeamsAction,
    "importPlayersAction",
    ()=>importPlayersAction,
    "updatePlayerAction",
    ()=>updatePlayerAction,
    "upsertHeroAction",
    ()=>upsertHeroAction
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/supabase/server.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/cache.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
async function getTeamsAction() {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { data, error } = await supabase.from('teams').select('*').order('name', {
        ascending: true
    });
    if (error) throw new Error(`Failed to fetch teams: ${error.message}`);
    return data;
}
async function getTeamLogosAction() {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { data, error } = await supabase.from('teams').select('name, logo_url').not('logo_url', 'is', null);
    if (error) throw new Error(`Failed to fetch logos: ${error.message}`);
    const logos = {};
    for (const team of data || []){
        if (team.name && team.logo_url) {
            logos[team.name] = team.logo_url;
        }
    }
    return logos;
}
async function createTeamAction(name, logoUrl) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { data, error } = await supabase.from('teams').insert({
        name,
        logo_url: logoUrl
    }).select().single();
    if (error) throw new Error(`Failed to create team: ${error.message}`);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/clubs');
    return data;
}
async function deleteTeamAction(teamName) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { error } = await supabase.from('teams').delete().eq('name', teamName);
    if (error) throw new Error(`Failed to delete team: ${error.message}`);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/clubs');
    return {
        success: true
    };
}
async function getPlayersAction() {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { data, error } = await supabase.from('players').select('*, teams!team_id(name, logo_url)').order('name', {
        ascending: true
    });
    if (error) throw new Error(`Failed to fetch players: ${error.message}`);
    return data;
}
async function createPlayerAction(playerData) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { data, error } = await supabase.from('players').insert({
        name: playerData.name,
        grade: playerData.grade,
        team_id: playerData.teamId,
        in_game_name: playerData.inGameName,
        previous_igns: playerData.previousIgns || [],
        open_id: playerData.openId
    }).select().single();
    if (error) throw new Error(`Failed to create player: ${error.message}`);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/admin/players');
    return data;
}
async function updatePlayerAction(playerId, updateData) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    // ถ้าเปลี่ยน IGN ให้เก็บ IGN เก่าไว้ใน previousIgns อัตโนมัติ
    if (updateData.inGameName) {
        const { data: current } = await supabase.from('players').select('in_game_name, previous_igns').eq('id', playerId).single();
        if (current?.in_game_name && current.in_game_name !== updateData.inGameName) {
            const prevIgns = current.previous_igns || [];
            if (!prevIgns.includes(current.in_game_name)) {
                prevIgns.push(current.in_game_name);
            }
            updateData.previousIgns = prevIgns;
        }
    }
    const { data, error } = await supabase.from('players').update({
        ...updateData.name && {
            name: updateData.name
        },
        ...updateData.grade !== undefined && {
            grade: updateData.grade
        },
        ...updateData.teamId !== undefined && {
            team_id: updateData.teamId
        },
        ...updateData.inGameName && {
            in_game_name: updateData.inGameName
        },
        ...updateData.previousIgns && {
            previous_igns: updateData.previousIgns
        },
        ...updateData.openId !== undefined && {
            open_id: updateData.openId
        }
    }).eq('id', playerId).select().single();
    if (error) throw new Error(`Failed to update player: ${error.message}`);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/admin/players');
    return data;
}
async function deletePlayerAction(playerId) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { error } = await supabase.from('players').delete().eq('id', playerId);
    if (error) throw new Error(`Failed to delete player: ${error.message}`);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/admin/players');
    return {
        success: true
    };
}
async function importPlayersAction(players) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const rows = players.map((p)=>({
            name: p.name,
            grade: p.grade,
            team_id: p.teamId,
            in_game_name: p.inGameName,
            previous_igns: []
        }));
    const { data, error } = await supabase.from('players').insert(rows).select();
    if (error) throw new Error(`Failed to import players: ${error.message}`);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/admin/players');
    return {
        count: data?.length || 0
    };
}
async function getHeroesAction() {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { data, error } = await supabase.from('heroes').select('*').order('name', {
        ascending: true
    });
    if (error) throw new Error(`Failed to fetch heroes: ${error.message}`);
    return data;
}
async function upsertHeroAction(name, imageUrl) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { data, error } = await supabase.from('heroes').upsert({
        name,
        image_url: imageUrl
    }, {
        onConflict: 'name'
    }).select().single();
    if (error) throw new Error(`Failed to upsert hero: ${error.message}`);
    return data;
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    getTeamsAction,
    getTeamLogosAction,
    createTeamAction,
    deleteTeamAction,
    getPlayersAction,
    createPlayerAction,
    updatePlayerAction,
    deletePlayerAction,
    importPlayersAction,
    getHeroesAction,
    upsertHeroAction
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getTeamsAction, "008ce2b0c04da243ef361fb583a6d1800d768d9005", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getTeamLogosAction, "009dbf769540f77458925375f41d52b7b60362cdf0", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createTeamAction, "60a08983ab9b869bf6bb7a71fe8efa9873664c631b", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteTeamAction, "4081dd42730096eef3da1c7425567225893e0e6d76", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getPlayersAction, "004401dece5456c933b6dc4cfb1a3869319b75c9d2", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createPlayerAction, "40f766a21587a07eb8c09641472beec96dcadba2f8", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updatePlayerAction, "60b4f242de134995b1f97830fb9aa0a8d8b02a793a", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deletePlayerAction, "4030efca7865278072b65ec58ca667b6667b6f641a", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(importPlayersAction, "408e44ce4192a519c4aa5495b7d39198477fe808f4", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getHeroesAction, "00232b583978212d7c8cf0ba9f6f82c5ce3d79e01f", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(upsertHeroAction, "6044a807f5c4edc129a60a9d4d3306cba67c50580b", null);
}),
"[project]/.next-internal/server/app/(public)/team/page/actions.js { ACTIONS_MODULE0 => \"[project]/features/teams/actions.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/features/players/actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$teams$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/teams/actions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$players$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/players/actions.ts [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
;
;
}),
"[project]/.next-internal/server/app/(public)/team/page/actions.js { ACTIONS_MODULE0 => \"[project]/features/teams/actions.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/features/players/actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "00232b583978212d7c8cf0ba9f6f82c5ce3d79e01f",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$features$2f$players$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getHeroesAction"],
    "0024b832797b257a7338d55cf7b4165bb1824a2739",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$features$2f$teams$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["regenerateInviteCodeAction"],
    "007c3944f913f0365837adbc300553c7eaf2a9801a",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$features$2f$teams$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["leaveTeamAction"],
    "00b788607b4aa4bc396f57f0fe08e55aa8eed26a74",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$features$2f$teams$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getMyTeamData"],
    "00bbb754692efe172d268f57d240df770cde01ff7b",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$features$2f$teams$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toggleRecruitmentAction"],
    "4015ae6a1daefc25d7c4efcf1f898c81cbda815a00",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$features$2f$teams$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["joinTeamAction"],
    "4034388e38b00902099e60e61af69ce3d9e3839af3",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$features$2f$teams$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updatePlayerLineupRoleAction"],
    "40493a75d6733d69db2a7c91d49f84418d349935e3",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$features$2f$teams$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updatePlayerPersonalDetailsAction"],
    "405e3ee1dcfd84ad7ba0ad1728e32c79a19abb87d1",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$features$2f$teams$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateTeamContactInfoAction"],
    "40888f14288053515b13e29cf0029eae4682622a1d",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$features$2f$teams$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toggleTeamReadyAction"],
    "40a084307013469ae6624276642950cb20047ceca9",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$features$2f$teams$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateTeamInfoAction"],
    "40babc2e9a7e480cb473196ad112bb1933229b6f94",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$features$2f$teams$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["kickPlayerAction"],
    "6077768384985bcc4c5f91e5f8d0a9a7c9657f8aff",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$features$2f$teams$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createTeamAction"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f28$public$292f$team$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$features$2f$teams$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$features$2f$players$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/(public)/team/page/actions.js { ACTIONS_MODULE0 => "[project]/features/teams/actions.ts [app-rsc] (ecmascript)", ACTIONS_MODULE1 => "[project]/features/players/actions.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$teams$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/teams/actions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$players$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/players/actions.ts [app-rsc] (ecmascript)");
}),
];

//# sourceMappingURL=_e1456bcd._.js.map