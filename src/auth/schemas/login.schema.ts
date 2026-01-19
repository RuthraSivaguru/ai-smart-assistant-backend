import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

export type LoginDto = z.infer<typeof LoginSchema>;
