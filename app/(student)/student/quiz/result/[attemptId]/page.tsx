'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getAttemptResult } from '@/lib/api/attempts';
import type { AttemptWithAnswersDto } from '@/types/attempt/attempt';
import Container from '@/components/shared/Container';

export default function ResultPage() {
  const params = useParams();
  const attemptId = params.attemptId as string;
  const [result, setResult] = useState<AttemptWithAnswersDto | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchResult() {
      try {
        const data = await getAttemptResult(attemptId);
        setResult(data);
      } catch (err) {
        console.error('Failed to fetch result:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchResult();
  }, [attemptId]);

  if (loading) {
    return (
      <Container size="quiz">
        <div className="py-16 text-center text-foreground-secondary">Loading result...</div>
      </Container>
    );
  }

  if (!result) {
    return (
      <Container size="quiz">
        <div className="py-16 text-center">
          <h1 className="text-h1 text-foreground">Result not found</h1>
          <Link href="/student/quiz-list" className="mt-4 inline-block text-accent-600 hover:text-accent-700">
            ← Back to quiz list
          </Link>
        </div>
      </Container>
    );
  }

  const scorePercent = result.score !== null && result.maxScore !== null
    ? Math.round((result.score / result.maxScore) * 100)
    : null;

  return (
    <Container size="quiz">
      <div className="flex flex-col items-center gap-6 py-16 text-center">
        <span className="rounded-full bg-accent-50 px-4 py-1.5 text-caption font-semibold text-accent-700">
          Result
        </span>

        <h1 className="text-h1 text-foreground">Quiz Complete</h1>

        {scorePercent !== null ? (
          <div className="flex flex-col items-center gap-2">
            <p className="text-display text-foreground">{scorePercent}%</p>
            <p className="text-body text-foreground-secondary">
              {result.score} / {result.maxScore} points
            </p>
          </div>
        ) : (
          <p className="text-body text-foreground-secondary">
            Score will be available once grading is complete.
          </p>
        )}

        <div className="w-full rounded-[20px] border border-border bg-card p-6">
          <h2 className="mb-4 text-h3 text-foreground">Answers Summary</h2>
          <div className="space-y-3">
            {result.answers.map((answer, idx) => (
              <div
                key={answer.id}
                className="flex items-center justify-between rounded-xl border border-border bg-surface px-4 py-3"
              >
                <span className="text-small text-foreground">Question {idx + 1}</span>
                <span className="text-small text-foreground-secondary">
                  {answer.selectedOptionId || 'Skipped'}
                </span>
                {answer.isCorrect !== null && (
                  <span
                    className={`text-caption font-semibold ${
                      answer.isCorrect ? 'text-success' : 'text-error'
                    }`}
                  >
                    {answer.isCorrect ? '✓ Correct' : '✗ Incorrect'}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

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
