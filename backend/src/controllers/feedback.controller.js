import { Feedback } from '../models/Feedback.js';
import { isDatabaseConnected } from '../config/database.js';
import { httpError } from '../utils/asyncHandler.js';

const memoryFeedback = [];

export async function createFeedback(req, res, next) {
  try {
    const { type, message, locationId } = req.body;
    if (!['wrong_location', 'wrong_route', 'missing_building', 'wrong_room', 'general'].includes(type)) throw httpError(400, 'Invalid feedback type');
    if (!message?.trim()) throw httpError(400, 'Feedback message is required');
    const data = { type, message: message.trim(), locationId, userId: req.user._id || req.user.id };
    const feedback = isDatabaseConnected() ? await Feedback.create(data) : { id: `feedback-${memoryFeedback.length + 1}`, ...data, status: 'open', createdAt: new Date().toISOString() };
    if (!isDatabaseConnected()) memoryFeedback.push(feedback);
    res.status(201).json({ success: true, data: feedback });
  } catch (error) { next(error); }
}

export async function listFeedback(req, res, next) {
  try {
    const data = isDatabaseConnected() ? await Feedback.find().sort({ createdAt: -1 }).lean() : [...memoryFeedback].reverse();
    res.json({ success: true, count: data.length, data });
  } catch (error) { next(error); }
}

export async function updateFeedback(req, res, next) {
  try {
    if (!['open', 'reviewing', 'resolved'].includes(req.body.status)) throw httpError(400, 'Invalid feedback status');
    if (!isDatabaseConnected()) {
      const feedback = memoryFeedback.find(item => item.id === req.params.id);
      if (!feedback) throw httpError(404, 'Feedback not found');
      feedback.status = req.body.status;
      return res.json({ success: true, data: feedback });
    }
    const feedback = await Feedback.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true }).lean();
    if (!feedback) throw httpError(404, 'Feedback not found');
    res.json({ success: true, data: feedback });
  } catch (error) { next(error); }
}
