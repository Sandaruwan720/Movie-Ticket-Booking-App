/**
 * ==================================================
 * Movie Platform TypeScript Interfaces
 * --------------------------------------------------
 * Core type definitions for the CineBook platform.
 * Used across all data, components, and pages.
 * ==================================================
 */

// ─── Movie ────────────────────────────────────────

export type Genre =
  | 'Action'
  | 'Adventure'
  | 'Animation'
  | 'Comedy'
  | 'Drama'
  | 'Horror'
  | 'Romance'
  | 'Sci-Fi'
  | 'Thriller'
  | 'Fantasy'
  | 'Crime'
  | 'Mystery';

export type Language = 'English' | 'Sinhala' | 'Tamil' | 'Hindi';

export type Certificate = 'U' | 'PG' | 'PG-13' | '15' | '18' | 'NR';

export interface Movie {
  id: string;
  title: string;
  tagline: string;
  description: string;
  genres: Genre[];
  language: Language;
  duration: number;           // minutes
  rating: number;             // 0–10 IMDb-style
  certificate: Certificate;
  releaseDate: string;        // ISO date string
  director: string;
  cast: string[];
  price: {
    standard: number;
    premium: number;
    imax: number;
  };
  posterGradient: string;     // CSS gradient for placeholder poster
  posterEmoji: string;        // emoji for poster visual
  accentColor: string;        // hex color for card accent
  trailerUrl?: string;
  isNowShowing: boolean;
  isComingSoon: boolean;
  isTrending: boolean;
  trendingRank?: number;
  bookingsCount: number;
  availableCinemas: number;
  badge?: 'Hot' | 'New' | 'Sold Out' | 'Premiering' | 'Limited' | 'Blockbuster';
}

// ─── Cinema ───────────────────────────────────────

export type CinemaFacility =
  | 'IMAX'
  | 'Dolby Atmos'
  | 'Luxury Recliners'
  | 'VIP Lounge'
  | 'Food Delivery'
  | 'Parking'
  | '4DX'
  | 'ScreenX'
  | 'Dolby Vision';

export interface Cinema {
  id: string;
  name: string;
  location: string;
  city: string;
  distance: string;           // e.g. "2.3 km"
  rating: number;
  reviewCount: number;
  facilities: CinemaFacility[];
  availableMovies: number;
  totalScreens: number;
  seatsAvailablePercent: number; // 0–100
  backgroundGradient: string;
  emoji: string;
  accentColor: string;
  openTime: string;
  closeTime: string;
  mapUrl?: string;
}

// ─── City ─────────────────────────────────────────

export interface City {
  id: string;
  name: string;
  emoji: string;
  cinemasCount: number;
  isPopular: boolean;
}

// ─── Offer ────────────────────────────────────────

export type OfferType = 'Student' | 'Family' | 'Weekend' | 'Membership' | 'Early Bird' | 'Group';

export interface Offer {
  id: string;
  type: OfferType;
  title: string;
  description: string;
  discount: number;           // percentage
  code: string;
  validUntil: string;         // ISO date
  gradient: string;
  accentColor: string;
  emoji: string;
  minTickets?: number;
}

// ─── Review ───────────────────────────────────────

export interface Review {
  id: string;
  userName: string;
  userEmoji: string;
  rating: number;             // 1–5
  text: string;
  movieTitle: string;
  movieEmoji: string;
  date: string;
  helpfulCount: number;
  verified: boolean;
}

// ─── FAQ ──────────────────────────────────────────

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'Booking' | 'Payment' | 'Cancellation' | 'Account' | 'Technical';
}

// ─── Seat ─────────────────────────────────────────

export type SeatStatus = 'available' | 'reserved' | 'vip' | 'selected';

export interface Seat {
  id: string;
  row: string;
  number: number;
  status: SeatStatus;
  price: number;
}

// ─── Cinematic Experience Feature ─────────────────

export interface ExperienceFeature {
  id: string;
  title: string;
  description: string;
  emoji: string;
  gradient: string;
  accentColor: string;
  tags: string[];
}

// ─── Platform Feature ─────────────────────────────

export interface PlatformFeature {
  id: string;
  title: string;
  description: string;
  emoji: string;
  color: string;
  stat: string;
  statLabel: string;
}
