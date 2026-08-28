import { getAccessToken } from './getAccessToken';

/**
 * experiment/microservices-k8s only. Points at the auth-svc Deployment —
 * see rosterServiceClient.ts for the port-forward-vs-in-cluster-DNS note.
 *
 * Only the low-risk slice of features/auth/* was ported here (registration
 * approval + the sign-out data cleanup) — see services/README.md for why
 * login/signup/OTP were deliberately left calling Supabase directly. None
 * of the ported functions throw in the original code (they return plain
 * data or `{ success, error? }`), so this mirrors rosterFetch, not
 * tournamentFetch's throw-on-failure behavior.
 */
const AUTH_SVC_URL = process.env.AUTH_SVC_URL || 'http://localhost:4004';

export async function authFetch<T = unknown>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  const token = await getAccessToken();

  let res: Response;
  try {
    res = await fetch(`${AUTH_SVC_URL}${path}`, {
      ...init,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(init.headers || {}),
      },
      cache: 'no-store',
    });
  } catch {
    return { error: 'ไม่สามารถเชื่อมต่อ auth-svc ได้ (ตรวจสอบว่า kubectl port-forward ยังทำงานอยู่)' } as T;
  }

  return (await res.json()) as T;
}
