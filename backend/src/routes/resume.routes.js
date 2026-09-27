import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { analyzeResume, extractResume } from '../controllers/resume.controller.js';
import { uploadResume } from '../middlewares/upload.middleware.js';
import config from '../config/index.js';

/**
 * Resume routes.
 *
 * Rate-limited because PDF parsing is CPU-expensive; without a cap, a single
 * client could stall the event loop with a flood of uploads.
 */
const router = Router();

const uploadLimiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.max,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: { code: 'RATE_LIMITED', message: 'Too many uploads. Please slow down and try again.' },
  },
});

// POST /api/resume/extract  — multipart/form-data, field name: "resume"
router.post('/extract', uploadLimiter, uploadResume, extractResume);
router.post('/analyze', uploadLimiter, uploadResume, analyzeResume);

export default router;
