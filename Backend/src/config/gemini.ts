import { GoogleGenerativeAI } from '@google/generative-ai';
import { env } from './env';

export const genAI = new GoogleGenerativeAI(env.geminiApiKey);

export function getGenerativeModel() {
  return genAI.getGenerativeModel({ model: env.geminiModel });
}
