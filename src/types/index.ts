export type AnimalType = 'dog' | 'cat' | 'bird' | 'exotic' | 'livestock';

export type ServiceType = 
  | 'vet'
  | 'hospital'
  | 'boarding'
  | 'diagnostics'
  | 'ambulance'
  | 'ngo';

export interface Doctor {
  name: string;
  degree: string;
  experienceYears: number;
  specialty: string;
}

export interface Review {
  id: string;
  author: string;
  pet: string;
  rating: number;
  date: string;
  comment: string;
  verifiedVisit: boolean;
}

export interface Provider {
  id: string;
  name: string;
  tagline: string;
  serviceType: ServiceType;
  animalTypes: AnimalType[];
  rating: number;
  reviewCount: number;
  distanceKm: number;
  locality: string;
  city: string;
  address: string;
  phone: string;
  whatsapp: string;
  emergencyPhone?: string;
  isOpenNow: boolean;
  is24x7: boolean;
  isEmergencyReady: boolean;
  offersHomeVisit: boolean;
  isVerified: boolean;
  verificationBadge: string;
  consultationFee: number;
  priceLevel: '₹' | '₹₹' | '₹₹₹';
  specialties: string[];
  facilities: string[];
  operatingHours: string;
  image: string;
  doctors: Doctor[];
  reviews: Review[];
  languages: string[];
  paymentMethods: string[];
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface FilterState {
  searchQuery: string;
  serviceType: string;
  animalType: string;
  city: string;
  openNowOnly: boolean;
  emergencyOnly: boolean;
  homeVisitOnly: boolean;
  verifiedOnly: boolean;
  maxDistance: number;
  minRating: number;
  priceLevel: string;
  sortBy: 'recommended' | 'distance' | 'rating' | 'feeAsc';
}

export interface CarouselSlide {
  id: number;
  type: 'hook' | 'problem' | 'insight' | 'future' | 'cta';
  badge: string;
  headline: string;
  subtitle?: string;
  body: string[];
  statNumber?: string;
  statLabel?: string;
  quote?: string;
  actionText?: string;
  tag: string;
}

export interface LeadSubmission {
  fullName: string;
  phone: string;
  email: string;
  interestRole: string;
  preferredBatch: string;
  source: string;
}
