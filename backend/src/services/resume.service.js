import { extractTextFromPdf } from './pdfParser.service.js';

/**
 * Service layer: resume domain logic.
 *
 * Sits between the controller and the raw PDF parser. Today it extracts the
 * text and derives a few lightweight, reliable facts (email, phone, links);
 * this is the seam where heavier analysis (skills extraction, AI parsing)
 * would plug in later without touching the HTTP layer.
 */

const EMAIL_REGEX = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
const PHONE_REGEX = /(\+?\d{1,3}[-.\s]?)?(\(?\d{3,4}\)?[-.\s]?)?\d{3,4}[-.\s]?\d{4}/;
const URL_REGEX = /https?:\/\/[^\s)>\]]+/g;

/**
 * Extract content and basic facts from an uploaded resume PDF.
 *
 * @param {{buffer: Buffer, originalname: string, size: number, mimetype: string}} file
 */
export async function extractResumeContent(file) {
  const { text, pageCount } = await extractTextFromPdf(file.buffer);

  const links = text.match(URL_REGEX) ?? [];
  const linkedin = links.find((url) => url.includes('linkedin.com')) ?? null;
  const github = links.find((url) => url.includes('github.com')) ?? null;

  return {
    fileName: file.originalname,
    fileSizeBytes: file.size,
    pageCount,
    extracted: {
      text,
      email: text.match(EMAIL_REGEX)?.[0] ?? null,
      phone: text.match(PHONE_REGEX)?.[0] ?? null,
      links,
      linkedin,
      github,
    },
  };
}
