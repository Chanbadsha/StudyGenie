import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { env } from './config/env';
import routes from './routes/index';
import { errorHandler } from './middlewares/error.middleware';
import { notFoundHandler } from './middlewares/not-found.middleware';

const app = express();

app.use(helmet());
app.use(cors({
  origin: env.clientUrl,
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', routes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
