/**
 * ==================================================
 * SeatExperienceSection Component — Section 09
 * --------------------------------------------------
 * Interactive mini seat map preview that:
 * - Displays a 5-row × 10-seat cinema layout
 * - Color-codes: Available, Reserved, VIP, Selected
 * - Allows clicking to toggle seat selection
 * - Shows selected seat count + total price
 * - "Book Selected" CTA
 * ==================================================
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader';
import { SAMPLE_SEATS } from '../../data/homeData';
import type { Seat } from '../../types/movie';

// ─── Seat Legend ──────────────────────────────────

const LEGEND = [
  { label: 'Available', color: 'bg-emerald-500/20 border-emerald-500/40', dot: '#10B981' },
  { label: 'Reserved', color: 'bg-slate-700/50 border-slate-600/30', dot: '#475569' },
  { label: 'VIP', color: 'bg-amber-500/20 border-amber-500/40', dot: '#F59E0B' },
  { label: 'Selected', color: 'bg-orange-500/30 border-orange-500/60', dot: '#FF6A00' },
];

// ─── Seat Button ──────────────────────────────────

const SeatButton: React.FC<{
  seat: Seat;
  isSelected: boolean;
  onToggle: (id: string) => void;
}> = ({ seat, isSelected, onToggle }) => {
  const isReserved = seat.status === 'reserved';
  const isVip = seat.status === 'vip';

  const getStyle = () => {
    if (isSelected) return { bg: 'rgba(255,106,0,0.35)', border: 'rgba(255,106,0,0.7)', shadow: '0 0 8px rgba(255,77,0,0.4)' };
    if (isReserved) return { bg: 'rgba(71,85,105,0.3)', border: 'rgba(71,85,105,0.4)', shadow: 'none' };
    if (isVip) return { bg: 'rgba(245,158,11,0.15)', border: 'rgba(245,158,11,0.35)', shadow: 'none' };
    return { bg: 'rgba(16,185,129,0.12)', border: 'rgba(16,185,129,0.35)', shadow: 'none' };
  };

  const style = getStyle();

  return (
    <motion.button
      whileHover={!isReserved ? { scale: 1.15 } : {}}
      whileTap={!isReserved ? { scale: 0.9 } : {}}
      onClick={() => !isReserved && onToggle(seat.id)}
      disabled={isReserved}
      className="w-7 h-7 rounded-md border transition-all duration-150 relative"
      style={{
        background: style.bg,
        borderColor: style.border,
        boxShadow: style.shadow,
        cursor: isReserved ? 'not-allowed' : 'pointer',
      }}
      aria-label={`Seat ${seat.row}${seat.number} — ${isSelected ? 'selected' : seat.status}`}
      title={`${seat.row}${seat.number} | LKR ${seat.price}`}
    >
      {/* VIP crown */}
      {isVip && !isSelected && (
        <span className="absolute inset-0 flex items-center justify-center text-[8px] text-amber-400">♛</span>
      )}
    </motion.button>
  );
};

// ─────────────────────────────────────────────────
// SeatExperienceSection Component
// ─────────────────────────────────────────────────

/**
 * Interactive seat map preview reducing booking hesitation
 * by letting users experience the seat selection flow.
 */
const SeatExperienceSection: React.FC = () => {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Group seats by row
  const rows = ['A', 'B', 'C', 'D', 'E'];
  const seatsByRow: Record<string, Seat[]> = {};
  rows.forEach((row) => {
    seatsByRow[row] = SAMPLE_SEATS.filter((s) => s.row === row);
  });

  const selectedSeats = SAMPLE_SEATS.filter((s) => selectedIds.has(s.id));
  const totalPrice = selectedSeats.reduce((sum, s) => sum + s.price, 0);

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #030712, #080e1e, #030712)' }} />
      <motion.div
        animate={{ opacity: [0.05, 0.12, 0.05] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <div className="w-[600px] h-[600px] rounded-full blur-[160px]"
          style={{ background: 'radial-gradient(circle, #FF4D00, transparent)' }} />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Try Before You Book"
          title="Live Seat Experience"
          subtitle="Browse the seat map before you commit. Click a seat to select it — just like the real booking."
          centered
        />

        <div className="flex flex-col items-center gap-8 mt-6">
          {/* Screen indicator */}
          <div className="w-full max-w-md">
            <div
              className="h-2 rounded-full mb-2"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)' }}
            />
            <p className="text-center text-slate-600 text-xs tracking-widest font-medium uppercase">Screen</p>
          </div>

          {/* Seat Map */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl p-6 sm:p-8"
            style={{
              background: 'rgba(255,255,255,0.025)',
              border: '1px solid rgba(255,255,255,0.07)',
              backdropFilter: 'blur(20px)',
            }}
          >
            <div className="space-y-3">
              {rows.map((row) => (
                <div key={row} className="flex items-center gap-3">
                  <span className="text-slate-600 font-mono text-sm w-4 text-right">{row}</span>
                  <div className="flex gap-1.5 flex-wrap">
                    {seatsByRow[row]?.map((seat) => (
                      <SeatButton
                        key={seat.id}
                        seat={seat}
                        isSelected={selectedIds.has(seat.id)}
                        onToggle={toggle}
                      />
                    ))}
                  </div>
                </div>
              ))}

              {/* Seat numbers */}
              <div className="flex items-center gap-3 mt-2">
                <span className="w-4" />
                <div className="flex gap-1.5 flex-wrap">
                  {Array.from({ length: 10 }, (_, i) => (
                    <span key={i} className="w-7 text-center text-slate-700 text-[10px] font-mono">
                      {i + 1}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Legend */}
          <div className="flex items-center gap-5 flex-wrap justify-center">
            {LEGEND.map(({ label, dot }) => (
              <div key={label} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm" style={{ background: dot + '30', border: `1px solid ${dot}60` }}>
                  {label === 'VIP' && <span className="flex items-center justify-center text-[6px]" style={{ color: dot }}>♛</span>}
                </div>
                <span className="text-slate-400 text-xs">{label}</span>
              </div>
            ))}
          </div>

          {/* Selection summary */}
          <AnimatePresence>
            {selectedIds.size > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 16, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -16, scale: 0.95 }}
                className="flex items-center gap-4 p-5 rounded-2xl"
                style={{
                  background: 'rgba(255,77,0,0.10)',
                  border: '1px solid rgba(255,77,0,0.25)',
                  backdropFilter: 'blur(16px)',
                }}
              >
                <div>
                  <p className="text-white font-bold">
                    {selectedIds.size} seat{selectedIds.size > 1 ? 's' : ''} selected
                  </p>
                  <p className="text-slate-400 text-sm">
                    Total: <span className="text-orange-400 font-bold">LKR {totalPrice.toLocaleString()}</span>
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl text-white font-bold text-sm ml-auto"
                  style={{ background: 'linear-gradient(135deg, #FF4D00, #FF6A00)' }}
                >
                  <Zap size={15} />
                  Continue Booking
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default SeatExperienceSection;
