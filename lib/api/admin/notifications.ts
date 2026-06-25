// lib/api/admin/notifications.ts
//
// API client for admin email delivery monitoring endpoints.
// Backend: NotificationsAdminController
//   GET /api/admin/notifications/delivery-summary
//   GET /api/admin/notifications/invitation-status

import { apiFetch } from '@/lib/api/client';
import type { DeliverySummary, InvitationStatus } from '@/types/notification/notification';

/** Fetch aggregated delivery stats + per-quiz invitation breakdown. */
export async function getDeliverySummary(): Promise<DeliverySummary> {
  return apiFetch<DeliverySummary>('/api/admin/notifications/delivery-summary');
}

/** Fetch per-quiz invitation delivery status breakdown. */
export async function getInvitationStatus(): Promise<InvitationStatus[]> {
  return apiFetch<InvitationStatus[]>('/api/admin/notifications/invitation-status');
}
