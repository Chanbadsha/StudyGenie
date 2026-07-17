import { betterAuth } from 'better-auth';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';
import mongoose from 'mongoose';
import { env } from './env';

const AUTH_BASE_PATH = '/api/v1/auth';

let authInstance: ReturnType<typeof betterAuth> | null = null;

export function getAuth() {
  if (!authInstance) {
    authInstance = betterAuth({
      database: mongodbAdapter(mongoose.connection.db, {
        client: mongoose.connection.getClient(),
        usePlural: true,
      }),
      baseURL: `${env.betterAuthUrl}${AUTH_BASE_PATH}`,
      basePath: AUTH_BASE_PATH,
      emailAndPassword: {
        enabled: true,
      },
      socialProviders: env.googleClientId && env.googleClientSecret
        ? {
            google: {
              clientId: env.googleClientId,
              clientSecret: env.googleClientSecret,
            },
          }
        : undefined,
    });
  }
  return authInstance;
}
