import mongoose from 'mongoose';

export function isValidObjectId(id: string): boolean {
  try {
    return mongoose.isValidObjectId(id);
  } catch {
    return false;
  }
}

export function toObjectId(id: string): mongoose.Types.ObjectId {
  return new (mongoose.Types.ObjectId as unknown as new (id: string) => mongoose.Types.ObjectId)(id);
}
