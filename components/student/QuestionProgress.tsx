type QuestionProgressProps = {
  current: number;
  total: number;
  answeredCount: number;
};

export default function QuestionProgress({
  current,
  total,
  answeredCount,
}: QuestionProgressProps) {
  const percent = Math.round((current / total) * 100);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between text-caption text-muted">
        <span>
          Question <span className="text-foreground">{current + 1}</span> of{' '}
          {total}
        </span>
        <span>
          Answered:{' '}
          <span className="text-foreground">{answeredCount}</span> / {total}
        </span>
      </div>
      <div
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        className="h-2 w-full overflow-hidden rounded-full bg-border"
      >
        <div
          className="h-full rounded-full bg-gradient-to-r from-accent-500 to-primary-800 transition-all duration-250 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
