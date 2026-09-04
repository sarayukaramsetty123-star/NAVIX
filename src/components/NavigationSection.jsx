import React from 'react';
import { Icon } from './Icons.js';

export function NavigationSection({
  locations,
  startId,
  destId,
  onStartChange,
  onDestChange,
  onSwap,
  onGetDirections,
  isLoading
}) {
  const quickRoutes = [
    { name: 'Main Gate ➔ Titanic Block', start: 'main-gate', dest: 'titanic-block' },
    { name: 'Titanic Block ➔ Main Canteen', start: 'titanic-block', dest: 'main-canteen' },
    { name: '1st Year Block ➔ Central Library', start: 'first-year-block', dest: 'central-library' },
    { name: 'Admin Block ➔ Robotics Hub', start: 'admin-block', dest: 'robotics-ai-lab' }
  ];

  return (
    <section id="navigate" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl relative overflow-hidden text-white">
        {/* Subtle decorative glow */}
        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold mb-3 border border-blue-500/30">
              <Icon name="navigation" className="w-3.5 h-3.5" />
              <span>Campus GPS Router</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Get Campus Directions
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mt-2">
              Select your current spot and where you need to reach. We'll show you the shortest paved walking path!
            </p>
          </div>

          {/* Navigation Controls Card */}
          <div className="bg-slate-800/80 backdrop-blur-md p-5 sm:p-7 rounded-2xl border border-slate-700/80 shadow-xl space-y-4 sm:space-y-0 sm:grid sm:grid-cols-[1fr_auto_1fr_auto] sm:gap-3 items-center">
            {/* Start Location Input */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1.5 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Starting Point</span>
              </label>
              <div className="relative">
                <select
                  value={startId}
                  onChange={(e) => onStartChange(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-3.5 py-3 text-sm focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 appearance-none font-medium cursor-pointer"
                >
                  <option value="" disabled>Select Starting Point...</option>
                  {locations.map((loc) => (
                    <option key={loc.id} value={loc.id}>
                      {loc.shortName} ({loc.category})
                    </option>
                  ))}
                </select>
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                  <Icon name="map-pin" className="w-4 h-4 text-emerald-400" />
                </div>
              </div>
            </div>

            {/* Swap Button */}
            <div className="flex justify-center sm:pt-6">
              <button
                type="button"
                onClick={onSwap}
                className="p-3 bg-slate-700/70 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl border border-slate-600 transition-all hover:scale-110 active:scale-95 shadow-md"
                title="Swap Starting Point and Destination"
                aria-label="Swap Starting Point and Destination"
              >
                <Icon name="swap" className="w-5 h-5 text-blue-400 rotate-90 sm:rotate-0" />
              </button>
            </div>

            {/* Destination Input */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-rose-400 mb-1.5 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-400" />
                <span>Destination</span>
              </label>
              <div className="relative">
                <select
                  value={destId}
                  onChange={(e) => onDestChange(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-3.5 py-3 text-sm focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 appearance-none font-medium cursor-pointer"
                >
                  <option value="" disabled>Select Destination...</option>
                  {locations.map((loc) => (
                    <option key={loc.id} value={loc.id}>
                      {loc.shortName} ({loc.category})
                    </option>
                  ))}
                </select>
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                  <Icon name="map-pin" className="w-4 h-4 text-rose-400" />
                </div>
              </div>
            </div>

            {/* Submit Action Button */}
            <div className="sm:pt-6">
              <button
                onClick={onGetDirections}
                disabled={isLoading || !startId || !destId}
                className={`w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-sm text-white shadow-lg transition-all flex items-center justify-center gap-2 ${
                  isLoading || !startId || !destId
                    ? 'bg-slate-700 opacity-60 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-blue-600/30 hover:scale-[1.02] active:scale-95'
                }`}
              >
                {isLoading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Routing...</span>
                  </>
                ) : (
                  <>
                    <Icon name="navigation" className="w-4 h-4" />
                    <span>Get Directions</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Quick Route Shortcuts */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
            <span className="text-xs text-slate-400 font-medium">Popular routes:</span>
            {quickRoutes.map((qr, index) => (
              <button
                key={index}
                onClick={() => {
                  onStartChange(qr.start);
                  onDestChange(qr.dest);
                  onGetDirections();
                }}
                className="px-3 py-1 rounded-lg text-xs bg-slate-800/60 hover:bg-slate-750 text-slate-300 hover:text-white border border-slate-700/60 hover:border-blue-500/40 transition-colors"
              >
                {qr.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
