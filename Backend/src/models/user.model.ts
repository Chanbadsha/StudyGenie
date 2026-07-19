import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email?: string;
  image?: string;
  avatar?: string;
}

const userSchema = new Schema<IUser>(
  {
    name: String,
    email: String,
    image: String,
    avatar: String,
  },
  {
    collection: 'users',
    strict: false,
  }
);

export const User = (mongoose.models.User as mongoose.Model<IUser> | undefined)
  ?? mongoose.model<IUser>('User', userSchema, 'users');
