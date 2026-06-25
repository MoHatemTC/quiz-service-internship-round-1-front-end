// types/notification/notification.ts
//
// Frontend types for the admin notification monitoring views.
// Consumed by: Admin email delivery / invitation status pages.
// Backend contract: src/modules/notifications/dto/delivery-summary.dto.ts

/** Aggregated counts across all email delivery logs. */
export type DeliveryStatusCounts = {
  total: number;
  sent: number;
  failed: number;
  pending: number;
};

/** Per-quiz invitation delivery breakdown. */
export type InvitationStatus = {
  quizId: string;
  quizTitle: string | null;
  totalInvited: number;
  totalSent: number;
  totalFailed: number;
  totalPending: number;
};

/** Full delivery summary returned by GET /api/admin/notifications/delivery-summary */
export type DeliverySummary = {
  overall: DeliveryStatusCounts;
  invitations: InvitationStatus[];
};
