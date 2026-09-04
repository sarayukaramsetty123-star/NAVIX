import { Router } from 'express';
import { getLocations, getLocationById, searchLocations } from '../controllers/location.controller.js';
import { createLocation, updateLocation, deleteLocation } from '../controllers/locationCrud.controller.js';
import { requireAuth, requireRole } from '../middleware/authMiddleware.js';

const router = Router();

// GET /api/locations/search?q=
router.get('/search', searchLocations);

// GET /api/locations
router.get('/', getLocations);

// GET /api/locations/:id
router.get('/:id', getLocationById);

router.post('/', requireAuth, requireRole('admin'), createLocation);
router.put('/:id', requireAuth, requireRole('admin'), updateLocation);
router.delete('/:id', requireAuth, requireRole('admin'), deleteLocation);

export default router;
