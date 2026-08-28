/**
 * /dev/components — internal review page for the components/ui/ design
 * system, Phase 1 of the UX/UI plan. Not linked from anywhere in the app;
 * exists purely so Button/Input/Card/Modal can be eyeballed across all
 * 4 themes × dark/light mode before anything gets migrated to use them.
 *
 * Production gate: renders a plain placeholder instead of the real
 * preview when NODE_ENV is 'production', so the component gallery never
 * ships to real visitors. Not using next/navigation's notFound() here —
 * confirmed via `curl -D -` against a built+started production server
 * that calling it imperatively from a page returns HTTP 200 with the
 * not-found body instead of a real 404 status (a Next.js 16 quirk,
 * reproduced with and without `dynamic = 'force-dynamic'`; a genuinely
 * nonexistent route correctly 404s). Not worth fighting a framework edge
 * case for a page with no sensitive content — this achieves the actual
 * goal (no real content in production) regardless of status code.
 */

import PreviewClient from './PreviewClient';

export default function ComponentPreviewPage() {
  if (process.env.NODE_ENV === 'production') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--mode-bg-page,#0a1628)] text-[var(--mode-text-primary,#f0f8ff)]">
        <p className="text-sm">Not available.</p>
      </div>
    );
  }

  return <PreviewClient />;
}
