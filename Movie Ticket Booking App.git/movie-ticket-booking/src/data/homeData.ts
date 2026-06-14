/**
 * ==================================================
 * Home Page Dataset — CineBook
 * --------------------------------------------------
 * Mock data for: Cities, Offers, Reviews, FAQs,
 * Cinema Experience Features, Platform Features,
 * and Live Statistics.
 * ==================================================
 */

import type {
  City,
  Offer,
  Review,
  FAQItem,
  ExperienceFeature,
  PlatformFeature,
  Seat,
} from '../types/movie';

// ─── Cities ───────────────────────────────────────

export const CITIES: City[] = [
  { id: 'city-01', name: 'Colombo', emoji: '🏙️', cinemasCount: 14, isPopular: true },
  { id: 'city-02', name: 'Kandy', emoji: '🏔️', cinemasCount: 7, isPopular: true },
  { id: 'city-03', name: 'Galle', emoji: '🏰', cinemasCount: 5, isPopular: true },
  { id: 'city-04', name: 'Jaffna', emoji: '🌴', cinemasCount: 4, isPopular: true },
  { id: 'city-05', name: 'Negombo', emoji: '🌅', cinemasCount: 3, isPopular: true },
  { id: 'city-06', name: 'Matara', emoji: '🌊', cinemasCount: 2, isPopular: false },
  { id: 'city-07', name: 'Anuradhapura', emoji: '🛕', cinemasCount: 2, isPopular: false },
  { id: 'city-08', name: 'Trincomalee', emoji: '⛵', cinemasCount: 2, isPopular: false },
];

// ─── Special Offers ───────────────────────────────

export const SPECIAL_OFFERS: Offer[] = [
  {
    id: 'offer-01',
    type: 'Student',
    title: 'Student Fiesta',
    description: 'Flash your student ID and get massive savings every Tuesday.',
    discount: 40,
    code: 'STUDENT40',
    validUntil: '2026-12-31',
    gradient: 'linear-gradient(135deg, #667eea, #764ba2)',
    accentColor: '#7C3AED',
    emoji: '🎓',
    minTickets: 1,
  },
  {
    id: 'offer-02',
    type: 'Family',
    title: 'Family Blockbuster',
    description: 'Bring the whole family! 4+ tickets unlock special family pricing.',
    discount: 30,
    code: 'FAMILY30',
    validUntil: '2026-09-30',
    gradient: 'linear-gradient(135deg, #f12711, #f5af19)',
    accentColor: '#FF6A00',
    emoji: '👨‍👩‍👧‍👦',
    minTickets: 4,
  },
  {
    id: 'offer-03',
    type: 'Weekend',
    title: 'Weekend Rush',
    description: 'Saturday & Sunday evening shows at a cinematic discount.',
    discount: 25,
    code: 'WEEKEND25',
    validUntil: '2026-12-31',
    gradient: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)',
    accentColor: '#06B6D4',
    emoji: '🎉',
    minTickets: 2,
  },
  {
    id: 'offer-04',
    type: 'Membership',
    title: 'CineBook Prime',
    description: 'Unlimited movies, priority seats, and exclusive member perks all year.',
    discount: 50,
    code: 'PRIME50',
    validUntil: '2027-01-01',
    gradient: 'linear-gradient(135deg, #FFD700, #FF8C00)',
    accentColor: '#F59E0B',
    emoji: '👑',
  },
];

// ─── User Reviews ─────────────────────────────────

export const USER_REVIEWS: Review[] = [
  {
    id: 'rev-01',
    userName: 'Sahan Perera',
    userEmoji: '👨',
    rating: 5,
    text: 'The IMAX experience at CineBook Colombo is absolutely mind-blowing. Cosmic Horizon was a visual masterpiece on that screen. Booking took literally 30 seconds!',
    movieTitle: 'Cosmic Horizon',
    movieEmoji: '🚀',
    date: '2026-05-28',
    helpfulCount: 142,
    verified: true,
  },
  {
    id: 'rev-02',
    userName: 'Nimalka Silva',
    userEmoji: '👩',
    rating: 5,
    text: 'Booked 6 tickets for family night seamlessly. The app remembered our usual seats and offered the family discount automatically. This is how booking should work!',
    movieTitle: 'The Last Kingdom',
    movieEmoji: '⚔️',
    date: '2026-05-25',
    helpfulCount: 98,
    verified: true,
  },
  {
    id: 'rev-03',
    userName: 'Aravinda Kumar',
    userEmoji: '🧑',
    rating: 4,
    text: 'Neon Requiem was incredible in Dolby Atmos. The sound design alone is worth the premium ticket price. CineBook\'s seat selection interface is the best I\'ve used.',
    movieTitle: 'Neon Requiem',
    movieEmoji: '🌆',
    date: '2026-05-22',
    helpfulCount: 76,
    verified: true,
  },
  {
    id: 'rev-04',
    userName: 'Thisari Fernando',
    userEmoji: '👩',
    rating: 5,
    text: 'The VIP lounge experience is worth every rupee. Recliner seats, table service, and a private screen — I will never go back to regular cinema seats!',
    movieTitle: 'Ironheart',
    movieEmoji: '🦾',
    date: '2026-05-20',
    helpfulCount: 201,
    verified: true,
  },
  {
    id: 'rev-05',
    userName: 'Kasun Bandara',
    userEmoji: '👨',
    rating: 5,
    text: 'Used the student discount for Laughtrack — saved 40% on my ticket. The comedy timing in that film had the whole theater in tears. Highly recommend!',
    movieTitle: 'Laughtrack',
    movieEmoji: '😂',
    date: '2026-05-18',
    helpfulCount: 54,
    verified: true,
  },
  {
    id: 'rev-06',
    userName: 'Yasodha Jayawardena',
    userEmoji: '👩',
    rating: 4,
    text: 'Abyss Protocol in 4DX was an experience I will never forget. The seat motion during the underwater scenes was terrifyingly realistic. Great cinema, great app!',
    movieTitle: 'Abyss Protocol',
    movieEmoji: '🌊',
    date: '2026-05-15',
    helpfulCount: 118,
    verified: true,
  },
];

// ─── FAQ Items ─────────────────────────────────────

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'faq-01',
    question: 'How do I book a movie ticket on CineBook?',
    answer:
      'Select your movie, choose a cinema and showtime, pick your seats on our interactive seat map, and complete payment in under 60 seconds. Your digital ticket is instantly sent to your email and available in your account.',
    category: 'Booking',
  },
  {
    id: 'faq-02',
    question: 'Can I cancel or exchange my tickets?',
    answer:
      'Yes! You can cancel tickets up to 2 hours before the showtime for a full refund. For CineBook Prime members, cancellations are accepted up to 30 minutes before. Exchanges can be made up to 4 hours before the show.',
    category: 'Cancellation',
  },
  {
    id: 'faq-03',
    question: 'What payment methods do you accept?',
    answer:
      'We accept all major credit/debit cards (Visa, Mastercard, Amex), mobile banking (HNB, BOC, Commercial Bank), digital wallets (FriMi, iPay), and CineBook gift cards. All transactions are SSL encrypted for your security.',
    category: 'Payment',
  },
  {
    id: 'faq-04',
    question: 'What is CineBook Prime membership?',
    answer:
      'CineBook Prime is our premium membership offering unlimited movies (up to 4 per month), 50% off on all bookings, priority seat selection, access to VIP lounges, free food upgrades, and exclusive early access to premieres. Starting from LKR 1,499/month.',
    category: 'Account',
  },
  {
    id: 'faq-05',
    question: 'How do I get my student discount?',
    answer:
      'Register with your university email or upload a photo of your valid student ID during checkout. Once verified (usually instant), the 40% student discount is automatically applied every Tuesday. Verification is valid for one academic year.',
    category: 'Booking',
  },
  {
    id: 'faq-06',
    question: 'Are digital tickets accepted at all cinemas?',
    answer:
      'Yes, all CineBook partner cinemas support digital QR-code tickets displayed on your phone. You can also request a printed ticket at any cinema counter. No paper ticket is needed.',
    category: 'Technical',
  },
  {
    id: 'faq-07',
    question: 'How does real-time seat availability work?',
    answer:
      'Our seat map updates every 5 seconds in real-time. When you select a seat, it is held for 8 minutes while you complete your booking. If payment is not completed within that time, the seat is released back to the pool.',
    category: 'Technical',
  },
  {
    id: 'faq-08',
    question: 'Can I book tickets for someone else?',
    answer:
      'Absolutely. You can book tickets for any number of guests. Simply enter their name during checkout. The QR ticket can be shared via WhatsApp, email, or any messaging app directly from your CineBook account.',
    category: 'Booking',
  },
];

// ─── Cinema Experience Features ───────────────────

export const EXPERIENCE_FEATURES: ExperienceFeature[] = [
  {
    id: 'exp-01',
    title: 'IMAX Experience',
    description: 'Crystal-clear 1.43:1 aspect ratio with laser projection and 12-channel immersive sound.',
    emoji: '📽️',
    gradient: 'linear-gradient(135deg, rgba(124,58,237,0.15), rgba(3,7,18,0.9))',
    accentColor: '#7C3AED',
    tags: ['Laser Projection', '12-Ch Audio', '4K Resolution'],
  },
  {
    id: 'exp-02',
    title: 'Dolby Atmos',
    description: 'Object-based 3D audio that places sound anywhere in the room — above, around, and within you.',
    emoji: '🔊',
    gradient: 'linear-gradient(135deg, rgba(255,106,0,0.15), rgba(3,7,18,0.9))',
    accentColor: '#FF6A00',
    tags: ['64 Speakers', '3D Audio', 'Immersive Sound'],
  },
  {
    id: 'exp-03',
    title: 'Luxury Recliners',
    description: 'Electric recliner seats with heated cushions, personal armrests, and in-seat service buttons.',
    emoji: '🛋️',
    gradient: 'linear-gradient(135deg, rgba(6,182,212,0.15), rgba(3,7,18,0.9))',
    accentColor: '#06B6D4',
    tags: ['Electric Recliner', 'Heated Seats', 'In-Seat Service'],
  },
  {
    id: 'exp-04',
    title: 'VIP Lounge',
    description: 'Private pre-show lounge with curated cocktails, gourmet snacks, and concierge service.',
    emoji: '🥂',
    gradient: 'linear-gradient(135deg, rgba(245,158,11,0.15), rgba(3,7,18,0.9))',
    accentColor: '#F59E0B',
    tags: ['Private Lounge', 'Cocktail Bar', 'Concierge'],
  },
  {
    id: 'exp-05',
    title: 'Food Delivery',
    description: 'Order from our full restaurant menu directly to your seat — hot food delivered without interruption.',
    emoji: '🍿',
    gradient: 'linear-gradient(135deg, rgba(16,185,129,0.15), rgba(3,7,18,0.9))',
    accentColor: '#10B981',
    tags: ['In-Seat Menu', 'Hot Food', 'Zero Interruption'],
  },
  {
    id: 'exp-06',
    title: 'Smart Parking',
    description: 'Reserve a parking bay when you book your ticket. Navigate straight to your spot with in-app guidance.',
    emoji: '🅿️',
    gradient: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(3,7,18,0.9))',
    accentColor: '#6366F1',
    tags: ['Pre-Book Bay', 'In-App Nav', 'CCTV Secured'],
  },
];

// ─── Platform Features (Why Choose Us) ────────────

export const PLATFORM_FEATURES: PlatformFeature[] = [
  {
    id: 'feat-01',
    title: 'Instant Booking',
    description: 'Reserve your seat in under 60 seconds. No queues, no waiting, no hassle.',
    emoji: '⚡',
    color: '#FF6A00',
    stat: '< 60s',
    statLabel: 'Average booking time',
  },
  {
    id: 'feat-02',
    title: 'Secure Payments',
    description: '256-bit SSL encryption, PCI DSS compliant, with 3D Secure authentication for every transaction.',
    emoji: '🔐',
    color: '#10B981',
    stat: '100%',
    statLabel: 'Secure transactions',
  },
  {
    id: 'feat-03',
    title: 'Real-Time Seats',
    description: 'Live seat map that updates every 5 seconds. Never book a seat that\'s already taken.',
    emoji: '🗺️',
    color: '#06B6D4',
    stat: '5s',
    statLabel: 'Map refresh rate',
  },
  {
    id: 'feat-04',
    title: 'Digital Tickets',
    description: 'QR-code tickets on your phone. No printing, no losing, no drama. Just scan and enjoy.',
    emoji: '📱',
    color: '#7C3AED',
    stat: '0',
    statLabel: 'Tickets lost ever',
  },
];

// ─── Sample Seat Map ───────────────────────────────

/**
 * Generates a realistic seat map for the interactive seat preview.
 * Rows A–E, Seats 1–10 with mixed statuses.
 */
export const SAMPLE_SEATS: Seat[] = (() => {
  const rows = ['A', 'B', 'C', 'D', 'E'];
  const seatsPerRow = 10;
  const seats: Seat[] = [];

  // Pre-defined statuses for realistic demo
  const reservedSeats = new Set([
    'A-3', 'A-4', 'A-8', 'B-1', 'B-5', 'B-6', 'B-7', 'C-2', 'C-9', 'D-4', 'D-5', 'E-3', 'E-7', 'E-8',
  ]);
  const vipSeats = new Set(['C-4', 'C-5', 'C-6', 'C-7', 'D-4', 'D-5', 'D-6', 'D-7']);

  rows.forEach((row) => {
    for (let num = 1; num <= seatsPerRow; num++) {
      const key = `${row}-${num}`;
      let status: Seat['status'] = 'available';
      if (reservedSeats.has(key)) status = 'reserved';
      if (vipSeats.has(key)) status = 'vip';

      seats.push({
        id: key,
        row,
        number: num,
        status,
        price: vipSeats.has(key) ? 1200 : 800,
      });
    }
  });

  return seats;
})();

// ─── Live Platform Statistics ──────────────────────

export const LIVE_STATS = {
  totalBookings: '2.4M+',
  moviesAvailable: '500+',
  activeCities: '24',
  cinemasPartners: '180+',
  screeningsToday: '3,240',
  seatsFilledPercent: 68,
};
