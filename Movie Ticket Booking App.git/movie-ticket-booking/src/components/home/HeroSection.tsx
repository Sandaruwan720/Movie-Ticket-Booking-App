/**
 * ==================================================
 * HeroSection Component — Section 01
 * --------------------------------------------------
 * Full-screen cinematic hero (100vh) featuring:
 * - Layered animated background (gradient + orbs + particles)
 * - Featured movie details with animated entrance
 * - Book Now / Watch Trailer / Wishlist CTAs
 * - Live statistics bar
 * - Scrolling indicator
 * ==================================================
 */

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Star, Clock, Film, Zap, Play, Heart, ChevronDown, Users, Ticket, MapPin } from 'lucide-react';
import { FEATURED_MOVIE } from '../../data/movies';
import { LIVE_STATS } from '../../data/homeData';

// ─── Particle Canvas ──────────────────────────────

const ParticleCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animId: number;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener('resize', resize);
    const particles = Array.from({ length: 50 }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      size: Math.random() * 1.5 + 0.3, speedX: (Math.random() - 0.5) * 0.2,
      speedY: (Math.random() - 0.5) * 0.2, opacity: Math.random() * 0.4 + 0.1,
      phase: Math.random() * Math.PI * 2, color: ['#FF6A00', '#7C3AED', '#06B6D4', '#FFFFFF'][Math.floor(Math.random() * 4)],
    }));
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.speedX; p.y += p.speedY; p.phase += 0.01;
        if (p.x < 0) p.x = canvas.width; if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height; if (p.y > canvas.height) p.y = 0;
        const alpha = p.opacity * (0.5 + 0.5 * Math.sin(p.phase));
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.round(alpha * 255).toString(16).padStart(2, '0');
        ctx.fill();
      });
      animId = requestAnimationFrame(animate);
    };
    animate();
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" aria-hidden="true" />;
};

// ─── Stat Item ────────────────────────────────────

const StatItem: React.FC<{ icon: React.ReactNode; value: string; label: string }> = ({ icon, value, label }) => (
  <div className="flex items-center gap-2">
    <div className="text-orange-400">{icon}</div>
    <div>
      <p className="text-white font-bold text-sm leading-none">{value}</p>
      <p className="text-slate-500 text-[11px]">{label}</p>
    </div>
  </div>
);

// ─────────────────────────────────────────────────
// HeroSection Component
// ─────────────────────────────────────────────────

const HeroSection: React.FC = () => {
  const movie = FEATURED_MOVIE;

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
  };

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden" aria-label="Featured movie hero">
      {/* ── Background Layers ── */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#030712] via-[#0a0f1e] to-[#0F172A]" />

      {/* Movie-colored glow */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.25, 0.4, 0.25] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-32 -right-32 w-[700px] h-[700px] rounded-full blur-[120px]"
        style={{ background: `${movie.accentColor}30` }}
      />
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full blur-[100px]"
        style={{ background: 'rgba(255,106,0,0.2)' }}
      />

      {/* Particles */}
      <div className="absolute inset-0"><ParticleCanvas /></div>

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#030712] to-transparent" />

      {/* ── Content ── */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8 w-full">
          <div className="grid lg:grid-cols-2 gap-10 items-center">

            {/* Left: Text Content */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              {/* Category badge */}
              <motion.div variants={fadeUp} className="flex items-center gap-3 flex-wrap">
                <span
                  className="text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-widest"
                  style={{ background: 'rgba(255,77,0,0.15)', border: '1px solid rgba(255,77,0,0.35)', color: '#FF6A00' }}
                >
                  🔥 Featured Film
                </span>
                <div className="flex items-center gap-1.5">
                  {movie.genres.map((g) => (
                    <span key={g} className="text-xs text-slate-400 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full">
                      {g}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Title */}
              <motion.h1
                variants={fadeUp}
                className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight"
              >
                <span className="text-white">{movie.title.split(' ')[0]} </span>
                <span style={{
                  background: 'linear-gradient(135deg, #FF4D00 0%, #FF6A00 40%, #9333EA 100%)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                }}>
                  {movie.title.split(' ').slice(1).join(' ')}
                </span>
              </motion.h1>

              {/* Tagline */}
              <motion.p variants={fadeUp} className="text-slate-300 text-lg italic font-light">
                "{movie.tagline}"
              </motion.p>

              {/* Meta row */}
              <motion.div variants={fadeUp} className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-1.5">
                  <Star size={16} className="text-amber-400 fill-amber-400" />
                  <span className="text-amber-400 font-bold text-lg">{movie.rating}</span>
                  <span className="text-slate-500 text-sm">/10 IMDb</span>
                </div>
                <span className="w-px h-5 bg-slate-700" />
                <div className="flex items-center gap-1.5 text-slate-400 text-sm">
                  <Clock size={14} />
                  {Math.floor(movie.duration / 60)}h {movie.duration % 60}m
                </div>
                <span className="w-px h-5 bg-slate-700" />
                <span className="text-slate-400 text-sm border border-slate-700 px-2 py-0.5 rounded">
                  {movie.certificate}
                </span>
                <span className="w-px h-5 bg-slate-700" />
                <div className="flex items-center gap-1.5 text-slate-400 text-sm">
                  <Film size={14} />
                  {movie.availableCinemas} Cinemas
                </div>
              </motion.div>

              {/* Description */}
              <motion.p variants={fadeUp} className="text-slate-400 text-base leading-relaxed max-w-lg">
                {movie.description}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div variants={fadeUp} className="flex items-center gap-3 flex-wrap">
                <motion.button
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-2.5 px-7 py-4 rounded-2xl text-white font-bold text-base transition-all"
                  style={{
                    background: 'linear-gradient(135deg, #FF4D00, #FF6A00)',
                    boxShadow: '0 0 30px rgba(255,77,0,0.4)',
                  }}
                >
                  <Zap size={18} />
                  Book Now — LKR {movie.price.standard.toLocaleString()}
                </motion.button>

                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-2.5 px-6 py-4 rounded-2xl text-white font-semibold text-base border border-white/15 hover:border-white/30 transition-all"
                  style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(12px)' }}
                >
                  <Play size={16} className="fill-white" />
                  Watch Trailer
                </motion.button>

                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-slate-400 hover:text-red-400 border border-white/10 hover:border-red-500/30 transition-all"
                  style={{ background: 'rgba(255,255,255,0.05)' }}
                  aria-label="Add to wishlist"
                >
                  <Heart size={18} />
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Right: Poster */}
            <motion.div
              initial={{ opacity: 0, x: 40, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
              className="hidden lg:flex justify-center"
            >
              <motion.div
                animate={{ y: [0, -16, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="relative"
              >
                {/* Poster card */}
                <div
                  className="w-72 h-[420px] rounded-3xl overflow-hidden relative"
                  style={{
                    background: movie.posterGradient,
                    boxShadow: `0 40px 80px rgba(0,0,0,0.6), 0 0 60px ${movie.accentColor}30`,
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[120px] select-none drop-shadow-2xl">{movie.posterEmoji}</span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Rating overlay */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full" style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(12px)' }}>
                      <Star size={12} className="text-amber-400 fill-amber-400" />
                      <span className="text-amber-400 font-bold text-sm">{movie.rating}/10</span>
                    </div>
                    <div className="px-3 py-1.5 rounded-full text-xs font-bold text-white" style={{ background: movie.accentColor }}>
                      {movie.badge}
                    </div>
                  </div>
                </div>

                {/* Booking count badge */}
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -bottom-4 -right-4 px-4 py-2 rounded-2xl"
                  style={{ background: 'rgba(255,77,0,0.15)', border: '1px solid rgba(255,77,0,0.3)', backdropFilter: 'blur(12px)' }}
                >
                  <p className="text-orange-400 font-black text-lg leading-none">{(movie.bookingsCount / 1000).toFixed(1)}K</p>
                  <p className="text-slate-400 text-[10px]">Bookings</p>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Live Stats Bar ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="relative z-10 border-t border-white/5"
        style={{ background: 'rgba(3,7,18,0.8)', backdropFilter: 'blur(20px)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <StatItem icon={<Ticket size={15} />} value={LIVE_STATS.screeningsToday} label="Screenings today" />
            <div className="h-6 w-px bg-white/10 hidden sm:block" />
            <StatItem icon={<Users size={15} />} value={LIVE_STATS.totalBookings} label="Total bookings" />
            <div className="h-6 w-px bg-white/10 hidden sm:block" />
            <StatItem icon={<Film size={15} />} value={LIVE_STATS.moviesAvailable} label="Movies available" />
            <div className="h-6 w-px bg-white/10 hidden sm:block" />
            <StatItem icon={<MapPin size={15} />} value={LIVE_STATS.cinemasPartners} label="Partner cinemas" />

            {/* Seats filled meter */}
            <div className="flex items-center gap-3 ml-auto">
              <span className="text-slate-500 text-xs">Seats filling up</span>
              <div className="w-32 h-1.5 rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${LIVE_STATS.seatsFilledPercent}%` }}
                  transition={{ duration: 1.5, delay: 1, ease: 'easeOut' }}
                  className="h-full rounded-full"
                  style={{ background: 'linear-gradient(90deg, #FF4D00, #FF6A00)' }}
                />
              </div>
              <span className="text-orange-400 text-xs font-bold">{LIVE_STATS.seatsFilledPercent}%</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── Scroll Indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-24 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 hidden lg:flex"
        aria-hidden="true"
      >
        <span className="text-slate-600 text-xs font-medium">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={18} className="text-slate-600" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
