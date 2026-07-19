import mongoose from 'mongoose';

export function isValidObjectId(id: string): boolean {
  return mongoose.isValidObjectId(id);
}

export function toObjectId(id: string): mongoose.Types.ObjectId {
  return new (mongoose.Types.ObjectId as unknown as new (value: string) => mongoose.Types.ObjectId)(id);
}
