import React, { useEffect } from 'react';
import { Icon } from './Icons.js';

export function LocationModal({ location, onClose, onSetAsStart, onNavigateHere }) {
  if (!location) return null;

  // Escape key listener to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      {/* Modal Card */}
      <div 
        className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 relative animate-scaleUp text-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 to-blue-950 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <Icon name="x" className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold uppercase tracking-wider mb-2 border border-blue-500/30">
            {location.category}
          </div>

          <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white pr-8">
            {location.name}
          </h3>

          <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-slate-300">
            <div className="flex items-center gap-1.5">
              <Icon name="layers" className="w-4 h-4 text-blue-400" />
              <span>{location.floors}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Icon name="clock" className="w-4 h-4 text-amber-400" />
              <span>{location.openHours}</span>
            </div>
            {location.rating && (
              <div className="flex items-center gap-1 font-bold text-amber-400">
                <Icon name="star" className="w-3.5 h-3.5 fill-amber-400" />
                <span>{location.rating} / 5.0</span>
              </div>
            )}
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-7 space-y-6">
          {/* Overview */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Building Overview
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              {location.desc}
            </p>
          </div>

          {/* Departments & Facilities Housed */}
          {location.departments && location.departments.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                Departments & Key Facilities
              </h4>
              <div className="flex flex-wrap gap-2">
                {location.departments.map((dept, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 text-xs font-medium"
                  >
                    {dept}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Senior / Fresher Pro-Tip */}
          {location.juniorTip && (
            <div className="bg-blue-50/80 border border-blue-200/80 rounded-2xl p-4 flex items-start gap-3 text-blue-950">
              <div className="p-2 rounded-xl bg-blue-100 text-blue-700 shrink-0 mt-0.5">
                <Icon name="info" className="w-4 h-4" />
              </div>
              <div>
                <h5 className="font-bold text-xs uppercase tracking-wider text-blue-900">
                  Fresher's Campus Tip
                </h5>
                <p className="text-xs sm:text-sm text-blue-800 mt-1 leading-relaxed">
                  {location.juniorTip}
                </p>
              </div>
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 pt-2">
            {location.tags.map((t, idx) => (
              <span key={idx} className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
                #{t}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-end gap-3">
            <button
              onClick={() => {
                onSetAsStart(location.id);
                onClose();
              }}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
            >
              Set as Starting Point
            </button>

            <button
              onClick={() => {
                onNavigateHere(location);
                onClose();
              }}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/30 transition-all hover:scale-[1.02]"
            >
              <Icon name="navigation" className="w-4 h-4" />
              <span>Get Directions to {location.shortName}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
