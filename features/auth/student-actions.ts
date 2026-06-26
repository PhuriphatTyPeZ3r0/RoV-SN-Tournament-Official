'use server';

import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { Resend } from 'resend';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { loginSchema, registerSchema } from './schemas';

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
    inGameName: formData.get('inGameName'),
  };

  const validated = onboardingSchema.safeParse(rawData);
  if (!validated.success) {
    return { error: validated.error.issues[0].message };
  }

  const data = validated.data;

  // Upload student ID card document
  const verificationDoc = formData.get('verificationDoc') as File | null;
  let docUrl = '';

  if (verificationDoc && verificationDoc.size > 0) {
    const fileExt = verificationDoc.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 7)}.${fileExt}`;
    const filePath = `verifications/${user.id}/${fileName}`;

    const fileBuffer = Buffer.from(await verificationDoc.arrayBuffer());
    
    const { error: uploadError } = await supabase.storage
      .from('verification-docs')
      .upload(filePath, fileBuffer, {
        contentType: verificationDoc.type,
        duplex: 'half'
      });

    if (uploadError) {
      return { error: `ไม่สามารถอัปโหลดไฟล์หลักฐานได้: ${uploadError.message}` };
    }

    docUrl = filePath; // Save relative path
  } else {
    return { error: 'กรุณาอัปโหลดรูปภาพหลักฐานแสดงตัวตน' };
  }

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
  // Both admins and students start as 'pending' for review
  const status = 'pending';
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
      is_profile_complete: true, // Complete onboarding phase
      registration_status: status, // pending review
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
      verification_doc_url: docUrl,
      target_role: isApplyingForAdmin ? 'admin' : 'student'
    }, { onConflict: 'user_id' });

  if (regError) {
    return { error: `Registration request failed: ${regError.message}` };
  }

  // 4. Revalidate, Send OTP and Redirect
  revalidatePath('/', 'layout');
  await sendOTPAction();
  
  if (isApplyingForAdmin) {
    redirect('/auth/verify-otp?next=/registration-status');
  } else {
    redirect('/auth/verify-otp?next=/student-info');
  }
}

export async function loginStudentAction(formData: FormData) {
  const rawData = Object.fromEntries(formData.entries());
  const validated = loginSchema.safeParse(rawData);

  if (!validated.success) {
    return { error: validated.error.issues[0].message };
  }

  const { email, password } = validated.data;
  const supabase = await createClient();

  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (authError || !authData.user) {
    return { error: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง' };
  }

  // Check profile for next steps
  const { data: profile } = await supabase
    .from('profiles')
    .select('is_first_login, is_profile_complete')
    .eq('id', authData.user.id)
    .single();

  // Trigger OTP sending
  await sendOTPAction();

  return { 
    success: true, 
    nextStep: 'verify-otp',
    isFirstLogin: profile?.is_first_login ?? false,
    isProfileComplete: profile?.is_profile_complete ?? false
  };
}

export async function registerStudentAction(formData: FormData) {
  const rawData = Object.fromEntries(formData.entries());
  const validated = registerSchema.safeParse(rawData);

  if (!validated.success) {
    return { error: validated.error.issues[0].message };
  }

  const data = validated.data;
  const supabase = await createClient();

  // 1. Sign up to Auth
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
  });

  if (authError || !authData.user) {
    return { error: authError?.message || 'การสมัครสมาชิกล้มเหลว' };
  }

  // 2. Send OTP and Redirect
  await sendOTPAction();
  redirect('/auth/verify-otp?next=/register/onboarding');
}

export async function sendOTPAction() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user || !user.email) return { error: 'Unauthorized or email not found' };

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

  // 3. Check for Resend API key to send email, or fall back to development mock
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.log('\n============================================================');
    console.log(`[DEVELOPMENT ONLY] OTP Code for ${user.email}: ${otpCode}`);
    console.log('============================================================\n');
    return { success: true, message: 'OTP sent to console (development mode)' };
  }

  // 4. Send Email via Resend
  try {
    const resendClient = new Resend(apiKey);
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

export async function resubmitRegistrationAction() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: 'Unauthorized' };
  }

  // 1. Reset profile fields for onboarding
  const { error: profileError } = await supabase
    .from('profiles')
    .update({
      is_profile_complete: false,
      registration_status: 'none'
    })
    .eq('id', user.id);

  if (profileError) {
    return { error: `Failed to reset profile: ${profileError.message}` };
  }

  // 2. Delete the registration request
  const { error: regError } = await supabase
    .from('registrations')
    .delete()
    .eq('user_id', user.id);

  if (regError) {
    return { error: `Failed to clear registration: ${regError.message}` };
  }

  revalidatePath('/', 'layout');
  return { success: true };
}

export async function getStudentRegistrationStatus() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  // profiles.registration_status is the source of truth for overall verification
  const { data: profile } = await supabase
    .from('profiles')
    .select('registration_status, full_name, student_id')
    .eq('id', user.id)
    .single();
  
  const { data } = await supabase
    .from('registrations')
    .select('*')
    .eq('user_id', user.id)
    .maybeSingle();

  // If no registration record exists but profile is verified, synthesize a response
  if (!data && profile?.registration_status === 'verified') {
    return {
      status: 'approved',
      full_name: profile.full_name,
      student_id: profile.student_id,
      in_game_name: null,
      verification_doc_url: null,
      screening_notes: null,
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
        const { data: signed } = await supabase.storage
          .from('verification-docs')
          .createSignedUrl(path, 60);
        data.verification_doc_url = signed?.signedUrl || data.verification_doc_url;
      }
    } else {
      const { data: signed } = await supabase.storage
        .from('verification-docs')
        .createSignedUrl(data.verification_doc_url, 60);
      data.verification_doc_url = signed?.signedUrl || null;
    }
  }
  
  return data;
}

export async function getPendingRegistrations() {
  const supabase = await createClient();
  const { data } = await supabase
    .from('registrations')
    .select('*')
    .order('created_at', { ascending: false });

  if (!data) return [];

  const mapped = await Promise.all(data.map(async (reg) => {
    if (reg.verification_doc_url) {
      if (reg.verification_doc_url.startsWith('http')) {
        const publicPrefix = 'verification-docs/';
        const index = reg.verification_doc_url.indexOf(publicPrefix);
        if (index !== -1) {
          const path = reg.verification_doc_url.substring(index + publicPrefix.length);
          const { data: signed } = await supabase.storage
            .from('verification-docs')
            .createSignedUrl(path, 60);
          return { ...reg, verification_doc_url: signed?.signedUrl || reg.verification_doc_url };
        }
      } else {
        const { data: signed } = await supabase.storage
          .from('verification-docs')
          .createSignedUrl(reg.verification_doc_url, 60);
        return { ...reg, verification_doc_url: signed?.signedUrl || null };
      }
    }
    return reg;
  }));

  return mapped;
}

export async function updateRegistrationStatus(id: string, status: 'approved' | 'rejected', notes: string) {
  const supabase = await createClient();
  const { error } = await supabase.from('registrations').update({ status, screening_notes: notes }).eq('id', id);
  if (error) return { success: false, error: error.message };
  revalidatePath('/admin/registrations');
  return { success: true };
}

export async function getPlayerGamingProfile() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  let { data: player } = await supabase
    .from('players')
    .select('id, in_game_name, open_id, current_rank, lineup_role, secondary_role, top_heroes, experience_bio, favorite_heroes, nickname, phone')
    .eq('profile_id', user.id)
    .maybeSingle();

  // Self-healing: if profile is verified but player row is missing, auto-create it
  if (!player) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('registration_status, full_name, class_grade, in_game_name')
      .eq('id', user.id)
      .maybeSingle();

    if (profile && (profile.registration_status === 'verified' || profile.registration_status === 'approved')) {
      const { data: newPlayer, error: createError } = await supabase
        .from('players')
        .insert({
          profile_id: user.id,
          name: profile.full_name || 'Anonymous Player',
          grade: profile.class_grade || '',
          in_game_name: profile.in_game_name || ''
        })
        .select('id, in_game_name, open_id, current_rank, lineup_role, secondary_role, top_heroes, experience_bio, favorite_heroes, nickname, phone')
        .single();

      if (!createError && newPlayer) {
        player = newPlayer;
      } else if (createError) {
        console.error('Self-healing: Failed to auto-create player row:', createError);
      }
    }
  }

  return player;
}
