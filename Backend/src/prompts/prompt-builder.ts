import { createNotesPrompt } from './notes.prompt';
import { buildChatContext as assembleChatContext, createChatPrompt } from './chat.prompt';
import type { NotesPromptInput } from '../validators/ai.validator';
import type { IChatMessage } from '../models/chat-message.model';

function normalizePromptValue(value: string): string {
  return value
    .replace(/[\u0000-\u001f\u007f]/g, ' ')
    .replace(/[<>]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export function buildNotesPrompt(input: NotesPromptInput): string {
  return createNotesPrompt({
    topic: normalizePromptValue(input.topic),
    subject: normalizePromptValue(input.subject),
    difficulty: input.difficulty,
    learningGoal: normalizePromptValue(input.learningGoal),
    outputLength: input.outputLength,
  });
}

export function buildChatContext(messages: IChatMessage[]): string {
  return assembleChatContext(messages);
}

export function buildChatPrompt(context: string, userMessage: string): string {
  return createChatPrompt(context, normalizePromptValue(userMessage));
}
