import { z } from 'zod';

export const ProfileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.').max(100, 'Name must be at most 100 characters.'),
  avatar: z.string().url('Please enter a valid URL.').optional().or(z.literal('')),
});

export type ProfileSchemaType = z.infer<typeof ProfileSchema>;
