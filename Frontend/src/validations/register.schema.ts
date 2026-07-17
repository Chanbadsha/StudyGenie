import { z } from 'zod';

export const RegisterSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.').max(100, 'Name must be at most 100 characters.'),
  email: z.string().email('Please enter a valid email address.'),
  password: z.string().min(6, 'Password must be at least 6 characters.').max(100),
});

export type RegisterSchemaType = z.infer<typeof RegisterSchema>;
