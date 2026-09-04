import React, { useState, useEffect } from 'react';
import { CAMPUS_LOCATIONS, calculateRoute } from './data/campusData.js';
import { Navbar } from './components/Navbar.jsx';
import { HeroSearch } from './components/HeroSearch.jsx';
import { CategoryCards } from './components/CategoryCards.jsx';
import { CampusMap } from './components/CampusMap.jsx';
import { NavigationSection } from './components/NavigationSection.jsx';
import { DirectionsCard } from './components/DirectionsCard.jsx';
import { PopularDestinations } from './components/PopularDestinations.jsx';
import { LocationModal } from './components/LocationModal.jsx';
import { AboutSection } from './components/AboutSection.jsx';
import { Footer } from './components/Footer.jsx';

export function App() {
  // Navigation & Location States
  const [startId, setStartId] = useState('main-gate');
  const [destId, setDestId] = useState('titanic-block');
  const [route, setRoute] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedBuildingModal, setSelectedBuildingModal] = useState(null);
  const [activeTab, setActiveTab] = useState('home');
  const [isRouting, setIsRouting] = useState(false);

  // Auto-generate initial sample route on initial load (Requirement 8)
  useEffect(() => {
    const initialRoute = calculateRoute('main-gate', 'titanic-block');
    setRoute(initialRoute);
  }, []);

  // Handler: Calculate directions
  const handleGetDirections = () => {
    if (!startId || !destId) return;
    setIsRouting(true);
    setTimeout(() => {
      const calculated = calculateRoute(startId, destId);
      setRoute(calculated);
      setIsRouting(false);

      // Scroll smoothly to directions card
      const el = document.getElementById('directions-result');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 200);
  };

  // Handler: Swap start and destination
  const handleSwap = () => {
    const temp = startId;
    setStartId(destId);
    setDestId(temp);
    if (destId && temp) {
      const reversed = calculateRoute(destId, temp);
      setRoute(reversed);
    }
  };

  // Handler: Quick Navigate from search or cards
  const handleQuickNavigate = (loc) => {
    setDestId(loc.id);
    const newRoute = calculateRoute(startId || 'main-gate', loc.id);
    setRoute(newRoute);

    // Scroll smoothly to navigation/directions
    const el = document.getElementById('directions-result') || document.getElementById('navigate');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handler: Set as start
  const handleSetAsStart = (id) => {
    setStartId(id);
    if (destId) {
      setRoute(calculateRoute(id, destId));
    }
  };

  // Handler: Set as destination
  const handleSetAsDestination = (id) => {
    setDestId(id);
    if (startId) {
      setRoute(calculateRoute(startId, id));
    }
  };

  // Handler: Focus map view
  const handleFocusMap = () => {
    const el = document.getElementById('map');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Navbar section scrolling
  const handleNavbarNavigate = (id) => {
    setActiveTab(id);
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* 10. Simple navigation bar (Home, Explore, Map, About) */}
      <Navbar onNavigate={handleNavbarNavigate} activeTab={activeTab} />

      <main className="flex-1">
        {/* 1, 2, 3, 4. Landing Hero with Title, Subtitle, Prominent Search Bar */}
        <HeroSearch 
          locations={CAMPUS_LOCATIONS}
          onSelectLocation={(loc) => setSelectedBuildingModal(loc)}
          onQuickNavigate={handleQuickNavigate}
        />

        {/* 5. Quick Category Cards (8 categories) */}
        <CategoryCards 
          selectedCategory={selectedCategory}
          onSelectCategory={(catId) => setSelectedCategory(catId)}
        />

        {/* 6. Interactive Campus Map Section */}
        <CampusMap 
          locations={CAMPUS_LOCATIONS}
          startLocationId={startId}
          destLocationId={destId}
          selectedCategory={selectedCategory}
          onSelectBuilding={(loc) => setSelectedBuildingModal(loc)}
          onSetAsStart={handleSetAsStart}
          onSetAsDestination={handleSetAsDestination}
        />

        {/* 7. Navigation section with Starting location, Destination, and "Get Directions" */}
        <NavigationSection 
          locations={CAMPUS_LOCATIONS}
          startId={startId}
          destId={destId}
          onStartChange={setStartId}
          onDestChange={setDestId}
          onSwap={handleSwap}
          onGetDirections={handleGetDirections}
          isLoading={isRouting}
        />

        {/* 8. Sample Route / Directions Card with turn-by-turn guidance */}
        {route && (
          <DirectionsCard 
            route={route}
            onFocusMap={handleFocusMap}
            onClearRoute={() => setRoute(null)}
          />
        )}

        {/* 9. Popular Destinations Section */}
        <PopularDestinations 
          locations={CAMPUS_LOCATIONS}
          selectedCategory={selectedCategory}
          onNavigateTo={handleQuickNavigate}
          onViewDetails={(loc) => setSelectedBuildingModal(loc)}
        />

        {/* Junior Guidance, FAQs, and Helplines */}
        <AboutSection />
      </main>

      {/* Building Details Modal Popup */}
      {selectedBuildingModal && (
        <LocationModal 
          location={selectedBuildingModal}
          onClose={() => setSelectedBuildingModal(null)}
          onSetAsStart={handleSetAsStart}
          onNavigateHere={handleQuickNavigate}
        />
      )}

      {/* Footer */}
      <Footer onNavigate={handleNavbarNavigate} />
    </div>
  );
}
