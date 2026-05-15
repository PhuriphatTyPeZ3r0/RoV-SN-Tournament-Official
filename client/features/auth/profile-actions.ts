'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function updateProfileAction(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: 'Unauthorized' };

  const fullName = formData.get('fullName') as string;
  const nickname = formData.get('nickname') as string;
  const phone = formData.get('phone') as string;
  const avatarUrl = formData.get('avatarUrl') as string;

  const { error } = await supabase
    .from('profiles')
    .update({
      full_name: fullName,
      nickname: nickname,
      phone: phone,
      avatar_url: avatarUrl,
      updated_at: new Date().toISOString()
    })
    .eq('id', user.id);

  if (error) return { error: error.message };

  revalidatePath('/profile');
  return { success: true };
}

export async function updateAccountSettingsAction(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: 'Unauthorized' };

  const email = formData.get('email') as string;
  const privacyFlag = formData.get('privacyFlag') === 'on';

  // Update Email in Auth
  if (email && email !== user.email) {
    const { error: authError } = await supabase.auth.updateUser({ email });
    if (authError) return { error: authError.message };
  }

  // Update Privacy in Profile
  const { error: profileError } = await supabase
    .from('profiles')
    .update({ privacy_flag: privacyFlag })
    .eq('id', user.id);

  if (profileError) return { error: profileError.message };

  revalidatePath('/settings');
  return { success: true };
}
