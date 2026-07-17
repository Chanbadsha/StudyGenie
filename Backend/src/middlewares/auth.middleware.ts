import { Request, Response, NextFunction } from 'express';
import { sendError } from '../utils/api-response';

export interface AuthenticatedRequest extends Request {
  userId?: string;
}

export function requireAuth(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
  const userId = req.headers['x-user-id'] as string;

  if (!userId) {
    sendError(res, 'Authentication required.', 401);
    return;
  }

  req.userId = userId;
  next();
}
