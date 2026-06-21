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
  statusBreakdown: {
    notStarted: number;
    inProgress: number;
    submitted: number;
  };
  attempts: QuizAttempt[];
  studentScores: {
    studentId: string;
    studentName: string;
    status: 'NOT_STARTED' | 'IN_PROGRESS' | 'SUBMITTED';
    score: number | null;
    attemptId: string | null;
    startedAt: string | null;
    submittedAt: string | null;
  }[];
}
