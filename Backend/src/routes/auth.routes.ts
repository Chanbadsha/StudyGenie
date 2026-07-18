import { Router } from 'express';
import { toNodeHandler } from 'better-auth/node';
import { getAuth } from '../config/auth';
import { rateLimit } from '../middlewares/rate-limit.middleware';

const router = Router();

const authRateLimit = rateLimit({ windowMs: 60_000, maxRequests: 30 });

router.use(authRateLimit, (req, res) => {
  const auth = getAuth();
  if (!auth) {
    res.status(500).json({ success: false, message: 'Authentication not initialized.' });
    return;
  }
  toNodeHandler(auth)(req, res);
});

export default router;
