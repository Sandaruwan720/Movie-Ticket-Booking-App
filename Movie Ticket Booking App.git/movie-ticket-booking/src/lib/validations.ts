/**
 * ==================================================
 * Zod Validation Schemas
 * --------------------------------------------------
 * Defines type-safe validation schemas for all
 * authentication forms in the CineBook application.
 *
 * Schemas:
 * - loginSchema       (email + password)
 * - signupSchema      (full registration fields)
 * - forgotPasswordSchema (email only)
 *
 * Uses Zod for runtime validation paired with
 * React Hook Form via @hookform/resolvers/zod.
 * ==================================================
 */

import { z } from 'zod';

// ─────────────────────────────────────────────────
// Reusable Field Validators
// Shared validation rules used across multiple schemas
// ─────────────────────────────────────────────────

/** Email validation: proper format, trimmed, lowercase */
const emailField = z
  .string()
  .min(1, 'Email is required')
  .email('Please enter a valid email address')
  .transform((v) => v.trim().toLowerCase());

/** Password validation: 8+ chars, uppercase, lowercase, number, special char */
const passwordField = z
  .string()
  .min(1, 'Password is required')
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Must contain at least one number')
  .regex(/[^A-Za-z0-9]/, 'Must contain at least one special character');

// ─────────────────────────────────────────────────
// Login Schema
// ─────────────────────────────────────────────────

/**
 * Validation schema for the Login form.
 *
 * Fields:
 * - email: Valid email format
 * - password: Non-empty (no strength requirements on login)
 * - rememberMe: Optional boolean for session persistence
 */
export const loginSchema = z.object({
  email: emailField,
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean().default(false),
});

export type LoginFormData = z.infer<typeof loginSchema>;

// ─────────────────────────────────────────────────
// Signup Schema
// ─────────────────────────────────────────────────

/**
 * Validation schema for the Signup / Registration form.
 *
 * Fields:
 * - fullName: 2–60 characters
 * - username: 3–30 chars, alphanumeric + underscore only
 * - email: Valid email format
 * - phone: International phone number (optional)
 * - password: Full strength requirements
 * - confirmPassword: Must match password
 * - acceptTerms: Must be true to proceed
 */
export const signupSchema = z
  .object({
    fullName: z
      .string()
      .min(1, 'Full name is required')
      .min(2, 'Name must be at least 2 characters')
      .max(60, 'Name must be under 60 characters')
      .regex(/^[a-zA-Z\s'-]+$/, 'Name can only contain letters, spaces, hyphens, and apostrophes'),
    username: z
      .string()
      .min(1, 'Username is required')
      .min(3, 'Username must be at least 3 characters')
      .max(30, 'Username must be under 30 characters')
      .regex(/^[a-zA-Z0-9_]+$/, 'Only letters, numbers, and underscores allowed'),
    email: emailField,
    phone: z
      .string()
      .optional()
      .refine(
        (val) => !val || /^\+?[1-9]\d{6,14}$/.test(val.replace(/[\s\-()]/g, '')),
        'Please enter a valid phone number'
      ),
    password: passwordField,
    confirmPassword: z.string().min(1, 'Please confirm your password'),
    acceptTerms: z.boolean().refine((v) => v === true, {
      message: 'You must accept the Terms of Service to continue',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export type SignupFormData = z.infer<typeof signupSchema>;

// ─────────────────────────────────────────────────
// Forgot Password Schema
// ─────────────────────────────────────────────────

/**
 * Validation schema for the Forgot Password form.
 *
 * Fields:
 * - email: Valid email address to send reset link to
 */
export const forgotPasswordSchema = z.object({
  email: emailField,
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

// ─────────────────────────────────────────────────
// Password Strength Utility
// ─────────────────────────────────────────────────

/**
 * Calculates password strength level based on criteria.
 *
 * @param password - The password string to evaluate
 * @returns Strength level: 0 (empty) | 1 (weak) | 2 (medium) | 3 (strong) | 4 (excellent)
 */
export function getPasswordStrength(password: string): number {
  if (!password) return 0;
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  if (score <= 1) return 1; // Weak
  if (score === 2) return 2; // Medium
  if (score === 3 || score === 4) return 3; // Strong
  return 4; // Excellent
}

/**
 * Returns the display label for a password strength level.
 *
 * @param strength - Numeric strength level (0–4)
 */
export function getPasswordStrengthLabel(strength: number): string {
  const labels = ['', 'Weak', 'Medium', 'Strong', 'Excellent'];
  return labels[strength] ?? '';
}

/**
 * Password requirement checklist for UI display.
 * Each item contains the label and the test function.
 */
export const PASSWORD_REQUIREMENTS = [
  { label: 'At least 8 characters', test: (p: string) => p.length >= 8 },
  { label: 'One uppercase letter', test: (p: string) => /[A-Z]/.test(p) },
  { label: 'One lowercase letter', test: (p: string) => /[a-z]/.test(p) },
  { label: 'One number', test: (p: string) => /[0-9]/.test(p) },
  { label: 'One special character', test: (p: string) => /[^A-Za-z0-9]/.test(p) },
] as const;
