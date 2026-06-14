/**
 * ==================================================
 * MovieCard Component
 * --------------------------------------------------
 * Premium movie poster card with:
 * - Gradient poster placeholder with emoji
 * - Genre badges, rating, runtime, price
 * - Hover: zoom + glow + quick action overlay
 * - "Book Now" and "Details" CTAs
 * - Framer Motion scale + opacity animations
 * - Variant: 'default' | 'compact' | 'hero'
 * ==================================================
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Star, Clock, Film, Zap, Info } from 'lucide-react';
import type { Movie } from '../../types/movie';

// ─────────────────────────────────────────────────
// Type Definitions
// ─────────────────────────────────────────────────

interface MovieCardProps {
  movie: Movie;
  variant?: 'default' | 'compact' | 'coming-soon';
  onBook?: (movie: Movie) => void;
  onDetails?: (movie: Movie) => void;
}

// ─────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────

/** Formats minutes into "Xh Ym" display */
const formatDuration = (minutes: number): string => {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}h ${m}m`;
};

/** Returns badge color class for movie badges */
const getBadgeStyle = (badge?: Movie['badge']): string => {
  const styles: Record<NonNullable<Movie['badge']>, string> = {
    Hot: 'bg-red-500/20 text-red-400 border-red-500/30',
    New: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    'Sold Out': 'bg-slate-500/20 text-slate-400 border-slate-500/30',
    Premiering: 'bg-violet-500/20 text-violet-400 border-violet-500/30',
    Limited: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    Blockbuster: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  };
  return badge ? styles[badge] : '';
};

// ─────────────────────────────────────────────────
// MovieCard Component
// ─────────────────────────────────────────────────

/**
 * Cinematic movie card with hover zoom, glow, and quick actions.
 *
 * @param movie - Movie data object
 * @param variant - 'default' | 'compact' | 'coming-soon'
 * @param onBook - Callback when "Book Now" is clicked
 * @param onDetails - Callback when "Details" is clicked
 */
const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  variant = 'default',
  onBook,
  onDetails,
}) => {
  const isCompact = variant === 'compact';
  const isComingSoon = variant === 'coming-soon';

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`group relative flex-shrink-0 rounded-2xl overflow-hidden cursor-pointer ${
        isCompact ? 'w-40' : 'w-52'
      }`}
      style={{
        boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
      }}
    >
      {/* ── Poster Area ── */}
      <div
        className={`relative overflow-hidden ${isCompact ? 'h-56' : 'h-72'}`}
        style={{ background: movie.posterGradient }}
      >
        {/* Emoji poster center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`${isCompact ? 'text-5xl' : 'text-7xl'} select-none drop-shadow-2xl`}>
            {movie.posterEmoji}
          </span>
        </div>

        {/* Gradient overlay at bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/20 to-transparent" />

        {/* Badge */}
        {movie.badge && (
          <div className="absolute top-3 left-3">
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getBadgeStyle(movie.badge)}`}>
              {movie.badge}
            </span>
          </div>
        )}

        {/* Rating pill */}
        {movie.rating > 0 && (
          <div
            className="absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded-full backdrop-blur-md"
            style={{ background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            <Star size={10} className="text-amber-400 fill-amber-400" />
            <span className="text-amber-400 text-[10px] font-bold">{movie.rating}</span>
          </div>
        )}

        {/* Hover overlay with quick actions */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-3"
          style={{ background: 'rgba(3,7,18,0.75)', backdropFilter: 'blur(4px)' }}
        >
          {!isComingSoon ? (
            <>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => onBook?.(movie)}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-white text-xs font-bold transition-all"
                style={{
                  background: 'linear-gradient(135deg, #FF4D00, #FF6A00)',
                  boxShadow: '0 0 20px rgba(255,77,0,0.4)',
                }}
              >
                <Zap size={12} />
                Book Now
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => onDetails?.(movie)}
                className="w-full flex items-center justify-center gap-2 py-2 rounded-xl text-white/80 text-xs font-medium border border-white/20 hover:border-white/40 transition-colors"
                style={{ background: 'rgba(255,255,255,0.08)' }}
              >
                <Info size={12} />
                Details
              </motion.button>
            </>
          ) : (
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-white text-xs font-bold border border-white/20 transition-all hover:bg-white/10"
            >
              🔔 Notify Me
            </motion.button>
          )}
        </motion.div>

        {/* Glow effect on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            boxShadow: `inset 0 0 40px ${movie.accentColor}30`,
          }}
        />
      </div>

      {/* ── Info Area ── */}
      <div className="p-3 space-y-1.5" style={{ background: 'rgba(15,23,42,0.95)' }}>
        {/* Title */}
        <h3 className="text-white font-bold text-sm leading-tight line-clamp-1">
          {movie.title}
        </h3>

        {/* Genre */}
        <p className="text-slate-400 text-[11px]">{movie.genres.slice(0, 2).join(' · ')}</p>

        {/* Meta row */}
        {!isCompact && (
          <div className="flex items-center gap-2 text-[11px] text-slate-500">
            <span className="flex items-center gap-1">
              <Clock size={10} />
              {formatDuration(movie.duration)}
            </span>
            <span className="w-px h-3 bg-slate-700" />
            <span className="flex items-center gap-1">
              <Film size={10} />
              {movie.certificate}
            </span>
          </div>
        )}

        {/* Price */}
        {!isComingSoon && (
          <div className="flex items-center justify-between pt-1">
            <span className="text-[11px] text-slate-500">From</span>
            <span className="text-orange-400 font-bold text-sm">
              LKR {movie.price.standard.toLocaleString()}
            </span>
          </div>
        )}

        {/* Coming Soon — Release date */}
        {isComingSoon && (
          <div
            className="text-center py-1 rounded-lg text-[11px] font-semibold"
            style={{
              background: `${movie.accentColor}15`,
              color: movie.accentColor,
              border: `1px solid ${movie.accentColor}25`,
            }}
          >
            {new Date(movie.releaseDate).toLocaleDateString('en-LK', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default MovieCard;
