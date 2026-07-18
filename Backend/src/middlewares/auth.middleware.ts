import { Request, Response, NextFunction } from 'express';
import { sendError } from '../utils/api-response';
import { getAuth } from '../config/auth';

export interface AuthenticatedRequest extends Request {
  userId?: string;
}

export function requireAuth(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
  const auth = getAuth();
  if (!auth) {
    sendError(res, 'Authentication not initialized.', 500);
    return;
  }

  const webRequest = new Request(`${req.protocol}://${req.get('host')}${req.originalUrl}`, {
    method: req.method,
    headers: req.headers as Record<string, string>,
  });

  auth.handler(webRequest)
    .then(async (response) => {
      const sessionData = await response.json().catch(() => null);

      const body = sessionData as { user?: { id: string } } | null;

      if (!body?.user) {
        sendError(res, 'Authentication required.', 401);
        return;
      }

      req.userId = body.user.id;
      next();
    })
    .catch(() => {
      sendError(res, 'Authentication required.', 401);
    });
}
