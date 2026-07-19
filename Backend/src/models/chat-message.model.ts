import mongoose, { Document, Schema } from 'mongoose';

export type ChatMessageRole = 'user' | 'assistant';

export interface IChatMessage extends Document {
  sessionId: mongoose.Types.ObjectId;
  role: ChatMessageRole;
  content: string;
  createdAt: Date;
}

const chatMessageSchema = new Schema<IChatMessage>(
  {
    sessionId: {
      type: Schema.Types.ObjectId,
      ref: 'ChatSession',
      required: true,
      index: true,
    },
    role: {
      type: String,
      required: true,
      enum: ['user', 'assistant'],
    },
    content: {
      type: String,
      required: true,
      maxlength: 200_000,
    },
  },
  { timestamps: true }
);

chatMessageSchema.index({ sessionId: 1, createdAt: 1 });

export const ChatMessage = mongoose.model<IChatMessage>(
  'ChatMessage',
  chatMessageSchema,
  'chatMessages'
);
