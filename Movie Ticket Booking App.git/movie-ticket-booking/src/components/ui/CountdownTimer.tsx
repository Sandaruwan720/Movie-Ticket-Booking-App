/**
 * ==================================================
 * CountdownTimer Component
 * --------------------------------------------------
 * Live countdown to a target date displaying:
 * Days, Hours, Minutes, Seconds
 * With glass card styling and smooth transitions.
 * ==================================================
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CountdownTimerProps {
  targetDate: string; // ISO date string
  compact?: boolean;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

/**
 * Calculates remaining time from now to a target ISO date string.
 */
function calculateTimeLeft(targetDate: string): TimeLeft {
  const diff = new Date(targetDate).getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / 1000 / 60) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

/** Individual countdown unit block */
const CountUnit: React.FC<{ value: number; label: string; compact?: boolean }> = ({
  value,
  label,
  compact,
}) => (
  <div className="flex flex-col items-center">
    <div
      className={`relative rounded-lg flex items-center justify-center overflow-hidden ${compact ? 'w-9 h-9' : 'w-14 h-14'}`}
      style={{
        background: 'rgba(255,255,255,0.06)',
        border: '1px solid rgba(255,255,255,0.1)',
        backdropFilter: 'blur(12px)',
      }}
    >
      <AnimatePresence mode="popLayout">
        <motion.span
          key={value}
          initial={{ y: -12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 12, opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className={`font-black text-white tabular-nums ${compact ? 'text-sm' : 'text-2xl'}`}
        >
          {String(value).padStart(2, '0')}
        </motion.span>
      </AnimatePresence>
    </div>
    {!compact && (
      <span className="text-slate-500 text-[10px] font-medium mt-1 uppercase tracking-wider">
        {label}
      </span>
    )}
  </div>
);

/**
 * Live countdown timer with animated digit transitions.
 *
 * @param targetDate - ISO date string to count down to
 * @param compact - Show compact version without labels
 */
const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate, compact = false }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => calculateTimeLeft(targetDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const units: { value: number; label: string }[] = [
    { value: timeLeft.days, label: 'Days' },
    { value: timeLeft.hours, label: 'Hrs' },
    { value: timeLeft.minutes, label: 'Min' },
    { value: timeLeft.seconds, label: 'Sec' },
  ];

  return (
    <div className={`flex items-center ${compact ? 'gap-1.5' : 'gap-2'}`}>
      {units.map(({ value, label }, i) => (
        <React.Fragment key={label}>
          <CountUnit value={value} label={label} compact={compact} />
          {i < 3 && (
            <span className={`font-black text-slate-600 ${compact ? 'text-sm' : 'text-xl'} mb-4`}>
              :
            </span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default CountdownTimer;
