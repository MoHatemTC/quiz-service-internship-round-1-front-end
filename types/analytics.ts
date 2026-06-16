export interface DashboardSummary {
  totalQuizzes: number;
  totalStudents: number;
  totalAttempts: number;
  averageScore: number;
}

export interface QuizAttempt {
  attemptId: number;
  studentName: string;
  score: number;
  submittedAt: string;
}

export interface QuizAttemptsResponse {
  quizId: number;
  quizTitle: string;
  attemptCount: number;
  attempts: QuizAttempt[];
}
