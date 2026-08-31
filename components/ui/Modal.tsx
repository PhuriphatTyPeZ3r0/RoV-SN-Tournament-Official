/**
 * Modal — accessible dialog primitive, built on Radix UI's Dialog
 *
 * Radix handles focus trap, restoring focus on close, Escape-to-close,
 * and the ARIA wiring (role="dialog", aria-modal, aria-labelledby/
 * aria-describedby linked to Title/Description) — none of that is
 * hand-rolled here, which is the whole point of using it for WCAG
 * compliance instead of writing this from scratch.
 *
 * Background/border/shadow come for free from the existing
 * `[role="dialog"] { ... !important }` rule in app/globals.css, which
 * Radix's Dialog.Content satisfies automatically (it renders
 * role="dialog"). Only layout/sizing/animation is added here.
 *
 * Scope: for NEW or existing custom in-app dialogs only — the 15 files
 * using SweetAlert2 for alert/confirm/toast are staying as-is (see
 * services/README.md's sibling note in the UX/UI plan for why).
 *
 * Usage:
 *   <Modal open={isOpen} onOpenChange={setIsOpen} title="ยืนยันการลบทีม" description="การกระทำนี้ย้อนกลับไม่ได้">
 *     <p>เนื้อหา...</p>
 *     <ModalFooter>
 *       <Button variant="ghost" onClick={() => setIsOpen(false)}>ยกเลิก</Button>
 *       <Button variant="destructive" onClick={handleDelete}>ลบ</Button>
 *     </ModalFooter>
 *   </Modal>
 */

import { ReactNode } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { cn } from '@/lib/utils';
import Button from '@/components/ui/Button';

interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  /** Optional supporting text under the title, wired to aria-describedby. */
  description?: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: 'sm:max-w-sm',
  md: 'sm:max-w-lg',
  lg: 'sm:max-w-2xl',
};

export default function Modal({ open, onOpenChange, title, description, children, size = 'md' }: ModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 data-[state=open]:animate-fade-in-up" />
        <Dialog.Content
          className={cn(
            'fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2',
            'w-[95vw] max-h-[90vh] overflow-y-auto rounded-2xl p-6',
            'focus-visible:outline-none',
            sizeClasses[size],
          )}
          // Radix warns in dev if a Dialog has no Description, since
          // Dialog.Content otherwise auto-wires aria-describedby to it.
          // Only override when we're deliberately not rendering one —
          // this must NOT fire when a description exists, or it would
          // break Radix's real wiring to it.
          {...(!description && { 'aria-describedby': undefined })}
        >
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <Dialog.Title className="text-lg font-display font-bold text-[var(--mode-text-primary)]">
                {title}
              </Dialog.Title>
              {description && (
                <Dialog.Description className="mt-1 text-sm text-[var(--mode-text-muted)]">
                  {description}
                </Dialog.Description>
              )}
            </div>
            <Dialog.Close asChild>
              <Button
                variant="ghost"
                size="sm"
                iconOnly
                icon="close"
                className="shrink-0 text-[var(--mode-text-subtle)] hover:text-[var(--mode-text-primary)]"
              >
                ปิด
              </Button>
            </Dialog.Close>
          </div>
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export function ModalFooter({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('mt-6 flex justify-end gap-3', className)}>
      {children}
    </div>
  );
}
