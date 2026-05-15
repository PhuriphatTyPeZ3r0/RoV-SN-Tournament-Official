import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/'; // Default redirect

  if (code) {
    const supabase = await createClient();
    const { error, data } = await supabase.auth.exchangeCodeForSession(code);

    if (!error && data.user) {
      // Check user role from profiles to determine redirection
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', data.user.id)
        .single();

      const role = profile?.role || 'student';

      // Redirect based on role
      if (role === 'admin' || role === 'super_admin') {
        return NextResponse.redirect(`${origin}/admin`);
      } else {
        // For students, players, captains
        // Try to respect the 'next' parameter if it's safe, otherwise go to /team
        const redirectPath = next === '/' ? '/team' : next;
        return NextResponse.redirect(`${origin}${redirectPath}`);
      }
    }
  }

  // Return to login with error if no code or exchange failed
  return NextResponse.redirect(`${origin}/login?error=auth_failed`);
}
