/**
 * ==================================================
 * FloatingMovieCards Component
 * --------------------------------------------------
 * Animated floating UI elements for the hero panel:
 * - Movie poster cards with ratings
 * - Booking success widget
 * - Cinema ticket visual
 * - "Now Trending" badge
 * - Glass stat widgets
 *
 * Uses Framer Motion infinite float animations for
 * depth and visual richness.
 * ==================================================
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Star, Ticket, CheckCircle2, TrendingUp, Users, Clock } from 'lucide-react';

// ─────────────────────────────────────────────────
// Float Animation Variants
// ─────────────────────────────────────────────────

/**
 * Creates a floating animation config with custom Y range and duration.
 *
 * @param yRange - Vertical movement range in pixels
 * @param duration - Animation duration in seconds
 * @param delay - Animation start delay
 */
const floatVariant = (yRange: number, duration: number, delay = 0) => ({
  animate: {
    y: [0, -yRange, 0],
    transition: {
      duration,
      repeat: Infinity,
      ease: 'easeInOut' as const,
      delay,
    },
  },
});

// ─────────────────────────────────────────────────
// Movie Card Data
// ─────────────────────────────────────────────────

/** Mock movie data for the floating card widgets */
const FEATURED_MOVIES = [
  {
    id: 1,
    title: 'Cosmic Horizon',
    genre: 'Sci-Fi · Action',
    rating: 9.2,
    gradient: 'from-orange-900/80 to-slate-900/90',
    accent: '#FF6A00',
    badge: '🔥 Trending #1',
  },
  {
    id: 2,
    title: 'Midnight Reverie',
    genre: 'Thriller · Drama',
    rating: 8.7,
    gradient: 'from-violet-900/80 to-slate-900/90',
    accent: '#7C3AED',
    badge: '⭐ Editor\'s Pick',
  },
];

// ─────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────

/** Individual movie poster card widget */
const MovieCard: React.FC<typeof FEATURED_MOVIES[0] & { className?: string; floatY?: number; floatDuration?: number; floatDelay?: number }> = ({
  title,
  genre,
  rating,
  gradient,
  accent,
  badge,
  className = '',
  floatY = 10,
  floatDuration = 6,
  floatDelay = 0,
}) => (
  <motion.div
    {...floatVariant(floatY, floatDuration, floatDelay)}
    className={`relative backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden shadow-2xl ${className}`}
    style={{
      background: `linear-gradient(135deg, rgba(15,23,42,0.95), rgba(3,7,18,0.98))`,
      boxShadow: `0 25px 50px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05), inset 0 1px 0 rgba(255,255,255,0.08)`,
    }}
  >
    {/* Color bar at top */}
    <div
      className="absolute top-0 left-0 right-0 h-0.5"
      style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }}
    />

    {/* Gradient bg layer */}
    <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-30`} />

    <div className="relative p-4">
      {/* Movie thumbnail placeholder */}
      <div
        className="w-full h-20 rounded-xl mb-3 flex items-center justify-center overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${accent}30, ${accent}10)` }}
      >
        <span className="text-3xl">🎬</span>
      </div>

      <div className="space-y-1.5">
        <span
          className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
          style={{ background: `${accent}20`, color: accent }}
        >
          {badge}
        </span>
        <h3 className="text-white font-bold text-sm leading-tight mt-1.5">{title}</h3>
        <p className="text-slate-400 text-xs">{genre}</p>
        <div className="flex items-center gap-1 pt-0.5">
          <Star size={11} className="text-amber-400 fill-amber-400" />
          <span className="text-amber-400 font-bold text-xs">{rating}</span>
          <span className="text-slate-500 text-xs">/10</span>
        </div>
      </div>
    </div>
  </motion.div>
);

/** Booking success glass widget */
const BookingSuccessWidget: React.FC = () => (
  <motion.div
    {...floatVariant(8, 7, 1.5)}
    className="backdrop-blur-xl rounded-2xl border border-emerald-500/20 p-4 shadow-xl"
    style={{
      background: 'linear-gradient(135deg, rgba(16,185,129,0.12), rgba(3,7,18,0.95))',
      boxShadow: '0 20px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(16,185,129,0.1)',
    }}
  >
    <div className="flex items-center gap-3">
      <div className="w-9 h-9 rounded-xl bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30 flex-shrink-0">
        <CheckCircle2 size={16} className="text-emerald-400" />
      </div>
      <div>
        <p className="text-emerald-400 font-semibold text-xs">Booking Confirmed!</p>
        <p className="text-white font-bold text-sm">Seat A-12, Screen 1</p>
        <p className="text-slate-400 text-xs">Tonight · 7:30 PM</p>
      </div>
    </div>
  </motion.div>
);

/** Cinema ticket visual widget */
const TicketWidget: React.FC = () => (
  <motion.div
    {...floatVariant(12, 9, 0.5)}
    className="backdrop-blur-xl rounded-2xl border border-orange-500/20 overflow-hidden shadow-xl"
    style={{
      background: 'linear-gradient(135deg, rgba(255,106,0,0.1), rgba(3,7,18,0.95))',
      boxShadow: '0 20px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,106,0,0.1)',
    }}
  >
    <div className="p-4">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-7 h-7 rounded-lg bg-orange-500/20 flex items-center justify-center border border-orange-500/30">
          <Ticket size={13} className="text-orange-400" />
        </div>
        <div>
          <p className="text-white font-bold text-xs">IMAX Premium</p>
          <p className="text-orange-400 text-[10px] font-medium">VIP Experience</p>
        </div>
      </div>

      {/* Dashed divider */}
      <div className="border-t border-dashed border-white/10 my-2 -mx-4" />

      <div className="flex justify-between items-center">
        <div>
          <p className="text-slate-400 text-[10px]">Seat</p>
          <p className="text-white font-bold text-sm">B-07</p>
        </div>
        <div className="text-center">
          <p className="text-slate-400 text-[10px]">Date</p>
          <p className="text-white font-bold text-sm">Jun 08</p>
        </div>
        <div className="text-right">
          <p className="text-slate-400 text-[10px]">Time</p>
          <p className="text-white font-bold text-sm">9:00 PM</p>
        </div>
      </div>
    </div>

    {/* Barcode strip */}
    <div className="h-1 bg-gradient-to-r from-orange-500 via-orange-400 to-orange-600" />
  </motion.div>
);

/** Live stats widget */
const LiveStatsWidget: React.FC = () => (
  <motion.div
    {...floatVariant(6, 8, 2)}
    className="backdrop-blur-xl rounded-2xl border border-cyan-500/20 p-3.5 shadow-xl"
    style={{
      background: 'linear-gradient(135deg, rgba(6,182,212,0.1), rgba(3,7,18,0.95))',
      boxShadow: '0 20px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(6,182,212,0.1)',
    }}
  >
    <div className="flex items-center gap-2 mb-2.5">
      <TrendingUp size={13} className="text-cyan-400" />
      <span className="text-cyan-400 text-[10px] font-semibold uppercase tracking-wide">Live Now</span>
      <span className="ml-auto w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
    </div>
    <div className="grid grid-cols-2 gap-2">
      <div className="text-center">
        <div className="flex items-center justify-center gap-1">
          <Users size={10} className="text-slate-400" />
          <p className="text-white font-bold text-sm">2,847</p>
        </div>
        <p className="text-slate-500 text-[10px]">online</p>
      </div>
      <div className="text-center">
        <div className="flex items-center justify-center gap-1">
          <Clock size={10} className="text-slate-400" />
          <p className="text-white font-bold text-sm">12</p>
        </div>
        <p className="text-slate-500 text-[10px]">shows today</p>
      </div>
    </div>
  </motion.div>
);

// ─────────────────────────────────────────────────
// FloatingMovieCards Composition
// ─────────────────────────────────────────────────

/**
 * Composes all floating widget components in a layered layout.
 * Positioned absolutely within the hero panel container.
 */
const FloatingMovieCards: React.FC = () => {
  return (
    <div className="relative w-full h-full min-h-[480px] select-none" aria-hidden="true">
      {/* Primary movie card — center left */}
      <div className="absolute top-0 left-0 w-44">
        <MovieCard
          {...FEATURED_MOVIES[0]}
          floatY={12}
          floatDuration={6}
          floatDelay={0}
        />
      </div>

      {/* Secondary movie card — right, offset */}
      <div className="absolute top-8 right-0 w-40">
        <MovieCard
          {...FEATURED_MOVIES[1]}
          floatY={10}
          floatDuration={7.5}
          floatDelay={1}
        />
      </div>

      {/* Booking success widget */}
      <div className="absolute top-52 left-4 w-52">
        <BookingSuccessWidget />
      </div>

      {/* Ticket widget */}
      <div className="absolute top-44 right-2 w-44">
        <TicketWidget />
      </div>

      {/* Live stats */}
      <div className="absolute bottom-10 left-8 w-40">
        <LiveStatsWidget />
      </div>

      {/* Decorative glow dots */}
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-28 left-20 w-2 h-2 rounded-full bg-orange-500"
      />
      <motion.div
        animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute top-36 right-20 w-1.5 h-1.5 rounded-full bg-violet-500"
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.9, 0.4] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        className="absolute bottom-24 right-10 w-2 h-2 rounded-full bg-cyan-500"
      />
    </div>
  );
};

export default FloatingMovieCards;
