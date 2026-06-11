import type { Quiz } from '@/lib/types/quiz';

type QuizCardProps = {
  quiz: Quiz;
};

const formatDateRange = (start: string, end: string) => {
  const opts: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
  const s = new Date(start).toLocaleDateString('en-US', opts);
  const e = new Date(end).toLocaleDateString('en-US', opts);
  return `${s} – ${e}`;
};

export default function QuizCard({ quiz }: QuizCardProps) {
  return (
    <article className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 shadow-soft transition-transform duration-150 ease-out hover:-translate-y-0.5">
      <div className="flex flex-col gap-2">
        <h3 className="text-h3 text-foreground">{quiz.title}</h3>
        <p className="line-clamp-2 text-small text-foreground-secondary">
          {quiz.description}
        </p>
      </div>
      <div className="flex items-center gap-4 text-caption text-muted">
        <span className="inline-flex items-center gap-1.5">
          <span aria-hidden>⏱</span>
          {quiz.durationMinutes} min
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span aria-hidden>📅</span>
          {formatDateRange(quiz.windowStart, quiz.windowEnd)}
        </span>
      </div>
    </article>
  );
}
