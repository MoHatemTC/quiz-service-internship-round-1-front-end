export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-[20px] border border-dashed border-border bg-surface px-6 py-16 text-center">
      <div
        className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-accent-50 text-2xl"
        aria-hidden
      >
        📋
      </div>
      <h3 className="text-h3 text-foreground">No quizzes available yet</h3>
      <p className="max-w-sm text-small text-foreground-secondary">
        Check back later or contact your admin if you believe this is a mistake.
      </p>
    </div>
  );
}
