# 🏆 RoV SN Tournament Official — v3.0

ระบบจัดการทัวร์นาเมนต์ Arena of Valor (RoV) สำหรับรายการ SN Tournament
สร้างด้วย **Next.js 15 (App Router)** + **Supabase (PostgreSQL / Auth / Storage)**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/PhuriphatiZAMU/RoV-SN-Tournament-Official)

---

## 📸 ฟีเจอร์หลัก

| ฟีเจอร์ | รายละเอียด |
|---|---|
| 🏟️ **Tournament Dashboard** | ตารางแข่ง, ผลการแข่ง, อันดับคะแนน (Standings) แบบ Real-time |
| 📊 **Player & Team Stats** | สถิติผู้เล่นรายบุคคล, MVP, KDA, Win Rate — คำนวณระดับ Database |
| 🎮 **Hero Analytics** | วิเคราะห์ฮีโร่ยอดนิยม, อัตราชนะ, Pick Rate |
| 🛡️ **Admin Panel** | จัดการทีม, ผู้เล่น, กำหนดตารางแข่ง, บันทึกผล, อัปโหลดโลโก้ |
| 🔐 **SSO Authentication** | ระบบยืนยันตัวตนผ่าน Supabase Auth พร้อม Row Level Security |
| 🌏 **Multi-language** | รองรับภาษาไทยและอังกฤษ |

---

## 🏗️ สถาปัตยกรรมระบบ (Architecture)

```
┌────────────────────────────────────────────────────┐
│                    Vercel (Compute)                 │
│                                                    │
│   Next.js 15 App Router                            │
│   ┌──────────┐  ┌──────────┐  ┌────────────────┐  │
│   │ Public   │  │ Admin    │  │ Edge           │  │
│   │ Pages    │  │ Pages    │  │ Middleware      │  │
│   │ (RSC)    │  │ (Client) │  │ (Auth Guard)   │  │
│   └────┬─────┘  └────┬─────┘  └────────────────┘  │
│        │             │                             │
│   ┌────┴─────┐  ┌────┴──────┐                      │
│   │ Server   │  │ Supabase  │                      │
│   │ Actions  │  │ Browser   │                      │
│   │          │  │ Client    │                      │
│   └────┬─────┘  └────┬──────┘                      │
└────────┼──────────────┼────────────────────────────┘
         │              │
         └──────┬───────┘
                │  HTTPS (Supabase SDK)
    ┌───────────┴───────────┐
    │    Supabase (Data)    │
    │                       │
    │  ☐ PostgreSQL (10 tables, 4 RPCs)
    │  ☐ Auth (SSO + Profiles)
    │  ☐ Storage (team-logos, hero-images)
    │  ☐ RLS (40 policies)
    └───────────────────────┘
```

> **ไม่มี Express Server, ไม่มี MongoDB, ไม่มี CORS, ไม่มี API Proxy**
> ทุกอย่างรันเป็น Serverless Functions บน Vercel + Data Layer บน Supabase

---

## 🚀 เริ่มต้นใช้งาน (Quick Start)

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [npm](https://www.npmjs.com/) v9+
- บัญชี [Supabase](https://supabase.com/) (Free Tier ใช้ได้)

### 1. Clone โปรเจกต์

```bash
git clone https://github.com/PhuriphatiZAMU/RoV-SN-Tournament-Official.git
cd RoV-SN-Tournament-Official/client
npm install
```

### 2. ตั้งค่า Environment Variables

สร้างไฟล์ `client/.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://[YOUR_PROJECT_ID].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[YOUR_SUPABASE_ANON_KEY]
```

> 📍 ค่าเหล่านี้อยู่ที่ **Supabase Dashboard → Project Settings → API**

### 3. ตั้งค่า Supabase Database

รัน Migration SQL ตามลำดับใน **Supabase Dashboard → SQL Editor**:

```
1. supabase/migrations/001_initial_schema.sql    → สร้าง 10 ตาราง
2. supabase/migrations/002_rls_policies.sql      → สร้าง 40 RLS policies
3. supabase/migrations/003_auth_triggers.sql     → สร้าง trigger สำหรับ auto-profile
4. supabase/migrations/004_core_rpcs.sql         → สร้าง 4 stored procedures
```

### 4. สร้าง Storage Buckets

ใน **Supabase Dashboard → Storage**:

1. สร้าง bucket ชื่อ `team-logos` (ตั้งเป็น **Public**)
2. สร้าง bucket ชื่อ `hero-images` (ตั้งเป็น **Public**)

### 5. สร้าง Admin User

1. ไปที่ **Supabase Dashboard → Authentication → Users** → กด **Add user**
2. ใส่ Email และ Password สำหรับ Admin
3. หลังจากสร้างแล้ว ไปที่ **Table Editor → profiles** → แก้ `role` ของ user นั้นเป็น `admin`

### 6. รันระบบ

```bash
cd client
npm run dev
```

เปิด [http://localhost:3000](http://localhost:3000) 🎉

---

## 📁 โครงสร้างโปรเจกต์

```
client/
├── app/
│   ├── (public)/               # หน้า Public (RSC — ดึงข้อมูลฝั่ง Server)
│   │   ├── page.tsx            # หน้าแรก
│   │   ├── standings/          # ตารางคะแนน
│   │   ├── schedule/           # ตารางแข่งขัน
│   │   ├── results/            # ผลการแข่งขัน
│   │   ├── stats/              # สถิติผู้เล่น
│   │   └── team-stats/         # สถิติทีม
│   ├── admin/                  # หน้า Admin (ต้อง Login)
│   │   ├── page.tsx            # Dashboard
│   │   ├── draw/               # จับฉลากตารางแข่ง
│   │   ├── game-stats/         # บันทึกสถิติเกม
│   │   ├── heroes/             # จัดการฮีโร่
│   │   ├── history/            # ประวัติการแก้ไข
│   │   ├── logos/              # จัดการโลโก้ทีม
│   │   ├── players/            # จัดการผู้เล่น
│   │   ├── results/            # จัดการผลแข่ง
│   │   ├── schedule/           # จัดการตารางแข่ง
│   │   └── teams/              # จัดการทีม
│   └── layout.tsx
├── components/                 # Shared UI components
├── features/                   # Server Actions (Business Logic)
│   ├── analytics/actions.ts    # RPC: standings, leaderboard
│   ├── auth/actions.ts         # Supabase Auth: login, register, logout
│   ├── players/actions.ts      # CRUD: players, teams, heroes
│   └── tournament/actions.ts   # CRUD: matches, schedules, stats
├── lib/
│   ├── api.ts                  # Server-side data fetching (RSC)
│   └── api-client.ts           # Client-side data fetching (Admin)
├── utils/supabase/
│   ├── client.ts               # Browser Supabase client
│   ├── server.ts               # Server Supabase client (cookies)
│   └── middleware.ts           # Session refresh helper
├── middleware.ts               # Next.js Edge Middleware (route guard)
└── supabase/migrations/        # SQL migration files
```

---

## 🔐 ความปลอดภัย (Security Model)

ระบบใช้โมเดล **Defense-in-Depth** (ป้องกันหลายชั้น):

| ชั้น | เทคโนโลยี | หน้าที่ |
|---|---|---|
| 1️⃣ **Edge Middleware** | Vercel Edge | บล็อก `/admin/*` ก่อนถึง Server |
| 2️⃣ **Server Actions** | Next.js | ตรวจสอบ Session + Role ก่อน mutation |
| 3️⃣ **Row Level Security** | PostgreSQL | บังคับสิทธิ์ที่ระดับ Database row |

> ⚠️ RLS เป็น **last line of defense** — แม้จะ bypass ได้ทุกชั้น ข้อมูลก็ยังปลอดภัย

---

## 🗄️ Database Schema

| ตาราง | คำอธิบาย |
|---|---|
| `profiles` | ข้อมูลผู้ใช้ + role (admin/user) |
| `tournaments` | รายการทัวร์นาเมนต์ |
| `teams` | ทีมแข่งขัน + โลโก้ |
| `players` | ผู้เล่น + ชื่อในเกม |
| `matches` | ผลการแข่งขัน (Bo3/Bo5) |
| `game_stats` | สถิติรายเกม (K/D/A, MVP, Hero) |
| `schedules` | ตารางแข่งขัน (JSON) |
| `heroes` | รายชื่อฮีโร่ + รูปภาพ |
| `audit_logs` | ประวัติการแก้ไขข้อมูล |
| `seasons` | ข้อมูลฤดูกาลแข่งขัน |

### Stored Procedures (RPCs)

| RPC | หน้าที่ |
|---|---|
| `calculate_tournament_standings` | คำนวณอันดับคะแนน + GD |
| `get_player_leaderboard` | จัดอันดับผู้เล่น (KDA, MVP, Win%) |
| `get_team_stats` | สถิติรวมรายทีม |
| `get_season_overview` | สรุปภาพรวมฤดูกาล |

---

## 🌐 การ Deploy

ดูรายละเอียดฉบับเต็มที่ [**DEPLOYMENT.md**](./DEPLOYMENT.md)

**TL;DR:**
1. Push ขึ้น GitHub
2. Import ใน Vercel → ตั้ง Root Directory เป็น `client`
3. ใส่ 2 Environment Variables (`SUPABASE_URL`, `SUPABASE_ANON_KEY`)
4. กด Deploy ✅

---

## 📜 Version History

| Version | สถาปัตยกรรม | หมายเหตุ |
|---|---|---|
| v1.0 | React + Express + MongoDB | Monolithic API |
| v2.0 | Next.js + Express + MongoDB | Split-Stack, เพิ่ม SSR |
| **v3.0** | **Next.js + Supabase** | **Fullstack Serverless, RLS, RPC** |

---

## 📄 License

ISC © RoV SN Official
