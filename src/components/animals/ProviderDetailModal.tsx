import React from 'react';
import { Provider } from '../../types';
import { 
  X, 
  MapPin, 
  Star, 
  Phone, 
  MessageSquare, 
  Clock, 
  ShieldCheck, 
  AlertCircle, 
  Navigation as NavigationIcon,
  CheckCircle2,
  DollarSign,
  User,
  Heart,
  ExternalLink
} from 'lucide-react';

interface ProviderDetailModalProps {
  provider: Provider | null;
  onClose: () => void;
  onOpenCorrection: (provider: Provider) => void;
  onOpenBook: (provider: Provider) => void;
}

export const ProviderDetailModal: React.FC<ProviderDetailModalProps> = ({
  provider,
  onClose,
  onOpenCorrection,
  onOpenBook
}) => {
  if (!provider) return null;

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(provider.name + ' ' + provider.address)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm overflow-y-auto animate-in fade-in">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
        {/* Header with image */}
        <div className="relative h-48 sm:h-64 w-full bg-slate-900 overflow-hidden flex-shrink-0">
          <img 
            src={provider.image} 
            alt={provider.name}
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
          
          <button 
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-slate-800 flex items-center justify-center shadow-lg transition-transform hover:scale-105 z-10"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-4 right-4 text-white">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              {provider.isVerified && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/90 text-white backdrop-blur-sm">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {provider.verificationBadge}
                </span>
              )}
              {provider.is24x7 ? (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-600 text-white animate-pulse">
                  24/7 EMERGENCY READY
                </span>
              ) : provider.isOpenNow ? (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-teal-600 text-white">
                  Open Now
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-600 text-white">
                  Closed
                </span>
              )}
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white leading-snug">
              {provider.name}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 flex items-center gap-1 mt-1">
              <MapPin className="w-3.5 h-3.5 text-teal-400 flex-shrink-0" />
              <span>{provider.locality}, {provider.city} • {provider.distanceKm} km away</span>
            </p>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-grow">
          {/* Rating, Pricing, Quick Info */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
            <div>
              <div className="text-xs text-slate-500 font-medium">Rating & Reviews</div>
              <div className="flex items-center gap-1 mt-1">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="font-extrabold text-slate-900 text-base">{provider.rating}</span>
                <span className="text-xs text-slate-500">({provider.reviewCount})</span>
              </div>
            </div>
            <div>
              <div className="text-xs text-slate-500 font-medium">Consultation Fee</div>
              <div className="text-slate-900 font-extrabold text-base mt-1">
                ₹{provider.consultationFee}
                <span className="text-xs text-slate-500 font-normal"> / visit</span>
              </div>
            </div>
            <div>
              <div className="text-xs text-slate-500 font-medium">Timings</div>
              <div className="text-xs font-semibold text-slate-800 mt-1 line-clamp-1">
                {provider.operatingHours}
              </div>
            </div>
            <div>
              <div className="text-xs text-slate-500 font-medium">Home Visits</div>
              <div className="text-xs font-semibold mt-1">
                {provider.offersHomeVisit ? (
                  <span className="text-emerald-700 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Available
                  </span>
                ) : (
                  <span className="text-slate-500">Clinic only</span>
                )}
              </div>
            </div>
          </div>

          {/* Animals Treated */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">Animals Treated</h3>
            <div className="flex flex-wrap gap-2">
              {provider.animalTypes.map(type => (
                <span key={type} className="px-3 py-1 bg-teal-50 text-teal-800 text-xs font-semibold rounded-lg border border-teal-100 uppercase tracking-wide">
                  {type === 'dog' && '🐕 Dogs'}
                  {type === 'cat' && '🐈 Cats'}
                  {type === 'bird' && '🦜 Birds'}
                  {type === 'exotic' && '🦎 Exotics / Rabbits'}
                  {type === 'livestock' && '🐎 Livestock & Equine'}
                </span>
              ))}
            </div>
          </div>

          {/* Doctors Onboard */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">Consulting Veterinarians</h3>
            <div className="space-y-3">
              {provider.doctors.map((doc, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="w-10 h-10 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center font-bold text-sm flex-shrink-0">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{doc.name}</h4>
                    <p className="text-xs text-teal-700 font-medium">{doc.specialty}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{doc.degree} • {doc.experienceYears} Years Clinical Exp</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Specialties & Facilities */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">Clinical Specialties</h3>
              <ul className="space-y-1.5">
                {provider.specialties.map((spec, i) => (
                  <li key={i} className="text-xs text-slate-700 flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 flex-shrink-0" />
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">Hospital Facilities</h3>
              <ul className="space-y-1.5">
                {provider.facilities.map((fac, i) => (
                  <li key={i} className="text-xs text-slate-700 flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <span>{fac}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Location & Directions */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Full Clinic Address</h3>
                <p className="text-sm font-medium text-slate-800">{provider.address}</p>
              </div>
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-teal-100 hover:bg-teal-200 text-teal-800 font-bold text-xs flex items-center gap-1.5 flex-shrink-0"
              >
                <NavigationIcon className="w-3.5 h-3.5" />
                <span>Google Maps</span>
              </a>
            </div>

            <div className="flex flex-wrap gap-2 text-xs text-slate-600 pt-1">
              <span className="font-medium">Languages:</span>
              <span>{provider.languages.join(', ')}</span>
              <span className="mx-1">•</span>
              <span className="font-medium">Payments:</span>
              <span>{provider.paymentMethods.join(', ')}</span>
            </div>
          </div>

          {/* Recent Verified Reviews */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Recent Pet Parent Reviews</h3>
              <span className="text-xs text-teal-700 font-semibold">{provider.reviewCount} total verified visits</span>
            </div>
            <div className="space-y-3">
              {provider.reviews.map((rev) => (
                <div key={rev.id} className="p-3.5 rounded-xl border border-slate-100 bg-white shadow-xs">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <div className="flex items-center gap-2 font-bold text-slate-800">
                      <span>{rev.author}</span>
                      <span className="text-[11px] font-normal text-slate-500">({rev.pet})</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="flex text-amber-400">
                        {Array.from({ length: rev.rating }).map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-current" />
                        ))}
                      </div>
                      <span className="text-[11px] text-slate-400 ml-1">{rev.date}</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed mt-1">{rev.comment}</p>
                  {rev.verifiedVisit && (
                    <div className="mt-2 text-[10px] text-emerald-700 flex items-center gap-1 font-medium">
                      <ShieldCheck className="w-3 h-3" /> Verified Consultation Visit
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Crowdsourced data integrity: Submit a correction */}
          <div className="p-3 rounded-xl bg-amber-50 border border-amber-200/80 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-amber-900">
              <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
              <span>Noticed outdated timings, wrong phone number, or changed fees?</span>
            </div>
            <button
              onClick={() => onOpenCorrection(provider)}
              className="text-xs font-bold text-amber-800 hover:text-amber-950 underline flex-shrink-0 ml-2"
            >
              Submit a Correction
            </button>
          </div>
        </div>

        {/* Footer Action Buttons (≥44px tap targets) */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap sm:flex-nowrap items-center gap-2 flex-shrink-0">
          <a
            href={`tel:${provider.emergencyPhone || provider.phone}`}
            className="flex-1 min-h-[48px] flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm shadow-sm transition-all"
          >
            <Phone className="w-4 h-4" />
            <span>Call Now ({provider.phone})</span>
          </a>

          <a
            href={`https://wa.me/${provider.whatsapp.replace(/[^0-9]/g, '')}?text=Hi!%20I%20found%20${encodeURIComponent(provider.name)}%20on%20PawPulse%20and%20would%20like%20to%20enquire.`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 min-h-[48px] flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-sm transition-all"
          >
            <MessageSquare className="w-4 h-4" />
            <span>WhatsApp</span>
          </a>

          <button
            onClick={() => onOpenBook(provider)}
            className="flex-1 min-h-[48px] flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-teal-800 hover:bg-teal-900 text-white font-bold text-sm shadow-sm transition-all"
          >
            <Clock className="w-4 h-4" />
            <span>Book / Enquire</span>
          </button>
        </div>
      </div>
    </div>
  );
};
