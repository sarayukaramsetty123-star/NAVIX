import { generateAIDirections } from '../services/ai.service.js';

/**
 * POST /api/ai/directions
 * Body: { startId, destId, preferences: { avoidStairs, needElevator, isRaining } }
 */
export async function getAIDirections(req, res, next) {
  try {
    const { startId, destId, preferences = {} } = req.body;

    if (!startId || !destId) {
      return res.status(400).json({
        success: false,
        error: "Both 'startId' and 'destId' are required in request body."
      });
    }

    const aiResult = await generateAIDirections(startId, destId, preferences);

    res.json({
      success: true,
      data: aiResult
    });
  } catch (err) {
    next(err);
  }
}
