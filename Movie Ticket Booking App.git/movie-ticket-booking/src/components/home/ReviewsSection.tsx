/**
 * ==================================================
 * ReviewsSection Component — Section 12
 * --------------------------------------------------
 * Auto-scrolling review carousel with:
 * - User avatar (emoji), name, verified badge
 * - Star rating display
 * - Review text
 * - Movie watched badge
 * - Two rows scrolling in opposite directions
 * ==================================================
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Star, CheckCircle2, ThumbsUp } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader';
import { USER_REVIEWS } from '../../data/homeData';

/** Star rating display */
const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
  <div className="flex items-center gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        size={12}
        className={i < rating ? 'text-amber-400 fill-amber-400' : 'text-slate-700'}
      />
    ))}
  </div>
);

/** Individual review card */
const ReviewCard: React.FC<{ review: (typeof USER_REVIEWS)[0] }> = ({ review }) => (
  <motion.div
    whileHover={{ y: -4, scale: 1.01 }}
    className="flex-shrink-0 w-80 p-5 rounded-2xl cursor-default"
    style={{
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(255,255,255,0.07)',
      boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
    }}
  >
    {/* Top row */}
    <div className="flex items-start justify-between mb-3">
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-xl flex-shrink-0"
          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
        >
          {review.userEmoji}
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <p className="text-white font-bold text-sm">{review.userName}</p>
            {review.verified && (
              <CheckCircle2 size={12} className="text-emerald-400" />
            )}
          </div>
          <StarRating rating={review.rating} />
        </div>
      </div>
      <div className="flex items-center gap-1 text-slate-600 text-xs">
        <ThumbsUp size={11} />
        {review.helpfulCount}
      </div>
    </div>

    {/* Review text */}
    <p className="text-slate-400 text-sm leading-relaxed mb-3 line-clamp-3">
      "{review.text}"
    </p>

    {/* Movie badge */}
    <div
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full"
      style={{ background: 'rgba(255,77,0,0.1)', border: '1px solid rgba(255,77,0,0.2)' }}
    >
      <span className="text-xs">{review.movieEmoji}</span>
      <span className="text-orange-400 text-[11px] font-medium">{review.movieTitle}</span>
    </div>
  </motion.div>
);

/** Auto-scrolling carousel row */
const ScrollingRow: React.FC<{
  reviews: (typeof USER_REVIEWS);
  direction?: 'left' | 'right';
  speed?: number;
}> = ({ reviews, direction = 'left', speed = 40 }) => {
  const doubled = [...reviews, ...reviews]; // duplicate for seamless loop

  return (
    <div className="overflow-hidden">
      <motion.div
        animate={{ x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'] }}
        transition={{ duration: speed, repeat: Infinity, ease: 'linear' }}
        className="flex gap-4"
        style={{ width: 'max-content' }}
      >
        {doubled.map((review, i) => (
          <ReviewCard key={`${review.id}-${i}`} review={review} />
        ))}
      </motion.div>
    </div>
  );
};

/**
 * Reviews section — two rows of auto-scrolling review cards.
 */
const ReviewsSection: React.FC = () => {
  const row1 = USER_REVIEWS.slice(0, 3);
  const row2 = USER_REVIEWS.slice(3);

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #030712, #090d1c, #030712)' }} />

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
          <SectionHeader
            label="Real Experiences"
            title="Loved by Cinema Fans"
            subtitle="Over 120,000 verified reviews from moviegoers across Sri Lanka."
            centered
          />

          {/* Aggregate rating */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-4 mt-2"
          >
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={18} className="text-amber-400 fill-amber-400" />
              ))}
            </div>
            <span className="text-white font-black text-2xl">4.9</span>
            <span className="text-slate-500 text-sm">/ 5.0 from 120K+ reviews</span>
          </motion.div>
        </div>

        {/* Scrolling rows with edge fades */}
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(90deg, #030712, transparent)' }} />
          <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(-90deg, #030712, transparent)' }} />

          <div className="space-y-4">
            <ScrollingRow reviews={row1} direction="left" speed={35} />
            <ScrollingRow reviews={row2} direction="right" speed={45} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
