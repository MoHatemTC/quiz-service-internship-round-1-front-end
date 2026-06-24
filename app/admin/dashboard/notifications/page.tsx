// app/admin/dashboard/notifications/page.tsx
//
// Admin view: Email delivery & invitation status monitoring.
// Owner: Mohamed Waleed (L7) — Sprint 3
//
// Displays aggregated delivery stats and per-quiz invitation breakdowns
// sourced from the existing NotificationsAdminController.
// Data fetching is client-side so auth tokens from the browser are sent.

import { Suspense } from 'react';
import DashboardHeader from '@/components/admin/dashboard/DashboardHeader';
import NotificationsDashboardView from '@/components/admin/dashboard/NotificationsDashboardView';

export const dynamic = 'force-dynamic';

export default function NotificationsDashboardPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-8 lg:px-10">
        <DashboardHeader
          title="Email Delivery & Invitations"
          description="Monitor email delivery status and per-quiz invitation breakdowns."
        />

        <Suspense fallback={
          <div className="rounded-xl border border-border bg-surface p-8 text-center">
            <p className="text-body text-foreground-secondary">Loading delivery data...</p>
          </div>
        }>
          <NotificationsDashboardView />
        </Suspense>
      </section>
    </main>
  );
}
