export type AttemptStatus = 'IN_PROGRESS' | 'SUBMITTED' | 'TIMED_OUT' | 'ABANDONED';

export type AttemptDto = {
  id: string;
  quizId: string;
  studentId: string;
  startedAt: string;
  submittedAt: string | null;
  status: AttemptStatus;
  score: number | null;
  maxScore: number | null;
  createdAt: string;
  updatedAt: string;
};

export type AttemptAnswerDto = {
  id: string;
  attemptId: string;
  questionId: string;
  selectedOptionId: string | null;
  isCorrect: boolean | null;
  answeredAt: string;
};

export type AttemptResultSummary = {
  percentage: number;
  passed: boolean;
  gradedAt: string;
};

export type AttemptWithAnswersDto = AttemptDto & {
  answers: AttemptAnswerDto[];
  result: AttemptResultSummary | null;
};

export type ActiveAttemptResponse = {
  attempt: {
    attemptId: string;
    quizId: string;
    startedAt: string;
    expiresAt: string | null;
  } | null;
};

export type AttemptQuestionsResponse = {
  attemptId: string;
  quizId: string;
  expiresAt: string;
  remainingSeconds: number;
  questions: Array<{
    id: string;
    type: 'MCQ' | 'TRUE_FALSE';
    text: string;
    options: string[];
    order: number;
  }>;
};

export type SaveAnswersRequest = {
  answers: Array<{
    questionId: string;
    selectedOptionId: string | null;
  }>;
};

export type SubmitAttemptRequest = {
  answers?: Array<{
    questionId: string;
    selectedOptionId: string | null;
  }>;
};
