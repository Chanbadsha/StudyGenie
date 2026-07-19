import mongoose, { Document, Schema } from 'mongoose';

export type AIGenerationType = 'Notes' | 'Summary' | 'Quiz';
export type AIGenerationDifficulty = 'Beginner' | 'Intermediate' | 'Advanced';
export type AIGenerationOutputLength = 'Short' | 'Medium' | 'Long';

export interface IAIGeneration extends Document {
  userId: mongoose.Types.ObjectId;
  materialId?: mongoose.Types.ObjectId;
  type: AIGenerationType;
  topic: string;
  subject: string;
  difficulty: AIGenerationDifficulty;
  learningGoal: string;
  prompt: string;
  response: string;
  outputLength: AIGenerationOutputLength;
  aiModel: string;
  createdAt: Date;
  updatedAt: Date;
}

const aiGenerationSchema = new Schema<IAIGeneration>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    materialId: {
      type: Schema.Types.ObjectId,
      ref: 'Material',
    },
    type: {
      type: String,
      required: true,
      enum: ['Notes', 'Summary', 'Quiz'],
      default: 'Notes',
    },
    topic: {
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
    learningGoal: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 500,
    },
    prompt: {
      type: String,
      required: true,
      maxlength: 10_000,
    },
    response: {
      type: String,
      required: true,
      maxlength: 200_000,
    },
    outputLength: {
      type: String,
      required: true,
      enum: ['Short', 'Medium', 'Long'],
    },
    aiModel: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
  },
  { timestamps: true }
);

aiGenerationSchema.index({ userId: 1, createdAt: -1 });
aiGenerationSchema.index({ userId: 1, type: 1, createdAt: -1 });
aiGenerationSchema.index({ materialId: 1 });

export const AIGeneration = mongoose.model<IAIGeneration>(
  'AIGeneration',
  aiGenerationSchema,
  'aiGenerations'
);
