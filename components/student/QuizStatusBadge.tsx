import type { QuizStatus } from '@/types/quiz/quiz';

type QuizStatusBadgeProps = {
  status: QuizStatus;
};

const statusConfig: Record<QuizStatus, { label: string; className: string }> = {
  open: {
    label: 'Open',
    className: 'bg-success/10 text-success',
  },
  in_progress: {
    label: 'In progress',
    className: 'bg-info/10 text-info',
  },
  upcoming: {
    label: 'Upcoming',
    className: 'bg-warning/10 text-warning',
  },
  closed: {
    label: 'Closed',
    className: 'bg-muted/15 text-foreground-secondary',
  },
};

export default function QuizStatusBadge({ status }: QuizStatusBadgeProps) {
  const config = statusConfig[status];
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-caption font-semibold ${config.className}`}
    >
      {config.label}
    </span>
  );
}
