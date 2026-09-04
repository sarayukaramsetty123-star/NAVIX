import React, { useState } from 'react';
import { Icon } from './Icons.js';

export function CampusMap({ 
  locations, 
  startLocationId, 
  destLocationId, 
  selectedCategory, 
  onSelectBuilding,
  onSetAsStart,
  onSetAsDestination
}) {
  const [zoom, setZoom] = useState(1);
  const [hoveredBuilding, setHoveredBuilding] = useState(null);
  const [activeBuildingModal, setActiveBuildingModal] = useState(null);

  // Zoom controls
  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.25, 2.0));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.25, 0.75));
  const handleReset = () => setZoom(1);

  const startLoc = locations.find(l => l.id === startLocationId);
  const destLoc = locations.find(l => l.id === destLocationId);

  // Filter locations if category is selected
  const displayedLocations = selectedCategory 
    ? locations.filter(l => l.category === selectedCategory)
    : locations;

  // Compute intermediate navigation pathway points for route visualization
  let routePathString = '';
  if (startLoc && destLoc && startLoc.id !== destLoc.id) {
    const p1 = startLoc.mapCoords;
    const p2 = destLoc.mapCoords;
    // Route passes through central courtyard if crossing campus
    const midX = (p1.x + p2.x) / 2 + (p1.x > p2.x ? -20 : 20);
    const midY = (p1.y + p2.y) / 2;
    routePathString = `M ${p1.x} ${p1.y} Q ${midX} ${midY} ${p2.x} ${p2.y}`;
  }

  return (
    <section id="map" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold mb-2 border border-indigo-200">
            <Icon name="compass" className="w-3.5 h-3.5" />
            <span>Campus Blueprint</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            SNIST Interactive Campus Map
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-1">
            Click any building to inspect floors, departments, or set as your route destination.
          </p>
        </div>

        {/* Map Control Toolbar */}
        <div className="flex items-center gap-2 self-start sm:self-auto bg-white p-1.5 rounded-xl border border-slate-200 shadow-sm">
          <button
            onClick={handleZoomIn}
            className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            title="Zoom In"
            aria-label="Zoom In"
          >
            <Icon name="zoom-in" className="w-4 h-4" />
          </button>
          <button
            onClick={handleZoomOut}
            className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            title="Zoom Out"
            aria-label="Zoom Out"
          >
            <Icon name="zoom-out" className="w-4 h-4" />
          </button>
          <button
            onClick={handleReset}
            className="px-2.5 py-1 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            title="Reset Zoom"
          >
            Reset
          </button>
          <div className="h-4 w-px bg-slate-200 mx-1" />
          <span className="text-xs font-medium text-slate-500 px-2">
            {Math.round(zoom * 100)}%
          </span>
        </div>
      </div>

      {/* Map Display Frame */}
      <div className="relative bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
        {/* Top Overlay Badge */}
        <div className="absolute top-4 left-4 z-20 flex flex-wrap items-center gap-2 pointer-events-none">
          <div className="px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-700/80 backdrop-blur-md text-xs font-medium text-slate-200 flex items-center gap-2 shadow-lg">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span>Interactive SNIST 2D Schematic</span>
          </div>

          {selectedCategory && (
            <div className="px-3 py-1.5 rounded-xl bg-blue-600/90 border border-blue-400/50 backdrop-blur-md text-xs font-medium text-white flex items-center gap-1.5 shadow-lg">
              <span>Filtering:</span>
              <span className="font-semibold capitalize">{selectedCategory}</span>
            </div>
          )}
        </div>

        {/* Floating Quick Action Card when a building is clicked */}
        {activeBuildingModal && (
          <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:w-80 z-30 bg-slate-900/95 border border-slate-700 p-4 rounded-2xl shadow-2xl backdrop-blur-md animate-fadeIn">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-500/20 text-blue-300">
                  {activeBuildingModal.category}
                </span>
                <h4 className="font-bold text-white text-base mt-1">
                  {activeBuildingModal.name}
                </h4>
              </div>
              <button
                onClick={() => setActiveBuildingModal(null)}
                className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              >
                <Icon name="x" className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-300 line-clamp-2 mb-3">
              {activeBuildingModal.desc}
            </p>

            <div className="text-[11px] text-slate-400 mb-3 space-y-1">
              <div className="flex items-center gap-1.5">
                <Icon name="layers" className="w-3.5 h-3.5 text-blue-400" />
                <span>{activeBuildingModal.floors}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Icon name="clock" className="w-3.5 h-3.5 text-amber-400" />
                <span>{activeBuildingModal.openHours}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2 border-t border-slate-800">
              <button
                onClick={() => {
                  onSetAsStart(activeBuildingModal.id);
                  setActiveBuildingModal(null);
                }}
                className="flex-1 py-1.5 px-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium border border-slate-700 transition-colors"
              >
                Set as Start
              </button>
              <button
                onClick={() => {
                  onSetAsDestination(activeBuildingModal.id);
                  setActiveBuildingModal(null);
                }}
                className="flex-1 py-1.5 px-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold shadow-md shadow-blue-600/30 transition-colors"
              >
                Navigate Here
              </button>
            </div>
          </div>
        )}

        {/* Scrollable / Scalable SVG canvas */}
        <div className="overflow-auto max-h-[600px] sm:max-h-[680px] p-2 sm:p-4 flex items-center justify-center cursor-grab active:cursor-grabbing">
          <div 
            style={{ 
              transform: `scale(${zoom})`, 
              transformOrigin: 'center center',
              transition: 'transform 0.2s ease-out'
            }}
            className="w-[1000px] h-[950px] shrink-0 relative select-none"
          >
            <svg 
              viewBox="0 0 1000 950" 
              className="w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Definitions: Gradients & Patterns */}
              <defs>
                {/* Grass lawn texture */}
                <pattern id="lawnPattern" width="20" height="20" patternUnits="userSpaceOnUse">
                  <rect width="20" height="20" fill="#0f2b1d" />
                  <circle cx="10" cy="10" r="1" fill="#143c29" opacity="0.6" />
                </pattern>

                {/* Walkway pattern */}
                <pattern id="walkwayPattern" width="10" height="10" patternUnits="userSpaceOnUse">
                  <rect width="10" height="10" fill="#1e293b" />
                  <path d="M0 0 L10 10 M10 0 L0 10" stroke="#334155" strokeWidth="0.5" opacity="0.4" />
                </pattern>

                {/* Building glow */}
                <filter id="buildingShadow" x="-10%" y="-10%" width="120%" height="120%">
                  <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#000000" floodOpacity="0.5" />
                </filter>
                <filter id="pinGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#38bdf8" floodOpacity="0.8" />
                </filter>
              </defs>

              {/* Base Campus Boundary Background */}
              <rect x="0" y="0" width="1000" height="950" fill="#090d16" />

              {/* Landscaping / Campus Green Belts */}
              <rect x="50" y="60" width="900" height="830" rx="30" fill="#0b1712" stroke="#162e22" strokeWidth="2" />
              
              {/* Central Quadrangle Gardens */}
              <circle cx="500" cy="550" r="160" fill="url(#lawnPattern)" stroke="#1a4731" strokeWidth="2" />
              
              {/* Northern Sports Grounds Green */}
              <rect x="700" y="100" width="240" height="250" rx="20" fill="#0f3422" stroke="#1b5a3b" strokeWidth="2" />
              <circle cx="820" cy="220" r="70" fill="none" stroke="#22c55e" strokeWidth="2" strokeDasharray="6 4" opacity="0.6" />
              <text x="820" y="225" fill="#4ade80" fontSize="11" fontWeight="bold" textAnchor="middle">Cricket / Football Oval</text>

              {/* Main Arterial Roadways (Paved Walkways) */}
              {/* South to North Central Spine */}
              <path d="M 500 900 L 500 300" stroke="#334155" strokeWidth="18" strokeLinecap="round" />
              <path d="M 500 900 L 500 300" stroke="#64748b" strokeWidth="2" strokeDasharray="10 8" />

              {/* East-West Cross Promenade */}
              <path d="M 160 550 L 840 550" stroke="#334155" strokeWidth="16" strokeLinecap="round" />
              <path d="M 160 550 L 840 550" stroke="#64748b" strokeWidth="2" strokeDasharray="10 8" />

              {/* Diagonal connecting pathways */}
              <path d="M 500 700 L 350 680 L 190 520" stroke="#1e293b" strokeWidth="10" strokeLinecap="round" />
              <path d="M 500 700 L 670 730 L 740 640" stroke="#1e293b" strokeWidth="10" strokeLinecap="round" />
              <path d="M 500 450 L 420 460 L 310 350" stroke="#1e293b" strokeWidth="10" strokeLinecap="round" />
              <path d="M 500 450 L 670 380 L 800 420" stroke="#1e293b" strokeWidth="10" strokeLinecap="round" />
              <path d="M 500 350 L 500 280" stroke="#1e293b" strokeWidth="10" strokeLinecap="round" />

              {/* Central Rotary Fountain */}
              <circle cx="500" cy="550" r="30" fill="#0284c7" stroke="#38bdf8" strokeWidth="3" opacity="0.8" />
              <circle cx="500" cy="550" r="12" fill="#bae6fd" />

              {/* Campus Gate Entrance Zone (South) */}
              <rect x="420" y="870" width="160" height="40" rx="8" fill="#1e293b" stroke="#475569" strokeWidth="2" />
              <text x="500" y="895" fill="#f8fafc" fontSize="12" fontWeight="bold" textAnchor="middle">
                MAIN CAMPUS GATE
              </text>

              {/* Active Route Path Highlight */}
              {routePathString && (
                <g>
                  {/* Glowing wide halo */}
                  <path 
                    d={routePathString} 
                    fill="none" 
                    stroke="#38bdf8" 
                    strokeWidth="12" 
                    strokeLinecap="round"
                    opacity="0.3"
                    className="animate-pulse"
                  />
                  {/* Core dashed line with moving dash animation */}
                  <path 
                    d={routePathString} 
                    fill="none" 
                    stroke="#0284c7" 
                    strokeWidth="5" 
                    strokeLinecap="round"
                  />
                  <path 
                    d={routePathString} 
                    fill="none" 
                    stroke="#ffffff" 
                    strokeWidth="3" 
                    strokeDasharray="8 6"
                    strokeLinecap="round"
                    className="animate-dash"
                  />
                </g>
              )}

              {/* Campus Buildings Visual Blocks */}
              
              {/* 1. Titanic Block (Ship Bow Aesthetic) */}
              <g 
                onClick={() => {
                  const loc = locations.find(l => l.id === 'titanic-block');
                  if (loc) setActiveBuildingModal(loc);
                }}
                className="cursor-pointer transition-all hover:opacity-90"
              >
                {/* Ship-shaped hull polygon */}
                <polygon 
                  points="340,430 480,430 510,460 480,490 340,490" 
                  fill="#1e3a8a" 
                  stroke="#3b82f6" 
                  strokeWidth="3"
                  filter="url(#buildingShadow)"
                />
                <text x="415" y="455" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">
                  🚢 TITANIC BLOCK
                </text>
                <text x="415" y="475" fill="#93c5fd" fontSize="9" textAnchor="middle">
                  CSE & IT Departments
                </text>
              </g>

              {/* 2. Central Library */}
              <g 
                onClick={() => {
                  const loc = locations.find(l => l.id === 'central-library');
                  if (loc) setActiveBuildingModal(loc);
                }}
                className="cursor-pointer transition-all hover:opacity-90"
              >
                <rect x="560" y="500" width="120" height="70" rx="8" fill="#78350f" stroke="#d97706" strokeWidth="2.5" filter="url(#buildingShadow)" />
                <text x="620" y="535" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  📚 CENTRAL LIBRARY
                </text>
                <text x="620" y="552" fill="#fde68a" fontSize="9" textAnchor="middle">
                  Digital Hub & Study Halls
                </text>
              </g>

              {/* 3. Admin Block */}
              <g 
                onClick={() => {
                  const loc = locations.find(l => l.id === 'admin-block');
                  if (loc) setActiveBuildingModal(loc);
                }}
                className="cursor-pointer transition-all hover:opacity-90"
              >
                <rect x="430" y="690" width="140" height="60" rx="8" fill="#312e81" stroke="#6366f1" strokeWidth="2.5" filter="url(#buildingShadow)" />
                <text x="500" y="720" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  🏛️ ADMIN BLOCK
                </text>
                <text x="500" y="736" fill="#c7d2fe" fontSize="9" textAnchor="middle">
                  Principal & Exam Branch
                </text>
              </g>

              {/* 4. Saraswathi Block (1st Year) */}
              <g 
                onClick={() => {
                  const loc = locations.find(l => l.id === 'first-year-block');
                  if (loc) setActiveBuildingModal(loc);
                }}
                className="cursor-pointer transition-all hover:opacity-90"
              >
                <rect x="280" y="650" width="130" height="60" rx="8" fill="#1e3a8a" stroke="#60a5fa" strokeWidth="2.5" filter="url(#buildingShadow)" />
                <text x="345" y="678" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">
                  SARASWATHI BLOCK
                </text>
                <text x="345" y="695" fill="#93c5fd" fontSize="8.5" textAnchor="middle">
                  1st Year B.Tech & Labs
                </text>
              </g>

              {/* 5. Visvesvaraya Block (ECE/EEE) */}
              <g 
                onClick={() => {
                  const loc = locations.find(l => l.id === 'ece-eee-block');
                  if (loc) setActiveBuildingModal(loc);
                }}
                className="cursor-pointer transition-all hover:opacity-90"
              >
                <rect x="610" y="350" width="120" height="60" rx="8" fill="#1e3a8a" stroke="#3b82f6" strokeWidth="2.5" filter="url(#buildingShadow)" />
                <text x="670" y="378" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">
                  VISVESVARAYA
                </text>
                <text x="670" y="395" fill="#93c5fd" fontSize="8.5" textAnchor="middle">
                  ECE & EEE Blocks
                </text>
              </g>

              {/* 6. Ramanujan Block (Mech/Civil) */}
              <g 
                onClick={() => {
                  const loc = locations.find(l => l.id === 'mech-civil-block');
                  if (loc) setActiveBuildingModal(loc);
                }}
                className="cursor-pointer transition-all hover:opacity-90"
              >
                <rect x="250" y="320" width="120" height="60" rx="8" fill="#1e3a8a" stroke="#3b82f6" strokeWidth="2.5" filter="url(#buildingShadow)" />
                <text x="310" y="348" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">
                  RAMANUJAN BLOCK
                </text>
                <text x="310" y="365" fill="#93c5fd" fontSize="8.5" textAnchor="middle">
                  Mech & Civil Engg
                </text>
              </g>

              {/* 7. Central Auditorium */}
              <g 
                onClick={() => {
                  const loc = locations.find(l => l.id === 'radhakrishnan-auditorium');
                  if (loc) setActiveBuildingModal(loc);
                }}
                className="cursor-pointer transition-all hover:opacity-90"
              >
                <rect x="430" y="280" width="140" height="60" rx="10" fill="#4c1d95" stroke="#a855f7" strokeWidth="2.5" filter="url(#buildingShadow)" />
                <text x="500" y="310" fill="#ffffff" fontSize="10.5" fontWeight="bold" textAnchor="middle">
                  🎭 AUDITORIUM
                </text>
                <text x="500" y="326" fill="#e9d5ff" fontSize="8.5" textAnchor="middle">
                  Dr. Radhakrishnan Hall
                </text>
              </g>

              {/* 8. Main Canteen & Food Court */}
              <g 
                onClick={() => {
                  const loc = locations.find(l => l.id === 'main-canteen');
                  if (loc) setActiveBuildingModal(loc);
                }}
                className="cursor-pointer transition-all hover:opacity-90"
              >
                <rect x="690" y="610" width="120" height="65" rx="8" fill="#7c2d12" stroke="#ea580c" strokeWidth="2.5" filter="url(#buildingShadow)" />
                <text x="750" y="640" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  🍔 MAIN CANTEEN
                </text>
                <text x="750" y="658" fill="#ffedd5" fontSize="8.5" textAnchor="middle">
                  Food Court & Cafe
                </text>
              </g>

              {/* 9. Indoor Sports Complex */}
              <g 
                onClick={() => {
                  const loc = locations.find(l => l.id === 'sports-complex');
                  if (loc) setActiveBuildingModal(loc);
                }}
                className="cursor-pointer transition-all hover:opacity-90"
              >
                <rect x="740" y="390" width="120" height="60" rx="8" fill="#881337" stroke="#f43f5e" strokeWidth="2.5" filter="url(#buildingShadow)" />
                <text x="800" y="420" fill="#ffffff" fontSize="10.5" fontWeight="bold" textAnchor="middle">
                  🏸 SPORTS STADIUM
                </text>
                <text x="800" y="437" fill="#ffe4e6" fontSize="8.5" textAnchor="middle">
                  Badminton & Gym
                </text>
              </g>

              {/* 10. Maggi Point */}
              <g 
                onClick={() => {
                  const loc = locations.find(l => l.id === 'maggi-point');
                  if (loc) setActiveBuildingModal(loc);
                }}
                className="cursor-pointer transition-all hover:opacity-90"
              >
                <circle cx="310" cy="580" r="28" fill="#854d0e" stroke="#eab308" strokeWidth="2" filter="url(#buildingShadow)" />
                <text x="310" y="582" fill="#fef08a" fontSize="9" fontWeight="bold" textAnchor="middle">
                  🍜 Maggi Point
                </text>
              </g>

              {/* 11. Boys Hostel */}
              <g 
                onClick={() => {
                  const loc = locations.find(l => l.id === 'boys-hostel');
                  if (loc) setActiveBuildingModal(loc);
                }}
                className="cursor-pointer transition-all hover:opacity-90"
              >
                <rect x="130" y="490" width="110" height="60" rx="8" fill="#3b0764" stroke="#a855f7" strokeWidth="2" filter="url(#buildingShadow)" />
                <text x="185" y="520" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">
                  🏠 BOYS HOSTEL
                </text>
                <text x="185" y="536" fill="#f3e8ff" fontSize="8" textAnchor="middle">
                  Residency & Mess
                </text>
              </g>

              {/* 12. Girls Hostel */}
              <g 
                onClick={() => {
                  const loc = locations.find(l => l.id === 'girls-hostel');
                  if (loc) setActiveBuildingModal(loc);
                }}
                className="cursor-pointer transition-all hover:opacity-90"
              >
                <rect x="160" y="650" width="110" height="60" rx="8" fill="#581c87" stroke="#c084fc" strokeWidth="2" filter="url(#buildingShadow)" />
                <text x="215" y="680" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">
                  🏠 GIRLS HOSTEL
                </text>
                <text x="215" y="696" fill="#f3e8ff" fontSize="8" textAnchor="middle">
                  Gated Residence
                </text>
              </g>

              {/* 13. Bus Bay & Transit */}
              <g 
                onClick={() => {
                  const loc = locations.find(l => l.id === 'bus-bay');
                  if (loc) setActiveBuildingModal(loc);
                }}
                className="cursor-pointer transition-all hover:opacity-90"
              >
                <rect x="610" y="835" width="120" height="50" rx="6" fill="#0f766e" stroke="#14b8a6" strokeWidth="2" filter="url(#buildingShadow)" />
                <text x="670" y="860" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">
                  🚌 BUS TERMINUS
                </text>
                <text x="670" y="874" fill="#ccfbf1" fontSize="8" textAnchor="middle">
                  60+ College Buses
                </text>
              </g>

              {/* 14. Dispensary / Clinic */}
              <g 
                onClick={() => {
                  const loc = locations.find(l => l.id === 'health-center');
                  if (loc) setActiveBuildingModal(loc);
                }}
                className="cursor-pointer transition-all hover:opacity-90"
              >
                <rect x="560" y="710" width="80" height="40" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="2" filter="url(#buildingShadow)" />
                <text x="600" y="732" fill="#a7f3d0" fontSize="9" fontWeight="bold" textAnchor="middle">
                  🏥 Health Center
                </text>
              </g>

              {/* Interactive Building Pin Markers */}
              {displayedLocations.map((loc) => {
                const isStart = loc.id === startLocationId;
                const isDest = loc.id === destLocationId;
                const isHovered = hoveredBuilding === loc.id;

                let pinColor = '#38bdf8'; // default cyan/blue
                if (isStart) pinColor = '#10b981'; // emerald green for start
                if (isDest) pinColor = '#f43f5e'; // vibrant rose/red for destination

                return (
                  <g
                    key={loc.id}
                    transform={`translate(${loc.mapCoords.x}, ${loc.mapCoords.y})`}
                    className="cursor-pointer transition-transform duration-200"
                    onMouseEnter={() => setHoveredBuilding(loc.id)}
                    onMouseLeave={() => setHoveredBuilding(null)}
                    onClick={() => {
                      setActiveBuildingModal(loc);
                      onSelectBuilding(loc);
                    }}
                  >
                    {/* Pulsing ring for Start or Destination */}
                    {(isStart || isDest) && (
                      <circle
                        r="20"
                        fill="none"
                        stroke={pinColor}
                        strokeWidth="2.5"
                        opacity="0.8"
                        className="animate-ping"
                      />
                    )}

                    {/* Marker Outer Circle */}
                    <circle
                      r={isStart || isDest || isHovered ? "14" : "10"}
                      fill={pinColor}
                      stroke="#ffffff"
                      strokeWidth="2.5"
                      filter="url(#pinGlow)"
                    />

                    {/* Inner icon/dot */}
                    <circle
                      r="4"
                      fill="#ffffff"
                    />

                    {/* Hover Tooltip */}
                    {isHovered && (
                      <g transform="translate(0, -32)" className="pointer-events-none">
                        <rect
                          x="-80"
                          y="-24"
                          width="160"
                          height="28"
                          rx="6"
                          fill="#0f172a"
                          stroke="#38bdf8"
                          strokeWidth="1.5"
                          filter="url(#buildingShadow)"
                        />
                        <text
                          x="0"
                          y="-7"
                          fill="#ffffff"
                          fontSize="10"
                          fontWeight="bold"
                          textAnchor="middle"
                        >
                          {loc.shortName}
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Map Legend Footer */}
        <div className="bg-slate-950/90 border-t border-slate-800/80 px-4 py-3 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex flex-wrap items-center gap-4">
            <span className="font-semibold text-slate-300">Map Legend:</span>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-emerald-500 border border-white" />
              <span>Start Location</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-500 border border-white" />
              <span>Destination</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-sky-400 border border-white" />
              <span>Campus Building</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-4 h-1 rounded bg-blue-500" />
              <span>Walking Path</span>
            </div>
          </div>

          <div className="text-slate-500 text-[11px]">
            *Click on any building to view departments & start directions
          </div>
        </div>
      </div>
    </section>
  );
}
