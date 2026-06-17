import { apiFetch } from '@/lib/api/client';
import type { QuizDto, QuizInstructionsDto } from '@/types/quiz/student';
import type { ActiveAttemptResponse } from '@/types/attempt/attempt';
import type { QuestionDto } from '@/types/question/question';

export type { QuestionDto };

export async function getQuizzes(): Promise<QuizDto[]> {
  const response = await apiFetch<{ items: QuizDto[] }>('/api/student/quizzes');
  return response.items;
}

export async function getQuiz(id: string): Promise<QuizInstructionsDto> {
  return apiFetch<QuizInstructionsDto>(`/api/student/quizzes/${id}`);
}

export async function getActiveAttempt(): Promise<ActiveAttemptResponse> {
  return apiFetch<ActiveAttemptResponse>('/api/student/attempts/active');
}

export async function getQuestions(quizId: string): Promise<QuestionDto[]> {
  return apiFetch<QuestionDto[]>(`/api/questions?quizId=${quizId}`);
}
