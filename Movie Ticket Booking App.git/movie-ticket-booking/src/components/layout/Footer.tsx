/**
 * ==================================================
 * Footer Component — Section 14
 * --------------------------------------------------
 * Premium 5-column footer with:
 * - Brand + tagline + social links
 * - Movies, Cinemas, Support, Legal nav columns
 * - Newsletter signup input
 * - App download badges
 * - Gradient top border
 * - Copyright line
 * ==================================================
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Film,
  Mail,
  Send,
  MapPin,
  Phone,
  Check,
} from 'lucide-react';
import { Link } from 'react-router-dom';

// ─── Footer Data ──────────────────────────────────

const FOOTER_COLUMNS = [
  {
    heading: 'Movies',
    links: [
      { label: 'Now Showing', href: '/#now-showing' },
      { label: 'Coming Soon', href: '#' },
      { label: 'Trending This Week', href: '#' },
      { label: 'All Movies', href: '#' },
      { label: 'By Genre', href: '#' },
    ],
  },
  {
    heading: 'Cinemas',
    links: [
      { label: 'Find a Cinema', href: '/#cinemas' },
      { label: 'IMAX Locations', href: '#' },
      { label: 'Dolby Atmos', href: '#' },
      { label: 'VIP Lounges', href: '#' },
      { label: 'Partner With Us', href: '#' },
    ],
  },
  {
    heading: 'Support',
    links: [
      { label: 'Help Center', href: '#' },
      { label: 'Booking Guide', href: '#' },
      { label: 'Cancellations', href: '#' },
      { label: 'Refund Policy', href: '#' },
      { label: 'Contact Us', href: 'mailto:support@cinebook.lk' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About CineBook', href: '#' },
      { label: 'Press & Media', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Investors', href: '#' },
      { label: 'Blog', href: '#' },
    ],
  },
];

// ─── Social Icons (SVG) ──────────────────────────

const SocialIcons = {
  Instagram: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  ),
  Twitter: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.766l7.73-8.835L1.254 2.25H8.08l4.259 5.63L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/>
    </svg>
  ),
  Youtube: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  ),
  Facebook: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  ),
};

const SOCIAL_LINKS: { Icon: React.FC; label: string; href: string }[] = [
  { Icon: SocialIcons.Instagram, label: 'Instagram', href: '#' },
  { Icon: SocialIcons.Twitter, label: 'Twitter / X', href: '#' },
  { Icon: SocialIcons.Youtube, label: 'YouTube', href: '#' },
  { Icon: SocialIcons.Facebook, label: 'Facebook', href: '#' },
];

// ─────────────────────────────────────────────────
// Footer Component
// ─────────────────────────────────────────────────

/**
 * Premium application footer with navigation columns,
 * newsletter signup, social links, and app badges.
 */
const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 4000);
  };

  return (
    <footer className="relative overflow-hidden" role="contentinfo">
      {/* Gradient top border */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, #FF4D00, #7C3AED, #06B6D4, transparent)' }}
      />

      {/* Background */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #060c1c, #030712)' }} />

      {/* Subtle glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] rounded-full blur-[160px] opacity-5"
        style={{ background: 'radial-gradient(circle, #FF4D00, #7C3AED)' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Top Section ── */}
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-10 py-14 border-b border-white/5">

          {/* Brand Column (2 cols wide) */}
          <div className="lg:col-span-2 space-y-5">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5" aria-label="CineBook home">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, #FF4D00, #FF6A00)',
                  boxShadow: '0 0 16px rgba(255,77,0,0.35)',
                }}
              >
                <Film size={18} className="text-white" />
              </div>
              <span className="text-white font-black text-xl tracking-tight">
                Cine
                <span
                  style={{
                    background: 'linear-gradient(90deg, #FF6A00, #9333EA)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Book
                </span>
              </span>
            </Link>

            <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
              Sri Lanka's premium movie ticket booking platform. Cinematic experiences, delivered to your pocket.
            </p>

            {/* Contact info */}
            <div className="space-y-2 text-sm text-slate-500">
              <a href="mailto:support@cinebook.lk" className="flex items-center gap-2 hover:text-white transition-colors">
                <Mail size={13} className="text-orange-400/70" />
                support@cinebook.lk
              </a>
              <div className="flex items-center gap-2">
                <Phone size={13} className="text-orange-400/70" />
                +94 11 234 5678
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={13} className="text-orange-400/70" />
                Colombo 02, Sri Lanka
              </div>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-2">
              {SOCIAL_LINKS.map(({ Icon, label, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-500 hover:text-white border border-white/8 hover:border-white/20 hover:bg-white/5 transition-all duration-200"
                >
                  <Icon />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Nav Columns (4 cols) */}
          <div className="lg:col-span-4 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {FOOTER_COLUMNS.map((col) => (
              <div key={col.heading}>
                <h3 className="text-white font-bold text-sm mb-4">{col.heading}</h3>
                <ul className="space-y-2.5">
                  {col.links.map(({ label, href }) => (
                    <li key={label}>
                      <a
                        href={href}
                        className="text-slate-500 hover:text-white text-sm transition-colors duration-200"
                      >
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ── Newsletter + App Download ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-10 border-b border-white/5">

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-bold text-sm mb-1">Stay in the Loop 🎬</h3>
            <p className="text-slate-500 text-sm mb-4">
              Premiere alerts, exclusive offers, and behind-the-scenes drops — straight to your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <div className="relative flex-1">
                <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl text-white text-sm placeholder-slate-600 outline-none focus:ring-1 focus:ring-orange-500/40 transition-all"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                  aria-label="Email for newsletter"
                />
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-4 py-3 rounded-xl text-white font-semibold text-sm flex items-center gap-2 transition-all flex-shrink-0"
                style={{
                  background: subscribed
                    ? 'rgba(16,185,129,0.2)'
                    : 'linear-gradient(135deg, #FF4D00, #FF6A00)',
                  border: subscribed ? '1px solid rgba(16,185,129,0.4)' : 'none',
                }}
              >
                {subscribed ? (
                  <>
                    <Check size={15} className="text-emerald-400" />
                    <span className="text-emerald-400">Done!</span>
                  </>
                ) : (
                  <>
                    <Send size={15} />
                    Subscribe
                  </>
                )}
              </motion.button>
            </form>
          </div>

          {/* App Download */}
          <div>
            <h3 className="text-white font-bold text-sm mb-1">Download the App</h3>
            <p className="text-slate-500 text-sm mb-4">
              Book in seconds from your phone. Available on iOS and Android.
            </p>
            <div className="flex gap-3">
              {[
                { store: 'App Store', emoji: '🍎', sub: 'Download on the' },
                { store: 'Google Play', emoji: '🤖', sub: 'Get it on' },
              ].map(({ store, emoji, sub }) => (
                <motion.button
                  key={store}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2.5 px-4 py-3 rounded-xl border border-white/10 hover:border-white/20 transition-all"
                  style={{ background: 'rgba(255,255,255,0.04)' }}
                >
                  <span className="text-xl">{emoji}</span>
                  <div className="text-left">
                    <p className="text-slate-500 text-[9px] font-medium leading-none mb-0.5">{sub}</p>
                    <p className="text-white font-bold text-xs">{store}</p>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Bottom Bar ── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 py-6 text-slate-600 text-xs">
          <p>© {new Date().getFullYear()} CineBook Pvt. Ltd. All rights reserved.</p>
          <div className="flex items-center gap-5">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Sitemap'].map((link) => (
              <a key={link} href="#" className="hover:text-slate-400 transition-colors">
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
