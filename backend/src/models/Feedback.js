import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
  type: { type: String, enum: ['wrong_location', 'wrong_route', 'missing_building', 'wrong_room', 'general'], required: true },
  message: { type: String, required: true, trim: true, maxlength: 2000 },
  locationId: { type: String, ref: 'Location' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: { type: String, enum: ['open', 'reviewing', 'resolved'], default: 'open', index: true }
}, { timestamps: true, versionKey: false });

export const Feedback = mongoose.model('Feedback', feedbackSchema);
