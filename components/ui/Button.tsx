/**
 * Button — shared button primitive
 *
 * Binds to the existing theme system (var(--theme-*) / var(--mode-*) from
 * app/globals.css) directly via Tailwind arbitrary values, so it renders
 * correctly across all 4 themes × dark/light mode without depending on the
 * `.bg-white { ... !important }` legacy hijack pattern.
 *
 * Usage:
 *   <Button>Save</Button>
 *   <Button variant="outline" size="sm">Cancel</Button>
 *   <Button variant="destructive" loading>Deleting…</Button>
 *   <Button icon="save">Save changes</Button>
 *   <Button iconOnly icon="close">ปิด</Button>   ← square button, icon only —
 *     children stays required and becomes the accessible name (sr-only)
 */

import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';
import Icon, { IconName } from '@/components/common/Icon';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Shows a spinner and disables the button — label stays visible for screen readers. */
  loading?: boolean;
  /** Leading icon, rendered via the shared Icon component. */
  icon?: IconName;
  /**
   * Renders as a square icon-only button (no visible label) — `icon` is
   * required in this mode. `children` is still required and stays in the
   * DOM as the accessible name via a visually-hidden span, so every
   * icon-only button keeps a real screen-reader label instead of relying
   * on callers to remember `aria-label`.
   */
  iconOnly?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-[var(--theme-primary)] text-[var(--theme-bg-deep)] font-bold shadow-[0_4px_15px_rgba(var(--theme-primary-rgb),0.3)] hover:shadow-[0_6px_25px_rgba(var(--theme-primary-rgb),0.5)] hover:-translate-y-0.5',
  secondary:
    'bg-[var(--mode-bg-card)] text-[var(--mode-text-primary)] border border-[var(--mode-border-strong)] hover:bg-[var(--mode-bg-card-hover)]',
  outline:
    'bg-transparent text-[var(--theme-primary)] border border-[var(--theme-primary)] hover:bg-[rgba(var(--theme-primary-rgb),0.1)]',
  ghost:
    'bg-transparent text-[var(--mode-text-primary)] hover:bg-[var(--mode-bg-card-hover)]',
  destructive:
    'bg-red-600 text-white font-bold shadow-[0_4px_15px_rgba(220,38,38,0.3)] hover:bg-red-500 hover:-translate-y-0.5',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'text-sm px-3 py-1.5 gap-1.5 rounded-lg',
  md: 'text-sm px-4 py-2.5 gap-2 rounded-xl',
  lg: 'text-base px-6 py-3 gap-2.5 rounded-xl',
};

// Square padding sized so the rendered icon (default opsz 24) plus padding
// clears WCAG 2.5.8's 24×24px touch-target minimum at every size.
const iconOnlySizeClasses: Record<ButtonSize, string> = {
  sm: 'p-1.5 rounded-lg',
  md: 'p-2 rounded-lg',
  lg: 'p-2.5 rounded-lg',
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', size = 'md', loading = false, icon, iconOnly = false, disabled, className, children, ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cn(
        'inline-flex items-center justify-center font-display transition-all duration-300 cursor-pointer',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--mode-bg-page)]',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:shadow-none',
        variantClasses[variant],
        iconOnly ? iconOnlySizeClasses[size] : sizeClasses[size],
        className,
      )}
      {...rest}
    >
      {loading ? (
        <Icon name="progress_activity" spin />
      ) : icon ? (
        <Icon name={icon} />
      ) : null}
      {iconOnly ? <span className="sr-only">{children}</span> : children}
    </button>
  );
});

export default Button;
