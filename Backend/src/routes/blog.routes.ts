import { Router } from 'express';
import { asyncHandler } from '../utils/async-handler';
import { getAllPosts, getPost } from '../controllers/blog.controller';

const router = Router();

router.get('/', asyncHandler(getAllPosts));
router.get('/:slug', asyncHandler(getPost));

export default router;
