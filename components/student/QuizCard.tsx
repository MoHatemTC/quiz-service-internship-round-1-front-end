import Link from 'next/link';
import type { Quiz } from '@/types/quiz/quiz';
import CardHero from '@/components/student/CardHero';

type QuizCardProps = {
  quiz: Quiz;
};

export default function QuizCard({ quiz }: QuizCardProps) {
  return (
    <Link
      href={`/student/quiz/${quiz.id}`}
      className="group flex h-full flex-col overflow-hidden rounded-[20px] border border-border bg-card transition-all duration-150 ease-out hover:-translate-y-0.5 hover:border-accent-200 hover:shadow-[0_8px_24px_rgba(15,23,42,0.08)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500"
    >
      <CardHero category={quiz.category} difficulty={quiz.difficulty} />
      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="line-clamp-2 text-h3 text-foreground">{quiz.title}</h3>
        <div className="flex items-center gap-3 text-caption text-muted">
          <span className="inline-flex items-center gap-1.5">
            <span aria-hidden>📚</span>
            {quiz.questionCount} lessons
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span aria-hidden>⏱</span>
            {quiz.durationMinutes} min
          </span>
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
          <span className="text-caption text-muted">
            <span className="text-foreground-secondary">
              {quiz.progress}% complete
            </span>
          </span>
        </div>
      </div>
    </Link>
  );
}
