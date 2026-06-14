/**
 * ==================================================
 * ComingSoonSection Component — Section 03
 * --------------------------------------------------
 * Builds anticipation for upcoming releases with:
 * - Large horizontal slider cards
 * - Live countdown timers for each release
 * - "Notify Me" toggle button with animation
 * - Release date badge
 * ==================================================
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, BellOff } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader';
import CountdownTimer from '../ui/CountdownTimer';
import { COMING_SOON } from '../../data/movies';
import type { Movie } from '../../types/movie';

/**
 * Individual Coming Soon card with countdown and notify toggle.
 */
const ComingSoonCard: React.FC<{ movie: Movie; index: number }> = ({ movie, index }) => {
  const [notified, setNotified] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className="flex-shrink-0 w-72 rounded-3xl overflow-hidden relative cursor-pointer group"
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
      }}
    >
      {/* Poster */}
      <div
        className="h-80 relative overflow-hidden"
        style={{ background: movie.posterGradient }}
      >
        {/* Emoji */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-8xl select-none drop-shadow-2xl">{movie.posterEmoji}</span>
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#060d1f] via-transparent to-transparent" />

        {/* Premiering badge */}
        <div className="absolute top-4 left-4">
          <span
            className="text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider"
            style={{
              background: `${movie.accentColor}20`,
              border: `1px solid ${movie.accentColor}40`,
              color: movie.accentColor,
            }}
          >
            Coming Soon
          </span>
        </div>

        {/* Glow on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ boxShadow: `inset 0 0 60px ${movie.accentColor}20` }}
        />
      </div>

      {/* Info */}
      <div className="p-5 space-y-4">
        {/* Title + Genres */}
        <div>
          <h3 className="text-white font-black text-lg leading-tight mb-1">{movie.title}</h3>
          <p className="text-slate-400 text-xs">{movie.genres.join(' · ')}</p>
        </div>

        {/* Countdown */}
        <div>
          <p className="text-slate-500 text-[11px] uppercase tracking-wider font-medium mb-2">
            Releasing In
          </p>
          <CountdownTimer targetDate={movie.releaseDate} />
        </div>

        {/* Release date + Notify */}
        <div className="flex items-center justify-between pt-1">
          <div>
            <p className="text-slate-500 text-[11px]">Release Date</p>
            <p className="text-white font-semibold text-sm">
              {new Date(movie.releaseDate).toLocaleDateString('en-LK', { day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          </div>

          <motion.button
            onClick={() => setNotified(!notified)}
            whileTap={{ scale: 0.9 }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300"
            style={
              notified
                ? { background: `${movie.accentColor}20`, border: `1px solid ${movie.accentColor}40`, color: movie.accentColor }
                : { background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }
            }
            aria-label={notified ? 'Remove notification' : 'Get notified'}
          >
            <AnimatePresence mode="wait">
              {notified ? (
                <motion.div key="on" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                  <BellOff size={14} />
                </motion.div>
              ) : (
                <motion.div key="off" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                  <Bell size={14} />
                </motion.div>
              )}
            </AnimatePresence>
            {notified ? 'Notified' : 'Notify Me'}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

/**
 * Coming Soon section — horizontal carousel of upcoming releases
 * with live countdown timers and notification toggles.
 */
const ComingSoonSection: React.FC = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #030712, #080e20, #030712)' }} />
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-30"
        style={{ background: 'linear-gradient(90deg, transparent, #7C3AED, transparent)' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Mark Your Calendar"
          title="Coming Soon"
          subtitle="Set reminders for highly anticipated films arriving at cinemas near you."
          onSeeAll={() => console.log('see all')}
        />

        {/* Horizontal scrollable row */}
        <div
          className="flex gap-6 overflow-x-auto pb-4"
          style={{ scrollbarWidth: 'none' }}
        >
          {COMING_SOON.map((movie, i) => (
            <ComingSoonCard key={movie.id} movie={movie} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ComingSoonSection;
