import mongoose from 'mongoose';

const locationSchema = new mongoose.Schema({
  _id: { type: String },
  name: { type: String, required: true, trim: true, index: true },
  shortName: { type: String, trim: true },
  building: { type: String, trim: true, index: true },
  floor: { type: String, trim: true },
  roomNumber: { type: String, trim: true, index: true },
  category: { type: String, required: true, lowercase: true, index: true },
  description: { type: String, trim: true },
  desc: { type: String, trim: true },
  departments: [{ type: String, trim: true }],
  tags: [{ type: String, lowercase: true, trim: true }],
  latitude: Number,
  longitude: Number,
  mapCoords: { x: Number, y: Number },
  image: String,
  openingHours: String,
  openHours: String,
  facilities: [{ type: String, trim: true }],
  accessibility: { type: mongoose.Schema.Types.Mixed },
  juniorTip: String,
  popular: Boolean,
  rating: Number,
  status: { type: String, default: 'open' }
}, { timestamps: true, versionKey: false, collection: 'locations' });

locationSchema.index({ name: 'text', building: 'text', roomNumber: 'text', category: 'text', departments: 'text', tags: 'text', description: 'text', desc: 'text' });

export const Location = mongoose.model('Location', locationSchema);
