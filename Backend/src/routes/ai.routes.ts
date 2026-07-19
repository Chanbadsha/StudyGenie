import { Router, type Request } from 'express';
import { asyncHandler } from '../utils/async-handler';
import { requireAuth, type AuthenticatedRequest } from '../middlewares/auth.middleware';
import { rateLimit } from '../middlewares/rate-limit.middleware';
import { validate } from '../middlewares/validate.middleware';
import {
  deleteAIHistory,
  generateNotes,
  getAIHistory,
} from '../controllers/ai.controller';
import {
  aiGenerationParamsSchema,
  generateNotesBodySchema,
} from '../validators/ai.validator';

function getUserRateLimitKey(req: Request, scope: string): string {
  const userId = (req as AuthenticatedRequest).userId;
  return `${scope}:${userId || req.ip || req.socket.remoteAddress || 'unknown'}`;
}

const notesRateLimit = rateLimit({
  windowMs: 60 * 60 * 1000,
  maxRequests: 20,
  keyGenerator: (req) => getUserRateLimitKey(req, 'ai-notes'),
});

const historyRateLimit = rateLimit({
  windowMs: 60_000,
  maxRequests: 60,
  keyGenerator: (req) => getUserRateLimitKey(req, 'ai-history'),
});

const router = Router();

router.post(
  '/notes',
  requireAuth,
  validate(generateNotesBodySchema),
  notesRateLimit,
  asyncHandler(generateNotes)
);

router.get(
  '/history',
  requireAuth,
  historyRateLimit,
  asyncHandler(getAIHistory)
);

router.delete(
  '/history/:id',
  requireAuth,
  validate(aiGenerationParamsSchema, 'params'),
  historyRateLimit,
  asyncHandler(deleteAIHistory)
);

export default router;
