import React, { useState } from 'react';
import { Icon } from './Icons.js';

export function AboutSection() {
  const [activeFaq, setActiveFaq] = useState(null);

  const faqs = [
    {
      q: 'Where are first-year (freshman) classes and induction conducted?',
      a: 'Most first-year B.Tech lectures and fundamental science labs (Physics, Chemistry, Basic Electrical) are held in Saraswathi Block. The Head of First Year Basic Sciences office is on the 1st floor (Room S-102).'
    },
    {
      q: 'Why is one building called the "Titanic Block"?',
      a: 'The CSE & IT department block was designed with a sharp nautical curve that resembles the bow of a ship when viewed from above and from the campus approach road! It is the most famous landmark among students.'
    },
    {
      q: 'Where can I get printouts, drafters, and record sheets for labs?',
      a: 'The Student Stationary and Xerox Hub is situated on the ground floor near the Saraswathi Block arcade. You can also get record observation books and spiral binding done there.'
    },
    {
      q: 'What are the college bus timings in the evening?',
      a: 'College buses depart sharply from the Bus Bay at 4:35 PM across 60+ routes in Hyderabad and Secunderabad. Make sure to reach your bus by 4:25 PM.'
    },
    {
      q: 'What should I do if I feel unwell during class hours?',
      a: 'Head directly to the Campus Health Center & Dispensary near the Admin Block. A registered medical officer and nurse are on duty with free first-aid and rest beds.'
    }
  ];

  return (
    <section id="about" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-200">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Purpose & Tips */}
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-200">
            <Icon name="info" className="w-3.5 h-3.5" />
            <span>Junior Survival Guide</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Built for Freshers & Juniors at <span className="text-blue-600">SNIST</span>
          </h2>

          <p className="text-base text-slate-600 leading-relaxed">
            Starting your engineering journey at Sreenidhi Institute of Science and Technology is exciting, but navigating a 33-acre campus with over 8 academic blocks, dozens of labs, and sprawling lawns can be overwhelming on day one.
          </p>

          <p className="text-sm text-slate-600 leading-relaxed">
            <strong>NAVIX Campus Navigator</strong> was built so that you never have to wander aimlessly or feel hesitant asking for directions. Everything you need—from lecture halls and lab locations to food courts and bus stops—is at your fingertips.
          </p>

          {/* Quick Fresher Pro-Tips List */}
          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Senior Advice for New Joiners
            </h4>

            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-lg shrink-0">🪪</span>
              <p className="text-xs text-slate-700 leading-relaxed">
                <strong>Always wear your ID card:</strong> Campus security checks RFID badges at the gate, library turnstiles, and during bus boarding.
              </p>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-lg shrink-0">🥪</span>
              <p className="text-xs text-slate-700 leading-relaxed">
                <strong>Lunch timing strategy:</strong> Canteen crowds peak at 12:45 PM. Grab snacks at Maggi Point or visit the canteen 10 minutes early if you have a free period.
              </p>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-lg shrink-0">📚</span>
              <p className="text-xs text-slate-700 leading-relaxed">
                <strong>Quiet study spots:</strong> The 3rd floor of the Central Library has individual study cubicles with charging points for laptops.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Campus FAQs Accordion */}
        <div className="lg:col-span-6 space-y-4">
          <div className="mb-2">
            <h3 className="text-xl font-bold text-slate-900 tracking-tight">
              Frequently Asked Campus Questions
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Common questions first-year students ask about SNIST grounds.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className={`rounded-2xl border transition-all ${
                    isOpen 
                      ? 'bg-blue-50/50 border-blue-200 shadow-sm' 
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-3"
                  >
                    <span className="text-sm sm:text-base font-semibold text-slate-800">
                      {faq.q}
                    </span>
                    <div className={`p-1 rounded-lg text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-blue-600' : ''}`}>
                      <Icon name="arrow-up" className="w-4 h-4 rotate-180" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-5 sm:px-5 text-sm text-slate-600 leading-relaxed border-t border-blue-100/60 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Emergency Helpline Box */}
          <div id="emergency" className="mt-8 bg-rose-50 border border-rose-200 rounded-2xl p-5 text-rose-950">
            <div className="flex items-center gap-2 font-bold text-sm text-rose-900 mb-2">
              <Icon name="phone" className="w-4 h-4 text-rose-600" />
              <span>Campus Emergency Contacts</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-rose-800">
              <div className="p-2.5 rounded-lg bg-rose-100/50">
                <span className="block font-semibold">Campus Dispensary / Health:</span>
                <span>+91 040-2763-7901</span>
              </div>
              <div className="p-2.5 rounded-lg bg-rose-100/50">
                <span className="block font-semibold">Main Security Gate:</span>
                <span>+91 040-2763-7905</span>
              </div>
              <div className="p-2.5 rounded-lg bg-rose-100/50">
                <span className="block font-semibold">Anti-Ragging Squad Cell:</span>
                <span>1800-180-5522 (Toll-Free)</span>
              </div>
              <div className="p-2.5 rounded-lg bg-rose-100/50">
                <span className="block font-semibold">Student Welfare Dean:</span>
                <span>dean.students@sreenidhi.edu.in</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
