import { Router } from 'express';
import { listUsers } from '../controllers/user.controller.js';
import { requireAuth, requireRole } from '../middleware/authMiddleware.js';

const router = Router();
router.get('/users', requireAuth, requireRole('admin'), listUsers);
export default router;
