import { createClient } from '@/utils/supabase/server';

/**
 * experiment/microservices-k8s only. Points at the roster-svc Deployment
 * running in minikube. While the frontend still runs outside the cluster
 * (Phase 2-4), reach it via `kubectl port-forward svc/roster-svc 4002:80`.
 * Once the frontend is containerized (Phase 5) this should become the
 * in-cluster service DNS name (e.g. http://roster-svc) instead.
 */
const ROSTER_SVC_URL = process.env.ROSTER_SVC_URL || 'http://localhost:4002';

async function getAccessToken(): Promise<string | undefined> {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return session?.access_token;
}

/**
 * Calls roster-svc and returns its JSON body as-is. roster-svc mirrors the
 * monolith's Server Action return shape (`{ error }` or `{ success, ... }`
 * or raw data), so callers can be treated exactly like the old direct
 * Supabase calls were.
 */
export async function rosterFetch<T = unknown>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  const token = await getAccessToken();

  let res: Response;
  try {
    res = await fetch(`${ROSTER_SVC_URL}${path}`, {
      ...init,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(init.headers || {}),
      },
      cache: 'no-store',
    });
  } catch {
    return { error: 'ไม่สามารถเชื่อมต่อ roster-svc ได้ (ตรวจสอบว่า kubectl port-forward ยังทำงานอยู่)' } as T;
  }

  return (await res.json()) as T;
}
