import React, { useState } from 'react';
import { Lightbulb, X, Check, AlertTriangle, ShieldCheck, Smartphone, Target, Sparkles } from 'lucide-react';

export const DesignRationaleDrawer: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-40 flex items-center gap-2 px-4 py-2.5 rounded-full bg-slate-900 text-amber-300 hover:bg-slate-800 shadow-xl border border-slate-700 transition-all hover:scale-105 min-h-[44px]"
      >
        <Lightbulb className="w-4 h-4 fill-amber-300 text-amber-300" />
        <span className="text-xs font-bold text-white tracking-wide">Design Rationale (MVP Scope)</span>
      </button>

      {/* Slide-out Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            {/* Drawer Header */}
            <div className="bg-slate-900 text-white p-6 relative flex-shrink-0">
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close rationale drawer"
                className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
                <Sparkles className="w-4 h-4" />
                <span>Product Design Strategy</span>
              </div>
              <h2 className="text-xl font-extrabold text-white">Practo for Animals: MVP Architecture</h2>
              <p className="text-xs text-slate-300 mt-1">
                Product thinking, intentional scope boundaries, and mobile UX rationale.
              </p>
            </div>

            {/* Scrollable Content */}
            <div className="p-6 overflow-y-auto space-y-6 text-slate-700 text-sm flex-grow">
              {/* Section 1: Core Problem & MVP Scope */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-teal-800 font-bold text-base">
                  <Target className="w-5 h-5 text-teal-600" />
                  <h3>1. MVP Scope & High-Intent Focus</h3>
                </div>
                <p className="text-xs leading-relaxed text-slate-600">
                  Animal healthcare in India is characterized by <strong>high emotional friction, severe time sensitivity</strong>, and acute information fragmentation. When an animal is in distress at 11 PM, users do not want a complex 12-screen appointment checkout with prepaid slot selection.
                </p>
                <div className="bg-teal-50 border border-teal-200 rounded-xl p-3 text-xs text-teal-900 space-y-1.5">
                  <div className="font-bold">MVP Core Value Proposition:</div>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>Immediate discovery of vetted emergency facilities within 5km</li>
                    <li>Frictionless 1-tap contact (Call / WhatsApp / Direct Directions)</li>
                    <li>High-trust transparency (Verified VCI license, real consultation fee, actual doctors)</li>
                  </ul>
                </div>
              </div>

              {/* Section 2: What is Deliberately Left Out */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-rose-800 font-bold text-base">
                  <AlertTriangle className="w-5 h-5 text-rose-600" />
                  <h3>2. Deliberately Left Out of V1 (And Why)</h3>
                </div>
                <div className="space-y-2.5 text-xs text-slate-600">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="font-bold text-slate-800">❌ In-App Prepayment Gateways:</span> Avoids high drop-offs. Vets in India rarely adhere to exact digital minute calendar slots; forced upfront payment introduces refund disputes when emergencies preempt routine OPD.
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="font-bold text-slate-800">❌ Video Teleconsultation Backend:</span> V1 focuses on physical clinic discovery. Video consults require complex veterinary liability waivers and diagnostic equipment that standalone clinics in India aren't ready to handle in week 1.
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="font-bold text-slate-800">❌ Heavy E-Commerce / Pet Food Store:</span> Dilutes the core clinical trust and distracts from becoming the trusted health registry.
                  </div>
                </div>
              </div>

              {/* Section 3: Mobile-First Ergonomics */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-indigo-800 font-bold text-base">
                  <Smartphone className="w-5 h-5 text-indigo-600" />
                  <h3>3. Mobile-First & High-Stress Ergonomics</h3>
                </div>
                <ul className="space-y-2 text-xs text-slate-600">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Thumb-Zone Call Button:</strong> Primary action (Call Now / Ambulance) is always ≥48px high with generous touch clearance.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span><strong>High Contrast Emergency Banner:</strong> Persistent high-contrast emergency bar visible without scrolling on mobile viewports.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Bottom Sheet Mobile Filtering:</strong> Filters expand from the bottom on phones so parents can filter by "Dog + Open Now" with one thumb.</span>
                  </li>
                </ul>
              </div>

              {/* Section 4: Data Moat & Cold Start */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-emerald-800 font-bold text-base">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  <h3>4. Cold-Start Supply Strategy</h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  How does the platform get 10,000 accurate clinics without a 100-person sales team? Through the <strong>"Submit a Correction"</strong> crowdsourcing loop (like Wikipedia/Waze for pet care) and the low-friction <strong>"List Your Business Free"</strong> 3-step onboarding.
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end flex-shrink-0">
              <button
                onClick={() => setIsOpen(false)}
                className="px-5 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-colors min-h-[44px]"
              >
                Close Rationale
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
