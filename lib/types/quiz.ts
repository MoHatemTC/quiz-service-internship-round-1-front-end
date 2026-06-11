export type QuizStatus = 'open' | 'in_progress' | 'upcoming' | 'closed';

export type QuestionType = 'mcq' | 'true_false';

export type QuestionOption = {
  id: string;
  text: string;
};

export type Question = {
  id: string;
  prompt: string;
  type: QuestionType;
  options: QuestionOption[];
};

export type Quiz = {
  id: string;
  title: string;
  description: string;
  durationMinutes: number;
  questionCount: number;
  windowStart: string;
  windowEnd: string;
  status: QuizStatus;
  questions: Question[];
};
