import { z } from 'zod';
export type CreateQuizFormInput = z.input<typeof createQuizSchema>;
export type CreateQuizFormValues = z.output<typeof createQuizSchema>;

export const createQuizSchema = z
  .object({
    title: z.string().min(3, 'Quiz title must be at least 3 characters long.'),
    description: z.string().min(10, 'Description must be at least 10 characters long.'),
    visibilityStatus: z.enum(['DRAFT', 'PUBLISHED']),
    durationMinutes: z.coerce
      .number({ error: 'Duration must be a number.' })
      .int('Duration must be a whole number.')
      .positive('Duration must be greater than 0.'),
    passingScore: z.coerce
      .number({ error: 'Passing score must be a number.' })
      .min(0, 'Passing score cannot be less than 0.')
      .max(100, 'Passing score cannot exceed 100.'),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
  })
  .refine(
    (data) =>
      !data.startDate || !data.endDate || new Date(data.endDate) >= new Date(data.startDate),
    {
      message: 'End date must be on or after the start date.',
      path: ['endDate'],
    }
  );
