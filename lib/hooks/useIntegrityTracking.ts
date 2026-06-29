'use client';

// lib/hooks/useIntegrityTracking.ts
//
// Browser-side hook that monitors tab visibility, window focus, and
// fullscreen state during an active quiz attempt. Fires fire-and-forget
// POST requests to /api/integrity/events to log cheating events.
//
// Owner: L7 (Mohamed Waleed) — Sprint 4 integration
// Consumed by: L4 solving page (app/(student)/student/quiz/[quizId]/solve/page.tsx)
//
// Backend contract: POST /api/integrity/events
//   Body: { attemptId, eventType, description, occurredAt, metadata? }
//   Auth: Student JWT (sent via apiFetch)
//
// DESIGN.md compliance: none — this is a behavior hook, no UI.

import { useEffect, useRef } from 'react';

// ── Types ────────────────────────────────────────────────────────

type CheatingEventType =
  | 'TAB_HIDDEN'
  | 'WINDOW_BLUR'
  | 'WINDOW_FOCUS'
  | 'FULLSCREEN_EXIT'
  | 'COPY_PASTE'
  | 'OTHER';

interface IntegrityEventPayload {
  attemptId: string;
  eventType: CheatingEventType;
  description: string;
  occurredAt: string;
  metadata?: Record<string, unknown>;
}

// ── Fire-and-forget API call ─────────────────────────────────────

async function logIntegrityEvent(payload: IntegrityEventPayload): Promise<void> {
  try {
    const token = localStorage.getItem('accessToken');
    await fetch('/api/integrity/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(payload),
      // keepalive: true ensures the request completes even if the page unloads
      keepalive: true,
    });
  } catch {
    // Fire-and-forget — silently ignore network errors during cheating logging.
    // We don't want to distract the student or break the solving flow.
  }
}

// ── Throttle helper ──────────────────────────────────────────────

function shouldThrottle(lastMs: number, cooldownMs: number): boolean {
  return Date.now() - lastMs < cooldownMs;
}

// ── Hook ─────────────────────────────────────────────────────────

interface UseIntegrityTrackingOptions {
  /** The active attempt ID. Tracking is disabled when null/undefined. */
  attemptId: string | null;
  /** Whether tracking is enabled (e.g., only during 'ready' phase). */
  enabled: boolean;
  /** Minimum milliseconds between events of the same type (default 2000). */
  throttleMs?: number;
}

export function useIntegrityTracking({
  attemptId,
  enabled,
  throttleMs = 2000,
}: UseIntegrityTrackingOptions): void {
  const lastEventRef = useRef<Record<string, number>>({});

  useEffect(() => {
    if (!enabled || !attemptId) return;

    // ── Tab visibility change ────────────────────────────────
    const handleVisibilityChange = () => {
      if (document.hidden) {
        const key = 'TAB_HIDDEN';
        if (shouldThrottle(lastEventRef.current[key] ?? 0, throttleMs)) return;
        lastEventRef.current[key] = Date.now();

        logIntegrityEvent({
          attemptId,
          eventType: 'TAB_HIDDEN',
          description: 'Student switched to another tab or minimized the window',
          occurredAt: new Date().toISOString(),
          metadata: { visibilityState: document.visibilityState },
        });
      }
    };

    // ── Window focus/blur ────────────────────────────────────
    const handleBlur = () => {
      const key = 'WINDOW_BLUR';
      if (shouldThrottle(lastEventRef.current[key] ?? 0, throttleMs)) return;
      lastEventRef.current[key] = Date.now();

      logIntegrityEvent({
        attemptId,
        eventType: 'WINDOW_BLUR',
        description: 'Quiz window lost focus',
        occurredAt: new Date().toISOString(),
      });
    };

    const handleFocus = () => {
      const key = 'WINDOW_FOCUS';
      if (shouldThrottle(lastEventRef.current[key] ?? 0, throttleMs)) return;
      lastEventRef.current[key] = Date.now();

      logIntegrityEvent({
        attemptId,
        eventType: 'WINDOW_FOCUS',
        description: 'Quiz window regained focus (may indicate external resource lookup)',
        occurredAt: new Date().toISOString(),
      });
    };

    // ── Fullscreen change ────────────────────────────────────
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement && document.fullscreenEnabled) {
        const key = 'FULLSCREEN_EXIT';
        if (shouldThrottle(lastEventRef.current[key] ?? 0, throttleMs)) return;
        lastEventRef.current[key] = Date.now();

        logIntegrityEvent({
          attemptId,
          eventType: 'FULLSCREEN_EXIT',
          description: 'Student exited fullscreen mode during quiz',
          occurredAt: new Date().toISOString(),
        });
      }
    };

    // ── Copy/paste detection ─────────────────────────────────
    const handleCopy = () => {
      const key = 'COPY_PASTE';
      if (shouldThrottle(lastEventRef.current[key] ?? 0, throttleMs * 2)) return;
      lastEventRef.current[key] = Date.now();

      logIntegrityEvent({
        attemptId,
        eventType: 'COPY_PASTE',
        description: 'Student attempted to copy content during quiz',
        occurredAt: new Date().toISOString(),
      });
    };

    // ── Register listeners ───────────────────────────────────
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleBlur);
    window.addEventListener('focus', handleFocus);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('copy', handleCopy);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleBlur);
      window.removeEventListener('focus', handleFocus);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('copy', handleCopy);
    };
  }, [attemptId, enabled, throttleMs]);
}
