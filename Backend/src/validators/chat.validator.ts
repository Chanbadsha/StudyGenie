import { z } from 'zod';

export const createSessionBodySchema = z.object({
  title: z.string().trim().max(200).optional(),
});

export const sendMessageBodySchema = z.object({
  sessionId: z.string().min(1, 'Session ID is required.'),
  message: z.string().trim().min(1, 'Message cannot be empty.').max(10_000, 'Message is too long.'),
});

export const chatParamsSchema = z.object({
  id: z.string().min(1, 'Chat ID is required.'),
});

export type SendMessageInput = z.infer<typeof sendMessageBodySchema>;
