import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { pinoHttp } from 'pino-http';
import config from './config/index.js';
import logger from './utils/logger.js';
import resumeRoutes from './routes/resume.routes.js';
import healthRoutes from './routes/health.routes.js';
import { errorHandler } from './middlewares/errorHandler.middleware.js';
import { notFound } from './middlewares/notFound.middleware.js';

/**
 * Express application factory.
 *
 * Keeping app construction separate from server startup (server.js) means
 * tests can import the app and hit it with supertest without binding a port.
 */
export function createApp() {
  const app = express();

  // Security headers (X-Frame-Options, X-Content-Type-Options, etc.)
  app.use(helmet());

  // Restrict cross-origin calls to the known frontend(s).
  app.use(
    cors({
      origin: config.cors.origins,
      methods: ['GET', 'POST'],
    }),
  );

  app.use(express.json());
  app.use(pinoHttp({ logger }));

  // Routes
  app.use('/api', healthRoutes);
  app.use('/api/resume', resumeRoutes);

  // Fallbacks — order matters, these must be last.
  app.use(notFound);
  app.use(errorHandler);

  return app;
}
