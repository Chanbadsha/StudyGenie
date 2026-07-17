import { Router } from 'express';
import { toNodeHandler } from 'better-auth/node';
import { getAuth } from '../config/auth';

const router = Router();

router.use((req, res) => {
  const auth = getAuth();
  if (!auth) {
    res.status(500).json({ success: false, message: 'Authentication not initialized.' });
    return;
  }
  toNodeHandler(auth)(req, res);
});

export default router;
