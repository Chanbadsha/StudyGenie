import { Request, Response } from 'express';
import { sendError } from '../utils/api-response';

export function notFoundHandler(_req: Request, res: Response): void {
  sendError(res, 'The requested resource was not found.', 404);
}
