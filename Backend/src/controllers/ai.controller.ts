import { Response } from 'express';
import type { AuthenticatedRequest } from '../middlewares/auth.middleware';
import {
  AIServiceError,
  deleteNotesHistory,
  generateNotes as generateNotesService,
  getNotesHistory,
  serializeAIGeneration,
} from '../services/ai.service';
import type { NotesPromptInput } from '../validators/ai.validator';
import { sendError, sendSuccess } from '../utils/api-response';
import { logger } from '../utils/logger';

function getAuthenticatedUserId(req: AuthenticatedRequest, res: Response): string | null {
  if (!req.userId) {
    sendError(res, 'Authentication required.', 401);
    return null;
  }

  return req.userId;
}

function sendAIError(error: unknown, res: Response, fallback: string): void {
  if (error instanceof AIServiceError) {
    sendError(res, error.message, error.statusCode);
    return;
  }

  logger.error('Unexpected AI controller error', {
    error: error instanceof Error ? error.name : 'UnknownError',
  });
  sendError(res, fallback, 500);
}

export async function generateNotes(req: AuthenticatedRequest, res: Response): Promise<void> {
  const userId = getAuthenticatedUserId(req, res);
  if (!userId) return;

  try {
    const generation = await generateNotesService(userId, req.body as NotesPromptInput);
    sendSuccess(res, serializeAIGeneration(generation), 'Notes generated successfully.', 201);
  } catch (error) {
    sendAIError(error, res, 'Could not generate notes. Please try again.');
  }
}

export async function getAIHistory(req: AuthenticatedRequest, res: Response): Promise<void> {
  const userId = getAuthenticatedUserId(req, res);
  if (!userId) return;

  try {
    const generations = await getNotesHistory(userId);
    sendSuccess(
      res,
      { generations: generations.map(serializeAIGeneration) },
      'AI notes history fetched successfully.'
    );
  } catch (error) {
    sendAIError(error, res, 'Could not load your AI notes history. Please try again.');
  }
}

export async function deleteAIHistory(req: AuthenticatedRequest, res: Response): Promise<void> {
  const userId = getAuthenticatedUserId(req, res);
  if (!userId) return;

  try {
    await deleteNotesHistory(userId, req.params.id as string);
    sendSuccess(res, undefined, 'AI generation deleted successfully.');
  } catch (error) {
    sendAIError(error, res, 'Could not delete this AI generation. Please try again.');
  }
}
