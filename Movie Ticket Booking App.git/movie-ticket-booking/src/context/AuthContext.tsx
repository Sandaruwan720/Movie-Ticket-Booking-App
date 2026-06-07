/**
 * ==================================================
 * Authentication Context
 * --------------------------------------------------
 * Provides global authentication state and methods
 * to the entire CineBook application via React Context.
 *
 * Features:
 * - Email/password sign up & login
 * - Google OAuth (popup-based)
 * - Logout
 * - Forgot password (email reset)
 * - Email verification
 * - Session persistence via Firebase onAuthStateChanged
 * - Automatic Firestore user document creation
 * ==================================================
 */

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  sendEmailVerification,
  browserLocalPersistence,
  browserSessionPersistence,
  setPersistence,
  updateProfile,
} from 'firebase/auth';
import type { User, UserCredential } from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../services/firebase';

// ─────────────────────────────────────────────────
// Type Definitions
// ─────────────────────────────────────────────────

/** Shape of the data used when creating a new user */
interface SignupData {
  fullName: string;
  username: string;
  email: string;
  phone?: string;
  password: string;
}

/** Complete Auth Context interface */
interface AuthContextType {
  /** Currently authenticated Firebase user, or null if not logged in */
  currentUser: User | null;
  /** True while Firebase is determining the initial auth state */
  loading: boolean;
  /**
   * Sign in with email and password.
   * @param email - User's email address
   * @param password - User's password
   * @param rememberMe - If true, persists session across browser restarts
   */
  login: (email: string, password: string, rememberMe?: boolean) => Promise<UserCredential>;
  /**
   * Register a new user with email/password and create Firestore profile.
   * @param data - Full signup form data
   */
  signup: (data: SignupData) => Promise<UserCredential>;
  /** Sign out the current user */
  logout: () => Promise<void>;
  /**
   * Authenticate using Google OAuth popup.
   * Creates Firestore user document if first-time sign-in.
   */
  loginWithGoogle: () => Promise<UserCredential>;
  /**
   * Send a password reset email to the given address.
   * @param email - The email address to send the reset link to
   */
  forgotPassword: (email: string) => Promise<void>;
  /**
   * Resend email verification to the currently logged-in user.
   */
  resendVerificationEmail: () => Promise<void>;
}

// ─────────────────────────────────────────────────
// Context Creation
// ─────────────────────────────────────────────────

/** The React context — initially undefined until Provider mounts */
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ─────────────────────────────────────────────────
// Google Auth Provider Configuration
// ─────────────────────────────────────────────────

const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('profile');
googleProvider.addScope('email');
googleProvider.setCustomParameters({ prompt: 'select_account' });

// ─────────────────────────────────────────────────
// Firestore User Document Helper
// ─────────────────────────────────────────────────

/**
 * Creates or updates a user document in the Firestore `users` collection.
 * Uses merge:true so existing data is preserved on re-login.
 *
 * @param user - Firebase Auth user object
 * @param extraData - Additional fields (username, phone, provider)
 */
const upsertUserDocument = async (
  user: User,
  extraData?: Partial<{ username: string; phone: string; provider: string }>
): Promise<void> => {
  const userRef = doc(db, 'users', user.uid);
  const snapshot = await getDoc(userRef);

  if (!snapshot.exists()) {
    // Create new user document on first registration
    await setDoc(userRef, {
      uid: user.uid,
      name: user.displayName ?? '',
      username: extraData?.username ?? '',
      email: user.email ?? '',
      phone: extraData?.phone ?? '',
      photoURL: user.photoURL ?? '',
      provider: extraData?.provider ?? 'email',
      emailVerified: user.emailVerified,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  } else {
    // Update only the updatedAt timestamp on subsequent logins
    await setDoc(userRef, { updatedAt: serverTimestamp() }, { merge: true });
  }
};

// ─────────────────────────────────────────────────
// AuthProvider Component
// ─────────────────────────────────────────────────

/**
 * AuthProvider wraps the application and supplies authentication
 * state and methods to all descendant components.
 *
 * @param children - React children to render inside the provider
 */
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // ── Auth State Observer ───────────────────────
  // Listens for Firebase auth state changes and
  // keeps the currentUser state in sync.
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return unsubscribe;
  }, []);

  // ── Login ─────────────────────────────────────
  /**
   * Signs in an existing user with email and password.
   * Supports "Remember Me" via Firebase persistence settings.
   */
  const login = useCallback(
    async (email: string, password: string, rememberMe = false): Promise<UserCredential> => {
      const persistenceType = rememberMe ? browserLocalPersistence : browserSessionPersistence;
      await setPersistence(auth, persistenceType);
      return signInWithEmailAndPassword(auth, email, password);
    },
    []
  );

  // ── Signup ────────────────────────────────────
  /**
   * Creates a new Firebase Auth user, updates their display name,
   * sends email verification, and creates their Firestore profile.
   */
  const signup = useCallback(async (data: SignupData): Promise<UserCredential> => {
    const credential = await createUserWithEmailAndPassword(auth, data.email, data.password);

    // Update Firebase Auth display name
    await updateProfile(credential.user, { displayName: data.fullName });

    // Send email verification
    await sendEmailVerification(credential.user);

    // Create Firestore user document
    await upsertUserDocument(credential.user, {
      username: data.username,
      phone: data.phone,
      provider: 'email',
    });

    return credential;
  }, []);

  // ── Logout ────────────────────────────────────
  /**
   * Signs the current user out of Firebase Authentication.
   */
  const logout = useCallback(async (): Promise<void> => {
    await signOut(auth);
  }, []);

  // ── Google Login ──────────────────────────────
  /**
   * Opens a Google OAuth popup and authenticates the user.
   * Creates a Firestore document on first-time Google sign-in.
   */
  const loginWithGoogle = useCallback(async (): Promise<UserCredential> => {
    const credential = await signInWithPopup(auth, googleProvider);
    await upsertUserDocument(credential.user, { provider: 'google' });
    return credential;
  }, []);

  // ── Forgot Password ───────────────────────────
  /**
   * Sends a password reset email via Firebase Authentication.
   *
   * @param email - The email address to send the reset link to
   */
  const forgotPassword = useCallback(async (email: string): Promise<void> => {
    await sendPasswordResetEmail(auth, email);
  }, []);

  // ── Resend Verification Email ─────────────────
  /**
   * Re-sends the email verification link to the currently
   * authenticated user. Throws if no user is logged in.
   */
  const resendVerificationEmail = useCallback(async (): Promise<void> => {
    if (!auth.currentUser) throw new Error('No authenticated user found.');
    await sendEmailVerification(auth.currentUser);
  }, []);

  // ── Context Value ─────────────────────────────
  const value: AuthContextType = {
    currentUser,
    loading,
    login,
    signup,
    logout,
    loginWithGoogle,
    forgotPassword,
    resendVerificationEmail,
  };

  return (
    <AuthContext.Provider value={value}>
      {/* Only render children after Firebase has determined auth state */}
      {!loading && children}
    </AuthContext.Provider>
  );
};

// ─────────────────────────────────────────────────
// useAuth Hook Export
// ─────────────────────────────────────────────────

/**
 * Custom hook to access the authentication context.
 *
 * Must be used within an <AuthProvider> component tree.
 * Throws a descriptive error if used outside the provider.
 *
 * @returns AuthContextType — all auth state and methods
 *
 * @example
 * const { currentUser, login, logout } = useAuth();
 */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider component.');
  }
  return context;
};

export default AuthContext;
