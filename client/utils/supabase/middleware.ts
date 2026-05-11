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
    console.error('Supabase middleware: NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY is missing');
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

    // สำคัญ: ต้องเรียก getUser() เพื่อ trigger token refresh
    // อย่าใช้ getSession() เพราะไม่ validate token กับ Supabase Auth server
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // 🔒 SSO Guard: redirect ไป /login หากเข้าหน้า /admin โดยไม่ได้ login
    if (!user && request.nextUrl.pathname.startsWith('/admin')) {
      const url = request.nextUrl.clone();
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }

  } catch (error) {
    console.error('Supabase middleware error:', error);
    // กรณีมี error อื่นๆ ให้ปล่อยผ่าน request ไปเพื่อไม่ให้เว็บล่มเป็น 500
  }

  return supabaseResponse;
}
