/**
 * ==================================================
 * CinemaExperienceSection Component — Section 05
 * --------------------------------------------------
 * Promotes premium cinema experiences with:
 * - 6 glassmorphism feature cards
 * - Hover-reveal details
 * - Feature tags
 * - Gradient accent borders
 * ==================================================
 */

import React from 'react';
import { motion } from 'framer-motion';
import SectionHeader from '../ui/SectionHeader';
import { EXPERIENCE_FEATURES } from '../../data/homeData';

const CinemaExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #030712, #0c1120, #030712)' }} />

      {/* Decorative orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[160px] opacity-10"
        style={{ background: 'radial-gradient(circle, #7C3AED, #06B6D4)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Premium Formats"
          title="The Ultimate Cinema Experience"
          subtitle="Every seat, screen, and sound system engineered for one purpose — to blow your mind."
          centered
        />

        {/* 6-column grid (responsive) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-4">
          {EXPERIENCE_FEATURES.map((feature, i) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -6, scale: 1.01 }}
              className="relative rounded-2xl p-6 cursor-pointer group overflow-hidden"
              style={{
                background: feature.gradient,
                border: `1px solid ${feature.accentColor}20`,
                boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
              }}
            >
              {/* Glow on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ boxShadow: `inset 0 0 60px ${feature.accentColor}20` }}
              />

              {/* Gradient border line at top */}
              <div
                className="absolute top-0 left-0 right-0 h-px opacity-60"
                style={{ background: `linear-gradient(90deg, transparent, ${feature.accentColor}, transparent)` }}
              />

              {/* Emoji */}
              <div className="text-4xl mb-4">{feature.emoji}</div>

              {/* Title */}
              <h3 className="text-white font-black text-lg mb-2">{feature.title}</h3>

              {/* Description */}
              <p className="text-slate-400 text-sm leading-relaxed mb-4">{feature.description}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {feature.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-semibold px-2.5 py-1 rounded-full"
                    style={{
                      background: `${feature.accentColor}15`,
                      border: `1px solid ${feature.accentColor}30`,
                      color: feature.accentColor,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CinemaExperienceSection;
