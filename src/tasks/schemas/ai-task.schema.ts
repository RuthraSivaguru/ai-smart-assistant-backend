import { z } from 'zod';

export const AITaskSchema = z.object({
  title: z.string().min(3),
  dueDate: z.string().optional(), // AI might return invalid dates, so make it optional
  description: z.string().optional(),
  status: z.enum(['pending', 'in_progress', 'completed']).default('pending'),
});

export type AITask = z.infer<typeof AITaskSchema>;
