import { Router } from 'express';
import { getAIDirections } from '../controllers/ai.controller.js';

const router = Router();

// POST /api/ai/directions
router.post('/directions', getAIDirections);

export default router;
