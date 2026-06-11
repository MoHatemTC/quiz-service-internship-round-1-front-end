export type Quiz = {
  id: string;
  title: string;
  description: string;
  status: 'PUBLISHED' | 'DRAFT';
  creatorId: string;
};

export type QuizCardProps = {
  id: string;
  title: string;
  description: string;
  status: 'PUBLISHED' | 'DRAFT';
};

export type BadgeProps = {
  variant: 'PUBLISHED' | 'DRAFT';
};
