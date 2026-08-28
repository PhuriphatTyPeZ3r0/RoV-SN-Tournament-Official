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
| 4 | `auth-svc` | `features/auth/actions.ts` (login/register/session) | not started |

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

## Local dev: reaching services from Next.js

While the frontend still runs outside the cluster (through Phase 4), point it at
a service with a direct port-forward (bypasses the Ingress, which is for
external/browser traffic):

```
kubectl port-forward svc/roster-svc 4002:80
# .env.local: ROSTER_SVC_URL=http://localhost:4002 (this is also the default)
```
