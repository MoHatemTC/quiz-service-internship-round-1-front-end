export type QuizStatus = 'open' | 'in_progress' | 'upcoming' | 'closed';

export type QuizDifficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export type Quiz = {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: QuizDifficulty;
  durationMinutes: number;
  questionCount: number;
  progress: number;
  windowStart: string;
  windowEnd: string;
  status: QuizStatus;
  questions: import('@/types/question/question').Question[];
};
