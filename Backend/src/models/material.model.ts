import mongoose, { Schema, Document } from 'mongoose';
import './user.model';

export interface IMaterial extends Document {
  title: string;
  subject: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  shortDescription: string;
  content: string;
  coverImage?: string;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const materialSchema = new Schema<IMaterial>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 200,
    },
    subject: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    difficulty: {
      type: String,
      required: true,
      enum: ['Beginner', 'Intermediate', 'Advanced'],
    },
    shortDescription: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
      maxlength: 500,
    },
    content: {
      type: String,
      required: true,
      minlength: 20,
    },
    coverImage: {
      type: String,
      default: '',
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

materialSchema.index({ title: 'text', shortDescription: 'text' });
materialSchema.index({ subject: 1 });
materialSchema.index({ difficulty: 1 });
materialSchema.index({ createdBy: 1 });
materialSchema.index({ createdAt: -1 });

export const Material = mongoose.model<IMaterial>('Material', materialSchema);
