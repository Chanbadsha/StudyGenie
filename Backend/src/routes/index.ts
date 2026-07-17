import { Router } from 'express';
import { sendSuccess } from '../utils/api-response';

const router = Router();

router.get('/health', (_req, res) => {
  sendSuccess(res, { status: 'ok', timestamp: new Date().toISOString() }, 'Server is running.');
});

export default router;
