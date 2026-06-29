import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { sendOTPAction } from '@/features/auth/student-actions';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/team'; // Default protect target

  if (code) {
    const supabase = await createClient();
    const { error, data } = await supabase.auth.exchangeCodeForSession(code);

    if (!error && data.user) {
      // 1. Force otp_enabled to false to enforce 2FA verification on Google OAuth login
      // Sync Google OAuth metadata (email, full name, avatar) to public.profiles
      await supabase
        .from('profiles')
        .update({ 
          otp_enabled: false,
          email: data.user.email,
          full_name: data.user.user_metadata?.full_name || data.user.user_metadata?.name,
          avatar_url: data.user.user_metadata?.avatar_url || data.user.user_metadata?.picture
        })
        .eq('id', data.user.id);

      // 2. Refresh session on server side to write new JWT claims (with otp_enabled = false) back to cookies
      await supabase.auth.refreshSession();

      // 3. Fetch detailed profile to determine target redirection after OTP verification
      const { data: profile } = await supabase
        .from('profiles')
        .select('role, is_profile_complete, registration_status')
        .eq('id', data.user.id)
        .single();

      const role = profile?.role || 'student';
      const isComplete = !!profile?.is_profile_complete;
      const regStatus = profile?.registration_status || 'none';

      // 4. Trigger OTP sending to their registered email
      await sendOTPAction();

      // 5. Determine the final destination path after successful 2FA
      let targetPath = next;
      if (!isComplete && regStatus === 'none') {
        targetPath = '/register/onboarding';
      } else if (role === 'admin' || role === 'super_admin') {
        targetPath = '/admin';
      }

      // 6. Redirect to OTP verification page with target path
      return NextResponse.redirect(`${origin}/auth/verify-otp?next=${targetPath}`);
    }
  }

  // Return to login with error if no code or exchange failed
  return NextResponse.redirect(`${origin}/login?error=auth_failed`);
}
