import { apiFetch } from '@/lib/api/client';
import { QuestionDto } from '@/types/question/question';

export async function getQuestions(): Promise<QuestionDto[]> {
  return apiFetch<QuestionDto[]>('/api/questions');
}
