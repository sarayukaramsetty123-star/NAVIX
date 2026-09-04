import { Router } from 'express';
import { listNodes, createNode, listPaths, createPath } from '../controllers/map.controller.js';
import { requireAuth, requireRole } from '../middleware/authMiddleware.js';

const router = Router();
router.get('/nodes', requireAuth, requireRole('admin'), listNodes);
router.post('/nodes', requireAuth, requireRole('admin'), createNode);
router.get('/paths', requireAuth, requireRole('admin'), listPaths);
router.post('/paths', requireAuth, requireRole('admin'), createPath);
export default router;
