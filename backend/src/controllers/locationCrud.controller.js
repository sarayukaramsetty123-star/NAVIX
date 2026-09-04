import { Location } from '../models/Location.js';
import { isDatabaseConnected } from '../config/database.js';
import { listLocations, findLocation, serializeLocation } from '../services/location.service.js';
import { CAMPUS_LOCATIONS } from '../data/campusData.js';
import { httpError } from '../utils/asyncHandler.js';

function validateLocation(body) {
  if (!body.name || !body.category) throw httpError(400, 'Location name and category are required');
}

export async function createLocation(req, res, next) {
  try {
    validateLocation(req.body);
    if (!isDatabaseConnected()) throw httpError(503, 'MongoDB is required for persistent location administration');
    const location = await Location.create({ ...req.body, _id: req.body.id });
    res.status(201).json({ success: true, data: serializeLocation(location) });
  } catch (error) { next(error); }
}

export async function updateLocation(req, res, next) {
  try {
    validateLocation(req.body);
    if (!isDatabaseConnected()) throw httpError(503, 'MongoDB is required for persistent location administration');
    const location = await Location.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).lean();
    if (!location) throw httpError(404, 'Location not found');
    res.json({ success: true, data: serializeLocation(location) });
  } catch (error) { next(error); }
}

export async function deleteLocation(req, res, next) {
  try {
    if (!isDatabaseConnected()) throw httpError(503, 'MongoDB is required for persistent location administration');
    const deleted = await Location.findByIdAndDelete(req.params.id);
    if (!deleted) throw httpError(404, 'Location not found');
    res.json({ success: true, data: { id: req.params.id } });
  } catch (error) { next(error); }
}

export { listLocations, findLocation, CAMPUS_LOCATIONS };
