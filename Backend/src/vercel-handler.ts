import mongoose from 'mongoose';
import { env } from './config/env';
import app from './app';

let isConnected = false;

export default async function handler(req: any, res: any): Promise<void> {
  if (!isConnected || mongoose.connection.readyState !== 1) {
    await mongoose.connect(env.mongodbUri, { dbName: env.databaseName });
    isConnected = true;
  }
  app(req, res);
}
