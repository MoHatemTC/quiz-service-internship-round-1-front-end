import type { QuizStatus } from '@/lib/types/quiz';

type QuizStatusBadgeProps = {
  status: QuizStatus;
};

const statusConfig: Record<QuizStatus, { label: string; className: string }> = {
  open: {
    label: 'Open',
    className: 'bg-primary-600 text-white',
  },
  in_progress: {
    label: 'In progress',
    className: 'bg-info text-white',
  },
  upcoming: {
    label: 'Upcoming',
    className: 'bg-warning text-foreground',
  },
  closed: {
    label: 'Closed',
    className: 'bg-muted text-foreground-secondary',
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
