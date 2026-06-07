/**
 * ==================================================
 * Forgot Password Page
 * --------------------------------------------------
 * Password reset flow via Firebase Authentication:
 * - Email input with Zod validation
 * - Sends password reset email via Firebase
 * - Success state with animated confirmation
 * - Back to login navigation
 * - Full accessibility support
 * ==================================================
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, ArrowLeft, Film, AlertCircle, Send } from 'lucide-react';
import { FirebaseError } from 'firebase/app';
import AuthLayout from '../../components/auth/AuthLayout';
import PremiumInput from '../../components/ui/PremiumInput';
import PremiumButton from '../../components/ui/PremiumButton';
import { forgotPasswordSchema } from '../../lib/validations';
import type { ForgotPasswordFormData } from '../../lib/validations';
import { useAuth } from '../../context/AuthContext';

// ─────────────────────────────────────────────────
// Firebase Error Message Map
// ─────────────────────────────────────────────────

/**
 * Maps Firebase errors to friendly messages for the forgot password flow.
 *
 * @param error - FirebaseError from failed password reset attempt
 * @returns Human-readable error message
 */
const getFirebaseErrorMessage = (error: FirebaseError): string => {
  const messages: Record<string, string> = {
    'auth/user-not-found': 'No account found with this email address.',
    'auth/invalid-email': 'Please enter a valid email address.',
    'auth/too-many-requests': 'Too many requests. Please wait a moment and try again.',
    'auth/network-request-failed': 'Network error. Please check your connection.',
  };
  return messages[error.code] ?? 'Failed to send reset email. Please try again.';
};

// ─────────────────────────────────────────────────
// Animation Variants
// ─────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' as const } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

// ─────────────────────────────────────────────────
// Success State Component
// ─────────────────────────────────────────────────

/**
 * Animated success banner shown after the reset email is sent.
 *
 * @param email - The email address the reset link was sent to
 */
const ResetEmailSentBanner: React.FC<{ email: string }> = ({ email }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
    className="text-center space-y-5"
  >
    {/* Icon */}
    <div className="flex justify-center">
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center"
        style={{
          background: 'linear-gradient(135deg, rgba(255,106,0,0.2), rgba(3,7,18,0.8))',
          border: '1px solid rgba(255,106,0,0.3)',
          boxShadow: '0 0 30px rgba(255,77,0,0.2)',
        }}
      >
        <Send size={28} className="text-orange-400" />
      </div>
    </div>

    {/* Message */}
    <div>
      <h2 className="text-xl font-black text-white mb-2">Check Your Email</h2>
      <p className="text-slate-400 text-sm leading-relaxed">
        We&apos;ve sent a password reset link to{' '}
        <span className="text-white font-semibold">{email}</span>.
        <br />
        Check your inbox and follow the instructions.
      </p>
    </div>

    {/* Tip */}
    <div
      className="p-3.5 rounded-xl text-left"
      style={{
        background: 'rgba(255,106,0,0.06)',
        border: '1px solid rgba(255,106,0,0.15)',
      }}
    >
      <p className="text-slate-400 text-xs leading-relaxed">
        <span className="text-orange-400 font-semibold">Didn&apos;t receive it?</span>{' '}
        Check your spam folder, or wait a few minutes before requesting another link.
      </p>
    </div>

    {/* Back to Login */}
    <Link to="/login">
      <PremiumButton variant="primary" fullWidth>
        Back to Sign In
      </PremiumButton>
    </Link>
  </motion.div>
);

// ─────────────────────────────────────────────────
// ForgotPassword Component
// ─────────────────────────────────────────────────

/**
 * Forgot Password page — Sends a Firebase password reset email.
 * Transitions to a success confirmation state on completion.
 */
const ForgotPassword: React.FC = () => {
  const { forgotPassword } = useAuth();

  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [sentToEmail, setSentToEmail] = useState<string | null>(null);

  // ── React Hook Form ──────────────────────────
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, touchedFields },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: 'onChange',
  });

  const emailValue = watch('email', '');

  // ── Form Submit ──────────────────────────────
  /**
   * Handles the forgot password form submission.
   * Calls Firebase sendPasswordResetEmail and transitions
   * to the success confirmation state on success.
   *
   * @param data - Validated form data with email address
   */
  const onSubmit = async (data: ForgotPasswordFormData) => {
    setAuthError(null);
    setIsLoading(true);
    try {
      await forgotPassword(data.email);
      setSentToEmail(data.email);
    } catch (err) {
      if (err instanceof FirebaseError) {
        setAuthError(getFirebaseErrorMessage(err));
      } else {
        setAuthError('Failed to send reset email. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // ── Success State ────────────────────────────
  if (sentToEmail) {
    return (
      <AuthLayout pageKey="forgot-success">
        <ResetEmailSentBanner email={sentToEmail} />
      </AuthLayout>
    );
  }

  return (
    <AuthLayout pageKey="forgot-password">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        {/* ── Back Link ── */}
        <motion.div variants={fadeUp}>
          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm transition-colors duration-200 group focus:outline-none focus:underline"
            aria-label="Go back to login"
          >
            <motion.span
              whileHover={{ x: -3 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <ArrowLeft size={15} />
            </motion.span>
            Back to Sign In
          </Link>
        </motion.div>

        {/* ── Header ── */}
        <motion.div variants={fadeUp} className="text-center space-y-2">
          <div className="flex justify-center mb-4">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #FF4D00, #FF6A00)',
                boxShadow: '0 0 25px rgba(255,77,0,0.4)',
              }}
            >
              <Film size={22} className="text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">Reset Password</h1>
          <p className="text-slate-400 text-sm leading-relaxed max-w-xs mx-auto">
            Enter your email and we&apos;ll send you a link to reset your password.
          </p>
        </motion.div>

        {/* ── Error Banner ── */}
        <AnimatePresence>
          {authError && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="flex items-start gap-3 p-3.5 rounded-xl border"
              style={{
                background: 'rgba(239,68,68,0.08)',
                borderColor: 'rgba(239,68,68,0.25)',
              }}
              role="alert"
              aria-live="assertive"
            >
              <AlertCircle size={15} className="text-red-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
              <p className="text-red-400 text-xs leading-relaxed">{authError}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Form ── */}
        <motion.form
          variants={fadeUp}
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="space-y-4"
          aria-label="Reset password form"
        >
          <PremiumInput
            label="Email Address"
            type="email"
            autoComplete="email"
            leftIcon={<Mail size={16} />}
            error={errors.email?.message}
            isValid={touchedFields.email && !errors.email && emailValue.length > 0}
            value={emailValue}
            hint="We'll send the reset link to this address"
            {...register('email')}
          />

          <PremiumButton
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            isLoading={isLoading}
            disabled={isLoading}
            aria-label="Send password reset email"
          >
            Send Reset Link
          </PremiumButton>
        </motion.form>

        {/* ── Footer ── */}
        <motion.p variants={fadeUp} className="text-center text-sm text-slate-400">
          Remember your password?{' '}
          <Link
            to="/login"
            className="font-semibold text-orange-400 hover:text-orange-300 transition-colors duration-200 focus:outline-none focus:underline"
          >
            Sign in
          </Link>
        </motion.p>
      </motion.div>
    </AuthLayout>
  );
};

export default ForgotPassword;
