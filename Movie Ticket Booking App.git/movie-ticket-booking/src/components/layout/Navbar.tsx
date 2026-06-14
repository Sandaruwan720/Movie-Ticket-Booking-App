/**
 * ==================================================
 * Navbar Component
 * --------------------------------------------------
 * Premium persistent navigation bar with:
 * - Transparent on top → frosted glass on scroll
 * - Logo + brand name
 * - Desktop nav links
 * - City selector dropdown
 * - Search, notification, user menu icons
 * - Mobile hamburger menu with slide-in drawer
 * - Framer Motion scroll + mobile animations
 * ==================================================
 */

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Film, Search, Bell, Menu, X, MapPin, ChevronDown,
  Ticket, User, LogOut, Settings, Heart,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

// ─── Nav Links ────────────────────────────────────

const NAV_LINKS = [
  { label: 'Movies', href: '/#now-showing' },
  { label: 'Cinemas', href: '/#cinemas' },
  { label: 'Offers', href: '/#offers' },
  { label: 'Experience', href: '/#experience' },
];

// ─────────────────────────────────────────────────
// Navbar Component
// ─────────────────────────────────────────────────

/**
 * Main application navbar. Transitions from transparent to
 * frosted glass as the user scrolls down the page.
 */
const Navbar: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState('Colombo');
  const [cityOpen, setCityOpen] = useState(false);

  const cities = ['Colombo', 'Kandy', 'Galle', 'Jaffna', 'Negombo'];

  // ── Scroll Effect ─────────────────────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ── Close menus on route change ───────────────
  useEffect(() => {
    setMobileOpen(false);
    setUserMenuOpen(false);
    setCityOpen(false);
  }, [location]);

  return (
    <>
      {/* ── Main Navbar ── */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={
          scrolled
            ? {
                background: 'rgba(3,7,18,0.92)',
                backdropFilter: 'blur(24px)',
                borderBottom: '1px solid rgba(255,255,255,0.07)',
                boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
              }
            : { background: 'transparent' }
        }
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* ── Logo ── */}
            <Link to="/" className="flex items-center gap-2.5 flex-shrink-0">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, #FF4D00, #FF6A00)',
                  boxShadow: '0 0 16px rgba(255,77,0,0.4)',
                }}
              >
                <Film size={16} className="text-white" />
              </div>
              <span className="text-white font-black text-lg tracking-tight">
                Cine<span style={{
                  background: 'linear-gradient(90deg, #FF6A00, #9333EA)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>Book</span>
              </span>
            </Link>

            {/* ── Desktop Nav Links ── */}
            <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
              {NAV_LINKS.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-all duration-200"
                >
                  {label}
                </a>
              ))}
            </nav>

            {/* ── Right Actions ── */}
            <div className="flex items-center gap-2">
              {/* City Selector */}
              <div className="relative hidden sm:block">
                <button
                  onClick={() => setCityOpen(!cityOpen)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-all duration-200"
                  aria-expanded={cityOpen}
                  aria-haspopup="listbox"
                >
                  <MapPin size={13} className="text-orange-400" />
                  <span>{selectedCity}</span>
                  <ChevronDown
                    size={13}
                    className={`transition-transform duration-200 ${cityOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                <AnimatePresence>
                  {cityOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      role="listbox"
                      className="absolute top-full right-0 mt-2 w-40 rounded-xl overflow-hidden py-1"
                      style={{
                        background: 'rgba(15,23,42,0.98)',
                        backdropFilter: 'blur(24px)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        boxShadow: '0 16px 40px rgba(0,0,0,0.4)',
                      }}
                    >
                      {cities.map((city) => (
                        <button
                          key={city}
                          role="option"
                          aria-selected={selectedCity === city}
                          onClick={() => { setSelectedCity(city); setCityOpen(false); }}
                          className={`w-full text-left px-4 py-2 text-sm transition-colors duration-150 ${
                            selectedCity === city
                              ? 'text-orange-400 bg-orange-500/10'
                              : 'text-slate-300 hover:bg-white/5 hover:text-white'
                          }`}
                        >
                          {city}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Search */}
              <button
                className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/5 transition-all duration-200"
                aria-label="Search movies"
              >
                <Search size={17} />
              </button>

              {/* Notifications */}
              {currentUser && (
                <button
                  className="relative w-9 h-9 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/5 transition-all duration-200"
                  aria-label="Notifications"
                >
                  <Bell size={17} />
                  <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-orange-500" />
                </button>
              )}

              {/* User Menu / Auth */}
              {currentUser ? (
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="w-9 h-9 rounded-lg flex items-center justify-center overflow-hidden border border-white/10 hover:border-white/25 transition-all duration-200"
                    style={{ background: 'rgba(255,77,0,0.15)' }}
                    aria-label="User menu"
                    aria-expanded={userMenuOpen}
                  >
                    <span className="text-sm font-bold text-orange-400">
                      {(currentUser.displayName?.[0] ?? currentUser.email?.[0] ?? 'U').toUpperCase()}
                    </span>
                  </button>

                  <AnimatePresence>
                    {userMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full right-0 mt-2 w-52 rounded-xl overflow-hidden"
                        style={{
                          background: 'rgba(15,23,42,0.98)',
                          backdropFilter: 'blur(24px)',
                          border: '1px solid rgba(255,255,255,0.1)',
                          boxShadow: '0 16px 40px rgba(0,0,0,0.4)',
                        }}
                      >
                        {/* User info */}
                        <div className="px-4 py-3 border-b border-white/5">
                          <p className="text-white font-semibold text-sm truncate">
                            {currentUser.displayName ?? 'Movie Fan'}
                          </p>
                          <p className="text-slate-500 text-xs truncate">{currentUser.email}</p>
                        </div>

                        {/* Menu items */}
                        {[
                          { icon: Ticket, label: 'My Bookings', href: '#' },
                          { icon: Heart, label: 'Wishlist', href: '#' },
                          { icon: Settings, label: 'Settings', href: '#' },
                        ].map(({ icon: Icon, label, href }) => (
                          <a
                            key={label}
                            href={href}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors duration-150"
                          >
                            <Icon size={15} className="text-slate-500" />
                            {label}
                          </a>
                        ))}

                        <div className="border-t border-white/5 mt-1">
                          <button
                            onClick={() => { logout(); setUserMenuOpen(false); }}
                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 transition-colors duration-150"
                          >
                            <LogOut size={15} />
                            Sign Out
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all duration-200"
                  style={{
                    background: 'linear-gradient(135deg, #FF4D00, #FF6A00)',
                    boxShadow: '0 0 16px rgba(255,77,0,0.25)',
                  }}
                >
                  <User size={14} />
                  Sign In
                </Link>
              )}

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden w-9 h-9 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/5 transition-all duration-200"
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              >
                {mobileOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* ── Mobile Drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 md:hidden"
              style={{
                background: 'rgba(10,15,30,0.98)',
                backdropFilter: 'blur(24px)',
                borderLeft: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
                <span className="text-white font-bold">Menu</span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/5"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Drawer links */}
              <nav className="px-4 py-4 space-y-1">
                {NAV_LINKS.map(({ label, href }, i) => (
                  <motion.a
                    key={label}
                    href={href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 font-medium text-sm transition-all"
                  >
                    {label}
                  </motion.a>
                ))}
              </nav>

              {/* City selector in drawer */}
              <div className="px-4 py-2">
                <p className="text-xs text-slate-600 font-medium uppercase tracking-widest mb-2 px-4">
                  City
                </p>
                <div className="flex flex-wrap gap-2 px-2">
                  {cities.map((city) => (
                    <button
                      key={city}
                      onClick={() => setSelectedCity(city)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                        selectedCity === city
                          ? 'border-orange-500/50 bg-orange-500/15 text-orange-400'
                          : 'border-white/10 text-slate-400 hover:border-white/20 hover:text-white'
                      }`}
                    >
                      {city}
                    </button>
                  ))}
                </div>
              </div>

              {/* Auth in drawer */}
              {!currentUser && (
                <div className="px-5 pt-4 mt-2 border-t border-white/5">
                  <Link
                    to="/login"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-bold text-white"
                    style={{ background: 'linear-gradient(135deg, #FF4D00, #FF6A00)' }}
                  >
                    Sign In
                  </Link>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
