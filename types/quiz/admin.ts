// Admin-facing DTOs for quiz management (to be implemented)

export type AdminQuizDto = {
  id: string;
  title: string;
  description: string | null;
  durationMinutes: number | null;
  passingScore: number | null;
  startsAt: string | null;
  endsAt: string | null;
  questionCount: number;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  studentCount: number;
};

export type CreateQuizDto = {
  title: string;
  description?: string;
  durationMinutes?: number;
  passingScore?: number;
  startsAt?: string;
  endsAt?: string;
};

export type UpdateQuizDto = Partial<CreateQuizDto>;
