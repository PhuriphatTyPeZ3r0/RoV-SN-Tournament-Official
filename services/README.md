# Microservices (experiment/microservices-k8s)

Learning exercise: decompose the Next.js + Supabase monolith into 4 services, deployed
on local Kubernetes (minikube). Not for production — see the Obsidian vault
`grill-me.md` / `Session_Memory_2026-08-28_Microservices_K8s_Grilling_Plan.md` for the
full agreed plan.

Each service is Node/Express + TypeScript, connects to the **same shared Supabase
project** (no database-per-service), and validates the Supabase JWT itself.

## Services and migration order (strangler fig)

| Order | Service | Ported from | Status |
|---|---|---|---|
| 1 | `analytics-svc` | `features/analytics/actions.ts` (read-only RPC getters) | deployed to minikube, verified: self-heal + rolling update |
| 2 | `roster-svc` | `features/teams/actions.ts` (captain-permission team self-service — `features/players/actions.ts` turned out to be dead code, see note below) | deployed to minikube, wired to real Next.js callers |
| 3 | `tournament-svc` | `features/tournament/{actions,matchmaking-actions,result-actions}.ts` (live subset only — see note below) | deployed to minikube, wired to real Next.js callers |
| 4 | `auth-svc` | `features/auth/{actions,student-actions}.ts` — deliberately narrow slice only, see note below | deployed to minikube, wired to real Next.js callers |

`analytics-svc` has no real frontend traffic initially — the Next.js RSC pages keep
reading Supabase directly for public data. Only mutations get rerouted through a
service, starting at `roster-svc`.

## Scope note (found during Phase 2)

The original plan assumed `roster-svc` would port `features/players/actions.ts`
(admin CRUD for teams/players/heroes). That turned out to be dead code — no page
calls its mutation functions; `app/admin/players/page.tsx` talks to Supabase
directly from the browser instead. The actual live "roster" surface is
`features/teams/actions.ts` (captain-permission-based team self-service: create/
join/leave/kick, lineup roles, contact info, ready status, invite codes), used by
`/team`, `/student-info`, and `/admin/teams`. `roster-svc` ported that file
instead — see `Session_Memory_2026-08-29_Microservices_K8s_Phase2_Roster_Svc.md`
in the Obsidian vault for the full reasoning.

## Scope note (found during Phase 3)

`features/tournament/actions.ts` mixes live and dead exports in the same
file (unlike Phase 2's players/teams split, where the whole target file
was dead). Confirmed 0 callers for `getMatchByKeyAction`, `getScheduleAction`,
`saveMatchResultAction`, `deleteMatchResultAction`, `resetDayResultsAction`,
`saveScheduleAction` — deleted rather than ported. The live
`saveGameStatsAction`/`getMatchStatsAction` that shadow those names in
`result-actions.ts` were kept. Also: these three files throw on failure
(caught via try/catch in the admin pages), unlike `features/teams/actions.ts`
which returns `{ error }` objects — `tournament-svc` and
`tournamentServiceClient.ts` mirror that (non-2xx + throw) instead of
Phase 2's `{ error }`-object pattern.

## Scope note (found during Phase 4)

`features/auth/*` has 23 exported functions, 17 live — most of them in
`student-actions.ts` (login, signup, OTP verification, onboarding,
password change). All of that was deliberately left calling Supabase
directly, on purpose, not due to running out of time: `signInWithPassword`/
`signUp`/`verifyOtp`/`setSession` all write httpOnly Supabase session
cookies through the Next.js SSR client's `setAll` callback, which only
Next.js's own response can do. A stateless service can validate
credentials and hand back a JSON token, but something in Next.js still has
to call `supabase.auth.setSession()` to turn that into a real cookie —
that's a real architecture decision (a session-issuing boundary), not
"paste the same wrapper pattern," and this exercise didn't need to take
that risk against code that had a JWT-refresh-loop bug fixed shortly
before this session (see recent git log on `main`).

What *did* move to `auth-svc`, because neither touches the cookie session:
- `getPendingRegistrations` / `updateRegistrationStatus` (student-actions.ts)
  — plain RLS-gated data ops, same shape as roster-svc/tournament-svc.
- The data half of `signOutAction` (actions.ts) — resets
  `profiles.otp_enabled`. The actual `supabase.auth.signOut()` call (which
  clears cookies) stays in the Next.js wrapper; auth-svc only does the
  side-effect that's safe for a stateless service to own.

Also deleted (confirmed dead, 0 callers anywhere): `signInAction`,
`signUpAction`, `getSessionAction`, `isAdminAction` from `actions.ts`.
`admin-actions.ts`'s `loginAdminAction` (also dead) was left alone since
that file wasn't otherwise being touched.

## Frontend (Phase 5)

The Next.js app is now also containerized (`../Dockerfile` at repo root,
`output: 'standalone'` in `next.config.ts`) and deployed as its own
`k8s/frontend` Deployment+Service+Ingress. It reaches the 3 wired services via
in-cluster Service DNS names, set as env vars on the frontend Deployment
(`ROSTER_SVC_URL=http://roster-svc`, etc.) — no port-forward needed now that
everything is inside the same cluster.

`k8s/frontend/ingress.yaml` is a **separate** Ingress resource from
`k8s/shared/ingress.yaml`, not another rule in it — the shared one carries
`rewrite-target: /$2`, which only makes sense for its capture-group `/api/*`
paths; the frontend needs the original path untouched (`/standings` must
reach Next.js as `/standings`), so it gets its own Ingress with no rewrite
annotation. nginx-ingress merges rules from multiple Ingress resources for
the same host, and matches `/api/*` before the frontend's `/` catch-all
regardless of which resource declared which — verified by curl.

Playwright now runs against the whole stack through the Ingress:
`BASE_URL=http://<port-forwarded-ingress> npx playwright test`
(`playwright.config.ts`'s `webServer` is skipped when `BASE_URL` is set, so it
doesn't also spin up a redundant local dev server). 43/94 passed — the
failures are exclusively assertions on real tournament data (standings
numbers, player stats, team rosters) that doesn't exist with placeholder
Supabase credentials; the pages themselves render 200, confirmed by curl.

## Local dev: reaching a service directly (bypassing the frontend)

To hit one service without going through the frontend, port-forward it
directly (bypasses the Ingress too, which is for external/browser traffic):

```
kubectl port-forward svc/roster-svc 4002:80
# .env.local: ROSTER_SVC_URL=http://localhost:4002 (this is also the default)
```
