import { Router } from 'express';
import { z } from 'zod';
import { asyncHandler } from '../utils/async-handler';
import { getAllMaterials, getMaterialById } from '../controllers/material.controller';
import { validate } from '../middlewares/validate.middleware';
import { rateLimit } from '../middlewares/rate-limit.middleware';

const router = Router();

const getAllQuerySchema = z.object({
  page: z.string().optional(),
  limit: z.string().optional(),
  search: z.string().max(100).optional(),
  subject: z.string().max(50).optional(),
  difficulty: z.enum(['Beginner', 'Intermediate', 'Advanced']).optional(),
  sort: z.enum(['newest', 'oldest', 'az', 'za']).optional(),
});

const getByIdParamsSchema = z.object({
  id: z.string().min(1, 'Material ID is required.'),
});

router.get(
  '/',
  rateLimit({ windowMs: 60_000, maxRequests: 60 }),
  validate(getAllQuerySchema, 'query'),
  asyncHandler(getAllMaterials)
);

router.get(
  '/:id',
  rateLimit({ windowMs: 60_000, maxRequests: 60 }),
  validate(getByIdParamsSchema, 'params'),
  asyncHandler(getMaterialById)
);

export default router;
