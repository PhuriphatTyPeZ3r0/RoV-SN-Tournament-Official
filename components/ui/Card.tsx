/**
 * Card — surface container primitive
 *
 * Matches the card style already used ad-hoc throughout the app (e.g.
 * app/admin/teams/page.tsx: `bg-white rounded-2xl shadow-sm border
 * border-gray-100 hover:shadow-md`), but bound to mode-aware semantic
 * tokens directly instead of the `bg-white`/`border-gray-100` classes
 * that only work because of the `!important` hijack in globals.css.
 * (The unused `.card-echo` class in globals.css was a different,
 * glassmorphism-style card that no page actually uses — not reused here.)
 *
 * Usage:
 *   <Card>...</Card>
 *   <Card hoverable padding="lg">...</Card>
 */

import { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Adds the hover shadow/border transition used on interactive cards (e.g. team grid). */
  hoverable?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const paddingClasses = {
  none: '',
  sm: 'p-3',
  md: 'p-5',
  lg: 'p-6',
};

export default function Card({
  hoverable = false,
  padding = 'md',
  className,
  children,
  ...rest
}: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border bg-[var(--mode-bg-card)] border-[var(--mode-border)] shadow-sm transition-all',
        hoverable && 'hover:shadow-md hover:border-[var(--mode-border-strong)]',
        paddingClasses[padding],
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
