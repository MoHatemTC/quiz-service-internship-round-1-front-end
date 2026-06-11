import Link from 'next/link';
import Container from '@/components/shared/Container';

type PageProps = {
  params: Promise<{ attemptId: string }>;
};

export default async function ResultStubPage({ params }: PageProps) {
  const { attemptId } = await params;

  return (
    <Container size="quiz">
      <div className="flex flex-col items-center gap-4 py-16 text-center">
        <span className="rounded-full bg-surface px-3 py-1 text-caption font-semibold text-foreground-secondary">
          Result
        </span>
        <h1 className="text-h1 text-foreground">Quiz attempt: {attemptId}</h1>
        <p className="max-w-md text-body text-foreground-secondary">
          Submission and scoring will be implemented in Sprint 2. For now this is
          a stub so the navigation flow is testable.
        </p>
        <Link
          href="/student"
          className="mt-2 inline-flex items-center justify-center rounded-xl border border-border bg-surface px-6 py-3 text-body font-semibold text-foreground transition-colors duration-150 ease-out hover:bg-card focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
        >
          Back to dashboard
        </Link>
      </div>
    </Container>
  );
}
