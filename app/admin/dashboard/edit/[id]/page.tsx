import Link from 'next/link';
import QuizEditGeneralInfo from '@/components/dashboard/QuizEditGeneralInfo';
import { QUIZZES } from '@/components/dashboard/DashboardQuizTable';

type EditQuizPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditPage({ params }: EditQuizPageProps) {
  const { id } = await params;
  const quiz = QUIZZES.find((q) => q.id === id);
  if (!quiz) return null;
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 py-8 lg:px-10">
        <nav aria-label="Breadcrumb" className="text-small text-foreground-secondary">
          <ol className="flex items-center gap-2">
            <li>
              <Link href="/admin/dashboard" className="transition-colors hover:text-primary-700">
                Quizzes
              </Link>
            </li>
            <li aria-hidden="true" className="text-muted-foreground">
              &gt;
            </li>
            <li className="font-medium text-primary-800">Edit Quiz</li>
          </ol>
        </nav>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-2">
            {/* <h1 className="text-h1 text-primary-800">{quiz.title}</h1> */}
            <p className="text-body text-foreground-secondary">
              Last edited by {'placeholder'} - {'placeholder'}
            </p>
          </div>

          <div
            className={`inline-flex items-center gap-2 self-start rounded-full  px-3 py-1 text-small font-medium ${quiz.status === 'DRAFT' ? 'bg-warning/10' : 'bg-success/10'}`}
          >
            <span
              className={`h-2 w-2 rounded-full ${quiz.status === 'DRAFT' ? 'bg-warning' : 'bg-success'}`}
              aria-hidden="true"
            />
            <p className={`${quiz.status === 'DRAFT' ? 'text-warning' : 'text-success'}`}>
              {quiz.status === 'PUBLISHED' ? 'Published' : 'Draft'}
            </p>
          </div>
        </div>

        <QuizEditGeneralInfo
          title={quiz.title}
          description={quiz.description}
          startDate={quiz.startDate}
          endDate={quiz.endDate}
        />

        <p>Edit question later...</p>
      </section>
    </main>
  );
}
