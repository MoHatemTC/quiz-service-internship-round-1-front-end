import Link from 'next/link';
import { notFound } from 'next/navigation';
import Container from '@/components/shared/Container';
import QuizRules from '@/components/student/QuizRules';
import { mockQuizzes } from '@/lib/mocks/data';
import type { QuizStatus } from '@/lib/types/quiz';

type PageProps = {
  params: Promise<{ quizId: string }>;
};

const formatDate = (iso: string) => {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

const statusLabel: Record<QuizStatus, string> = {
  open: 'Open',
  in_progress: 'In progress',
  upcoming: 'Upcoming',
  closed: 'Closed',
};

const statusMessage: Record<QuizStatus, string> = {
  open: 'This quiz is currently open. Once you start, the timer begins.',
  in_progress: 'You have already started this quiz. Continue where you left off.',
  upcoming: 'This quiz is not open yet.',
  closed: 'This quiz window has ended.',
};

export default async function QuizInstructionsPage({ params }: PageProps) {
  const { quizId } = await params;
  const quiz = mockQuizzes.find((q) => q.id === quizId);

  if (!quiz) {
    notFound();
  }

  const canStart = quiz.status === 'open' || quiz.status === 'in_progress';

  return (
    <div className="flex flex-col gap-6 py-8">
      <Container size="quiz">
        <Link
          href="/student"
          className="inline-flex items-center text-small text-foreground-secondary transition-colors hover:text-foreground"
        >
          ← Back to dashboard
        </Link>
      </Container>

      <Container size="quiz">
        <article className="flex flex-col gap-6 rounded-2xl border border-border bg-card p-8 shadow-soft">
          <header className="flex flex-col gap-3">
            <span className="inline-flex w-fit items-center rounded-full bg-surface px-3 py-1 text-caption font-semibold text-foreground-secondary">
              {statusLabel[quiz.status]}
            </span>
            <h1 className="text-h1 text-foreground">{quiz.title}</h1>
            <p className="text-body text-foreground-secondary">
              {quiz.description}
            </p>
          </header>

          <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col gap-1 rounded-xl bg-surface p-4">
              <dt className="text-caption uppercase tracking-wide text-muted">
                Duration
              </dt>
              <dd className="text-h3 text-foreground">
                {quiz.durationMinutes} min
              </dd>
            </div>
            <div className="flex flex-col gap-1 rounded-xl bg-surface p-4">
              <dt className="text-caption uppercase tracking-wide text-muted">
                Questions
              </dt>
              <dd className="text-h3 text-foreground">
                {quiz.questionCount}
              </dd>
            </div>
            <div className="flex flex-col gap-1 rounded-xl bg-surface p-4">
              <dt className="text-caption uppercase tracking-wide text-muted">
                Window
              </dt>
              <dd className="text-small text-foreground">
                {formatDate(quiz.windowStart)}
                <br />
                {formatDate(quiz.windowEnd)}
              </dd>
            </div>
            <div className="flex flex-col gap-1 rounded-xl bg-surface p-4">
              <dt className="text-caption uppercase tracking-wide text-muted">
                Status
              </dt>
              <dd className="text-small text-foreground">
                {statusLabel[quiz.status]}
              </dd>
            </div>
          </dl>

          <QuizRules />

          <div className="flex flex-col gap-4 border-t border-border pt-6">
            <p className="text-small text-foreground-secondary">
              {statusMessage[quiz.status]}
            </p>
            {canStart ? (
              <Link
                href={`/student/quiz/${quiz.id}/solve`}
                className="inline-flex items-center justify-center rounded-xl bg-primary-600 px-6 py-3 text-body font-semibold text-white transition-colors duration-150 ease-out hover:bg-primary-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
              >
                Start quiz
              </Link>
            ) : (
              <button
                type="button"
                disabled
                className="inline-flex cursor-not-allowed items-center justify-center rounded-xl bg-muted px-6 py-3 text-body font-semibold text-foreground-secondary opacity-50"
              >
                Start quiz
              </button>
            )}
          </div>
        </article>
      </Container>
    </div>
  );
}
