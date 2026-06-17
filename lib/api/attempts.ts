import { apiFetch } from '@/lib/api/client';
import type {
  AttemptWithAnswersDto,
  SaveAnswersRequest,
  SubmitAttemptRequest,
} from '@/types/attempt/attempt';

export async function startAttempt(quizId: string): Promise<AttemptWithAnswersDto> {
  return apiFetch<AttemptWithAnswersDto>('/api/attempts', {
    method: 'POST',
    body: JSON.stringify({ quizId }),
  });
}

export async function saveAnswers(
  attemptId: string,
  answers: SaveAnswersRequest['answers'],
): Promise<void> {
  await apiFetch(`/api/attempts/${attemptId}/answers`, {
    method: 'PATCH',
    body: JSON.stringify({ answers }),
  });
}

export async function submitAttempt(
  attemptId: string,
  answers?: SubmitAttemptRequest['answers'],
): Promise<AttemptWithAnswersDto> {
  return apiFetch<AttemptWithAnswersDto>(`/api/attempts/${attemptId}/submit`, {
    method: 'POST',
    body: JSON.stringify({ answers: answers || [] }),
  });
}

export async function getAttemptResult(attemptId: string): Promise<AttemptWithAnswersDto> {
  return apiFetch<AttemptWithAnswersDto>(`/api/attempts/${attemptId}/result`);
}
