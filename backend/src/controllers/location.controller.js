import { CATEGORIES } from '../data/campusData.js';
import { findLocation, listLocations, searchLocations as searchLocationData } from '../services/location.service.js';

/**
 * GET /api/locations
 * Returns all campus locations, optionally filtered by category
 */
export async function getLocations(req, res, next) {
  try {
    const results = await listLocations({ category: req.query.category });
    res.json({
      success: true,
      count: results.length,
      categories: CATEGORIES,
      data: results
    });
  } catch (err) {
    next(err);
  }
}

/**
 * GET /api/locations/:id
 * Returns a specific campus location by ID
 */
export async function getLocationById(req, res, next) {
  try {
    const { id } = req.params;
    const location = await findLocation(id);

    if (!location) {
      return res.status(404).json({ success: false, message: `Location with ID '${id}' was not found.` });
    }

    res.json({
      success: true,
      data: location
    });
  } catch (err) {
    next(err);
  }
}

/**
 * GET /api/locations/search?q=
 * Searches locations matching query against name, category, departments, or tags
 */
export async function searchLocations(req, res, next) {
  try {
    const q = (req.query.q || '').trim().toLowerCase();
    const matches = await searchLocationData(q);

    res.json({
      success: true,
      query: q,
      count: matches.length,
      data: matches
    });
  } catch (err) {
    next(err);
  }
}
