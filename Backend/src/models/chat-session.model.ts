import mongoose, { Document, Schema } from 'mongoose';

export interface IChatSession extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  lastMessageAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const chatSessionSchema = new Schema<IChatSession>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
      default: 'New Chat',
    },
    lastMessageAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

chatSessionSchema.index({ userId: 1, lastMessageAt: -1 });

export const ChatSession = mongoose.model<IChatSession>(
  'ChatSession',
  chatSessionSchema,
  'chatSessions'
);
