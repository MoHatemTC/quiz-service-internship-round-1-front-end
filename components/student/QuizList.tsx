import Link from 'next/link';
import type { Quiz } from '@/types/quiz/quiz';
import QuizCard from '@/components/student/QuizCard';

type QuizListProps = {
  quizzes: Quiz[];
};

export default function QuizList({ quizzes }: QuizListProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {quizzes.map((quiz) => (
        <Link
          key={quiz.id}
          href={`/student/quiz/${quiz.id}`}
          className="block rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
        >
          <QuizCard quiz={quiz} />
        </Link>
      ))}
    </div>
  );
}
