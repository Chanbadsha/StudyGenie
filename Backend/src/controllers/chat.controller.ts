import { Response } from 'express';
import type { AuthenticatedRequest } from '../middlewares/auth.middleware';
import {
  ChatServiceError,
  createSession as createSessionService,
  getSessions as getSessionsService,
  getSessionDetail as getSessionDetailService,
  sendMessage as sendMessageService,
  deleteSession as deleteSessionService,
  serializeSession,
  serializeMessage,
} from '../services/chat.service';
import type { SendMessageInput } from '../validators/chat.validator';
import { sendError, sendSuccess } from '../utils/api-response';
import { logger } from '../utils/logger';

function getAuthenticatedUserId(req: AuthenticatedRequest, res: Response): string | null {
  if (!req.userId) {
    sendError(res, 'Authentication required.', 401);
    return null;
  }
  return req.userId;
}

function sendChatError(error: unknown, res: Response, fallback: string): void {
  if (error instanceof ChatServiceError) {
    sendError(res, error.message, error.statusCode);
    return;
  }
  logger.error('Unexpected chat controller error', {
    error: error instanceof Error ? error.name : 'UnknownError',
  });
  sendError(res, fallback, 500);
}

export async function createSession(req: AuthenticatedRequest, res: Response): Promise<void> {
  const userId = getAuthenticatedUserId(req, res);
  if (!userId) return;

  try {
    const session = await createSessionService(userId, (req.body as { title?: string }).title);
    sendSuccess(res, serializeSession(session), 'Chat session created.', 201);
  } catch (error) {
    sendChatError(error, res, 'Could not create chat session. Please try again.');
  }
}

export async function getSessions(req: AuthenticatedRequest, res: Response): Promise<void> {
  const userId = getAuthenticatedUserId(req, res);
  if (!userId) return;

  try {
    const sessions = await getSessionsService(userId);
    sendSuccess(
      res,
      { sessions: sessions.map(serializeSession) },
      'Chat sessions fetched successfully.'
    );
  } catch (error) {
    sendChatError(error, res, 'Could not load chat sessions. Please try again.');
  }
}

export async function getSessionDetail(req: AuthenticatedRequest, res: Response): Promise<void> {
  const userId = getAuthenticatedUserId(req, res);
  if (!userId) return;

  try {
    const { session, messages } = await getSessionDetailService(userId, req.params.id as string);
    sendSuccess(
      res,
      {
        session: serializeSession(session),
        messages: messages.map(serializeMessage),
      },
      'Chat session fetched successfully.'
    );
  } catch (error) {
    sendChatError(error, res, 'Could not load this chat session. Please try again.');
  }
}

export async function sendMessage(req: AuthenticatedRequest, res: Response): Promise<void> {
  const userId = getAuthenticatedUserId(req, res);
  if (!userId) return;

  try {
    const { sessionId, message } = req.body as SendMessageInput;
    const result = await sendMessageService(userId, sessionId, message);
    sendSuccess(
      res,
      {
        reply: result.reply,
        message: serializeMessage(result.assistantMessage),
      },
      'AI response generated.',
      201
    );
  } catch (error) {
    sendChatError(error, res, 'Could not send message. Please try again.');
  }
}

export async function deleteSession(req: AuthenticatedRequest, res: Response): Promise<void> {
  const userId = getAuthenticatedUserId(req, res);
  if (!userId) return;

  try {
    await deleteSessionService(userId, req.params.id as string);
    sendSuccess(res, undefined, 'Chat session deleted.');
  } catch (error) {
    sendChatError(error, res, 'Could not delete this chat session. Please try again.');
  }
}
