/**
 * ==================================================
 * TopCinemasSection Component — Section 07
 * --------------------------------------------------
 * Showcases partner cinemas with:
 * - Gradient cinema cards
 * - Distance badge, rating, facilities tags
 * - Available movies count
 * - Seat availability indicator bar
 * - "Get Directions" CTA
 * ==================================================
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Star, MapPin, Film, Navigation, CheckCircle } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader';
import { TOP_CINEMAS } from '../../data/cinemas';

/**
 * Top Cinemas section displaying partner venue cards.
 */
const TopCinemasSection: React.FC = () => {
  return (
    <section id="cinemas" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #030712, #0a0c18, #030712)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Our Partners"
          title="Top Cinemas"
          subtitle="Premium cinema partners across Sri Lanka — each delivering a world-class experience."
          onSeeAll={() => console.log('see all cinemas')}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {TOP_CINEMAS.map((cinema, i) => (
            <motion.div
              key={cinema.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className="rounded-2xl overflow-hidden group cursor-pointer"
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.07)',
                boxShadow: '0 4px 24px rgba(0,0,0,0.25)',
              }}
            >
              {/* Cinema Image Placeholder */}
              <div
                className="h-40 relative overflow-hidden"
                style={{ background: cinema.backgroundGradient }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-6xl select-none">{cinema.emoji}</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#030712]/90 to-transparent" />

                {/* Distance badge */}
                <div
                  className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold"
                  style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(12px)', color: '#94a3b8' }}
                >
                  <MapPin size={10} className="text-orange-400" />
                  {cinema.distance}
                </div>

                {/* Seat availability */}
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-slate-400 text-[10px]">Seats available</span>
                    <span className={`text-[10px] font-bold ${
                      cinema.seatsAvailablePercent < 30 ? 'text-red-400' :
                      cinema.seatsAvailablePercent < 60 ? 'text-amber-400' : 'text-emerald-400'
                    }`}>
                      {cinema.seatsAvailablePercent}%
                    </span>
                  </div>
                  <div className="w-full h-1 rounded-full bg-white/10 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${cinema.seatsAvailablePercent}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.3 + i * 0.08 }}
                      className="h-full rounded-full"
                      style={{
                        background: cinema.seatsAvailablePercent < 30
                          ? '#EF4444'
                          : cinema.seatsAvailablePercent < 60
                          ? '#F59E0B'
                          : '#10B981',
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="p-5 space-y-3">
                {/* Name + Rating */}
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-white font-black text-base leading-tight flex-1">
                    {cinema.name}
                  </h3>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <Star size={12} className="text-amber-400 fill-amber-400" />
                    <span className="text-amber-400 font-bold text-sm">{cinema.rating}</span>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-1.5 text-slate-500 text-xs">
                  <MapPin size={12} className="flex-shrink-0 mt-0.5" />
                  {cinema.location}
                </div>

                {/* Stats row */}
                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <Film size={11} />
                    {cinema.availableMovies} movies
                  </span>
                  <span className="w-px h-3 bg-slate-800" />
                  <span>{cinema.totalScreens} screens</span>
                  <span className="w-px h-3 bg-slate-800" />
                  <span>{cinema.reviewCount.toLocaleString()} reviews</span>
                </div>

                {/* Facilities */}
                <div className="flex flex-wrap gap-1.5">
                  {cinema.facilities.slice(0, 4).map((f) => (
                    <span
                      key={f}
                      className="flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full"
                      style={{
                        background: `${cinema.accentColor}12`,
                        border: `1px solid ${cinema.accentColor}25`,
                        color: cinema.accentColor,
                      }}
                    >
                      <CheckCircle size={8} />
                      {f}
                    </span>
                  ))}
                  {cinema.facilities.length > 4 && (
                    <span className="text-[10px] text-slate-600 px-2 py-0.5 rounded-full bg-white/5">
                      +{cinema.facilities.length - 4} more
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-1">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 py-2.5 rounded-xl text-white font-bold text-sm transition-all"
                    style={{ background: 'linear-gradient(135deg, #FF4D00, #FF6A00)' }}
                  >
                    Book Now
                  </motion.button>
                  <motion.a
                    href={cinema.mapUrl ?? '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-slate-300 font-medium text-sm border border-white/10 hover:border-white/20 transition-all"
                    style={{ background: 'rgba(255,255,255,0.04)' }}
                    aria-label={`Get directions to ${cinema.name}`}
                  >
                    <Navigation size={13} />
                    Directions
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopCinemasSection;
