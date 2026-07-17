import app from './app';
import { env } from './config/env';
import { connectDatabase } from './config/database';
import { logger } from './utils/logger';

async function start(): Promise<void> {
  logger.info('Starting server...');

  await connectDatabase();

  app.listen(env.port, () => {
    logger.info(`Server running on http://localhost:${env.port}`);
    logger.info(`Health check: http://localhost:${env.port}/api/v1/health`);
  });
}

start().catch((error) => {
  logger.error('Failed to start server', error);
  process.exit(1);
});
