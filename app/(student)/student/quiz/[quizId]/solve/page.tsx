import { notFound } from 'next/navigation';
import Container from '@/components/shared/Container';
import QuestionSolver from '@/components/student/QuestionSolver';
import { mockQuizzes } from '@/lib/mocks/data';

type PageProps = {
  params: Promise<{ quizId: string }>;
};

export default async function QuizSolvePage({ params }: PageProps) {
  const { quizId } = await params;
  const quiz = mockQuizzes.find((q) => q.id === quizId);

  if (!quiz) {
    notFound();
  }

  if (quiz.status === 'upcoming' || quiz.status === 'closed') {
    notFound();
  }

  return (
    <Container size="quiz">
      <QuestionSolver
        quizId={quiz.id}
        quizTitle={quiz.title}
        questions={quiz.questions}
      />
    </Container>
  );
}
