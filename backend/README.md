# Resume Extractor — Backend

Express.js service that extracts text content from an uploaded PDF resume.
Files must be **PDF** and under the configured size limit; both rules are
enforced before parsing. The limit defaults to 5 MB locally and 4 MB on Vercel
to stay below Vercel Functions' request-payload limit.

## Architecture

Layered (controller → service) design, the standard Express pattern:

```
src/
├── config/         All environment variables, validated in one place
├── controllers/    HTTP in/out only — no business logic
├── services/       Domain logic: PDF parsing (pdf.js) + resume extraction
├── middlewares/    Upload (multer), error handling, 404
├── routes/         URL → middleware → controller wiring
├── utils/          Logger, AppError
├── app.js          Express app factory (testable, no port binding)
└── server.js       Entry point: listen + graceful shutdown
```

Files are uploaded into **memory** (never written to disk), so the service is
stateless and safe to scale horizontally.

## Setup

```bash
cd backend
npm install
cp .env.example .env   # create this file manually; values below
npm run dev            # http://localhost:5000
```

### Environment variables

Create a `.env` file (see `.env.example` values):

| Variable               | Default                 | Purpose                          |
| ---------------------- | ----------------------- | -------------------------------- |
| `PORT`                 | `5000`                  | Port to listen on                |
| `CORS_ORIGIN`          | `http://localhost:5173` | Allowed frontend origin(s), comma-separated |
| `MAX_FILE_SIZE_MB`     | `5` locally, `4` on Vercel | Resume size cap                |
| `API_KEY`              | empty                   | OpenRouter API key for AI analysis |
| `OPENROUTER_MODEL`     | `nvidia/nemotron-3-super-120b-a12b:free` | OpenRouter model ID |
| `RATE_LIMIT_WINDOW_MS` | `60000`                 | Rate-limit window                |
| `RATE_LIMIT_MAX`       | `20`                    | Max uploads per window per IP    |

## API

### `POST /api/resume/extract`

Upload a resume and get back its extracted content.

**Request:** `multipart/form-data`, field name **`resume`** (the PDF file).

```bash
curl -F "resume=@/path/to/resume.pdf" http://localhost:5000/api/resume/extract
```

**Response `200`:**

```json
{
  "success": true,
  "data": {
    "fileName": "resume.pdf",
    "fileSizeBytes": 183204,
    "pageCount": 1,
    "extracted": {
      "text": "Jane Doe Senior Software Engineer ...",
      "email": "jane@example.com",
      "phone": "+1 555-123-4567",
      "links": ["https://linkedin.com/in/janedoe"],
      "linkedin": "https://linkedin.com/in/janedoe",
      "github": null
    }
  }
}
```

**Errors** share one shape — `{ "success": false, "error": { "code", "message" } }`:

| Status | Code                    | Cause                              |
| ------ | ----------------------- | ---------------------------------- |
| 400    | `FILE_MISSING`          | No file in the `resume` field      |
| 413    | `LIMIT_FILE_SIZE`       | File over the configured size cap  |
| 415    | `UNSUPPORTED_FILE_TYPE` | Non-PDF MIME type                  |
| 415    | `INVALID_PDF`           | Spoofed MIME type (magic bytes)    |
| 422    | `PDF_PARSE_FAILED`      | Corrupt or password-protected PDF  |
| 422    | `PDF_NO_TEXT`           | Scanned-image PDF (needs OCR)      |
| 429    | `RATE_LIMITED`          | Too many uploads                   |

### `POST /api/resume/analyze`

Send `multipart/form-data` with a PDF field named `resume` and a text field
named `jobDescription`. The backend extracts the PDF text and sends it with the
job description to the configured OpenRouter model. The response includes an
evidence-alignment score, summary, strengths, role-signal tags, prioritized
suggestions with conditional rewrite examples, and an interview angle. The
score is an AI estimate, not a hiring prediction. Resume text is sent to
OpenRouter; review its data policy before using sensitive documents.

For Vercel, configure `API_KEY` in the project's environment variables. Do not
put the key in frontend variables or commit `backend/.env`.

### `GET /api/health`

Liveness probe: `{ "success": true, "data": { "status": "ok", ... } }`.

## From the frontend (Vite/React)

```js
const form = new FormData();
form.append('resume', fileInput.files[0]);

const res = await fetch('http://localhost:5000/api/resume/extract', {
  method: 'POST',
  body: form,
});
const { data } = await res.json();
```

## Notes & next steps

- Scanned-image PDFs (photos of resumes) carry no text layer; extracting them
  requires OCR (e.g. Tesseract), which is intentionally out of scope.
- AI comparison runs in `aiAnalysis.service.js`; the API key stays on the backend.
