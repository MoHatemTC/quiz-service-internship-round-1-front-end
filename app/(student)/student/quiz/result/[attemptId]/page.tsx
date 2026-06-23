'use client';

import Link from 'next/link';
import Container from '@/components/shared/Container';

export default function ResultPage() {
  return (
    <Container size="quiz">
      <div className="flex flex-col items-center gap-6 py-16 text-center">
        <span className="rounded-full bg-accent-50 px-4 py-1.5 text-caption font-semibold text-accent-700">
          Result
        </span>

        <h1 className="text-h1 text-foreground">Quiz submitted</h1>

        <p className="max-w-md text-body text-foreground-secondary">
          Your attempt has been submitted successfully.
        </p>

        <Link
          href="/student/quiz-list"
          className="mt-4 inline-flex items-center justify-center rounded-full border border-border bg-surface px-6 py-3 text-body font-semibold text-foreground transition-colors hover:border-accent-200 hover:bg-accent-50"
        >
          Back to quiz list
        </Link>
      </div>
    </Container>
  );
}
