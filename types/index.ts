export const QUIZ_STATUS = {
  PUBLISHED: 'PUBLISHED',
  DRAFT: 'DRAFT',
} as const;

export type QuizStatus = (typeof QUIZ_STATUS)[keyof typeof QUIZ_STATUS];

export type Quiz = {
  id: string;
  title: string;
  description: string;
  status: QuizStatus;
  creatorId: string;
};

export type QuizCardProps = {
  id: string;
  title: string;
  description: string;
  status: QuizStatus;
};

export type BadgeProps = {
  variant: QuizStatus;
};

export type FilterOption = {
  key: 'all' | QuizStatus;
  label: string;
};
