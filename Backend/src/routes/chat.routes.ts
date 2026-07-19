import { Router, type Request } from 'express';
import { asyncHandler } from '../utils/async-handler';
import { requireAuth, type AuthenticatedRequest } from '../middlewares/auth.middleware';
import { rateLimit } from '../middlewares/rate-limit.middleware';
import { validate } from '../middlewares/validate.middleware';
import {
  createSession,
  deleteSession,
  getSessionDetail,
  getSessions,
  sendMessage,
} from '../controllers/chat.controller';
import {
  chatParamsSchema,
  createSessionBodySchema,
  sendMessageBodySchema,
} from '../validators/chat.validator';

function getUserRateLimitKey(req: Request, scope: string): string {
  const userId = (req as AuthenticatedRequest).userId;
  return `${scope}:${userId || req.ip || req.socket.remoteAddress || 'unknown'}`;
}

const messageRateLimit = rateLimit({
  windowMs: 60 * 60 * 1000,
  maxRequests: 60,
  keyGenerator: (req) => getUserRateLimitKey(req, 'chat-messages'),
});

const sessionRateLimit = rateLimit({
  windowMs: 60_000,
  maxRequests: 30,
  keyGenerator: (req) => getUserRateLimitKey(req, 'chat-sessions'),
});

const router = Router();

router.post(
  '/sessions',
  requireAuth,
  sessionRateLimit,
  validate(createSessionBodySchema),
  asyncHandler(createSession)
);

router.get(
  '/sessions',
  requireAuth,
  sessionRateLimit,
  asyncHandler(getSessions)
);

router.get(
  '/sessions/:id',
  requireAuth,
  validate(chatParamsSchema, 'params'),
  asyncHandler(getSessionDetail)
);

router.post(
  '/messages',
  requireAuth,
  validate(sendMessageBodySchema),
  messageRateLimit,
  asyncHandler(sendMessage)
);

router.delete(
  '/sessions/:id',
  requireAuth,
  validate(chatParamsSchema, 'params'),
  asyncHandler(deleteSession)
);

export default router;
