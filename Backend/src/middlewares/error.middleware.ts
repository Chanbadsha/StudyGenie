import { Request, Response, NextFunction } from 'express';
import { sendError } from '../utils/api-response';
import { logger } from '../utils/logger';

export function errorHandler(err: Error, _req: Request, res: Response, _next: NextFunction): void {
  logger.error('Unhandled error', {
    name: err.name,
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });

  if (process.env.NODE_ENV === 'development') {
    sendError(res, err.message || 'Internal server error.', 500);
    return;
  }

  sendError(res, 'An unexpected error occurred.', 500);
}
