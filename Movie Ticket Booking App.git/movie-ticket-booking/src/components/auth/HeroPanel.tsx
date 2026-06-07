/**
 * ==================================================
 * HeroPanel Component
 * --------------------------------------------------
 * Left-side cinematic marketing panel containing:
 * - Logo + Brand Name
 * - Premium Badge
 * - Hero Headline with gradient text
 * - Floating movie card widgets
 * - Feature Highlight cards (glassmorphism)
 * - Statistics section with animated counters
 * ==================================================
 */

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Crown, Radio, Gift, Film } from 'lucide-react';
import FloatingMovieCards from './FloatingMovieCards';

// ─────────────────────────────────────────────────
// Animation Variants
// ─────────────────────────────────────────────────

/** Stagger container for children */
const containerVariant = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

/** Fade + slide up for individual elements */
const itemVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

// ─────────────────────────────────────────────────
// Feature Cards Data
// ─────────────────────────────────────────────────

const FEATURES = [
  {
    icon: Zap,
    label: 'Instant Booking',
    desc: 'Reserve in seconds',
    color: '#FF6A00',
    bg: 'rgba(255,106,0,0.1)',
    border: 'rgba(255,106,0,0.2)',
  },
  {
    icon: Crown,
    label: 'Premium Seats',
    desc: 'VIP experience',
    color: '#7C3AED',
    bg: 'rgba(124,58,237,0.1)',
    border: 'rgba(124,58,237,0.2)',
  },
  {
    icon: Radio,
    label: 'Real-Time',
    desc: 'Live availability',
    color: '#06B6D4',
    bg: 'rgba(6,182,212,0.1)',
    border: 'rgba(6,182,212,0.2)',
  },
  {
    icon: Gift,
    label: 'Rewards',
    desc: 'Exclusive perks',
    color: '#10B981',
    bg: 'rgba(16,185,129,0.1)',
    border: 'rgba(16,185,129,0.2)',
  },
] as const;

// ─────────────────────────────────────────────────
// Stats Data
// ─────────────────────────────────────────────────

const STATS = [
  { value: 10, suffix: 'K+', label: 'Bookings' },
  { value: 500, suffix: '+', label: 'Movies' },
  { value: 2, suffix: 'M+', label: 'Users' },
] as const;

// ─────────────────────────────────────────────────
// Animated Counter Hook
// ─────────────────────────────────────────────────

/**
 * Custom hook that animates a number from 0 to the target value.
 *
 * @param target - The final number to count up to
 * @param duration - Animation duration in milliseconds
 */
function useCounter(target: number, duration = 1800): number {
  const [count, setCount] = useState(0);
  const ref = useRef<number>(0);

  useEffect(() => {
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      ref.current = Math.round(eased * target);
      setCount(ref.current);
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [target, duration]);

  return count;
}

// ─────────────────────────────────────────────────
// StatCard Component
// ─────────────────────────────────────────────────

/**
 * Individual statistic card with animated counter.
 *
 * @param value - Numeric value to count up to
 * @param suffix - Display suffix (K+, M+, +)
 * @param label - Metric label text
 */
const StatCard: React.FC<{ value: number; suffix: string; label: string }> = ({
  value,
  suffix,
  label,
}) => {
  const count = useCounter(value, 1500);

  return (
    <motion.div
      whileHover={{ y: -3, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className="flex-1 text-center p-3 rounded-xl border cursor-default"
      style={{
        background: 'rgba(255,255,255,0.04)',
        borderColor: 'rgba(255,255,255,0.08)',
        backdropFilter: 'blur(12px)',
      }}
    >
      <p className="text-2xl font-black text-white leading-none">
        {count}
        <span className="text-orange-400">{suffix}</span>
      </p>
      <p className="text-slate-400 text-xs mt-1 font-medium">{label}</p>
    </motion.div>
  );
};

// ─────────────────────────────────────────────────
// HeroPanel Component
// ─────────────────────────────────────────────────

/**
 * Renders the left marketing panel of the auth layout.
 * Contains branding, hero copy, floating widgets, feature
 * highlights, and animated statistics.
 */
const HeroPanel: React.FC = () => {
  return (
    <motion.div
      variants={containerVariant}
      initial="hidden"
      animate="visible"
      className="flex flex-col h-full py-10 px-8 xl:px-12 overflow-y-auto"
    >
      {/* ── Logo & Brand ── */}
      <motion.div variants={itemVariant} className="flex items-center gap-3 mb-8">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{
            background: 'linear-gradient(135deg, #FF4D00, #FF6A00)',
            boxShadow: '0 0 20px rgba(255,77,0,0.4)',
          }}
        >
          <Film size={20} className="text-white" />
        </div>
        <div>
          <span className="text-white font-black text-xl tracking-tight">Cine</span>
          <span
            className="font-black text-xl tracking-tight"
            style={{
              background: 'linear-gradient(90deg, #FF6A00, #9333EA)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Book
          </span>
        </div>

        {/* Premium Badge */}
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="ml-auto flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-bold uppercase tracking-wider"
          style={{
            background: 'rgba(255,77,0,0.12)',
            borderColor: 'rgba(255,77,0,0.3)',
            color: '#FF6A00',
          }}
        >
          <Crown size={10} />
          Premium
        </motion.div>
      </motion.div>

      {/* ── Hero Headline ── */}
      <motion.div variants={itemVariant} className="mb-6">
        <h1
          className="text-4xl xl:text-5xl font-black leading-[1.1] tracking-tight mb-4"
        >
          <span className="text-white">Your Cinema.</span>
          <br />
          <span
            style={{
              background: 'linear-gradient(135deg, #FF4D00 0%, #FF6A00 40%, #9333EA 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Your Rules.
          </span>
        </h1>
        <p className="text-slate-400 text-base leading-relaxed max-w-sm">
          Book the latest blockbusters, reserve premium seats, and experience entertainment
          without waiting in line.
        </p>
      </motion.div>

      {/* ── Floating Movie Cards ── */}
      <motion.div variants={itemVariant} className="mb-6 flex-shrink-0">
        <FloatingMovieCards />
      </motion.div>

      {/* ── Feature Highlights ── */}
      <motion.div variants={itemVariant} className="mb-6">
        <div className="grid grid-cols-2 gap-2.5">
          {FEATURES.map(({ icon: Icon, label, desc, color, bg, border }) => (
            <motion.div
              key={label}
              whileHover={{ y: -2, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className="flex items-center gap-2.5 p-3 rounded-xl border cursor-default"
              style={{
                background: bg,
                borderColor: border,
                backdropFilter: 'blur(12px)',
              }}
            >
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: `${color}25`, border: `1px solid ${color}30` }}
              >
                <Icon size={13} style={{ color }} />
              </div>
              <div>
                <p className="text-white font-semibold text-xs leading-tight">{label}</p>
                <p className="text-slate-500 text-[10px]">{desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ── Statistics ── */}
      <motion.div variants={itemVariant}>
        <div className="flex gap-2.5">
          {STATS.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default HeroPanel;
