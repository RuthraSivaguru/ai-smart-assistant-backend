import { z } from 'zod';

export const createTaskSchema = z.object({
  id: z.uuid(),
  title: z.string().min(3, 'Title must be at least 3 characters long'),
  dueDate: z.date(),
  description: z
    .string()
    .min(3, 'Description must be at least 3 characters long')
    .optional(),
  status: z.enum(['pending', 'in_progress', 'completed']).default('pending'),
});

export type CreateTaskDto = z.infer<typeof createTaskSchema>;
