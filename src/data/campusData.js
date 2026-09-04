// NAVIX Campus Navigator Data
// Locations, categories, coordinates, and turn-by-turn guidance

export const CATEGORIES = [
  { id: 'academic', name: 'Academic Blocks', icon: 'graduation-cap', color: 'blue', count: 6, desc: 'Engineering department blocks & lecture halls' },
  { id: 'labs', name: 'Labs', icon: 'flask-conical', color: 'emerald', count: 5, desc: 'CSE, AI/ML, ECE, Mechanical & Science labs' },
  { id: 'classrooms', name: 'Classrooms', icon: 'book-open', color: 'indigo', count: 4, desc: '1st year tutorial halls, smart seminar halls' },
  { id: 'library', name: 'Library', icon: 'library', color: 'amber', count: 2, desc: 'Central Library & Digital Knowledge Center' },
  { id: 'canteens', name: 'Canteens', icon: 'utensils', color: 'orange', count: 4, desc: 'Main Canteen, Food Court, Maggi Point & Cafes' },
  { id: 'hostels', name: 'Hostels', icon: 'home', color: 'purple', count: 3, desc: 'Boys Hostels, Girls Hostels & Mess' },
  { id: 'sports', name: 'Sports', icon: 'trophy', color: 'red', count: 4, desc: 'Indoor Stadium, Cricket ground, Basketball & Gym' },
  { id: 'facilities', name: 'Other Facilities', icon: 'building-2', color: 'teal', count: 5, desc: 'Admin block, Health center, Bus bay & Bank/ATM' }
];

export const CAMPUS_LOCATIONS = [
  {
    id: 'main-gate',
    name: 'Main Campus Gate & Security',
    shortName: 'Main Gate',
    category: 'facilities',
    floors: 'Ground level',
    departments: ['Campus Security', 'Visitor Pass Desk'],
    openHours: 'Open 24/7',
    popular: false,
    rating: 4.8,
    mapCoords: { x: 500, y: 880 }, // bottom center of campus
    desc: 'The primary entrance to SNIST campus from Ghatkesar main road. Security check and bus arrival point.',
    juniorTip: 'Keep your SNIST student ID badge visible when entering. Bus passes are checked at the right booth.',
    tags: ['entrance', 'security', 'gate', 'bus']
  },
  {
    id: 'titanic-block',
    name: 'Titanic Block (CSE & IT Departments)',
    shortName: 'Titanic Block',
    category: 'academic',
    floors: '4 Floors (Ground + 3)',
    departments: ['Computer Science & Engineering', 'Information Technology', 'AI & Machine Learning', 'Data Science'],
    openHours: '8:30 AM - 5:30 PM',
    popular: true,
    rating: 4.9,
    mapCoords: { x: 420, y: 460 },
    desc: 'The iconic flagship building of SNIST, famously known among students for resembling a ship from aerial view. Houses CSE, IT, Dean offices, and server rooms.',
    juniorTip: 'First-year programming labs are located on the 1st floor North wing. The central staircase gets busy between periods; use the west staircase for quick access.',
    tags: ['cse', 'it', 'coding', 'titanic', 'aiml', 'computer']
  },
  {
    id: 'central-library',
    name: 'Central Library & Digital Knowledge Hub',
    shortName: 'Central Library',
    category: 'library',
    floors: '3 Floors',
    departments: ['Reference Section', 'Circulation Counter', 'Digital e-Library', 'Quiet Study Halls'],
    openHours: '8:00 AM - 8:00 PM',
    popular: true,
    rating: 4.9,
    mapCoords: { x: 620, y: 530 },
    desc: 'Massive multi-level repository of technical books, IEEE journals, high-speed Wi-Fi, and air-conditioned discussion rooms.',
    juniorTip: 'Bring your ID card for biometric check-in. The top floor has individual cubicles with charging sockets ideal for mid-term exam prep.',
    tags: ['books', 'study', 'quiet', 'digital', 'journal', 'wifi']
  },
  {
    id: 'main-canteen',
    name: 'Main Canteen & Student Food Court',
    shortName: 'Main Canteen',
    category: 'canteens',
    floors: '2 Floors (Ground + Mezzanine)',
    departments: ['South Indian Meals & Tiffins', 'Chinese & Fast Food', 'Fruit Juice Counter', 'Bakery'],
    openHours: '7:30 AM - 6:30 PM',
    popular: true,
    rating: 4.7,
    mapCoords: { x: 740, y: 640 },
    desc: 'The bustling social hub of SNIST. Serves hot dosas, samosas, thalis, cold coffee, and snacks.',
    juniorTip: 'Token counters get crowded around 12:45 PM lunch break. You can purchase tokens 10 minutes early or use UPI scan at the fast queue.',
    tags: ['food', 'lunch', 'tea', 'canteen', 'meals', 'tiffin']
  },
  {
    id: 'maggi-point',
    name: 'Maggi Point & Refreshment Kiosk',
    shortName: 'Maggi Point',
    category: 'canteens',
    floors: 'Open Air Gazebo',
    departments: ['Snacks & Hot Beverages', 'Chai & Coffee', 'Maggi & Sandwiches'],
    openHours: '9:00 AM - 7:00 PM',
    popular: true,
    rating: 4.8,
    mapCoords: { x: 310, y: 580 },
    desc: 'Beloved student hangout shaded by neem trees. Famous for butter cheese Maggi, ginger tea, and quick snack breaks between lectures.',
    juniorTip: 'Great spot to chill after lab sessions. Keep small change or UPI ready!',
    tags: ['maggi', 'snack', 'tea', 'hangout', 'kiosk']
  },
  {
    id: 'admin-block',
    name: 'Administrative Block & Principal Office',
    shortName: 'Admin Block',
    category: 'facilities',
    floors: '3 Floors',
    departments: ['Principal Office', 'Academic Cell', 'Examination Branch', 'Fee & Accounts Section', 'Placement Cell'],
    openHours: '9:00 AM - 5:00 PM',
    popular: true,
    rating: 4.6,
    mapCoords: { x: 500, y: 720 },
    desc: 'Central administration building right past the entrance fountain. Handles fee payments, hall tickets, bonafide certificates, and placements.',
    juniorTip: 'Exam Branch counters for hall tickets and grade sheets are on the Ground Floor right wing. Bonafide forms are issued at Window 2.',
    tags: ['admin', 'principal', 'fees', 'certificates', 'exam', 'placements']
  },
  {
    id: 'ece-eee-block',
    name: 'Visvesvaraya Block (ECE & EEE)',
    shortName: 'Visvesvaraya Block',
    category: 'academic',
    floors: '4 Floors',
    departments: ['Electronics & Communication', 'Electrical & Electronics', 'Signal Processing Lab'],
    openHours: '8:30 AM - 5:30 PM',
    popular: true,
    rating: 4.5,
    mapCoords: { x: 670, y: 380 },
    desc: 'Home of the circuit branches. Equipped with modern VLSI, DSP, Microprocessor, and Circuit Simulation laboratories.',
    juniorTip: 'The bridge walkway connects Visvesvaraya Block 2nd floor directly to Ramanujan Block.',
    tags: ['ece', 'eee', 'circuits', 'vlsi', 'electronics']
  },
  {
    id: 'mech-civil-block',
    name: 'Ramanujan Block (Mechanical & Civil)',
    shortName: 'Ramanujan Block',
    category: 'academic',
    floors: '3 Floors + Heavy Workshop',
    departments: ['Mechanical Engineering', 'Civil Engineering', 'CAD/CAM Center'],
    openHours: '8:30 AM - 5:30 PM',
    popular: false,
    rating: 4.4,
    mapCoords: { x: 310, y: 350 },
    desc: 'Houses mechanical design labs, fluid mechanics lab, strength of materials, and surveying equipment.',
    juniorTip: 'Safety shoes and workshop aprons are strictly mandatory before entering the ground floor workshop area.',
    tags: ['mechanical', 'civil', 'workshop', 'cad', 'machines']
  },
  {
    id: 'first-year-block',
    name: 'Saraswathi Block (Science & Humanities / 1st Year)',
    shortName: 'Saraswathi Block (1st Year)',
    category: 'academic',
    floors: '3 Floors',
    departments: ['Basic Sciences', 'Mathematics', 'Engineering Physics', 'English Communication'],
    openHours: '8:30 AM - 5:00 PM',
    popular: true,
    rating: 4.7,
    mapCoords: { x: 350, y: 680 },
    desc: 'The dedicated block where most first-year B.Tech induction, tutorial, and basic science classes take place.',
    juniorTip: 'Head of Basic Sciences office is on Room S-102. Notice boards outside this block post your first-year lab schedules and section notices.',
    tags: ['freshers', 'firstyear', 'science', 'maths', 'physics', 'chemistry', 'saraswathi']
  },
  {
    id: 'robotics-ai-lab',
    name: 'Advanced Robotics & AI Innovation Hub',
    shortName: 'Robotics & AI Hub',
    category: 'labs',
    floors: '2nd Floor, Titanic North Wing',
    departments: ['Center of Excellence in AI', 'Robotics & Automation Lab', 'IoT Maker Space'],
    openHours: '9:00 AM - 6:00 PM',
    popular: true,
    rating: 4.9,
    mapCoords: { x: 440, y: 430 },
    desc: 'State-of-the-art facility featuring 3D printers, ROS robotics kits, NVIDIA GPU workstations, and student competition project bays.',
    juniorTip: 'Club recruitment (Robotics Club & Hackathon Club) conducts orienting sessions here in September. Open to freshers!',
    tags: ['ai', 'robotics', 'iot', 'hardware', 'hackathon']
  },
  {
    id: 'mechanical-workshop',
    name: 'Central Mechanical Engineering Workshop',
    shortName: 'Mech Workshop',
    category: 'labs',
    floors: 'Ground Floor High-Bay Shed',
    departments: ['Carpentry', 'Fitting', 'Welding', 'Machine Shop (Lathes)', 'Smithy'],
    openHours: '8:30 AM - 4:30 PM',
    popular: false,
    rating: 4.3,
    mapCoords: { x: 230, y: 320 },
    desc: 'Heavy industrial workshop where all first-year students complete mandatory hands-on manufacturing practices.',
    juniorTip: 'Don’t forget your safety goggles and record book. Lockers are available outside to keep backpacks clean.',
    tags: ['workshop', 'lathe', 'welding', 'carpentry', 'tools']
  },
  {
    id: 'chemistry-physics-lab',
    name: 'Physics & Chemistry Research Labs',
    shortName: 'Basic Science Labs',
    category: 'labs',
    floors: '1st & 2nd Floor, Saraswathi Block',
    departments: ['Engineering Chemistry Lab', 'Optics & Physics Lab', 'Material Testing'],
    openHours: '8:30 AM - 4:30 PM',
    popular: false,
    rating: 4.4,
    mapCoords: { x: 320, y: 720 },
    desc: 'Laboratories equipped for spectrometry, titration, laser optics, and semiconductor bandgap experiments.',
    juniorTip: 'White lab coats are compulsory for chemistry. Glassware must be signed out from the lab assistant at Counter A.',
    tags: ['chemistry', 'physics', 'lasers', 'science', 'optics']
  },
  {
    id: 'radhakrishnan-auditorium',
    name: 'Dr. S. Radhakrishnan Central Auditorium',
    shortName: 'Central Auditorium',
    category: 'classrooms',
    floors: 'Ground + Balcony (1,200 seats)',
    departments: ['Cultural Events', 'Induction Programs', 'Tech Fests', 'Convocation'],
    openHours: 'Events Schedule',
    popular: true,
    rating: 4.8,
    mapCoords: { x: 500, y: 310 },
    desc: 'Air-conditioned main auditorium with advanced acoustic systems, stage lighting, and green rooms. Host of freshers orientation and Sreevision fest.',
    juniorTip: 'The main entrance faces the central quadrangle lawn. Balcony entrance is on the 1st-floor exterior ramp.',
    tags: ['auditorium', 'events', 'cultural', 'sreevision', 'orientation']
  },
  {
    id: 'smart-classrooms-block',
    name: 'Aryabhata Smart Classrooms Complex',
    shortName: 'Aryabhata Block',
    category: 'classrooms',
    floors: '4 Floors',
    departments: ['Smart Lecture Theatres', 'Multimedia Seminar Halls', 'Guest Lecture Rooms'],
    openHours: '8:30 AM - 5:30 PM',
    popular: false,
    rating: 4.6,
    mapCoords: { x: 540, y: 440 },
    desc: 'Equipped with interactive smartboards, dual projection systems, and tier-style seating for interactive engineering lectures.',
    juniorTip: 'Lecture Halls A-101 to A-108 are on the ground floor; use the digital directory near the lobby for today’s schedule.',
    tags: ['classrooms', 'smartboards', 'lectures', 'seminar']
  },
  {
    id: 'sports-complex',
    name: 'Indoor Sports Stadium & Gymnasium',
    shortName: 'Indoor Stadium & Gym',
    category: 'sports',
    floors: '2 Levels',
    departments: ['Badminton Courts (Wooden)', 'Table Tennis Arena', 'Fitness Center & Gym', 'Chess & Carrom Hall'],
    openHours: '6:00 AM - 8:30 AM & 4:30 PM - 7:30 PM',
    popular: true,
    rating: 4.8,
    mapCoords: { x: 800, y: 420 },
    desc: 'Spacious multi-sport indoor stadium with standard wooden badminton courts, modern weights, and locker rooms.',
    juniorTip: 'Non-marking sports shoes are strictly required for badminton courts. Gym memberships for students are free with ID card registration.',
    tags: ['sports', 'gym', 'badminton', 'fitness', 'tabletennis']
  },
  {
    id: 'cricket-football-ground',
    name: 'Main Sports Arena (Cricket & Football Ground)',
    shortName: 'Cricket & Football Ground',
    category: 'sports',
    floors: 'Open Field',
    departments: ['Full Size Turf Cricket Ground', 'Football Field', '400m Athletic Running Track'],
    openHours: '6:00 AM - 7:00 PM',
    popular: true,
    rating: 4.7,
    mapCoords: { x: 820, y: 220 },
    desc: 'Large manicured campus playground with turf pitch, goalposts, and athletic running tracks used for inter-college tournaments.',
    juniorTip: 'College sports teams conduct open trials in the first month. Meet Physical Education Directors (PED) at the pavilion.',
    tags: ['cricket', 'football', 'ground', 'running', 'athletics']
  },
  {
    id: 'basketball-volleyball-courts',
    name: 'Outdoor Basketball & Volleyball Courts',
    shortName: 'Basketball Courts',
    category: 'sports',
    floors: 'Floodlit Outdoor Courts',
    departments: ['2 Regulation Basketball Courts', '2 Volleyball Courts'],
    openHours: '6:00 AM - 8:00 PM (Floodlit)',
    popular: false,
    rating: 4.6,
    mapCoords: { x: 740, y: 310 },
    desc: 'Synthetic acrylic surfaced basketball courts equipped with high-mast floodlights for evening student matches.',
    juniorTip: 'Balls can be checked out from the sports store room adjacent to court 1 with your ID card.',
    tags: ['basketball', 'volleyball', 'floodlit', 'courts']
  },
  {
    id: 'boys-hostel',
    name: 'Sreenidhi Boys Residency & Mess',
    shortName: 'Boys Hostel',
    category: 'hostels',
    floors: '5 Floors',
    departments: ['Resident Rooms', 'Hostel Mess & Dining', 'Recreation Room', 'Warden Office'],
    openHours: 'Student Resident Access (Curfew 9:00 PM)',
    popular: false,
    rating: 4.4,
    mapCoords: { x: 190, y: 520 },
    desc: 'Secure on-campus residential building for male students with Wi-Fi, solar hot water, study hall, and 24/7 security.',
    juniorTip: 'Hostel warden office is at the ground floor entrance. Courier packages can be collected between 4 PM and 6 PM.',
    tags: ['hostel', 'boys', 'rooms', 'mess', 'residence']
  },
  {
    id: 'girls-hostel',
    name: 'Sreenidhi Girls Residency & Dining',
    shortName: 'Girls Hostel',
    category: 'hostels',
    floors: '5 Floors',
    departments: ['Resident Rooms', 'Dedicated Dining Hall', 'Study & Lounge', 'Medical Rest Room'],
    openHours: 'Student Resident Access (Curfew 8:30 PM)',
    popular: false,
    rating: 4.6,
    mapCoords: { x: 220, y: 680 },
    desc: 'Gated and high-security campus accommodation for female students with dedicated biometric access and warden supervision.',
    juniorTip: 'Visitor lounge is situated on the ground floor. Campus shuttle stops right outside the gate during bus timings.',
    tags: ['hostel', 'girls', 'rooms', 'dining', 'residence', 'security']
  },
  {
    id: 'health-center',
    name: 'Campus Health Center & Dispensary',
    shortName: 'Dispensary',
    category: 'facilities',
    floors: 'Ground Floor',
    departments: ['Medical Officer Clinic', 'First Aid Station', 'Emergency Observation Beds', 'Ambulance Bay'],
    openHours: '8:00 AM - 8:00 PM (Emergency on-call 24/7)',
    popular: false,
    rating: 4.7,
    mapCoords: { x: 600, y: 730 },
    desc: 'Well-equipped healthcare clinic with full-time doctor and nursing staff. Free basic consultations and medicines for all SNISTians.',
    juniorTip: 'In case of sudden illness or allergy, inform your class coordinator or visit directly. Emergency ambulance phone is posted outside.',
    tags: ['health', 'doctor', 'medicine', 'firstaid', 'emergency', 'clinic']
  },
  {
    id: 'bus-bay',
    name: 'SNIST College Bus Bay & Transit Point',
    shortName: 'Bus Bay & Parking',
    category: 'facilities',
    floors: 'Ground Level Open Terminus',
    departments: ['60+ College Bus Routes', 'Two-Wheeler Student Parking', 'Staff Car Parking'],
    openHours: '7:30 AM - 6:30 PM',
    popular: false,
    rating: 4.5,
    mapCoords: { x: 670, y: 860 },
    desc: 'Designated bus staging grounds where buses heading to Dilsukhnagar, Secunderabad, Kukatpally, ECIL, and Uppal line up.',
    juniorTip: 'Buses depart sharply at 4:35 PM in the evening. Route numbers are displayed on front windscreens; find your route chart on the notice board.',
    tags: ['bus', 'transport', 'parking', 'uppal', 'travel']
  },
  {
    id: 'xerox-stationary',
    name: 'Student Stationary, Xerox & Binding Hub',
    shortName: 'Stationary & Xerox',
    category: 'facilities',
    floors: 'Ground Floor, Saraswathi Arcade',
    departments: ['Photocopy & Printing', 'Record Binding', 'Drawing Sheets & Drafters', 'Engineering Essentials'],
    openHours: '8:30 AM - 6:00 PM',
    popular: true,
    rating: 4.6,
    mapCoords: { x: 380, y: 770 },
    desc: 'One-stop shop for record sheets, lab manuals, project spiral binding, engineering drafters, and quick printouts.',
    juniorTip: 'You can email your documents directly to the shop’s printing email to skip queueing with pen drives during peak project submission weeks.',
    tags: ['print', 'xerox', 'stationary', 'binding', 'records', 'drafter']
  }
];

// Pre-computed routes between landmarks with student turn-by-turn guidance
export function calculateRoute(startId, destId) {
  if (!startId || !destId) return null;
  if (startId === destId) {
    return {
      sameLocation: true,
      start: CAMPUS_LOCATIONS.find(l => l.id === startId),
      destination: CAMPUS_LOCATIONS.find(l => l.id === destId),
      distanceMeters: 0,
      walkTimeMinutes: 0,
      steps: [
        {
          title: 'Already at your destination',
          desc: 'You are currently located at the selected building.',
          icon: 'check-circle',
          landmark: 'Current Spot'
        }
      ]
    };
  }

  const start = CAMPUS_LOCATIONS.find(l => l.id === startId) || CAMPUS_LOCATIONS[0];
  const dest = CAMPUS_LOCATIONS.find(l => l.id === destId) || CAMPUS_LOCATIONS[1];

  // Euclidean distance on map coordinate scale, roughly scaled to meters
  const dx = dest.mapCoords.x - start.mapCoords.x;
  const dy = dest.mapCoords.y - start.mapCoords.y;
  const pixelDist = Math.hypot(dx, dy);
  
  // 1 pixel approx 0.8 meters
  const distanceMeters = Math.max(50, Math.round(pixelDist * 0.75));
  // Average student walking speed 75 meters per minute
  const walkTimeMinutes = Math.max(1, Math.round(distanceMeters / 70));

  // Determine compass direction
  let direction = '';
  if (Math.abs(dy) > Math.abs(dx)) {
    direction = dy < 0 ? 'North (towards upper campus)' : 'South (towards main entrance)';
  } else {
    direction = dx > 0 ? 'East (towards sports complex & canteens)' : 'West (towards workshops & hostels)';
  }

  // Generate customized turn-by-turn steps
  const steps = [];
  steps.push({
    title: `Start from ${start.shortName}`,
    desc: `Exit the main doorway of ${start.shortName} and take the paved pedestrian promenade.`,
    icon: 'navigation',
    landmark: `Near ${start.shortName}`
  });

  if (start.id === 'main-gate') {
    steps.push({
      title: 'Pass Central Entrance Fountain & Admin Quadrangle',
      desc: 'Walk straight past the security kiosk along the palm-lined main avenue towards the central rotary.',
      icon: 'arrow-up',
      landmark: 'Palm Avenue & Lawn'
    });
  } else if (start.mapCoords.y > 600 && dest.mapCoords.y < 500) {
    steps.push({
      title: 'Head past Admin Block towards Central Circle',
      desc: 'Follow the shaded walkway northwards past the Admin Block gardens towards the center of campus.',
      icon: 'arrow-up',
      landmark: 'Admin Block Lawns'
    });
  }

  // Mid-way navigation step
  if (dest.id === 'titanic-block') {
    steps.push({
      title: 'Approach the Titanic Block plaza',
      desc: `Head ${direction}. The distinctive ship-shaped bow of the Titanic Block will be clearly visible on your right.`,
      icon: 'building',
      landmark: 'Titanic Main Plaza'
    });
    steps.push({
      title: 'Enter Titanic Block Ground Floor',
      desc: 'Enter through the main front glass doors. Staircases and elevators to 1st, 2nd & 3rd floors are located in the central atrium.',
      icon: 'map-pin',
      landmark: 'Titanic Atrium'
    });
  } else if (dest.id === 'central-library') {
    steps.push({
      title: 'Walk along the Library Botanical Gardens',
      desc: 'Turn right at the central junction onto the paved walkway leading directly towards the glass facade of Central Library.',
      icon: 'corner-down-right',
      landmark: 'Library Quadrangle'
    });
    steps.push({
      title: 'Arrival at Central Library Entrance',
      desc: 'Enter through the turnstiles with your SNIST RFID student badge. The circulation desk is on your left.',
      icon: 'map-pin',
      landmark: 'Library Turnstiles'
    });
  } else if (dest.id === 'main-canteen' || dest.id === 'maggi-point') {
    steps.push({
      title: `Follow the food court aroma towards ${dest.shortName}`,
      desc: `Proceed along the eastern avenue towards the student activity zone. Look out for the outdoor shaded seating umbrellas.`,
      icon: 'utensils',
      landmark: 'Food Court Plaza'
    });
    steps.push({
      title: `Arrive at ${dest.shortName}`,
      desc: `You have reached ${dest.name}. Token counters and UPI payment stands are located at the front entrance.`,
      icon: 'map-pin',
      landmark: dest.shortName
    });
  } else if (dest.category === 'sports') {
    steps.push({
      title: 'Head towards the Eastern Sports Zone',
      desc: 'Take the wide walkway skirting the east boundary past Visvesvaraya Block towards the open stadium.',
      icon: 'arrow-right',
      landmark: 'Sports Pavilion Road'
    });
    steps.push({
      title: `Enter ${dest.shortName}`,
      desc: `Arrive at ${dest.name}. Entry gate and changing facilities are located next to the sports office.`,
      icon: 'trophy',
      landmark: dest.shortName
    });
  } else {
    steps.push({
      title: `Continue ${direction} towards ${dest.shortName}`,
      desc: `Follow the marked directional signboards along the paved campus corridor. Pass through the connecting courtyard.`,
      icon: 'arrow-up-right',
      landmark: `Courtyard outside ${dest.shortName}`
    });
    steps.push({
      title: `Arrive at ${dest.shortName}`,
      desc: `You have reached ${dest.name}. ${dest.juniorTip}`,
      icon: 'map-pin',
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
