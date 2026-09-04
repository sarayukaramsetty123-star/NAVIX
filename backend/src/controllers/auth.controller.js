import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { isDatabaseConnected } from '../config/database.js';
import { config } from '../config/env.js';
import { httpError } from '../utils/asyncHandler.js';

const memoryUsers = new Map();

function issueToken(user) {
  return jwt.sign({ sub: user.id || user._id, name: user.name, role: user.role, email: user.email, ...(user.demo ? { demo: true } : {}) }, config.jwtSecret, { expiresIn: config.jwtExpiresIn });
}

function publicUser(user) {
  return { id: user.id || user._id, name: user.name, email: user.email, role: user.role };
}

export async function register(req, res, next) {
  try {
    const { name, email, password, role = 'student' } = req.body;
    if (!name || !email || !password) throw httpError(400, 'Name, email, and password are required');
    if (password.length < 8) throw httpError(400, 'Password must be at least 8 characters');
    if (!['student', 'faculty'].includes(role)) throw httpError(400, 'Public registration supports student or faculty roles');
    const normalizedEmail = email.toLowerCase().trim();
    if (isDatabaseConnected()) {
      if (await User.exists({ email: normalizedEmail })) throw httpError(409, 'Email is already registered');
      const user = await User.create({ name, email: normalizedEmail, role, passwordHash: await bcrypt.hash(password, 12) });
      return res.status(201).json({ success: true, data: { user: publicUser(user), token: issueToken(user) } });
    }
    if (memoryUsers.has(normalizedEmail)) throw httpError(409, 'Email is already registered');
    const user = { id: `memory-${memoryUsers.size + 1}`, name, email: normalizedEmail, role, passwordHash: await bcrypt.hash(password, 12), demo: true };
    memoryUsers.set(normalizedEmail, user);
    return res.status(201).json({ success: true, data: { user: publicUser(user), token: issueToken(user) } });
  } catch (error) { next(error); }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const normalizedEmail = email?.toLowerCase().trim();
    const user = isDatabaseConnected() ? await User.findOne({ email: normalizedEmail }).select('+passwordHash') : memoryUsers.get(normalizedEmail);
    if (!user || !(await bcrypt.compare(password || '', user.passwordHash))) throw httpError(401, 'Invalid email or password');
    res.json({ success: true, data: { user: publicUser(user), token: issueToken(user) } });
  } catch (error) { next(error); }
}

export async function me(req, res) {
  res.json({ success: true, data: { user: publicUser(req.user) } });
}
