import { Router } from 'express';
import { requireAuth } from '../middlewares/auth.middleware';
import { getDashboard, getSubjectDistribution, getLearningProgress } from '../controllers/analytics.controller';

const router = Router();

router.get('/dashboard', requireAuth, getDashboard);
router.get('/subjects', requireAuth, getSubjectDistribution);
router.get('/progress', requireAuth, getLearningProgress);

export default router;
