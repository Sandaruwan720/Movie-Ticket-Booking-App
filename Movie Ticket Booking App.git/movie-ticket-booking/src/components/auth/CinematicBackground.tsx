/**
 * ==================================================
 * CinematicBackground Component
 * --------------------------------------------------
 * Creates an 8-layer animated cinematic background:
 *
 * Layer 1: Dark gradient base (#030712 → #0F172A)
 * Layer 2: Blurred gradient orbs (orange, purple, cyan)
 * Layer 3: Aurora shimmer effect
 * Layer 4: Floating animated particles (canvas)
 * Layer 5: Low-opacity grid pattern
 * Layer 6: Glass overlay
 * Layer 7: Noise texture (SVG filter)
 * Layer 8: Cinematic spotlight vignette
 *
 * Background feels alive without being distracting.
 * ==================================================
 */

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

// ─────────────────────────────────────────────────
// Particle Canvas System
// ─────────────────────────────────────────────────

/**
 * Renders Layer 4: animated floating particles using HTML5 Canvas.
 * Particles drift and twinkle to create a cinematic depth effect.
 */
const ParticleCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;

    // Resize canvas to fill container
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Generate particles
    const PARTICLE_COUNT = 60;
    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 3.5 + 1.3,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.5 + 0.1,
      twinkleSpeed: Math.random() * 0.015 + 0.005,
      twinklePhase: Math.random() * Math.PI * 2,
      color: ['#FF6A00', '#7C3AED', '#06B6D4', '#FFFFFF'][Math.floor(Math.random() * 4)],
    }));

    /** Animation loop */
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        // Update position
        p.x += p.speedX;
        p.y += p.speedY;
        p.twinklePhase += p.twinkleSpeed;

        // Wrap around edges
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Twinkle effect
        const alpha = p.opacity * (0.5 + 0.5 * Math.sin(p.twinklePhase));

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.round(alpha * 255).toString(16).padStart(2, '0');
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    />
  );
};

// ─────────────────────────────────────────────────
// CinematicBackground Component
// ─────────────────────────────────────────────────

/**
 * Full-screen 8-layer cinematic background system.
 * All layers are decorative and hidden from assistive technology.
 */
const CinematicBackground: React.FC = () => {
  return (
    <div
      className="fixed inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* ── Layer 1: Dark cinematic base gradient ── */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#030712] via-[#0a0f1e] to-[#0F172A]" />

      {/* ── Layer 2: Blurred gradient orbs ── */}
      {/* Orange glow — top left */}
      <motion.div
        animate={{
          x: [0, 30, 0],
          y: [0, -20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-48 -left-48 w-[600px] h-[600px] rounded-full bg-orange-600/20 blur-[100px]"
      />
      {/* Purple glow — top right */}
      <motion.div
        animate={{
          x: [0, -40, 0],
          y: [0, 30, 0],
          scale: [1, 0.9, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-violet-700/20 blur-[100px]"
      />
      {/* Cyan glow — bottom center */}
      <motion.div
        animate={{
          x: [0, 20, -20, 0],
          y: [0, -20, 20, 0],
          scale: [1, 1.15, 0.95, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-cyan-600/10 blur-[120px]"
      />
      {/* Deep orange — bottom left */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute bottom-[-100px] -left-32 w-[400px] h-[400px] rounded-full bg-orange-500/15 blur-[80px]"
      />

      {/* ── Layer 3: Aurora shimmer ── */}
      <motion.div
        animate={{
          opacity: [0.03, 0.07, 0.03],
          scaleX: [1, 1.05, 1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-orange-400 to-transparent blur-sm"
      />
      <motion.div
        animate={{
          opacity: [0.02, 0.05, 0.02],
          scaleX: [1, 0.95, 1],
        }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        className="absolute top-2/3 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-violet-400 to-transparent blur-sm"
      />

      {/* ── Layer 4: Floating particles (Canvas) ── */}
      <div className="absolute inset-0">
        <ParticleCanvas />
      </div>

      {/* ── Layer 5: Grid pattern ── */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* ── Layer 6: Glass overlay ── */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#030712]/40 via-transparent to-[#030712]/60" />

      {/* ── Layer 7: Noise texture ── */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.035] pointer-events-none" aria-hidden="true">
        <filter id="cinema-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#cinema-noise)" />
      </svg>

      {/* ── Layer 8: Cinematic spotlight vignette ── */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,106,0,0.06) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(3,7,18,0.6) 100%)',
        }}
      />
    </div>
  );
};

export default CinematicBackground;
