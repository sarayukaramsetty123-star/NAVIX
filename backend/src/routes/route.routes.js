import { Router } from 'express';
import { getRoute } from '../controllers/route.controller.js';

const router = Router();

// GET /api/routes?from=locationId&to=locationId
router.get('/', getRoute);

// POST /api/routes { startId, destId }
router.post('/', getRoute);

export default router;
