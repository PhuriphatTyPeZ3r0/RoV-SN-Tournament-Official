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
| 2 | `roster-svc` | `features/players/actions.ts` (teams/players/heroes CRUD) | not started |
| 3 | `tournament-svc` | `features/tournament/actions.ts` (matches/schedules/results) | not started |
| 4 | `auth-svc` | `features/auth/actions.ts` (login/register/session) | not started |

`analytics-svc` has no real frontend traffic initially — the Next.js RSC pages keep
reading Supabase directly for public data. Only mutations get rerouted through a
service, starting at `roster-svc`.
