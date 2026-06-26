import { createServerClient } from '@supabase/ssr';
import { type NextRequest, NextResponse } from 'next/server';

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error('Supabase proxy: NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY is missing');
    // ข้ามการทำงานของ Supabase auth ไปเลยหากไม่มี config ป้องกัน Middleware พัง
    return supabaseResponse;
  }

  try {
    const supabase = createServerClient(
      supabaseUrl,
      supabaseKey,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) =>
              request.cookies.set(name, value)
            );
            supabaseResponse = NextResponse.next({
              request,
            });
            cookiesToSet.forEach(({ name, value, options }) =>
              supabaseResponse.cookies.set(name, value, options)
            );
          },
        },
      }
    );

    const {
      data,
      error,
    } = await supabase.auth.getUser();

    const user = data?.user || null;

    if (error && (error.status === 400 || error.code === 'refresh_token_not_found')) {
      const cookieStore = request.cookies;
      const supabaseCookies = cookieStore.getAll().filter(
        c => c.name.startsWith('sb-') && c.name.endsWith('-auth-token')
      );
      supabaseCookies.forEach(c => {
        supabaseResponse.cookies.delete(c.name);
      });
    }

    // 🔒 RBAC Guard (Decoded from JWT App Metadata claims with zero DB queries)
    let role = 'guest';
    let isProfileComplete = false;
    let registrationStatus = 'none';
    let isOtpEnabled = false;
    if (user) {
      role = (user.app_metadata?.role as string) || 'guest';
      isProfileComplete = !!user.app_metadata?.is_profile_complete;
      registrationStatus = (user.app_metadata?.registration_status as string) || 'none';
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
      
      return NextResponse.redirect(callbackUrl);
    }

    // ✅ Public Routes: Everyone can access
    const isPublicPath = path === '/' || 
                        path.startsWith('/fixtures') || 
                        path.startsWith('/standings') || 
                        path.startsWith('/stats') || 
                        path.startsWith('/clubs') || 
                        path.startsWith('/format');

    if (isPublicPath) {
      return supabaseResponse;
    }

    // 🚩 0. Forced Onboarding Guard for OAuth Users
    // If logged in but profile is incomplete, force them to onboarding
    // BUT allow them to see their registration status if they've already submitted
    
    // Check if they are truly "new" (no profile completion AND no registration record)
    const isNewUser = !isProfileComplete && registrationStatus === 'none';

    if (user && isNewUser && 
        path !== '/register/onboarding' && 
        path !== '/registration-status' && 
        path !== '/auth/verify-otp' && 
        !path.startsWith('/auth/callback')) {
      return NextResponse.redirect(new URL('/register/onboarding', request.url));
    }

    // 🚩 0.5 OTP Guard (Must verify before accessing any protected route)
    if (user && !isOtpEnabled && 
        path !== '/auth/verify-otp' && 
        path !== '/register/onboarding' && 
        !path.startsWith('/auth/callback')) {
      return NextResponse.redirect(new URL('/auth/verify-otp', request.url));
    }

    // 🚩 1. Admin Approval Guard (Only for Admin applicants)
    if (user && registrationStatus === 'pending' && path.startsWith('/admin') && path !== '/registration-status') {
      return NextResponse.redirect(new URL('/registration-status', request.url));
    }

    // 🚩 2. Authorization Logic by Role
    
    // Admin & Super Admin Area
    if (path.startsWith('/admin')) {
      if (!user) return NextResponse.redirect(new URL('/login', request.url));
      
      // Super Admin only for approvals
      if (path.startsWith('/admin/registrations') && role !== 'super_admin') {
        return NextResponse.redirect(new URL('/admin', request.url));
      }

      // Approved Admin or Super Admin can access admin tools
      if (role !== 'admin' && role !== 'super_admin') {
        return NextResponse.redirect(new URL('/team', request.url));
      }
    }

    // Student & Player Area
    if (path.startsWith('/team') || path.startsWith('/student-info')) {
      if (!user) return NextResponse.redirect(new URL('/login', request.url));
      
      // Students can access immediately if verified (auto-verified for students)
      if (registrationStatus === 'rejected') {
        return NextResponse.redirect(new URL('/registration-status', request.url));
      }
    }

    // Public Auth Redirects
    if (path === '/login' || path === '/register') {
      if (user) {
        if (role === 'admin' || role === 'super_admin') {
          return NextResponse.redirect(new URL('/admin', request.url));
        }
        return NextResponse.redirect(new URL('/team', request.url));
      }
    }

  } catch (error) {
    console.error('Supabase proxy error:', error);
    // กรณีมี error อื่นๆ ให้ปล่อยผ่าน request ไปเพื่อไม่ให้เว็บล่มเป็น 500
  }

  return supabaseResponse;
}
