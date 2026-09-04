import { Location } from '../models/Location.js';
import { isDatabaseConnected } from '../config/database.js';
import { CAMPUS_LOCATIONS } from '../data/campusData.js';

export function serializeLocation(location) {
  if (!location) return location;
  const value = typeof location.toObject === 'function' ? location.toObject() : { ...location };
  if (value._id && !value.id) value.id = value._id;
  delete value._id;
  value.description ||= value.desc || '';
  value.openingHours ||= value.openHours || '';
  value.facilities ||= [];
  value.accessibility ||= 'Paved wheelchair accessible ramps available at both buildings';
  return value;
}

export async function listLocations(filters = {}) {
  if (isDatabaseConnected()) {
    const query = {};
    if (filters.category) query.category = filters.category.toLowerCase();
    const locations = await Location.find(query).sort({ name: 1 }).lean();
    return locations.map(serializeLocation);
  }
  return CAMPUS_LOCATIONS.filter(location => !filters.category || location.category.toLowerCase() === filters.category.toLowerCase()).map(serializeLocation);
}

export async function findLocation(id) {
  if (isDatabaseConnected()) return serializeLocation(await Location.findById(id).lean());
  return serializeLocation(CAMPUS_LOCATIONS.find(location => location.id.toLowerCase() === id.toLowerCase()));
}

export async function searchLocations(query) {
  const normalized = query.trim().toLowerCase();
  if (isDatabaseConnected()) {
    if (!normalized) return [];
    const locations = await Location.find({ $text: { $search: normalized } }).limit(50).lean();
    return locations.map(serializeLocation);
  }
  if (!normalized) return [];
  return CAMPUS_LOCATIONS.filter(location => [location.name, location.shortName, location.building, location.roomNumber, location.category, location.description, location.desc, ...(location.departments || []), ...(location.tags || [])]
    .filter(Boolean).some(value => String(value).toLowerCase().includes(normalized))).map(serializeLocation);
}
