import { calculateRoute } from '../services/route.service.js';

/**
 * POST /api/routes
 * Body: { startId, destId }
 */
export function getRoute(req, res, next) {
  try {
    const startId = req.query.from || req.query.startId || req.body?.startId;
    const destId = req.query.to || req.query.destId || req.body?.destId;

    if (!startId || !destId) {
      return res.status(400).json({
        success: false,
        message: "Both 'startId' and 'destId' are required."
      });
    }

    const route = calculateRoute(startId, destId);

    res.json({
      success: true,
      data: route
    });
  } catch (err) {
    next(err);
  }
}
