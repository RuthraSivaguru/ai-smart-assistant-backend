import { z } from 'zod';

export const profileUpdateSchema = z.object({
  email: z.email('Invalid email address').optional(),
  name: z.string().min(3, 'Name is required').optional(),
  phoneNumber: z
    .string()
    .min(10, 'Phone number is required')
    .max(10, 'Phone number is too long')
    .optional(),
  address: z.string().min(3, 'Address is required').optional(),
  updatedAt: z.string().optional(),
});

export type ProfileUpdate = z.infer<typeof profileUpdateSchema>;
