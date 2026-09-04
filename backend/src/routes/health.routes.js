import { Router } from 'express';

const router = Router();

/**
 * GET /api/health
 * Returns service status, uptime, and system metadata
 */
router.get('/', (req, res) => {
  res.json({
    status: 'ok',
    service: 'snist-campus-navigator-api',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    uptime: Math.round(process.uptime()),
    environment: process.env.NODE_ENV || 'development'
  });
});

export default router;
