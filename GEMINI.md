# 🤖 AI Developer Agent Directives for RoV SN Tournament v3.0

## 🎯 Project Overview
**RoV SN Tournament** is an enterprise-grade esports tournament management platform. It handles student registrations, team formations, matchmaking, real-time match results, and dynamic standings.
The system implements a strict E-CMIS inspired Role-Based Access Control (RBAC) and Attribute-Based Access Control (ABAC).

## 🛠️ Tech Stack
- **Framework:** Next.js (App Router) + React 18+
- **Language:** TypeScript (Strict Mode)
- **Styling:** Tailwind CSS + UI Components (shadcn/ui or similar logic)
- **Database & Auth:** Supabase (PostgreSQL, GoTrue Auth, Realtime, Storage)
- **Validation:** Zod
- **Testing:** Playwright (E2E)

---

## 🏛️ Architectural Principles (CRITICAL)

### 1. The Data Layer (Supabase / PostgreSQL) is King
- **Business Logic lives in the DB:** Whenever possible, use PostgreSQL RPCs (Stored Procedures), Database Triggers, and Row-Level Security (RLS) instead of writing heavy logic in the Node.js server.
- **Strict RLS:** All tables MUST have RLS enabled. Never bypass RLS unless absolutely necessary (e.g., using `SECURITY DEFINER` functions or the Service Role key in specific background tasks).
- **Auditability:** Any action that mutates state in `teams`, `matches`, or `registrations` MUST trigger the `log_audit_event()` function to populate the `audit_logs` table.

### 2. Next.js App Router Rules
- **Server-First Approach:** Default to Server Components (`.tsx` without `'use client'`). Only use Client Components for interactive UI (e.g., forms, modals, real-time listeners).
- **Server Actions for Mutations:** NEVER create `/app/api/...` route handlers for internal data mutations. Always use Next.js Server Actions (located in `src/features/.../actions.ts`).
- **Data Validation:** ALL Server Actions MUST validate incoming `FormData` or payloads using **Zod** before executing Supabase queries.
- **Revalidation:** Always call `revalidatePath()` or `revalidateTag()` at the end of a successful Server Action to ensure UI freshness without full page reloads.

### 3. Authentication & RBAC (E-CMIS Pattern)
- **Role Hierarchy:** `guest` -> `student` -> `player` -> `captain` -> `admin` -> `super_admin`.
- **Custom Claims & DB Sync:** User roles are stored in `public.profiles`. New OAuth logins are automatically synced via DB Triggers with `is_profile_complete = false`.
- **Forced Onboarding:** If `is_profile_complete` is false, users MUST be forced to `/register/onboarding`.
- **Route Protection:** Rely on `src/middleware.ts` for route-level protection, AND the `checkRole()` utility inside Server Actions for defense-in-depth.
- **Admin Isolation:** Social Logins (Google OAuth) are strictly for Students. Admins MUST use Email/Password via the isolated `/admin/login` path.

---

## 💻 Coding Standards & Style Guide

### TypeScript & React
- Use functional components with `const Component = () => {}`.
- Extract reusable logic into custom hooks (if client-side) or utility functions.
- NO `any` types. Define explicit interfaces or infer types from Supabase generated types (`Database` type from `types/supabase.ts`).
- Avoid deeply nested ternary operators in JSX. Early returns are preferred.

### Tailwind CSS
- Group utility classes logically (e.g., Layout -> Spacing -> Typography -> Colors).
- Use `clsx` and `tailwind-merge` (`cn` utility) for conditional class joining.

---

## 🔄 Agent Execution Workflow
When assigned a new feature or task, you MUST follow this sequence:
1. **Analyze Requirements:** Understand the business logic and how it fits into the RBAC/E-CMIS model.
2. **Database First:** Do you need a new table, column, enum, or RPC? Write the raw `.sql` migration file first.
3. **RLS & Security:** Define who can `SELECT`, `INSERT`, `UPDATE`, `DELETE` this new data.
4. **Server Actions:** Create the mutation functions with Zod validation.
5. **UI Implementation:** Build the Server/Client components.
6. **E2E Consideration:** Ensure the change does not break the Playwright E2E tournament flow tests.

**DO NOT output explanations of what you are going to do unless explicitly asked. Just write the code following these rules.**
