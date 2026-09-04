import mongoose from 'mongoose';
import { config } from './env.js';

export async function connectDatabase() {
  if (!config.mongodbUri) {
    console.warn('[Database] MONGODB_URI is not configured; using in-memory campus data.');
    return false;
  }

  await mongoose.connect(config.mongodbUri);
  console.log('[Database] MongoDB connected');
  return true;
}

export function isDatabaseConnected() {
  return mongoose.connection.readyState === 1;
}
