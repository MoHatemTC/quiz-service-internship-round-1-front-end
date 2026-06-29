'use client';

// components/admin/dashboard/SuspiciousAttemptsView.tsx
//
// Interactive admin view for monitoring suspicious quiz attempts.
// Features:
//   - Configurable threshold slider (1–20)
//   - Table of flagged attempts sorted by event count
//   - Expandable row showing detailed cheating events per attempt
//
// Consumed by: app/admin/dashboard/integrity/page.tsx

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getSuspiciousAttempts, getAttemptEvents } from '@/lib/api/admin/integrity';
import type { SuspiciousAttempt, CheatingEventSummary } from '@/types/integrity/integrity';

function EventTypeBadge({ type }: { type: string }) {
  const colorMap: Record<string, string> = {
    TAB_HIDDEN: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
    WINDOW_BLUR: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    WINDOW_FOCUS: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400',
    FULLSCREEN_EXIT: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
    COPY_PASTE: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    OTHER: 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400',
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${colorMap[type] ?? colorMap.OTHER}`}
    >
      {type.replace(/_/g, ' ')}
    </span>
  );
}

function formatDate(iso: string | null): string {
  if (!iso) return '—';
  return new Date(iso).toLocaleString();
}

export default function SuspiciousAttemptsView({
  initialThreshold,
}: {
  initialThreshold: number;
}) {
  const router = useRouter();
  const [threshold, setThreshold] = useState(initialThreshold);
  const [attempts, setAttempts] = useState<SuspiciousAttempt[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [networkDown, setNetworkDown] = useState(false);
  const [retry, setRetry] = useState(0);

  // Expanded attempt IDs
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  // Detailed events for expanded rows
  const [detailedEvents, setDetailedEvents] = useState<Record<string, CheatingEventSummary[]>>({});

  useEffect(() => {
    let cancelled = false;

    async function fetchData() {
      setLoading(true);
      setError(null);
      setNetworkDown(false);
      try {
        const data = await getSuspiciousAttempts({ threshold });
        if (!cancelled) setAttempts(data);
      } catch (err) {
        if (!cancelled) {
          if (err instanceof TypeError && err.message === 'Failed to fetch') {
            setNetworkDown(true);
          } else {
            setError(err instanceof Error ? err.message : 'Failed to load integrity data.');
          }
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchData();
    return () => { cancelled = true; };
  }, [threshold, retry]);

  const handleThresholdChange = (value: number) => {
    setThreshold(value);
    // Update URL so the page is shareable/bookmarkable
    const params = new URLSearchParams(window.location.search);
    params.set('threshold', String(value));
    router.replace(`?${params.toString()}`, { scroll: false });
    // Clear expanded state on threshold change
    setExpanded(new Set());
    setDetailedEvents({});
  };

  const toggleExpand = async (attemptId: string) => {
    const next = new Set(expanded);
    if (next.has(attemptId)) {
      next.delete(attemptId);
      setExpanded(next);
    } else {
      next.add(attemptId);
      setExpanded(next);

      // Fetch detailed events if not already cached
      if (!detailedEvents[attemptId]) {
        try {
          const events = await getAttemptEvents(attemptId);
          setDetailedEvents((prev) => ({ ...prev, [attemptId]: events }));
        } catch {
          setDetailedEvents((prev) => ({ ...prev, [attemptId]: [] }));
        }
      }
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Threshold configurator */}
      <div className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <label htmlFor="threshold-slider" className="text-sm font-medium text-foreground whitespace-nowrap">
            Flag threshold:
          </label>
          <input
            id="threshold-slider"
            type="range"
            min={1}
            max={20}
            value={threshold}
            onChange={(e) => handleThresholdChange(Number(e.target.value))}
            className="h-2 w-40 cursor-pointer appearance-none rounded-full bg-muted accent-primary"
          />
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
            {threshold}
          </span>
        </div>
        <p className="text-xs text-foreground-secondary">
          Attempts with ≥ {threshold} cheating events are flagged.
        </p>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="rounded-xl border border-border bg-surface p-8 text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <p className="mt-3 text-sm text-foreground-secondary">Loading suspicious attempts...</p>
        </div>
      )}

      {/* Network-down state (backend unreachable) */}
      {networkDown && !loading && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-6 text-center">
          <p className="text-sm font-medium text-amber-700">Backend unreachable</p>
          <p className="mt-1 text-xs text-amber-600">
            Cannot connect to the API server. Check that Docker is running and the backend is up.
          </p>
          <button
            onClick={() => setRetry(c => c + 1)}
            className="mt-3 text-sm font-medium text-amber-700 underline hover:text-amber-800"
          >
            Retry
          </button>
        </div>
      )}

      {/* Error state (API error or permission denied) */}
      {error && !loading && !networkDown && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center">
          <p className="text-sm font-medium text-red-700">
            {error.includes('403') || error.includes('Forbidden')
              ? 'Access denied. You must be logged in as an admin to view this page.'
              : error}
          </p>
          <button
            onClick={() => setRetry(c => c + 1)}
            className="mt-3 text-sm font-medium text-red-700 underline hover:text-red-800"
          >
            Retry
          </button>
        </div>
      )}

      {/* Results table */}
      {!loading && !error && (
        <>
          {attempts.length === 0 ? (
            <div className="rounded-xl border border-border bg-surface p-8 text-center">
              <p className="text-body text-foreground-secondary">
                No suspicious attempts found at threshold {threshold}. Everything looks clean!
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h2 className="text-h3 font-semibold text-foreground">
                  Flagged Attempts
                  <span className="ml-2 text-sm font-normal text-foreground-secondary">
                    ({attempts.length} found)
                  </span>
                </h2>
              </div>

              <div className="overflow-x-auto rounded-xl border border-border bg-surface">
                <table className="w-full text-left text-sm">
                  <thead className="border-b border-border bg-muted/50">
                    <tr>
                      <th className="px-4 py-3 font-medium text-foreground-secondary">Student</th>
                      <th className="px-4 py-3 font-medium text-foreground-secondary">Quiz</th>
                      <th className="px-4 py-3 font-medium text-foreground-secondary">Events</th>
                      <th className="px-4 py-3 font-medium text-foreground-secondary">Latest Event</th>
                      <th className="px-4 py-3 font-medium text-foreground-secondary w-10"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {attempts.map((a) => {
                      const isExpanded = expanded.has(a.attemptId);
                      const events = detailedEvents[a.attemptId] ?? a.events;

                      return (
                        <tr key={a.attemptId} className="group">
                          <td
                            className="px-4 py-3 font-medium text-foreground hover:bg-muted/30 cursor-pointer transition-colors"
                            colSpan={isExpanded ? 1 : undefined}
                            onClick={() => toggleExpand(a.attemptId)}
                          >
                            <div>
                              <span>{a.studentName ?? 'Unknown'}</span>
                              <span className="ml-2 text-xs text-foreground-secondary">
                                ({a.studentId.slice(0, 8)}...)
                              </span>
                            </div>
                          </td>
                          <td
                            className="px-4 py-3 text-foreground-secondary hover:bg-muted/30 cursor-pointer transition-colors"
                            onClick={() => toggleExpand(a.attemptId)}
                          >
                            {a.quizTitle ?? a.quizId.slice(0, 8) + '...'}
                          </td>
                          <td
                            className="px-4 py-3 hover:bg-muted/30 cursor-pointer transition-colors"
                            onClick={() => toggleExpand(a.attemptId)}
                          >
                            <span
                              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold ${
                                a.eventCount >= 10
                                  ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                                  : a.eventCount >= 5
                                    ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                                    : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                              }`}
                            >
                              {a.eventCount}
                            </span>
                          </td>
                          <td
                            className="px-4 py-3 text-xs text-foreground-secondary hover:bg-muted/30 cursor-pointer transition-colors"
                            onClick={() => toggleExpand(a.attemptId)}
                          >
                            {formatDate(a.latestEventAt)}
                          </td>
                          <td className="px-4 py-3 text-right">
                            <button
                              onClick={() => toggleExpand(a.attemptId)}
                              className="text-foreground-secondary hover:text-foreground transition-colors"
                              aria-label={isExpanded ? 'Collapse events' : 'Expand events'}
                            >
                              <svg
                                viewBox="0 0 20 20"
                                className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Expanded event details */}
              {attempts.map((a) => {
                const isExpanded = expanded.has(a.attemptId);
                if (!isExpanded) return null;

                const events = detailedEvents[a.attemptId] ?? a.events;

                return (
                  <div
                    key={`events-${a.attemptId}`}
                    className="-mt-2 rounded-b-xl border border-t-0 border-border bg-muted/20 px-4 pb-4 pt-2"
                  >
                    <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-foreground-secondary">
                      Cheating Events for Attempt {a.attemptId.slice(0, 8)}...
                    </h4>
                    {events.length === 0 ? (
                      <p className="text-xs text-foreground-secondary">No detailed events available.</p>
                    ) : (
                      <div className="max-h-64 overflow-y-auto">
                        <table className="w-full text-left text-xs">
                          <thead>
                            <tr className="border-b border-border/50">
                              <th className="py-1.5 pr-3 font-medium text-foreground-secondary">Type</th>
                              <th className="py-1.5 pr-3 font-medium text-foreground-secondary">Description</th>
                              <th className="py-1.5 font-medium text-foreground-secondary">Time</th>
                            </tr>
                          </thead>
                          <tbody>
                            {events.map((evt) => (
                              <tr key={evt.id} className="border-b border-border/30">
                                <td className="py-1.5 pr-3">
                                  <EventTypeBadge type={evt.eventType} />
                                </td>
                                <td className="py-1.5 pr-3 text-foreground-secondary">
                                  {evt.description ?? '—'}
                                </td>
                                <td className="py-1.5 whitespace-nowrap text-foreground-secondary">
                                  {formatDate(evt.occurredAt)}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
}
