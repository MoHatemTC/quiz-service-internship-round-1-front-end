// app/admin/dashboard/integrity/page.tsx
//
// Admin view: Suspicious-attempts integrity monitoring.
// Owner: Mohamed Waleed (L7) — Sprint 3
//
// Displays attempts flagged as suspicious based on a configurable
// cheating-event threshold. Sourced from IntegrityAdminController.

import { Suspense } from 'react';
import DashboardHeader from '@/components/admin/dashboard/DashboardHeader';
import SuspiciousAttemptsView from '@/components/admin/dashboard/SuspiciousAttemptsView';
import { searchParamsProps } from '@/types';

export const dynamic = 'force-dynamic';

function parseThreshold(value: unknown): number {
  if (typeof value === 'string') {
    const n = parseInt(value, 10);
    if (!isNaN(n) && n >= 1) return n;
  }
  return 3; // default threshold
}

export default async function IntegrityDashboardPage({ searchParams }: searchParamsProps) {
  const params = await searchParams;
  const threshold = parseThreshold(params.threshold);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-8 lg:px-10">
        <DashboardHeader
          title="Suspicious Attempts"
          description="Monitor cheating events and flag suspicious quiz attempts above a configurable threshold."
        />

        <Suspense fallback={
          <div className="rounded-xl border border-border bg-surface p-8 text-center">
            <p className="text-body text-foreground-secondary">Loading integrity data...</p>
          </div>
        }>
          <SuspiciousAttemptsView initialThreshold={threshold} />
        </Suspense>
      </section>
    </main>
  );
}
