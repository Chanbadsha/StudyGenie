import { Request, Response, NextFunction } from 'express';
import { sendError } from '../utils/api-response';

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const store = new Map<string, RateLimitEntry>();

const CLEANUP_INTERVAL = 60_000;

setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of store.entries()) {
    if (entry.resetAt <= now) {
      store.delete(key);
    }
  }
}, CLEANUP_INTERVAL);

export function rateLimit(options: { windowMs: number; maxRequests: number }) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const key = req.ip || req.socket.remoteAddress || 'unknown';
    const now = Date.now();

    const entry = store.get(key);

    if (!entry || entry.resetAt <= now) {
      store.set(key, { count: 1, resetAt: now + options.windowMs });
      next();
      return;
    }

    if (entry.count >= options.maxRequests) {
      sendError(res, 'Too many requests. Please try again later.', 429);
      return;
    }

    entry.count++;
    next();
  };
}
