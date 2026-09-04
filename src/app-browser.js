// NAVIX Campus Navigator - Browser Runtime Bundle
// Built with pure React 18 for zero-dependency local execution

(function () {
  const { useState, useEffect, useRef, useMemo, createElement: e } = React;

  // --- Campus Data & Categories ---
  const CATEGORIES = [
    { id: 'academic', name: 'Academic Blocks', icon: 'graduation-cap', color: 'blue', count: 6, desc: 'Engineering department blocks & lecture halls' },
    { id: 'labs', name: 'Labs', icon: 'flask-conical', color: 'emerald', count: 5, desc: 'CSE, AI/ML, ECE, Mechanical & Science labs' },
    { id: 'classrooms', name: 'Classrooms', icon: 'book-open', color: 'indigo', count: 4, desc: '1st year tutorial halls, smart seminar halls' },
    { id: 'library', name: 'Library', icon: 'library', color: 'amber', count: 2, desc: 'Central Library & Digital Knowledge Center' },
    { id: 'canteens', name: 'Canteens', icon: 'utensils', color: 'orange', count: 4, desc: 'Main Canteen, Food Court, Maggi Point & Cafes' },
    { id: 'hostels', name: 'Hostels', icon: 'home', color: 'purple', count: 3, desc: 'Boys Hostels, Girls Hostels & Mess' },
    { id: 'sports', name: 'Sports', icon: 'trophy', color: 'red', count: 4, desc: 'Indoor Stadium, Cricket ground, Basketball & Gym' },
    { id: 'facilities', name: 'Other Facilities', icon: 'building-2', color: 'teal', count: 5, desc: 'Admin block, Health center, Bus bay & Bank/ATM' }
  ];

  const CAMPUS_LOCATIONS = [
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
      mapCoords: { x: 500, y: 880 },
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

  function calculateRoute(startId, destId) {
    if (!startId || !destId) return null;
    const start = CAMPUS_LOCATIONS.find(l => l.id === startId) || CAMPUS_LOCATIONS[0];
    const dest = CAMPUS_LOCATIONS.find(l => l.id === destId) || CAMPUS_LOCATIONS[1];

    if (startId === destId) {
      return {
        sameLocation: true,
        start,
        destination: dest,
        distanceMeters: 0,
        walkTimeMinutes: 0,
        steps: [{ title: 'Already here', desc: `You are currently at ${start.name}.`, icon: 'check-circle' }]
      };
    }

    const dx = dest.mapCoords.x - start.mapCoords.x;
    const dy = dest.mapCoords.y - start.mapCoords.y;
    const pixelDist = Math.hypot(dx, dy);
    const distanceMeters = Math.max(50, Math.round(pixelDist * 0.75));
    const walkTimeMinutes = Math.max(1, Math.round(distanceMeters / 70));

    let direction = '';
    if (Math.abs(dy) > Math.abs(dx)) {
      direction = dy < 0 ? 'North (towards upper campus)' : 'South (towards main entrance)';
    } else {
      direction = dx > 0 ? 'East (towards sports complex & canteens)' : 'West (towards workshops & hostels)';
    }

    const steps = [
      {
        title: `Start from ${start.shortName}`,
        desc: `Exit the main doorway of ${start.shortName} and join the paved pedestrian avenue.`,
        landmark: `Near ${start.shortName}`
      }
    ];

    if (start.id === 'main-gate') {
      steps.push({
        title: 'Pass Central Entrance Lawn & Fountain',
        desc: 'Walk straight past security along the palm-lined main avenue towards the central rotary.',
        landmark: 'Palm Avenue & Lawn'
      });
    } else if (start.mapCoords.y > 600 && dest.mapCoords.y < 500) {
      steps.push({
        title: 'Head past Admin Block towards Central Circle',
        desc: 'Follow the shaded walkway northwards past Admin gardens towards the quadrangle center.',
        landmark: 'Admin Block Lawns'
      });
    }

    if (dest.id === 'titanic-block') {
      steps.push({
        title: 'Approach the Titanic Block plaza',
        desc: `Head ${direction}. The distinctive ship-shaped bow of the Titanic Block is straight ahead.`,
        landmark: 'Titanic Main Plaza'
      });
      steps.push({
        title: 'Enter Titanic Block Ground Floor',
        desc: 'Enter through the central glass entrance. Elevators and main stairs are located right in the lobby atrium.',
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
        landmark: `Near ${dest.shortName}`
      });
      steps.push({
        title: `Arrive at ${dest.shortName}`,
        desc: `You have arrived at ${dest.name}. ${dest.juniorTip}`,
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

  // --- SVG Icon Helper ---
  function Icon({ name, className = "w-5 h-5", style = {} }) {
    const defaultProps = {
      className,
      style,
      fill: "none",
      viewBox: "0 0 24 24",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    };

    switch (name) {
      case 'graduation-cap':
        return e('svg', defaultProps,
          e('path', { d: "M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" }),
          e('path', { d: "M22 10v6" }),
          e('path', { d: "M6 12.5V16a6 3 0 0 0 12 0v-3.5" })
        );
      case 'flask-conical':
        return e('svg', defaultProps,
          e('path', { d: "M10 2v7.31a2 2 0 0 1-.37 1.17L4.2 18.71A2 2 0 0 0 5.86 22h12.28a2 2 0 0 0 1.66-3.29l-5.43-8.23A2 2 0 0 1 14 9.31V2" }),
          e('path', { d: "M8.5 2h7" }),
          e('path', { d: "M14 9.3a6.5 6.5 0 0 0-4 0" }),
          e('path', { d: "M5.52 16h12.96" })
        );
      case 'book-open':
        return e('svg', defaultProps,
          e('path', { d: "M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" }),
          e('path', { d: "M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" })
        );
      case 'library':
        return e('svg', defaultProps,
          e('path', { d: "m16 6 4 14" }),
          e('path', { d: "M12 6v14" }),
          e('path', { d: "M8 8v12" }),
          e('path', { d: "M4 4v16" })
        );
      case 'utensils':
        return e('svg', defaultProps,
          e('path', { d: "M18 2v6a3 3 0 0 1-3 3 3 3 0 0 1-3-3V2" }),
          e('path', { d: "M15 11v11" }),
          e('path', { d: "M5 2v10a2 2 0 0 0 2 2h1v8" }),
          e('path', { d: "M8 2v5" })
        );
      case 'home':
        return e('svg', defaultProps,
          e('path', { d: "m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" }),
          e('polyline', { points: "9 22 9 12 15 12 15 22" })
        );
      case 'trophy':
        return e('svg', defaultProps,
          e('path', { d: "M6 9H4.5a2.5 2.5 0 0 1 0-5H6" }),
          e('path', { d: "M18 9h1.5a2.5 2.5 0 0 0 0-5H18" }),
          e('path', { d: "M4 22h16" }),
          e('path', { d: "M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" }),
          e('path', { d: "M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" }),
          e('path', { d: "M18 2H6v7a6 6 0 0 0 12 0V2Z" })
        );
      case 'building-2':
      case 'building':
        return e('svg', defaultProps,
          e('path', { d: "M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" }),
          e('path', { d: "M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" }),
          e('path', { d: "M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" }),
          e('path', { d: "M10 6h4" }),
          e('path', { d: "M10 10h4" }),
          e('path', { d: "M10 14h4" }),
          e('path', { d: "M10 18h4" })
        );
      case 'search':
        return e('svg', defaultProps,
          e('circle', { cx: "11", cy: "11", r: "8" }),
          e('path', { d: "m21 21-4.3-4.3" })
        );
      case 'map-pin':
        return e('svg', defaultProps,
          e('path', { d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" }),
          e('circle', { cx: "12", cy: "10", r: "3" })
        );
      case 'navigation':
        return e('svg', defaultProps,
          e('polygon', { points: "3 11 22 2 13 21 11 13 3 11" })
        );
      case 'swap':
        return e('svg', defaultProps,
          e('path', { d: "m7 15 5 5 5-5" }),
          e('path', { d: "m7 9 5-5 5 5" })
        );
      case 'arrow-right':
        return e('svg', defaultProps,
          e('line', { x1: "5", y1: "12", x2: "19", y2: "12" }),
          e('polyline', { points: "12 5 19 12 12 19" })
        );
      case 'footprints':
        return e('svg', defaultProps,
          e('path', { d: "M4 16v-2.38C4 11.5 2.97 10.5 3 8c.03-2.72 1.49-6 4.5-6C9.37 2 10 3.8 10 5.5c0 3.11-2 5.66-2 8.5v2" }),
          e('path', { d: "M20 20v-2.38c0-2.12 1.03-3.12 1-5.62-.03-2.72-1.49-6-4.5-6C14.63 6 14 7.8 14 9.5c0 3.11 2 5.66 2 8.5v2" })
        );
      case 'phone':
        return e('svg', defaultProps,
          e('path', { d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" })
        );
      case 'compass':
        return e('svg', defaultProps,
          e('circle', { cx: "12", cy: "12", r: "10" }),
          e('polygon', { points: "16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" })
        );
      case 'star':
        return e('svg', { ...defaultProps, fill: "currentColor" },
          e('polygon', { points: "12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" })
        );
      case 'info':
        return e('svg', defaultProps,
          e('circle', { cx: "12", cy: "12", r: "10" }),
          e('line', { x1: "12", y1: "16", x2: "12", y2: "12" }),
          e('line', { x1: "12", y1: "8", x2: "12.01", y2: "8" })
        );
      case 'clock':
        return e('svg', defaultProps,
          e('circle', { cx: "12", cy: "12", r: "10" }),
          e('polyline', { points: "12 6 12 12 16 14" })
        );
      case 'layers':
        return e('svg', defaultProps,
          e('polygon', { points: "12 2 2 7 12 12 22 7 12 2" }),
          e('polyline', { points: "2 17 12 22 22 17" }),
          e('polyline', { points: "2 12 12 17 22 12" })
        );
      case 'zoom-in':
        return e('svg', defaultProps,
          e('circle', { cx: "11", cy: "11", r: "8" }),
          e('line', { x1: "21", y1: "21", x2: "16.65", y2: "16.65" }),
          e('line', { x1: "11", y1: "8", x2: "11", y2: "14" }),
          e('line', { x1: "8", y1: "11", x2: "14", y2: "11" })
        );
      case 'zoom-out':
        return e('svg', defaultProps,
          e('circle', { cx: "11", cy: "11", r: "8" }),
          e('line', { x1: "21", y1: "21", x2: "16.65", y2: "16.65" }),
          e('line', { x1: "8", y1: "11", x2: "14", y2: "11" })
        );
      case 'share-2':
        return e('svg', defaultProps,
          e('circle', { cx: "18", cy: "5", r: "3" }),
          e('circle', { cx: "6", cy: "12", r: "3" }),
          e('circle', { cx: "18", cy: "19", r: "3" }),
          e('line', { x1: "8.59", y1: "13.51", x2: "15.42", y2: "17.49" }),
          e('line', { x1: "15.41", y1: "6.51", x2: "8.59", y2: "10.49" })
        );
      case 'check-circle':
        return e('svg', defaultProps,
          e('path', { d: "M22 11.08V12a10 10 0 1 1-5.93-9.14" }),
          e('polyline', { points: "22 4 12 14.01 9 11.01" })
        );
      case 'shield-check':
        return e('svg', defaultProps,
          e('path', { d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" }),
          e('path', { d: "m9 12 2 2 4-4" })
        );
      case 'x':
        return e('svg', defaultProps,
          e('line', { x1: "18", y1: "6", x2: "6", y2: "18" }),
          e('line', { x1: "6", y1: "6", x2: "18", y2: "18" })
        );
      case 'menu':
        return e('svg', defaultProps,
          e('line', { x1: "4", y1: "12", x2: "20", y2: "12" }),
          e('line', { x1: "4", y1: "6", x2: "20", y2: "6" }),
          e('line', { x1: "4", y1: "18", x2: "20", y2: "18" })
        );
      case 'arrow-up':
        return e('svg', defaultProps,
          e('line', { x1: "12", y1: "19", x2: "12", y2: "5" }),
          e('polyline', { points: "5 12 12 5 19 12" })
        );
      case 'user':
      case 'student':
        return e('svg', defaultProps,
          e('path', { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" }),
          e('circle', { cx: "12", cy: "7", r: "4" })
        );
      case 'admin':
      case 'shield':
        return e('svg', defaultProps,
          e('path', { d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" }),
          e('path', { d: "M12 8v4" }),
          e('path', { d: "M12 16h.01" })
        );
      case 'plus':
        return e('svg', defaultProps,
          e('line', { x1: "12", y1: "5", x2: "12", y2: "19" }),
          e('line', { x1: "5", y1: "12", x2: "19", y2: "12" })
        );
      case 'edit':
        return e('svg', defaultProps,
          e('path', { d: "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" }),
          e('path', { d: "M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" })
        );
      case 'trash':
        return e('svg', defaultProps,
          e('polyline', { points: "3 6 5 6 21 6" }),
          e('path', { d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" })
        );
      case 'alert-triangle':
        return e('svg', defaultProps,
          e('path', { d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" }),
          e('line', { x1: "12", y1: "9", x2: "12", y2: "13" }),
          e('line', { x1: "12", y1: "17", x2: "12.01", y2: "17" })
        );
      case 'bell':
        return e('svg', defaultProps,
          e('path', { d: "M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" }),
          e('path', { d: "M10.3 21a1.94 1.94 0 0 0 3.4 0" })
        );
      case 'settings':
        return e('svg', defaultProps,
          e('path', { d: "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" }),
          e('circle', { cx: "12", cy: "12", r: "3" })
        );
      case 'log-out':
        return e('svg', defaultProps,
          e('path', { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" }),
          e('polyline', { points: "16 17 21 12 16 7" }),
          e('line', { x1: "21", y1: "12", x2: "9", y2: "12" })
        );
      case 'eye':
        return e('svg', defaultProps,
          e('path', { d: "M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" }),
          e('circle', { cx: "12", cy: "12", r: "3" })
        );
      case 'check':
        return e('svg', defaultProps,
          e('polyline', { points: "20 6 9 17 4 12" })
        );
      case 'refresh':
        return e('svg', defaultProps,
          e('path', { d: "M21.5 2v6h-6" }),
          e('path', { d: "M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" })
        );
      default:
        return e('svg', defaultProps, e('circle', { cx: "12", cy: "12", r: "10" }));
    }
  }

  // --- 10. Simple Navigation Bar ---
  function Navbar({ onNavigate, activeTab, onNavigateRole }) {
    const [mobileOpen, setMobileOpen] = useState(false);

    const links = [
      { id: 'home', label: 'Home' },
      { id: 'explore', label: 'Explore' },
      { id: 'map', label: 'Campus Map' },
      { id: 'navigate', label: 'Get Directions' },
      { id: 'about', label: 'Junior Guide' }
    ];

    return e('header', { className: "sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white shadow-lg" },
      e('div', { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" },
        e('div', { className: "flex items-center justify-between h-16 sm:h-20" },
          // Brand Logo
          e('div', {
            onClick: () => { onNavigate('home'); setMobileOpen(false); },
            className: "flex items-center gap-3 cursor-pointer group"
          },
            e('div', { className: "w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform" },
              e(Icon, { name: "compass", className: "w-6 h-6 text-white" })
            ),
            e('div', null,
              e('div', { className: "flex items-center gap-2" },
                e('span', { className: "font-extrabold text-lg sm:text-xl tracking-tight text-white group-hover:text-blue-400 transition-colors" }, "NAVIX"),
                e('span', { className: "text-xs uppercase px-1.5 py-0.5 rounded font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30" }, "NAVIX Campus Navigator")
              ),
              e('p', { className: "text-[11px] text-slate-400 hidden sm:block font-medium" }, "Sreenidhi Institute of Science & Technology")
            )
          ),

          // Desktop Links
          e('nav', { className: "hidden md:flex items-center gap-1" },
            links.map(l =>
              e('button', {
                key: l.id,
                onClick: () => onNavigate(l.id),
                className: `px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === l.id ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/30' : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
                }`
              }, l.label)
            )
          ),

          // Right Contact & Role Action Bar
          e('div', { className: "hidden sm:flex items-center gap-2" },
            onNavigateRole && e('button', {
              onClick: () => onNavigateRole('/'),
              className: "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
            },
              e(Icon, { name: "swap", className: "w-3.5 h-3.5 text-blue-400" }),
              e('span', null, "Switch Role")
            ),
            e('button', {
              onClick: () => onNavigate('about'),
              className: "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-300 border border-rose-500/25 hover:bg-rose-500/20 transition-colors"
            },
              e(Icon, { name: "phone", className: "w-3.5 h-3.5 text-rose-400" }),
              e('span', null, "Helpline")
            )
          ),

          // Mobile Hamburger Button
          e('div', { className: "flex md:hidden items-center gap-2" },
            e('button', {
              onClick: () => setMobileOpen(!mobileOpen),
              className: "p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none",
              'aria-label': "Toggle menu"
            },
              e(Icon, { name: mobileOpen ? "x" : "menu", className: "w-6 h-6" })
            )
          )
        )
      ),

      // Mobile Menu Dropdown
      mobileOpen && e('div', { className: "md:hidden bg-slate-900 border-b border-slate-800 px-4 pt-2 pb-5 space-y-1.5 animate-fadeIn" },
        links.map(l =>
          e('button', {
            key: l.id,
            onClick: () => { onNavigate(l.id); setMobileOpen(false); },
            className: `w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-all flex items-center justify-between ${
              activeTab === l.id ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`
          },
            e('span', null, l.label),
            e(Icon, { name: "arrow-right", className: "w-4 h-4 opacity-70" })
          )
        )
      )
    );
  }

  // --- 1, 2, 3, 4. Landing Page Hero & Search Bar ---
  function HeroSearch({ locations, onSelectLocation, onQuickNavigate }) {
    const [query, setQuery] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const searchRef = useRef(null);

    const filtered = useMemo(() => {
      if (!query.trim()) return [];
      const q = query.toLowerCase();
      return locations.filter(loc =>
        loc.name.toLowerCase().includes(q) ||
        loc.shortName.toLowerCase().includes(q) ||
        loc.category.toLowerCase().includes(q) ||
        loc.tags.some(t => t.toLowerCase().includes(q))
      ).slice(0, 5);
    }, [query, locations]);

    useEffect(() => {
      const handler = (e) => {
        if (searchRef.current && !searchRef.current.contains(e.target)) {
          setIsOpen(false);
        }
      };
      document.addEventListener('mousedown', handler);
      return () => document.removeEventListener('mousedown', handler);
    }, []);

    const quickPills = [
      { label: '🚢 Titanic Block', id: 'titanic-block' },
      { label: '📚 Central Library', id: 'central-library' },
      { label: '🥪 Main Canteen', id: 'main-canteen' },
      { label: '🎓 1st Year Block', id: 'first-year-block' },
      { label: '🏸 Sports Complex', id: 'sports-complex' },
      { label: '🚌 Bus Bay', id: 'bus-bay' }
    ];

    return e('section', { className: "relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white pt-10 pb-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800/80" },
      e('div', { className: "relative max-w-4xl mx-auto text-center" },
        // Badge
        e('div', { className: "inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs sm:text-sm font-medium mb-5 shadow-sm" },
          e('span', { className: "flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" }),
          e('span', null, "Freshers & Junior Guide"),
          e('span', { className: "text-slate-500" }, "•"),
          e('span', { className: "text-slate-300" }, "SNIST Campus")
        ),

        // 2. Title
        e('h1', { className: "text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-4" },
          "NAVIX ",
          e('span', { className: "text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-300" }, "Campus Navigator")
        ),

        // 3. Subtitle
        e('p', { className: "text-base sm:text-xl text-slate-300 max-w-2xl mx-auto mb-8 font-normal leading-relaxed" },
          "Find your way around campus, effortlessly."
        ),

        // 4. Prominent Search Bar
        e('div', { ref: searchRef, className: "relative max-w-2xl mx-auto" },
          e('div', { className: "relative flex items-center shadow-2xl rounded-2xl bg-slate-800/90 border border-slate-700/80 backdrop-blur-md focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/20 transition-all" },
            e('div', { className: "pl-4 sm:pl-5 text-slate-400" },
              e(Icon, { name: "search", className: "w-5 h-5 sm:w-6 sm:h-6 text-blue-400" })
            ),
            e('input', {
              type: "text",
              value: query,
              onChange: (e) => { setQuery(e.target.value); setIsOpen(true); },
              onFocus: () => setIsOpen(true),
              placeholder: "Where do you want to go? (e.g., Titanic Block, Library, Canteen...)",
              className: "w-full py-4 sm:py-5 px-3 sm:px-4 bg-transparent text-white placeholder-slate-400 text-sm sm:text-base outline-none rounded-2xl"
            }),
            query && e('button', {
              onClick: () => { setQuery(''); setIsOpen(false); },
              className: "p-2 mr-2 text-slate-400 hover:text-white rounded-lg",
              'aria-label': "Clear search"
            }, e(Icon, { name: "x", className: "w-5 h-5" })),
            e('button', {
              onClick: () => { if (filtered.length > 0) { onSelectLocation(filtered[0]); setIsOpen(false); } },
              className: "hidden sm:flex items-center gap-1.5 mr-2.5 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-semibold shadow-md shadow-blue-600/30 transition-all"
            },
              e(Icon, { name: "navigation", className: "w-4 h-4" }),
              e('span', null, "Search")
            )
          ),

          // Autocomplete Dropdown
          isOpen && filtered.length > 0 && e('div', { className: "absolute left-0 right-0 top-full mt-2 bg-slate-800/95 border border-slate-700 rounded-2xl shadow-2xl backdrop-blur-xl z-50 overflow-hidden text-left divide-y divide-slate-700/50 animate-fadeIn" },
            e('div', { className: "px-4 py-2 text-xs font-semibold uppercase text-slate-400 tracking-wider bg-slate-800/50 flex items-center justify-between" },
              e('span', null, "Matching Campus Locations"),
              e('span', null, `${filtered.length} found`)
            ),
            filtered.map(loc =>
              e('div', {
                key: loc.id,
                onClick: () => { onSelectLocation(loc); setIsOpen(false); },
                className: "px-4 py-3 sm:py-3.5 hover:bg-slate-700/60 transition cursor-pointer flex items-center justify-between group"
              },
                e('div', { className: "flex items-center gap-3" },
                  e('div', { className: "w-9 h-9 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-400 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors" },
                    e(Icon, { name: "map-pin", className: "w-4 h-4" })
                  ),
                  e('div', null,
                    e('h4', { className: "text-sm font-semibold text-white group-hover:text-blue-300 transition-colors" }, loc.name),
                    e('div', { className: "flex items-center gap-2 mt-0.5 text-xs text-slate-400" },
                      e('span', { className: "capitalize text-blue-400 font-medium" }, loc.category),
                      e('span', null, "•"),
                      e('span', null, loc.floors)
                    )
                  )
                ),
                e('button', {
                  onClick: (ev) => { ev.stopPropagation(); onQuickNavigate(loc); setIsOpen(false); },
                  className: "flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-blue-600/20 text-blue-300 hover:bg-blue-600 hover:text-white border border-blue-500/30 transition-all shrink-0 ml-2"
                },
                  e(Icon, { name: "navigation", className: "w-3.5 h-3.5" }),
                  e('span', { className: "hidden sm:inline" }, "Directions")
                )
              )
            )
          )
        ),

        // Quick Search Chips
        e('div', { className: "mt-5 flex flex-wrap items-center justify-center gap-2 max-w-2xl mx-auto" },
          e('span', { className: "text-xs text-slate-400 mr-1 font-medium" }, "Quick find:"),
          quickPills.map(p => {
            const l = locations.find(x => x.id === p.id);
            if (!l) return null;
            return e('button', {
              key: p.id,
              onClick: () => onSelectLocation(l),
              className: "px-3 py-1.5 rounded-full text-xs font-medium bg-slate-800/80 hover:bg-slate-750 text-slate-300 hover:text-white border border-slate-700 hover:border-blue-500/50 hover:bg-blue-600/15 transition-all shadow-sm"
            }, p.label);
          })
        )
      )
    );
  }

  // --- 5. Quick Category Cards ---
  function CategoryCards({ selectedCategory, onSelectCategory }) {
    return e('section', { id: "explore", className: "py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" },
      e('div', { className: "flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4" },
        e('div', null,
          e('div', { className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-2 border border-blue-200" },
            e(Icon, { name: "layers", className: "w-3.5 h-3.5" }),
            e('span', null, "Campus Directory")
          ),
          e('h2', { className: "text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight" }, "Explore by Category"),
          e('p', { className: "text-sm sm:text-base text-slate-600 mt-1" }, "Tap a category to filter locations on the map and view details.")
        ),
        selectedCategory && e('button', {
          onClick: () => onSelectCategory(null),
          className: "inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors self-start sm:self-auto"
        },
          e(Icon, { name: "x", className: "w-3.5 h-3.5" }),
          e('span', null, "Clear Filter (Show All)")
        )
      ),

      e('div', { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-5" },
        CATEGORIES.map(cat => {
          const isSelected = selectedCategory === cat.id;
          return e('div', {
            key: cat.id,
            onClick: () => onSelectCategory(isSelected ? null : cat.id),
            className: `group relative p-4 sm:p-5 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
              isSelected
                ? 'bg-blue-600 text-white ring-2 ring-blue-400 shadow-lg shadow-blue-500/20 scale-[1.02]'
                : 'bg-white hover:bg-slate-50/80 border-slate-200 hover:border-slate-300 hover:shadow-md hover:-translate-y-1'
            }`
          },
            e('div', null,
              e('div', { className: "flex items-center justify-between mb-3" },
                e('div', { className: `w-11 h-11 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-blue-50 text-blue-600'
                }` },
                  e(Icon, { name: cat.icon, className: "w-5 h-5" })
                ),
                e('span', { className: `text-xs px-2 py-0.5 rounded-full font-bold ${
                  isSelected ? 'bg-white/25 text-white' : 'bg-slate-100 text-slate-600'
                }` }, `${cat.count} spots`)
              ),
              e('h3', { className: `font-bold text-base sm:text-lg mb-1 leading-snug ${
                isSelected ? 'text-white' : 'text-slate-900 group-hover:text-blue-600'
              }` }, cat.name),
              e('p', { className: `text-xs line-clamp-2 leading-relaxed ${
                isSelected ? 'text-white/80' : 'text-slate-500'
              }` }, cat.desc)
            ),
            e('div', { className: "mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-medium" },
              e('span', { className: isSelected ? 'text-white/90' : 'text-slate-400 group-hover:text-slate-600' },
                isSelected ? 'Active Filter' : 'Tap to filter'
              ),
              e(Icon, { name: isSelected ? "check-circle" : "arrow-right", className: `w-4 h-4 ${isSelected ? 'text-white' : 'text-slate-400'}` })
            )
          );
        })
      )
    );
  }

  // --- 6. Campus Map Section ---
  function CampusMap({ locations, startLocationId, destLocationId, selectedCategory, onSelectBuilding, onSetAsStart, onSetAsDestination }) {
    const [zoom, setZoom] = useState(1);
    const [hoveredBuilding, setHoveredBuilding] = useState(null);
    const [activeModal, setActiveModal] = useState(null);

    const startLoc = locations.find(l => l.id === startLocationId);
    const destLoc = locations.find(l => l.id === destLocationId);

    const displayedLocations = selectedCategory 
      ? locations.filter(l => l.category === selectedCategory) 
      : locations;

    let routePath = '';
    if (startLoc && destLoc && startLoc.id !== destLoc.id) {
      const p1 = startLoc.mapCoords;
      const p2 = destLoc.mapCoords;
      const midX = (p1.x + p2.x) / 2 + (p1.x > p2.x ? -20 : 20);
      const midY = (p1.y + p2.y) / 2;
      routePath = `M ${p1.x} ${p1.y} Q ${midX} ${midY} ${p2.x} ${p2.y}`;
    }

    return e('section', { id: "map", className: "py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" },
      e('div', { className: "flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-4" },
        e('div', null,
          e('div', { className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold mb-2 border border-indigo-200" },
            e(Icon, { name: "compass", className: "w-3.5 h-3.5" }),
            e('span', null, "Campus Blueprint")
          ),
          e('h2', { className: "text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight" }, "SNIST Interactive Campus Map"),
          e('p', { className: "text-sm sm:text-base text-slate-600 mt-1" }, "Click any building to inspect floors, departments, or set as your route destination.")
        ),
        e('div', { className: "flex items-center gap-2 self-start sm:self-auto bg-white p-1.5 rounded-xl border border-slate-200 shadow-sm" },
          e('button', { onClick: () => setZoom(z => Math.min(z + 0.25, 2.0)), className: "p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg", title: "Zoom In" },
            e(Icon, { name: "zoom-in", className: "w-4 h-4" })
          ),
          e('button', { onClick: () => setZoom(z => Math.max(z - 0.25, 0.75)), className: "p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg", title: "Zoom Out" },
            e(Icon, { name: "zoom-out", className: "w-4 h-4" })
          ),
          e('button', { onClick: () => setZoom(1), className: "px-2.5 py-1 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg" }, "Reset"),
          e('span', { className: "text-xs font-medium text-slate-500 px-2" }, `${Math.round(zoom * 100)}%`)
        )
      ),

      e('div', { className: "relative bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl" },
        // Status Badges
        e('div', { className: "absolute top-4 left-4 z-20 flex flex-wrap items-center gap-2 pointer-events-none" },
          e('div', { className: "px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-700/80 backdrop-blur-md text-xs font-medium text-slate-200 flex items-center gap-2 shadow-lg" },
            e('span', { className: "w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" }),
            e('span', null, "Interactive 2D Campus Blueprint")
          ),
          selectedCategory && e('div', { className: "px-3 py-1.5 rounded-xl bg-blue-600/90 border border-blue-400/50 backdrop-blur-md text-xs font-medium text-white shadow-lg capitalize" },
            `Filtering: ${selectedCategory}`
          )
        ),

        // Quick Building Card on click
        activeModal && e('div', { className: "absolute bottom-4 left-4 right-4 sm:right-auto sm:w-80 z-30 bg-slate-900/95 border border-slate-700 p-4 rounded-2xl shadow-2xl backdrop-blur-md animate-fadeIn" },
          e('div', { className: "flex items-start justify-between gap-2 mb-2" },
            e('div', null,
              e('span', { className: "text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-500/20 text-blue-300" }, activeModal.category),
              e('h4', { className: "font-bold text-white text-base mt-1" }, activeModal.name)
            ),
            e('button', { onClick: () => setActiveModal(null), className: "p-1 text-slate-400 hover:text-white rounded-lg" },
              e(Icon, { name: "x", className: "w-4 h-4" })
            )
          ),
          e('p', { className: "text-xs text-slate-300 line-clamp-2 mb-3" }, activeModal.desc),
          e('div', { className: "text-[11px] text-slate-400 mb-3 space-y-1" },
            e('div', { className: "flex items-center gap-1.5" },
              e(Icon, { name: "layers", className: "w-3.5 h-3.5 text-blue-400" }),
              e('span', null, activeModal.floors)
            ),
            e('div', { className: "flex items-center gap-1.5" },
              e(Icon, { name: "clock", className: "w-3.5 h-3.5 text-amber-400" }),
              e('span', null, activeModal.openHours)
            )
          ),
          e('div', { className: "flex items-center gap-2 pt-2 border-t border-slate-800" },
            e('button', {
              onClick: () => { onSetAsStart(activeModal.id); setActiveModal(null); },
              className: "flex-1 py-1.5 px-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium border border-slate-700"
            }, "Set as Start"),
            e('button', {
              onClick: () => { onSetAsDestination(activeModal.id); setActiveModal(null); },
              className: "flex-1 py-1.5 px-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold shadow-md shadow-blue-600/30"
            }, "Navigate Here")
          )
        ),

        // SVG Canvas
        e('div', { className: "overflow-auto max-h-[600px] sm:max-h-[680px] p-2 sm:p-4 flex items-center justify-center cursor-grab" },
          e('div', {
            style: { transform: `scale(${zoom})`, transformOrigin: 'center center', transition: 'transform 0.2s ease-out' },
            className: "w-[1000px] h-[950px] shrink-0 relative select-none"
          },
            e('svg', { viewBox: "0 0 1000 950", className: "w-full h-full", xmlns: "http://www.w3.org/2000/svg" },
              // Definitions
              e('defs', null,
                e('pattern', { id: "lawnPattern", width: "20", height: "20", patternUnits: "userSpaceOnUse" },
                  e('rect', { width: "20", height: "20", fill: "#0f2b1d" }),
                  e('circle', { cx: "10", cy: "10", r: "1", fill: "#143c29", opacity: "0.6" })
                ),
                e('filter', { id: "pinGlow", x: "-50%", y: "-50%", width: "200%", height: "200%" },
                  e('feDropShadow', { dx: "0", dy: "0", stdDeviation: "6", floodColor: "#38bdf8", floodOpacity: "0.8" })
                )
              ),

              // Background
              e('rect', { x: "0", y: "0", width: "1000", height: "950", fill: "#090d16" }),
              e('rect', { x: "50", y: "60", width: "900", height: "830", rx: "30", fill: "#0b1712", stroke: "#162e22", strokeWidth: "2" }),
              e('circle', { cx: "500", cy: "550", r: "160", fill: "url(#lawnPattern)", stroke: "#1a4731", strokeWidth: "2" }),

              // Northern Sports Ground
              e('rect', { x: "700", y: "100", width: "240", height: "250", rx: "20", fill: "#0f3422", stroke: "#1b5a3b", strokeWidth: "2" }),
              e('circle', { cx: "820", cy: "220", r: "70", fill: "none", stroke: "#22c55e", strokeWidth: "2", strokeDasharray: "6 4", opacity: "0.6" }),
              e('text', { x: "820", y: "225", fill: "#4ade80", fontSize: "11", fontWeight: "bold", textAnchor: "middle" }, "Cricket / Football Oval"),

              // Roadways
              e('path', { d: "M 500 900 L 500 300", stroke: "#334155", strokeWidth: "18", strokeLinecap: "round" }),
              e('path', { d: "M 500 900 L 500 300", stroke: "#64748b", strokeWidth: "2", strokeDasharray: "10 8" }),
              e('path', { d: "M 160 550 L 840 550", stroke: "#334155", strokeWidth: "16", strokeLinecap: "round" }),
              e('path', { d: "M 160 550 L 840 550", stroke: "#64748b", strokeWidth: "2", strokeDasharray: "10 8" }),

              // Walkway Connections
              e('path', { d: "M 500 700 L 350 680 L 190 520", stroke: "#1e293b", strokeWidth: "10", strokeLinecap: "round" }),
              e('path', { d: "M 500 700 L 670 730 L 740 640", stroke: "#1e293b", strokeWidth: "10", strokeLinecap: "round" }),
              e('path', { d: "M 500 450 L 420 460 L 310 350", stroke: "#1e293b", strokeWidth: "10", strokeLinecap: "round" }),
              e('path', { d: "M 500 450 L 670 380 L 800 420", stroke: "#1e293b", strokeWidth: "10", strokeLinecap: "round" }),

              // Fountain
              e('circle', { cx: "500", cy: "550", r: "30", fill: "#0284c7", stroke: "#38bdf8", strokeWidth: "3", opacity: "0.8" }),
              e('circle', { cx: "500", cy: "550", r: "12", fill: "#bae6fd" }),

              // Main Entrance Gate Box
              e('rect', { x: "420", y: "870", width: "160", height: "40", rx: "8", fill: "#1e293b", stroke: "#475569", strokeWidth: "2" }),
              e('text', { x: "500", y: "895", fill: "#f8fafc", fontSize: "12", fontWeight: "bold", textAnchor: "middle" }, "MAIN CAMPUS GATE"),

              // Dynamic Route Line
              routePath && e('g', null,
                e('path', { d: routePath, fill: "none", stroke: "#38bdf8", strokeWidth: "12", strokeLinecap: "round", opacity: "0.3" }),
                e('path', { d: routePath, fill: "none", stroke: "#0284c7", strokeWidth: "5", strokeLinecap: "round" }),
                e('path', { d: routePath, fill: "none", stroke: "#ffffff", strokeWidth: "3", strokeDasharray: "8 6", strokeLinecap: "round", className: "animate-dash" })
              ),

              // Buildings: Titanic Block
              e('g', { onClick: () => setActiveModal(locations.find(l => l.id === 'titanic-block')), className: "cursor-pointer" },
                e('polygon', { points: "340,430 480,430 510,460 480,490 340,490", fill: "#1e3a8a", stroke: "#3b82f6", strokeWidth: "3" }),
                e('text', { x: "415", y: "455", fill: "#ffffff", fontSize: "12", fontWeight: "bold", textAnchor: "middle" }, "🚢 TITANIC BLOCK"),
                e('text', { x: "415", y: "475", fill: "#93c5fd", fontSize: "9", textAnchor: "middle" }, "CSE & IT Departments")
              ),

              // Central Library
              e('g', { onClick: () => setActiveModal(locations.find(l => l.id === 'central-library')), className: "cursor-pointer" },
                e('rect', { x: "560", y: "500", width: "120", height: "70", rx: "8", fill: "#78350f", stroke: "#d97706", strokeWidth: "2.5" }),
                e('text', { x: "620", y: "535", fill: "#ffffff", fontSize: "11", fontWeight: "bold", textAnchor: "middle" }, "📚 CENTRAL LIBRARY"),
                e('text', { x: "620", y: "552", fill: "#fde68a", fontSize: "9", textAnchor: "middle" }, "Digital Hub & Study")
              ),

              // Admin Block
              e('g', { onClick: () => setActiveModal(locations.find(l => l.id === 'admin-block')), className: "cursor-pointer" },
                e('rect', { x: "430", y: "690", width: "140", height: "60", rx: "8", fill: "#312e81", stroke: "#6366f1", strokeWidth: "2.5" }),
                e('text', { x: "500", y: "720", fill: "#ffffff", fontSize: "11", fontWeight: "bold", textAnchor: "middle" }, "🏛️ ADMIN BLOCK"),
                e('text', { x: "500", y: "736", fill: "#c7d2fe", fontSize: "9", textAnchor: "middle" }, "Principal & Exam Cell")
              ),

              // Saraswathi Block (1st Year)
              e('g', { onClick: () => setActiveModal(locations.find(l => l.id === 'first-year-block')), className: "cursor-pointer" },
                e('rect', { x: "280", y: "650", width: "130", height: "60", rx: "8", fill: "#1e3a8a", stroke: "#60a5fa", strokeWidth: "2.5" }),
                e('text', { x: "345", y: "678", fill: "#ffffff", fontSize: "10", fontWeight: "bold", textAnchor: "middle" }, "SARASWATHI BLOCK"),
                e('text', { x: "345", y: "695", fill: "#93c5fd", fontSize: "8.5", textAnchor: "middle" }, "1st Year B.Tech & Labs")
              ),

              // Visvesvaraya Block (ECE/EEE)
              e('g', { onClick: () => setActiveModal(locations.find(l => l.id === 'ece-eee-block')), className: "cursor-pointer" },
                e('rect', { x: "610", y: "350", width: "120", height: "60", rx: "8", fill: "#1e3a8a", stroke: "#3b82f6", strokeWidth: "2.5" }),
                e('text', { x: "670", y: "378", fill: "#ffffff", fontSize: "10", fontWeight: "bold", textAnchor: "middle" }, "VISVESVARAYA"),
                e('text', { x: "670", y: "395", fill: "#93c5fd", fontSize: "8.5", textAnchor: "middle" }, "ECE & EEE Blocks")
              ),

              // Ramanujan Block (Mech/Civil)
              e('g', { onClick: () => setActiveModal(locations.find(l => l.id === 'mech-civil-block')), className: "cursor-pointer" },
                e('rect', { x: "250", y: "320", width: "120", height: "60", rx: "8", fill: "#1e3a8a", stroke: "#3b82f6", strokeWidth: "2.5" }),
                e('text', { x: "310", y: "348", fill: "#ffffff", fontSize: "10", fontWeight: "bold", textAnchor: "middle" }, "RAMANUJAN BLOCK"),
                e('text', { x: "310", y: "365", fill: "#93c5fd", fontSize: "8.5", textAnchor: "middle" }, "Mech & Civil Engg")
              ),

              // Auditorium
              e('g', { onClick: () => setActiveModal(locations.find(l => l.id === 'radhakrishnan-auditorium')), className: "cursor-pointer" },
                e('rect', { x: "430", y: "280", width: "140", height: "60", rx: "10", fill: "#4c1d95", stroke: "#a855f7", strokeWidth: "2.5" }),
                e('text', { x: "500", y: "310", fill: "#ffffff", fontSize: "10.5", fontWeight: "bold", textAnchor: "middle" }, "🎭 AUDITORIUM"),
                e('text', { x: "500", y: "326", fill: "#e9d5ff", fontSize: "8.5", textAnchor: "middle" }, "Dr. Radhakrishnan Hall")
              ),

              // Main Canteen
              e('g', { onClick: () => setActiveModal(locations.find(l => l.id === 'main-canteen')), className: "cursor-pointer" },
                e('rect', { x: "690", y: "610", width: "120", height: "65", rx: "8", fill: "#7c2d12", stroke: "#ea580c", strokeWidth: "2.5" }),
                e('text', { x: "750", y: "640", fill: "#ffffff", fontSize: "11", fontWeight: "bold", textAnchor: "middle" }, "🍔 MAIN CANTEEN"),
                e('text', { x: "750", y: "658", fill: "#ffedd5", fontSize: "8.5", textAnchor: "middle" }, "Food Court & Cafe")
              ),

              // Sports Complex
              e('g', { onClick: () => setActiveModal(locations.find(l => l.id === 'sports-complex')), className: "cursor-pointer" },
                e('rect', { x: "740", y: "390", width: "120", height: "60", rx: "8", fill: "#881337", stroke: "#f43f5e", strokeWidth: "2.5" }),
                e('text', { x: "800", y: "420", fill: "#ffffff", fontSize: "10.5", fontWeight: "bold", textAnchor: "middle" }, "🏸 SPORTS COMPLEX"),
                e('text', { x: "800", y: "437", fill: "#ffe4e6", fontSize: "8.5", textAnchor: "middle" }, "Badminton & Gym")
              ),

              // Maggi Point
              e('g', { onClick: () => setActiveModal(locations.find(l => l.id === 'maggi-point')), className: "cursor-pointer" },
                e('circle', { cx: "310", cy: "580", r: "28", fill: "#854d0e", stroke: "#eab308", strokeWidth: "2" }),
                e('text', { x: "310", y: "584", fill: "#fef08a", fontSize: "9", fontWeight: "bold", textAnchor: "middle" }, "🍜 Maggi Point")
              ),

              // Boys Hostel
              e('g', { onClick: () => setActiveModal(locations.find(l => l.id === 'boys-hostel')), className: "cursor-pointer" },
                e('rect', { x: "130", y: "490", width: "110", height: "60", rx: "8", fill: "#3b0764", stroke: "#a855f7", strokeWidth: "2" }),
                e('text', { x: "185", y: "520", fill: "#ffffff", fontSize: "10", fontWeight: "bold", textAnchor: "middle" }, "🏠 BOYS HOSTEL"),
                e('text', { x: "185", y: "536", fill: "#f3e8ff", fontSize: "8", textAnchor: "middle" }, "Residency & Mess")
              ),

              // Girls Hostel
              e('g', { onClick: () => setActiveModal(locations.find(l => l.id === 'girls-hostel')), className: "cursor-pointer" },
                e('rect', { x: "160", y: "650", width: "110", height: "60", rx: "8", fill: "#581c87", stroke: "#c084fc", strokeWidth: "2" }),
                e('text', { x: "215", y: "680", fill: "#ffffff", fontSize: "10", fontWeight: "bold", textAnchor: "middle" }, "🏠 GIRLS HOSTEL"),
                e('text', { x: "215", y: "696", fill: "#f3e8ff", fontSize: "8", textAnchor: "middle" }, "Gated Residence")
              ),

              // Bus Bay
              e('g', { onClick: () => setActiveModal(locations.find(l => l.id === 'bus-bay')), className: "cursor-pointer" },
                e('rect', { x: "610", y: "835", width: "120", height: "50", rx: "6", fill: "#0f766e", stroke: "#14b8a6", strokeWidth: "2" }),
                e('text', { x: "670", y: "860", fill: "#ffffff", fontSize: "10", fontWeight: "bold", textAnchor: "middle" }, "🚌 BUS TERMINUS"),
                e('text', { x: "670", y: "874", fill: "#ccfbf1", fontSize: "8", textAnchor: "middle" }, "60+ College Buses")
              ),

              // Building Pin Markers
              displayedLocations.map(loc => {
                const isStart = loc.id === startLocationId;
                const isDest = loc.id === destLocationId;
                const isHovered = hoveredBuilding === loc.id;
                let pinColor = '#38bdf8';
                if (isStart) pinColor = '#10b981';
                if (isDest) pinColor = '#f43f5e';

                return e('g', {
                  key: loc.id,
                  transform: `translate(${loc.mapCoords.x}, ${loc.mapCoords.y})`,
                  className: "cursor-pointer",
                  onMouseEnter: () => setHoveredBuilding(loc.id),
                  onMouseLeave: () => setHoveredBuilding(null),
                  onClick: () => { setActiveModal(loc); onSelectBuilding(loc); }
                },
                  (isStart || isDest) && e('circle', { r: "20", fill: "none", stroke: pinColor, strokeWidth: "2.5", opacity: "0.8", className: "animate-ping" }),
                  e('circle', { r: (isStart || isDest || isHovered) ? "14" : "10", fill: pinColor, stroke: "#ffffff", strokeWidth: "2.5", filter: "url(#pinGlow)" }),
                  e('circle', { r: "4", fill: "#ffffff" }),
                  isHovered && e('g', { transform: "translate(0, -32)", className: "pointer-events-none" },
                    e('rect', { x: "-80", y: "-24", width: "160", height: "28", rx: "6", fill: "#0f172a", stroke: "#38bdf8", strokeWidth: "1.5" }),
                    e('text', { x: "0", y: "-7", fill: "#ffffff", fontSize: "10", fontWeight: "bold", textAnchor: "middle" }, loc.shortName)
                  )
                );
              })
            )
          )
        ),

        // Legend Footer
        e('div', { className: "bg-slate-950/90 border-t border-slate-800/80 px-4 py-3 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400" },
          e('div', { className: "flex flex-wrap items-center gap-4" },
            e('span', { className: "font-semibold text-slate-300" }, "Map Legend:"),
            e('div', { className: "flex items-center gap-1.5" },
              e('span', { className: "w-3 h-3 rounded-full bg-emerald-500 border border-white" }),
              e('span', null, "Start Location")
            ),
            e('div', { className: "flex items-center gap-1.5" },
              e('span', { className: "w-3 h-3 rounded-full bg-rose-500 border border-white" }),
              e('span', null, "Destination")
            ),
            e('div', { className: "flex items-center gap-1.5" },
              e('span', { className: "w-3 h-3 rounded-full bg-sky-400 border border-white" }),
              e('span', null, "Campus Building")
            )
          ),
          e('div', { className: "text-slate-500 text-[11px]" }, "*Click any building to select start or destination")
        )
      )
    );
  }

  // --- 7. Navigation Section ---
  function NavigationSection({ locations, startId, destId, onStartChange, onDestChange, onSwap, onGetDirections, isLoading }) {
    const quickRoutes = [
      { name: 'Main Gate ➔ Titanic Block', start: 'main-gate', dest: 'titanic-block' },
      { name: 'Titanic Block ➔ Main Canteen', start: 'titanic-block', dest: 'main-canteen' },
      { name: '1st Year Block ➔ Central Library', start: 'first-year-block', dest: 'central-library' }
    ];

    return e('section', { id: "navigate", className: "py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" },
      e('div', { className: "bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl text-white relative overflow-hidden" },
        e('div', { className: "text-center mb-8" },
          e('div', { className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold mb-3 border border-blue-500/30" },
            e(Icon, { name: "navigation", className: "w-3.5 h-3.5" }),
            e('span', null, "Campus Router")
          ),
          e('h2', { className: "text-2xl sm:text-4xl font-extrabold tracking-tight" }, "Get Campus Directions"),
          e('p', { className: "text-slate-300 text-sm sm:text-base mt-2" }, "Select your start and destination to calculate the shortest walking path.")
        ),

        e('div', { className: "bg-slate-800/80 backdrop-blur-md p-5 sm:p-7 rounded-2xl border border-slate-700/80 shadow-xl space-y-4 sm:space-y-0 sm:grid sm:grid-cols-[1fr_auto_1fr_auto] sm:gap-3 items-center" },
          // Start Dropdown
          e('div', null,
            e('label', { className: "block text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1.5 flex items-center gap-1.5" },
              e('span', { className: "w-2 h-2 rounded-full bg-emerald-400" }),
              e('span', null, "Starting Point")
            ),
            e('select', {
              value: startId,
              onChange: (ev) => onStartChange(ev.target.value),
              className: "w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-3.5 py-3 text-sm focus:outline-none focus:border-emerald-500 font-medium cursor-pointer"
            },
              locations.map(l => e('option', { key: l.id, value: l.id }, `${l.shortName} (${l.category})`))
            )
          ),

          // Swap Button
          e('div', { className: "flex justify-center sm:pt-6" },
            e('button', {
              onClick: onSwap,
              className: "p-3 bg-slate-700/70 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl border border-slate-600 transition-all hover:scale-110 active:scale-95",
              title: "Swap Locations",
              'aria-label': "Swap Locations"
            },
              e(Icon, { name: "swap", className: "w-5 h-5 text-blue-400 rotate-90 sm:rotate-0" })
            )
          ),

          // Destination Dropdown
          e('div', null,
            e('label', { className: "block text-xs font-bold uppercase tracking-wider text-rose-400 mb-1.5 flex items-center gap-1.5" },
              e('span', { className: "w-2 h-2 rounded-full bg-rose-400" }),
              e('span', null, "Destination")
            ),
            e('select', {
              value: destId,
              onChange: (ev) => onDestChange(ev.target.value),
              className: "w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-3.5 py-3 text-sm focus:outline-none focus:border-rose-500 font-medium cursor-pointer"
            },
              locations.map(l => e('option', { key: l.id, value: l.id }, `${l.shortName} (${l.category})`))
            )
          ),

          // Get Directions CTA
          e('div', { className: "sm:pt-6" },
            e('button', {
              onClick: onGetDirections,
              disabled: isLoading || !startId || !destId,
              className: "w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2"
            },
              isLoading
                ? [e('span', { key: 'spin', className: "w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" }), e('span', { key: 'txt' }, "Routing...")]
                : [e(Icon, { key: 'ic', name: "navigation", className: "w-4 h-4" }), e('span', { key: 'txt' }, "Get Directions")]
            )
          )
        ),

        // Quick Preset Buttons
        e('div', { className: "mt-5 flex flex-wrap items-center justify-center gap-2" },
          e('span', { className: "text-xs text-slate-400 font-medium" }, "Popular routes:"),
          quickRoutes.map((qr, idx) =>
            e('button', {
              key: idx,
              onClick: () => { onStartChange(qr.start); onDestChange(qr.dest); onGetDirections(); },
              className: "px-3 py-1 rounded-lg text-xs bg-slate-800/60 hover:bg-slate-750 text-slate-300 hover:text-white border border-slate-700/60 hover:border-blue-500/40 transition-colors"
            }, qr.name)
          )
        )
      )
    );
  }

  // --- 8. Sample Route / Directions Card ---
  function DirectionsCard({ route, onFocusMap, onClearRoute }) {
    const [copied, setCopied] = useState(false);
    if (!route) return null;

    const handleShare = () => {
      const text = `SNIST Campus Directions: From ${route.start.name} to ${route.destination.name} (~${route.walkTimeMinutes} mins walk, ${route.distanceMeters}m).`;
      if (navigator.clipboard) {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    };

    return e('div', { id: "directions-result", className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 animate-fadeIn" },
      e('div', { className: "bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden" },
        // Header
        e('div', { className: "bg-slate-900 text-white p-6 sm:p-7 relative overflow-hidden" },
          e('div', { className: "flex flex-col md:flex-row md:items-center justify-between gap-4" },
            e('div', null,
              e('div', { className: "flex items-center gap-2 mb-2" },
                e('span', { className: "px-2.5 py-0.5 rounded-full text-xs font-bold uppercase bg-blue-500/20 text-blue-300 border border-blue-500/30" }, "Recommended Route"),
                e('span', { className: "text-xs text-slate-400" }, "Paved Walkways")
              ),
              e('h3', { className: "text-xl sm:text-2xl font-bold text-white flex items-center gap-2" },
                e('span', null, route.start.shortName),
                e(Icon, { name: "arrow-right", className: "w-5 h-5 text-blue-400" }),
                e('span', { className: "text-blue-300" }, route.destination.shortName)
              )
            ),
            e('div', { className: "flex items-center gap-3" },
              e('div', { className: "bg-slate-800/90 border border-slate-700 rounded-2xl px-4 py-2.5 text-center" },
                e('div', { className: "flex items-center justify-center gap-1 text-emerald-400 text-lg font-extrabold" },
                  e(Icon, { name: "footprints", className: "w-5 h-5" }),
                  e('span', null, `${route.walkTimeMinutes} min`)
                ),
                e('div', { className: "text-[11px] text-slate-400 font-medium" }, "Walk Time")
              ),
              e('div', { className: "bg-slate-800/90 border border-slate-700 rounded-2xl px-4 py-2.5 text-center" },
                e('div', { className: "text-blue-400 text-lg font-extrabold" }, `${route.distanceMeters} m`),
                e('div', { className: "text-[11px] text-slate-400 font-medium" }, "Distance")
              )
            )
          )
        ),

        // Steps
        e('div', { className: "p-6 sm:p-8" },
          e('h4', { className: "text-xs font-bold uppercase tracking-wider text-slate-500 mb-5 flex items-center gap-2" },
            e(Icon, { name: "navigation", className: "w-4 h-4 text-blue-600" }),
            e('span', null, `Turn-by-Turn Navigation (${route.steps.length} Steps)`)
          ),
          e('div', { className: "relative pl-6 sm:pl-8 space-y-6 before:content-[''] before:absolute before:left-3 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200" },
            route.steps.map((step, idx) =>
              e('div', { key: idx, className: "relative group" },
                e('div', { className: `absolute -left-6 sm:-left-8 top-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ring-4 ring-white shadow-sm ${
                  idx === 0 ? 'bg-emerald-500 text-white' : (idx === route.steps.length - 1 ? 'bg-rose-500 text-white' : 'bg-blue-600 text-white')
                }` }, idx + 1),
                e('div', { className: "bg-slate-50/80 border border-slate-200/80 rounded-2xl p-4" },
                  e('div', { className: "flex items-center justify-between gap-1 mb-1" },
                    e('h5', { className: "font-bold text-slate-900 text-sm sm:text-base" }, step.title),
                    step.landmark && e('span', { className: "text-xs px-2.5 py-0.5 rounded-full bg-slate-200/70 text-slate-600 font-medium" }, `📍 ${step.landmark}`)
                  ),
                  e('p', { className: "text-sm text-slate-600 leading-relaxed" }, step.desc)
                )
              )
            )
          ),

          // Fresher Tip Banner
          route.fresherTip && e('div', { className: "mt-8 bg-amber-50/80 border border-amber-200/80 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5 text-amber-900 shadow-sm" },
            e('div', { className: "p-2 rounded-xl bg-amber-100 text-amber-700 shrink-0 mt-0.5" },
              e(Icon, { name: "info", className: "w-5 h-5" })
            ),
            e('div', null,
              e('h5', { className: "font-bold text-sm text-amber-900" }, "Senior's Tip for Juniors"),
              e('p', { className: "text-xs sm:text-sm text-amber-800 mt-1 leading-relaxed" }, route.fresherTip)
            )
          ),

          // Actions
          e('div', { className: "mt-6 pt-5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3" },
            e('button', { onClick: onFocusMap, className: "inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs sm:text-sm font-semibold transition-colors" },
              e(Icon, { name: "compass", className: "w-4 h-4" }),
              e('span', null, "View on Map")
            ),
            e('div', { className: "flex items-center gap-2" },
              e('button', { onClick: handleShare, className: "inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs sm:text-sm font-medium" },
                e(Icon, { name: "share-2", className: "w-4 h-4" }),
                e('span', null, copied ? "Copied!" : "Share Route")
              ),
              e('button', { onClick: onClearRoute, className: "inline-flex items-center gap-1 px-3 py-2 rounded-xl text-slate-500 hover:text-slate-800 text-xs sm:text-sm font-medium" },
                e(Icon, { name: "x", className: "w-4 h-4" }),
                e('span', null, "Close")
              )
            )
          )
        )
      )
    );
  }

  // --- 9. Popular Destinations Section ---
  function PopularDestinations({ locations, selectedCategory, onNavigateTo, onViewDetails }) {
    const displayed = selectedCategory
      ? locations.filter(l => l.category === selectedCategory)
      : locations.filter(l => l.popular);

    return e('section', { className: "py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" },
      e('div', { className: "flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4" },
        e('div', null,
          e('div', { className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-semibold mb-2 border border-amber-200" },
            e(Icon, { name: "star", className: "w-3.5 h-3.5 text-amber-500 fill-amber-500" }),
            e('span', null, "Campus Hotspots")
          ),
          e('h2', { className: "text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight" },
            selectedCategory ? 'Filtered Locations' : 'Popular Student Destinations'
          ),
          e('p', { className: "text-sm sm:text-base text-slate-600 mt-1" },
            selectedCategory ? `Showing ${displayed.length} spots in category` : 'Key destinations frequently visited by SNIST students.'
          )
        ),
        e('div', { className: "text-xs text-slate-500 font-medium" }, `Showing ${displayed.length} destinations`)
      ),

      e('div', { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" },
        displayed.map(loc =>
          e('div', {
            key: loc.id,
            className: "bg-white rounded-2xl border border-slate-200 hover:border-blue-400 hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group"
          },
            e('div', { className: "p-6" },
              e('div', { className: "flex items-start justify-between gap-3 mb-3" },
                e('span', { className: "px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-100" }, loc.category),
                loc.rating && e('div', { className: "flex items-center gap-1 text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200" },
                  e(Icon, { name: "star", className: "w-3 h-3 text-amber-500 fill-amber-500" }),
                  e('span', null, loc.rating)
                )
              ),
              e('h3', { className: "text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-2 leading-snug" }, loc.name),
              e('p', { className: "text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed mb-4" }, loc.desc),
              e('div', { className: "space-y-1.5 pt-3 border-t border-slate-100 text-xs text-slate-500" },
                e('div', { className: "flex items-center gap-2" },
                  e(Icon, { name: "layers", className: "w-4 h-4 text-slate-400 shrink-0" }),
                  e('span', null, loc.floors)
                ),
                e('div', { className: "flex items-center gap-2" },
                  e(Icon, { name: "clock", className: "w-4 h-4 text-slate-400 shrink-0" }),
                  e('span', null, loc.openHours)
                )
              )
            ),
            e('div', { className: "px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3" },
              e('button', {
                onClick: () => onViewDetails(loc),
                className: "px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-200/70 transition-colors"
              }, "View Details"),
              e('button', {
                onClick: () => onNavigateTo(loc),
                className: "flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md shadow-blue-600/20 hover:scale-[1.02] active:scale-95 transition-all"
              },
                e(Icon, { name: "navigation", className: "w-3.5 h-3.5" }),
                e('span', null, "Navigate Here")
              )
            )
          )
        )
      )
    );
  }

  // --- Location Details Modal ---
  function LocationModal({ location, onClose, onSetAsStart, onNavigateHere }) {
    if (!location) return null;

    useEffect(() => {
      const handler = (e) => { if (e.key === 'Escape') onClose(); };
      window.addEventListener('keydown', handler);
      return () => window.removeEventListener('keydown', handler);
    }, [onClose]);

    return e('div', {
      onClick: onClose,
      className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn"
    },
      e('div', {
        onClick: (ev) => ev.stopPropagation(),
        className: "bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 relative animate-scaleUp text-slate-800"
      },
        e('div', { className: "bg-gradient-to-r from-slate-900 to-blue-950 p-6 text-white relative" },
          e('button', { onClick: onClose, className: "absolute top-5 right-5 p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white" },
            e(Icon, { name: "x", className: "w-5 h-5" })
          ),
          e('div', { className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold uppercase tracking-wider mb-2 border border-blue-500/30" },
            location.category
          ),
          e('h3', { className: "text-xl sm:text-2xl font-extrabold text-white pr-8" }, location.name),
          e('div', { className: "flex flex-wrap items-center gap-4 mt-3 text-xs text-slate-300" },
            e('div', { className: "flex items-center gap-1.5" },
              e(Icon, { name: "layers", className: "w-4 h-4 text-blue-400" }),
              e('span', null, location.floors)
            ),
            e('div', { className: "flex items-center gap-1.5" },
              e(Icon, { name: "clock", className: "w-4 h-4 text-amber-400" }),
              e('span', null, location.openHours)
            )
          )
        ),
        e('div', { className: "p-6 sm:p-7 space-y-6" },
          e('div', null,
            e('h4', { className: "text-xs font-bold uppercase tracking-wider text-slate-400 mb-2" }, "Building Overview"),
            e('p', { className: "text-sm text-slate-600 leading-relaxed" }, location.desc)
          ),
          location.departments && e('div', null,
            e('h4', { className: "text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5" }, "Departments & Facilities"),
            e('div', { className: "flex flex-wrap gap-2" },
              location.departments.map((d, i) => e('span', { key: i, className: "px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 text-xs font-medium" }, d))
            )
          ),
          location.juniorTip && e('div', { className: "bg-blue-50/80 border border-blue-200/80 rounded-2xl p-4 flex items-start gap-3 text-blue-950" },
            e('div', { className: "p-2 rounded-xl bg-blue-100 text-blue-700 shrink-0 mt-0.5" },
              e(Icon, { name: "info", className: "w-4 h-4" })
            ),
            e('div', null,
              e('h5', { className: "font-bold text-xs uppercase tracking-wider text-blue-900" }, "Fresher's Campus Tip"),
              e('p', { className: "text-xs sm:text-sm text-blue-800 mt-1 leading-relaxed" }, location.juniorTip)
            )
          ),
          e('div', { className: "pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-end gap-3" },
            e('button', {
              onClick: () => { onSetAsStart(location.id); onClose(); },
              className: "w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700"
            }, "Set as Start Point"),
            e('button', {
              onClick: () => { onNavigateHere(location); onClose(); },
              className: "w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/30"
            },
              e(Icon, { name: "navigation", className: "w-4 h-4" }),
              e('span', null, `Navigate to ${location.shortName}`)
            )
          )
        )
      )
    );
  }

  // --- About & Junior Guide ---
  function LatestUpdatesSection({ announcements, locations }) {
    const activeAnnouncements = announcements.filter(announcement => announcement.active).slice(0, 3);
    return e('section', { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" },
      e('div', { className: "flex items-center justify-between mb-4" },
        e('div', null,
          e('p', { className: "text-xs font-bold uppercase tracking-widest text-blue-600" }, "Campus updates"),
          e('h2', { className: "text-2xl font-extrabold text-slate-900" }, "Latest notices")
        ),
        e('span', { className: "text-xs font-semibold text-slate-500" }, `${activeAnnouncements.length} active`)
      ),
      e('div', { className: "grid gap-3 md:grid-cols-3" }, activeAnnouncements.map(announcement => {
        const location = locations.find(item => item.id === announcement.affectedLocation);
        return e('article', { key: announcement.id, className: "rounded-2xl border border-slate-200 bg-white p-4 shadow-sm" },
          e('p', { className: "text-[10px] font-extrabold uppercase tracking-wider text-blue-600" }, announcement.priority),
          e('h3', { className: "mt-1 font-bold text-slate-900" }, announcement.title),
          e('p', { className: "mt-2 text-sm leading-6 text-slate-600" }, announcement.message),
          location && e('p', { className: "mt-3 text-xs font-semibold text-slate-500" }, `Location: ${location.shortName || location.name}`)
        );
      }))
    );
  }

  function NewPlacesSection({ locations, onNavigateTo, onViewDetails }) {
    const newLocations = locations.filter(location => location.isNew).slice(0, 3);
    if (newLocations.length === 0) return null;
    return e('section', { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8" },
      e('div', { className: "flex items-center justify-between mb-4" },
        e('h2', { className: "text-2xl font-extrabold text-slate-900" }, "New on campus"),
        e('span', { className: "text-xs font-semibold text-emerald-600" }, "Recently added")
      ),
      e('div', { className: "grid gap-4 md:grid-cols-3" }, newLocations.map(location => e('article', { key: location.id, className: "rounded-2xl border border-emerald-100 bg-emerald-50 p-5" },
        e('p', { className: "text-[10px] font-extrabold uppercase tracking-wider text-emerald-700" }, "New place"),
        e('h3', { className: "mt-1 font-bold text-slate-900" }, location.name),
        e('p', { className: "mt-2 text-sm text-slate-600" }, location.desc || location.description),
        e('div', { className: "mt-4 flex gap-2" },
          e('button', { onClick: () => onNavigateTo(location), className: "rounded-lg bg-emerald-600 px-3 py-2 text-xs font-bold text-white" }, "Navigate"),
          e('button', { onClick: () => onViewDetails(location), className: "rounded-lg border border-emerald-200 bg-white px-3 py-2 text-xs font-bold text-emerald-700" }, "Details")
        )
      )))
    );
  }

  function AboutSection() {
    const [activeFaq, setActiveFaq] = useState(null);
    const faqs = [
      { q: 'Where are first-year (freshman) classes conducted?', a: 'Most first-year B.Tech lectures and fundamental science labs (Physics, Chemistry, Basic Electrical) are held in Saraswathi Block.' },
      { q: 'Why is one building called the "Titanic Block"?', a: 'The CSE & IT department block was designed with a curved nautical facade that resembles the bow of a ship when viewed from aerial view!' },
      { q: 'Where can I get printouts and record sheets for labs?', a: 'The Student Stationary and Xerox Hub is on the ground floor near the Saraswathi Block arcade.' },
      { q: 'What are the college bus timings in the evening?', a: 'College buses depart sharply from the Bus Bay at 4:35 PM across 60+ routes in Hyderabad and Secunderabad.' }
    ];

    return e('section', { id: "about", className: "py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-200" },
      e('div', { className: "grid grid-cols-1 lg:grid-cols-12 gap-12 items-start" },
        e('div', { className: "lg:col-span-6 space-y-6" },
          e('div', { className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-200" },
            e(Icon, { name: "info", className: "w-3.5 h-3.5" }),
            e('span', null, "Junior Survival Guide")
          ),
          e('h2', { className: "text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight" },
            "Built for Freshers & Juniors at ",
            e('span', { className: "text-blue-600" }, "SNIST")
          ),
          e('p', { className: "text-base text-slate-600 leading-relaxed" },
            "Starting engineering at Sreenidhi Institute of Science and Technology is exciting, but navigating a 33-acre campus with 8+ academic blocks and dozens of labs can be tricky on day one."
          ),
          e('div', { className: "space-y-3 pt-2" },
            e('h4', { className: "text-xs font-bold uppercase tracking-wider text-slate-400" }, "Senior Advice"),
            e('div', { className: "flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200" },
              e('span', { className: "text-lg shrink-0" }, "🪪"),
              e('p', { className: "text-xs text-slate-700 leading-relaxed" },
                e('strong', null, "Always wear your ID card: "),
                "Required at main gate security, library turnstiles, and bus boarding."
              )
            ),
            e('div', { className: "flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200" },
              e('span', { className: "text-lg shrink-0" }, "🥪"),
              e('p', { className: "text-xs text-slate-700 leading-relaxed" },
                e('strong', null, "Lunch timing tip: "),
                "Canteen tokens peak at 12:45 PM. Grab snacks at Maggi Point if in a hurry."
              )
            )
          )
        ),
        e('div', { className: "lg:col-span-6 space-y-4" },
          e('h3', { className: "text-xl font-bold text-slate-900 tracking-tight" }, "Frequently Asked Questions"),
          faqs.map((f, i) => {
            const isOpen = activeFaq === i;
            return e('div', {
              key: i,
              className: `rounded-2xl border transition-all ${isOpen ? 'bg-blue-50/50 border-blue-200' : 'bg-white border-slate-200'}`
            },
              e('button', {
                onClick: () => setActiveFaq(isOpen ? null : i),
                className: "w-full text-left p-4 sm:p-5 flex items-center justify-between gap-3 font-semibold text-sm text-slate-800"
              },
                e('span', null, f.q),
                e(Icon, { name: "arrow-up", className: `w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-blue-600' : ''}` })
              ),
              isOpen && e('div', { className: "px-4 pb-5 text-sm text-slate-600 leading-relaxed border-t border-blue-100 pt-3" }, f.a)
            );
          }),
          e('div', { className: "mt-8 bg-rose-50 border border-rose-200 rounded-2xl p-5 text-rose-950" },
            e('div', { className: "flex items-center gap-2 font-bold text-sm text-rose-900 mb-2" },
              e(Icon, { name: "phone", className: "w-4 h-4 text-rose-600" }),
              e('span', null, "Campus Emergency Numbers")
            ),
            e('div', { className: "grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-rose-800" },
              e('div', { className: "p-2 rounded bg-rose-100/50" }, "🏥 Dispensary: 040-2763-7901"),
              e('div', { className: "p-2 rounded bg-rose-100/50" }, "🛡️ Gate Security: 040-2763-7905")
            )
          )
        )
      )
    );
  }

  // --- Footer ---
  function Footer({ onNavigate, apiConnected }) {
    return e('footer', { className: "bg-slate-950 text-slate-400 text-sm border-t border-slate-800" },
      e('div', { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs" },
        e('div', { className: "flex items-center gap-3" },
          e('div', { className: "w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white" },
            e(Icon, { name: "compass", className: "w-4 h-4" })
          ),
          e('div', null,
            e('span', { className: "font-bold text-white text-sm" }, "NAVIX Campus Navigator"),
            e('p', { className: "text-[11px] text-slate-500" }, "Sreenidhi Institute of Science & Technology, Hyderabad")
          )
        ),
        e('div', { className: "flex items-center gap-4 text-slate-400" },
          e('button', { onClick: () => onNavigate('home'), className: "hover:text-white" }, "Home"),
          e('button', { onClick: () => onNavigate('explore'), className: "hover:text-white" }, "Categories"),
          e('button', { onClick: () => onNavigate('map'), className: "hover:text-white" }, "Map"),
          e('button', { onClick: () => onNavigate('about'), className: "hover:text-white" }, "Junior Guide")
        ),
        e('div', { className: "flex items-center gap-2" },
          e('span', { className: `w-2 h-2 rounded-full ${apiConnected ? 'bg-emerald-400 animate-pulse' : 'bg-blue-400'}` }),
          e('span', { className: "text-slate-400 text-[11px]" }, apiConnected ? "Express REST API Connected (Port 5001)" : "Client Mode Active")
        )
      )
    );
  }

  // --- Landing / Role Selection Screen (Route: /) ---
  function LandingScreen({ onSelectRole }) {
    return e('div', { className: "min-h-screen bg-slate-950 text-white flex flex-col justify-between relative overflow-hidden font-sans selection:bg-blue-600 selection:text-white" },
      // Decorative Background Glows
      e('div', { className: "absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-blue-600/15 blur-[140px] rounded-full pointer-events-none" }),
      e('div', { className: "absolute bottom-0 right-10 w-[400px] h-[300px] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none" }),

      // Top Navigation Brand Header
      e('header', { className: "pt-8 px-6 max-w-7xl mx-auto w-full flex items-center justify-between z-10" },
        e('div', { className: "flex items-center gap-3" },
          e('div', { className: "w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/25" },
            e(Icon, { name: "compass", className: "w-6 h-6 text-white" })
          ),
          e('div', null,
            e('span', { className: "font-black text-2xl tracking-wider text-white" }, "NAVIX"),
            e('span', { className: "ml-2.5 text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30" }, "NAVIX Campus Navigator")
          )
        )
      ),

      // Main Role Selection Hero
      e('main', { className: "relative z-10 max-w-5xl mx-auto px-4 py-12 text-center my-auto" },
        e('div', { className: "inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs sm:text-sm font-semibold mb-6 shadow-sm animate-fadeIn" },
          e('span', { className: "w-2 h-2 rounded-full bg-emerald-400 animate-pulse" }),
          e('span', null, "NAVIX CAMPUS NAVIGATOR")
        ),

        e('h1', { className: "text-5xl sm:text-7xl font-black tracking-tight text-white mb-3 leading-tight animate-fadeIn" },
          "NAVIX"
        ),

        e('p', { className: "text-lg sm:text-2xl font-semibold text-blue-300/90 mb-12 tracking-wide animate-fadeIn" },
          "Navigate • Discover • Explore"
        ),

        // Role Cards Grid
        e('div', { className: "grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto text-left" },
          // Card 1: USER / STUDENT
          e('div', { className: "bg-slate-900/90 border border-slate-800 hover:border-blue-500/50 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between group" },
            e('div', null,
              e('div', { className: "flex items-center justify-between mb-6" },
                e('div', { className: "w-14 h-14 rounded-2xl bg-blue-600/20 border border-blue-500/30 text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform" },
                  e(Icon, { name: "user", className: "w-7 h-7" })
                ),
                e('span', { className: "text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20" }, "USER / STUDENT")
              ),
              e('h3', { className: "text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors" }, "Student Portal"),
              e('p', { className: "text-sm text-slate-400 leading-relaxed mb-8" },
                "Explore the campus, find places and navigate easily."
              )
            ),
            e('button', {
              onClick: () => onSelectRole('/user'),
              className: "w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-base shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 group-hover:scale-[1.02]"
            },
              e('span', null, "Continue as User"),
              e(Icon, { name: "arrow-right", className: "w-5 h-5 opacity-90 group-hover:translate-x-1 transition-transform" })
            )
          ),

          // Card 2: ADMIN
          e('div', { className: "bg-slate-900/90 border border-slate-800 hover:border-indigo-500/50 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between group" },
            e('div', null,
              e('div', { className: "flex items-center justify-between mb-6" },
                e('div', { className: "w-14 h-14 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 flex items-center justify-center group-hover:scale-110 transition-transform" },
                  e(Icon, { name: "admin", className: "w-7 h-7" })
                ),
                e('span', { className: "text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20" }, "ADMIN")
              ),
              e('h3', { className: "text-2xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors" }, "Admin Portal"),
              e('p', { className: "text-sm text-slate-400 leading-relaxed mb-8" },
                "Manage campus locations, updates and availability."
              )
            ),
            e('button', {
              onClick: () => onSelectRole('/admin'),
              className: "w-full py-4 px-6 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-base border border-slate-700 hover:border-indigo-500/40 shadow-lg transition-all flex items-center justify-center gap-2 group-hover:scale-[1.02]"
            },
              e('span', null, "Continue as Admin"),
              e(Icon, { name: "arrow-right", className: "w-5 h-5 opacity-90 group-hover:translate-x-1 transition-transform" })
            )
          )
        )
      ),

      // Footer
      e('footer', { className: "py-6 px-4 text-center text-xs text-slate-500 border-t border-slate-900 z-10" },
        "NAVIX • Sreenidhi Institute of Science & Technology"
      )
    );
  }

  // --- Admin Dashboard Screen (Route: /admin) ---
  function AdminDashboard({ locations, setLocations, announcements, setAnnouncements, issues, setIssues, activityLog, setActivityLog, setNotificationAlert, onNavigateRole }) {
    const [activeTab, setActiveTab] = useState('overview');

    const [toast, setToast] = useState(null);
    const showToast = (msg, type = 'success') => {
      setToast({ msg, type });
      setTimeout(() => setToast(null), 3500);
    };

    const [searchQuery, setSearchQuery] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [editingLocation, setEditingLocation] = useState(null);

    const [newLocForm, setNewLocForm] = useState({
      name: '',
      shortName: '',
      category: 'academic',
      openHours: '8:30 AM - 5:00 PM',
      contactInfo: '+91 40 2301 2345',
      mapCoordsX: 550,
      mapCoordsY: 550,
      floors: '3 Floors',
      departments: '',
      desc: '',
      juniorTip: '',
      tags: '',
      status: 'open',
      statusNotice: '',
      altLocation: '',
      isNew: true
    });

    const [newAnnForm, setNewAnnForm] = useState({
      title: '',
      priority: 'high',
      affectedLocation: 'central-library',
      message: ''
    });

    const [newIssueForm, setNewIssueForm] = useState({
      locationId: 'main-canteen',
      type: 'Maintenance',
      startTime: '10:00 AM',
      endTime: '04:00 PM',
      altLocation: 'Maggi Point Kiosk',
      description: ''
    });

    const [settings, setSettings] = useState({
      operationalMode: 'Exam Period (Extended Hours)',
      emergencyNotice: false,
      autoNotifyStudents: true,
      adminName: 'Dr. K. S. Sharma',
      adminDept: 'Campus Infrastructure & Security'
    });

    const handleSaveEditLocation = (e) => {
      if (e) e.preventDefault();
      if (!editingLocation) return;
      
      setLocations(prev => prev.map(loc => loc.id === editingLocation.id ? {
        ...editingLocation,
        mapCoords: { x: Number(editingLocation.mapCoordsX || editingLocation.mapCoords?.x || 500), y: Number(editingLocation.mapCoordsY || editingLocation.mapCoords?.y || 500) },
        lastUpdated: 'Just now'
      } : loc));
      
      setActivityLog(prev => [{
        id: 'act-' + Date.now(),
        text: `Updated location "${editingLocation.shortName || editingLocation.name}" (Status: ${editingLocation.status})`,
        time: 'Just now',
        type: 'update'
      }, ...prev]);

      showToast(`Location "${editingLocation.shortName || editingLocation.name}" saved!`);
      setEditingLocation(null);
    };

    const handleCreateLocation = (e) => {
      e.preventDefault();
      if (!newLocForm.name.trim()) {
        showToast('Please enter a location name', 'warning');
        return;
      }
      const newId = 'loc-' + Date.now();
      const created = {
        id: newId,
        name: newLocForm.name,
        shortName: newLocForm.shortName || newLocForm.name,
        category: newLocForm.category,
        openHours: newLocForm.openHours,
        contactInfo: newLocForm.contactInfo || '+91 40 2301 2345',
        floors: newLocForm.floors,
        departments: newLocForm.departments ? newLocForm.departments.split(',').map(s => s.trim()).filter(Boolean) : ['Main Facility'],
        desc: newLocForm.desc || 'Campus facility at SNIST.',
        juniorTip: newLocForm.juniorTip || 'Check notice board for campus guidelines.',
        tags: newLocForm.tags ? newLocForm.tags.split(',').map(s => s.trim()).filter(Boolean) : ['campus', 'facility'],
        status: newLocForm.status,
        statusNotice: newLocForm.statusNotice,
        altLocation: newLocForm.altLocation,
        isNew: newLocForm.isNew,
        popular: true,
        rating: 4.8,
        lastUpdated: 'Just now',
        mapCoords: { x: Number(newLocForm.mapCoordsX), y: Number(newLocForm.mapCoordsY) }
      };

      setLocations(prev => [created, ...prev]);
      setActivityLog(prev => [{
        id: 'act-' + Date.now(),
        text: `Created new campus spot "${created.shortName}"`,
        time: 'Just now',
        type: 'update'
      }, ...prev]);

      if (created.isNew) {
        setNotificationAlert(`New place near you: ${created.name} has been added in your locality.`);
      }

      showToast(`Location "${created.name}" created!`);
      setNewLocForm({
        name: '',
        shortName: '',
        category: 'academic',
        openHours: '8:30 AM - 5:00 PM',
        contactInfo: '+91 40 2301 2345',
        mapCoordsX: 550,
        mapCoordsY: 550,
        floors: '3 Floors',
        departments: '',
        desc: '',
        juniorTip: '',
        tags: '',
        status: 'open',
        statusNotice: '',
        altLocation: '',
        isNew: true
      });
      setActiveTab('locations');
    };

    const handleCreateAnnouncement = (e) => {
      e.preventDefault();
      if (!newAnnForm.title.trim() || !newAnnForm.message.trim()) {
        showToast('Please enter title and announcement message', 'warning');
        return;
      }
      const ann = {
        id: 'ann-' + Date.now(),
        title: newAnnForm.title,
        priority: newAnnForm.priority,
        affectedLocation: newAnnForm.affectedLocation,
        date: 'Just now',
        message: newAnnForm.message,
        active: true
      };
      setAnnouncements(prev => [ann, ...prev]);
      setActivityLog(prev => [{
        id: 'act-' + Date.now(),
        text: `Published campus update: "${ann.title}"`,
        time: 'Just now',
        type: 'announcement'
      }, ...prev]);

      showToast('Announcement published successfully!');
      setNewAnnForm({ title: '', priority: 'high', affectedLocation: 'central-library', message: '' });
    };

    const handleCreateIssue = (e) => {
      e.preventDefault();
      const iss = {
        id: 'iss-' + Date.now(),
        ...newIssueForm,
        status: 'Active'
      };
      setIssues(prev => [iss, ...prev]);

      setLocations(prev => prev.map(l => l.id === iss.locationId ? { ...l, status: 'unavailable', altLocation: iss.altLocation } : l));

      setActivityLog(prev => [{
        id: 'act-' + Date.now(),
        text: `Reported ${iss.type} issue at "${iss.locationId}"`,
        time: 'Just now',
        type: 'issue'
      }, ...prev]);

      showToast('Issue recorded and marked unavailable for users', 'success');
      setNewIssueForm({
        locationId: 'main-canteen',
        type: 'Maintenance',
        startTime: '10:00 AM',
        endTime: '04:00 PM',
        altLocation: 'Maggi Point Kiosk',
        description: ''
      });
    };

    const handleResolveIssue = (id) => {
      setIssues(prev => prev.filter(i => i.id !== id));
      showToast('Issue marked as resolved', 'success');
    };

    const handleSaveSettings = (e) => {
      e.preventDefault();
      showToast('System configuration & operating mode updated', 'success');
    };

    const filteredLocations = useMemo(() => {
      return locations.filter(loc => {
        const matchesCat = categoryFilter === 'all' || loc.category === categoryFilter;
        const q = searchQuery.toLowerCase();
        const matchesQ = !q || loc.name.toLowerCase().includes(q) || loc.shortName.toLowerCase().includes(q) || loc.id.toLowerCase().includes(q);
        return matchesCat && matchesQ;
      });
    }, [locations, categoryFilter, searchQuery]);

    const totalLocations = locations.length;
    const activeLocationsCount = locations.filter(l => l.status === 'open' || l.status === 'active').length;
    const newPlacesCount = locations.filter(l => l.isNew).length;
    const pendingUpdatesCount = announcements.length + issues.length;

    const navTabs = [
      { id: 'overview', label: 'Dashboard', icon: 'building' },
      { id: 'locations', label: 'My Locations', icon: 'map-pin', badge: locations.length },
      { id: 'add-location', label: 'Add Location', icon: 'plus' },
      { id: 'updates', label: 'Campus Updates', icon: 'bell', badge: announcements.length },
      { id: 'issues', label: 'Active Issues', icon: 'alert-triangle', badge: issues.length },
      { id: 'settings', label: 'Settings', icon: 'settings' }
    ];

    return e('div', { className: "min-h-screen bg-slate-950 text-white flex flex-col font-sans selection:bg-indigo-600 selection:text-white" },
      e('header', { className: "bg-slate-900/90 backdrop-blur-md border-b border-slate-800 py-3.5 px-4 sm:px-8 sticky top-0 z-40" },
        e('div', { className: "max-w-7xl mx-auto flex items-center justify-between gap-4" },
          e('div', { className: "flex items-center gap-3" },
            e('div', { className: "w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-600/30" },
              e(Icon, { name: "admin", className: "w-5 h-5" })
            ),
            e('div', null,
              e('div', { className: "flex items-center gap-2" },
                e('span', { className: "font-black text-xl text-white tracking-tight" }, "NAVIX"),
                e('span', { className: "text-[11px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30" }, "Admin Dashboard")
              ),
              e('p', { className: "text-xs text-slate-400 hidden sm:block" }, "Campus Infrastructure & Availability Operations")
            )
          ),
          e('div', { className: "flex items-center gap-3" },
            e('div', { className: "hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700/60 text-xs" },
              e('div', { className: "w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-300 flex items-center justify-center font-bold" }, "AD"),
              e('div', { className: "text-left leading-tight" },
                e('div', { className: "font-bold text-slate-200" }, settings.adminName),
                e('div', { className: "text-[10px] text-slate-400" }, settings.adminDept)
              )
            ),
            e('button', { onClick: () => onNavigateRole('/user'), className: "px-3 py-2 rounded-xl text-xs font-bold bg-blue-600" }, "View Nav"),
            e('button', { onClick: () => onNavigateRole('/'), className: "px-3 py-2 rounded-xl text-xs font-bold bg-slate-800" }, "Logout")
          )
        )
      ),

      e('div', { className: "max-w-7xl mx-auto w-full px-4 sm:px-8 py-6 flex-1 flex flex-col md:flex-row gap-6" },
        e('aside', { className: "w-full md:w-64 shrink-0 flex flex-col gap-4" },
          e('div', { className: "bg-slate-900/80 rounded-2xl p-3 border border-slate-800/80 shadow-md space-y-1" },
            e('div', { className: "px-3 py-2 text-[11px] font-bold tracking-wider uppercase text-slate-500" }, "Management Menu"),
            navTabs.map(tab => {
              const active = activeTab === tab.id;
              return e('button', {
                key: tab.id,
                onClick: () => setActiveTab(tab.id),
                className: `w-full px-3.5 py-2.5 rounded-xl font-bold text-xs flex items-center justify-between transition-all ${
                  active ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-800'
                }`
              },
                e('div', { className: "flex items-center gap-2.5" },
                  e(Icon, { name: tab.icon, className: "w-4 h-4" }),
                  e('span', null, tab.label)
                ),
                tab.badge !== undefined && e('span', { className: `px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                  active ? 'bg-indigo-700' : 'bg-slate-800'
                }` }, tab.badge)
              );
            })
          )
        ),

        e('main', { className: "flex-1 min-w-0" },
          activeTab === 'overview' && e('div', { className: "space-y-6" },
            e('div', { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" },
              e('div', { className: "p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-md" },
                e('div', { className: "text-xs font-bold uppercase text-slate-400" }, "Total Locations"),
                e('div', { className: "text-3xl font-black text-white mt-2" }, totalLocations)
              ),
              e('div', { className: "p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-md" },
                e('div', { className: "text-xs font-bold uppercase text-slate-400" }, "Active Locations"),
                e('div', { className: "text-3xl font-black text-emerald-400 mt-2" }, activeLocationsCount)
              ),
              e('div', { className: "p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-md" },
                e('div', { className: "text-xs font-bold uppercase text-slate-400" }, "Newly Added Places"),
                e('div', { className: "text-3xl font-black text-emerald-300 mt-2" }, newPlacesCount)
              ),
              e('div', { className: "p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-md" },
                e('div', { className: "text-xs font-bold uppercase text-slate-400" }, "Pending Updates & Issues"),
                e('div', { className: "text-3xl font-black text-amber-400 mt-2" }, pendingUpdatesCount)
              )
            ),

            e('div', { className: "grid grid-cols-1 lg:grid-cols-2 gap-6" },
              e('div', { className: "bg-slate-900/90 rounded-2xl p-6 border border-slate-800 space-y-4" },
                e('h3', { className: "font-bold text-slate-200 text-base flex items-center gap-2" },
                  e(Icon, { name: "clock", className: "w-4 h-4 text-indigo-400" }),
                  "Recent Management Activity"
                ),
                e('div', { className: "space-y-3 text-xs" },
                  activityLog.map(act => e('div', { key: act.id, className: "p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-slate-300" },
                    e('p', { className: "font-medium" }, act.text),
                    e('span', { className: "text-[10px] text-slate-500" }, act.time)
                  ))
                )
              ),

              e('div', { className: "bg-slate-900/90 rounded-2xl p-6 border border-slate-800 space-y-4" },
                e('h3', { className: "font-bold text-slate-200 text-base flex items-center gap-2" },
                  e(Icon, { name: "eye", className: "w-4 h-4 text-emerald-400" }),
                  "User Impact Preview Widget"
                ),
                e('div', { className: "p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-3" },
                  locations.length > 0 && e('div', { className: "p-3.5 rounded-lg bg-slate-900 border border-slate-800 space-y-2" },
                    e('div', { className: "flex items-center justify-between" },
                      e('span', { className: "font-extrabold text-white text-sm" }, locations[0].name),
                      locations[0].isNew && e('span', { className: "px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-600 text-white" }, "NEW")
                    ),
                    e('p', { className: "text-slate-400 text-[11px]" }, locations[0].desc),
                    e('div', { className: "text-[11px] text-slate-400" }, "Timings: ", e('strong', { className: "text-slate-200" }, locations[0].openHours))
                  )
                )
              )
            )
          ),

          activeTab === 'locations' && e('div', { className: "space-y-6" },
            e('div', { className: "bg-slate-900/90 rounded-2xl p-5 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4" },
              e('input', {
                type: "text",
                value: searchQuery,
                onChange: (e) => setSearchQuery(e.target.value),
                placeholder: "Search locations by name...",
                className: "w-full md:w-80 p-2.5 rounded-xl bg-slate-950 text-white text-xs border border-slate-800"
              }),
              e('button', {
                onClick: () => setActiveTab('add-location'),
                className: "px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold"
              }, "+ Add New Location")
            ),

            e('div', { className: "bg-slate-900/90 rounded-2xl border border-slate-800 overflow-x-auto" },
              e('table', { className: "w-full text-left text-xs" },
                e('thead', { className: "bg-slate-950 text-slate-400 uppercase font-bold text-[10px]" },
                  e('tr', null,
                    e('th', { className: "p-4" }, "Location Name"),
                    e('th', { className: "p-4" }, "Category"),
                    e('th', { className: "p-4" }, "Map Coords"),
                    e('th', { className: "p-4" }, "Status"),
                    e('th', { className: "p-4" }, "Timings & Contact"),
                    e('th', { className: "p-4 text-right" }, "Actions")
                  )
                ),
                e('tbody', { className: "divide-y divide-slate-800" },
                  filteredLocations.map(loc => e('tr', { key: loc.id, className: "hover:bg-slate-800/40" },
                    e('td', { className: "p-4" },
                      e('div', { className: "font-extrabold text-white text-sm flex items-center gap-2" },
                        loc.name,
                        loc.isNew && e('span', { className: "px-2 py-0.5 rounded text-[9px] font-extrabold bg-emerald-600 text-white" }, "NEW")
                      )
                    ),
                    e('td', { className: "p-4 capitalize text-slate-300" }, loc.category),
                    e('td', { className: "p-4 font-mono text-indigo-300" }, `X:${loc.mapCoords?.x || 500}, Y:${loc.mapCoords?.y || 500}`),
                    e('td', { className: "p-4 capitalize" }, loc.status || 'open'),
                    e('td', { className: "p-4 text-slate-300" }, loc.openHours),
                    e('td', { className: "p-4 text-right" },
                      e('button', {
                        onClick: () => setEditingLocation({ ...loc, mapCoordsX: loc.mapCoords?.x || 500, mapCoordsY: loc.mapCoords?.y || 500 }),
                        className: "px-3 py-1.5 rounded-lg bg-indigo-600/30 text-indigo-200 font-bold"
                      }, "Edit")
                    )
                  ))
                )
              )
            )
          ),

          activeTab === 'add-location' && e('form', { onSubmit: handleCreateLocation, className: "bg-slate-900/90 rounded-2xl p-6 border border-slate-800 space-y-4 max-w-3xl" },
            e('h3', { className: "text-lg font-bold text-white" }, "Add New Campus Location"),
            e('div', { className: "grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs" },
              e('div', null,
                e('label', { className: "block font-bold text-slate-300 mb-1" }, "Location Name *"),
                e('input', {
                  type: "text",
                  required: true,
                  value: newLocForm.name,
                  onChange: (e) => setNewLocForm({ ...newLocForm, name: e.target.value }),
                  placeholder: "e.g. SNIST Student Shopping Mall",
                  className: "w-full p-2.5 rounded-xl bg-slate-950 text-white border border-slate-800"
                })
              ),
              e('div', null,
                e('label', { className: "block font-bold text-slate-300 mb-1" }, "Short Name"),
                e('input', {
                  type: "text",
                  value: newLocForm.shortName,
                  onChange: (e) => setNewLocForm({ ...newLocForm, shortName: e.target.value }),
                  placeholder: "e.g. Student Mall",
                  className: "w-full p-2.5 rounded-xl bg-slate-950 text-white border border-slate-800"
                })
              ),
              e('div', null,
                e('label', { className: "block font-bold text-slate-300 mb-1" }, "Category"),
                e('select', {
                  value: newLocForm.category,
                  onChange: (e) => setNewLocForm({ ...newLocForm, category: e.target.value }),
                  className: "w-full p-2.5 rounded-xl bg-slate-950 text-white border border-slate-800"
                }, CATEGORIES.map(c => e('option', { key: c.id, value: c.id }, c.name)))
              ),
              e('div', null,
                e('label', { className: "block font-bold text-slate-300 mb-1" }, "Opening Hours / Timings"),
                e('input', {
                  type: "text",
                  value: newLocForm.openHours,
                  onChange: (e) => setNewLocForm({ ...newLocForm, openHours: e.target.value }),
                  className: "w-full p-2.5 rounded-xl bg-slate-950 text-white border border-slate-800"
                })
              ),
              e('div', null,
                e('label', { className: "block font-bold text-slate-300 mb-1" }, "Map Coords X"),
                e('input', {
                  type: "number",
                  value: newLocForm.mapCoordsX,
                  onChange: (e) => setNewLocForm({ ...newLocForm, mapCoordsX: e.target.value }),
                  className: "w-full p-2.5 rounded-xl bg-slate-950 text-white border border-slate-800"
                })
              ),
              e('div', null,
                e('label', { className: "block font-bold text-slate-300 mb-1" }, "Map Coords Y"),
                e('input', {
                  type: "number",
                  value: newLocForm.mapCoordsY,
                  onChange: (e) => setNewLocForm({ ...newLocForm, mapCoordsY: e.target.value }),
                  className: "w-full p-2.5 rounded-xl bg-slate-950 text-white border border-slate-800"
                })
              ),
              e('div', null,
                e('label', { className: "block font-bold text-slate-300 mb-1" }, "Contact Info"),
                e('input', {
                  type: "text",
                  value: newLocForm.contactInfo,
                  onChange: (e) => setNewLocForm({ ...newLocForm, contactInfo: e.target.value }),
                  className: "w-full p-2.5 rounded-xl bg-slate-950 text-white border border-slate-800"
                })
              ),
              e('div', null,
                e('label', { className: "block font-bold text-slate-300 mb-1" }, "Status / Availability"),
                e('select', {
                  value: newLocForm.status,
                  onChange: (e) => setNewLocForm({ ...newLocForm, status: e.target.value }),
                  className: "w-full p-2.5 rounded-xl bg-slate-950 text-white border border-slate-800"
                },
                  e('option', { value: "open" }, "Open"),
                  e('option', { value: "closed" }, "Closed"),
                  e('option', { value: "unavailable" }, "Temporarily Unavailable"),
                  e('option', { value: "maintenance" }, "Under Maintenance")
                )
              )
            ),

            e('div', { className: "pt-2 text-xs space-y-3" },
              e('label', { className: "flex items-center gap-3 cursor-pointer p-3 rounded-xl bg-slate-950 border border-slate-800" },
                e('input', {
                  type: "checkbox",
                  checked: newLocForm.isNew,
                  onChange: (e) => setNewLocForm({ ...newLocForm, isNew: e.target.checked }),
                  className: "w-4 h-4 accent-indigo-600 rounded"
                }),
                e('span', { className: "font-bold text-white" }, "Mark as Newly Added Place (Displays 'NEW' Badge & User Alert)")
              ),
              e('div', null,
                e('label', { className: "block font-bold text-slate-300 mb-1" }, "Description"),
                e('textarea', {
                  rows: 2,
                  value: newLocForm.desc,
                  onChange: (e) => setNewLocForm({ ...newLocForm, desc: e.target.value }),
                  className: "w-full p-2.5 rounded-xl bg-slate-950 text-white border border-slate-800"
                })
              )
            ),

            e('div', { className: "flex justify-end pt-4" },
              e('button', {
                type: "submit",
                className: "px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg"
              }, "Add Campus Location")
            )
          ),

          activeTab === 'updates' && e('div', { className: "space-y-6" },
            e('form', { onSubmit: handleCreateAnnouncement, className: "bg-slate-900/90 rounded-2xl p-6 border border-slate-800 space-y-4" },
              e('h3', { className: "text-lg font-bold text-white" }, "Post Campus Update & Announcement"),
              e('input', {
                type: "text",
                required: true,
                value: newAnnForm.title,
                onChange: (e) => setNewAnnForm({ ...newAnnForm, title: e.target.value }),
                placeholder: "Announcement Title...",
                className: "w-full p-2.5 rounded-xl bg-slate-950 text-white text-xs border border-slate-800"
              }),
              e('textarea', {
                rows: 2,
                required: true,
                value: newAnnForm.message,
                onChange: (e) => setNewAnnForm({ ...newAnnForm, message: e.target.value }),
                placeholder: "Announcement Details...",
                className: "w-full p-2.5 rounded-xl bg-slate-950 text-white text-xs border border-slate-800"
              }),
              e('button', { type: "submit", className: "px-6 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-bold" }, "Publish Update")
            )
          ),

          activeTab === 'issues' && e('div', { className: "space-y-6" },
            e('form', { onSubmit: handleCreateIssue, className: "bg-slate-900/90 rounded-2xl p-6 border border-slate-800 space-y-4 text-xs" },
              e('h3', { className: "text-lg font-bold text-white" }, "Report Facility Maintenance / Unavailable"),
              e('select', {
                value: newIssueForm.locationId,
                onChange: (e) => setNewIssueForm({ ...newIssueForm, locationId: e.target.value }),
                className: "w-full p-2.5 rounded-xl bg-slate-950 text-white border border-slate-800"
              }, locations.map(l => e('option', { key: l.id, value: l.id }, l.name))),
              e('input', {
                type: "text",
                value: newIssueForm.altLocation,
                onChange: (e) => setNewIssueForm({ ...newIssueForm, altLocation: e.target.value }),
                placeholder: "Suggested Alternate Location...",
                className: "w-full p-2.5 rounded-xl bg-slate-950 text-white border border-slate-800"
              }),
              e('button', { type: "submit", className: "px-6 py-2.5 rounded-xl bg-amber-600 text-white font-bold" }, "Log Issue")
            )
          ),

          activeTab === 'settings' && e('form', { onSubmit: handleSaveSettings, className: "bg-slate-900/90 rounded-2xl p-6 border border-slate-800 space-y-4 max-w-xl text-xs" },
            e('h3', { className: "text-lg font-bold text-white" }, "System Settings"),
            e('label', { className: "block font-bold text-slate-300 mb-1" }, "Campus Operating Mode"),
            e('select', {
              value: settings.operationalMode,
              onChange: (e) => setSettings({ ...settings, operationalMode: e.target.value }),
              className: "w-full p-2.5 rounded-xl bg-slate-950 text-white border border-slate-800"
            },
              e('option', { value: "Normal Semester Mode" }, "Normal Semester Mode"),
              e('option', { value: "Exam Period (Extended Hours)" }, "Exam Period (Extended Hours)"),
              e('option', { value: "Festival / Event Mode" }, "Festival / Event Mode")
            ),
            e('button', { type: "submit", className: "px-6 py-2.5 rounded-xl bg-indigo-600 text-white font-bold" }, "Save Settings")
          )
        )
      ),

      editingLocation && e('div', { className: "fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4" },
        e('div', { className: "bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto p-6 space-y-4 text-xs" },
          e('h3', { className: "font-bold text-white text-base" }, "Edit Location Details"),
          e('div', { className: "grid grid-cols-2 gap-3" },
            e('div', null,
              e('label', { className: "block font-bold text-slate-300 mb-1" }, "Name"),
              e('input', {
                type: "text",
                value: editingLocation.name || '',
                onChange: (e) => setEditingLocation({ ...editingLocation, name: e.target.value }),
                className: "w-full p-2.5 rounded-xl bg-slate-950 text-white border border-slate-800"
              })
            ),
            e('div', null,
              e('label', { className: "block font-bold text-slate-300 mb-1" }, "Status"),
              e('select', {
                value: editingLocation.status || 'open',
                onChange: (e) => setEditingLocation({ ...editingLocation, status: e.target.value }),
                className: "w-full p-2.5 rounded-xl bg-slate-950 text-white border border-slate-800"
              },
                e('option', { value: "open" }, "Open"),
                e('option', { value: "closed" }, "Closed"),
                e('option', { value: "unavailable" }, "Temporarily Unavailable"),
                e('option', { value: "maintenance" }, "Under Maintenance")
              )
            ),
            e('div', null,
              e('label', { className: "block font-bold text-slate-300 mb-1" }, "Map Coords X"),
              e('input', {
                type: "number",
                value: editingLocation.mapCoordsX || 500,
                onChange: (e) => setEditingLocation({ ...editingLocation, mapCoordsX: e.target.value }),
                className: "w-full p-2.5 rounded-xl bg-slate-950 text-white border border-slate-800"
              })
            ),
            e('div', null,
              e('label', { className: "block font-bold text-slate-300 mb-1" }, "Map Coords Y"),
              e('input', {
                type: "number",
                value: editingLocation.mapCoordsY || 500,
                onChange: (e) => setEditingLocation({ ...editingLocation, mapCoordsY: e.target.value }),
                className: "w-full p-2.5 rounded-xl bg-slate-950 text-white border border-slate-800"
              })
            )
          ),
          e('label', { className: "flex items-center gap-2 cursor-pointer pt-2" },
            e('input', {
              type: "checkbox",
              checked: !!editingLocation.isNew,
              onChange: (e) => setEditingLocation({ ...editingLocation, isNew: e.target.checked }),
              className: "w-4 h-4 accent-indigo-600"
            }),
            e('span', { className: "font-bold text-white" }, "Mark as Newly Added Place ('NEW' Badge)")
          ),
          e('div', { className: "flex items-center justify-end gap-3 pt-4 border-t border-slate-800" },
            e('button', { onClick: () => setEditingLocation(null), className: "px-4 py-2 rounded-xl bg-slate-800 text-slate-300" }, "Cancel"),
            e('button', { onClick: handleSaveEditLocation, className: "px-5 py-2 rounded-xl bg-indigo-600 text-white font-bold" }, "Save Changes")
          )
        )
      ),

      toast && e('div', { className: "fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl bg-slate-900 text-white border border-slate-700 text-xs font-bold" }, toast.msg),

      e('footer', { className: "py-4 text-center text-xs text-slate-500 border-t border-slate-900" }, "NAVIX • Admin Workspace")
    );
  }

  // --- User Campus Navigator Screen (Route: /user) ---
  function UserCampusNavigator({ locations, announcements, issues, notificationAlert, setNotificationAlert, onNavigateRole }) {
    const [startId, setStartId] = useState('main-gate');
    const [destId, setDestId] = useState('titanic-block');
    const [route, setRoute] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedModal, setSelectedModal] = useState(null);
    const [activeTab, setActiveTab] = useState('home');
    const [isRouting, setIsRouting] = useState(false);
    const [apiConnected, setApiConnected] = useState(false);
    const API_BASE = 'http://localhost:5001/api';

    useEffect(() => {
      fetch(`${API_BASE}/health`)
        .then(res => res.json())
        .then(data => { if (data.status === 'ok') setApiConnected(true); })
        .catch(() => {});
    }, []);

    const requestRoute = async (from, to) => {
      try {
        const response = await fetch(`${API_BASE}/routes?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`);
        const payload = await response.json();
        if (payload.success) return payload.data;
      } catch (error) {
        // Keep the existing offline route calculation available when the API is unavailable.
      }
      return calculateRoute(from, to);
    };

    useEffect(() => {
      requestRoute('main-gate', 'titanic-block').then(setRoute);
    }, []);

    const handleGetDirections = () => {
      if (!startId || !destId) return;
      setIsRouting(true);
      requestRoute(startId, destId).then((calculatedRoute) => {
        setRoute(calculatedRoute);
        setIsRouting(false);
        const el = document.getElementById('directions-result');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      });
    };

    const handleSwap = () => {
      const prevStart = startId;
      setStartId(destId);
      setDestId(prevStart);
      if (destId && prevStart) {
        requestRoute(destId, prevStart).then(setRoute);
      }
    };

    const handleQuickNavigate = (loc) => {
      setDestId(loc.id);
      const currentStart = startId || 'main-gate';
      requestRoute(currentStart, loc.id).then(setRoute);
      const el = document.getElementById('directions-result') || document.getElementById('navigate');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    const handleNavbarNavigate = (id) => {
      setActiveTab(id);
      if (id === 'home') window.scrollTo({ top: 0, behavior: 'smooth' });
      else {
        const target = document.getElementById(id);
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      }
    };

    return e('div', { className: "min-h-screen bg-slate-100 text-slate-900 flex flex-col font-sans" },
      e(Navbar, { onNavigate: handleNavbarNavigate, activeTab, onNavigateRole }),

      notificationAlert && e('div', { className: "bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-600 text-white py-3 px-4 sm:px-8 shadow-md flex items-center justify-between text-xs sm:text-sm font-bold border-b border-blue-500/30" },
        e('div', { className: "flex items-center gap-2 max-w-5xl" },
          e('span', { className: "px-2 py-0.5 rounded-full bg-white/20 text-white text-[10px] uppercase tracking-wider font-extrabold" }, "ALERT"),
          e('span', null, notificationAlert)
        ),
        e('button', { onClick: () => setNotificationAlert(''), className: "p-1 rounded-lg hover:bg-white/20 text-white/80" }, e(Icon, { name: "x", className: "w-4 h-4" }))
      ),

      e('main', { className: "flex-1" },
        e(HeroSearch, {
          locations,
          onSelectLocation: (loc) => setSelectedModal(loc),
          onQuickNavigate: handleQuickNavigate
        }),
        e(LatestUpdatesSection, { announcements, locations }),
        e(CategoryCards, {
          selectedCategory,
          onSelectCategory: (catId) => setSelectedCategory(catId)
        }),
        e(CampusMap, {
          locations,
          startLocationId: startId,
          destLocationId: destId,
          selectedCategory,
          onSelectBuilding: (loc) => setSelectedModal(loc),
          onSetAsStart: (id) => { setStartId(id); if (destId) setRoute(calculateRoute(id, destId)); },
          onSetAsDestination: (id) => { setDestId(id); if (startId) setRoute(calculateRoute(startId, id)); }
        }),
        e(NewPlacesSection, { locations, onNavigateTo: handleQuickNavigate, onViewDetails: (loc) => setSelectedModal(loc) }),
        e(NavigationSection, {
          locations,
          startId,
          destId,
          onStartChange: setStartId,
          onDestChange: setDestId,
          onSwap: handleSwap,
          onGetDirections: handleGetDirections,
          isLoading: isRouting
        }),
        route && e(DirectionsCard, {
          route,
          onFocusMap: () => {
            const el = document.getElementById('map');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          },
          onClearRoute: () => setRoute(null)
        }),
        e(PopularDestinations, {
          locations,
          selectedCategory,
          onNavigateTo: handleQuickNavigate,
          onViewDetails: (loc) => setSelectedModal(loc)
        }),
        e(AboutSection, null)
      ),
      selectedModal && e(LocationModal, {
        location: selectedModal,
        onClose: () => setSelectedModal(null),
        onSetAsStart: (id) => { setStartId(id); if (destId) setRoute(calculateRoute(id, destId)); },
        onNavigateHere: handleQuickNavigate
      }),
      e(Footer, { onNavigate: handleNavbarNavigate, apiConnected })
    );
  }

  // --- Main App Coordinator Router ---
  function App() {
    const getInitialPath = () => {
      const hash = (window.location.hash || '').replace('#', '').trim();
      if (hash === '/dashboard') return '/admin';
      if (hash === '/user' || hash === '/admin' || hash === '/') return hash;
      const path = (window.location.pathname || '').trim().replace(/\/$/, '');
      if (path === '/dashboard') return '/admin';
      if (path === '/user' || path === '/admin') return path;
      return '/';
    };

    const [currentRoute, setCurrentRoute] = useState(getInitialPath);

    // Lifted shared reactive state across Admin & User interfaces
    const [locations, setLocations] = useState(() => {
      const initial = CAMPUS_LOCATIONS.map(loc => ({
        ...loc,
        contactInfo: loc.contactInfo || '+91 40 2301 2345',
        status: loc.status || (loc.id === 'mechanical-workshop' ? 'maintenance' : 'open'),
        statusNotice: loc.statusNotice || (loc.id === 'mechanical-workshop' ? 'Annual machinery calibration work' : ''),
        altLocation: loc.altLocation || (loc.id === 'mechanical-workshop' ? 'Visvesvaraya Block Shed B' : ''),
        isNew: loc.isNew || false,
        lastUpdated: loc.lastUpdated || 'Today, 09:00 AM'
      }));

      if (!initial.some(l => l.id === 'new-shopping-mall')) {
        initial.unshift({
          id: 'new-shopping-mall',
          name: 'SNIST Student Shopping Mall & Mart',
          shortName: 'Student Mall & Mart',
          category: 'facilities',
          floors: '2 Floors',
          departments: ['Stationery & Textbooks', 'Electronics', 'Express Xerox & Print', 'Snack Counter'],
          openHours: '8:30 AM - 8:30 PM',
          contactInfo: '+91 98765 12345',
          status: 'open',
          statusNotice: '',
          altLocation: '',
          isNew: true,
          popular: true,
          rating: 4.9,
          mapCoords: { x: 550, y: 760 },
          desc: 'Newly opened multi-purpose student mart with stationery, books, electronics, snacks, and express printout counters.',
          juniorTip: 'Great spot for quick printing of lab manuals and buying project materials without leaving campus.',
          tags: ['shopping', 'mart', 'books', 'stationery', 'prints', 'new'],
          lastUpdated: 'Just now'
        });
      }
      return initial;
    });

    useEffect(() => {
      fetch('http://localhost:5001/api/locations')
        .then(response => response.json())
        .then(payload => {
          if (!payload.success || !Array.isArray(payload.data) || payload.data.length === 0) return;
          setLocations(payload.data.map(location => ({
            ...location,
            shortName: location.shortName || location.building || location.name,
            desc: location.desc || location.description || '',
            openHours: location.openHours || location.openingHours || '',
            departments: location.departments || location.facilities || [],
            tags: location.tags || [],
            mapCoords: location.mapCoords || { x: 500, y: 500 },
            status: location.status || 'open'
          })));
        })
        .catch(() => {});
    }, []);

    const [announcements, setAnnouncements] = useState([
      {
        id: 'ann-1',
        title: 'Central Library Mid-Term Extended Hours',
        priority: 'high',
        affectedLocation: 'central-library',
        date: 'Today, 10:00 AM',
        message: 'Library will remain open until 10:00 PM for mid-term exam preparation.',
        active: true
      },
      {
        id: 'ann-2',
        title: 'Main Canteen Counter Maintenance',
        priority: 'medium',
        affectedLocation: 'main-canteen',
        date: 'Today, 08:30 AM',
        message: 'Juice and fast food counter undergoing plumbing maintenance until 2:00 PM.',
        active: true
      }
    ]);

    const [issues, setIssues] = useState([
      {
        id: 'iss-1',
        locationId: 'mech-civil-block',
        type: 'Maintenance',
        startTime: '09:00 AM',
        endTime: '04:00 PM',
        altLocation: 'Visvesvaraya Block Shed B',
        description: 'Heavy machinery calibration and wiring inspection.',
        status: 'Active'
      }
    ]);

    const [activityLog, setActivityLog] = useState([
      { id: 'act-1', text: 'Added new location "SNIST Student Mall & Mart"', time: '5 mins ago', type: 'update' },
      { id: 'act-2', text: 'Central Library opening hours updated to 8:00 AM - 10:00 PM', time: '10 mins ago', type: 'update' },
      { id: 'act-3', text: 'Published announcement: Mid-Term Extended Hours', time: '2 hours ago', type: 'announcement' }
    ]);

    const [notificationAlert, setNotificationAlert] = useState('New place near you: SNIST Student Mall & Mart has been added in your locality.');

    useEffect(() => {
      const handlePopState = () => {
        setCurrentRoute(getInitialPath());
      };
      window.addEventListener('popstate', handlePopState);
      window.addEventListener('hashchange', handlePopState);
      return () => {
        window.removeEventListener('popstate', handlePopState);
        window.removeEventListener('hashchange', handlePopState);
      };
    }, []);

    const navigateRole = (path) => {
      try {
        window.history.pushState(null, '', path);
      } catch (e) {
        window.location.hash = path;
      }
      setCurrentRoute(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (currentRoute === '/user') {
      return e(UserCampusNavigator, {
        locations,
        announcements,
        issues,
        notificationAlert,
        setNotificationAlert,
        onNavigateRole: navigateRole
      });
    }
    if (currentRoute === '/admin') {
      return e(AdminDashboard, {
        locations,
        setLocations,
        announcements,
        setAnnouncements,
        issues,
        setIssues,
        activityLog,
        setActivityLog,
        setNotificationAlert,
        onNavigateRole: navigateRole
      });
    }
    return e(LandingScreen, { onSelectRole: navigateRole });
  }

  // Mount React Root
  const container = document.getElementById('root');
  if (container) {
    const root = ReactDOM.createRoot(container);
    root.render(e(App));
  }
})();
