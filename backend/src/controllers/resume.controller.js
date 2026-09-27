import { extractResumeContent } from '../services/resume.service.js';
import { analyzeResumeAgainstJob } from '../services/aiAnalysis.service.js';
import AppError from '../utils/AppError.js';
import logger from '../utils/logger.js';

/** PDF files always start with these five bytes: %PDF- */
const PDF_MAGIC_BYTES = Buffer.from([0x25, 0x50, 0x44, 0x46, 0x2d]);
const MAX_JOB_DESCRIPTION_LENGTH = 12_000;

function validateResumeFile(file) {
  if (!file) {
    throw new AppError(
      'No file was uploaded. Send the PDF as multipart/form-data in the "resume" field.',
      400,
      'FILE_MISSING',
    );
  }

  if (!file.buffer.subarray(0, 5).equals(PDF_MAGIC_BYTES)) {
    throw new AppError('The uploaded file is not a valid PDF.', 415, 'INVALID_PDF');
  }
}

/**
 * Controller layer: translates HTTP into service calls and back.
 * It validates the request shape, delegates all real work to the service
 * layer, and formats the response. No parsing logic lives here.
 */
export async function extractResume(req, res, next) {
  try {
    // MIME types come from the client and can be spoofed, so verify the
    // file signature (magic bytes) before trusting the content.
    validateResumeFile(req.file);

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

export async function analyzeResume(req, res, next) {
  try {
    validateResumeFile(req.file);

    const jobDescription = req.body.jobDescription?.trim();
    if (!jobDescription) {
      throw new AppError('Add the job description you want to compare against.', 400, 'JOB_DESCRIPTION_MISSING');
    }
    if (jobDescription.length > MAX_JOB_DESCRIPTION_LENGTH) {
      throw new AppError('The job description must be 12,000 characters or fewer.', 413, 'JOB_DESCRIPTION_TOO_LONG');
    }

    const resume = await extractResumeContent(req.file);
    const analysis = await analyzeResumeAgainstJob(resume.extracted.text, jobDescription);

    logger.info(
      { file: resume.fileName, pages: resume.pageCount, score: analysis.score },
      'Resume and job description analyzed',
    );

    res.status(200).json({
      success: true,
      data: {
        resume: { fileName: resume.fileName, fileSizeBytes: resume.fileSizeBytes, pageCount: resume.pageCount },
        analysis,
      },
    });
  } catch (err) {
    next(err);
  }
}
