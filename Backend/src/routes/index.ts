import { Router } from 'express';
import { sendSuccess } from '../utils/api-response';
import authRoutes from './auth.routes';
import aiRoutes from './ai.routes';
import chatRoutes from './chat.routes';
import materialRoutes from './material.routes';
import { rateLimit } from '../middlewares/rate-limit.middleware';

const router = Router();

router.get('/health', (_req, res) => {
  sendSuccess(res, { status: 'ok', timestamp: new Date().toISOString() }, 'Server is running.');
});

router.use('/auth', authRoutes);
router.use('/ai', aiRoutes);
router.use('/chat', chatRoutes);
router.use('/materials', rateLimit({ windowMs: 60_000, maxRequests: 100 }), materialRoutes);

export default router;
