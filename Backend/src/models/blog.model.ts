import mongoose, { Document, Schema } from 'mongoose';

export interface IBlogPost extends Document {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  coverImage?: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const blogPostSchema = new Schema<IBlogPost>(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      maxlength: 200,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    excerpt: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
    },
    content: {
      type: String,
      required: true,
      maxlength: 100_000,
    },
    author: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    category: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    coverImage: {
      type: String,
      trim: true,
    },
    published: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

blogPostSchema.index({ published: 1, createdAt: -1 });
blogPostSchema.index({ category: 1, published: 1 });

export const BlogPost = mongoose.model<IBlogPost>('BlogPost', blogPostSchema, 'blogPosts');
