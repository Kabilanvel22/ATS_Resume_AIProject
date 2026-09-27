import { createApp } from './app.js';
import config from './config/index.js';
import logger from './utils/logger.js';

/**
 * Entry point: builds the app, binds the port, and shuts down cleanly.
 */
const app = createApp();

const server = app.listen(config.port, () => {
  logger.info({ port: config.port, env: config.env }, 'Resume extractor API is running');
});

// Graceful shutdown: stop accepting new connections, let in-flight ones
// finish, then exit. Containers and process managers rely on this.
const shutdown = (signal) => {
  logger.info({ signal }, 'Shutdown signal received');
  server.close(() => {
    logger.info('HTTP server closed');
    process.exit(0);
  });
  // Force-exit if connections don't drain in time.
  setTimeout(() => process.exit(1), 10_000).unref();
};

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
