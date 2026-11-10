import React, { useState } from 'react';
import { Provider } from '../../types';
import { MapPin, Phone, Star, ShieldCheck, Navigation, Crosshair, ZoomIn, ZoomOut } from 'lucide-react';

interface InteractiveMapViewProps {
  providers: Provider[];
  selectedProvider: Provider | null;
  onSelectProvider: (provider: Provider) => void;
  onOpenDetails: (provider: Provider) => void;
}

export const InteractiveMapView: React.FC<InteractiveMapViewProps> = ({
  providers,
  selectedProvider,
  onSelectProvider,
  onOpenDetails
}) => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [activeHoverPin, setActiveHoverPin] = useState<string | null>(null);

  // Map coordinates normalization for Bangalore cluster
  // Center: ~12.9716, 77.5946
  const centerLat = 12.965;
  const centerLng = 77.635;
  const latScale = 900;
  const lngScale = 900;

  return (
    <div className="relative w-full h-[580px] bg-slate-900 rounded-2xl overflow-hidden border border-slate-700 shadow-inner select-none">
      {/* Map Grid / Styled Graphic Background */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 50%, #0F766E 1px, transparent 1px),
            linear-gradient(to right, #1e293b 1px, transparent 1px),
            linear-gradient(to bottom, #1e293b 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Styled Metro Roads & Neighborhood Labels */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
        <path d="M 50 150 Q 300 200 700 120 T 1200 220" stroke="#334155" strokeWidth="4" fill="none" />
        <path d="M 200 500 Q 500 350 800 480 T 1100 400" stroke="#334155" strokeWidth="3" fill="none" />
        <path d="M 450 0 L 450 600" stroke="#1e293b" strokeWidth="2" strokeDasharray="6 6" fill="none" />
        <path d="M 750 0 L 750 600" stroke="#1e293b" strokeWidth="2" strokeDasharray="6 6" fill="none" />
        <circle cx="500" cy="300" r="180" stroke="#0F766E" strokeWidth="1" strokeDasharray="4 4" fill="none" opacity="0.3" />
      </svg>

      {/* Map Overlay Controls */}
      <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
        <div className="bg-slate-950/80 backdrop-blur-md px-3.5 py-2 rounded-xl border border-slate-700 text-white text-xs flex items-center gap-2 shadow-lg">
          <Crosshair className="w-4 h-4 text-teal-400 animate-spin" style={{ animationDuration: '8s' }} />
          <span>Active GPS Region: <strong className="text-teal-300">Bangalore Central-East (5km Radius)</strong></span>
        </div>
      </div>

      <div className="absolute top-4 right-4 z-20 flex flex-col gap-1.5">
        <button
          onClick={() => setZoomLevel(prev => Math.min(prev + 0.2, 1.6))}
          className="w-9 h-9 rounded-xl bg-slate-950/80 hover:bg-slate-800 text-white flex items-center justify-center border border-slate-700 shadow-md transition-all"
          aria-label="Zoom in"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={() => setZoomLevel(prev => Math.max(prev - 0.2, 0.8))}
          className="w-9 h-9 rounded-xl bg-slate-950/80 hover:bg-slate-800 text-white flex items-center justify-center border border-slate-700 shadow-md transition-all"
          aria-label="Zoom out"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
      </div>

      {/* Pins Layer */}
      <div 
        className="relative w-full h-full transition-transform duration-300"
        style={{ transform: `scale(${zoomLevel})`, transformOrigin: '50% 50%' }}
      >
        {providers.map((p, index) => {
          // Calculate relative position based on lat/lng or staggered preset for visual spread
          const xPercent = 20 + ((index * 23) % 65);
          const yPercent = 22 + ((index * 19) % 60);

          const isSelected = selectedProvider?.id === p.id;
          const isHovered = activeHoverPin === p.id;

          return (
            <div
              key={p.id}
              className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-200 z-10"
              style={{ left: `${xPercent}%`, top: `${yPercent}%` }}
              onMouseEnter={() => setActiveHoverPin(p.id)}
              onMouseLeave={() => setActiveHoverPin(null)}
              onClick={() => onSelectProvider(p)}
            >
              {/* Outer pulsing ring for 24x7 emergency */}
              {p.is24x7 && (
                <div className="absolute -inset-2 rounded-full bg-rose-500/30 animate-ping" />
              )}

              {/* Pin Icon Bubble */}
              <div
                className={`relative px-3 py-1.5 rounded-full flex items-center gap-1.5 text-xs font-bold shadow-xl transition-all ${
                  isSelected
                    ? 'bg-amber-400 text-slate-950 scale-125 ring-4 ring-amber-400/30 z-30'
                    : p.serviceType === 'ambulance'
                    ? 'bg-rose-600 text-white ring-2 ring-rose-400/50'
                    : p.serviceType === 'hospital'
                    ? 'bg-teal-600 text-white ring-2 ring-teal-400/50'
                    : 'bg-slate-800 text-white border border-slate-600'
                }`}
              >
                <span>
                  {p.serviceType === 'ambulance' ? '🚑' : p.serviceType === 'hospital' ? '🏨' : p.serviceType === 'boarding' ? '🏡' : p.serviceType === 'ngo' ? '🕊️' : '🏥'}
                </span>
                <span className="hidden sm:inline max-w-[110px] truncate">{p.name.split(' ')[0]}</span>
                <span className="text-[11px] opacity-90 font-mono">₹{p.consultationFee}</span>
              </div>

              {/* Hover or selected tooltip badge */}
              {(isHovered || isSelected) && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 bg-slate-950 text-white p-3 rounded-xl shadow-2xl border border-slate-700 z-40 animate-in fade-in">
                  <div className="text-xs font-bold line-clamp-1">{p.name}</div>
                  <div className="text-[11px] text-teal-400 flex items-center gap-1 mt-0.5">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>{p.rating} ({p.reviewCount}) • {p.distanceKm} km</span>
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1 line-clamp-1">
                    {p.locality} • {p.operatingHours}
                  </div>
                  <div className="mt-2 flex gap-1.5">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenDetails(p);
                      }}
                      className="flex-1 py-1 text-[11px] font-bold bg-teal-600 hover:bg-teal-500 rounded-lg text-white text-center"
                    >
                      View Details
                    </button>
                    <a
                      href={`tel:${p.phone}`}
                      onClick={(e) => e.stopPropagation()}
                      className="px-2 py-1 text-[11px] font-bold bg-rose-600 hover:bg-rose-500 rounded-lg text-white flex items-center justify-center"
                    >
                      <Phone className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Selected Provider Bottom Sheet Card for Mobile/Desktop */}
      {selectedProvider && (
        <div className="absolute bottom-4 left-4 right-4 z-30 max-w-md mx-auto bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-2xl border border-slate-200 animate-in slide-in-from-bottom-2">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <img
                src={selectedProvider.image}
                alt={selectedProvider.name}
                className="w-14 h-14 rounded-xl object-cover flex-shrink-0"
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-teal-100 text-teal-800">
                    {selectedProvider.serviceType.toUpperCase()}
                  </span>
                  <div className="flex items-center text-xs font-bold text-amber-600">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span className="ml-0.5">{selectedProvider.rating}</span>
                  </div>
                </div>
                <h4 className="font-extrabold text-slate-900 text-sm leading-tight mt-1 line-clamp-1">
                  {selectedProvider.name}
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  {selectedProvider.locality} • {selectedProvider.distanceKm} km away
                </p>
              </div>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-2">
            <button
              onClick={() => onOpenDetails(selectedProvider)}
              className="flex-1 min-h-[44px] py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all"
            >
              Full Profile & Reviews
            </button>
            <a
              href={`tel:${selectedProvider.emergencyPhone || selectedProvider.phone}`}
              className="min-h-[44px] px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

