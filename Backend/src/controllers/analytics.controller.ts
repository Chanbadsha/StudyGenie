import { Response } from 'express';
import { analyticsService } from '../services/analytics.service';
import { sendSuccess, sendError } from '../utils/api-response';
import { isValidObjectId } from '../utils/object-id';
import type { AuthenticatedRequest } from '../middlewares/auth.middleware';

export async function getDashboard(req: AuthenticatedRequest, res: Response): Promise<void> {
  if (!req.userId || !isValidObjectId(req.userId)) {
    sendError(res, 'Authentication required.', 401);
    return;
  }

  const stats = await analyticsService.getDashboardStats(req.userId);
  sendSuccess(res, stats, 'Dashboard statistics fetched successfully.');
}

export async function getSubjectDistribution(req: AuthenticatedRequest, res: Response): Promise<void> {
  if (!req.userId || !isValidObjectId(req.userId)) {
    sendError(res, 'Authentication required.', 401);
    return;
  }

  const data = await analyticsService.getSubjectDistribution(req.userId);
  sendSuccess(res, data, 'Subject distribution fetched successfully.');
}

export async function getLearningProgress(req: AuthenticatedRequest, res: Response): Promise<void> {
  if (!req.userId || !isValidObjectId(req.userId)) {
    sendError(res, 'Authentication required.', 401);
    return;
  }

  const data = await analyticsService.getLearningProgress(req.userId);
  sendSuccess(res, data, 'Learning progress fetched successfully.');
}
