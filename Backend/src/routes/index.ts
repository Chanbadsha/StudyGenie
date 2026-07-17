import { Router } from 'express';
import { sendSuccess } from '../utils/api-response';
import authRoutes from './auth.routes';

const router = Router();

router.get('/health', (_req, res) => {
  sendSuccess(res, { status: 'ok', timestamp: new Date().toISOString() }, 'Server is running.');
});

router.use('/auth', authRoutes);

export default router;
