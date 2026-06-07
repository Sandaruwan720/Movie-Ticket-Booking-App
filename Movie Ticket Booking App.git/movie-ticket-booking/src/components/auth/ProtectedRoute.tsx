/**
 * ==================================================
 * ProtectedRoute Component
 * --------------------------------------------------
 * A route guard that redirects unauthenticated users
 * to the /login page.
 *
 * Renders a loading spinner while Firebase determines
 * the initial auth state to prevent flash redirects.
 *
 * Usage:
 *   <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
 * ==================================================
 */

import React from 'react';
import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Film } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

// ─────────────────────────────────────────────────
// Type Definitions
// ─────────────────────────────────────────────────

interface ProtectedRouteProps {
  /** The protected page component to render */
  children: ReactNode;
}

// ─────────────────────────────────────────────────
// Loading Screen Component
// ─────────────────────────────────────────────────

/**
 * Renders a cinematic loading screen while Firebase
 * is resolving the current authentication state.
 */
const AuthLoadingScreen: React.FC = () => (
  <div className="min-h-screen bg-[#030712] flex items-center justify-center">
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center gap-4"
    >
      {/* Animated logo */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        className="w-12 h-12 rounded-xl flex items-center justify-center"
        style={{
          background: 'linear-gradient(135deg, #FF4D00, #FF6A00)',
          boxShadow: '0 0 30px rgba(255,77,0,0.4)',
        }}
      >
        <Film size={24} className="text-white" />
      </motion.div>
      <p className="text-slate-400 text-sm font-medium">Loading CineBook...</p>
    </motion.div>
  </div>
);

// ─────────────────────────────────────────────────
// ProtectedRoute Component
// ─────────────────────────────────────────────────

/**
 * Protects a route by verifying authentication state.
 *
 * Behavior:
 * - Loading: Shows AuthLoadingScreen
 * - Authenticated: Renders children
 * - Unauthenticated: Redirects to /login with return URL
 *
 * @param children - The protected route content
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { currentUser, loading } = useAuth();
  const location = useLocation();

  // Show loading while Firebase resolves auth state
  if (loading) return <AuthLoadingScreen />;

  // Redirect to login if not authenticated
  // Preserve the attempted URL for redirect after login
  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
