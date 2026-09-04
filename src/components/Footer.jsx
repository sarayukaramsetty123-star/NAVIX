import React from 'react';
import { Icon } from './Icons.js';

export function Footer({ onNavigate }) {
  return (
    <footer className="bg-slate-950 text-slate-400 text-sm border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Col 1: About */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
                <Icon name="compass" className="w-5 h-5" />
              </div>
              <div>
                <span className="font-extrabold text-lg text-white tracking-tight">SNIST</span>
                <span className="ml-2 text-xs font-semibold px-2 py-0.5 rounded bg-blue-900/50 text-blue-300 border border-blue-800">
                  Campus Navigator
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              A student-first digital navigation assistant designed for freshers, juniors, and visitors at Sreenidhi Institute of Science & Technology (Yamnampet, Ghatkesar, Hyderabad).
            </p>
            <div className="text-xs text-slate-500">
              Autonomous Institution Affiliated to JNTUH • Approved by AICTE • Accredited by NAAC with 'A+' Grade
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button 
                  onClick={() => onNavigate('home')} 
                  className="hover:text-white transition-colors"
                >
                  Home & Search
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('explore')} 
                  className="hover:text-white transition-colors"
                >
                  Campus Categories
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('map')} 
                  className="hover:text-white transition-colors"
                >
                  Interactive Campus Map
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('navigate')} 
                  className="hover:text-white transition-colors"
                >
                  Route Planner
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('about')} 
                  className="hover:text-white transition-colors"
                >
                  Junior Guide & FAQs
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Campus Info */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              SNIST Campus Address
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Sreenidhi Institute of Science and Technology<br />
              Yamnampet, Ghatkesar,<br />
              Hyderabad, Telangana 501301
            </p>
            <div className="pt-2 text-xs text-slate-400 flex items-center gap-2">
              <Icon name="phone" className="w-3.5 h-3.5 text-blue-400" />
              <span>Tel: 040-27637900 / 01</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} NAVIX Campus Navigator • Frontend Student Initiative</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>System Online & Local Ready</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
