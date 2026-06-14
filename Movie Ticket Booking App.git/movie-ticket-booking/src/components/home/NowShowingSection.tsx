/**
 * ==================================================
 * NowShowingSection Component — Section 02
 * --------------------------------------------------
 * Primary ticket conversion section with:
 * - Genre filter chips (interactive)
 * - Responsive horizontal movie card carousel
 * - Drag-to-scroll with mouse/touch
 * - Staggered card entrance animations
 * ==================================================
 */

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader';
import MovieCard from '../ui/MovieCard';
import { NOW_SHOWING } from '../../data/movies';
import type { Genre, Movie } from '../../types/movie';

const ALL_GENRES: Genre[] = ['Action', 'Sci-Fi', 'Drama', 'Comedy', 'Thriller', 'Fantasy', 'Horror', 'Romance'];

/**
 * Now Showing section — filters movies by genre and displays
 * them in a horizontally scrollable carousel.
 */
const NowShowingSection: React.FC = () => {
  const [activeGenre, setActiveGenre] = useState<Genre | 'All'>('All');
  const scrollRef = useRef<HTMLDivElement>(null);

  const filtered = activeGenre === 'All'
    ? NOW_SHOWING
    : NOW_SHOWING.filter((m) => m.genres.includes(activeGenre));

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === 'left' ? -280 : 280, behavior: 'smooth' });
  };

  const handleBook = (movie: Movie) => {
    // TODO: Navigate to booking flow
    console.log('Book:', movie.title);
  };

  return (
    <section id="now-showing" className="py-20 relative">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#030712] via-[#060d1f] to-[#030712]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="On Screen Now"
          title="Now Showing"
          subtitle="Book tickets for movies playing at cinemas near you today."
          onSeeAll={() => console.log('See all')}
        />

        {/* Genre Filter Chips */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-2 flex-wrap mb-8"
        >
          {(['All', ...ALL_GENRES] as const).map((genre) => (
            <motion.button
              key={genre}
              onClick={() => setActiveGenre(genre as Genre | 'All')}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
                activeGenre === genre
                  ? 'text-white border-orange-500/50'
                  : 'text-slate-400 border-white/10 hover:border-white/20 hover:text-white'
              }`}
              style={
                activeGenre === genre
                  ? { background: 'rgba(255,77,0,0.15)', boxShadow: '0 0 12px rgba(255,77,0,0.15)' }
                  : { background: 'rgba(255,255,255,0.04)' }
              }
            >
              {genre}
            </motion.button>
          ))}
        </motion.div>

        {/* Carousel with Arrow Controls */}
        <div className="relative group">
          {/* Left Arrow */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            style={{ background: 'rgba(15,23,42,0.95)', border: '1px solid rgba(255,255,255,0.1)' }}
            aria-label="Scroll left"
          >
            <ChevronLeft size={18} className="text-white" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            style={{ background: 'rgba(15,23,42,0.95)', border: '1px solid rgba(255,255,255,0.1)' }}
            aria-label="Scroll right"
          >
            <ChevronRight size={18} className="text-white" />
          </button>

          {/* Scrollable Container */}
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {filtered.map((movie, i) => (
              <motion.div
                key={movie.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
              >
                <MovieCard movie={movie} variant="default" onBook={handleBook} />
              </motion.div>
            ))}

            {filtered.length === 0 && (
              <div className="flex-1 flex items-center justify-center py-20 text-slate-500">
                No movies found for this genre.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NowShowingSection;
