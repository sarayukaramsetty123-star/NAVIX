import React from 'react';
import { Icon } from './Icons.js';

export function PopularDestinations({ 
  locations, 
  selectedCategory, 
  onNavigateTo, 
  onViewDetails 
}) {
  // Filter by category if selected, otherwise show locations marked popular or top 8
  const displayed = selectedCategory
    ? locations.filter(l => l.category === selectedCategory)
    : locations.filter(l => l.popular);

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-semibold mb-2 border border-amber-200">
            <Icon name="star" className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>Campus Hotspots</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            {selectedCategory ? 'Filtered Campus Locations' : 'Popular Student Destinations'}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-1">
            {selectedCategory 
              ? `Showing all locations in the selected category (${displayed.length} found)`
              : 'The most visited spots by SNIST juniors, freshers, and seniors alike.'}
          </p>
        </div>

        <div className="text-xs text-slate-500 self-start sm:self-auto font-medium">
          Showing {displayed.length} destinations
        </div>
      </div>

      {/* Grid of Location Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayed.map((loc) => {
          return (
            <div
              key={loc.id}
              className="bg-white rounded-2xl border border-slate-200 hover:border-blue-400 hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group"
            >
              {/* Card Upper Info */}
              <div className="p-6">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-100">
                    {loc.category}
                  </span>

                  {loc.rating && (
                    <div className="flex items-center gap-1 text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                      <Icon name="star" className="w-3 h-3 text-amber-500 fill-amber-500" />
                      <span>{loc.rating}</span>
                    </div>
                  )}
                </div>

                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-2 leading-snug">
                  {loc.name}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed mb-4">
                  {loc.desc}
                </p>

                {/* Metadata Pills */}
                <div className="space-y-1.5 pt-3 border-t border-slate-100 text-xs text-slate-500">
                  <div className="flex items-center gap-2">
                    <Icon name="layers" className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>{loc.floors}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="clock" className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>{loc.openHours}</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {loc.tags.slice(0, 3).map((tag, i) => (
                    <span key={i} className="text-[11px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-medium">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3">
                <button
                  onClick={() => onViewDetails(loc)}
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-200/70 transition-colors"
                >
                  View Details
                </button>

                <button
                  onClick={() => onNavigateTo(loc)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md shadow-blue-600/20 hover:scale-[1.02] active:scale-95 transition-all"
                >
                  <Icon name="navigation" className="w-3.5 h-3.5" />
                  <span>Navigate Here</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
