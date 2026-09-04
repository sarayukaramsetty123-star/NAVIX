import React from 'react';
import { CATEGORIES } from '../data/campusData.js';
import { Icon } from './Icons.js';

export function CategoryCards({ selectedCategory, onSelectCategory }) {
  const colorMap = {
    blue: {
      bg: 'bg-blue-500/10 hover:bg-blue-500/15',
      activeBg: 'bg-blue-600 text-white ring-2 ring-blue-400',
      border: 'border-blue-500/30',
      iconColor: 'text-blue-500 group-hover:text-blue-600',
      badge: 'bg-blue-100 text-blue-800'
    },
    emerald: {
      bg: 'bg-emerald-500/10 hover:bg-emerald-500/15',
      activeBg: 'bg-emerald-600 text-white ring-2 ring-emerald-400',
      border: 'border-emerald-500/30',
      iconColor: 'text-emerald-500 group-hover:text-emerald-600',
      badge: 'bg-emerald-100 text-emerald-800'
    },
    indigo: {
      bg: 'bg-indigo-500/10 hover:bg-indigo-500/15',
      activeBg: 'bg-indigo-600 text-white ring-2 ring-indigo-400',
      border: 'border-indigo-500/30',
      iconColor: 'text-indigo-500 group-hover:text-indigo-600',
      badge: 'bg-indigo-100 text-indigo-800'
    },
    amber: {
      bg: 'bg-amber-500/10 hover:bg-amber-500/15',
      activeBg: 'bg-amber-600 text-white ring-2 ring-amber-400',
      border: 'border-amber-500/30',
      iconColor: 'text-amber-500 group-hover:text-amber-600',
      badge: 'bg-amber-100 text-amber-800'
    },
    orange: {
      bg: 'bg-orange-500/10 hover:bg-orange-500/15',
      activeBg: 'bg-orange-600 text-white ring-2 ring-orange-400',
      border: 'border-orange-500/30',
      iconColor: 'text-orange-500 group-hover:text-orange-600',
      badge: 'bg-orange-100 text-orange-800'
    },
    purple: {
      bg: 'bg-purple-500/10 hover:bg-purple-500/15',
      activeBg: 'bg-purple-600 text-white ring-2 ring-purple-400',
      border: 'border-purple-500/30',
      iconColor: 'text-purple-500 group-hover:text-purple-600',
      badge: 'bg-purple-100 text-purple-800'
    },
    red: {
      bg: 'bg-rose-500/10 hover:bg-rose-500/15',
      activeBg: 'bg-rose-600 text-white ring-2 ring-rose-400',
      border: 'border-rose-500/30',
      iconColor: 'text-rose-500 group-hover:text-rose-600',
      badge: 'bg-rose-100 text-rose-800'
    },
    teal: {
      bg: 'bg-teal-500/10 hover:bg-teal-500/15',
      activeBg: 'bg-teal-600 text-white ring-2 ring-teal-400',
      border: 'border-teal-500/30',
      iconColor: 'text-teal-500 group-hover:text-teal-600',
      badge: 'bg-teal-100 text-teal-800'
    }
  };

  return (
    <section id="explore" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-2 border border-blue-200">
            <Icon name="layers" className="w-3.5 h-3.5" />
            <span>Campus Directory</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Explore by Category
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-1">
            Tap a category to filter locations on the map and view details.
          </p>
        </div>

        {selectedCategory && (
          <button
            onClick={() => onSelectCategory(null)}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors self-start sm:self-auto"
          >
            <Icon name="x" className="w-3.5 h-3.5" />
            <span>Clear Filter (Show All)</span>
          </button>
        )}
      </div>

      {/* Grid of 8 category cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-5">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          const styling = colorMap[cat.color] || colorMap.blue;

          return (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(isSelected ? null : cat.id)}
              className={`group relative p-4 sm:p-5 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? `${styling.activeBg} shadow-lg shadow-blue-500/20 scale-[1.02]`
                  : `bg-white hover:bg-slate-50/80 border-slate-200 hover:border-slate-300 hover:shadow-md hover:-translate-y-1`
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 ${
                    isSelected ? 'bg-white/20 text-white' : styling.bg
                  }`}>
                    <Icon 
                      name={cat.icon} 
                      className={`w-5 h-5 ${isSelected ? 'text-white' : styling.iconColor}`} 
                    />
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                    isSelected ? 'bg-white/25 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {cat.count} spots
                  </span>
                </div>

                <h3 className={`font-bold text-base sm:text-lg mb-1 leading-snug ${
                  isSelected ? 'text-white' : 'text-slate-900 group-hover:text-blue-600'
                }`}>
                  {cat.name}
                </h3>

                <p className={`text-xs line-clamp-2 leading-relaxed ${
                  isSelected ? 'text-white/80' : 'text-slate-500'
                }`}>
                  {cat.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-medium">
                <span className={isSelected ? 'text-white/90' : 'text-slate-400 group-hover:text-slate-600'}>
                  {isSelected ? 'Currently filtering' : 'Tap to filter'}
                </span>
                <Icon
                  name={isSelected ? "check-circle" : "arrow-right"}
                  className={`w-4 h-4 transition-transform group-hover:translate-x-0.5 ${
                    isSelected ? 'text-white' : 'text-slate-400'
                  }`}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
