import { createNotesPrompt } from './notes.prompt';
import type { NotesPromptInput } from '../validators/ai.validator';

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
