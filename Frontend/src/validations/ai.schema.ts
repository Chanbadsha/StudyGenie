import { z } from 'zod';

export const GenerateNotesSchema = z.object({
  topic: z.string().trim().min(3, 'Topic must be at least 3 characters.').max(200, 'Topic must be at most 200 characters.'),
  subject: z.string().trim().min(1, 'Subject is required.').max(100, 'Subject must be at most 100 characters.'),
  difficulty: z.enum(['Beginner', 'Intermediate', 'Advanced'], { message: 'Please select a valid difficulty level.' }),
  learningGoal: z.string().trim().min(5, 'Learning goal must be at least 5 characters.').max(500, 'Learning goal must be at most 500 characters.'),
  outputLength: z.enum(['Short', 'Medium', 'Long'], { message: 'Please select a valid output length.' }),
});

export type GenerateNotesSchemaType = z.infer<typeof GenerateNotesSchema>;
