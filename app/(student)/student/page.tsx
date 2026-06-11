import DashboardHeader from '@/components/student/DashboardHeader';
import QuizList from '@/components/student/QuizList';
import EmptyState from '@/components/student/EmptyState';
import { mockQuizzes } from '@/lib/mocks/data';

type PageProps = {
  searchParams: Promise<{ empty?: string }>;
};

export default async function StudentDashboardPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const showEmpty = params.empty === '1';

  return (
    <div className="flex flex-col gap-8 py-8">
      <DashboardHeader showEmpty={showEmpty} />
      <main>
        {showEmpty ? <EmptyState /> : <QuizList quizzes={mockQuizzes} />}
      </main>
    </div>
  );
}
