/**
 * ==================================================
 * Signup Page
 * --------------------------------------------------
 * Full user registration form with:
 * - Full Name, Username, Email, Phone
 * - Password + Confirm Password
 * - Real-time password strength meter
 * - Terms of Service acceptance checkbox
 * - Google OAuth registration
 * - Firebase Auth user creation
 * - Firestore user document creation
 * - Email verification sent on signup
 * - Zod validation + React Hook Form
 * - Framer Motion staggered animations
 * ==================================================
 */

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, Film, AlertCircle, User, AtSign, Phone, CheckCircle2 } from 'lucide-react';
import { FirebaseError } from 'firebase/app';
import AuthLayout from '../../components/auth/AuthLayout';
import PremiumInput from '../../components/ui/PremiumInput';
import PremiumButton from '../../components/ui/PremiumButton';
import PasswordStrengthMeter from '../../components/ui/PasswordStrengthMeter';
import { signupSchema } from '../../lib/validations';
import type { SignupFormData } from '../../lib/validations';
import { useAuth } from '../../context/AuthContext';

// ─────────────────────────────────────────────────
// Firebase Error Message Map
// ─────────────────────────────────────────────────

/**
 * Maps Firebase registration error codes to user-friendly messages.
 *
 * @param error - FirebaseError from failed registration attempt
 * @returns Human-readable error message string
 */
const getFirebaseErrorMessage = (error: FirebaseError): string => {
  const messages: Record<string, string> = {
    'auth/email-already-in-use': 'An account with this email already exists. Please sign in instead.',
    'auth/invalid-email': 'Please enter a valid email address.',
    'auth/weak-password': 'Password is too weak. Please choose a stronger password.',
    'auth/network-request-failed': 'Network error. Please check your connection.',
    'auth/too-many-requests': 'Too many requests. Please wait a moment and try again.',
    'auth/popup-closed-by-user': 'Sign-in popup was closed. Please try again.',
    'auth/popup-blocked': 'Popup blocked by browser. Please allow popups for this site.',
  };
  return messages[error.code] ?? 'Registration failed. Please try again.';
};

// ─────────────────────────────────────────────────
// Animation Variants
// ─────────────────────────────────────────────────

/** Stagger container for form field entrance */
const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};

/** Fade + slide up for each field */
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' as const } },
};

// ─────────────────────────────────────────────────
// Google Icon SVG
// ─────────────────────────────────────────────────

/** Official Google "G" icon in SVG */
const GoogleIcon: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

// ─────────────────────────────────────────────────
// Email Verification Banner Component
// ─────────────────────────────────────────────────

/**
 * Displays a confirmation banner after successful registration,
 * instructing the user to check their email for verification.
 */
const VerificationBanner: React.FC<{ email: string; onResend: () => void }> = ({ email, onResend }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    className="text-center space-y-4"
  >
    <div className="flex justify-center">
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center"
        style={{
          background: 'linear-gradient(135deg, rgba(16,185,129,0.2), rgba(3,7,18,0.8))',
          border: '1px solid rgba(16,185,129,0.3)',
          boxShadow: '0 0 30px rgba(16,185,129,0.2)',
        }}
      >
        <CheckCircle2 size={28} className="text-emerald-400" />
      </div>
    </div>
    <div>
      <h2 className="text-xl font-black text-white mb-2">Account Created!</h2>
      <p className="text-slate-400 text-sm leading-relaxed">
        A verification email has been sent to{' '}
        <span className="text-white font-semibold">{email}</span>.
        <br />
        Please check your inbox to activate your account.
      </p>
    </div>
    <div className="space-y-3">
      <Link to="/login">
        <PremiumButton variant="primary" fullWidth>
          Go to Sign In
        </PremiumButton>
      </Link>
      <button
        type="button"
        onClick={onResend}
        className="text-orange-400 hover:text-orange-300 text-xs font-medium transition-colors duration-200 focus:outline-none focus:underline"
      >
        Resend verification email
      </button>
    </div>
  </motion.div>
);

// ─────────────────────────────────────────────────
// Signup Component
// ─────────────────────────────────────────────────

/**
 * Signup page — Complete user registration with Firebase Authentication.
 * Creates an Auth user + Firestore user document on success.
 */
const Signup: React.FC = () => {
  const { signup, loginWithGoogle, resendVerificationEmail } = useAuth();
  const navigate = useNavigate();

  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [registeredEmail, setRegisteredEmail] = useState<string | null>(null);

  // ── React Hook Form ──────────────────────────
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, touchedFields },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: 'onChange',
  });

  // Watch all field values for validation indicators
  const fullNameValue = watch('fullName', '');
  const usernameValue = watch('username', '');
  const emailValue = watch('email', '');
  const phoneValue = watch('phone', '');
  const passwordValue = watch('password', '');
  const confirmPasswordValue = watch('confirmPassword', '');

  // ── Form Submission ──────────────────────────
  /**
   * Handles user registration form submission.
   * Creates Firebase Auth user, updates display name,
   * sends verification email, creates Firestore document.
   *
   * @param data - Validated signup form data
   */
  const onSubmit = async (data: SignupFormData) => {
    setAuthError(null);
    setIsLoading(true);
    try {
      await signup({
        fullName: data.fullName,
        username: data.username,
        email: data.email,
        phone: data.phone,
        password: data.password,
      });
      setRegisteredEmail(data.email);
    } catch (err) {
      if (err instanceof FirebaseError) {
        setAuthError(getFirebaseErrorMessage(err));
      } else {
        setAuthError('Registration failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // ── Google OAuth Registration ────────────────
  /**
   * Handles Google OAuth for registration flow.
   * Creates Firestore user document on first-time sign-in.
   */
  const handleGoogleSignup = async () => {
    setAuthError(null);
    setIsGoogleLoading(true);
    try {
      await loginWithGoogle();
      navigate('/', { replace: true });
    } catch (err) {
      if (err instanceof FirebaseError) {
        setAuthError(getFirebaseErrorMessage(err));
      } else {
        setAuthError('Google sign-up failed. Please try again.');
      }
    } finally {
      setIsGoogleLoading(false);
    }
  };

  // ── Resend Verification ──────────────────────
  const handleResendVerification = async () => {
    try {
      await resendVerificationEmail();
    } catch {
      // Silently handle — user is not logged in context yet
    }
  };

  // Show verification success state
  if (registeredEmail) {
    return (
      <AuthLayout pageKey="signup-success">
        <VerificationBanner email={registeredEmail} onResend={handleResendVerification} />
      </AuthLayout>
    );
  }

  return (
    <AuthLayout pageKey="signup">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="space-y-5"
      >
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
          <h1 className="text-2xl font-black text-white tracking-tight">Create Account</h1>
          <p className="text-slate-400 text-sm">Join CineBook and start your cinema journey</p>
        </motion.div>

        {/* ── Global Error Banner ── */}
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

        {/* ── Registration Form ── */}
        <motion.form
          variants={fadeUp}
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="space-y-4"
          aria-label="Create account form"
        >
          {/* Row 1: Full Name + Username */}
          <div className="grid grid-cols-2 gap-3">
            <PremiumInput
              label="Full Name"
              type="text"
              autoComplete="name"
              leftIcon={<User size={15} />}
              error={errors.fullName?.message}
              isValid={touchedFields.fullName && !errors.fullName && fullNameValue.length > 0}
              value={fullNameValue}
              {...register('fullName')}
            />
            <PremiumInput
              label="Username"
              type="text"
              autoComplete="username"
              leftIcon={<AtSign size={15} />}
              error={errors.username?.message}
              isValid={touchedFields.username && !errors.username && usernameValue.length > 0}
              value={usernameValue}
              {...register('username')}
            />
          </div>

          {/* Email */}
          <PremiumInput
            label="Email Address"
            type="email"
            autoComplete="email"
            leftIcon={<Mail size={15} />}
            error={errors.email?.message}
            isValid={touchedFields.email && !errors.email && emailValue.length > 0}
            value={emailValue}
            {...register('email')}
          />

          {/* Phone (optional) */}
          <PremiumInput
            label="Phone Number (optional)"
            type="tel"
            autoComplete="tel"
            leftIcon={<Phone size={15} />}
            error={errors.phone?.message}
            isValid={touchedFields.phone && !errors.phone && (phoneValue?.length ?? 0) > 0}
            value={phoneValue ?? ''}
            hint="+1234567890 format"
            {...register('phone')}
          />

          {/* Password */}
          <div>
            <PremiumInput
              label="Password"
              type="password"
              autoComplete="new-password"
              leftIcon={<Lock size={15} />}
              error={errors.password?.message}
              isValid={touchedFields.password && !errors.password && passwordValue.length > 0}
              value={passwordValue}
              {...register('password')}
            />
            {/* Live password strength meter */}
            <AnimatePresence>
              {passwordValue.length > 0 && (
                <PasswordStrengthMeter password={passwordValue} showRequirements />
              )}
            </AnimatePresence>
          </div>

          {/* Confirm Password */}
          <PremiumInput
            label="Confirm Password"
            type="password"
            autoComplete="new-password"
            leftIcon={<Lock size={15} />}
            error={errors.confirmPassword?.message}
            isValid={
              touchedFields.confirmPassword &&
              !errors.confirmPassword &&
              confirmPasswordValue.length > 0 &&
              confirmPasswordValue === passwordValue
            }
            value={confirmPasswordValue}
            {...register('confirmPassword')}
          />

          {/* Terms of Service */}
          <div className="space-y-1">
            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                className="w-4 h-4 mt-0.5 rounded border-white/20 bg-white/5 accent-orange-500 cursor-pointer flex-shrink-0"
                {...register('acceptTerms')}
                aria-describedby={errors.acceptTerms ? 'terms-error' : undefined}
              />
              <span className="text-slate-400 text-xs leading-relaxed group-hover:text-slate-300 transition-colors">
                I agree to the{' '}
                <button type="button" className="text-orange-400 hover:text-orange-300 underline underline-offset-2 transition-colors">
                  Terms of Service
                </button>{' '}
                and{' '}
                <button type="button" className="text-orange-400 hover:text-orange-300 underline underline-offset-2 transition-colors">
                  Privacy Policy
                </button>
              </span>
            </label>
            {errors.acceptTerms && (
              <p id="terms-error" role="alert" className="text-xs text-red-400 flex items-center gap-1 pl-7">
                <AlertCircle size={11} aria-hidden="true" />
                {errors.acceptTerms.message}
              </p>
            )}
          </div>

          {/* Create Account Button */}
          <PremiumButton
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            isLoading={isLoading}
            disabled={isLoading}
            aria-label="Create your CineBook account"
          >
            Create Account
          </PremiumButton>
        </motion.form>

        {/* ── Divider ── */}
        <motion.div variants={fadeUp} className="flex items-center gap-3">
          <div className="flex-1 h-px bg-white/8" />
          <span className="text-slate-500 text-xs font-medium">or sign up with</span>
          <div className="flex-1 h-px bg-white/8" />
        </motion.div>

        {/* ── Google Sign Up ── */}
        <motion.div variants={fadeUp}>
          <PremiumButton
            type="button"
            variant="glass"
            size="md"
            fullWidth
            isLoading={isGoogleLoading}
            onClick={handleGoogleSignup}
            leftIcon={!isGoogleLoading ? <GoogleIcon size={17} /> : undefined}
            aria-label="Sign up with Google"
          >
            Continue with Google
          </PremiumButton>
        </motion.div>

        {/* ── Sign In Link ── */}
        <motion.p variants={fadeUp} className="text-center text-sm text-slate-400">
          Already have an account?{' '}
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

export default Signup;
