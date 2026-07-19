import { Request, Response, NextFunction } from 'express';
import { fromNodeHeaders } from 'better-auth/node';
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

  void auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
    query: { disableCookieCache: true },
  })
    .then((session) => {
      if (!session?.user?.id) {
        sendError(res, 'Authentication required.', 401);
        return;
      }

      req.userId = session.user.id;
      next();
    })
    .catch(() => {
      sendError(res, 'Authentication required.', 401);
    });
}
