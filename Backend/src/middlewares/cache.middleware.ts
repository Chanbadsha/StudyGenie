import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

interface CacheEntry {
  data: unknown;
  statusCode: number;
  expiresAt: number;
}

interface CacheOptions {
  ttl: number;
  keyGenerator?: (req: Request) => string;
}

const store = new Map<string, CacheEntry>();
const CLEANUP_INTERVAL = 120_000;
const cleanupTimer = setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of store) {
    if (entry.expiresAt <= now) {
      store.delete(key);
    }
  }
}, CLEANUP_INTERVAL);
cleanupTimer.unref();

export function cache(options: CacheOptions) {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (req.method !== 'GET') {
      next();
      return;
    }

    const key = options.keyGenerator?.(req) ?? req.originalUrl;
    const now = Date.now();
    const entry = store.get(key);

    if (entry && entry.expiresAt > now) {
      res.status(entry.statusCode).json(entry.data);
      return;
    }

    const originalJson = res.json.bind(res);
    res.json = function jsonOverride(body: unknown) {
      store.set(key, {
        data: body,
        statusCode: res.statusCode,
        expiresAt: now + options.ttl,
      });
      return originalJson(body);
    };

    next();
  };
}

export function clearCache(pattern?: string): void {
  if (!pattern) {
    const count = store.size;
    store.clear();
    logger.info(`Cache cleared (${count} entries)`);
    return;
  }
  let count = 0;
  for (const key of store.keys()) {
    if (key.includes(pattern)) {
      store.delete(key);
      count++;
    }
  }
  if (count > 0) {
    logger.info(`Cache cleared (${count} entries matching "${pattern}")`);
  }
}
