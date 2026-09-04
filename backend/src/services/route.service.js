import { CAMPUS_LOCATIONS } from '../data/campusData.js';

/**
 * Calculates a walking route between two campus locations
 * @param {string} startId
 * @param {string} destId
 * @returns {object} Route details including turn-by-turn steps, distance, and duration
 */
export function calculateRoute(startId, destId) {
  if (!startId || !destId) {
    throw new Error('Both startId and destId are required to calculate a route');
  }

  const start = CAMPUS_LOCATIONS.find(l => l.id === startId);
  const dest = CAMPUS_LOCATIONS.find(l => l.id === destId);

  if (!start) {
    const error = new Error(`Starting location '${startId}' not found`);
    error.statusCode = 404;
    throw error;
  }

  if (!dest) {
    const error = new Error(`Destination location '${destId}' not found`);
    error.statusCode = 404;
    throw error;
  }

  if (startId === destId) {
    return {
      sameLocation: true,
      start,
      destination: dest,
      distanceMeters: 0,
      walkTimeMinutes: 0,
      steps: [
        {
          title: 'Already at your destination',
          desc: `You are currently situated at ${start.name}.`,
          landmark: 'Current Location'
        }
      ],
      accessibility: 'Accessible',
      fresherTip: start.juniorTip
    };
  }

  // Calculate Euclidean distance scaled to real-world campus meters
  const dx = dest.mapCoords.x - start.mapCoords.x;
  const dy = dest.mapCoords.y - start.mapCoords.y;
  const pixelDist = Math.hypot(dx, dy);
  const distanceMeters = Math.max(50, Math.round(pixelDist * 0.75));
  const walkTimeMinutes = Math.max(1, Math.round(distanceMeters / 70));

  // Determine compass bearing
  let direction = '';
  if (Math.abs(dy) > Math.abs(dx)) {
    direction = dy < 0 ? 'North (towards upper academic quad)' : 'South (towards main entrance & bus bay)';
  } else {
    direction = dx > 0 ? 'East (towards sports complex & canteens)' : 'West (towards workshops & hostels)';
  }

  // Step-by-step turn-by-turn path generation
  const steps = [
    {
      title: `Depart from ${start.shortName}`,
      desc: `Exit the main doorway of ${start.shortName} and take the paved pedestrian walkway.`,
      landmark: `Near ${start.shortName}`
    }
  ];

  if (start.id === 'main-gate') {
    steps.push({
      title: 'Pass Central Entrance Fountain & Admin Quadrangle',
      desc: 'Walk straight past security along the palm-lined main avenue towards the central rotary.',
      landmark: 'Palm Avenue & Fountain'
    });
  } else if (start.mapCoords.y > 600 && dest.mapCoords.y < 500) {
    steps.push({
      title: 'Walk past Admin Gardens towards Central Circle',
      desc: 'Follow the shaded walkway northwards past the Admin gardens towards the quadrangle center.',
      landmark: 'Admin Block Lawns'
    });
  }

  if (dest.id === 'titanic-block') {
    steps.push({
      title: 'Approach Titanic Block plaza',
      desc: `Head ${direction}. The distinctive ship-shaped bow of the Titanic Block is straight ahead.`,
      landmark: 'Titanic Main Plaza'
    });
    steps.push({
      title: 'Enter Titanic Block Ground Floor',
      desc: 'Enter through the central glass entrance. Elevators and main stairs are located in the lobby atrium.',
      landmark: 'Titanic Atrium'
    });
  } else if (dest.id === 'central-library') {
    steps.push({
      title: 'Walk along the Library Gardens',
      desc: 'Turn right at the central junction onto the paved walkway leading directly towards the Central Library facade.',
      landmark: 'Library Quadrangle'
    });
    steps.push({
      title: 'Arrival at Central Library Entrance',
      desc: 'Tap your SNIST student RFID badge at the entrance turnstiles to enter.',
      landmark: 'Library Turnstiles'
    });
  } else if (dest.id === 'main-canteen' || dest.id === 'maggi-point') {
    steps.push({
      title: `Follow the pathway towards ${dest.shortName}`,
      desc: `Proceed towards the student activity zone. Look out for the outdoor shaded canopies.`,
      landmark: 'Food Court Plaza'
    });
    steps.push({
      title: `Arrive at ${dest.shortName}`,
      desc: `You have reached ${dest.name}. Token counters and UPI payment stands are in the main lobby.`,
      landmark: dest.shortName
    });
  } else {
    steps.push({
      title: `Continue ${direction} towards ${dest.shortName}`,
      desc: `Follow the marked directional signboards along the paved corridor. Pass through the connecting courtyard.`,
      landmark: `Courtyard outside ${dest.shortName}`
    });
    steps.push({
      title: `Arrive at ${dest.shortName}`,
      desc: `You have reached ${dest.name}. ${dest.juniorTip}`,
      landmark: dest.shortName
    });
  }

  return {
    sameLocation: false,
    start,
    destination: dest,
    distanceMeters,
    walkTimeMinutes,
    direction,
    steps,
    fresherTip: dest.juniorTip,
    accessibility: 'Paved wheelchair accessible ramps available at both buildings'
  };
}
