import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/team'; // Default protect target

  if (code) {
    const supabase = await createClient();
    const { error, data } = await supabase.auth.exchangeCodeForSession(code);

    if (!error && data.user) {
      // Fetch detailed profile to determine redirection
      const { data: profile } = await supabase
        .from('profiles')
        .select('role, is_profile_complete, registration_status')
        .eq('id', data.user.id)
        .single();

      const role = profile?.role || 'student';
      const isComplete = !!profile?.is_profile_complete;
      const regStatus = profile?.registration_status || 'none';

      // 1. Forced Onboarding for incomplete profiles (usually OAuth users)
      if (!isComplete && regStatus === 'none') {
        return NextResponse.redirect(`${origin}/register/onboarding`);
      }

      // 2. Redirect based on role and registration status
      if (role === 'admin' || role === 'super_admin') {
        return NextResponse.redirect(`${origin}/admin`);
      }

      // 3. Normal users (students/players)
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // Return to login with error if no code or exchange failed
  return NextResponse.redirect(`${origin}/login?error=auth_failed`);
}
