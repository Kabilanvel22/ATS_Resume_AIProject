import multer from 'multer';
import AppError from '../utils/AppError.js';
import config from '../config/index.js';
import logger from '../utils/logger.js';

/**
 * Global error-handling middleware (registered LAST in app.js).
 *
 * Every error in the pipeline funnels here and leaves as one consistent
 * shape: { success: false, error: { code, message } }. Multer's own errors
 * (like a file over the size limit) are translated into friendly messages.
 */
// eslint-disable-next-line no-unused-vars -- Express needs the 4-arg signature to treat this as an error handler.
export function errorHandler(err, req, res, _next) {
  if (err instanceof multer.MulterError) {
    const message =
      err.code === 'LIMIT_FILE_SIZE'
        ? `File is too large. Maximum allowed size is ${config.upload.maxFileSizeMb} MB.`
        : `Upload failed: ${err.message}`;
    return res.status(413).json({
      success: false,
      error: { code: err.code, message },
    });
  }

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      error: { code: err.code, message: err.message },
    });
  }

  // Unexpected error: log the details, expose nothing internal.
  logger.error({ err, path: req.path }, 'Unhandled error');
  return res.status(500).json({
    success: false,
    error: { code: 'INTERNAL_ERROR', message: 'Something went wrong on our side.' },
  });
}
