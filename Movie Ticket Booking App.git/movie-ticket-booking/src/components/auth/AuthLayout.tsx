/**
 * ==================================================
 * AuthLayout Component
 * --------------------------------------------------
 * Split-screen authentication layout (55% / 45%):
 *
 * - Left: Cinematic HeroPanel (hidden on mobile)
 * - Right: Floating glass auth card slot
 * - Framer Motion page transitions (fade + slide)
 * - Fully responsive: collapses to single column
 * - Keyboard accessible, no overflow clipping
 * ==================================================
 */

import React from 'react';
import type { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CinematicBackground from './CinematicBackground';
import HeroPanel from './HeroPanel';

// ─────────────────────────────────────────────────
// Type Definitions
// ─────────────────────────────────────────────────

interface AuthLayoutProps {
  /** The auth form content (Login, Signup, ForgotPassword) */
  children: ReactNode;
  /** Unique key used by AnimatePresence for page transitions */
  pageKey: string;
}

// ─────────────────────────────────────────────────
// Page Transition Variants
// ─────────────────────────────────────────────────

/** Smooth fade + slide-in transition for auth card */
const cardVariant = {
  initial: { opacity: 0, y: 20, scale: 0.98 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
  exit: {
    opacity: 0,
    y: -10,
    scale: 0.98,
    transition: { duration: 0.3, ease: 'easeIn' as const },
  },
};

// ─────────────────────────────────────────────────
// AuthLayout Component
// ─────────────────────────────────────────────────

/**
 * Wraps all authentication pages with the cinematic background,
 * the hero marketing panel, and a glowing glass card container.
 *
 * @param children - The form content to render in the right panel
 * @param pageKey - Unique key for AnimatePresence page transitions
 */
const AuthLayout: React.FC<AuthLayoutProps> = ({ children, pageKey }) => {
  return (
    <div className="min-h-screen w-full relative flex overflow-hidden">
      {/* ── Cinematic Background (behind everything) ── */}
      <CinematicBackground />

      {/* ── Main Layout Container ── */}
      <div className="relative z-10 flex w-full min-h-screen">

        {/* ── Left Panel: Hero (hidden on mobile/tablet) ── */}
        <div
          className="hidden lg:flex lg:w-[55%] xl:w-[58%] relative border-r border-white/5"
          style={{
            background: 'rgba(3,7,18,0.3)',
            backdropFilter: 'blur(2px)',
          }}
        >
          <HeroPanel />
        </div>

        {/* ── Right Panel: Auth Card ── */}
        <div className="flex-1 lg:w-[45%] xl:w-[42%] flex items-center justify-center p-4 sm:p-6 lg:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={pageKey}
              variants={cardVariant}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full max-w-[480px]"
            >
              {/* Glass auth card */}
              <div
                className="relative rounded-3xl overflow-hidden"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  backdropFilter: 'blur(40px)',
                  border: '1px solid rgba(255,255,255,0.10)',
                  boxShadow: `
                    0 0 0 1px rgba(255,255,255,0.05) inset,
                    0 40px 80px rgba(0,0,0,0.5),
                    0 0 60px rgba(255,77,0,0.05)
                  `,
                }}
              >
                {/* Gradient border top accent */}
                <div
                  className="absolute top-0 left-0 right-0 h-[1px]"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(255,106,0,0.5), rgba(124,58,237,0.5), transparent)',
                  }}
                />

                {/* Card inner content */}
                <div className="p-8 sm:p-10">
                  {children}
                </div>
              </div>

              {/* Glow under card */}
              <div
                className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-8 rounded-full blur-2xl opacity-30 pointer-events-none"
                style={{ background: 'linear-gradient(90deg, #FF4D00, #7C3AED)' }}
                aria-hidden="true"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
