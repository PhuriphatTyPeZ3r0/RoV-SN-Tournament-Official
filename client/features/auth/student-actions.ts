'use server';

import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { Resend } from 'resend';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';

const resend = new Resend(process.env.RESEND_API_KEY);

const onboardingSchema = z.object({
  firstNameTh: z.string().min(1, 'กรุณากรอกชื่อภาษาไทย'),
  lastNameTh: z.string().min(1, 'กรุณากรอกนามสกุลภาษาไทย'),
  firstNameEn: z.string().min(1, 'กรุณากรอกชื่อภาษาอังกฤษ'),
  lastNameEn: z.string().min(1, 'กรุณากรอกนามสกุลภาษาอังกฤษ'),
  studentId: z.string().regex(/^[0-9]{5}$/, 'รหัสนักเรียนต้องเป็นตัวเลข 5 หลัก'),
  grade: z.string().min(1, 'กรุณากรอกชั้นเรียน'),
  openId: z.string().min(1, 'กรุณากรอก OpenID'),
  inGameName: z.string().min(1, 'กรุณากรอกชื่อในเกม (IGN)'),
});

export async function completeOnboardingAction(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: 'กรุณาเข้าสู่ระบบก่อนดำเนินการ' };
  }

  const isApplyingForAdmin = formData.get('applyForAdmin') === 'on';
  const privacyFlag = formData.get('privacyFlag') === 'on';

  // 1. Validate fields
  const rawData = {
    firstNameTh: formData.get('firstNameTh'),
    lastNameTh: formData.get('lastNameTh'),
    firstNameEn: formData.get('firstNameEn'),
    lastNameEn: formData.get('lastNameEn'),
    studentId: formData.get('studentId'),
    grade: formData.get('grade'),
    openId: formData.get('openId'),
    inGameName: formData.get('inGameName'),
  };

  const validated = onboardingSchema.safeParse(rawData);
  if (!validated.success) {
    return { error: validated.error.issues[0].message };
  }

  const data = validated.data;

  // 0. Auto-generate Username if not exists
  const { data: currentProfile } = await supabase.from('profiles').select('username').eq('id', user.id).single();
  let username = currentProfile?.username;

  if (!username) {
    let isUnique = false;
    let lastNameIndex = 1;
    while (!isUnique && lastNameIndex <= data.lastNameEn.length) {
      username = `${data.firstNameEn}.${data.lastNameEn.substring(0, lastNameIndex)}`;
      const { count } = await supabase.from('profiles').select('username', { count: 'exact', head: true }).eq('username', username);
      if (count === 0) isUnique = true;
      else lastNameIndex++;
    }
    if (!isUnique) username = `${data.firstNameEn}.${data.lastNameEn}.${Math.floor(Math.random() * 999)}`;
  }

  // Determine status and role based on application type
  const status = isApplyingForAdmin ? 'pending' : 'verified';
  const role = isApplyingForAdmin ? 'guest' : 'student';

  // 2. Update/Create public.profiles (Upsert)
  const { error } = await supabase
    .from('profiles')
    .upsert({
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
      is_profile_complete: !isApplyingForAdmin, // Mark complete if student
      registration_status: status,
      role: role as any,
    }, { onConflict: 'id' });

  if (error) {
    return { error: `บันทึกข้อมูลไม่สำเร็จ: ${error.message}` };
  }

  // 3. Insert into registrations table (Upsert based on user_id)
  const { error: regError } = await supabase
    .from('registrations')
    .upsert({
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
      target_role: isApplyingForAdmin ? 'admin' : 'student'
    }, { onConflict: 'user_id' });

  if (regError) {
    return { error: `Registration request failed: ${regError.message}` };
  }

  // 4. Auto-create player if it's a student
  if (!isApplyingForAdmin) {
    await supabase.from('players').insert({
      profile_id: user.id,
      name: `${data.firstNameTh} ${data.lastNameTh}`,
      grade: data.grade,
      in_game_name: data.inGameName,
      open_id: data.openId
    }).onConflict('profile_id').ignore();
  }

  // 5. Revalidate, Send OTP and Redirect
  revalidatePath('/', 'layout');
  await sendOTPAction();
  
  if (isApplyingForAdmin) {
    redirect('/auth/verify-otp?next=/registration-status');
  } else {
    redirect('/auth/verify-otp?next=/team');
  }
}

export async function loginStudentAction(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { error: 'Please provide both email and password.' };
  }

  const supabase = await createClient();

  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (authError || !authData.user) {
    return { error: 'Invalid email or password.' };
  }

  // Check profile for next steps
  const { data: profile } = await supabase
    .from('profiles')
    .select('is_first_login, otp_enabled')
    .eq('id', authData.user.id)
    .single();

  // All users in this flow should go through OTP as per diagram
  // We'll trigger OTP sending here
  await sendOTPAction();

  return { 
    success: true, 
    nextStep: 'verify-otp',
    isFirstLogin: profile?.is_first_login ?? false
  };
}

export async function registerStudentAction(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const firstNameTh = formData.get('firstNameTh') as string;
  const lastNameTh = formData.get('lastNameTh') as string;
  const firstNameEn = formData.get('firstNameEn') as string;
  const lastNameEn = formData.get('lastNameEn') as string;
  const studentId = formData.get('studentId') as string;
  const grade = formData.get('grade') as string;
  const openId = formData.get('openId') as string;
  const inGameName = formData.get('inGameName') as string;
  const privacyFlag = formData.get('privacyFlag') === 'on';
  const isApplyingForAdmin = formData.get('applyForAdmin') === 'on';

  if (!email || !password || !firstNameTh || !lastNameTh || !firstNameEn || !lastNameEn || !studentId || !grade || !inGameName) {
    return { error: 'Please fill in all required fields.' };
  }

  const supabase = await createClient();

  // 0. Auto-generate Username: Phuriphat.H -> Phuriphat.He (if duplicate)
  let username = `${firstNameEn}.${lastNameEn.charAt(0)}`;
  let isUnique = false;
  let lastNameIndex = 1;

  while (!isUnique && lastNameIndex <= lastNameEn.length) {
    username = `${firstNameEn}.${lastNameEn.substring(0, lastNameIndex)}`;
    const { count } = await supabase
      .from('profiles')
      .select('username', { count: 'exact', head: true })
      .eq('username', username);
    
    if (count === 0) {
      isUnique = true;
    } else {
      lastNameIndex++;
    }
  }

  // Fallback if full name + 123 is needed (highly unlikely but for safety)
  if (!isUnique) {
    username = `${firstNameEn}.${lastNameEn}.${Math.floor(Math.random() * 999)}`;
  }

  // 1. Sign up to Auth
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: `${firstNameTh} ${lastNameTh}`,
        username: username,
      }
    }
  });

  if (authError || !authData.user) {
    return { error: authError?.message || 'Registration failed.' };
  }

  // Determine status and role based on application type
  const status = isApplyingForAdmin ? 'pending' : 'verified';
  const role = isApplyingForAdmin ? 'guest' : 'student';

  // 2. Update profile
  await supabase
    .from('profiles')
    .update({ 
      username,
      first_name_th: firstNameTh,
      last_name_th: lastNameTh,
      first_name_en: firstNameEn,
      last_name_en: lastNameEn,
      student_id: studentId,
      class_grade: grade,
      open_id: openId,
      in_game_name: inGameName,
      privacy_flag: privacyFlag,
      is_first_login: true,
      registration_status: status,
      role: role as any,
      is_profile_complete: !isApplyingForAdmin // Mark complete if student
    })
    .eq('id', authData.user.id);

  // 3. Insert into registrations table
  const { error: regError } = await supabase
    .from('registrations')
    .insert({
      user_id: authData.user.id,
      full_name: `${firstNameTh} ${lastNameTh}`,
      first_name_th: firstNameTh,
      last_name_th: lastNameTh,
      first_name_en: firstNameEn,
      last_name_en: lastNameEn,
      student_id: studentId,
      grade: grade,
      open_id: openId,
      in_game_name: inGameName,
      privacy_flag: privacyFlag,
      status: status,
      target_role: isApplyingForAdmin ? 'admin' : 'student'
    });

  if (regError) {
    return { error: `Registration request failed: ${regError.message}` };
  }

  // 4. Auto-create player if it's a student
  if (!isApplyingForAdmin) {
    await supabase.from('players').insert({
      profile_id: authData.user.id,
      name: `${firstNameTh} ${lastNameTh}`,
      grade: grade,
      in_game_name: inGameName,
      open_id: openId
    }).onConflict('profile_id').ignore();
  }

  // 5. Send OTP and Redirect
  await sendOTPAction();

  if (isApplyingForAdmin) {
    redirect('/auth/verify-otp?next=/registration-status');
  } else {
    redirect('/auth/verify-otp?next=/team');
  }
}

export async function sendOTPAction() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user || !user.email) return { error: 'Unauthorized or email not found' };

  // Initialize Resend inside the action to ensure environment variables are loaded
  const resendClient = new Resend(process.env.RESEND_API_KEY);

  // 1. Generate OTP (6 digits)
  const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
  const expiry = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

  // 2. Save OTP to profile for verification
  const { error: dbError } = await supabase
    .from('profiles')
    .update({ 
      otp_code: otpCode,
      otp_expiry: expiry.toISOString()
    })
    .eq('id', user.id);

  if (dbError) return { error: dbError.message };

  // 3. Send Email via Resend
  try {
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
      `,
    });

    if (resendError) {
      console.error('[RESEND ERROR DETAILS]', resendError);
      return { error: `Email Error: ${resendError.message || 'Unknown Resend Error'}` };
    }

    return { success: true, message: 'OTP sent to your email' };
  } catch (err: any) {
    console.error('[SEND_OTP_EXCEPTION]', err);
    return { error: `Exception: ${err.message}` };
  }
}

export async function verifyOTPAction(otp: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: 'Unauthorized' };

  const { data: profile, error: fetchError } = await supabase
    .from('profiles')
    .select('otp_code, otp_expiry')
    .eq('id', user.id)
    .single();

  if (fetchError || !profile) return { error: 'Profile not found' };

  if (profile.otp_code !== otp) {
    return { error: 'Invalid OTP code' };
  }

  if (new Date(profile.otp_expiry) < new Date()) {
    return { error: 'OTP has expired' };
  }

  // Clear OTP after success
  await supabase
    .from('profiles')
    .update({ otp_code: null, otp_expiry: null, otp_enabled: true })
    .eq('id', user.id);

  return { success: true };
}

export async function changePasswordAction(password: string) {
  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({ password });
  
  if (error) return { error: error.message };

  // Update is_first_login flag
  const { data: { user } } = await supabase.auth.getUser();
  if (user) {
    await supabase
      .from('profiles')
      .update({ is_first_login: false })
      .eq('id', user.id);
  }

  return { success: true };
}

export async function getStudentRegistrationStatus() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  const { data } = await supabase.from('registrations').select('*').eq('user_id', user.id).single();
  return data;
}

export async function getPendingRegistrations() {
  const supabase = await createClient();
  const { data } = await supabase.from('registrations').select('*').order('created_at', { ascending: false });
  return data || [];
}

export async function updateRegistrationStatus(id: string, status: 'approved' | 'rejected', notes: string) {
  const supabase = await createClient();
  const { error } = await supabase.from('registrations').update({ status, screening_notes: notes }).eq('id', id);
  if (error) return { success: false, error: error.message };
  revalidatePath('/admin/registrations');
  return { success: true };
}