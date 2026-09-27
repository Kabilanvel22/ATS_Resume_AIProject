import dotenv from 'dotenv';
import { fileURLToPath } from 'node:url';

dotenv.config({ path: fileURLToPath(new URL('../../.env', import.meta.url)) });

/**
 * Central configuration.
 *
 * Every environment variable is read and validated here, once. The rest of
 * the application imports from this module instead of touching process.env
 * directly, so a missing or malformed value fails fast at startup with a
 * clear message rather than deep inside a request.
 */

const toInt = (value, fallback) => {
  const parsed = Number.parseInt(value ?? '', 10);
  return Number.isNaN(parsed) ? fallback : parsed;
};

const defaultMaxFileSizeMb = process.env.VERCEL ? 4 : 5;

const config = {
  env: process.env.NODE_ENV ?? 'development',
  port: toInt(process.env.PORT, 5000),
  openRouter: {
    apiKey: process.env.API_KEY ?? '',
    model: process.env.OPENROUTER_MODEL ?? 'nvidia/nemotron-3-super-120b-a12b:free',
  },

  cors: {
    // Comma-separated list, e.g. "http://localhost:5173,https://myapp.com"
    origins: (process.env.CORS_ORIGIN ?? 'http://localhost:5173')
      .split(',')
      .map((origin) => origin.trim())
      .filter(Boolean),
  },

  upload: {
    // Leave room for multipart overhead under Vercel's 4.5 MB request limit.
    maxFileSizeMb: toInt(process.env.MAX_FILE_SIZE_MB, defaultMaxFileSizeMb),
    get maxFileSizeBytes() {
      return this.maxFileSizeMb * 1024 * 1024;
    },
    allowedMimeTypes: ['application/pdf'],
  },

  rateLimit: {
    windowMs: toInt(process.env.RATE_LIMIT_WINDOW_MS, 60_000),
    max: toInt(process.env.RATE_LIMIT_MAX, 20),
  },
};

export default config;
