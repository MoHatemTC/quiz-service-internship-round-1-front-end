import Link from 'next/link';
import QuizEditGeneralInfo from '@/components/dashboard/QuizEditGeneralInfo';

type EditQuizPageProps = {
  params: Promise<{ id: string }>;
};

type MockQuizData = {
  id: string;
  title: string;
  description: string;
  status: 'PUBLISHED' | 'DRAFT';
  updatedBy: string;
  updatedAt: string;
  startDate: string;
  endDate: string;
};

const MOCK_QUIZ_DATA: MockQuizData = {
  id: 'advanced-thermodynamics-ii',
  title: 'Advanced Thermodynamics II',
  description:
    'An in-depth assessment focusing on the second law of thermodynamics, entropy cycles, and real-world engine efficiency calculations for senior engineering students.',
  status: 'PUBLISHED',
  updatedBy: 'Alex Rivera',
  updatedAt: '2 hours ago',
  startDate: '09/01/2026',
  endDate: '09/30/2026',
};

export default async function EditPage({ params }: EditQuizPageProps) {
  const { id } = await params;
  const quiz = id === MOCK_QUIZ_DATA.id ? MOCK_QUIZ_DATA : { ...MOCK_QUIZ_DATA, id };

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
            <li aria-hidden="true" className="text-muted">
              &gt;
            </li>
            <li className="font-medium text-primary-800">Edit Quiz</li>
          </ol>
        </nav>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-2">
            <h1 className="text-h1 text-primary-800">{quiz.title}</h1>
            <p className="text-body text-foreground-secondary">
              Last edited by {quiz.updatedBy} - {quiz.updatedAt}
            </p>
          </div>

          <div className="inline-flex items-center gap-2 self-start rounded-full bg-success/10 px-3 py-1 text-small font-medium text-success">
            <span className="h-2 w-2 rounded-full bg-success" aria-hidden="true" />
            {quiz.status === 'PUBLISHED' ? 'Published' : 'Draft'}
          </div>
        </div>

        <QuizEditGeneralInfo
          title={quiz.title}
          description={quiz.description}
          startDate={quiz.startDate}
          endDate={quiz.endDate}
        />
      </section>
    </main>
  );
}
