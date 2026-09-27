import pino from 'pino';
import config from '../config/index.js';

/**
 * Structured JSON logger.
 *
 * JSON logs can be shipped to any log aggregator (Datadog, CloudWatch, ELK)
 * without reformatting. In development we pretty-print for readability.
 */
const logger = pino({
  level: config.env === 'production' ? 'info' : 'debug',
  transport:
    config.env === 'development'
      ? { target: 'pino-pretty', options: { colorize: true } }
      : undefined,
});

export default logger;
