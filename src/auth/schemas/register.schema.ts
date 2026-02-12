import { z } from 'zod';

export const RegisterSchema = z.object({
  name: z.string().min(1, 'Name must be at least 3 characters long'),
  email: z.email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  address: z
    .string()
    .min(5, 'Address must be at least 5 characters long')
    .optional(),
  phoneNumber: z
    .string()
    .min(10, 'Phone number must be at least 10 characters long')
    .max(10, 'Phone number must be at most 10 characters long')
    .optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export type RegisterDto = z.infer<typeof RegisterSchema>;
