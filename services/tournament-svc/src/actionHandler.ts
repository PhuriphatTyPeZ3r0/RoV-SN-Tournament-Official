import { Request, Response } from 'express';
import { extractAccessToken, getSupabaseClient } from './supabaseClient';
import { HttpError } from './requireAdmin';

/**
 * All functions ported here throw on failure (matching the monolith's
 * convention in these 3 files — unlike features/teams/actions.ts, which
 * returned `{ error }` objects). Failures become non-2xx responses; the
 * Next.js wrapper re-throws so existing try/catch callers keep working
 * unchanged.
 */
export function action(
  fn: (
    supabase: ReturnType<typeof getSupabaseClient>,
    accessToken: string | undefined,
    req: Request,
  ) => Promise<unknown>,
) {
  return async (req: Request, res: Response) => {
    try {
      const token = extractAccessToken(req.headers.authorization);
      const supabase = getSupabaseClient(token);
      const result = await fn(supabase, token, req);
      return res.json(result);
    } catch (err) {
      if (err instanceof HttpError) {
        return res.status(err.status).json({ error: err.message });
      }
      const message = err instanceof Error ? err.message : 'Unknown error';
      return res.status(500).json({ error: message });
    }
  };
}
