import { z } from 'zod';

export const updateTaskSchema = z.object({
  dueDate: z.coerce.date().optional(),
  description: z
    .string()
    .min(3, 'Description must be at least 3 characters long')
    .optional(),
  status: z
    .enum(['pending', 'in_progress', 'completed', 'cancelled'])
    .default('pending')
    .optional(),
});

export type UpdateTaskDto = z.infer<typeof updateTaskSchema>;
