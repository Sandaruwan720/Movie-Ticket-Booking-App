/**
 * ==================================================
 * WhyChooseUsSection Component — Section 10
 * --------------------------------------------------
 * Platform credibility section with:
 * - 4-column animated glass feature cards
 * - Large stat per card
 * - Animated entrance on viewport
 * ==================================================
 */

import React from 'react';
import { motion } from 'framer-motion';
import SectionHeader from '../ui/SectionHeader';
import { PLATFORM_FEATURES } from '../../data/homeData';

const WhyChooseUsSection: React.FC = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #030712, #0b0c20, #030712)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Why CineBook"
          title="Built for Cinema Lovers"
          subtitle="Every feature is designed to make your movie experience effortless from search to seat."
          centered
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-4">
          {PLATFORM_FEATURES.map((feature, i) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="relative rounded-2xl p-6 text-center group cursor-default overflow-hidden"
              style={{
                background: 'rgba(255,255,255,0.025)',
                border: '1px solid rgba(255,255,255,0.07)',
                boxShadow: '0 4px 24px rgba(0,0,0,0.2)',
              }}
            >
              {/* Colored glow top */}
              <div
                className="absolute top-0 left-0 right-0 h-px opacity-60 group-hover:opacity-100 transition-opacity"
                style={{ background: `linear-gradient(90deg, transparent, ${feature.color}, transparent)` }}
              />
              <div
                className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                style={{ background: feature.color }}
              />

              {/* Emoji */}
              <motion.div
                animate={{ rotate: [0, 5, 0, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: i * 0.5 }}
                className="text-5xl mb-4"
              >
                {feature.emoji}
              </motion.div>

              {/* Stat */}
              <div className="mb-3">
                <span
                  className="text-3xl font-black"
                  style={{ color: feature.color }}
                >
                  {feature.stat}
                </span>
                <p className="text-slate-500 text-xs mt-0.5">{feature.statLabel}</p>
              </div>

              {/* Title */}
              <h3 className="text-white font-black text-base mb-2">{feature.title}</h3>

              {/* Description */}
              <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
