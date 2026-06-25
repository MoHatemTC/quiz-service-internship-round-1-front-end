'use client';

// components/admin/dashboard/NotificationsDashboardView.tsx
//
// Client component that fetches email delivery summary and invitation
// status from the admin notifications API. Auth tokens are sent from
// the browser (localStorage), matching the integrity page pattern.
//
// Consumed by: app/admin/dashboard/notifications/page.tsx

import { useState, useEffect } from 'react';
import DeliveryStatsCards from '@/components/admin/dashboard/DeliveryStatsCards';
import InvitationStatusTable from '@/components/admin/dashboard/InvitationStatusTable';
import { getDeliverySummary, getInvitationStatus } from '@/lib/api/admin/notifications';
import type { DeliverySummary, InvitationStatus } from '@/types/notification/notification';

export default function NotificationsDashboardView() {
  const [summary, setSummary] = useState<DeliverySummary | null>(null);
  const [invitations, setInvitations] = useState<InvitationStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const [s, i] = await Promise.all([
          getDeliverySummary(),
          getInvitationStatus(),
        ]);
        if (!cancelled) {
          setSummary(s);
          setInvitations(i);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load delivery data.');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchData();
    return () => { cancelled = true; };
  }, [retry]);

  if (loading) {
    return (
      <div className="rounded-xl border border-border bg-surface p-8 text-center">
        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        <p className="mt-3 text-sm text-foreground-secondary">Loading delivery data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center">
        <p className="text-sm text-red-700">{error}</p>
        <button
          onClick={() => setRetry(c => c + 1)}
          className="mt-3 text-sm font-medium text-red-700 underline hover:text-red-800"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!summary) {
    return (
      <div className="rounded-xl border border-border bg-surface p-8 text-center">
        <p className="text-body text-foreground-secondary">
          Unable to load delivery data. Ensure the backend is running and you are logged in as an admin.
        </p>
      </div>
    );
  }

  return (
    <>
      <DeliveryStatsCards overall={summary.overall} />
      <InvitationStatusTable invitations={invitations} />
    </>
  );
}
