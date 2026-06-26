'use server';

import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export async function loginAdminAction(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { error: 'Please provide both email and password.' };
  }

  const supabase = await createClient();

  // 1. Authenticate via Supabase Email/Password
  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (authError || !authData.user) {
    return { error: 'Invalid email or password.' };
  }

  // 2. Query public.profiles to check if the user has role IN ('admin', 'super_admin')
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', authData.user.id)
    .single();

  const role = profile?.role || 'student';

  // 3. If they do NOT have admin roles, immediately signOut() and throw an error
  if (role !== 'admin' && role !== 'super_admin') {
    await supabase.auth.signOut();
    return { error: 'Unauthorized Access: You do not have administrator privileges.' };
  }

  // 4. If authorized, redirect to /admin
  redirect('/admin');
}
