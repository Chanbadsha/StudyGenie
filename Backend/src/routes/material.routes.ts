import { Router } from 'express';
import { asyncHandler } from '../utils/async-handler';
import { getAllMaterials, getMaterialById } from '../controllers/material.controller';

const router = Router();

router.get('/', asyncHandler(getAllMaterials));
router.get('/:id', asyncHandler(getMaterialById));

export default router;
