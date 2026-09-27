import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs';
import AppError from '../utils/AppError.js';

/**
 * Service layer: PDF text extraction.
 *
 * Uses Mozilla's PDF.js (pdfjs-dist) to parse the PDF entirely in memory —
 * no temporary files on disk, which keeps the service stateless and avoids
 * a whole class of cleanup and disk-fill bugs.
 */

/** Convert raw PDF bytes into a Uint8Array pdf.js can read. */
const toUint8 = (buffer) => new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.byteLength);

/**
 * Extract the full text of a PDF, page by page.
 *
 * @param {Buffer} buffer  The uploaded PDF as an in-memory buffer.
 * @returns {Promise<{text: string, pageCount: number, pages: Array<{page: number, text: string}>}>}
 */
export async function extractTextFromPdf(buffer) {
  let pdf;
  try {
    pdf = await getDocument({
      data: toUint8(buffer),
      // We only need the text layer; skip images/fonts loading where possible.
      isEvalSupported: false,
      useSystemFonts: true,
    }).promise;
  } catch {
    throw new AppError(
      'The uploaded file could not be read as a PDF. It may be corrupted or password-protected.',
      422,
      'PDF_PARSE_FAILED',
    );
  }

  const pages = [];
  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
    const page = await pdf.getPage(pageNumber);
    const content = await page.getTextContent();
    const text = content.items
      .map((item) => ('str' in item ? item.str : ''))
      .join(' ')
      .replace(/\s+/g, ' ')
      .trim();
    pages.push({ page: pageNumber, text });
  }

  const fullText = pages
    .map((p) => p.text)
    .filter(Boolean)
    .join('\n');

  if (fullText.length === 0) {
    throw new AppError(
      'No readable text was found in this PDF. Scanned-image resumes need OCR, which this service does not perform.',
      422,
      'PDF_NO_TEXT',
    );
  }

  return { text: fullText, pageCount: pdf.numPages, pages };
}
