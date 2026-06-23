import { apiFetch } from '@/lib/api/client';
import { QuizData } from '@/types/quiz/admin';

export async function getAdminQuizzes(): Promise<QuizData[]> {
  return apiFetch<QuizData[]>('/api/admin/quizzes', { requireAuth: false });
}
