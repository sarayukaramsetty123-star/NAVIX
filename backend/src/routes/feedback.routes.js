import { Router } from 'express';
import { createFeedback, listFeedback, updateFeedback } from '../controllers/feedback.controller.js';
import { requireAuth, requireRole } from '../middleware/authMiddleware.js';

const router = Router();
router.post('/', requireAuth, createFeedback);
router.get('/', requireAuth, requireRole('admin'), listFeedback);
router.put('/:id', requireAuth, requireRole('admin'), updateFeedback);
export default router;
