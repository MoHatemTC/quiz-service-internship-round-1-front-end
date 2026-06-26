'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getQuiz } from '@/lib/api/student';
import type { QuizInstructionsDto } from '@/types/quiz/student';
import Breadcrumb from '@/components/shared/Breadcrumb';
import Container from '@/components/shared/Container';

export default function QuizInstructionsPage() {
  const params = useParams();
  const quizId = params.quizId as string;
  const [quiz, setQuiz] = useState<QuizInstructionsDto | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchQuiz() {
      try {
        const data = await getQuiz(quizId);
        setQuiz(data);
      } catch (err) {
        console.error('Failed to fetch quiz:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchQuiz();
  }, [quizId]);

  if (loading) {
    return (
      <Container size="quiz">
        <div className="py-16 text-center text-foreground-secondary">Loading quiz...</div>
      </Container>
    );
  }

  if (!quiz) {
    return (
      <Container size="quiz">
        <div className="py-16 text-center">
          <h1 className="text-h1 text-foreground">Quiz not found</h1>
          <Link href="/student/quiz-list" className="mt-4 inline-block text-accent-600 hover:text-accent-700">
            ← Back to quiz list
          </Link>
        </div>
      </Container>
    );
  }

  return (
    <Container size="quiz">
      <div className="flex flex-col gap-6 py-8">
        <Breadcrumb
          items={[
            { label: 'PitIQ', href: '/student' },
            { label: 'Quiz List', href: '/student/quiz-list' },
            { label: quiz.title },
          ]}
        />

        <article className="flex flex-col gap-6 rounded-[20px] border border-border bg-card p-8">
          <header className="flex flex-col gap-3">
            <span className="inline-flex w-fit items-center rounded-full bg-accent-50 px-3 py-1 text-caption font-semibold text-accent-700">
              {quiz.canStart ? 'Ready to start' : 'Not available'}
            </span>
            <h1 className="text-h1 text-foreground">{quiz.title}</h1>
            <p className="text-body text-foreground-secondary">{quiz.description}</p>
          </header>

          <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col gap-1 rounded-xl border border-border bg-surface p-4">
              <dt className="text-caption uppercase tracking-wide text-muted">Duration</dt>
              <dd className="text-h3 text-foreground">{quiz.durationMinutes} min</dd>
            </div>
            <div className="flex flex-col gap-1 rounded-xl border border-border bg-surface p-4">
              <dt className="text-caption uppercase tracking-wide text-muted">Questions</dt>
              <dd className="text-h3 text-foreground">{quiz.questionCount}</dd>
            </div>
            <div className="flex flex-col gap-1 rounded-xl border border-border bg-surface p-4">
              <dt className="text-caption uppercase tracking-wide text-muted">Starts</dt>
              <dd className="text-small text-foreground">
                {quiz.startsAt ? new Date(quiz.startsAt).toLocaleDateString() : 'Anytime'}
              </dd>
            </div>
            <div className="flex flex-col gap-1 rounded-xl border border-border bg-surface p-4">
              <dt className="text-caption uppercase tracking-wide text-muted">Ends</dt>
              <dd className="text-small text-foreground">
                {quiz.endsAt ? new Date(quiz.endsAt).toLocaleDateString() : 'No deadline'}
              </dd>
            </div>
          </dl>

          <div className="flex flex-col gap-4 border-t border-divider pt-6">
            {quiz.reasonIfBlocked && (
              <p className="text-small text-error">{quiz.reasonIfBlocked}</p>
            )}
            {quiz.canStart ? (
              <Link
                href={`/student/quiz/${quiz.id}/solve`}
                className="inline-flex items-center justify-center rounded-full bg-accent-500 px-6 py-3 text-body font-semibold text-inverse transition-colors duration-150 ease-out hover:bg-accent-600 focus:outline-2 focus:outline-offset-2 focus:outline-accent-500"
              >
                Start quiz
              </Link>
            ) : (
              <button
                type="button"
                disabled
                className="inline-flex cursor-not-allowed items-center justify-center rounded-full bg-muted/20 px-6 py-3 text-body font-semibold text-foreground-secondary opacity-50"
              >
                Start quiz
              </button>
            )}
          </div>
        </article>
      </div>
    </Container>
  );
}
