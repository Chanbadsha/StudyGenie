import { env } from '../config/env';
import { getGenerativeModel } from '../config/gemini';
import { AIGeneration, type IAIGeneration } from '../models/ai-generation.model';
import { buildNotesPrompt } from '../prompts';
import type { NotesPromptInput } from '../validators/ai.validator';
import { isValidObjectId, toObjectId } from '../utils/object-id';
import { logger } from '../utils/logger';

const AI_PROVIDER_ERROR_MESSAGE = 'The AI service is temporarily unavailable. Please try again.';
const AI_STORAGE_ERROR_MESSAGE = 'The notes were generated but could not be saved. Please try again.';

export class AIServiceError extends Error {
  public readonly statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.name = 'AIServiceError';
    this.statusCode = statusCode;
  }
}

export interface AIGenerationResponse {
  id: string;
  userId: string;
  type: IAIGeneration['type'];
  topic: string;
  subject: string;
  difficulty: IAIGeneration['difficulty'];
  learningGoal: string;
  response: string;
  outputLength: IAIGeneration['outputLength'];
  aiModel: string;
  materialId?: string;
  createdAt: string;
}

function getUserObjectId(userId: string): ReturnType<typeof toObjectId> {
  if (!isValidObjectId(userId)) {
    throw new AIServiceError('Authentication required.', 401);
  }

  return toObjectId(userId);
}

function getErrorName(error: unknown): string {
  return error instanceof Error ? error.name : 'UnknownError';
}

function cleanResponse(response: string): string {
  return response.replace(/\r\n/g, '\n').replace(/[ \t]+\n/g, '\n').trim();
}

export function serializeAIGeneration(generation: IAIGeneration): AIGenerationResponse {
  return {
    id: String(generation._id),
    userId: String(generation.userId),
    type: generation.type,
    topic: generation.topic,
    subject: generation.subject,
    difficulty: generation.difficulty,
    learningGoal: generation.learningGoal,
    response: generation.response,
    outputLength: generation.outputLength,
    aiModel: generation.aiModel,
    ...(generation.materialId ? { materialId: String(generation.materialId) } : {}),
    createdAt: generation.createdAt.toISOString(),
  };
}

export async function generateNotes(userId: string, input: NotesPromptInput): Promise<IAIGeneration> {
  const userObjectId = getUserObjectId(userId);
  const prompt = buildNotesPrompt(input);
  const startedAt = Date.now();
  let generatedResponse: string;

  try {
    const model = getGenerativeModel();
    const result = await model.generateContent(prompt);
    generatedResponse = cleanResponse(result.response.text());

    if (!generatedResponse) {
      throw new Error('The AI provider returned an empty response.');
    }
  } catch (error) {
    logger.error('AI notes generation failed', {
      feature: 'notes',
      userId,
      model: env.geminiModel,
      durationMs: Date.now() - startedAt,
      error: getErrorName(error),
    });
    throw new AIServiceError(AI_PROVIDER_ERROR_MESSAGE, 503);
  }

  try {
    const generation = await AIGeneration.create({
      userId: userObjectId,
      type: 'Notes',
      topic: input.topic,
      subject: input.subject,
      difficulty: input.difficulty,
      learningGoal: input.learningGoal,
      prompt,
      response: generatedResponse,
      outputLength: input.outputLength,
      aiModel: env.geminiModel,
    });

    logger.info('AI notes generation completed', {
      feature: 'notes',
      userId,
      model: env.geminiModel,
      durationMs: Date.now() - startedAt,
    });

    return generation;
  } catch (error) {
    logger.error('AI notes history save failed', {
      feature: 'notes',
      userId,
      model: env.geminiModel,
      durationMs: Date.now() - startedAt,
      error: getErrorName(error),
    });
    throw new AIServiceError(AI_STORAGE_ERROR_MESSAGE, 500);
  }
}

export async function getNotesHistory(userId: string): Promise<IAIGeneration[]> {
  const userObjectId = getUserObjectId(userId);

  try {
    return await AIGeneration.find({ userId: userObjectId, type: 'Notes' })
      .select('_id userId type topic subject difficulty learningGoal response outputLength aiModel materialId createdAt')
      .sort({ createdAt: -1 });
  } catch (error) {
    logger.error('AI notes history fetch failed', {
      feature: 'notes-history',
      userId,
      error: getErrorName(error),
    });
    throw new AIServiceError('Could not load your AI notes history. Please try again.', 500);
  }
}

export async function deleteNotesHistory(userId: string, generationId: string): Promise<void> {
  const userObjectId = getUserObjectId(userId);

  if (!isValidObjectId(generationId)) {
    throw new AIServiceError('Invalid AI generation ID.', 400);
  }

  let generation: IAIGeneration | null;
  try {
    generation = await AIGeneration.findById(generationId).select('userId type');
  } catch (error) {
    logger.error('AI notes history lookup failed', {
      feature: 'notes-history',
      userId,
      error: getErrorName(error),
    });
    throw new AIServiceError('Could not delete this AI generation. Please try again.', 500);
  }

  if (!generation) {
    throw new AIServiceError('AI generation not found.', 404);
  }

  if (String(generation.userId) !== String(userObjectId)) {
    throw new AIServiceError('You do not have permission to delete this AI generation.', 403);
  }

  try {
    await AIGeneration.deleteOne({ _id: generationId });
  } catch (error) {
    logger.error('AI notes history delete failed', {
      feature: 'notes-history',
      userId,
      error: getErrorName(error),
    });
    throw new AIServiceError('Could not delete this AI generation. Please try again.', 500);
  }
}
