# 🚀 Deployment Guide — RoV SN Tournament v3.0

คู่มือการนำระบบขึ้น Production อย่างละเอียด สำหรับส่งมอบงานให้ทีมดูแลต่อ

---

## 📋 สารบัญ

1. [สถาปัตยกรรมการ Deploy](#1-สถาปัตยกรรมการ-deploy)
2. [ขั้นตอนที่ 1: ตั้งค่า Supabase](#2-ขั้นตอนที่-1-ตั้งค่า-supabase)
3. [ขั้นตอนที่ 2: Deploy บน Vercel](#3-ขั้นตอนที่-2-deploy-บน-vercel)
4. [ขั้นตอนที่ 3: ทดสอบระบบ](#4-ขั้นตอนที่-3-ทดสอบระบบ)
5. [การจัดการหลัง Deploy](#5-การจัดการหลัง-deploy)
6. [Troubleshooting](#6-troubleshooting)
7. [ค่าใช้จ่าย](#7-ค่าใช้จ่าย)
8. [การจัดการสาขาและสภาพแวดล้อม (Branches & Environments)](#8-การจัดการสาขาและสภาพแวดล้อม-branches--environments)

---

## 1. สถาปัตยกรรมการ Deploy

```
                    ┌──────────────┐
                    │   ผู้ใช้งาน   │
                    └──────┬───────┘
                           │ HTTPS
                    ┌──────┴───────┐
                    │   Vercel     │ ← Deploy อัตโนมัติจาก GitHub
                    │   (Compute) │
                    │              │
                    │  • Next.js   │
                    │  • RSC       │
                    │  • Actions   │
                    │  • Middleware│
                    └──────┬───────┘
                           │ Supabase SDK (HTTPS)
                    ┌──────┴───────┐
                    │  Supabase    │ ← จัดการผ่าน Dashboard
                    │  (Data)      │
                    │              │
                    │  • PostgreSQL│
                    │  • Auth      │
                    │  • Storage   │
                    │  • RLS       │
                    └──────────────┘
```

**หลักการสำคัญ:**
- **Vercel** = รัน Code เท่านั้น (Serverless, จ่ายตามการใช้งาน)
- **Supabase** = เก็บ Data เท่านั้น (Managed PostgreSQL)
- ไม่มี Server ค้างทิ้งไว้ 24 ชม. → ประหยัดค่าใช้จ่าย

---

## 2. ขั้นตอนที่ 1: ตั้งค่า Supabase

### 2.1 สร้างโปรเจกต์ Supabase

1. ไปที่ [supabase.com](https://supabase.com) → **New Project**
2. ตั้งชื่อ: `rov-sn-tournament`
3. เลือก Region: `Southeast Asia (Singapore)` ← เลือกใกล้ผู้ใช้ที่สุด
4. ตั้ง Database Password → **บันทึกไว้ให้ดี** (ไม่ต้องใช้ใน code แต่ต้องใช้กรณี connect ตรงจาก SQL client)
5. กด **Create new project** → รอ ~2 นาที

### 2.2 รัน Database Migrations

ไปที่ **SQL Editor** ใน Supabase Dashboard แล้วรัน SQL ไฟล์ตามลำดับ:

> ⚠️ **ต้องรันตามลำดับ** เพราะแต่ละไฟล์อ้างอิงตารางจากไฟล์ก่อนหน้า

| ลำดับ | ไฟล์ | ทำอะไร |
|---|---|---|
| 1️⃣ | `001_initial_schema.sql` | สร้าง 10 ตาราง + indexes |
| 2️⃣ | `002_rls_policies.sql` | สร้าง 40 Row Level Security policies |
| 3️⃣ | `003_auth_triggers.sql` | สร้าง trigger: auto-create profile เมื่อ user สมัคร |
| 4️⃣ | `004_core_rpcs.sql` | สร้าง 4 stored procedures (standings, leaderboard, etc.) |

**วิธีรัน:**
1. เปิดแต่ละไฟล์จากโฟลเดอร์ `client/supabase/migrations/`
2. Copy เนื้อหาทั้งหมด
3. Paste ลงใน SQL Editor → กด **Run**
4. ตรวจสอบว่าไม่มี Error → ทำไฟล์ถัดไป

### 2.3 สร้าง Storage Buckets

ไปที่ **Storage** ใน Dashboard:

1. กด **New bucket** → ชื่อ `team-logos`
   - ✅ เปิด **Public bucket**
   - File size limit: `5MB`
   - Allowed MIME types: `image/*`

2. กด **New bucket** → ชื่อ `hero-images`
   - ✅ เปิด **Public bucket**
   - File size limit: `5MB`
   - Allowed MIME types: `image/*`

> 💡 Public bucket หมายความว่ารูปสามารถเข้าถึงได้โดยไม่ต้อง login — จำเป็นสำหรับแสดงโลโก้ในหน้า Public

### 2.4 สร้าง Admin User

1. ไปที่ **Authentication → Users** → กด **Add user** → **Create new user**
2. ใส่:
   - Email: `admin@rov-sn.com` (หรือ Email จริงของ Admin)
   - Password: ตั้งรหัสที่แข็งแรง
   - ✅ Auto Confirm User
3. หลังจากสร้างแล้ว ไปที่ **Table Editor → profiles**
4. หา row ของ user ที่เพิ่งสร้าง → แก้ค่า `role` เป็น `admin`
5. กด **Save**

### 2.5 จดค่า API Keys

ไปที่ **Project Settings → API** → จดค่าเหล่านี้:

| ค่า | ตำแหน่งใน Dashboard | ตัวอย่าง |
|---|---|---|
| `Project URL` | API → Project URL | `https://abcdefg.supabase.co` |
| `anon public` key | API → Project API keys | `eyJhbGciOiJIUzI1NiIs...` |

> ⚠️ **ห้ามใช้ `service_role` key ใน Frontend** — key นี้ bypass RLS ทั้งหมด ใช้เฉพาะใน Server-side scripts ที่ปลอดภัยเท่านั้น

---

## 3. ขั้นตอนที่ 2: Deploy บน Vercel

### 3.1 เตรียม GitHub Repository

```bash
# ตรวจสอบว่าโค้ดล่าสุดถูก push แล้ว
cd RoV-SN-Tournament-Official
git add -A
git commit -m "v3.0: Next.js + Supabase (The Great Purge complete)"
git push origin main
```

### 3.2 Import โปรเจกต์ใน Vercel

1. ไปที่ [vercel.com](https://vercel.com) → Login ด้วย GitHub
2. กด **Add New...** → **Project**
3. เลือก Repository: `RoV-SN-Tournament-Official`
4. ตั้งค่า:

| การตั้งค่า | ค่า |
|---|---|
| **Framework Preset** | `Next.js` (เลือกอัตโนมัติ) |
| **Root Directory** | `client` ← **สำคัญมาก!** |
| **Build Command** | `npm run build` (ค่าเริ่มต้น) |
| **Output Directory** | `.next` (ค่าเริ่มต้น) |
| **Install Command** | `npm install` (ค่าเริ่มต้น) |

### 3.3 ตั้งค่า Environment Variables

ก่อนกด Deploy → ไปที่แท็บ **Environment Variables** แล้วเพิ่ม:

```
┌─────────────────────────────────────┬─────────────────────────────────────────┐
│ Name                                │ Value                                   │
├─────────────────────────────────────┼─────────────────────────────────────────┤
│ NEXT_PUBLIC_SUPABASE_URL            │ https://[YOUR_ID].supabase.co           │
│ NEXT_PUBLIC_SUPABASE_ANON_KEY       │ eyJhbGciOiJIUzI1NiIs...                │
└─────────────────────────────────────┴─────────────────────────────────────────┘
```

- ✅ เลือก **All Environments** (Production, Preview, Development)

### 3.4 กด Deploy! 🎉

กดปุ่ม **Deploy** → รอประมาณ 1-2 นาที

Vercel จะ:
1. Clone repository
2. `cd client && npm install`
3. `npm run build` (Next.js Build)
4. Deploy เป็น Serverless Functions + Static Files
5. มอบ URL: `https://rov-sn-tournament-xxxxx.vercel.app`

---

## 4. ขั้นตอนที่ 3: ทดสอบระบบ

### Checklist หลัง Deploy

| ✅ | ทดสอบ | วิธีตรวจ |
|---|---|---|
| ☐ | หน้าแรกโหลดได้ | เปิด `https://your-url.vercel.app` |
| ☐ | ตารางคะแนนแสดงผล | ไปที่ `/standings` |
| ☐ | ผลการแข่งแสดงผล | ไปที่ `/results` |
| ☐ | สถิติผู้เล่นแสดงผล | ไปที่ `/stats` |
| ☐ | Login Admin ได้ | ไปที่ `/admin` → ใส่ Email/Password |
| ☐ | สร้างทัวร์นาเมนต์ได้ | Admin Dashboard → สร้าง Tournament |
| ☐ | อัปโหลดโลโก้ได้ | Admin → Teams → กดอัปโหลด |
| ☐ | บันทึกผลแข่งได้ | Admin → Results → เพิ่มผลแข่ง |
| ☐ | Standings อัปเดตอัตโนมัติ | หลังบันทึกผล → กลับไปดูหน้า Standings |

### ทดสอบ Security

| ✅ | ทดสอบ | ผลที่ควรได้ |
|---|---|---|
| ☐ | เข้า `/admin` โดยไม่ login | Redirect ไปหน้า Login |
| ☐ | เรียก Supabase ด้วย anon key โดยตรง | RLS บล็อกการแก้ไขข้อมูล |
| ☐ | Login ด้วย user ที่ role ≠ admin | เข้าหน้า Admin ไม่ได้ |

---

## 5. การจัดการหลัง Deploy

### 5.1 อัปเดตโค้ด (CI/CD อัตโนมัติ)

```bash
# แก้โค้ด → Push ขึ้น GitHub → Vercel จะ re-deploy อัตโนมัติ
git add -A
git commit -m "fix: update team stats display"
git push origin main
# ✅ Vercel จะ build + deploy ใหม่ภายใน ~1 นาที
```

### 5.2 Custom Domain

1. Vercel Dashboard → **Settings → Domains**
2. กด **Add** → ใส่ Domain (เช่น `tournament.rov-sn.com`)
3. ไปที่ DNS Provider → เพิ่ม:
   - Type: `CNAME`
   - Name: `tournament` (หรือ `@` ถ้าเป็น root domain)
   - Value: `cname.vercel-dns.com`
4. รอ DNS propagate (~5 นาที) → Vercel จะออก SSL อัตโนมัติ

### 5.3 การ Backup ข้อมูล

- **Database:** Supabase ทำ Daily Backup อัตโนมัติ (เก็บ 7 วัน ใน Free Tier)
- **Storage:** ไฟล์รูปภาพเก็บใน Supabase Storage (มี redundancy ในตัว)
- **โค้ด:** เก็บบน GitHub (version controlled)

### 5.4 Monitoring

| เครื่องมือ | ดูอะไร | ที่ไหน |
|---|---|---|
| Vercel Analytics | Page views, Web Vitals | Vercel Dashboard → Analytics |
| Vercel Logs | Server Action errors | Vercel Dashboard → Logs |
| Supabase Logs | Database queries, Auth events | Supabase Dashboard → Logs |

---

## 6. Troubleshooting

### ❌ หน้าเว็บโหลดแล้วว่างเปล่า / Error 500

**สาเหตุ:** Environment Variables ไม่ถูกต้อง

**แก้ไข:**
1. ไป Vercel Dashboard → Settings → Environment Variables
2. ตรวจสอบว่า `NEXT_PUBLIC_SUPABASE_URL` และ `NEXT_PUBLIC_SUPABASE_ANON_KEY` ถูกต้อง
3. กด **Redeploy** (Deployments → 3-dot menu → Redeploy)

### ❌ Login แล้วเข้า Admin ไม่ได้

**สาเหตุ:** User ไม่มี role = admin ในตาราง profiles

**แก้ไข:**
1. Supabase Dashboard → Table Editor → `profiles`
2. หา user ID ของคุณ → แก้ `role` เป็น `admin`

### ❌ อัปโหลดโลโก้/รูปฮีโร่ไม่ได้

**สาเหตุ:** Storage bucket ยังไม่ได้สร้าง หรือไม่ได้ตั้งเป็น Public

**แก้ไข:**
1. Supabase Dashboard → Storage
2. ตรวจสอบว่ามี bucket `team-logos` และ `hero-images`
3. ตรวจสอบว่าเป็น **Public bucket**
4. ถ้ายังไม่ได้ตั้ง RLS policy สำหรับ Storage → เพิ่ม policy ให้ authenticated users สามารถ upload ได้

### ❌ Standings/Stats ไม่แสดง

**สาเหตุ:** ยังไม่ได้รัน migration `004_core_rpcs.sql`

**แก้ไข:**
1. Supabase Dashboard → SQL Editor
2. Copy เนื้อหาจาก `client/supabase/migrations/004_core_rpcs.sql`
3. Paste แล้วกด Run

### ❌ Build Error บน Vercel

**สาเหตุทั่วไป:**
- Root Directory ไม่ได้ตั้งเป็น `client`
- TypeScript errors

**แก้ไข:**
1. ตรวจ Build Logs ใน Vercel Dashboard
2. ลอง build ใน local: `cd client && npm run build`
3. แก้ error ที่เจอ → push ใหม่

---

## 7. ค่าใช้จ่าย

### Free Tier (เพียงพอสำหรับทัวร์นาเมนต์ขนาดเล็ก-กลาง)

| Service | Free Tier | เพียงพอสำหรับ |
|---|---|---|
| **Vercel** | 100GB bandwidth, 100 hrs compute | ~10,000 pageviews/เดือน |
| **Supabase** | 500MB database, 1GB storage, 50K auth users | ทัวร์นาเมนต์ 50+ ทีม สบายๆ |
| **รวม** | **$0/เดือน** | ✅ |

### เมื่อต้องอัปเกรด

| สัญญาณ | ควรอัปเกรดเป็น |
|---|---|
| Bandwidth เกิน 100GB | Vercel Pro ($20/เดือน) |
| Database เกิน 500MB | Supabase Pro ($25/เดือน) |
| ต้องการ Daily Backup มากกว่า 7 วัน | Supabase Pro |

---

## 8. การจัดการสาขาและสภาพแวดล้อม (Branches & Environments)

ระบบใช้โครงสร้างการแยกสภาพแวดล้อมแบบ 3 ระดับ เพื่อความปลอดภัยของข้อมูลและการทดสอบที่เสถียร:

### 8.1 ตารางการแมปสาขาและสภาพแวดล้อม (Mapping Matrix)

| สภาพแวดล้อม (Environment) | Git Branch | Vercel Deployment | Supabase Project | สิทธิ์การเข้าถึง |
|---|---|---|---|---|
| **Development (DEV)** | `dev` | Preview (ผูกกับ branch `dev`) | `rov-sn-dev` | นักพัฒนาเท่านั้น (Dev Team) |
| **User Acceptance (UAT)** | `uat` | Preview (ผูกกับ branch `uat`) | `rov-sn-uat` | ทีมทดสอบ, สตาฟ และผู้ตรวจรับงาน |
| **Production (PROD)** | `main` | Production (ค่าเริ่มต้น) | `rov-sn-prod` | ผู้ใช้ทั่วไป, ผู้เล่น, แอดมินหลัก |

### 8.2 ลำดับขั้นการส่งมอบงาน (Git Flow & Promotion)
การเปลี่ยนโค้ดขึ้นระบบต้องทำตามขั้นตอนอย่างเป็นระเบียบผ่าน Pull Request (PR):
1. **พัฒนาฟีเจอร์:** แตกสาขาจาก `dev` เป็น `feature/your-feature-name`
2. **ทดสอบระบบ DEV:** เปิด PR เข้าหา `dev` → Vercel จะ build ทดสอบบนระบบ dev-project อัตโนมัติ
3. **ทดสอบระบบ UAT:** เปิด PR จาก `dev` เข้าหา `uat` (ห้าม push ตรงเข้า uat) → เมื่อ merge แล้ว จะขึ้น uat-project เพื่อเริ่มกระบวนการตรวจรับ
4. **ขึ้น Production:** เมื่อ UAT ได้รับการยอมรับ เปิด PR จาก `uat` เข้าหา `main` → เมื่อ merge แล้ว ระบบจะถูก deploy สู่โปรเจกต์จริง (Production)

> 🔒 **ข้อแนะนำด้านความปลอดภัย:** ควรตั้งค่า Branch Protection Rules บน GitHub สำหรับสาขา `main` และ `uat` เพื่อบล็อกการ Push โค้ดตรงโดยไม่ผ่าน Pull Request และต้องการผลการทดสอบที่ผ่านเท่านั้น

### 8.3 การจัดการ Database Migrations (Supabase CLI)
เนื่องจากเรามี database 3 ตัวที่เป็นอิสระจากกัน:
- ในโฟลเดอร์ `supabase/migrations/` จะเก็บไฟล์ migration ทั้งหมดที่รันแบบลำดับขั้น
- การทดสอบใน local/dev จะรันผ่าน local CLI
- เมื่อ merge เข้า `uat`: ให้นักพัฒนาทำการ link CLI ไปยัง UAT project แล้วสั่ง `supabase db push`
- เมื่อ merge เข้า `main`: ให้นักพัฒนาทำการ link CLI ไปยัง Production project แล้วสั่ง `supabase db push`

### 8.4 การตั้งค่า Environment Variables บน Vercel
ในโปรเจกต์ Vercel ตัวเดียวกัน ให้เพิ่มตัวแปรระบบตามสัดส่วนของแต่ละ Environment:
- **`NEXT_PUBLIC_SUPABASE_URL`** และ **`NEXT_PUBLIC_SUPABASE_ANON_KEY`**
  - เลือก Scopes: **Production** (ผูกกับ branch `main`) -> ใช้ของ `rov-sn-prod`
  - เลือก Scopes: **Preview** (ผูกกับ branch `uat`) -> ใช้ของ `rov-sn-uat`
  - เลือก Scopes: **Development** (ผูกกับ branch `dev`) -> ใช้ของ `rov-sn-dev`

---

## 📞 ติดต่อ

หากพบปัญหาหรือต้องการความช่วยเหลือ:
- สร้าง Issue ที่ [GitHub Issues](https://github.com/PhuriphatiZAMU/RoV-SN-Tournament-Official/issues)
- ดู Migration History ที่ `client/supabase/migrations/`

---

*เอกสารนี้อัปเดตล่าสุด: v3.0 — Next.js + Supabase Architecture*
