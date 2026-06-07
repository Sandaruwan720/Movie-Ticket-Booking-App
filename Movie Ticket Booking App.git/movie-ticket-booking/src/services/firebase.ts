/**
 * ==================================================
 * Firebase Configuration & Service Initialization
 * --------------------------------------------------
 * Initializes Firebase services used throughout
 * the CineBook application.
 *
 * Services:
 * - Authentication  (email/password + Google OAuth)
 * - Firestore       (user profiles, bookings)
 * - Storage         (profile photos, assets)
 * - Analytics       (user behavior tracking)
 *
 * Environment variables are loaded from .env.local
 * via Vite's import.meta.env system.
 * ==================================================
 */

import { initializeApp, getApps, getApp } from 'firebase/app';
import type { FirebaseApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import type { Auth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import type { Firestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import type { FirebaseStorage } from 'firebase/storage';
import { getAnalytics, isSupported } from 'firebase/analytics';
import type { Analytics } from 'firebase/analytics';

// ─────────────────────────────────────────────────
// Firebase Configuration
// All values are loaded from .env.local environment
// variables, never hardcoded for security.
// ─────────────────────────────────────────────────
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY as string,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN as string,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID as string,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET as string,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID as string,
  appId: import.meta.env.VITE_FIREBASE_APP_ID as string,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID as string,
};

// ─────────────────────────────────────────────────
// Firebase App Initialization
// Prevents re-initialization during HMR (Hot Module
// Replacement) in development mode.
// ─────────────────────────────────────────────────
const app: FirebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// ─────────────────────────────────────────────────
// Firebase Authentication
// Handles user sign-in, sign-up, and session management.
// ─────────────────────────────────────────────────
export const auth: Auth = getAuth(app);

// ─────────────────────────────────────────────────
// Firestore Database
// Stores user profiles, movie data, and bookings.
// ─────────────────────────────────────────────────
export const db: Firestore = getFirestore(app);

// ─────────────────────────────────────────────────
// Firebase Storage
// Handles file uploads: profile photos, assets.
// ─────────────────────────────────────────────────
export const storage: FirebaseStorage = getStorage(app);

// ─────────────────────────────────────────────────
// Firebase Analytics
// Only initialized in browser environments where
// it is supported (not in SSR or Node.js contexts).
// ─────────────────────────────────────────────────
let analytics: Analytics | null = null;

/**
 * Lazily initializes Firebase Analytics only when
 * supported by the current browser environment.
 *
 * @returns Promise resolving to Analytics instance or null
 */
export const initAnalytics = async (): Promise<Analytics | null> => {
  if (await isSupported()) {
    analytics = getAnalytics(app);
    return analytics;
  }
  return null;
};

export { analytics };
export default app;
