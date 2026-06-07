/**
 * ==================================================
 * PremiumButton Component
 * --------------------------------------------------
 * A world-class button system for CineBook with:
 * - Primary orange gradient + glow variant
 * - Glass social button variant (Google, GitHub)
 * - Loading spinner state
 * - Success state with animated checkmark
 * - Hover lift + active press micro-interactions
 * - Full accessibility support
 * - Framer Motion animations
 * ==================================================
 */

import React from 'react';
import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';
import { Loader2, CheckCircle2 } from 'lucide-react';

// ─────────────────────────────────────────────────
// Type Definitions
// ─────────────────────────────────────────────────

type ButtonVariant = 'primary' | 'glass' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

export interface PremiumButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  /** Visual style variant */
  variant?: ButtonVariant;
  /** Button size */
  size?: ButtonSize;
  /** Shows loading spinner and disables interaction */
  isLoading?: boolean;
  /** Shows success checkmark state */
  isSuccess?: boolean;
  /** Optional icon displayed before children */
  leftIcon?: React.ReactNode;
  /** Optional icon displayed after children */
  rightIcon?: React.ReactNode;
  /** Button label content */
  children: React.ReactNode;
  /** Full width layout */
  fullWidth?: boolean;
}

// ─────────────────────────────────────────────────
// Variant Style Maps
// ─────────────────────────────────────────────────

const variantStyles: Record<ButtonVariant, string> = {
  primary: `
    bg-gradient-to-r from-orange-500 to-orange-600
    text-white font-semibold
    shadow-[0_0_30px_rgba(255,77,0,0.35)]
    hover:shadow-[0_0_40px_rgba(255,77,0,0.5)]
    hover:from-orange-400 hover:to-orange-500
    border border-orange-500/30
    disabled:opacity-50 disabled:cursor-not-allowed
    disabled:shadow-none
  `,
  glass: `
    bg-white/8 backdrop-blur-md
    text-white/90 font-medium
    border border-white/15
    hover:bg-white/12 hover:border-white/25
    hover:text-white
  `,
  ghost: `
    bg-transparent
    text-slate-400 font-medium
    hover:text-white hover:bg-white/5
    border border-transparent
    hover:border-white/10
  `,
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-4 py-2.5 text-sm rounded-lg gap-1.5',
  md: 'px-5 py-3.5 text-sm rounded-xl gap-2',
  lg: 'px-6 py-4 text-base rounded-xl gap-2.5',
};

// ─────────────────────────────────────────────────
// PremiumButton Component
// ─────────────────────────────────────────────────

/**
 * PremiumButton — Cinema-grade button with full motion
 * design, multiple variants, and accessibility support.
 *
 * @param variant - 'primary' | 'glass' | 'ghost'
 * @param size - 'sm' | 'md' | 'lg'
 * @param isLoading - Shows spinner and disables button
 * @param isSuccess - Shows success checkmark state
 * @param leftIcon - Icon rendered before label
 * @param rightIcon - Icon rendered after label
 * @param fullWidth - Stretch to fill container
 */
const PremiumButton: React.FC<PremiumButtonProps> = ({
  variant = 'primary',
  size = 'lg',
  isLoading = false,
  isSuccess = false,
  leftIcon,
  rightIcon,
  children,
  fullWidth = false,
  disabled,
  className = '',
  ...props
}) => {
  const isDisabled = disabled || isLoading;

  return (
    <motion.button
      disabled={isDisabled}
      whileHover={!isDisabled ? { y: -2, scale: 1.005 } : {}}
      whileTap={!isDisabled ? { y: 0, scale: 0.98 } : {}}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      className={`
        relative inline-flex items-center justify-center
        transition-all duration-300 ease-out
        select-none cursor-pointer
        overflow-hidden
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${fullWidth ? 'w-full' : ''}
        ${isDisabled ? 'pointer-events-none' : ''}
        ${className}
      `}
      {...props}
    >
      {/* Shimmer effect on hover (primary only) */}
      {variant === 'primary' && !isDisabled && (
        <span
          className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"
          aria-hidden="true"
        />
      )}

      {/* Loading Spinner */}
      {isLoading && (
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center"
          aria-hidden="true"
        >
          <Loader2 size={16} className="animate-spin" />
        </motion.span>
      )}

      {/* Success State */}
      {isSuccess && !isLoading && (
        <motion.span
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 400 }}
          className="flex items-center"
          aria-hidden="true"
        >
          <CheckCircle2 size={16} className="text-emerald-300" />
        </motion.span>
      )}

      {/* Left Icon */}
      {!isLoading && !isSuccess && leftIcon && (
        <span className="flex items-center shrink-0" aria-hidden="true">
          {leftIcon}
        </span>
      )}

      {/* Label */}
      <span className={isLoading ? 'ml-2' : ''}>
        {isLoading ? 'Please wait...' : isSuccess ? 'Success!' : children}
      </span>

      {/* Right Icon */}
      {!isLoading && !isSuccess && rightIcon && (
        <span className="flex items-center shrink-0 ml-auto" aria-hidden="true">
          {rightIcon}
        </span>
      )}
    </motion.button>
  );
};

export default PremiumButton;
