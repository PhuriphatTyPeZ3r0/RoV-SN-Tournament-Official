import { Request, Response } from 'express';
import { extractAccessToken, getSupabaseClient } from './supabaseClient';

/**
 * The 3 functions ported here (getPendingRegistrations, updateRegistrationStatus,
 * the sign-out data cleanup) don't throw in the original code — they return
 * plain data or a `{ success, error? }` shape. So this wrapper only needs to
 * catch genuinely unexpected failures (500); business results pass through as-is.
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
      const message = err instanceof Error ? err.message : 'Unknown error';
      return res.status(500).json({ error: message });
    }
  };
}
