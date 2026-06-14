/**
 * ==================================================
 * FAQSection Component — Section 13
 * --------------------------------------------------
 * Animated accordion FAQ system with:
 * - Category filter tabs
 * - Smooth AnimatePresence height transitions
 * - Chevron rotation indicator
 * - Rich answer formatting
 * ==================================================
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader';
import { FAQ_ITEMS } from '../../data/homeData';
import type { FAQItem } from '../../types/movie';

const CATEGORIES: Array<FAQItem['category'] | 'All'> = [
  'All', 'Booking', 'Payment', 'Cancellation', 'Account', 'Technical',
];

/** Individual accordion item */
const FAQItem: React.FC<{ item: FAQItem; isOpen: boolean; onToggle: () => void }> = ({
  item,
  isOpen,
  onToggle,
}) => {
  return (
    <motion.div
      layout
      className="rounded-2xl overflow-hidden"
      style={{
        background: isOpen ? 'rgba(255,77,0,0.06)' : 'rgba(255,255,255,0.025)',
        border: `1px solid ${isOpen ? 'rgba(255,77,0,0.2)' : 'rgba(255,255,255,0.07)'}`,
        boxShadow: isOpen ? '0 4px 20px rgba(255,77,0,0.08)' : 'none',
        transition: 'background 0.3s, border-color 0.3s, box-shadow 0.3s',
      }}
    >
      {/* Question button */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 p-5 text-left"
        aria-expanded={isOpen}
      >
        <div className="flex items-start gap-3">
          <HelpCircle
            size={16}
            className="flex-shrink-0 mt-0.5 transition-colors duration-200"
            style={{ color: isOpen ? '#FF6A00' : '#475569' }}
          />
          <span className={`font-semibold text-sm transition-colors duration-200 ${isOpen ? 'text-white' : 'text-slate-300'}`}>
            {item.question}
          </span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="flex-shrink-0"
        >
          <ChevronDown size={16} className={`transition-colors duration-200 ${isOpen ? 'text-orange-400' : 'text-slate-600'}`} />
        </motion.div>
      </button>

      {/* Answer */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pt-0">
              <div className="ml-7 text-slate-400 text-sm leading-relaxed border-l-2 border-orange-500/25 pl-4">
                {item.answer}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/**
 * FAQ section with category tabs and animated accordions.
 */
const FAQSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<FAQItem['category'] | 'All'>('All');
  const [openId, setOpenId] = useState<string | null>('faq-01');

  const filtered = activeCategory === 'All'
    ? FAQ_ITEMS
    : FAQ_ITEMS.filter((f) => f.category === activeCategory);

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #030712, #080c1a, #030712)' }} />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Questions & Answers"
          title="Frequently Asked"
          subtitle="Everything you need to know about booking, payment, and your CineBook experience."
          centered
        />

        {/* Category tabs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 mb-8"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
                activeCategory === cat
                  ? 'text-white border-orange-500/50'
                  : 'text-slate-400 border-white/10 hover:border-white/20 hover:text-white'
              }`}
              style={
                activeCategory === cat
                  ? { background: 'rgba(255,77,0,0.15)' }
                  : { background: 'rgba(255,255,255,0.04)' }
              }
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Accordion list */}
        <motion.div layout className="space-y-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25, delay: i * 0.04 }}
              >
                <FAQItem
                  item={item}
                  isOpen={openId === item.id}
                  onToggle={() => setOpenId(openId === item.id ? null : item.id)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-10"
        >
          <p className="text-slate-500 text-sm">
            Still have questions?{' '}
            <a
              href="mailto:support@cinebook.lk"
              className="text-orange-400 font-semibold hover:text-orange-300 transition-colors"
            >
              Contact our support team →
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
