import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';
import { sendError } from '../utils/api-response';

export function validate(schema: ZodSchema, source: 'body' | 'query' | 'params' = 'body') {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      const parsed = schema.parse(req[source]);
      req[source] = parsed;
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = error.issues.map((e) => ({
          field: e.path.join('.'),
          message: e.message,
        }));
        sendError(res, 'Validation failed.', 400, errors);
        return;
      }
      next(error);
    }
  };
}
