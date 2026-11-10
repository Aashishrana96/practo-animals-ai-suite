import React, { useState, useMemo } from 'react';
import { SAMPLE_PROVIDERS, CITIES } from '../data/animalProviders';
import { Provider, FilterState, ServiceType } from '../types';
import { 
  Search, 
  MapPin, 
  Phone, 
  MessageSquare, 
  Clock, 
  ShieldCheck, 
  SlidersHorizontal, 
  Map as MapIcon, 
  List as ListIcon, 
  AlertTriangle, 
  Heart, 
  ChevronRight, 
  Star, 
  CheckCircle2, 
  Compass, 
  PlusCircle, 
  X, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { ProviderDetailModal } from '../components/animals/ProviderDetailModal';
import { SubmitCorrectionModal } from '../components/animals/SubmitCorrectionModal';
import { ListBusinessModal } from '../components/animals/ListBusinessModal';
import { BookAppointmentModal } from '../components/animals/BookAppointmentModal';
import { InteractiveMapView } from '../components/animals/InteractiveMapView';
import { DesignRationaleDrawer } from '../components/animals/DesignRationaleDrawer';

export const AnimalsPage: React.FC = () => {
  // State for view mode: 'home' or 'search'
  const [activeTab, setActiveTab] = useState<'home' | 'search'>('home');
  const [displayMode, setDisplayMode] = useState<'list' | 'map'>('list');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filters State
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    serviceType: 'all',
    animalType: 'all',
    city: 'Bangalore',
    openNowOnly: false,
    emergencyOnly: false,
    homeVisitOnly: false,
    verifiedOnly: false,
    maxDistance: 10,
    minRating: 0,
    priceLevel: 'all',
    sortBy: 'recommended'
  });

  // Modal States
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);
  const [detailModalProvider, setDetailModalProvider] = useState<Provider | null>(null);
  const [correctionModalProvider, setCorrectionModalProvider] = useState<Provider | null>(null);
  const [bookingModalProvider, setBookingModalProvider] = useState<Provider | null>(null);
  const [isListBusinessOpen, setIsListBusinessOpen] = useState(false);

  // Notification Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  // Filter Logic
  const filteredProviders = useMemo(() => {
    return SAMPLE_PROVIDERS.filter((provider) => {
      // Search Query
      if (filters.searchQuery.trim() !== '') {
        const q = filters.searchQuery.toLowerCase();
        const matchName = provider.name.toLowerCase().includes(q);
        const matchLoc = provider.locality.toLowerCase().includes(q);
        const matchSpec = provider.specialties.some(s => s.toLowerCase().includes(q));
        if (!matchName && !matchLoc && !matchSpec) return false;
      }

      // Service Type
      if (filters.serviceType !== 'all' && provider.serviceType !== filters.serviceType) {
        return false;
      }

      // Animal Type
      if (filters.animalType !== 'all') {
        if (!provider.animalTypes.includes(filters.animalType as any)) {
          return false;
        }
      }

      // Open Now
      if (filters.openNowOnly && !provider.isOpenNow) return false;

      // Emergency Only
      if (filters.emergencyOnly && !provider.isEmergencyReady) return false;

      // Home Visit Only
      if (filters.homeVisitOnly && !provider.offersHomeVisit) return false;

      // Verified Only
      if (filters.verifiedOnly && !provider.isVerified) return false;

      // Min Rating
      if (filters.minRating > 0 && provider.rating < filters.minRating) return false;

      // Price Level
      if (filters.priceLevel !== 'all' && provider.priceLevel !== filters.priceLevel) {
        return false;
      }

      // Distance
      if (provider.distanceKm > filters.maxDistance) return false;

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'distance') return a.distanceKm - b.distanceKm;
      if (filters.sortBy === 'rating') return b.rating - a.rating;
      if (filters.sortBy === 'feeAsc') return a.consultationFee - b.consultationFee;
      return 0; // recommended
    });
  }, [filters]);

  const handleCategorySelect = (serviceType: ServiceType) => {
    setFilters(prev => ({ ...prev, serviceType }));
    setActiveTab('search');
    window.scrollTo({ top: 350, behavior: 'smooth' });
  };

  const handleEmergencyTrigger = () => {
    setFilters(prev => ({ ...prev, emergencyOnly: true, serviceType: 'all' }));
    setActiveTab('search');
    showToast('🚨 Showing 24/7 emergency veterinary trauma hospitals & rapid animal ambulances.');
    window.scrollTo({ top: 350, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20 relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 max-w-md bg-slate-900 text-white p-4 rounded-2xl shadow-2xl border border-slate-700 flex items-start gap-3 animate-in slide-in-from-right">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
          <div className="text-xs font-medium leading-relaxed">{toastMessage}</div>
          <button onClick={() => setToastMessage(null)} className="text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* 24/7 Emergency Header Strip */}
      <div className="bg-rose-600 text-white py-3 px-4 sm:px-8 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-white animate-ping" />
            <div className="text-xs sm:text-sm font-bold tracking-wide">
              Critical Emergency? Animal in distress? Find 24/7 Trauma Hospitals & Ambulances.
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleEmergencyTrigger}
              className="px-3.5 py-1.5 rounded-lg bg-white text-rose-700 font-extrabold text-xs hover:bg-rose-50 transition-all shadow-xs min-h-[44px] flex items-center"
            >
              Find 24/7 Emergency Care Now
            </button>
            <a
              href="tel:1962"
              className="px-3 py-1.5 rounded-lg bg-rose-700 hover:bg-rose-800 text-white font-bold text-xs border border-rose-500 min-h-[44px] flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Dial 1962 (Govt Helpline)</span>
            </a>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-teal-900 via-teal-950 to-slate-950 text-white pt-12 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-500/20 border border-teal-400/30 text-teal-300 text-xs font-semibold mb-4 backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>India's Dedicated Animal Care Discovery & Emergency Network</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Trusted Healthcare for Every <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-emerald-300 to-amber-300">
              Paw, Claw & Hoof.
            </span>
          </h1>

          <p className="mt-4 text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Discover verified veterinary clinics, 24/7 emergency ICUs, mobile ambulances, cage-free boarding, diagnostics, and rescue NGOs across Bangalore, Mumbai & Delhi.
          </p>

          {/* Search Bar & Location Selector */}
          <div className="mt-8 bg-white p-2.5 sm:p-3 rounded-2xl shadow-2xl max-w-3xl mx-auto text-slate-800 flex flex-col sm:flex-row items-stretch gap-2 border border-slate-100">
            {/* City Selector */}
            <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-xl sm:w-48 border border-slate-200">
              <MapPin className="w-4 h-4 text-teal-600 flex-shrink-0" />
              <select
                value={filters.city}
                onChange={(e) => setFilters(prev => ({ ...prev, city: e.target.value }))}
                className="bg-transparent text-xs font-bold text-slate-800 w-full focus:outline-none"
              >
                {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            {/* Keyword Search */}
            <div className="flex-1 flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-xl border border-slate-200">
              <Search className="w-4 h-4 text-slate-400 flex-shrink-0" />
              <input
                type="text"
                placeholder="Search 'vaccination', 'cat specialist', 'X-Ray', 'Cessna'..."
                value={filters.searchQuery}
                onChange={(e) => {
                  setFilters(prev => ({ ...prev, searchQuery: e.target.value }));
                  if (activeTab !== 'search') setActiveTab('search');
                }}
                className="w-full bg-transparent text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none"
              />
              {filters.searchQuery && (
                <button 
                  onClick={() => setFilters(prev => ({ ...prev, searchQuery: '' }))}
                  className="p-1 hover:bg-slate-200 rounded-full"
                >
                  <X className="w-3.5 h-3.5 text-slate-500" />
                </button>
              )}
            </div>

            {/* Submit Action */}
            <button
              onClick={() => {
                setActiveTab('search');
                window.scrollTo({ top: 380, behavior: 'smooth' });
              }}
              className="px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 min-h-[44px]"
            >
              <span>Find Providers</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Filter Badges */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-300">
            <span className="font-semibold text-slate-400">Quick Filters:</span>
            {[
              { label: '🐕 Dogs', animal: 'dog' },
              { label: '🐈 Cats', animal: 'cat' },
              { label: '🦜 Birds & Exotics', animal: 'bird' },
              { label: '🚨 24x7 Emergency', emergency: true },
              { label: '🏡 Home Visit Vet', homeVisit: true },
              { label: '🕊️ Free Stray Rescue', service: 'ngo' },
            ].map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  if (item.animal) setFilters(prev => ({ ...prev, animalType: item.animal! }));
                  if (item.emergency) setFilters(prev => ({ ...prev, emergencyOnly: true }));
                  if (item.homeVisit) setFilters(prev => ({ ...prev, homeVisitOnly: true }));
                  if (item.service) setFilters(prev => ({ ...prev, serviceType: item.service! }));
                  setActiveTab('search');
                }}
                className="px-3 py-1 rounded-full bg-slate-800/80 hover:bg-teal-800/80 border border-slate-700 text-slate-200 hover:text-white transition-all min-h-[32px]"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        {/* Navigation Tabs: "Homepage Overview" vs "Search & Discovery" */}
        <div className="bg-white p-2 rounded-2xl shadow-xl border border-slate-200 flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('home')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all min-h-[44px] flex items-center gap-2 ${
                activeTab === 'home'
                  ? 'bg-teal-700 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span>Explore Homepage Overview</span>
            </button>
            <button
              onClick={() => setActiveTab('search')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all min-h-[44px] flex items-center gap-2 ${
                activeTab === 'search'
                  ? 'bg-teal-700 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Search className="w-3.5 h-3.5" />
              <span>Search Directory ({filteredProviders.length} Providers)</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsListBusinessOpen(true)}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-teal-800 bg-teal-50 hover:bg-teal-100 border border-teal-200 rounded-xl transition-colors min-h-[44px]"
            >
              <PlusCircle className="w-3.5 h-3.5 text-teal-600" />
              <span>List Your Practice</span>
            </button>
          </div>
        </div>

        {/* HOMEPAGE VIEW */}
        {activeTab === 'home' && (
          <div className="space-y-16 animate-in fade-in">
            {/* 6 Category Tiles */}
            <div>
              <div className="text-center mb-8">
                <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                  What care does your animal need today?
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Connect with audited, VCI-licensed veterinary specialists across 6 core care pillars.
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
                {[
                  {
                    type: 'vet' as ServiceType,
                    icon: '🩺',
                    title: 'Vet Clinics',
                    desc: 'OPD, checkups & vaccines',
                    count: '420+ clinics'
                  },
                  {
                    type: 'hospital' as ServiceType,
                    icon: '🏥',
                    title: '24/7 Hospitals',
                    desc: 'Surgeries, ICU & inpatient',
                    count: '48 trauma centers'
                  },
                  {
                    type: 'ambulance' as ServiceType,
                    icon: '🚑',
                    title: 'Ambulance',
                    desc: 'Emergency oxygen transit',
                    count: '24/7 dispatch'
                  },
                  {
                    type: 'boarding' as ServiceType,
                    icon: '🏡',
                    title: 'Pet Boarding',
                    desc: 'Cage-free farm & daycare',
                    count: '110+ stays'
                  },
                  {
                    type: 'diagnostics' as ServiceType,
                    icon: '🔬',
                    title: 'Diagnostics',
                    desc: 'Blood tests, X-Ray & CT',
                    count: '35 NABL labs'
                  },
                  {
                    type: 'ngo' as ServiceType,
                    icon: '🕊️',
                    title: 'NGO Shelters',
                    desc: 'Rescue, ABC & adoption',
                    count: '26 shelters'
                  }
                ].map((cat) => (
                  <button
                    key={cat.type}
                    onClick={() => handleCategorySelect(cat.type)}
                    className="p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-teal-500 shadow-xs hover:shadow-card transition-all text-left group flex flex-col justify-between min-h-[140px]"
                  >
                    <div>
                      <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                        {cat.icon}
                      </div>
                      <div className="font-extrabold text-slate-900 text-sm group-hover:text-teal-700">
                        {cat.title}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                        {cat.desc}
                      </div>
                    </div>
                    <div className="mt-3 text-[10px] font-mono text-teal-700 font-semibold bg-teal-50 px-2 py-0.5 rounded w-fit">
                      {cat.count}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Featured & SuperVerified Providers Spotlight */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 uppercase tracking-wider mb-1">
                    <ShieldCheck className="w-4 h-4" />
                    <span>PawPulse SuperVerified™</span>
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-900">
                    Highest-Rated Animal Care Facilities in {filters.city}
                  </h3>
                </div>
                <button
                  onClick={() => setActiveTab('search')}
                  className="text-xs font-bold text-teal-700 hover:text-teal-900 flex items-center gap-1"
                >
                  <span>View all {SAMPLE_PROVIDERS.length}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {SAMPLE_PROVIDERS.slice(0, 3).map((provider) => (
                  <div
                    key={provider.id}
                    className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all flex flex-col group"
                  >
                    <div className="relative h-44 w-full bg-slate-900 overflow-hidden">
                      <img
                        src={provider.image}
                        alt={provider.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 left-3 flex items-center gap-1.5">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-teal-700 text-white shadow-sm uppercase tracking-wide">
                          {provider.serviceType}
                        </span>
                        {provider.is24x7 && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-600 text-white animate-pulse">
                            24/7 ICU
                          </span>
                        )}
                      </div>
                      <div className="absolute bottom-2 right-2 bg-slate-950/80 backdrop-blur-sm text-amber-300 px-2 py-0.5 rounded-md text-xs font-bold flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-amber-300" />
                        <span>{provider.rating} ({provider.reviewCount})</span>
                      </div>
                    </div>

                    <div className="p-5 flex-grow flex flex-col justify-between">
                      <div>
                        <div className="text-xs text-slate-400 font-medium">
                          {provider.locality} • {provider.distanceKm} km away
                        </div>
                        <h4 className="text-base font-extrabold text-slate-900 mt-1 leading-snug line-clamp-1">
                          {provider.name}
                        </h4>
                        <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                          {provider.tagline}
                        </p>

                        <div className="mt-3 flex flex-wrap gap-1">
                          {provider.specialties.slice(0, 2).map((s, i) => (
                            <span key={i} className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium">
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                        <div>
                          <div className="text-[10px] text-slate-400 uppercase">Consultation</div>
                          <div className="text-sm font-extrabold text-slate-900">₹{provider.consultationFee}</div>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => setDetailModalProvider(provider)}
                            className="px-3 py-1.5 text-xs font-bold text-teal-800 bg-teal-50 hover:bg-teal-100 rounded-lg transition-colors min-h-[44px] flex items-center"
                          >
                            Details
                          </button>
                          <button
                            onClick={() => setBookingModalProvider(provider)}
                            className="px-3 py-1.5 text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 rounded-lg transition-colors min-h-[44px] flex items-center"
                          >
                            Book
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* How It Works (3 Steps) */}
            <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden">
              <div className="max-w-3xl mb-8">
                <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">Simple & Transparent</span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                  How PawPulse Works for Pet Parents
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-2">
                  No misleading sponsored ads, no unverified home breeders, and zero hidden checkout fees.
                </p>
              </div>

              <div className="grid sm:grid-cols-3 gap-6 relative z-10">
                {[
                  {
                    step: '01',
                    title: 'Pinpoint Filter',
                    desc: 'Filter by species (Dog, Cat, Exotic, Bird), real-time 24x7 readiness, and verified home-visit vets within your radius.'
                  },
                  {
                    step: '02',
                    title: 'Transparent Truth',
                    desc: 'Inspect genuine doctor VCI licenses, clean facility photos, transparent consultation fees, and authentic parent reviews.'
                  },
                  {
                    step: '03',
                    title: 'Direct 1-Tap Connect',
                    desc: 'Call directly, request WhatsApp confirmation, or get Google turn-by-turn directions without lock-in or prepayments.'
                  }
                ].map((s) => (
                  <div key={s.step} className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/80">
                    <div className="text-2xl font-black text-teal-400 font-mono mb-2">{s.step}</div>
                    <div className="font-bold text-base text-white">{s.title}</div>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust Signals & Metrics Strip */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { number: '12,400+', label: 'VCI-Verified Practitioners', sub: 'Across Tier-1 & Tier-2 Metros' },
                { number: '14 Mins', label: 'Avg. Ambulance Transit ETA', sub: 'GPS Dispatched Emergency Fleet' },
                { number: '48,000+', label: 'Care Inquiries Facilitated', sub: 'Zero commission to vets' },
                { number: '4.85 / 5.0', label: 'Pet Parent Satisfaction', sub: 'From 18,200+ authenticated reviews' },
              ].map((m, i) => (
                <div key={i} className="p-5 rounded-2xl bg-white border border-slate-200 text-center">
                  <div className="text-2xl sm:text-3xl font-extrabold text-teal-800 font-mono">{m.number}</div>
                  <div className="text-xs font-bold text-slate-800 mt-1">{m.label}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{m.sub}</div>
                </div>
              ))}
            </div>

            {/* Pet Parent Testimonials */}
            <div>
              <div className="text-center max-w-xl mx-auto mb-8">
                <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">Real Stories</span>
                <h3 className="text-2xl font-extrabold text-slate-900 mt-1">Saved When Every Second Counted</h3>
                <p className="text-xs text-slate-500 mt-1">Stories from India's companion animal community.</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    name: 'Rhea & Leo (Golden Retriever)',
                    loc: 'Indiranagar, Bangalore',
                    text: 'At 2:15 AM, Leo showed acute bloat symptoms. PawPulse guided us to Cessna Lifeline with live open verification. Dr. Pawan was scrubbing in when we arrived.',
                    tag: 'Emergency Surgery'
                  },
                  {
                    name: 'Arjun Nambiar',
                    loc: 'Koramangala, Bangalore',
                    text: 'A community street dog was struck by a car on 80ft road. Used the 1-tap Ambulance dispatch button; the BARMA trauma van arrived in 14 minutes with oxygen.',
                    tag: 'Rescue Ambulance'
                  },
                  {
                    name: 'Tanvi Shah',
                    loc: 'Jayanagar, Bangalore',
                    text: 'Finding an avian specialist for my cockatiel Pippin was impossible until I filtered by "Bird/Avian". Dr. Vivek Shastri treated her egg-binding flawlessly.',
                    tag: 'Avian Speciality'
                  }
                ].map((t, idx) => (
                  <div key={idx} className="p-6 rounded-2xl bg-white border border-slate-200 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-teal-50 text-teal-800 uppercase">
                          {t.tag}
                        </span>
                        <div className="flex text-amber-400">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-current" />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed italic">"{t.text}"</p>
                    </div>
                    <div className="mt-4 pt-4 border-t border-slate-100">
                      <div className="text-xs font-bold text-slate-900">{t.name}</div>
                      <div className="text-[10px] text-slate-400">{t.loc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* List Your Business Banner */}
            <div className="bg-gradient-to-r from-teal-800 to-emerald-800 rounded-3xl p-8 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
              <div className="max-w-xl">
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">Veterinary & NGO Partners</span>
                <h3 className="text-2xl font-extrabold text-white mt-1">Are you a Vet, Clinic Owner, or Animal NGO?</h3>
                <p className="text-xs sm:text-sm text-teal-100 mt-2 leading-relaxed">
                  Join India's fastest growing ethical animal discovery platform. Get verified, receive direct pet parent inquiries, and update your real-time bed & emergency status.
                </p>
              </div>
              <button
                onClick={() => setIsListBusinessOpen(true)}
                className="px-6 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-teal-900 font-extrabold text-xs sm:text-sm shadow-lg transition-transform hover:scale-105 min-h-[44px] flex-shrink-0"
              >
                List Your Business Free (3 Min)
              </button>
            </div>
          </div>
        )}

        {/* SEARCH & DISCOVERY RESULTS VIEW */}
        {activeTab === 'search' && (
          <div className="space-y-6 animate-in fade-in">
            {/* Filter Bar & View Toggle */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                {/* Search result count */}
                <div>
                  <h2 className="text-lg font-extrabold text-slate-900">
                    {filteredProviders.length} Animal Care Providers in {filters.city}
                  </h2>
                  <p className="text-xs text-slate-500">
                    Showing verified clinics, hospitals, boarding & emergency trauma fleets
                  </p>
                </div>

                {/* View Toggles & Mobile Filter Trigger */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setMobileFilterOpen(true)}
                    className="lg:hidden flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold min-h-[44px]"
                  >
                    <SlidersHorizontal className="w-4 h-4" />
                    <span>Filters</span>
                  </button>

                  <div className="flex items-center bg-slate-100 p-1 rounded-xl">
                    <button
                      onClick={() => setDisplayMode('list')}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all min-h-[36px] ${
                        displayMode === 'list'
                          ? 'bg-white text-slate-900 shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <ListIcon className="w-3.5 h-3.5" />
                      <span>List View</span>
                    </button>
                    <button
                      onClick={() => setDisplayMode('map')}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all min-h-[36px] ${
                        displayMode === 'map'
                          ? 'bg-white text-slate-900 shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <MapIcon className="w-3.5 h-3.5" />
                      <span>Map View</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Desktop Filters Bar */}
              <div className="hidden lg:grid grid-cols-6 gap-2 pt-3 border-t border-slate-100 text-xs">
                {/* Service Type */}
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Service</label>
                  <select
                    value={filters.serviceType}
                    onChange={e => setFilters(prev => ({ ...prev, serviceType: e.target.value }))}
                    className="w-full p-2 rounded-lg border border-slate-200 bg-slate-50 font-semibold text-slate-800"
                  >
                    <option value="all">All Services</option>
                    <option value="vet">Veterinary Clinic</option>
                    <option value="hospital">24/7 Hospital</option>
                    <option value="ambulance">Ambulance Service</option>
                    <option value="boarding">Pet Boarding</option>
                    <option value="diagnostics">Diagnostics Lab</option>
                    <option value="ngo">NGO Rescue</option>
                  </select>
                </div>

                {/* Animal Type */}
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Animal</label>
                  <select
                    value={filters.animalType}
                    onChange={e => setFilters(prev => ({ ...prev, animalType: e.target.value }))}
                    className="w-full p-2 rounded-lg border border-slate-200 bg-slate-50 font-semibold text-slate-800"
                  >
                    <option value="all">All Animals</option>
                    <option value="dog">🐕 Dogs</option>
                    <option value="cat">🐈 Cats</option>
                    <option value="bird">🦜 Birds</option>
                    <option value="exotic">🦎 Exotics</option>
                    <option value="livestock">🐎 Livestock</option>
                  </select>
                </div>

                {/* Distance Radius */}
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                    Distance: &le; {filters.maxDistance} km
                  </label>
                  <input
                    type="range"
                    min="2"
                    max="20"
                    step="1"
                    value={filters.maxDistance}
                    onChange={e => setFilters(prev => ({ ...prev, maxDistance: Number(e.target.value) }))}
                    className="w-full accent-teal-600 mt-2"
                  />
                </div>

                {/* Toggles: 24/7 & Emergency */}
                <div className="flex flex-col justify-end">
                  <label className="flex items-center gap-1.5 p-2 rounded-lg border border-slate-200 bg-slate-50 cursor-pointer font-bold text-slate-700">
                    <input
                      type="checkbox"
                      checked={filters.emergencyOnly}
                      onChange={e => setFilters(prev => ({ ...prev, emergencyOnly: e.target.checked }))}
                      className="accent-rose-600 w-3.5 h-3.5"
                    />
                    <span className="text-[11px] text-rose-700">24/7 Emergency</span>
                  </label>
                </div>

                {/* Home Visit toggle */}
                <div className="flex flex-col justify-end">
                  <label className="flex items-center gap-1.5 p-2 rounded-lg border border-slate-200 bg-slate-50 cursor-pointer font-bold text-slate-700">
                    <input
                      type="checkbox"
                      checked={filters.homeVisitOnly}
                      onChange={e => setFilters(prev => ({ ...prev, homeVisitOnly: e.target.checked }))}
                      className="accent-teal-600 w-3.5 h-3.5"
                    />
                    <span className="text-[11px]">Home Visits</span>
                  </label>
                </div>

                {/* Sort By */}
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Sort By</label>
                  <select
                    value={filters.sortBy}
                    onChange={e => setFilters(prev => ({ ...prev, sortBy: e.target.value as any }))}
                    className="w-full p-2 rounded-lg border border-slate-200 bg-slate-50 font-semibold text-slate-800"
                  >
                    <option value="recommended">Recommended</option>
                    <option value="distance">Nearest First</option>
                    <option value="rating">Highest Rated</option>
                    <option value="feeAsc">Fee: Low to High</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Mobile Filter Bottom Sheet */}
            {mobileFilterOpen && (
              <div className="fixed inset-0 z-50 flex items-end bg-slate-900/60 backdrop-blur-sm lg:hidden animate-in fade-in">
                <div className="w-full bg-white rounded-t-3xl p-6 shadow-2xl max-h-[85vh] overflow-y-auto space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <h3 className="font-extrabold text-base text-slate-900">Filter Animal Care</h3>
                    <button
                      onClick={() => setMobileFilterOpen(false)}
                      className="p-1 rounded-full hover:bg-slate-100"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Filter controls */}
                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Service Type</label>
                      <select
                        value={filters.serviceType}
                        onChange={e => setFilters(prev => ({ ...prev, serviceType: e.target.value }))}
                        className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 text-sm"
                      >
                        <option value="all">All Services</option>
                        <option value="vet">Veterinary Clinic</option>
                        <option value="hospital">24/7 Hospital</option>
                        <option value="ambulance">Ambulance Service</option>
                        <option value="boarding">Pet Boarding</option>
                        <option value="diagnostics">Diagnostics Lab</option>
                        <option value="ngo">NGO Rescue</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Animal Species</label>
                      <select
                        value={filters.animalType}
                        onChange={e => setFilters(prev => ({ ...prev, animalType: e.target.value }))}
                        className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 text-sm"
                      >
                        <option value="all">All Animals</option>
                        <option value="dog">🐕 Dogs</option>
                        <option value="cat">🐈 Cats</option>
                        <option value="bird">🦜 Birds</option>
                        <option value="exotic">🦎 Exotics & Small Mammals</option>
                        <option value="livestock">🐎 Livestock</option>
                      </select>
                    </div>

                    <div className="space-y-2 pt-2">
                      <label className="flex items-center gap-2 p-3 rounded-xl bg-rose-50 border border-rose-200 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={filters.emergencyOnly}
                          onChange={e => setFilters(prev => ({ ...prev, emergencyOnly: e.target.checked }))}
                          className="w-4 h-4 accent-rose-600"
                        />
                        <span className="font-bold text-rose-900">24/7 Emergency & ICU Ready</span>
                      </label>

                      <label className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={filters.homeVisitOnly}
                          onChange={e => setFilters(prev => ({ ...prev, homeVisitOnly: e.target.checked }))}
                          className="w-4 h-4 accent-teal-600"
                        />
                        <span className="font-bold text-slate-800">Offers Doorstep / Home Visits</span>
                      </label>
                    </div>
                  </div>

                  <div className="pt-4 flex gap-2">
                    <button
                      onClick={() => {
                        setFilters({
                          searchQuery: '',
                          serviceType: 'all',
                          animalType: 'all',
                          city: 'Bangalore',
                          openNowOnly: false,
                          emergencyOnly: false,
                          homeVisitOnly: false,
                          verifiedOnly: false,
                          maxDistance: 10,
                          minRating: 0,
                          priceLevel: 'all',
                          sortBy: 'recommended'
                        });
                        setMobileFilterOpen(false);
                      }}
                      className="flex-1 py-3 text-xs font-bold text-slate-600 bg-slate-100 rounded-xl"
                    >
                      Reset
                    </button>
                    <button
                      onClick={() => setMobileFilterOpen(false)}
                      className="flex-1 py-3 text-xs font-bold text-white bg-teal-700 rounded-xl"
                    >
                      Apply Filters
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* MAP VIEW */}
            {displayMode === 'map' && (
              <InteractiveMapView
                providers={filteredProviders}
                selectedProvider={selectedProvider}
                onSelectProvider={(p) => setSelectedProvider(p)}
                onOpenDetails={(p) => setDetailModalProvider(p)}
              />
            )}

            {/* LIST VIEW */}
            {displayMode === 'list' && (
              <div className="space-y-4">
                {filteredProviders.length === 0 ? (
                  <div className="p-12 text-center bg-white rounded-2xl border border-slate-200">
                    <AlertTriangle className="w-8 h-8 text-amber-500 mx-auto mb-2" />
                    <h3 className="font-bold text-slate-900 text-base">No providers match your exact filters</h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Try widening the distance slider or removing the 24/7 filter.
                    </p>
                    <button
                      onClick={() => setFilters(prev => ({ ...prev, serviceType: 'all', animalType: 'all', emergencyOnly: false, maxDistance: 15 }))}
                      className="mt-4 px-4 py-2 bg-teal-600 text-white rounded-xl text-xs font-bold"
                    >
                      Reset Filter Restrictions
                    </button>
                  </div>
                ) : (
                  filteredProviders.map((provider) => (
                    <div
                      key={provider.id}
                      className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-card transition-all p-4 sm:p-5 flex flex-col md:flex-row gap-5"
                    >
                      {/* Left: Thumbnail & Badges */}
                      <div className="relative w-full md:w-56 h-48 md:h-auto rounded-xl overflow-hidden bg-slate-900 flex-shrink-0">
                        <img
                          src={provider.image}
                          alt={provider.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 left-2 flex flex-col gap-1">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-700 text-white uppercase">
                            {provider.serviceType}
                          </span>
                          {provider.is24x7 && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-600 text-white animate-pulse">
                              24/7 EMERGENCY
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Middle: Core Information */}
                      <div className="flex-grow space-y-2">
                        <div className="flex flex-wrap items-center gap-2">
                          {provider.isVerified && (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                              <ShieldCheck className="w-3.5 h-3.5" />
                              {provider.verificationBadge}
                            </span>
                          )}
                          <span className="text-xs text-slate-400 font-medium">
                            • {provider.distanceKm} km from you ({provider.locality})
                          </span>
                        </div>

                        <h3 
                          onClick={() => setDetailModalProvider(provider)}
                          className="text-lg font-extrabold text-slate-900 hover:text-teal-700 cursor-pointer leading-snug"
                        >
                          {provider.name}
                        </h3>

                        <p className="text-xs text-slate-600 line-clamp-1">{provider.tagline}</p>

                        {/* Doctors & Specialties */}
                        <div className="text-xs text-slate-700 space-y-1 pt-1">
                          {provider.doctors.length > 0 && (
                            <div className="text-[11px] text-slate-500">
                              Veterinarian: <strong className="text-slate-800">{provider.doctors[0].name}</strong> ({provider.doctors[0].degree})
                            </div>
                          )}
                          <div className="flex flex-wrap gap-1 mt-1">
                            {provider.specialties.slice(0, 3).map((spec, i) => (
                              <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-medium">
                                {spec}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Animals Treated */}
                        <div className="flex items-center gap-1.5 pt-1">
                          <span className="text-[10px] font-bold text-slate-400 uppercase">Treated:</span>
                          <div className="flex gap-1 text-xs">
                            {provider.animalTypes.map(t => (
                              <span key={t} className="text-[11px]">
                                {t === 'dog' && '🐕'}
                                {t === 'cat' && '🐈'}
                                {t === 'bird' && '🦜'}
                                {t === 'exotic' && '🦎'}
                                {t === 'livestock' && '🐎'}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Right: Pricing & Action Buttons */}
                      <div className="md:w-56 flex md:flex-col justify-between items-end border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-5 flex-shrink-0">
                        <div className="text-left md:text-right w-full">
                          <div className="flex items-center md:justify-end gap-1">
                            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                            <span className="font-extrabold text-slate-900 text-sm">{provider.rating}</span>
                            <span className="text-xs text-slate-400">({provider.reviewCount})</span>
                          </div>

                          <div className="mt-1">
                            <div className="text-[10px] text-slate-400 uppercase">Consultation Fee</div>
                            <div className="text-base font-black text-slate-900">
                              ₹{provider.consultationFee}
                              <span className="text-[10px] text-slate-500 font-normal"> / OPD</span>
                            </div>
                          </div>

                          <div className="text-[11px] text-emerald-700 font-semibold mt-1">
                            {provider.isOpenNow ? '🟢 Open Now' : '🔴 Closed'}
                          </div>
                        </div>

                        {/* CTA Grid (≥44px tap targets) */}
                        <div className="grid grid-cols-2 gap-1.5 w-full mt-3">
                          <a
                            href={`tel:${provider.emergencyPhone || provider.phone}`}
                            className="min-h-[44px] px-3 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition-all"
                          >
                            <Phone className="w-3.5 h-3.5" />
                            <span>Call</span>
                          </a>

                          <a
                            href={`https://wa.me/${provider.whatsapp.replace(/[^0-9]/g, '')}?text=Hi!%20Found%20you%20on%20PawPulse.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="min-h-[44px] px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition-all"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                            <span>WhatsApp</span>
                          </a>

                          <button
                            onClick={() => setDetailModalProvider(provider)}
                            className="min-h-[44px] px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold flex items-center justify-center transition-all"
                          >
                            Details
                          </button>

                          <button
                            onClick={() => setBookingModalProvider(provider)}
                            className="min-h-[44px] px-3 py-2 bg-teal-800 hover:bg-teal-900 text-white rounded-xl text-xs font-bold flex items-center justify-center transition-all"
                          >
                            Enquire
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Slide-out Design Rationale Drawer */}
      <DesignRationaleDrawer />

      {/* Modals */}
      <ProviderDetailModal
        provider={detailModalProvider}
        onClose={() => setDetailModalProvider(null)}
        onOpenCorrection={(p) => setCorrectionModalProvider(p)}
        onOpenBook={(p) => setBookingModalProvider(p)}
      />

      <SubmitCorrectionModal
        provider={correctionModalProvider}
        onClose={() => setCorrectionModalProvider(null)}
        onSubmitSuccess={(msg) => showToast(msg)}
      />

      <ListBusinessModal
        isOpen={isListBusinessOpen}
        onClose={() => setIsListBusinessOpen(false)}
        onSubmitSuccess={(msg) => showToast(msg)}
      />

      <BookAppointmentModal
        provider={bookingModalProvider}
        onClose={() => setBookingModalProvider(null)}
        onSuccess={(msg) => showToast(msg)}
      />
    </div>
  );
};
