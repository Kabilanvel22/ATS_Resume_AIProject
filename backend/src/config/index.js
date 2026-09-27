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

const config = {
  env: process.env.NODE_ENV ?? 'development',
  port: toInt(process.env.PORT, 5000),

  cors: {
    // Comma-separated list, e.g. "http://localhost:5173,https://myapp.com"
    origins: (process.env.CORS_ORIGIN ?? 'http://localhost:5173')
      .split(',')
      .map((origin) => origin.trim())
      .filter(Boolean),
  },

  upload: {
    // Hard business rule: resumes must be PDFs under 5 MB.
    maxFileSizeMb: toInt(process.env.MAX_FILE_SIZE_MB, 5),
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
