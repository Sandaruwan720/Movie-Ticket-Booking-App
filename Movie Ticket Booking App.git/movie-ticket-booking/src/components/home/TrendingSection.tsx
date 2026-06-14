/**
 * ==================================================
 * TrendingSection Component — Section 04
 * --------------------------------------------------
 * Netflix-style horizontal trending movies rail with:
 * - Rank badges (#1, #2...)
 * - "Most Booked" overlays
 * - Compact card format
 * - Smooth infinite-feel scroll
 * ==================================================
 */

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Flame, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader';
import { TRENDING_MOVIES } from '../../data/movies';

/**
 * Trending section — horizontal Netflix-style scroll of top-booked movies.
 */
const TrendingSection: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    scrollRef.current?.scrollBy({ left: dir === 'left' ? -260 : 260, behavior: 'smooth' });
  };

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #030712, #0a0518, #030712)' }} />
      <motion.div
        animate={{ x: ['-50%', '0%'] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: 'repeating-linear-gradient(90deg, #7C3AED 0, #7C3AED 1px, transparent 0, transparent 80px)',
          width: '200%',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="This Week"
          title="Trending Now 🔥"
          subtitle="The most booked movies across all CineBook cinemas this week."
          onSeeAll={() => console.log('see all')}
        />

        {/* Trend leader highlight */}
        {TRENDING_MOVIES[0] && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-8 rounded-2xl p-5 flex items-center gap-5 overflow-hidden relative"
            style={{
              background: `linear-gradient(135deg, ${TRENDING_MOVIES[0].accentColor}15, rgba(255,255,255,0.02))`,
              border: `1px solid ${TRENDING_MOVIES[0].accentColor}25`,
            }}
          >
            {/* Rank */}
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #FF4D00, #FF6A00)' }}
            >
              <span className="text-white font-black text-2xl">#1</span>
            </div>

            {/* Poster mini */}
            <div
              className="w-12 h-16 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden"
              style={{ background: TRENDING_MOVIES[0].posterGradient }}
            >
              <span className="text-2xl">{TRENDING_MOVIES[0].posterEmoji}</span>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <Flame size={14} className="text-orange-400" />
                <span className="text-orange-400 text-xs font-bold uppercase tracking-wider">
                  Most Booked This Week
                </span>
              </div>
              <h3 className="text-white font-black text-lg leading-tight truncate">
                {TRENDING_MOVIES[0].title}
              </h3>
              <div className="flex items-center gap-3 mt-1">
                <div className="flex items-center gap-1">
                  <Star size={12} className="text-amber-400 fill-amber-400" />
                  <span className="text-amber-400 text-xs font-bold">{TRENDING_MOVIES[0].rating}</span>
                </div>
                <span className="text-slate-500 text-xs">
                  {(TRENDING_MOVIES[0].bookingsCount / 1000).toFixed(1)}K bookings
                </span>
              </div>
            </div>

            {/* Book button */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="hidden sm:flex items-center gap-2 px-5 py-3 rounded-xl text-white font-bold text-sm flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #FF4D00, #FF6A00)' }}
            >
              Book Now
            </motion.button>
          </motion.div>
        )}

        {/* Scrollable trending row */}
        <div className="relative group">
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ background: 'rgba(15,23,42,0.95)', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            <ChevronLeft size={18} className="text-white" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ background: 'rgba(15,23,42,0.95)', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            <ChevronRight size={18} className="text-white" />
          </button>

          <div ref={scrollRef} className="flex gap-4 overflow-x-auto pb-4" style={{ scrollbarWidth: 'none' }}>
            {TRENDING_MOVIES.map((movie, i) => (
              <motion.div
                key={movie.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="flex-shrink-0 relative group/card cursor-pointer"
              >
                {/* Rank number — large background text */}
                <span
                  className="absolute -left-2 -bottom-3 text-[80px] font-black leading-none select-none pointer-events-none z-10"
                  style={{
                    color: 'transparent',
                    WebkitTextStroke: `2px ${movie.accentColor}40`,
                  }}
                >
                  {movie.trendingRank}
                </span>

                <motion.div
                  whileHover={{ y: -6, scale: 1.03 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="relative w-40 rounded-2xl overflow-hidden"
                  style={{
                    boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
                    border: '1px solid rgba(255,255,255,0.06)',
                  }}
                >
                  {/* Poster */}
                  <div className="h-56 relative" style={{ background: movie.posterGradient }}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-5xl select-none">{movie.posterEmoji}</span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

                    {/* Trending badge */}
                    <div className="absolute top-2 left-2 flex items-center gap-1 px-2 py-1 rounded-full"
                      style={{ background: 'rgba(255,77,0,0.25)', border: '1px solid rgba(255,77,0,0.4)' }}>
                      <TrendingUp size={10} className="text-orange-400" />
                      <span className="text-orange-400 text-[10px] font-bold">#{movie.trendingRank}</span>
                    </div>

                    {/* Rating */}
                    <div className="absolute top-2 right-2 flex items-center gap-0.5 px-2 py-1 rounded-full"
                      style={{ background: 'rgba(0,0,0,0.6)' }}>
                      <Star size={9} className="text-amber-400 fill-amber-400" />
                      <span className="text-amber-400 text-[10px] font-bold">{movie.rating}</span>
                    </div>

                    {/* Hover: Book Now */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      className="absolute inset-0 flex items-center justify-center"
                      style={{ background: 'rgba(3,7,18,0.7)' }}
                    >
                      <button
                        className="text-white text-xs font-bold px-4 py-2 rounded-xl"
                        style={{ background: 'linear-gradient(135deg, #FF4D00, #FF6A00)' }}
                      >
                        Book Now
                      </button>
                    </motion.div>
                  </div>

                  {/* Info */}
                  <div className="p-3 space-y-1" style={{ background: 'rgba(10,15,30,0.98)' }}>
                    <p className="text-white font-bold text-sm leading-tight line-clamp-1">{movie.title}</p>
                    <p className="text-slate-500 text-[11px]">
                      {(movie.bookingsCount / 1000).toFixed(1)}K booked
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrendingSection;
