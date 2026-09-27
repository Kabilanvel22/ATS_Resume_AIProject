/**
 * Smoke test: boots the app on a random port and exercises the endpoints
 * without needing the server left running. Run with: npm run smoke
 */
process.env.API_KEY = 'smoke-test-api-key';
const { createApp } = await import('../src/app.js');

// A minimal valid-enough PDF: correct header, one page of text "Hello Resume".
// pdf.js needs a real xref table, so we build the bytes with proper offsets.
function buildSamplePdf() {
  const objects = [
    '1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n',
    '2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n',
    '3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>\nendobj\n',
    '4 0 obj\n<< /Length 62 >>\nstream\nBT /F1 24 Tf 72 720 Td (Hello Resume jane@example.com) Tj ET\nendstream\nendobj\n',
    '5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n',
  ];

  let pdf = '%PDF-1.4\n';
  const offsets = [];
  for (const obj of objects) {
    offsets.push(pdf.length);
    pdf += obj;
  }
  const xrefStart = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  for (const off of offsets) {
    pdf += String(off).padStart(10, '0') + ' 00000 n \n';
  }
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF`;
  return Buffer.from(pdf, 'latin1');
}

const app = createApp();
const server = app.listen(0, async () => {
  const base = `http://127.0.0.1:${server.address().port}`;
  let failures = 0;
  const check = (label, actual, expected) => {
    const ok = actual === expected;
    if (!ok) failures++;
    console.log(`${ok ? 'PASS' : 'FAIL'}  ${label}  (expected ${expected}, got ${actual})`);
  };

  // 1. Health check
  const health = await fetch(`${base}/api/health`);
  check('GET /api/health -> 200', health.status, 200);

  // 2. Upload with no file
  const noFile = await fetch(`${base}/api/resume/extract`, { method: 'POST' });
  check('POST extract, no file -> 400', noFile.status, 400);

  // 3. Upload a non-PDF (wrong MIME)
  const form = new FormData();
  form.append('resume', new Blob(['plain text'], { type: 'text/plain' }), 'resume.txt');
  const wrongType = await fetch(`${base}/api/resume/extract`, { method: 'POST', body: form });
  check('POST extract, .txt file -> 415', wrongType.status, 415);

  // 4. Upload a real (tiny) PDF and extract its text
  const pdfForm = new FormData();
  pdfForm.append('resume', new Blob([buildSamplePdf()], { type: 'application/pdf' }), 'resume.pdf');
  const extract = await fetch(`${base}/api/resume/extract`, { method: 'POST', body: pdfForm });
  check('POST extract, valid PDF -> 200', extract.status, 200);
  const body = await extract.json();
  check('extracted text contains sample', body.data?.extracted?.text?.includes('Hello Resume'), true);
  check('extracted email found', body.data?.extracted?.email, 'jane@example.com');

  // 5. Resume and job description analysis using a mocked OpenRouter response.
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (_url, options) => {
    check('OpenRouter API key stays in backend request', options.headers.Authorization, 'Bearer smoke-test-api-key');
    const requestBody = JSON.parse(options.body);
    check('selected OpenRouter model is used', requestBody.model, 'nvidia/nemotron-3-super-120b-a12b:free');
    check('OpenRouter JSON mode enabled', requestBody.response_format?.type, 'json_object');
    const modelReport = {
      score: '82/100',
      keywords: [{ term: 'Node.js', status: 'found' }],
      suggestions: [{ title: 'Add scale details', reason: 'Clarify request volume.' }],
    };
    return new Response(JSON.stringify({
      choices: [{
        message: {
          content: `Analysis complete.\n\`\`\`json\n${JSON.stringify(modelReport)}\n\`\`\``,
        },
      }],
    }), { status: 200, headers: { 'content-type': 'application/json' } });
  };

  const analysisForm = new FormData();
  analysisForm.append('resume', new Blob([buildSamplePdf()], { type: 'application/pdf' }), 'resume.pdf');
  analysisForm.append('jobDescription', 'Node.js API engineering experience');
  const analysisResponse = await originalFetch(`${base}/api/resume/analyze`, { method: 'POST', body: analysisForm });
  check('POST analyze, valid resume and job description -> 200', analysisResponse.status, 200);
  const analysisBody = await analysisResponse.json();
  check('analysis score returned', analysisBody.data?.analysis?.score, 82);
  check('model status synonym normalized', analysisBody.data?.analysis?.keywords?.[0]?.status, 'matched');
  check('missing summary receives fallback', Boolean(analysisBody.data?.analysis?.summary), true);
  check('missing suggestion priority receives fallback', analysisBody.data?.analysis?.suggestions?.[0]?.priority, 'medium');
  check('analysis suggestions returned', analysisBody.data?.analysis?.suggestions?.length, 1);
  globalThis.fetch = originalFetch;

  // 6. Unknown route
  const missing = await fetch(`${base}/api/nope`);
  check('GET unknown route -> 404', missing.status, 404);

  server.close();
  console.log(failures === 0 ? '\nAll smoke tests passed.' : `\n${failures} test(s) failed.`);
  process.exit(failures === 0 ? 0 : 1);
});
