import React, { useState } from 'react';
import { Icon } from './Icons.js';

export function DirectionsCard({ route, onFocusMap, onClearRoute }) {
  const [copied, setCopied] = useState(false);

  if (!route) return null;

  const handleShare = () => {
    const text = `SNIST Campus Directions: From ${route.start.name} to ${route.destination.name} (~${route.walkTimeMinutes} mins walk, ${route.distanceMeters}m).`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  if (route.sameLocation) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 animate-fadeIn">
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center shadow-md">
          <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3">
            <Icon name="check-circle" className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-emerald-900 text-lg">You are already at {route.start.name}!</h3>
          <p className="text-emerald-700 text-sm mt-1">Starting point and destination are the exact same location.</p>
        </div>
      </div>
    );
  }

  return (
    <div id="directions-result" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 animate-fadeIn">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
        {/* Route Header Banner */}
        <div className="bg-slate-900 text-white p-6 sm:p-7 relative overflow-hidden">
          <div className="absolute right-0 top-0 w-64 h-64 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  Recommended Walking Route
                </span>
                <span className="text-xs text-slate-400">Paved Pedestrian Path</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex flex-wrap items-center gap-2">
                <span>{route.start.shortName}</span>
                <Icon name="arrow-right" className="w-5 h-5 text-blue-400 shrink-0" />
                <span className="text-blue-300">{route.destination.shortName}</span>
              </h3>
            </div>

            {/* Quick Metrics (Time & Distance) */}
            <div className="flex items-center gap-3">
              <div className="bg-slate-800/90 border border-slate-700 rounded-2xl px-4 py-2.5 text-center shrink-0">
                <div className="flex items-center justify-center gap-1.5 text-emerald-400 text-lg sm:text-xl font-extrabold">
                  <Icon name="footprints" className="w-5 h-5" />
                  <span>{route.walkTimeMinutes} min</span>
                </div>
                <div className="text-[11px] text-slate-400 font-medium">Walk Time</div>
              </div>

              <div className="bg-slate-800/90 border border-slate-700 rounded-2xl px-4 py-2.5 text-center shrink-0">
                <div className="text-blue-400 text-lg sm:text-xl font-extrabold">
                  {route.distanceMeters} m
                </div>
                <div className="text-[11px] text-slate-400 font-medium">Distance</div>
              </div>
            </div>
          </div>
        </div>

        {/* Turn-by-turn Navigation Steps */}
        <div className="p-6 sm:p-8">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-5 flex items-center gap-2">
            <Icon name="navigation" className="w-4 h-4 text-blue-600" />
            <span>Step-by-Step Directions ({route.steps.length} Steps)</span>
          </h4>

          <div className="relative pl-6 sm:pl-8 space-y-6 before:content-[''] before:absolute before:left-3 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
            {route.steps.map((step, idx) => {
              const isFirst = idx === 0;
              const isLast = idx === route.steps.length - 1;

              return (
                <div key={idx} className="relative group">
                  {/* Step Bullet Icon */}
                  <div className={`absolute -left-6 sm:-left-8 top-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ring-4 ring-white shadow-sm ${
                    isFirst 
                      ? 'bg-emerald-500 text-white' 
                      : isLast 
                        ? 'bg-rose-500 text-white' 
                        : 'bg-blue-600 text-white'
                  }`}>
                    {idx + 1}
                  </div>

                  {/* Step Content */}
                  <div className="bg-slate-50/80 hover:bg-slate-50 border border-slate-200/80 rounded-2xl p-4 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                      <h5 className="font-bold text-slate-900 text-sm sm:text-base">
                        {step.title}
                      </h5>
                      {step.landmark && (
                        <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-200/70 text-slate-600 font-medium self-start sm:self-auto">
                          📍 {step.landmark}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Junior Student Pro-Tip Alert */}
          {route.fresherTip && (
            <div className="mt-8 bg-amber-50/80 border border-amber-200/80 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5 text-amber-900 shadow-sm">
              <div className="p-2 rounded-xl bg-amber-100 text-amber-700 shrink-0 mt-0.5">
                <Icon name="info" className="w-5 h-5" />
              </div>
              <div>
                <h5 className="font-bold text-sm text-amber-900">
                  Senior's Tip for Juniors & Freshers
                </h5>
                <p className="text-xs sm:text-sm text-amber-800 mt-1 leading-relaxed">
                  {route.fresherTip}
                </p>
              </div>
            </div>
          )}

          {/* Accessibility note */}
          <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
            <Icon name="shield-check" className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{route.accessibility}</span>
          </div>

          {/* Card Actions Footer */}
          <div className="mt-6 pt-5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
            <button
              onClick={onFocusMap}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs sm:text-sm font-semibold transition-colors"
            >
              <Icon name="compass" className="w-4 h-4" />
              <span>Highlight on Campus Map</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs sm:text-sm font-medium transition-colors"
              >
                <Icon name="share-2" className="w-4 h-4" />
                <span>{copied ? 'Copied to Clipboard!' : 'Share Route'}</span>
              </button>

              <button
                onClick={onClearRoute}
                className="inline-flex items-center gap-1 px-3 py-2 rounded-xl text-slate-500 hover:text-slate-800 text-xs sm:text-sm font-medium transition-colors"
              >
                <Icon name="x" className="w-4 h-4" />
                <span>Close</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
