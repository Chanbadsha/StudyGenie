import { Request, Response } from 'express';
import mongoose, { type FilterQuery } from 'mongoose';
import { Material, type IMaterial } from '../models/material.model';
import { sendSuccess, sendError } from '../utils/api-response';
import { getPaginationParams, getPaginationResult } from '../utils/pagination';
import { isValidObjectId, toObjectId } from '../utils/object-id';
import type { AuthenticatedRequest } from '../middlewares/auth.middleware';

interface MaterialQuery {
  page?: string;
  limit?: string;
  search?: string;
  subject?: string;
  difficulty?: string;
  sort?: string;
}

interface PopulatedAuthor {
  _id?: mongoose.Types.ObjectId | string;
  id?: string;
  name?: string;
  avatar?: string;
  image?: string;
}

interface MaterialResponse {
  id: string;
  title: string;
  subject: string;
  difficulty: IMaterial['difficulty'];
  shortDescription: string;
  content?: string;
  coverImage?: string;
  createdBy: string | {
    id: string;
    name: string;
    avatar?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

interface CreateMaterialBody {
  title: string;
  subject: string;
  difficulty: IMaterial['difficulty'];
  shortDescription: string;
  content: string;
  coverImage?: string;
}

function serializeMaterial(material: IMaterial): MaterialResponse {
  const raw = material.toObject({ virtuals: false }) as unknown as {
    _id: mongoose.Types.ObjectId | string;
    title: string;
    subject: string;
    difficulty: IMaterial['difficulty'];
    shortDescription: string;
    content?: string;
    coverImage?: string;
    createdBy: mongoose.Types.ObjectId | string | PopulatedAuthor;
    createdAt: Date;
    updatedAt: Date;
  };

  const owner = raw.createdBy;
  if (typeof owner === 'object' && owner !== null && ('_id' in owner || 'id' in owner)) {
    const author = owner as PopulatedAuthor;
    const authorId = author._id ?? author.id;
    const avatar = author.avatar ?? author.image;

    return {
      id: String(raw._id),
      title: raw.title,
      subject: raw.subject,
      difficulty: raw.difficulty,
      shortDescription: raw.shortDescription,
      content: raw.content,
      coverImage: raw.coverImage,
      createdBy: {
        id: String(authorId),
        name: author.name ?? 'Unknown author',
        ...(avatar ? { avatar } : {}),
      },
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    };
  }

  return {
    id: String(raw._id),
    title: raw.title,
    subject: raw.subject,
    difficulty: raw.difficulty,
    shortDescription: raw.shortDescription,
    content: raw.content,
    coverImage: raw.coverImage,
    createdBy: String(owner),
    createdAt: raw.createdAt,
    updatedAt: raw.updatedAt,
  };
}

function getMaterialQuery(req: Request): MaterialQuery {
  return req.query as unknown as MaterialQuery;
}

function buildFilter(query: MaterialQuery, ownerId?: string): FilterQuery<IMaterial> {
  const filter: FilterQuery<IMaterial> = {};

  if (ownerId) {
    filter.createdBy = toObjectId(ownerId);
  }

  if (query.search) {
    const escaped = query.search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    filter.$or = [
      { title: { $regex: escaped, $options: 'i' } },
      { shortDescription: { $regex: escaped, $options: 'i' } },
    ];
  }

  if (query.subject) {
    filter.subject = query.subject;
  }

  if (query.difficulty) {
    filter.difficulty = query.difficulty;
  }

  return filter;
}

async function listMaterials(req: Request, res: Response, filter: FilterQuery<IMaterial>): Promise<void> {
  const query = getMaterialQuery(req);
  const { page, limit, skip } = getPaginationParams(query.page, query.limit);
  const sort = query.sort || 'newest';

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
      .populate('createdBy', 'name avatar image'),
    Material.countDocuments(filter),
  ]);

  const pagination = getPaginationResult(total, page, limit);

  sendSuccess(
    res,
    { materials: materials.map(serializeMaterial), pagination },
    'Materials fetched successfully.'
  );
}

export async function getAllMaterials(req: Request, res: Response): Promise<void> {
  await listMaterials(req, res, buildFilter(getMaterialQuery(req)));
}

export async function getMyMaterials(req: AuthenticatedRequest, res: Response): Promise<void> {
  if (!req.userId || !isValidObjectId(req.userId)) {
    sendError(res, 'Authentication required.', 401);
    return;
  }

  await listMaterials(req, res, buildFilter(getMaterialQuery(req), req.userId));
}

export async function createMaterial(req: AuthenticatedRequest, res: Response): Promise<void> {
  if (!req.userId || !isValidObjectId(req.userId)) {
    sendError(res, 'Authentication required.', 401);
    return;
  }

  const body = req.body as CreateMaterialBody;
  const material = await Material.create({
    ...body,
    createdBy: toObjectId(req.userId),
  });

  await material.populate('createdBy', 'name avatar image');

  sendSuccess(res, serializeMaterial(material), 'Material created successfully.', 201);
}

export async function getMaterialById(req: Request, res: Response): Promise<void> {
  const id = req.params.id as string;

  if (!isValidObjectId(id)) {
    sendError(res, 'Invalid material ID.', 400);
    return;
  }

  const material = await Material.findById(id).populate('createdBy', 'name avatar image');

  if (!material) {
    sendError(res, 'Material not found.', 404);
    return;
  }

  sendSuccess(res, serializeMaterial(material), 'Material fetched successfully.');
}

export async function deleteMaterial(req: AuthenticatedRequest, res: Response): Promise<void> {
  const id = req.params.id as string;

  if (!isValidObjectId(id)) {
    sendError(res, 'Invalid material ID.', 400);
    return;
  }

  if (!req.userId || !isValidObjectId(req.userId)) {
    sendError(res, 'Authentication required.', 401);
    return;
  }

  const material = await Material.findById(id).select('createdBy');

  if (!material) {
    sendError(res, 'Material not found.', 404);
    return;
  }

  if (String(material.createdBy) !== req.userId) {
    sendError(res, 'You do not have permission to delete this material.', 403);
    return;
  }

  await Material.deleteOne({ _id: id });
  sendSuccess(res, undefined, 'Material deleted successfully.');
}
