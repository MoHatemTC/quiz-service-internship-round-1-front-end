'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getQuiz } from '@/lib/api/student';
import { isAuthenticated } from '@/lib/auth/session';
import type { QuizInstructionsDto } from '@/types/quiz/student';
import Container from '@/components/shared/Container';

type QuizState =
  | { status: 'loading' }
  | { status: 'checking_auth' }
  | { status: 'ready'; quiz: QuizInstructionsDto }
  | { status: 'error'; error: 'not_found' | 'forbidden' | 'network' | 'blocked'; message: string }
  | { status: 'resume'; quiz: QuizInstructionsDto; attemptId: string };

export default function QuizLinkPage() {
  const params = useParams();
  const router = useRouter();
  const quizId = params.quizId as string;
  const [state, setState] = useState<QuizState>({ status: 'checking_auth' });

  useEffect(() => {
    if (!isAuthenticated()) {
      router.replace(`/login?redirect=/quiz/${quizId}`);
      return;
    }

    async function fetchQuiz() {
      try {
        const quiz = await getQuiz(quizId);

        if (quiz.attemptStatus === 'IN_PROGRESS' && quiz.attemptId) {
          setState({ status: 'resume', quiz, attemptId: quiz.attemptId });
        } else if (quiz.canStart) {
          setState({ status: 'ready', quiz });
        } else {
          setState({
            status: 'error',
            error: 'blocked',
            message: quiz.reasonIfBlocked || 'This quiz is not available.',
          });
        }
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : '';
        if (msg.includes('404') || msg.includes('Not Found')) {
          setState({ status: 'error', error: 'not_found', message: 'Quiz not found or not available.' });
        } else if (msg.includes('403') || msg.includes('Forbidden')) {
          setState({ status: 'error', error: 'forbidden', message: 'Access denied.' });
        } else {
          setState({ status: 'error', error: 'network', message: 'Failed to load quiz. Please try again.' });
        }
      }
    }

    fetchQuiz();
  }, [quizId, router]);

  const handleStart = () => {
    if (state.status !== 'ready') return;
    router.push(`/student/quiz/${state.quiz.id}/solve`);
  };

  const handleResume = () => {
    if (state.status !== 'resume') return;
    router.push(`/student/quiz/${state.quiz.id}/solve?attemptId=${state.attemptId}`);
  };

  const handleRetry = () => {
    setState({ status: 'loading' });
    window.location.reload();
  };

  if (state.status === 'checking_auth' || state.status === 'loading') {
    return (
      <Container size="quiz">
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent-500 border-t-transparent" />
            <p className="text-small text-foreground-secondary">
              {state.status === 'checking_auth' ? 'Checking authentication...' : 'Loading quiz...'}
            </p>
          </div>
        </div>
      </Container>
    );
  }

  if (state.status === 'error') {
    const icons: Record<string, string> = {
      not_found: '',
      forbidden: '🔒',
      blocked: '⏸️',
      network: '📡',
    };
    return (
      <Container size="quiz">
        <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
          <span className="text-5xl" aria-hidden>{icons[state.error] || '⚠️'}</span>
          <h1 className="text-h2 text-foreground">
            {state.error === 'not_found' && 'Quiz not found'}
            {state.error === 'forbidden' && 'Access denied'}
            {state.error === 'blocked' && 'Quiz unavailable'}
            {state.error === 'network' && 'Connection error'}
          </h1>
          <p className="max-w-md text-body text-foreground-secondary">{state.message}</p>
          {state.error === 'network' && (
            <button
              onClick={handleRetry}
              className="mt-2 rounded-full bg-accent-500 px-6 py-2.5 text-body font-semibold text-inverse hover:bg-accent-600"
            >
              Try again
            </button>
          )}
          <a
            href="/student"
            className="mt-2 text-small font-medium text-accent-600 hover:text-accent-700"
          >
            ← Back to dashboard
          </a>
        </div>
      </Container>
    );
  }

  const quiz = state.quiz;

  return (
    <Container size="quiz">
      <div className="flex flex-col gap-6 py-8">
        <a
          href="/student"
          className="inline-flex items-center text-small font-medium text-foreground-secondary hover:text-foreground"
        >
          ← Back to dashboard
        </a>

        <article className="flex flex-col gap-6 rounded-[20px] border border-border bg-card p-8">
          <header className="flex flex-col gap-3">
            <span className="inline-flex w-fit items-center rounded-full bg-accent-50 px-3 py-1 text-caption font-semibold text-accent-700">
              {state.status === 'resume' ? 'In progress' : 'Ready to start'}
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
            {state.status === 'resume' ? (
              <>
                <p className="text-small text-foreground-secondary">
                  You have an in-progress attempt on this quiz. Continue where you left off.
                </p>
                <button
                  onClick={handleResume}
                  className="inline-flex items-center justify-center rounded-full bg-accent-500 px-6 py-3 text-body font-semibold text-inverse transition-colors hover:bg-accent-600"
                >
                  Resume quiz
                </button>
              </>
            ) : (
              <>
                <p className="text-small text-foreground-secondary">
                  Ready to begin? Click below to start the quiz. The timer will start immediately.
                </p>
                <button
                  onClick={handleStart}
                  className="inline-flex items-center justify-center rounded-full bg-accent-500 px-6 py-3 text-body font-semibold text-inverse transition-colors hover:bg-accent-600 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Start quiz
                </button>
              </>
            )}
          </div>
        </article>
      </div>
    </Container>
  );
}
