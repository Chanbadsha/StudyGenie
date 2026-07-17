import { Request, Response } from 'express';
import type { FilterQuery } from 'mongoose';
import { Material, type IMaterial } from '../models/material.model';
import { sendSuccess, sendError } from '../utils/api-response';
import { getPaginationParams, getPaginationResult } from '../utils/pagination';
import { isValidObjectId } from '../utils/object-id';

export async function getAllMaterials(req: Request, res: Response): Promise<void> {
  const { page, limit, skip } = getPaginationParams(
    req.query.page as string,
    req.query.limit as string
  );

  const search = (req.query.search as string) || '';
  const subject = (req.query.subject as string) || '';
  const difficulty = (req.query.difficulty as string) || '';
  const sort = (req.query.sort as string) || 'newest';

  const filter: FilterQuery<IMaterial> = {};

  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: 'i' } },
      { shortDescription: { $regex: search, $options: 'i' } },
    ];
  }

  if (subject) {
    filter.subject = subject;
  }

  if (difficulty) {
    filter.difficulty = difficulty;
  }

  let sortOption: Record<string, 1 | -1> = { createdAt: -1 };
  switch (sort) {
    case 'oldest':
      sortOption = { createdAt: 1 };
      break;
    case 'az':
      sortOption = { title: 1 };
      break;
    case 'za':
      sortOption = { title: -1 };
      break;
    default:
      sortOption = { createdAt: -1 };
  }

  const [materials, total] = await Promise.all([
    Material.find(filter)
      .sort(sortOption)
      .skip(skip)
      .limit(limit)
      .select('-content')
      .populate('createdBy', 'name avatar'),
    Material.countDocuments(filter),
  ]);

  const pagination = getPaginationResult(total, page, limit);

  sendSuccess(res, { materials, pagination }, 'Materials fetched successfully.');
}

export async function getMaterialById(req: Request, res: Response): Promise<void> {
  const id = req.params.id as string;

  if (!isValidObjectId(id)) {
    sendError(res, 'Invalid material ID.', 400);
    return;
  }

  const material = await Material.findById(id).populate('createdBy', 'name avatar');

  if (!material) {
    sendError(res, 'Material not found.', 404);
    return;
  }

  sendSuccess(res, material, 'Material fetched successfully.');
}
