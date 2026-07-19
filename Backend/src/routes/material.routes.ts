import { Router } from 'express';
import { z } from 'zod';
import { asyncHandler } from '../utils/async-handler';
import {
  createMaterial,
  deleteMaterial,
  getAllMaterials,
  getMaterialById,
  getMyMaterials,
} from '../controllers/material.controller';
import { validate } from '../middlewares/validate.middleware';
import { rateLimit } from '../middlewares/rate-limit.middleware';
import { requireAuth } from '../middlewares/auth.middleware';

const router = Router();

const positiveIntegerQuery = z.string().regex(/^[1-9]\d*$/, 'Must be a valid positive integer.');

const getAllQuerySchema = z.object({
  page: positiveIntegerQuery.optional(),
  limit: positiveIntegerQuery.optional(),
  search: z.string().max(100).optional(),
  subject: z.string().max(50).optional(),
  difficulty: z.enum(['Beginner', 'Intermediate', 'Advanced']).optional(),
  sort: z.enum(['newest', 'oldest', 'az', 'za']).optional(),
});

const getByIdParamsSchema = z.object({
  id: z.string().min(1, 'Material ID is required.'),
});

const createMaterialBodySchema = z.object({
  title: z.string().trim().min(3, 'Title must be at least 3 characters.').max(200, 'Title must be at most 200 characters.'),
  subject: z.string().trim().min(1, 'Subject is required.').max(100, 'Subject must be at most 100 characters.'),
  difficulty: z.enum(['Beginner', 'Intermediate', 'Advanced'], { message: 'Please select a valid difficulty level.' }),
  shortDescription: z.string().trim().min(10, 'Description must be at least 10 characters.').max(500, 'Description must be at most 500 characters.'),
  content: z.string().trim().min(20, 'Content must be at least 20 characters.').max(100_000, 'Content must be at most 100,000 characters.'),
  coverImage: z.union([
    z.literal(''),
    z.string()
      .trim()
      .url('Please enter a valid URL.')
      .refine((value) => /^https?:\/\//i.test(value), 'Cover image must use HTTP or HTTPS.'),
  ]).optional(),
});

router.get(
  '/mine',
  rateLimit({ windowMs: 60_000, maxRequests: 60 }),
  requireAuth,
  validate(getAllQuerySchema, 'query'),
  asyncHandler(getMyMaterials)
);

router.post(
  '/',
  rateLimit({ windowMs: 60_000, maxRequests: 30 }),
  requireAuth,
  validate(createMaterialBodySchema),
  asyncHandler(createMaterial)
);

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

router.delete(
  '/:id',
  rateLimit({ windowMs: 60_000, maxRequests: 30 }),
  requireAuth,
  validate(getByIdParamsSchema, 'params'),
  asyncHandler(deleteMaterial)
);

export default router;
