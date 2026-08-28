import { getAccessToken } from './getAccessToken';

/**
 * experiment/microservices-k8s only. Points at the tournament-svc
 * Deployment running in minikube — see rosterServiceClient.ts for the
 * port-forward-vs-in-cluster-DNS note (same applies here).
 *
 * Unlike roster-svc (which returns `{ error }` objects), the functions
 * ported into tournament-svc throw on failure — matching
 * features/tournament/{actions,matchmaking-actions,result-actions}.ts,
 * whose callers use try/catch. So tournamentFetch throws too, instead of
 * returning an error shape.
 */
const TOURNAMENT_SVC_URL = process.env.TOURNAMENT_SVC_URL || 'http://localhost:4003';

export async function tournamentFetch<T = unknown>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  const token = await getAccessToken();

  let res: Response;
  try {
    res = await fetch(`${TOURNAMENT_SVC_URL}${path}`, {
      ...init,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(init.headers || {}),
      },
      cache: 'no-store',
    });
  } catch {
    throw new Error('ไม่สามารถเชื่อมต่อ tournament-svc ได้ (ตรวจสอบว่า kubectl port-forward ยังทำงานอยู่)');
  }

  const body = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(body?.error || `tournament-svc request failed (${res.status})`);
  }

  return body as T;
}
