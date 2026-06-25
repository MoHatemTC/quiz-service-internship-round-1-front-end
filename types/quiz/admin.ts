export const QUIZ_STATUS = {
  PUBLISHED: 'PUBLISHED',
  DRAFT: 'DRAFT',
  CLOSED: 'CLOSED',
  ARCHIEVED: 'ARCHIEVED',
} as const;

export type QuizStatus = (typeof QUIZ_STATUS)[keyof typeof QUIZ_STATUS];

export type QuizData = {
  id: string;
  title: string;
  description: string;
  status: 'DRAFT' | 'PUBLISHED';
  durationMinutes: number;
  passingScore: number;
  startsAt: string;
  endsAt: string;
  createdById: string;
  createdAt: string;
  updatedAt: string;
};

export type QuizFilterOptions = {
  key: 'all' | QuizStatus;
  label: string;
};
