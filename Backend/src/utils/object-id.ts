import mongoose from 'mongoose';

export function isValidObjectId(id: string): boolean {
  return (mongoose.Types.ObjectId as unknown as { isValid: (id: string) => boolean }).isValid(id);
}

export function toObjectId(id: string): mongoose.Types.ObjectId {
  return new (mongoose.Types.ObjectId as unknown as new (id: string) => mongoose.Types.ObjectId)(id);
}
