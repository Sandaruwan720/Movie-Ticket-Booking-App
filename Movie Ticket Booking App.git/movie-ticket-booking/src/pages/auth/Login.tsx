/**
 * ==================================================
 * Login Page
 * --------------------------------------------------
 * Full-featured authentication login form with:
 * - Email & Password sign-in via Firebase
 * - Google OAuth popup sign-in
 * - GitHub OAuth (UI shell — configure in Firebase)
 * - Remember Me persistence toggle
 * - Forgot Password navigation
 * - Real-time Zod validation via React Hook Form
 * - Loading, success, and error states
 * - Framer Motion staggered entrance animations
 * ==================================================
 */

import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Mail, Lock, Film, AlertCircle } from 'lucide-react';
import { FirebaseError } from 'firebase/app';
import AuthLayout from '../../components/auth/AuthLayout';
import PremiumInput from '../../components/ui/PremiumInput';
import PremiumButton from '../../components/ui/PremiumButton';
import { loginSchema } from '../../lib/validations';
import type { z } from 'zod';
import { useAuth } from '../../context/AuthContext';

// ─────────────────────────────────────────────────
// Firebase Error Message Map
// ─────────────────────────────────────────────────

/**
 * Maps Firebase authentication error codes to user-friendly messages.
 *
 * @param error - FirebaseError instance from failed auth attempt
 * @returns Human-readable error message string
 */
const getFirebaseErrorMessage = (error: FirebaseError): string => {
  const messages: Record<string, string> = {
    'auth/user-not-found': 'No account found with this email address.',
    'auth/wrong-password': 'Incorrect password. Please try again.',
    'auth/invalid-credential': 'Invalid email or password. Please check and try again.',
    'auth/user-disabled': 'This account has been disabled. Contact support.',
    'auth/too-many-requests': 'Too many failed attempts. Please wait a moment and try again.',
    'auth/network-request-failed': 'Network error. Please check your connection.',
    'auth/popup-closed-by-user': 'Sign-in popup was closed. Please try again.',
    'auth/cancelled-popup-request': 'Another sign-in is in progress.',
    'auth/popup-blocked': 'Popup blocked by browser. Please allow popups for this site.',
  };
  return messages[error.code] ?? 'An unexpected error occurred. Please try again.';
};

// ─────────────────────────────────────────────────
// Animation Variants
// ─────────────────────────────────────────────────

/** Stagger container for form elements */
const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

/** Fade + slide up for each form element */
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' as const } },
};

// ─────────────────────────────────────────────────
// Social Icons (SVG)
// ─────────────────────────────────────────────────

/** Official Google "G" icon in SVG format */
const GoogleIcon: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

/** GitHub icon in SVG format */
const GithubIcon: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.04c-3.34.73-4.04-1.61-4.04-1.61-.55-1.38-1.34-1.75-1.34-1.75-1.09-.74.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02.005 2.04.14 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.22.7.83.58C20.57 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

// ─────────────────────────────────────────────────
// Login Component
// ─────────────────────────────────────────────────

/**
 * Login page — Email/password + Google OAuth authentication.
 * Navigates to the previous route or "/" on successful login.
 */
const Login: React.FC = () => {
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect destination after login
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname ?? '/';

  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // ── React Hook Form ──────────────────────────
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, touchedFields },
  } = useForm<z.input<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
    defaultValues: { rememberMe: false },
  });

  const emailValue = watch('email', '');
  const passwordValue = watch('password', '');

  // ── Email/Password Submit ────────────────────
  /**
   * Handles form submission for email/password login.
   * Clears errors, sets loading state, calls Firebase,
   * then navigates on success or displays error on failure.
   *
   * @param data - Validated form data from React Hook Form
   */
  const onSubmit = async (data: z.input<typeof loginSchema>) => {
    setAuthError(null);
    setIsLoading(true);
    try {
      await login(data.email, data.password, data.rememberMe ?? false);
      setIsSuccess(true);
      setTimeout(() => navigate(from, { replace: true }), 600);
    } catch (err) {
      if (err instanceof FirebaseError) {
        setAuthError(getFirebaseErrorMessage(err));
      } else {
        setAuthError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // ── Google OAuth ─────────────────────────────
  /**
   * Initiates Google OAuth popup sign-in via Firebase.
   * Creates Firestore user document on first-time login.
   */
  const handleGoogleLogin = async () => {
    setAuthError(null);
    setIsGoogleLoading(true);
    try {
      await loginWithGoogle();
      setIsSuccess(true);
      setTimeout(() => navigate(from, { replace: true }), 600);
    } catch (err) {
      if (err instanceof FirebaseError) {
        setAuthError(getFirebaseErrorMessage(err));
      } else {
        setAuthError('Google sign-in failed. Please try again.');
      }
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <AuthLayout pageKey="login">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        {/* ── Header ── */}
        <motion.div variants={fadeUp} className="text-center space-y-2">
          {/* Logo icon */}
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

          <h1 className="text-2xl font-black text-white tracking-tight">Welcome Back</h1>
          <p className="text-slate-400 text-sm">Sign in to your CineBook account</p>
        </motion.div>

        {/* ── Global Error Banner ── */}
        {authError && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
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

        {/* ── Login Form ── */}
        <motion.form
          variants={fadeUp}
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="space-y-4"
          aria-label="Login form"
        >
          {/* Email */}
          <PremiumInput
            label="Email Address"
            type="email"
            autoComplete="email"
            leftIcon={<Mail size={16} />}
            error={errors.email?.message}
            isValid={touchedFields.email && !errors.email && emailValue.length > 0}
            value={emailValue}
            {...register('email')}
          />

          {/* Password */}
          <div>
            <PremiumInput
              label="Password"
              type="password"
              autoComplete="current-password"
              leftIcon={<Lock size={16} />}
              error={errors.password?.message}
              isValid={touchedFields.password && !errors.password && passwordValue.length > 0}
              value={passwordValue}
              {...register('password')}
            />

            {/* Remember Me + Forgot Password Row */}
            <div className="flex items-center justify-between mt-3">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  className="w-3.5 h-3.5 rounded border-white/20 bg-white/5 accent-orange-500 cursor-pointer"
                  {...register('rememberMe')}
                />
                <span className="text-slate-400 text-xs group-hover:text-slate-300 transition-colors">
                  Remember me
                </span>
              </label>

              <Link
                to="/forgot-password"
                className="text-xs font-medium text-orange-400 hover:text-orange-300 transition-colors duration-200 focus:outline-none focus:underline"
              >
                Forgot password?
              </Link>
            </div>
          </div>

          {/* Sign In Button */}
          <PremiumButton
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            isLoading={isLoading}
            isSuccess={isSuccess}
            disabled={isLoading || isSuccess}
            aria-label="Sign in to your account"
          >
            Sign In
          </PremiumButton>
        </motion.form>

        {/* ── Divider ── */}
        <motion.div variants={fadeUp} className="flex items-center gap-3">
          <div className="flex-1 h-px bg-white/8" />
          <span className="text-slate-500 text-xs font-medium">or continue with</span>
          <div className="flex-1 h-px bg-white/8" />
        </motion.div>

        {/* ── Social Sign In ── */}
        <motion.div variants={fadeUp} className="grid grid-cols-2 gap-3">
          {/* Google */}
          <PremiumButton
            type="button"
            variant="glass"
            size="md"
            isLoading={isGoogleLoading}
            onClick={handleGoogleLogin}
            leftIcon={!isGoogleLoading ? <GoogleIcon size={17} /> : undefined}
            aria-label="Sign in with Google"
          >
            Google
          </PremiumButton>

          {/* GitHub (UI shell — add GitHub provider in Firebase console) */}
          <PremiumButton
            type="button"
            variant="glass"
            size="md"
            leftIcon={<GithubIcon size={17} />}
            aria-label="Sign in with GitHub"
            onClick={() => setAuthError('GitHub sign-in: Enable GitHub provider in Firebase Console first.')}
          >
            GitHub
          </PremiumButton>
        </motion.div>

        {/* ── Create Account Link ── */}
        <motion.p variants={fadeUp} className="text-center text-sm text-slate-400">
          Don&apos;t have an account?{' '}
          <Link
            to="/signup"
            className="font-semibold text-orange-400 hover:text-orange-300 transition-colors duration-200 focus:outline-none focus:underline"
          >
            Create one for free
          </Link>
        </motion.p>
      </motion.div>
    </AuthLayout>
  );
};

export default Login;
