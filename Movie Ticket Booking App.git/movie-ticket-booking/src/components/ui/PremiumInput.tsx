/**
 * ==================================================
 * PremiumInput Component
 * --------------------------------------------------
 * A world-class glassmorphism input field with:
 * - Floating animated label
 * - Icon support (left + right)
 * - Focus glow animation
 * - Error / success validation states
 * - Password visibility toggle
 * - Framer Motion micro-interactions
 * - Full accessibility (ARIA, labels, roles)
 * ==================================================
 */

import React, { forwardRef, useState, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, CheckCircle2, AlertCircle } from 'lucide-react';

// ─────────────────────────────────────────────────
// Type Definitions
// ─────────────────────────────────────────────────

export interface PremiumInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'id'> {
  /** The floating label text */
  label: string;
  /** Optional icon to display on the left side */
  leftIcon?: React.ReactNode;
  /** Validation error message */
  error?: string;
  /** Whether the field has passed validation */
  isValid?: boolean;
  /** Hint text displayed below the field */
  hint?: string;
}

// ─────────────────────────────────────────────────
// PremiumInput Component
// ─────────────────────────────────────────────────

/**
 * PremiumInput — A glassmorphism-styled input field with
 * floating labels, animated focus states, and validation feedback.
 *
 * @param label - Floating label text
 * @param leftIcon - Optional left-side icon element
 * @param error - Validation error message from React Hook Form
 * @param isValid - Whether the current value passes validation
 * @param hint - Optional helper text shown below the input
 */
const PremiumInput = forwardRef<HTMLInputElement, PremiumInputProps>(
  ({ label, leftIcon, error, isValid, hint, type = 'text', className = '', value, onChange, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const uid = useId();
    const inputId = `input-${uid}`;
    const errorId = `error-${uid}`;
    const hintId = `hint-${uid}`;

    const isPassword = type === 'password';
    const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

    // Determine if the label should float up
    const hasValue = value !== undefined ? String(value).length > 0 : false;
    const isFloating = isFocused || hasValue;

    // Visual state border color
    const getBorderColor = () => {
      if (error) return 'border-red-500/60 shadow-red-500/20';
      if (isValid) return 'border-emerald-500/60 shadow-emerald-500/20';
      if (isFocused) return 'border-orange-500/60 shadow-orange-500/20';
      return 'border-white/10';
    };

    const getGlowClass = () => {
      if (error) return 'shadow-[0_0_20px_rgba(239,68,68,0.15)]';
      if (isValid) return 'shadow-[0_0_20px_rgba(16,185,129,0.15)]';
      if (isFocused) return 'shadow-[0_0_20px_rgba(255,77,0,0.15)]';
      return '';
    };

    const getLabelColor = () => {
      if (isFocused) return '#fb923c';
      if (error) return '#f87171';
      if (isValid) return '#34d399';
      return '#94a3b8';
    };

    const getIconColor = () => {
      if (isFocused) return 'text-orange-400';
      if (error) return 'text-red-400';
      if (isValid) return 'text-emerald-400';
      return 'text-slate-500';
    };

    return (
      <div className={`relative w-full ${className}`}>
        {/* ── Input Container ── */}
        <div className="relative">
          {/* Left Icon */}
          {leftIcon && (
            <div
              className={`absolute left-4 top-1/2 -translate-y-1/2 z-10 transition-colors duration-200 ${getIconColor()}`}
              aria-hidden="true"
            >
              {leftIcon}
            </div>
          )}

          {/* Input Element (using regular input, not motion.input for compatibility) */}
          <input
            ref={ref}
            id={inputId}
            type={inputType}
            value={value}
            onChange={onChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            aria-invalid={!!error}
            aria-describedby={`${error ? errorId : ''} ${hint ? hintId : ''}`.trim() || undefined}
            placeholder={label}
            className={`
              w-full
              bg-white/5
              backdrop-blur-sm
              border
              rounded-xl
              transition-all
              duration-300
              text-white
              text-sm
              font-medium
              placeholder-transparent
              outline-none
              ${leftIcon ? 'pl-11' : 'pl-4'}
              ${isPassword ? 'pr-11' : isValid || error ? 'pr-11' : 'pr-4'}
              pt-6
              pb-3
              ${getBorderColor()}
              ${getGlowClass()}
              hover:border-white/20
              focus:outline-none
            `}
            {...props}
          />

          {/* Floating Label */}
          <motion.label
            htmlFor={inputId}
            animate={{
              top: isFloating ? '8px' : '50%',
              y: isFloating ? '0%' : '-50%',
              fontSize: isFloating ? '11px' : '14px',
              color: getLabelColor(),
            }}
            transition={{ duration: 0.2, ease: 'easeInOut' as const }}
            className={`
              absolute
              ${leftIcon ? 'left-11' : 'left-4'}
              pointer-events-none
              z-10
              font-medium
              leading-none
              origin-left
            `}
          >
            {label}
          </motion.label>

          {/* Right Slot: password toggle / validation icon */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1 z-10">
            {/* Password Visibility Toggle */}
            {isPassword && (
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                className="text-slate-500 hover:text-slate-300 transition-colors duration-200 p-0.5"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            )}

            {/* Validation Icon */}
            <AnimatePresence mode="wait">
              {error && (
                <motion.div
                  key="error-icon"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="text-red-400"
                  aria-hidden="true"
                >
                  <AlertCircle size={16} />
                </motion.div>
              )}
              {isValid && !error && (
                <motion.div
                  key="success-icon"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="text-emerald-400"
                  aria-hidden="true"
                >
                  <CheckCircle2 size={16} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ── Feedback Area ── */}
        <AnimatePresence mode="wait">
          {error ? (
            <motion.p
              key="error"
              id={errorId}
              role="alert"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
              className="mt-1.5 text-xs text-red-400 flex items-center gap-1 pl-1"
            >
              <AlertCircle size={11} aria-hidden="true" />
              {error}
            </motion.p>
          ) : hint ? (
            <motion.p
              key="hint"
              id={hintId}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
              className="mt-1.5 text-xs text-slate-500 pl-1"
            >
              {hint}
            </motion.p>
          ) : null}
        </AnimatePresence>
      </div>
    );
  }
);

PremiumInput.displayName = 'PremiumInput';

export default PremiumInput;
