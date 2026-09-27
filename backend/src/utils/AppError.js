/**
 * Application error type.
 *
 * Throwing an AppError anywhere in the request pipeline is how we signal an
 * expected failure (bad input, oversized file, unparseable PDF). The global
 * error handler turns it into a clean JSON response with the right status
 * code, while unexpected errors become a generic 500.
 */
class AppError extends Error {
  /**
   * @param {string} message  Human-readable, safe to show to the client.
   * @param {number} statusCode  HTTP status code.
   * @param {string} code  Machine-readable error code for API consumers.
   */
  constructor(message, statusCode = 500, code = 'INTERNAL_ERROR') {
    super(message);
    this.name = 'AppError';
    this.statusCode = statusCode;
    this.code = code;
    this.isOperational = true;
  }
}

export default AppError;
