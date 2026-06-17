import Link from 'next/link';
import type { Quiz } from '@/types/quiz/quiz';
import CardHero from '@/components/student/CardHero';

type ContinueLearningProps = {
  quiz: Quiz;
};

export default function ContinueLearning({ quiz }: ContinueLearningProps) {
  return (
    <section
      aria-labelledby="continue-learning-heading"
      className="flex flex-col gap-3"
    >
      <div className="flex items-center justify-between">
        <h2
          id="continue-learning-heading"
          className="text-h2 text-foreground"
        >
          Continue learning
        </h2>
        <Link
          href="/student/quiz-list"
          className="text-small font-medium text-accent-600 transition-colors duration-150 ease-out hover:text-accent-700"
        >
          Browse all →
        </Link>
      </div>
      <Link
        href={`/student/quiz/${quiz.id}`}
        className="group flex flex-col overflow-hidden rounded-[20px] border border-border bg-card transition-all duration-150 ease-out hover:-translate-y-0.5 hover:border-accent-200 hover:shadow-[0_8px_24px_rgba(15,23,42,0.08)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500 sm:flex-row"
      >
        <div className="sm:w-72 sm:shrink-0">
          <CardHero category={quiz.category} difficulty={quiz.difficulty} />
        </div>
        <div className="flex flex-1 flex-col gap-3 p-5">
          <div className="flex flex-col gap-1">
            <span className="text-caption uppercase tracking-wide text-muted">
              In progress
            </span>
            <h3 className="text-h3 text-foreground">{quiz.title}</h3>
            <p className="line-clamp-2 text-small text-foreground-secondary">
              {quiz.description}
            </p>
          </div>
          <div className="mt-auto flex flex-col gap-1.5">
            <div
              role="progressbar"
              aria-valuenow={quiz.progress}
              aria-valuemin={0}
              aria-valuemax={100}
              className="h-1.5 w-full overflow-hidden rounded-full bg-border"
            >
              <div
                className="h-full rounded-full bg-gradient-to-r from-accent-500 to-primary-800 transition-all duration-250 ease-out"
                style={{ width: `${quiz.progress}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-caption text-muted">
              <span>
                <span className="text-foreground-secondary">
                  {quiz.progress}% complete
                </span>
              </span>
              <span>
                {quiz.questionCount} questions · {quiz.durationMinutes} min
              </span>
            </div>
          </div>
        </div>
      </Link>
    </section>
  );
}
