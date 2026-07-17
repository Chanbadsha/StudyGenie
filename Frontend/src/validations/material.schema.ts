import { z } from 'zod';

export const CreateMaterialSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters.').max(200, 'Title must be at most 200 characters.'),
  subject: z.string().min(1, 'Subject is required.'),
  difficulty: z.enum(['Beginner', 'Intermediate', 'Advanced'], { message: 'Please select a valid difficulty level.' }),
  shortDescription: z.string().min(10, 'Description must be at least 10 characters.').max(500, 'Description must be at most 500 characters.'),
  content: z.string().min(20, 'Content must be at least 20 characters.'),
  coverImage: z.string().url('Please enter a valid URL.').optional().or(z.literal('')),
});

export type CreateMaterialSchemaType = z.infer<typeof CreateMaterialSchema>;
