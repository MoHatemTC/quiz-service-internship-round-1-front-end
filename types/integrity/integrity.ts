// types/integrity/integrity.ts
//
// Frontend types for the admin integrity monitoring views.
// Consumed by: Admin suspicious-attempts integrity page.
// Backend contract: src/modules/integrity/dto/suspicious-attempt.dto.ts

/** Summary of a single cheating event. */
export type CheatingEventSummary = {
  id: string;
  eventType: string;
  description: string | null;
  occurredAt: string;
};

/** A flagged attempt with its cheating-event details. */
export type SuspiciousAttempt = {
  attemptId: string;
  studentId: string;
  studentName: string | null;
  quizId: string;
  quizTitle: string | null;
  eventCount: number;
  latestEventAt: string | null;
  events: CheatingEventSummary[];
};
