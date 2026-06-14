/**
 * ==================================================
 * MobileAppSection Component — Section 11
 * --------------------------------------------------
 * App promotion section with:
 * - Mockup phone frame with cinema interface preview
 * - iOS + Android download badges
 * - QR code placeholder
 * - Key app features list
 * ==================================================
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Star, Download, CheckCircle } from 'lucide-react';

const APP_FEATURES = [
  'Instant mobile ticket — no printing',
  'Real-time seat map with live updates',
  'Push notifications for premieres',
  'One-tap rebooking for favorites',
  'Offline ticket access',
  'Face ID / fingerprint checkout',
];

const MobileAppSection: React.FC = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #030712, #0a1020, #030712)' }} />

      {/* Purple glow */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[140px] opacity-10"
        style={{ background: 'radial-gradient(circle, #7C3AED, #06B6D4)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Phone mockup */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex justify-center"
          >
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="relative"
            >
              {/* Phone frame */}
              <div
                className="w-64 h-[500px] rounded-[40px] overflow-hidden relative"
                style={{
                  background: 'linear-gradient(145deg, #1a1f35, #0d1120)',
                  border: '2px solid rgba(255,255,255,0.12)',
                  boxShadow: '0 60px 120px rgba(0,0,0,0.6), 0 0 60px rgba(124,58,237,0.15)',
                }}
              >
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-b-2xl z-10" />

                {/* Screen content */}
                <div className="absolute inset-2 rounded-[34px] overflow-hidden" style={{ background: '#030712' }}>
                  {/* App header */}
                  <div className="px-4 pt-8 pb-3" style={{ background: 'rgba(255,77,0,0.1)' }}>
                    <p className="text-orange-400 font-black text-lg">🎬 CineBook</p>
                    <p className="text-slate-500 text-xs">Good evening, Sahan 👋</p>
                  </div>

                  {/* Movie cards in app */}
                  {[
                    { emoji: '🚀', title: 'Cosmic Horizon', color: '#7C3AED', price: 'LKR 1,200' },
                    { emoji: '🔥', title: 'Ember & Ash', color: '#FF6A00', price: 'LKR 800' },
                    { emoji: '🌆', title: 'Neon Requiem', color: '#06B6D4', price: 'LKR 750' },
                  ].map((m) => (
                    <div
                      key={m.title}
                      className="mx-3 mt-3 p-3 rounded-2xl flex items-center gap-3"
                      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
                    >
                      <div className="w-10 h-12 rounded-xl flex items-center justify-center text-lg"
                        style={{ background: `${m.color}20` }}>
                        {m.emoji}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-bold text-xs truncate">{m.title}</p>
                        <p className="text-orange-400 text-xs font-semibold">{m.price}</p>
                      </div>
                      <div className="text-[10px] font-bold text-white px-2.5 py-1.5 rounded-lg"
                        style={{ background: 'linear-gradient(135deg, #FF4D00, #FF6A00)' }}>
                        Book
                      </div>
                    </div>
                  ))}

                  {/* Bottom nav */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-around py-2 rounded-2xl"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                    {['🎬', '🔍', '🎟️', '👤'].map((icon, i) => (
                      <div key={i} className={`text-lg ${i === 0 ? 'opacity-100' : 'opacity-30'}`}>{icon}</div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating rating badge */}
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -right-8 top-20 px-4 py-2.5 rounded-2xl"
                style={{
                  background: 'rgba(16,185,129,0.15)',
                  border: '1px solid rgba(16,185,129,0.3)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                <div className="flex items-center gap-1.5">
                  <Star size={12} className="text-amber-400 fill-amber-400" />
                  <span className="text-white font-black text-sm">4.9</span>
                </div>
                <p className="text-slate-400 text-[10px]">App Rating</p>
              </motion.div>

              {/* Downloads badge */}
              <motion.div
                animate={{ x: [0, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
                className="absolute -left-8 bottom-24 px-4 py-2.5 rounded-2xl"
                style={{
                  background: 'rgba(124,58,237,0.15)',
                  border: '1px solid rgba(124,58,237,0.3)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                <p className="text-violet-400 font-black text-sm">500K+</p>
                <p className="text-slate-400 text-[10px]">Downloads</p>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-7"
          >
            {/* Label */}
            <div className="flex items-center gap-2">
              <Smartphone size={16} className="text-orange-400" />
              <span className="text-orange-400 text-sm font-bold uppercase tracking-widest">
                Mobile App
              </span>
            </div>

            <h2 className="text-4xl font-black text-white leading-tight">
              Cinema in Your{' '}
              <span style={{
                background: 'linear-gradient(135deg, #FF4D00, #9333EA)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                Pocket
              </span>
            </h2>

            <p className="text-slate-400 text-base leading-relaxed">
              Download the CineBook app and transform your phone into a cinema command center. 
              Browse, book, and collect digital tickets in seconds — anywhere, anytime.
            </p>

            {/* Features */}
            <ul className="space-y-3">
              {APP_FEATURES.map((f, i) => (
                <motion.li
                  key={f}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="flex items-center gap-3 text-sm text-slate-300"
                >
                  <CheckCircle size={15} className="text-emerald-400 flex-shrink-0" />
                  {f}
                </motion.li>
              ))}
            </ul>

            {/* Download buttons */}
            <div className="flex flex-wrap gap-3">
              {[
                { store: 'App Store', sub: 'Download on the', emoji: '🍎' },
                { store: 'Google Play', sub: 'Get it on', emoji: '🤖' },
              ].map(({ store, sub, emoji }) => (
                <motion.button
                  key={store}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-3 px-5 py-3.5 rounded-2xl border border-white/10 hover:border-white/20 transition-all"
                  style={{ background: 'rgba(255,255,255,0.04)' }}
                >
                  <span className="text-2xl">{emoji}</span>
                  <div className="text-left">
                    <p className="text-slate-500 text-[10px] font-medium">{sub}</p>
                    <p className="text-white font-bold text-sm">{store}</p>
                  </div>
                  <Download size={15} className="text-orange-400 ml-1" />
                </motion.button>
              ))}
            </div>

            {/* QR */}
            <div className="flex items-center gap-4">
              <div
                className="w-16 h-16 rounded-xl flex items-center justify-center"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                aria-label="QR code placeholder"
              >
                <div className="grid grid-cols-3 gap-0.5">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <div key={i} className="w-3 h-3 rounded-sm"
                      style={{ background: [0, 1, 3, 4, 5, 7, 8].includes(i) ? 'white' : 'transparent' }}
                    />
                  ))}
                </div>
              </div>
              <p className="text-slate-500 text-xs leading-relaxed">
                Scan to download<br />
                <span className="text-white text-sm font-semibold">CineBook App</span>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MobileAppSection;
