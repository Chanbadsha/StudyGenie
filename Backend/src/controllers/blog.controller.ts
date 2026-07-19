import { Request, Response } from 'express';
import { getCategories, getPublishedPosts, getPostBySlug } from '../services/blog.service';
import type { BlogQueryInput } from '../validators/blog.validator';
import { sendError, sendSuccess } from '../utils/api-response';

export async function getAllPosts(req: Request, res: Response): Promise<void> {
  try {
    const query = req.query as BlogQueryInput;
    const posts = await getPublishedPosts(query);
    const categories = await getCategories();
    sendSuccess(res, { posts, categories }, 'Blog posts fetched successfully.');
  } catch {
    sendError(res, 'Could not load blog posts. Please try again.', 500);
  }
}

export async function getPost(req: Request, res: Response): Promise<void> {
  try {
    const { slug } = req.params;

    if (!slug || typeof slug !== 'string') {
      sendError(res, 'Invalid post slug.', 400);
      return;
    }

    const post = await getPostBySlug(slug);

    if (!post) {
      sendError(res, 'Blog post not found.', 404);
      return;
    }

    sendSuccess(res, post, 'Blog post fetched successfully.');
  } catch {
    sendError(res, 'Could not load this blog post. Please try again.', 500);
  }
}
