import { Response } from 'express';

interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  errors?: { field: string; message: string }[];
}

export function sendSuccess<T>(res: Response, data?: T, message = 'Operation completed successfully.', statusCode = 200): void {
  const response: ApiResponse<T> = {
    success: true,
    message,
  };

  if (data !== undefined) {
    response.data = data;
  }

  res.status(statusCode).json(response);
}

export function sendError(res: Response, message: string, statusCode = 400, errors?: { field: string; message: string }[]): void {
  const response: ApiResponse = {
    success: false,
    message,
  };

  if (errors !== undefined) {
    response.errors = errors;
  }

  res.status(statusCode).json(response);
}
