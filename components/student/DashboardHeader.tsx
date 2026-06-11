import Link from 'next/link';

type DashboardHeaderProps = {
  showEmpty: boolean;
};

export default function DashboardHeader({ showEmpty }: DashboardHeaderProps) {
  const toggleHref = showEmpty ? '/student' : '/student?empty=1';
  const toggleLabel = showEmpty ? 'Show quizzes' : 'Show empty state';

  return (
    <header className="flex items-center justify-between border-b border-border bg-background py-6">
      <div>
        <p className="text-caption uppercase tracking-wide text-muted">Student</p>
        <h1 className="text-h1 text-foreground">Hi, Student</h1>
      </div>
      <Link
        href={toggleHref}
        className="inline-flex items-center rounded-xl border border-border bg-surface px-4 py-2 text-small font-semibold text-foreground transition-colors duration-150 ease-out hover:bg-card"
      >
        {toggleLabel}
      </Link>
    </header>
  );
}
