'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md text-center">
        <div className="mb-8 inline-flex h-20 w-20 items-center justify-center rounded-full bg-linear-to-br from-primary-500 to-primary-700">
          <svg
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-inverse"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>

        <h1 className="text-h1 text-foreground">Something went wrong</h1>
        <p className="mt-3 text-body text-foreground-secondary">
          An unexpected error occurred. Our team has been notified — please try again or go back to
          the dashboard.
        </p>

        {error.digest && (
          <p className="mt-2 text-caption text-muted-foreground">
            Error ID: <span>{error.digest}</span>
          </p>
        )}

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={reset}
            className="inline-flex w-full items-center justify-center rounded-full bg-accent-500 px-6 py-3 text-body font-semibold text-inverse transition-colors duration-150 ease-out hover:bg-accent-600 focus:outline-2 focus:outline-offset-2 focus:outline-accent-500 sm:w-auto"
          >
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex w-full items-center justify-center rounded-full border border-border bg-surface px-6 py-3 text-body font-semibold text-foreground transition-colors duration-150 ease-out hover:border-accent-200 hover:bg-accent-50 focus:outline-2 focus:outline-offset-2 focus:outline-accent-500 sm:w-auto"
          >
            Go to home
          </Link>
        </div>

        <div className="mt-12 rounded-large border border-border bg-surface p-5 text-left">
          <p className="text-caption font-semibold uppercase tracking-wide text-muted-foreground">
            PitIQ
          </p>
          <p className="mt-1 text-small text-foreground-secondary">Pause. Assess. Advance.</p>
        </div>
      </div>
    </div>
  );
}
