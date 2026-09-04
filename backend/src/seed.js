import bcrypt from 'bcryptjs';
import { connectDatabase, isDatabaseConnected } from './config/database.js';
import { Location } from './models/Location.js';
import { User } from './models/User.js';
import { Node } from './models/Node.js';
import { Path } from './models/Path.js';
import { CAMPUS_LOCATIONS } from './data/campusData.js';

await connectDatabase();
if (!isDatabaseConnected()) {
  console.error('Set MONGODB_URI before running the seed command.');
  process.exitCode = 1;
} else {
  const locations = CAMPUS_LOCATIONS.map(location => ({
    ...location,
    _id: location.id,
    building: location.building || location.shortName || location.name,
    floor: location.floor || location.floors,
    description: location.description || location.desc,
    openingHours: location.openingHours || location.openHours,
    facilities: location.facilities || location.departments || [],
    accessibility: location.accessibility || 'Paved wheelchair accessible ramps available at both buildings'
  }));
  await Location.bulkWrite(locations.map(location => ({ updateOne: { filter: { _id: location._id }, update: { $set: location }, upsert: true } })));

  const nodeDocs = locations.map(location => ({ _id: location.id, name: location.name, type: 'building', locationId: location.id, ...location.mapCoords }));
  await Node.bulkWrite(nodeDocs.map(node => ({ updateOne: { filter: { _id: node._id }, update: { $set: node }, upsert: true } })));

  const adminEmail = process.env.SEED_ADMIN_EMAIL || 'admin@navix.local';
  const adminPassword = process.env.SEED_ADMIN_PASSWORD || 'ChangeMe123!';
  await User.updateOne({ email: adminEmail }, { $set: { name: 'NAVIX Administrator', email: adminEmail, role: 'admin', passwordHash: await bcrypt.hash(adminPassword, 12) } }, { upsert: true });
  console.log(`Seeded ${locations.length} locations and an admin account: ${adminEmail}`);
}
process.exit();
