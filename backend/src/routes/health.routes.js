import { Router } from 'express';

/**
 * Liveness/readiness probe for load balancers, Docker HEALTHCHECK, and uptime
 * monitors. Deliberately unauthenticated and cheap.
 */
const router = Router();

router.get('/health', (_req, res) => {
  res.status(200).json({
    success: true,
    data: { status: 'ok', uptime: process.uptime(), timestamp: new Date().toISOString() },
  });
});

export default router;
