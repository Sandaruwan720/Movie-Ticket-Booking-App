/**
 * ==================================================
 * SectionHeader Component
 * --------------------------------------------------
 * Reusable section title block with:
 * - Gradient accent label
 * - Large heading with optional gradient text
 * - Subtitle text
 * - Optional "See All" link
 * - Framer Motion entrance animation
 * ==================================================
 */

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

interface SectionHeaderProps {
  label?: string;
  title: string;
  titleGradient?: boolean;
  subtitle?: string;
  seeAllLabel?: string;
  onSeeAll?: () => void;
  centered?: boolean;
  className?: string;
}

/**
 * Reusable section header with label, title, subtitle, and optional See All button.
 */
const SectionHeader: React.FC<SectionHeaderProps> = ({
  label,
  title,
  titleGradient = false,
  subtitle,
  seeAllLabel = 'See All',
  onSeeAll,
  centered = false,
  className = '',
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`flex items-end justify-between gap-4 mb-8 ${centered ? 'flex-col items-center text-center' : ''} ${className}`}
    >
      <div className={centered ? 'flex flex-col items-center' : ''}>
        {/* Accent Label */}
        {label && (
          <div className="flex items-center gap-2 mb-2">
            <div
              className="h-px w-6"
              style={{ background: 'linear-gradient(90deg, #FF4D00, #FF6A00)' }}
            />
            <span
              className="text-xs font-bold uppercase tracking-widest"
              style={{
                background: 'linear-gradient(90deg, #FF4D00, #FF6A00)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {label}
            </span>
          </div>
        )}

        {/* Title */}
        <h2
          className="text-2xl md:text-3xl font-black text-white leading-tight tracking-tight"
          style={
            titleGradient
              ? {
                  background: 'linear-gradient(135deg, #FFFFFF 0%, #94A3B8 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }
              : undefined
          }
        >
          {title}
        </h2>

        {/* Subtitle */}
        {subtitle && (
          <p className="text-slate-400 text-sm mt-1.5 max-w-md">
            {subtitle}
          </p>
        )}
      </div>

      {/* See All Button */}
      {onSeeAll && !centered && (
        <motion.button
          onClick={onSeeAll}
          whileHover={{ x: 3 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-1 text-sm font-semibold text-orange-400 hover:text-orange-300 transition-colors duration-200 flex-shrink-0 group"
        >
          {seeAllLabel}
          <ChevronRight
            size={16}
            className="transition-transform duration-200 group-hover:translate-x-0.5"
          />
        </motion.button>
      )}
    </motion.div>
  );
};

export default SectionHeader;
