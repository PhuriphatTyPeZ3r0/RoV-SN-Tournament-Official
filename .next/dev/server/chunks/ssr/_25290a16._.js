module.exports = [
"[project]/features/auth/schemas.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "loginSchema",
    ()=>loginSchema,
    "registerSchema",
    ()=>registerSchema
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/external.js [app-rsc] (ecmascript) <export * as z>");
;
const loginSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    email: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().email('อีเมลไม่ถูกต้อง'),
    password: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(6, 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร')
});
const registerSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    email: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().email('อีเมลไม่ถูกต้อง'),
    password: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(8, 'รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร'),
    confirmPassword: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(8, 'รหัสผ่านยืนยันต้องมีอย่างน้อย 8 ตัวอักษร')
}).refine((data)=>data.password === data.confirmPassword, {
    message: "รหัสผ่านไม่ตรงกัน",
    path: [
        "confirmPassword"
    ]
});
}),
"[project]/features/auth/student-actions.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"0023b97e3f4adac91ba55b53031d0cea4cf60dae9c":"getStudentRegistrationStatus","004920824737204b95956c21ebf0a594bc85f55733":"getPendingRegistrations","008a336a6182a6fdc5571db159a779d79f1ec65e3e":"sendOTPAction","00c32b0bd5400fb492303f1c34e716c0c16b1da72d":"resubmitRegistrationAction","00f1c1b7bca2211e5638db83a2033679674c15b041":"getPlayerGamingProfile","40667837f337dd84f4a4775d343a1343090a81090e":"registerStudentAction","408e4d40de4df39a22f34578d4603727232c8f8412":"loginStudentAction","40aaf8f9ce716686e0d814c9ea835cd1c7f073197e":"completeOnboardingAction","40ecd39a3e28bba193ba9d5371af7a88a1ca5ca2c4":"verifyOTPAction","40fae3ec66d200eab847c8b0d8fb213d4d4e98fb0a":"changePasswordAction","708e64dc29e8b2f2889c27fcefbd249fbd70b6a5dd":"updateRegistrationStatus"},"",""] */ __turbopack_context__.s([
    "changePasswordAction",
    ()=>changePasswordAction,
    "completeOnboardingAction",
    ()=>completeOnboardingAction,
    "getPendingRegistrations",
    ()=>getPendingRegistrations,
    "getPlayerGamingProfile",
    ()=>getPlayerGamingProfile,
    "getStudentRegistrationStatus",
    ()=>getStudentRegistrationStatus,
    "loginStudentAction",
    ()=>loginStudentAction,
    "registerStudentAction",
    ()=>registerStudentAction,
    "resubmitRegistrationAction",
    ()=>resubmitRegistrationAction,
    "sendOTPAction",
    ()=>sendOTPAction,
    "updateRegistrationStatus",
    ()=>updateRegistrationStatus,
    "verifyOTPAction",
    ()=>verifyOTPAction
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/supabase/server.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$api$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/api/navigation.react-server.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/components/navigation.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$resend$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/resend/dist/index.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/external.js [app-rsc] (ecmascript) <export * as z>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/cache.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$auth$2f$schemas$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/auth/schemas.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
const onboardingSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    firstNameTh: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1, 'กรุณากรอกชื่อภาษาไทย'),
    lastNameTh: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1, 'กรุณากรอกนามสกุลภาษาไทย'),
    firstNameEn: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1, 'กรุณากรอกชื่อภาษาอังกฤษ'),
    lastNameEn: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1, 'กรุณากรอกนามสกุลภาษาอังกฤษ'),
    studentId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().regex(/^[0-9]{5}$/, 'รหัสนักเรียนต้องเป็นตัวเลข 5 หลัก'),
    grade: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1, 'กรุณากรอกชั้นเรียน'),
    openId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1, 'กรุณากรอก OpenID'),
    inGameName: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1, 'กรุณากรอกชื่อในเกม (IGN)')
});
async function completeOnboardingAction(formData) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return {
            error: 'กรุณาเข้าสู่ระบบก่อนดำเนินการ'
        };
    }
    const isApplyingForAdmin = formData.get('applyForAdmin') === 'on';
    const privacyFlag = true; // Forced to true for PDPA/RoPA compliance
    // 1. Validate fields
    const rawData = {
        firstNameTh: formData.get('firstNameTh'),
        lastNameTh: formData.get('lastNameTh'),
        firstNameEn: formData.get('firstNameEn'),
        lastNameEn: formData.get('lastNameEn'),
        studentId: formData.get('studentId'),
        grade: formData.get('grade'),
        openId: formData.get('openId'),
        inGameName: formData.get('inGameName')
    };
    const validated = onboardingSchema.safeParse(rawData);
    if (!validated.success) {
        return {
            error: validated.error.issues[0].message
        };
    }
    const data = validated.data;
    // Upload student ID card document
    const verificationDoc = formData.get('verificationDoc');
    let docUrl = '';
    if (verificationDoc && verificationDoc.size > 0) {
        const fileExt = verificationDoc.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 7)}.${fileExt}`;
        const filePath = `verifications/${user.id}/${fileName}`;
        const fileBuffer = Buffer.from(await verificationDoc.arrayBuffer());
        const { error: uploadError } = await supabase.storage.from('verification-docs').upload(filePath, fileBuffer, {
            contentType: verificationDoc.type,
            duplex: 'half'
        });
        if (uploadError) {
            return {
                error: `ไม่สามารถอัปโหลดไฟล์หลักฐานได้: ${uploadError.message}`
            };
        }
        docUrl = filePath; // Save relative path
    } else {
        return {
            error: 'กรุณาอัปโหลดรูปภาพหลักฐานแสดงตัวตน'
        };
    }
    // 0. Auto-generate Username if not exists
    const { data: currentProfile } = await supabase.from('profiles').select('username').eq('id', user.id).single();
    let username = currentProfile?.username;
    if (!username) {
        let isUnique = false;
        let lastNameIndex = 1;
        while(!isUnique && lastNameIndex <= data.lastNameEn.length){
            username = `${data.firstNameEn}.${data.lastNameEn.substring(0, lastNameIndex)}`;
            const { count } = await supabase.from('profiles').select('username', {
                count: 'exact',
                head: true
            }).eq('username', username);
            if (count === 0) isUnique = true;
            else lastNameIndex++;
        }
        if (!isUnique) username = `${data.firstNameEn}.${data.lastNameEn}.${Math.floor(Math.random() * 999)}`;
    }
    // Determine status and role based on application type
    // Both admins and students start as 'pending' for review
    const status = 'pending';
    const role = isApplyingForAdmin ? 'guest' : 'student';
    // 2. Update/Create public.profiles (Upsert)
    const { error } = await supabase.from('profiles').upsert({
        id: user.id,
        username,
        full_name: `${data.firstNameTh} ${data.lastNameTh}`,
        first_name_th: data.firstNameTh,
        last_name_th: data.lastNameTh,
        first_name_en: data.firstNameEn,
        last_name_en: data.lastNameEn,
        student_id: data.studentId,
        class_grade: data.grade,
        open_id: data.openId,
        in_game_name: data.inGameName,
        privacy_flag: privacyFlag,
        is_profile_complete: true,
        registration_status: status,
        role: role
    }, {
        onConflict: 'id'
    });
    if (error) {
        return {
            error: `บันทึกข้อมูลไม่สำเร็จ: ${error.message}`
        };
    }
    // 3. Insert into registrations table (Upsert based on user_id)
    const { error: regError } = await supabase.from('registrations').upsert({
        user_id: user.id,
        full_name: `${data.firstNameTh} ${data.lastNameTh}`,
        first_name_th: data.firstNameTh,
        last_name_th: data.lastNameTh,
        first_name_en: data.firstNameEn,
        last_name_en: data.lastNameEn,
        student_id: data.studentId,
        grade: data.grade,
        open_id: data.openId,
        in_game_name: data.inGameName,
        privacy_flag: privacyFlag,
        status: status,
        verification_doc_url: docUrl,
        target_role: isApplyingForAdmin ? 'admin' : 'student'
    }, {
        onConflict: 'user_id'
    });
    if (regError) {
        return {
            error: `Registration request failed: ${regError.message}`
        };
    }
    // 4. Revalidate, Send OTP and Redirect
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/', 'layout');
    await sendOTPAction();
    if (isApplyingForAdmin) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])('/auth/verify-otp?next=/registration-status');
    } else {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])('/auth/verify-otp?next=/student-info');
    }
}
async function loginStudentAction(formData) {
    const rawData = Object.fromEntries(formData.entries());
    const validated = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$auth$2f$schemas$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["loginSchema"].safeParse(rawData);
    if (!validated.success) {
        return {
            error: validated.error.issues[0].message
        };
    }
    const { email, password } = validated.data;
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password
    });
    if (authError || !authData.user) {
        return {
            error: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง'
        };
    }
    // Check profile for next steps
    const { data: profile } = await supabase.from('profiles').select('is_first_login, is_profile_complete').eq('id', authData.user.id).single();
    // Trigger OTP sending
    await sendOTPAction();
    return {
        success: true,
        nextStep: 'verify-otp',
        isFirstLogin: profile?.is_first_login ?? false,
        isProfileComplete: profile?.is_profile_complete ?? false
    };
}
async function registerStudentAction(formData) {
    const rawData = Object.fromEntries(formData.entries());
    const validated = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$auth$2f$schemas$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerSchema"].safeParse(rawData);
    if (!validated.success) {
        return {
            error: validated.error.issues[0].message
        };
    }
    const data = validated.data;
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    // 1. Sign up to Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password
    });
    if (authError || !authData.user) {
        return {
            error: authError?.message || 'การสมัครสมาชิกล้มเหลว'
        };
    }
    // 2. Send OTP and Redirect
    await sendOTPAction();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])('/auth/verify-otp?next=/register/onboarding');
}
async function sendOTPAction() {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user || !user.email) return {
        error: 'Unauthorized or email not found'
    };
    // 1. Generate OTP (6 digits)
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiry = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes
    // 2. Save OTP to profile for verification
    const { error: dbError } = await supabase.from('profiles').update({
        otp_code: otpCode,
        otp_expiry: expiry.toISOString()
    }).eq('id', user.id);
    if (dbError) return {
        error: dbError.message
    };
    // 3. Check for Resend API key to send email, or fall back to development mock
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
        console.log('\n============================================================');
        console.log(`[DEVELOPMENT ONLY] OTP Code for ${user.email}: ${otpCode}`);
        console.log('============================================================\n');
        return {
            success: true,
            message: 'OTP sent to console (development mode)'
        };
    }
    // 4. Send Email via Resend
    try {
        const resendClient = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$resend$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Resend"](apiKey);
        const { data, error: resendError } = await resendClient.emails.send({
            from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
            to: user.email,
            subject: `[RoV-SN] OTP: ${otpCode}`,
            html: `
        <div style="font-family: sans-serif; max-width: 400px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #06b6d4; text-align: center;">RoV-SN Tournament</h2>
          <p>Your verification code is:</p>
          <div style="background: #f4f4f4; padding: 20px; text-align: center; font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #333;">
            ${otpCode}
          </div>
          <p style="font-size: 12px; color: #666; text-align: center; margin-top: 20px;">
            This code expires in 5 minutes.
          </p>
        </div>
      `
        });
        if (resendError) {
            console.error('[RESEND ERROR DETAILS]', resendError);
            return {
                error: `Email Error: ${resendError.message || 'Unknown Resend Error'}`
            };
        }
        return {
            success: true,
            message: 'OTP sent to your email'
        };
    } catch (err) {
        console.error('[SEND_OTP_EXCEPTION]', err);
        return {
            error: `Exception: ${err.message}`
        };
    }
}
async function verifyOTPAction(otp) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return {
        error: 'Unauthorized'
    };
    const { data: profile, error: fetchError } = await supabase.from('profiles').select('otp_code, otp_expiry').eq('id', user.id).single();
    if (fetchError || !profile) return {
        error: 'Profile not found'
    };
    if (profile.otp_code !== otp) {
        return {
            error: 'Invalid OTP code'
        };
    }
    if (new Date(profile.otp_expiry) < new Date()) {
        return {
            error: 'OTP has expired'
        };
    }
    // Clear OTP after success
    await supabase.from('profiles').update({
        otp_code: null,
        otp_expiry: null,
        otp_enabled: true
    }).eq('id', user.id);
    return {
        success: true
    };
}
async function changePasswordAction(password) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { error } = await supabase.auth.updateUser({
        password
    });
    if (error) return {
        error: error.message
    };
    // Update is_first_login flag
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
        await supabase.from('profiles').update({
            is_first_login: false
        }).eq('id', user.id);
    }
    return {
        success: true
    };
}
async function resubmitRegistrationAction() {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return {
            error: 'Unauthorized'
        };
    }
    // 1. Reset profile fields for onboarding
    const { error: profileError } = await supabase.from('profiles').update({
        is_profile_complete: false,
        registration_status: 'none'
    }).eq('id', user.id);
    if (profileError) {
        return {
            error: `Failed to reset profile: ${profileError.message}`
        };
    }
    // 2. Delete the registration request
    const { error: regError } = await supabase.from('registrations').delete().eq('user_id', user.id);
    if (regError) {
        return {
            error: `Failed to clear registration: ${regError.message}`
        };
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/', 'layout');
    return {
        success: true
    };
}
async function getStudentRegistrationStatus() {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;
    // profiles.registration_status is the source of truth for overall verification
    const { data: profile } = await supabase.from('profiles').select('registration_status, full_name, student_id').eq('id', user.id).single();
    const { data } = await supabase.from('registrations').select('*').eq('user_id', user.id).maybeSingle();
    // If no registration record exists but profile is verified, synthesize a response
    if (!data && profile?.registration_status === 'verified') {
        return {
            status: 'approved',
            full_name: profile.full_name,
            student_id: profile.student_id,
            in_game_name: null,
            verification_doc_url: null,
            screening_notes: null
        };
    }
    if (!data) return null;
    // Override registrations.status with profiles.registration_status when profile is verified
    // This handles the case where admin approved via profiles but registrations table is out of sync
    if (profile?.registration_status === 'verified' && data.status !== 'approved') {
        data.status = 'approved';
    }
    if (data.verification_doc_url) {
        if (data.verification_doc_url.startsWith('http')) {
            const publicPrefix = 'verification-docs/';
            const index = data.verification_doc_url.indexOf(publicPrefix);
            if (index !== -1) {
                const path = data.verification_doc_url.substring(index + publicPrefix.length);
                const { data: signed } = await supabase.storage.from('verification-docs').createSignedUrl(path, 60);
                data.verification_doc_url = signed?.signedUrl || data.verification_doc_url;
            }
        } else {
            const { data: signed } = await supabase.storage.from('verification-docs').createSignedUrl(data.verification_doc_url, 60);
            data.verification_doc_url = signed?.signedUrl || null;
        }
    }
    return data;
}
async function getPendingRegistrations() {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { data } = await supabase.from('registrations').select('*').order('created_at', {
        ascending: false
    });
    if (!data) return [];
    const mapped = await Promise.all(data.map(async (reg)=>{
        if (reg.verification_doc_url) {
            if (reg.verification_doc_url.startsWith('http')) {
                const publicPrefix = 'verification-docs/';
                const index = reg.verification_doc_url.indexOf(publicPrefix);
                if (index !== -1) {
                    const path = reg.verification_doc_url.substring(index + publicPrefix.length);
                    const { data: signed } = await supabase.storage.from('verification-docs').createSignedUrl(path, 60);
                    return {
                        ...reg,
                        verification_doc_url: signed?.signedUrl || reg.verification_doc_url
                    };
                }
            } else {
                const { data: signed } = await supabase.storage.from('verification-docs').createSignedUrl(reg.verification_doc_url, 60);
                return {
                    ...reg,
                    verification_doc_url: signed?.signedUrl || null
                };
            }
        }
        return reg;
    }));
    return mapped;
}
async function updateRegistrationStatus(id, status, notes) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { error } = await supabase.from('registrations').update({
        status,
        screening_notes: notes
    }).eq('id', id);
    if (error) return {
        success: false,
        error: error.message
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/admin/registrations');
    return {
        success: true
    };
}
async function getPlayerGamingProfile() {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;
    const { data: player } = await supabase.from('players').select('id, in_game_name, open_id, current_rank, lineup_role, secondary_role, top_heroes, experience_bio, favorite_heroes, nickname').eq('profile_id', user.id).maybeSingle();
    return player;
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    completeOnboardingAction,
    loginStudentAction,
    registerStudentAction,
    sendOTPAction,
    verifyOTPAction,
    changePasswordAction,
    resubmitRegistrationAction,
    getStudentRegistrationStatus,
    getPendingRegistrations,
    updateRegistrationStatus,
    getPlayerGamingProfile
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(completeOnboardingAction, "40aaf8f9ce716686e0d814c9ea835cd1c7f073197e", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(loginStudentAction, "408e4d40de4df39a22f34578d4603727232c8f8412", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(registerStudentAction, "40667837f337dd84f4a4775d343a1343090a81090e", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(sendOTPAction, "008a336a6182a6fdc5571db159a779d79f1ec65e3e", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(verifyOTPAction, "40ecd39a3e28bba193ba9d5371af7a88a1ca5ca2c4", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(changePasswordAction, "40fae3ec66d200eab847c8b0d8fb213d4d4e98fb0a", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(resubmitRegistrationAction, "00c32b0bd5400fb492303f1c34e716c0c16b1da72d", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getStudentRegistrationStatus, "0023b97e3f4adac91ba55b53031d0cea4cf60dae9c", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getPendingRegistrations, "004920824737204b95956c21ebf0a594bc85f55733", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateRegistrationStatus, "708e64dc29e8b2f2889c27fcefbd249fbd70b6a5dd", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getPlayerGamingProfile, "00f1c1b7bca2211e5638db83a2033679674c15b041", null);
}),
"[project]/.next-internal/server/app/(public)/student-info/page/actions.js { ACTIONS_MODULE0 => \"[project]/features/auth/student-actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$auth$2f$student$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/auth/student-actions.ts [app-rsc] (ecmascript)");
;
;
}),
"[project]/.next-internal/server/app/(public)/student-info/page/actions.js { ACTIONS_MODULE0 => \"[project]/features/auth/student-actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "0023b97e3f4adac91ba55b53031d0cea4cf60dae9c",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$features$2f$auth$2f$student$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getStudentRegistrationStatus"],
    "00c32b0bd5400fb492303f1c34e716c0c16b1da72d",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$features$2f$auth$2f$student$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["resubmitRegistrationAction"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f28$public$292f$student$2d$info$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$features$2f$auth$2f$student$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/(public)/student-info/page/actions.js { ACTIONS_MODULE0 => "[project]/features/auth/student-actions.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$auth$2f$student$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/auth/student-actions.ts [app-rsc] (ecmascript)");
}),
];

//# sourceMappingURL=_25290a16._.js.map