import jwt from 'jsonwebtoken';
import { config } from '../config/env.js';
import { User } from '../models/User.js';
import { httpError } from '../utils/asyncHandler.js';

export async function requireAuth(req, res, next) {
  try {
    const token = req.headers.authorization?.startsWith('Bearer ')
      ? req.headers.authorization.slice(7)
      : null;
    if (!token) throw httpError(401, 'Authentication required');
    const payload = jwt.verify(token, config.jwtSecret);
    if (payload.demo) {
      req.user = payload;
    } else {
      req.user = await User.findById(payload.sub).lean();
      if (!req.user) throw httpError(401, 'User no longer exists');
    }
    next();
  } catch (error) {
    next(error.statusCode ? error : httpError(401, 'Invalid or expired authentication token'));
  }
}

export function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) return next(httpError(403, 'Administrator access required'));
    next();
  };
}
