import dotenv from 'dotenv';

dotenv.config();

interface EnvConfig {
  nodeEnv: string;
  port: number;
  clientUrl: string;
  mongodbUri: string;
  databaseName: string;
  betterAuthSecret: string;
  betterAuthUrl: string;
  googleClientId: string;
  googleClientSecret: string;
  geminiApiKey: string;
  geminiModel: string;
}

const requiredVars = [
  'PORT',
  'CLIENT_URL',
  'MONGODB_URI',
  'DATABASE_NAME',
  'BETTER_AUTH_SECRET',
  'BETTER_AUTH_URL',
  'GEMINI_API_KEY',
];

for (const varName of requiredVars) {
  if (!process.env[varName]) {
    throw new Error(`Missing required environment variable: ${varName}`);
  }
}

export const env: EnvConfig = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '5000', 10),
  clientUrl: process.env.CLIENT_URL!,
  mongodbUri: process.env.MONGODB_URI!,
  databaseName: process.env.DATABASE_NAME!,
  betterAuthSecret: process.env.BETTER_AUTH_SECRET!,
  betterAuthUrl: process.env.BETTER_AUTH_URL!,
  googleClientId: process.env.GOOGLE_CLIENT_ID || '',
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
  geminiApiKey: process.env.GEMINI_API_KEY!,
  geminiModel: process.env.GEMINI_MODEL || 'gemini-2.5-flash',
};
