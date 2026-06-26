module.exports = [
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/lib/incremental-cache/tags-manifest.external.js [external] (next/dist/server/lib/incremental-cache/tags-manifest.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/lib/incremental-cache/tags-manifest.external.js", () => require("next/dist/server/lib/incremental-cache/tags-manifest.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/node:async_hooks [external] (node:async_hooks, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:async_hooks", () => require("node:async_hooks"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/utils/supabase/session.ts [middleware] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "updateSession",
    ()=>updateSession
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createServerClient$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@supabase/ssr/dist/module/createServerClient.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [middleware] (ecmascript)");
;
;
async function updateSession(request) {
    let supabaseResponse = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["NextResponse"].next({
        request: {
            headers: request.headers
        }
    });
    const supabaseUrl = ("TURBOPACK compile-time value", "https://loofwjhwinbqsjmjhaep.supabase.co");
    const supabaseKey = ("TURBOPACK compile-time value", "sb_publishable_y_jAu5zFZjEKe2ohBsR8QQ_Mf9D0-bQ");
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createServerClient$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["createServerClient"])(supabaseUrl, supabaseKey, {
            cookies: {
                getAll () {
                    return request.cookies.getAll();
                },
                setAll (cookiesToSet) {
                    cookiesToSet.forEach(({ name, value })=>request.cookies.set(name, value));
                    supabaseResponse = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["NextResponse"].next({
                        request
                    });
                    cookiesToSet.forEach(({ name, value, options })=>supabaseResponse.cookies.set(name, value, options));
                }
            }
        });
        const { data, error } = await supabase.auth.getUser();
        const user = data?.user || null;
        if (error && (error.status === 400 || error.code === 'refresh_token_not_found')) {
            const cookieStore = request.cookies;
            const supabaseCookies = cookieStore.getAll().filter((c)=>c.name.startsWith('sb-') && c.name.endsWith('-auth-token'));
            supabaseCookies.forEach((c)=>{
                supabaseResponse.cookies.delete(c.name);
            });
        }
        // 🔒 RBAC Guard (Decoded from JWT App Metadata claims with zero DB queries)
        let role = 'guest';
        let isProfileComplete = false;
        let registrationStatus = 'none';
        let isOtpEnabled = false;
        if (user) {
            role = user.app_metadata?.role || 'guest';
            isProfileComplete = !!user.app_metadata?.is_profile_complete;
            registrationStatus = user.app_metadata?.registration_status || 'none';
            isOtpEnabled = !!user.app_metadata?.otp_enabled;
        }
        const path = request.nextUrl.pathname;
        const code = request.nextUrl.searchParams.get('code');
        // 🚩 0. OAuth Rescue Redirect
        // If we have a code but we are NOT on the callback page, redirect to callback
        if (code && path !== '/auth/callback') {
            const callbackUrl = new URL('/auth/callback', request.url);
            callbackUrl.searchParams.set('code', code);
            // Preserve any 'next' parameter if present
            const next = request.nextUrl.searchParams.get('next');
            if (next) callbackUrl.searchParams.set('next', next);
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["NextResponse"].redirect(callbackUrl);
        }
        // ✅ Public Routes: Everyone can access
        const isPublicPath = path === '/' || path.startsWith('/fixtures') || path.startsWith('/standings') || path.startsWith('/stats') || path.startsWith('/clubs') || path.startsWith('/format');
        if (isPublicPath) {
            return supabaseResponse;
        }
        // 🚩 0. Forced Onboarding Guard for OAuth Users
        // If logged in but profile is incomplete, force them to onboarding
        // BUT allow them to see their registration status if they've already submitted
        // Check if they are truly "new" (no profile completion AND no registration record)
        const isNewUser = !isProfileComplete && registrationStatus === 'none';
        if (user && isNewUser && path !== '/register/onboarding' && path !== '/registration-status' && path !== '/auth/verify-otp' && !path.startsWith('/auth/callback')) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL('/register/onboarding', request.url));
        }
        // 🚩 0.5 OTP Guard (Must verify before accessing any protected route)
        if (user && !isOtpEnabled && path !== '/auth/verify-otp' && path !== '/register/onboarding' && !path.startsWith('/auth/callback')) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL('/auth/verify-otp', request.url));
        }
        // 🚩 1. Admin Approval Guard (Only for Admin applicants)
        if (user && registrationStatus === 'pending' && path.startsWith('/admin') && path !== '/registration-status') {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL('/registration-status', request.url));
        }
        // 🚩 2. Authorization Logic by Role
        // Admin & Super Admin Area
        if (path.startsWith('/admin')) {
            if (!user) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL('/login', request.url));
            // Super Admin only for approvals
            if (path.startsWith('/admin/registrations') && role !== 'super_admin') {
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL('/admin', request.url));
            }
            // Approved Admin or Super Admin can access admin tools
            if (role !== 'admin' && role !== 'super_admin') {
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL('/team', request.url));
            }
        }
        // Student & Player Area
        if (path.startsWith('/team') || path.startsWith('/student-info')) {
            if (!user) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL('/login', request.url));
            // Students can access immediately if verified (auto-verified for students)
            if (registrationStatus === 'rejected') {
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL('/registration-status', request.url));
            }
        }
        // Public Auth Redirects
        if (path === '/login' || path === '/register') {
            if (user) {
                if (role === 'admin' || role === 'super_admin') {
                    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL('/admin', request.url));
                }
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL('/team', request.url));
            }
        }
    } catch (error) {
        console.error('Supabase proxy error:', error);
    // กรณีมี error อื่นๆ ให้ปล่อยผ่าน request ไปเพื่อไม่ให้เว็บล่มเป็น 500
    }
    return supabaseResponse;
}
}),
"[project]/proxy.ts [middleware] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "config",
    ()=>config,
    "proxy",
    ()=>proxy
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2f$session$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/supabase/session.ts [middleware] (ecmascript)");
;
async function proxy(request) {
    return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2f$session$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__["updateSession"])(request);
}
const config = {
    matcher: [
        /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - Public assets (svg, png, jpg, etc.)
     */ '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'
    ]
};
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__d3b7dc9f._.js.map