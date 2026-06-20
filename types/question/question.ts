export type QuestionType = 'MCQ' | 'TRUE_FALSE';

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

// Backend question DTO (from /api/questions endpoint)
export type QuestionDto = {
  id: string;
  quizId: string;
  type: QuestionType;
  text: string;
  options: string[];
  correctAnswer: string;
};
