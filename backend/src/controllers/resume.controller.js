import { extractResumeContent } from '../services/resume.service.js';
import AppError from '../utils/AppError.js';
import logger from '../utils/logger.js';

/** PDF files always start with these five bytes: %PDF- */
const PDF_MAGIC_BYTES = Buffer.from([0x25, 0x50, 0x44, 0x46, 0x2d]);

/**
 * Controller layer: translates HTTP into service calls and back.
 * It validates the request shape, delegates all real work to the service
 * layer, and formats the response. No parsing logic lives here.
 */
export async function extractResume(req, res, next) {
  try {
    if (!req.file) {
      throw new AppError(
        'No file was uploaded. Send the PDF as multipart/form-data in the "resume" field.',
        400,
        'FILE_MISSING',
      );
    }

    // MIME types come from the client and can be spoofed, so verify the
    // file signature (magic bytes) before trusting the content.
    if (!req.file.buffer.subarray(0, 5).equals(PDF_MAGIC_BYTES)) {
      throw new AppError(
        'The uploaded file is not a valid PDF.',
        415,
        'INVALID_PDF',
      );
    }

    const result = await extractResumeContent(req.file);

    logger.info(
      { file: result.fileName, pages: result.pageCount, bytes: result.fileSizeBytes },
      'Resume extracted',
    );

    res.status(200).json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
}
