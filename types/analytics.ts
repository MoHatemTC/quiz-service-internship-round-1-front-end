export interface DashboardSummary {
  totalQuizzes: number;
  totalStudents: number;
  totalAttempts: number;
  averageScore: number;
}

export interface QuizAttempt {
  attemptId: string;
  studentName: string;
  score: number;
  submittedAt: string;
}

export interface QuizAttemptsResponse {
  quizId: string;
  quizTitle: string;
  attemptCount: number;
  completionCount: number;
  averageScore: number;
  attempts: QuizAttempt[];
}
