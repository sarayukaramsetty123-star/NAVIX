import React, { useState, useRef, useEffect } from 'react';
import { Icon } from './Icons.js';

export function HeroSearch({ locations, onSelectLocation, onQuickNavigate }) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef(null);

  // Filter locations based on query
  const filtered = query.trim() === '' ? [] : locations.filter(loc => {
    const q = query.toLowerCase();
    return (
      loc.name.toLowerCase().includes(q) ||
      loc.shortName.toLowerCase().includes(q) ||
      loc.category.toLowerCase().includes(q) ||
      loc.tags.some(tag => tag.toLowerCase().includes(q)) ||
      loc.departments.some(d => d.toLowerCase().includes(q))
    );
  }).slice(0, 6);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (loc) => {
    setQuery(loc.name);
    setIsOpen(false);
    onSelectLocation(loc);
  };

  const handleQuickNav = (e, loc) => {
    e.stopPropagation();
    setIsOpen(false);
    onQuickNavigate(loc);
  };

  const quickPills = [
    { label: '🚢 Titanic Block (CSE/IT)', id: 'titanic-block' },
    { label: '📚 Central Library', id: 'central-library' },
    { label: '🥪 Main Canteen', id: 'main-canteen' },
    { label: '🎓 1st Year Block', id: 'first-year-block' },
    { label: '🏀 Sports Complex', id: 'sports-complex' },
    { label: '🚌 Bus Bay', id: 'bus-bay' }
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white pt-10 pb-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800/80">
      {/* Subtle decorative background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-600/15 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[300px] h-[250px] bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative max-w-4xl mx-auto text-center">
        {/* Welcome Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs sm:text-sm font-medium mb-5 shadow-sm">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Freshers & Junior Guide 2026</span>
          <span className="text-slate-500">•</span>
          <span className="text-slate-300">SNIST Campus</span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-4">
          NAVIX <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-300">Campus Navigator</span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto mb-8 font-normal leading-relaxed">
          Find your way around campus, effortlessly.
        </p>

        {/* Search Bar Container */}
        <div ref={searchRef} className="relative max-w-2xl mx-auto">
          <div className="relative flex items-center shadow-2xl rounded-2xl bg-slate-800/90 border border-slate-700/80 backdrop-blur-md focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/20 transition-all">
            <div className="pl-4 sm:pl-5 text-slate-400">
              <Icon name="search" className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
            </div>
            
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setIsOpen(true);
              }}
              onFocus={() => setIsOpen(true)}
              placeholder="Where do you want to go? (e.g., Titanic Block, Library, Canteen...)"
              className="w-full py-4 sm:py-5 px-3 sm:px-4 bg-transparent text-white placeholder-slate-400 text-sm sm:text-base outline-none rounded-2xl"
            />

            {query && (
              <button
                onClick={() => {
                  setQuery('');
                  setIsOpen(false);
                }}
                className="p-2 mr-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-700 transition"
                aria-label="Clear search"
              >
                <Icon name="x" className="w-5 h-5" />
              </button>
            )}

            <button
              onClick={() => {
                if (filtered.length > 0) {
                  handleSelect(filtered[0]);
                }
              }}
              className="hidden sm:flex items-center gap-1.5 mr-2.5 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-semibold shadow-md shadow-blue-600/30 transition-all hover:scale-[1.02]"
            >
              <Icon name="navigation" className="w-4 h-4" />
              <span>Search</span>
            </button>
          </div>

          {/* Autocomplete Results Dropdown */}
          {isOpen && filtered.length > 0 && (
            <div className="absolute left-0 right-0 top-full mt-2 bg-slate-800/95 border border-slate-700 rounded-2xl shadow-2xl backdrop-blur-xl z-50 overflow-hidden text-left divide-y divide-slate-700/50 animate-fadeIn">
              <div className="px-4 py-2 text-xs font-semibold uppercase text-slate-400 tracking-wider bg-slate-800/50 flex items-center justify-between">
                <span>Matching Campus Locations</span>
                <span>{filtered.length} found</span>
              </div>
              
              {filtered.map((loc) => (
                <div
                  key={loc.id}
                  onClick={() => handleSelect(loc)}
                  className="px-4 py-3 sm:py-3.5 hover:bg-slate-700/60 transition cursor-pointer flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-400 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <Icon name="map-pin" className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white group-hover:text-blue-300 transition-colors">
                        {loc.name}
                      </h4>
                      <div className="flex items-center gap-2 mt-0.5 text-xs text-slate-400">
                        <span className="capitalize text-blue-400 font-medium">{loc.category}</span>
                        <span>•</span>
                        <span>{loc.floors}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={(e) => handleQuickNav(e, loc)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-blue-600/20 text-blue-300 hover:bg-blue-600 hover:text-white border border-blue-500/30 transition-all shrink-0 ml-2"
                  >
                    <Icon name="navigation" className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Directions</span>
                  </button>
                </div>
              ))}
            </div>
          )}

          {isOpen && query.trim() !== '' && filtered.length === 0 && (
            <div className="absolute left-0 right-0 top-full mt-2 bg-slate-800 border border-slate-700 rounded-2xl shadow-xl p-5 text-center text-slate-400 z-50">
              <p className="text-sm">No campus locations matching "{query}".</p>
              <p className="text-xs text-slate-500 mt-1">Try searching for "Titanic", "Library", "Canteen", or "Labs".</p>
            </div>
          )}
        </div>

        {/* Quick Search Badges / Chips */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2 max-w-2xl mx-auto">
          <span className="text-xs text-slate-400 mr-1 font-medium">Quick find:</span>
          {quickPills.map((pill) => {
            const loc = locations.find(l => l.id === pill.id);
            if (!loc) return null;
            return (
              <button
                key={pill.id}
                onClick={() => handleSelect(loc)}
                className="px-3 py-1.5 rounded-full text-xs font-medium bg-slate-800/80 hover:bg-slate-750 text-slate-300 hover:text-white border border-slate-700 hover:border-blue-500/50 hover:bg-blue-600/15 transition-all shadow-sm flex items-center gap-1.5"
              >
                <span>{pill.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
