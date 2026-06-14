/**
 * ==================================================
 * SpecialOffersSection Component — Section 08
 * --------------------------------------------------
 * Conversion-boosting offers section with:
 * - Glassmorphism offer banners
 * - Discount percentage badges
 * - Promo code display
 * - "Copy Code" interaction
 * - Valid-until display
 * ==================================================
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, Tag, Clock } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader';
import { SPECIAL_OFFERS } from '../../data/homeData';

/**
 * Individual offer banner card.
 */
const OfferCard: React.FC<{ offer: (typeof SPECIAL_OFFERS)[0]; index: number }> = ({ offer, index }) => {
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(offer.code).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const validDate = new Date(offer.validUntil).toLocaleDateString('en-LK', {
    day: 'numeric', month: 'short', year: 'numeric',
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5, scale: 1.01 }}
      className="relative rounded-3xl p-6 overflow-hidden group cursor-pointer"
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.07)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.25)',
      }}
    >
      {/* Gradient background blob */}
      <div
        className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-3xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"
        style={{ background: offer.gradient }}
      />

      {/* Discount badge */}
      <div className="absolute top-4 right-4">
        <motion.div
          animate={{ rotate: [-3, 3, -3] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="w-14 h-14 rounded-2xl flex flex-col items-center justify-center"
          style={{ background: offer.gradient, boxShadow: `0 0 20px ${offer.accentColor}40` }}
        >
          <span className="text-white font-black text-lg leading-none">{offer.discount}%</span>
          <span className="text-white/70 text-[9px] font-medium">OFF</span>
        </motion.div>
      </div>

      {/* Content */}
      <div className="relative pr-16">
        {/* Type badge */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl">{offer.emoji}</span>
          <span
            className="text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider"
            style={{
              background: `${offer.accentColor}15`,
              border: `1px solid ${offer.accentColor}30`,
              color: offer.accentColor,
            }}
          >
            {offer.type}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-white font-black text-xl mb-1">{offer.title}</h3>
        <p className="text-slate-400 text-sm leading-relaxed mb-4">{offer.description}</p>

        {/* Min tickets */}
        {offer.minTickets && (
          <p className="text-slate-500 text-xs mb-3 flex items-center gap-1">
            <Tag size={11} />
            Min. {offer.minTickets} ticket{offer.minTickets > 1 ? 's' : ''}
          </p>
        )}

        {/* Promo code */}
        <div className="flex items-center gap-2">
          <div
            className="flex-1 flex items-center gap-2 px-4 py-2.5 rounded-xl"
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px dashed rgba(255,255,255,0.15)',
            }}
          >
            <Tag size={13} className="text-slate-500 flex-shrink-0" />
            <span className="text-white font-mono font-bold text-sm tracking-widest">{offer.code}</span>
          </div>

          <motion.button
            onClick={copyCode}
            whileTap={{ scale: 0.92 }}
            className="w-10 h-10 rounded-xl flex items-center justify-center transition-all flex-shrink-0"
            style={{
              background: copied ? `${offer.accentColor}20` : 'rgba(255,255,255,0.05)',
              border: `1px solid ${copied ? offer.accentColor + '40' : 'rgba(255,255,255,0.1)'}`,
            }}
            aria-label="Copy promo code"
          >
            <AnimatePresence mode="wait">
              {copied ? (
                <motion.div key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                  <Check size={14} style={{ color: offer.accentColor }} />
                </motion.div>
              ) : (
                <motion.div key="copy" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                  <Copy size={14} className="text-slate-400" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Valid until */}
        <p className="text-slate-600 text-[11px] flex items-center gap-1 mt-3">
          <Clock size={10} />
          Valid until {validDate}
        </p>
      </div>
    </motion.div>
  );
};

/**
 * Special Offers section — displays promotional discount cards.
 */
const SpecialOffersSection: React.FC = () => {
  return (
    <section id="offers" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #030712, #0a0618, #030712)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Save More"
          title="Special Offers 🎁"
          subtitle="Exclusive deals and seasonal promotions to make every movie night even better."
          onSeeAll={() => console.log('see all offers')}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SPECIAL_OFFERS.map((offer, i) => (
            <OfferCard key={offer.id} offer={offer} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpecialOffersSection;
