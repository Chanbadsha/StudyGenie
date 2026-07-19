import { z } from 'zod';

export const blogQuerySchema = z.object({
  category: z.string().max(50).optional(),
});

export type BlogQueryInput = z.infer<typeof blogQuerySchema>;
