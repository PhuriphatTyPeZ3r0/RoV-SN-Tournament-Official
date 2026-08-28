import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Races a promise against a timeout, resolving to `fallback` only if the
 * promise doesn't settle in time — for request-blocking server-side data
 * fetches (e.g. layout/metadata calls that gate every page render) where
 * an unreachable or degraded upstream should never be allowed to hang the
 * whole app. A genuine rejection from `promise` itself still propagates as
 * a rejection (not swallowed into `fallback`) so callers relying on the
 * error — e.g. re-throwing Next.js's DYNAMIC_SERVER_USAGE signal — keep
 * working; only an actual timeout is converted to `fallback`.
 */
export function withTimeout<T>(promise: PromiseLike<T>, ms: number, fallback: T): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => resolve(fallback), ms);
    promise.then(
      (value) => {
        clearTimeout(timer);
        resolve(value);
      },
      (err) => {
        clearTimeout(timer);
        reject(err);
      },
    );
  });
}
