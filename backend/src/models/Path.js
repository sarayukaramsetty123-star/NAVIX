import mongoose from 'mongoose';

const pathSchema = new mongoose.Schema({
  from: { type: String, required: true, index: true },
  to: { type: String, required: true, index: true },
  distance: { type: Number, required: true, min: 0 },
  accessibility: { type: mongoose.Schema.Types.Mixed },
  bidirectional: { type: Boolean, default: true }
}, { timestamps: true, versionKey: false, collection: 'paths' });

pathSchema.index({ from: 1, to: 1 }, { unique: true });
export const Path = mongoose.model('Path', pathSchema);
