import { Quiz } from '@/types';
import QuizCard from './QuizCard';

function QuizList() {
  const quizzes: Quiz[] = [
    {
      id: '1',
      title: 'JavaScript Fundamentals',
      description: 'Test your JavaScript knowledge.',
      status: 'PUBLISHED',
      creatorId: 'user_1',
    },
    {
      id: '2',
      title: 'React Essentials',
      description: 'Questions about React and hooks.',
      status: 'DRAFT',
      creatorId: 'user_1',
    },
    {
      id: '3',
      title: 'Next.js App Router',
      description: 'Quiz on modern Next.js features.',
      status: 'PUBLISHED',
      creatorId: 'user_2',
    },
    {
      id: '4',
      title: 'TypeScript Basics',
      description: 'Types, interfaces, and generics.',
      status: 'DRAFT',
      creatorId: 'user_3',
    },
    {
      id: '5',
      title: 'Frontend Trivia',
      description: 'Mixed frontend development questions.',
      status: 'PUBLISHED',
      creatorId: 'user_2',
    },
    {
      id: '6',
      title: 'Frontend Trivia',
      description: 'Mixed frontend development questions.',
      status: 'PUBLISHED',
      creatorId: 'user_2',
    },
  ];

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(min(310px,100%),1fr))] max-w-300 gap-6 w-full">
      {quizzes.map((quiz) => (
        <QuizCard
          key={quiz.id}
          id={quiz.id}
          title={quiz.title}
          description={quiz.description}
          status={quiz.status}
        />
      ))}
    </div>
  );
}

export default QuizList;
