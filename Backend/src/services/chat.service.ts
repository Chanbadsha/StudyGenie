import { env } from '../config/env';
import { getGenerativeModel } from '../config/gemini';
import { ChatSession, type IChatSession } from '../models/chat-session.model';
import { ChatMessage, type IChatMessage } from '../models/chat-message.model';
import { buildChatContext, buildChatPrompt } from '../prompts';
import { isValidObjectId, toObjectId } from '../utils/object-id';
import { logger } from '../utils/logger';

const AI_PROVIDER_ERROR_MESSAGE = 'The AI tutor is temporarily unavailable. Please try again.';

export class ChatServiceError extends Error {
  public readonly statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.name = 'ChatServiceError';
    this.statusCode = statusCode;
  }
}

export interface ChatSessionResponse {
  id: string;
  title: string;
  lastMessageAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ChatMessageResponse {
  id: string;
  sessionId: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt: string;
}

export interface ChatSessionDetailResponse {
  session: ChatSessionResponse;
  messages: ChatMessageResponse[];
}

export interface SendMessageResponse {
  reply: string;
  message: ChatMessageResponse;
}

function getUserObjectId(userId: string): ReturnType<typeof toObjectId> {
  if (!isValidObjectId(userId)) {
    throw new ChatServiceError('Authentication required.', 401);
  }
  return toObjectId(userId);
}

function getErrorName(error: unknown): string {
  return error instanceof Error ? error.name : 'UnknownError';
}

function truncateTitle(text: string): string {
  const cleaned = text.replace(/[\u0000-\u001f\u007f<>]/g, ' ').replace(/\s+/g, ' ').trim();
  if (cleaned.length <= 60) return cleaned;
  return cleaned.slice(0, 57) + '...';
}

export function serializeSession(session: IChatSession): ChatSessionResponse {
  return {
    id: String(session._id),
    title: session.title,
    lastMessageAt: session.lastMessageAt ? session.lastMessageAt.toISOString() : null,
    createdAt: session.createdAt.toISOString(),
    updatedAt: session.updatedAt.toISOString(),
  };
}

export function serializeMessage(message: IChatMessage): ChatMessageResponse {
  return {
    id: String(message._id),
    sessionId: String(message.sessionId),
    role: message.role,
    content: message.content,
    createdAt: message.createdAt.toISOString(),
  };
}

export async function createSession(userId: string, title?: string): Promise<IChatSession> {
  const userObjectId = getUserObjectId(userId);

  try {
    const session = await ChatSession.create({
      userId: userObjectId,
      title: title?.trim() || 'New Chat',
    });

    logger.info('Chat session created', { userId });

    return session;
  } catch (error) {
    logger.error('Chat session creation failed', {
      userId,
      error: getErrorName(error),
    });
    throw new ChatServiceError('Could not create chat session. Please try again.', 500);
  }
}

export async function getSessions(userId: string): Promise<IChatSession[]> {
  const userObjectId = getUserObjectId(userId);

  try {
    return await ChatSession.find({ userId: userObjectId })
      .sort({ lastMessageAt: -1, createdAt: -1 })
      .limit(50);
  } catch (error) {
    logger.error('Chat sessions fetch failed', {
      userId,
      error: getErrorName(error),
    });
    throw new ChatServiceError('Could not load chat sessions. Please try again.', 500);
  }
}

export async function getSessionDetail(userId: string, sessionId: string): Promise<{
  session: IChatSession;
  messages: IChatMessage[];
}> {
  const userObjectId = getUserObjectId(userId);

  if (!isValidObjectId(sessionId)) {
    throw new ChatServiceError('Invalid session ID.', 400);
  }

  let session: IChatSession | null;
  try {
    session = await ChatSession.findById(sessionId);
  } catch (error) {
    logger.error('Chat session lookup failed', {
      userId,
      error: getErrorName(error),
    });
    throw new ChatServiceError('Could not find this chat session. Please try again.', 500);
  }

  if (!session) {
    throw new ChatServiceError('Chat session not found.', 404);
  }

  if (String(session.userId) !== String(userObjectId)) {
    throw new ChatServiceError('You do not have permission to view this chat session.', 403);
  }

  let messages: IChatMessage[];
  try {
    messages = await ChatMessage.find({ sessionId: session._id })
      .sort({ createdAt: 1 });
  } catch (error) {
    logger.error('Chat messages fetch failed', {
      userId,
      sessionId,
      error: getErrorName(error),
    });
    throw new ChatServiceError('Could not load chat messages. Please try again.', 500);
  }

  return { session, messages };
}

export async function sendMessage(
  userId: string,
  sessionId: string,
  message: string
): Promise<{ reply: string; assistantMessage: IChatMessage }> {
  const userObjectId = getUserObjectId(userId);

  if (!isValidObjectId(sessionId)) {
    throw new ChatServiceError('Invalid session ID.', 400);
  }

  let session: IChatSession | null;
  try {
    session = await ChatSession.findById(sessionId);
  } catch (error) {
    logger.error('Chat session lookup failed', {
      userId,
      error: getErrorName(error),
    });
    throw new ChatServiceError('Could not find this chat session. Please try again.', 500);
  }

  if (!session) {
    throw new ChatServiceError('Chat session not found.', 404);
  }

  if (String(session.userId) !== String(userObjectId)) {
    throw new ChatServiceError('You do not have permission to send messages in this session.', 403);
  }

  await ChatMessage.create({
    sessionId: session._id,
    role: 'user' as const,
    content: message,
  });

  let previousMessages: IChatMessage[];
  try {
    previousMessages = await ChatMessage.find({ sessionId: session._id })
      .sort({ createdAt: 1 });
  } catch (error) {
    logger.error('Chat context fetch failed', {
      userId,
      sessionId,
      error: getErrorName(error),
    });
    throw new ChatServiceError('Could not load conversation context. Please try again.', 500);
  }

  const context = buildChatContext(previousMessages);
  const prompt = buildChatPrompt(context, message);
  const startedAt = Date.now();

  let replyText: string;
  try {
    const model = getGenerativeModel();
    const result = await model.generateContent(prompt);
    replyText = result.response.text().trim();

    if (!replyText) {
      throw new Error('The AI provider returned an empty response.');
    }
  } catch (error) {
    logger.error('AI chat response failed', {
      feature: 'chat',
      userId,
      sessionId,
      model: env.geminiModel,
      durationMs: Date.now() - startedAt,
      error: getErrorName(error),
    });
    throw new ChatServiceError(AI_PROVIDER_ERROR_MESSAGE, 503);
  }

  let assistantMessage: IChatMessage;
  try {
    assistantMessage = await ChatMessage.create({
      sessionId: session._id,
      role: 'assistant' as const,
      content: replyText,
    });
  } catch (error) {
    logger.error('Chat assistant message save failed', {
      userId,
      sessionId,
      error: getErrorName(error),
    });
    throw new ChatServiceError('The AI response was generated but could not be saved. Please try again.', 500);
  }

  try {
    const isFirstMessage = previousMessages.length <= 1;
    const update: Partial<IChatSession> = { lastMessageAt: new Date() };

    if (isFirstMessage && session.title === 'New Chat') {
      update.title = truncateTitle(message);
    }

    await ChatSession.updateOne({ _id: session._id }, { $set: update });
  } catch (error) {
    logger.error('Chat session update failed', {
      userId,
      sessionId,
      error: getErrorName(error),
    });
  }

  logger.info('AI chat response completed', {
    feature: 'chat',
    userId,
    sessionId,
    model: env.geminiModel,
    durationMs: Date.now() - startedAt,
  });

  return { reply: replyText, assistantMessage };
}

export async function deleteSession(userId: string, sessionId: string): Promise<void> {
  const userObjectId = getUserObjectId(userId);

  if (!isValidObjectId(sessionId)) {
    throw new ChatServiceError('Invalid session ID.', 400);
  }

  let session: IChatSession | null;
  try {
    session = await ChatSession.findById(sessionId).select('userId');
  } catch (error) {
    logger.error('Chat session lookup failed', {
      userId,
      error: getErrorName(error),
    });
    throw new ChatServiceError('Could not delete this chat session. Please try again.', 500);
  }

  if (!session) {
    throw new ChatServiceError('Chat session not found.', 404);
  }

  if (String(session.userId) !== String(userObjectId)) {
    throw new ChatServiceError('You do not have permission to delete this chat session.', 403);
  }

  try {
    await ChatMessage.deleteMany({ sessionId: session._id });
    await ChatSession.deleteOne({ _id: session._id });

    logger.info('Chat session deleted', { userId, sessionId });
  } catch (error) {
    logger.error('Chat session deletion failed', {
      userId,
      sessionId,
      error: getErrorName(error),
    });
    throw new ChatServiceError('Could not delete this chat session. Please try again.', 500);
  }
}
