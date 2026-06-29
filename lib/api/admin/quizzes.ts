import { apiFetch } from '@/lib/api/client';
import { QuizData } from '@/types/quiz/admin';
import { CreateQuizFormValues } from '@/lib/validation';

export async function getAdminQuizzes(params?: {
  search?: string;
  status?: string;
}): Promise<QuizData[]> {
  const query = new URLSearchParams();
  if (params?.search) query.set('search', params.search);
  if (params?.status) query.set('status', params.status);
  const qs = query.toString();
  return apiFetch<QuizData[]>(`/api/admin/quizzes${qs ? `?${qs}` : ''}`, {
    requireAuth: false,
  });
}

export async function getAdminQuizById(id: string): Promise<QuizData> {
  return apiFetch<QuizData>(`/api/admin/quizzes/${id}`, { requireAuth: false });
}

export async function deleteAdminQuiz(id: string): Promise<{ deleted: boolean; id: string }> {
  return apiFetch<{ deleted: boolean; id: string }>(`/api/admin/quizzes/${id}`, {
    method: 'DELETE',
    requireAuth: false,
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
      startsAt: values.startDate,
      endsAt: values.endDate,
    }),
    requireAuth: false,
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
      startsAt: values.startDate,
      endsAt: values.endDate,
      createdById: 'cmqmalcro0000zgud0fnpw5go',
    }),
    requireAuth: false,
  });
}
