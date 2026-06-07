/**
 * ==================================================
 * PasswordStrengthMeter Component
 * --------------------------------------------------
 * Animated password strength indicator with:
 * - 4-segment animated bar (Weak → Excellent)
 * - Color-coded strength levels
 * - Requirement checklist with animated checkmarks
 * - Framer Motion transitions
 * ==================================================
 */

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Circle } from 'lucide-react';
import {
  getPasswordStrength,
  getPasswordStrengthLabel,
  PASSWORD_REQUIREMENTS,
} from '../../lib/validations';

// ─────────────────────────────────────────────────
// Type Definitions
// ─────────────────────────────────────────────────

interface PasswordStrengthMeterProps {
  /** The current password value to evaluate */
  password: string;
  /** Whether to show the requirement checklist */
  showRequirements?: boolean;
}

// ─────────────────────────────────────────────────
// Strength Level Color Config
// ─────────────────────────────────────────────────

/** Maps strength level to visual color classes */
const strengthConfig = [
  { color: 'bg-transparent', glow: '' },                          // 0 — empty
  { color: 'bg-red-500', glow: 'shadow-red-500/40' },             // 1 — weak
  { color: 'bg-amber-500', glow: 'shadow-amber-500/40' },         // 2 — medium
  { color: 'bg-blue-500', glow: 'shadow-blue-500/40' },           // 3 — strong
  { color: 'bg-emerald-500', glow: 'shadow-emerald-500/40' },     // 4 — excellent
] as const;

const strengthTextColor = [
  'text-transparent',
  'text-red-400',
  'text-amber-400',
  'text-blue-400',
  'text-emerald-400',
] as const;

// ─────────────────────────────────────────────────
// PasswordStrengthMeter Component
// ─────────────────────────────────────────────────

/**
 * Displays a visual password strength indicator with
 * animated segments and an optional requirement checklist.
 *
 * @param password - Current password string to analyze
 * @param showRequirements - Whether to show the checklist (default: true)
 */
const PasswordStrengthMeter: React.FC<PasswordStrengthMeterProps> = ({
  password,
  showRequirements = true,
}) => {
  const strength = getPasswordStrength(password);
  const label = getPasswordStrengthLabel(strength);
  const config = strengthConfig[strength];

  if (!password) return null;

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="mt-3 space-y-3"
    >
      {/* ── Strength Bar ── */}
      <div className="flex items-center gap-2">
        {/* 4 Segments */}
        <div className="flex gap-1.5 flex-1" role="progressbar" aria-label={`Password strength: ${label}`} aria-valuenow={strength} aria-valuemin={0} aria-valuemax={4}>
          {[1, 2, 3, 4].map((segment) => (
            <div key={segment} className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: strength >= segment ? 1 : 0 }}
                transition={{ duration: 0.35, delay: (segment - 1) * 0.08, ease: 'easeOut' }}
                className={`h-full w-full origin-left rounded-full ${
                  strength >= segment ? config.color : 'bg-transparent'
                }`}
              />
            </div>
          ))}
        </div>

        {/* Strength Label */}
        <AnimatePresence mode="wait">
          <motion.span
            key={label}
            initial={{ opacity: 0, x: 5 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -5 }}
            transition={{ duration: 0.2 }}
            className={`text-xs font-semibold w-16 text-right ${strengthTextColor[strength]}`}
          >
            {label}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* ── Requirement Checklist ── */}
      {showRequirements && (
        <div className="grid grid-cols-1 gap-1.5">
          {PASSWORD_REQUIREMENTS.map((req) => {
            const isPassed = req.test(password);
            return (
              <motion.div
                key={req.label}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25 }}
                className="flex items-center gap-2"
              >
                <motion.span
                  animate={{ scale: isPassed ? [1.2, 1] : 1 }}
                  transition={{ duration: 0.2 }}
                  aria-hidden="true"
                >
                  {isPassed ? (
                    <CheckCircle2 size={12} className="text-emerald-400 flex-shrink-0" />
                  ) : (
                    <Circle size={12} className="text-slate-600 flex-shrink-0" />
                  )}
                </motion.span>
                <span
                  className={`text-xs transition-colors duration-300 ${
                    isPassed ? 'text-emerald-400' : 'text-slate-500'
                  }`}
                >
                  {req.label}
                </span>
              </motion.div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
};

export default PasswordStrengthMeter;
