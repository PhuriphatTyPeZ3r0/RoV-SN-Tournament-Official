# 🔐 Security Policy — RoV SN Tournament v3.0

## สถาปัตยกรรมความปลอดภัย

ระบบใช้โมเดล **Defense-in-Depth** (ป้องกันหลายชั้น):

### ชั้นที่ 1: Edge Middleware (Vercel)
- Route `/admin/*` ถูกปกป้องด้วย Next.js Middleware
- ใช้ `supabase.auth.getUser()` (ไม่ใช่ `getSession()`) เพื่อป้องกัน Session spoofing
- ทำงานที่ Edge — เร็วระดับ millisecond

### ชั้นที่ 2: Server Actions
- ทุก mutation ตรวจสอบ Session + Role ก่อนดำเนินการ
- ใช้ `revalidatePath()` เพื่อล้าง cache หลัง mutation

### ชั้นที่ 3: Row Level Security (PostgreSQL)
- 40 RLS policies ครอบคลุมทุกตาราง
- Public users: อ่านได้อย่างเดียว
- Admin users: อ่าน + เขียน + ลบได้
- **RLS เป็น last line of defense** — แม้ bypass ชั้นอื่นได้ ข้อมูลก็ยังปลอดภัย

## Environment Variables

| ตัวแปร | ความปลอดภัย | หมายเหตุ |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Public OK | URL ของโปรเจกต์ (ไม่ใช่ความลับ) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public OK | ถูกจำกัดด้วย RLS — ทำอะไรเกินสิทธิ์ไม่ได้ |

> ⚠️ **ห้ามใช้ `service_role` key ใน Frontend หรือ Client-side Code โดยเด็ดขาด**

## การรายงานช่องโหว่

หากพบช่องโหว่ด้านความปลอดภัย กรุณาสร้าง **Private Issue** ที่ GitHub Repository
หรือติดต่อทีมพัฒนาโดยตรง — อย่าเปิดเผยรายละเอียดช่องโหว่ใน Public Issue

## Audit Log

ทุกการเปลี่ยนแปลงข้อมูลสำคัญ (ผลแข่ง, สถิติ) จะถูกบันทึกในตาราง `audit_logs` อัตโนมัติ
Admin สามารถตรวจสอบได้ที่หน้า `/admin/history`
