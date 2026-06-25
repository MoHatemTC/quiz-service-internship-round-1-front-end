// lib/api/admin/integrity.ts
//
// API client for admin integrity monitoring endpoints.
// Backend: IntegrityAdminController
//   GET /api/admin/integrity/suspicious?threshold=N&quizId=...
//   GET /api/admin/integrity/attempts/:attemptId/events

import { apiFetch } from '@/lib/api/client';
import type { SuspiciousAttempt, CheatingEventSummary } from '@/types/integrity/integrity';

export type SuspiciousQuery = {
  threshold?: number;
  quizId?: string;
};

/** Fetch attempts flagged as suspicious above the given threshold. */
export async function getSuspiciousAttempts(
  query: SuspiciousQuery = {},
): Promise<SuspiciousAttempt[]> {
  const params = new URLSearchParams();
  if (query.threshold !== undefined) params.set('threshold', String(query.threshold));
  if (query.quizId) params.set('quizId', query.quizId);

  const qs = params.toString();
  return apiFetch<SuspiciousAttempt[]>(
    `/api/admin/integrity/suspicious${qs ? `?${qs}` : ''}`,
  );
}

/** Fetch all cheating events for a specific attempt. */
export async function getAttemptEvents(
  attemptId: string,
): Promise<CheatingEventSummary[]> {
  return apiFetch<CheatingEventSummary[]>(
    `/api/admin/integrity/attempts/${attemptId}/events`,
  );
}
