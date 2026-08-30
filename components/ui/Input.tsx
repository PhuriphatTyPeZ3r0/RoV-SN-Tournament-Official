/**
 * Input, Select, Textarea — form field primitives
 *
 * Each is self-labeling: pass `label` and it renders an associated
 * <label htmlFor>, wires `aria-invalid`/`aria-describedby` to an optional
 * `error` or `hint` message, and auto-generates a stable id via useId()
 * when one isn't provided. This is the accessibility floor every form
 * field in the app should have (existing pages mostly render bare
 * <input>/<select> with no programmatic label association at all).
 *
 * Styling relies on the existing mode-aware input rules already in
 * app/globals.css (`input:not(...), select, textarea { ... }`), so these
 * inherit correct dark/light theming for free — no extra CSS vars needed
 * here beyond the focus ring.
 *
 * Usage:
 *   <Input label="ชื่อทีม" value={name} onChange={...} error={errors.name} />
 *   <Select label="Season" value={season} onChange={...}>
 *     <option value="2026">2026</option>
 *   </Select>
 *   <Textarea label="คำอธิบาย" hint="สูงสุด 200 ตัวอักษร" />
 */

import { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes, useId } from 'react';
import { cn } from '@/lib/utils';

const fieldBaseClasses =
  // text-base (16px) on mobile, not text-sm (14px): iOS Safari auto-zooms
  // the viewport when focusing any input under 16px, which is jarring.
  // globals.css already guards .admin-input the same way — this is the
  // same fix, just expressed as a responsive Tailwind class instead of a
  // fixed !important override.
  'w-full rounded-lg border px-3 py-2.5 text-base sm:text-sm transition-colors ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-primary)] focus-visible:ring-offset-1 focus-visible:ring-offset-[var(--mode-bg-page)] ' +
  'disabled:opacity-50 disabled:cursor-not-allowed';

const errorFieldClasses = 'border-red-500 focus-visible:ring-red-500';

function FieldLabel({
  id,
  label,
  required,
}: {
  id: string;
  label: string;
  required?: boolean;
}) {
  return (
    <label htmlFor={id} className="block text-sm font-medium text-[var(--mode-text-primary)] mb-1.5">
      {label}
      {required && (
        <span className="text-red-500 ml-0.5" aria-hidden="true">
          *
        </span>
      )}
    </label>
  );
}

function FieldMessage({ id, error, hint }: { id: string; error?: string; hint?: string }) {
  if (!error && !hint) return null;
  return (
    <p
      id={id}
      role={error ? 'alert' : undefined}
      className={cn('mt-1.5 text-xs', error ? 'text-red-500' : 'text-[var(--mode-text-subtle)]')}
    >
      {error || hint}
    </p>
  );
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export function Input({ label, error, hint, required, className, id, ...rest }: InputProps) {
  const generatedId = useId();
  const fieldId = id ?? generatedId;
  const messageId = `${fieldId}-message`;

  return (
    <div>
      {label && <FieldLabel id={fieldId} label={label} required={required} />}
      <input
        id={fieldId}
        required={required}
        aria-invalid={!!error || undefined}
        aria-describedby={error || hint ? messageId : undefined}
        className={cn(fieldBaseClasses, error && errorFieldClasses, className)}
        {...rest}
      />
      <FieldMessage id={messageId} error={error} hint={hint} />
    </div>
  );
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export function Select({ label, error, hint, required, className, id, children, ...rest }: SelectProps) {
  const generatedId = useId();
  const fieldId = id ?? generatedId;
  const messageId = `${fieldId}-message`;

  return (
    <div>
      {label && <FieldLabel id={fieldId} label={label} required={required} />}
      <select
        id={fieldId}
        required={required}
        aria-invalid={!!error || undefined}
        aria-describedby={error || hint ? messageId : undefined}
        className={cn(fieldBaseClasses, 'cursor-pointer', error && errorFieldClasses, className)}
        {...rest}
      >
        {children}
      </select>
      <FieldMessage id={messageId} error={error} hint={hint} />
    </div>
  );
}

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export function Textarea({ label, error, hint, required, className, id, rows = 4, ...rest }: TextareaProps) {
  const generatedId = useId();
  const fieldId = id ?? generatedId;
  const messageId = `${fieldId}-message`;

  return (
    <div>
      {label && <FieldLabel id={fieldId} label={label} required={required} />}
      <textarea
        id={fieldId}
        rows={rows}
        required={required}
        aria-invalid={!!error || undefined}
        aria-describedby={error || hint ? messageId : undefined}
        className={cn(fieldBaseClasses, 'resize-y', error && errorFieldClasses, className)}
        {...rest}
      />
      <FieldMessage id={messageId} error={error} hint={hint} />
    </div>
  );
}
