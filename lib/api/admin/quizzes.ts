import { apiFetch } from '@/lib/api/client';
import { QuizData, PaginatedQuizData } from '@/types/quiz/admin';
import { CreateQuizFormValues } from '@/lib/validation';

export async function getAdminQuizzes(params?: {
  search?: string;
  status?: string;
  page?: number;
}): Promise<PaginatedQuizData> {
  const query = new URLSearchParams();
  if (params?.search) query.set('search', params.search);
  if (params?.status) query.set('status', params.status);
  if (params?.page) query.set('page', String(params.page));
  const qs = query.toString();
  return apiFetch<PaginatedQuizData>(`/api/admin/quizzes${qs ? `?${qs}` : ''}`);
}

export async function getAdminQuizById(id: string): Promise<QuizData> {
  return apiFetch<QuizData>(`/api/admin/quizzes/${id}`);
}

export async function deleteAdminQuiz(id: string): Promise<{ deleted: boolean; id: string }> {
  return apiFetch<{ deleted: boolean; id: string }>(`/api/admin/quizzes/${id}`, {
    method: 'DELETE',
  });
}

export async function updateAdminQuiz(id: string, values: CreateQuizFormValues): Promise<QuizData> {
  return apiFetch<QuizData>(`/api/admin/quizzes/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({
      title: values.title,
      description: values.description,
      status: values.visibilityStatus,
      durationMinutes: values.durationMinutes,
      passingScore: values.passingScore,
      ...(values.startDate ? { startsAt: values.startDate } : {}),
      ...(values.endDate ? { endsAt: values.endDate } : {}),
    }),
  });
}

export async function createAdminQuiz(values: CreateQuizFormValues): Promise<QuizData> {
  return apiFetch<QuizData>('/api/admin/quizzes', {
    method: 'POST',
    body: JSON.stringify({
      title: values.title,
      description: values.description,
      status: values.visibilityStatus,
      durationMinutes: values.durationMinutes,
      passingScore: values.passingScore,
      ...(values.startDate ? { startsAt: values.startDate } : {}),
      ...(values.endDate ? { endsAt: values.endDate } : {}),
      createdById: 'cmqmalcro0000zgud0fnpw5go', // to be changed
    }),
  });
}
