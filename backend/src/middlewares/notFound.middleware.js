/**
 * 404 handler for any route that isn't registered.
 * Keeps the error shape consistent with the global error handler.
 */
export function notFound(req, res) {
  res.status(404).json({
    success: false,
    error: { code: 'NOT_FOUND', message: `Route ${req.method} ${req.path} does not exist.` },
  });
}
