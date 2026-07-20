import mongoose from 'mongoose';
import { env } from './config/env';
import app from './app';

let isConnected = false;

export default async function handler(req: any, res: any): Promise<void> {
  try {
    if (!isConnected || mongoose.connection.readyState !== 1) {
      await mongoose.connect(env.mongodbUri, {
        dbName: env.databaseName,
        serverSelectionTimeoutMS: 5000,
        connectTimeoutMS: 10000,
      });
      isConnected = true;
    }
    app(req, res);
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.message || 'Internal server error',
    });
  }
}
