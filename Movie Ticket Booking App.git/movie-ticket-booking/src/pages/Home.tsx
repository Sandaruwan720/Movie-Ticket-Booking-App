/**
 * ==================================================
 * Home Page — CineBook Homepage
 * --------------------------------------------------
 * Assembles all 14 cinematic sections in order:
 *  01. HeroSection          — 100vh featured film
 *  02. NowShowingSection    — Current releases carousel
 *  03. TrendingSection      — Netflix-style trending rail
 *  04. ComingSoonSection    — Upcoming releases + countdown
 *  05. CinemaExperienceSection — IMAX / Dolby / VIP cards
 *  06. CitySelectorSection  — City localization
 *  07. TopCinemasSection    — Partner cinema cards
 *  08. SpecialOffersSection — Discount banners
 *  09. SeatExperienceSection— Interactive seat map
 *  10. WhyChooseUsSection   — Platform features
 *  11. MobileAppSection     — App download promo
 *  12. ReviewsSection       — Auto-scroll reviews
 *  13. FAQSection           — Animated FAQ accordion
 *  14. Footer               — Full-width footer
 *
 * Also includes:
 * - Navbar (persistent, scroll-reactive)
 * - Back-to-top button
 * ==================================================
 */

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp } from 'lucide-react';

// ── Layout ───────────────────────────────────────
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

// ── Sections ─────────────────────────────────────
import HeroSection from '../components/home/HeroSection';
import NowShowingSection from '../components/home/NowShowingSection';
import TrendingSection from '../components/home/TrendingSection';
import ComingSoonSection from '../components/home/ComingSoonSection';
import CinemaExperienceSection from '../components/home/CinemaExperienceSection';
import CitySelectorSection from '../components/home/CitySelectorSection';
import TopCinemasSection from '../components/home/TopCinemasSection';
import SpecialOffersSection from '../components/home/SpecialOffersSection';
import SeatExperienceSection from '../components/home/SeatExperienceSection';
import WhyChooseUsSection from '../components/home/WhyChooseUsSection';
import MobileAppSection from '../components/home/MobileAppSection';
import ReviewsSection from '../components/home/ReviewsSection';
import FAQSection from '../components/home/FAQSection';

// ─────────────────────────────────────────────────
// Back-to-Top Button
// ─────────────────────────────────────────────────

/**
 * Floating scroll-to-top button that appears after scrolling 400px.
 */
const BackToTopButton: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          transition={{ duration: 0.25 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 w-11 h-11 rounded-2xl flex items-center justify-center shadow-lg transition-all hover:scale-110 active:scale-95"
          style={{
            background: 'linear-gradient(135deg, #FF4D00, #FF6A00)',
            boxShadow: '0 0 20px rgba(255,77,0,0.4)',
          }}
          aria-label="Back to top"
        >
          <ChevronUp size={18} className="text-white" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

// ─────────────────────────────────────────────────
// Home Page Component
// ─────────────────────────────────────────────────

/**
 * Full CineBook homepage — assembles all 14 sections
 * with Navbar, back-to-top, and seamless dark theme.
 */
const Home: React.FC = () => {
  // Update document title
  useEffect(() => {
    document.title = 'CineBook — Premium Movie Ticket Booking in Sri Lanka';
  }, []);

  return (
    <div className="min-h-screen bg-[#030712] text-white overflow-x-hidden">
      {/* Persistent navbar */}
      <Navbar />

      {/* ── Sections ── */}
      <main id="main-content">
        {/* 01 */ }
        <HeroSection />

        {/* 02 */}
        <NowShowingSection />

        {/* 03 */}
        <TrendingSection />

        {/* 04 */}
        <ComingSoonSection />

        {/* 05 */}
        <CinemaExperienceSection />

        {/* 06 */}
        <CitySelectorSection />

        {/* 07 */}
        <TopCinemasSection />

        {/* 08 */}
        <SpecialOffersSection />

        {/* 09 */}
        <SeatExperienceSection />

        {/* 10 */}
        <WhyChooseUsSection />

        {/* 11 */}
        <MobileAppSection />

        {/* 12 */}
        <ReviewsSection />

        {/* 13 */}
        <FAQSection />
      </main>

      {/* 14 — Footer */}
      <Footer />

      {/* Floating back-to-top */}
      <BackToTopButton />
    </div>
  );
};

export default Home;
