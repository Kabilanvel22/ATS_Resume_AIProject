import multer from 'multer';
import config from '../config/index.js';
import AppError from '../utils/AppError.js';

/**
 * Multer setup for resume uploads.
 *
 * Two deliberate choices:
 *  1. memoryStorage — the PDF stays in RAM as a Buffer, never touching disk.
 *     The service stays stateless and there's nothing to clean up.
 *  2. limits.fileSize — Multer rejects anything over 5 MB before the handler
 *     runs, so a large upload never reaches the parser.
 *
 * The fileFilter rejects non-PDFs by MIME type up front; the controller
 * double-checks the magic bytes because MIME types are client-supplied and
 * can lie.
 */
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: config.upload.maxFileSizeBytes,
    files: 1,
  },
  fileFilter: (_req, file, callback) => {
    if (!config.upload.allowedMimeTypes.includes(file.mimetype)) {
      callback(
        new AppError('Only PDF files are accepted.', 415, 'UNSUPPORTED_FILE_TYPE'),
      );
      return;
    }
    callback(null, true);
  },
});

/** Single-file upload middleware for the "resume" form field. */
export const uploadResume = upload.single('resume');
