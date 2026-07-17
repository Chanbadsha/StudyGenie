import { Router } from 'express';
import { sendSuccess } from '../utils/api-response';
import authRoutes from './auth.routes';
import materialRoutes from './material.routes';

const router = Router();

router.get('/health', (_req, res) => {
  sendSuccess(res, { status: 'ok', timestamp: new Date().toISOString() }, 'Server is running.');
});

router.use('/auth', authRoutes);
router.use('/materials', materialRoutes);

export default router;
