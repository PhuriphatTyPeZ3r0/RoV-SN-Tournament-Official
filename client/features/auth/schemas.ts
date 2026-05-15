import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('อีเมลไม่ถูกต้อง'),
  password: z.string().min(6, 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร'),
});

export const registerSchema = z.object({
  email: z.string().email('อีเมลไม่ถูกต้อง'),
  password: z.string().min(8, 'รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร'),
  confirmPassword: z.string().min(8, 'รหัสผ่านยืนยันต้องมีอย่างน้อย 8 ตัวอักษร'),
  firstNameTh: z.string().min(1, 'กรุณากรอกชื่อภาษาไทย'),
  lastNameTh: z.string().min(1, 'กรุณากรอกนามสกุลภาษาไทย'),
  firstNameEn: z.string().min(1, 'กรุณากรอกชื่อภาษาอังกฤษ'),
  lastNameEn: z.string().min(1, 'กรุณากรอกนามสกุลภาษาอังกฤษ'),
  studentId: z.string().regex(/^[0-9]{5}$/, 'รหัสนักเรียนต้องเป็นตัวเลข 5 หลัก'),
  grade: z.string().min(1, 'กรุณาเลือกชั้นเรียน'),
  openId: z.string().min(1, 'กรุณากรอก OpenID'),
  inGameName: z.string().min(1, 'กรุณากรอกชื่อในเกม (IGN)'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "รหัสผ่านไม่ตรงกัน",
  path: ["confirmPassword"],
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
