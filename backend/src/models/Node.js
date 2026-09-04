import mongoose from 'mongoose';

const nodeSchema = new mongoose.Schema({
  _id: { type: String },
  name: { type: String, required: true, trim: true },
  type: { type: String, enum: ['building', 'entrance', 'corridor', 'staircase', 'lift', 'junction', 'classroom', 'lab'], required: true },
  locationId: { type: String, ref: 'Location' },
  latitude: Number,
  longitude: Number,
  accessibility: { type: mongoose.Schema.Types.Mixed }
}, { timestamps: true, versionKey: false, collection: 'nodes' });

export const Node = mongoose.model('Node', nodeSchema);
