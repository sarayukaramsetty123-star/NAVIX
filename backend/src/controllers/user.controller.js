import { User } from '../models/User.js';
import { isDatabaseConnected } from '../config/database.js';
import { httpError } from '../utils/asyncHandler.js';

export async function listUsers(req, res, next) {
  try {
    if (!isDatabaseConnected()) throw httpError(503, 'MongoDB is required to list registered users');
    const users = await User.find().sort({ createdAt: -1 }).lean();
    res.json({ success: true, count: users.length, data: users.map(({ passwordHash, ...user }) => user) });
  } catch (error) { next(error); }
}
