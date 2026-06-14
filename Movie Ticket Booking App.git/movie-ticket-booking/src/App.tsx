/**
 * ==================================================
 * App.tsx — Root Application Component
 * --------------------------------------------------
 * React Router v6 routes:
 *
 * PUBLIC ROUTES:
 * - /          → Home (CineBook homepage — public)
 * - /login     → Login page
 * - /signup    → Signup page
 * - /forgot-password → ForgotPassword page
 *
 * PROTECTED ROUTES (require auth):
 * - /booking   → Booking flow (placeholder)
 * - /account   → User account (placeholder)
 *
 * CATCH-ALL:
 * - *          → Redirect to /
 * ==================================================
 */

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Film, Ticket } from 'lucide-react';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import ForgotPassword from './pages/auth/ForgotPassword';
import Home from './pages/Home';

// ─────────────────────────────────────────────────
// Protected Placeholder Pages
// ─────────────────────────────────────────────────

/**
 * Booking flow placeholder — to be replaced with the
 * full seat-selection + payment flow.
 */
const BookingPlaceholder: React.FC = () => {
  const { currentUser, logout } = useAuth();
  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: '#030712' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center p-10 rounded-3xl max-w-md w-full"
        style={{
          background: 'rgba(255,255,255,0.04)',
          backdropFilter: 'blur(40px)',
          border: '1px solid rgba(255,255,255,0.10)',
          boxShadow: '0 40px 80px rgba(0,0,0,0.5)',
        }}
      >
        <div className="flex justify-center mb-5">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #FF4D00, #FF6A00)', boxShadow: '0 0 30px rgba(255,77,0,0.4)' }}>
            <Ticket size={28} className="text-white" />
          </div>
        </div>
        <h1 className="text-2xl font-black text-white mb-2">Booking Flow</h1>
        <p className="text-slate-400 text-sm mb-1">
          Signed in as: <span className="text-white font-medium">{currentUser?.displayName ?? currentUser?.email}</span>
        </p>
        <p className="text-slate-500 text-xs mb-8">
          Full seat selection + payment flow coming soon...
        </p>
        <div className="flex gap-3 justify-center">
          <a href="/"
            className="px-5 py-3 rounded-xl text-white text-sm font-semibold border border-white/10 hover:border-white/20 transition-all"
            style={{ background: 'rgba(255,255,255,0.05)' }}>
            ← Back to Home
          </a>
          <button onClick={logout}
            className="px-5 py-3 rounded-xl text-white text-sm font-semibold transition-all hover:opacity-85"
            style={{ background: 'linear-gradient(135deg, #FF4D00, #FF6A00)' }}>
            Sign Out
          </button>
        </div>
      </motion.div>
    </div>
  );
};

/**
 * Account page placeholder.
 */
const AccountPlaceholder: React.FC = () => {
  const { currentUser, logout } = useAuth();
  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: '#030712' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center p-10 rounded-3xl max-w-md w-full"
        style={{
          background: 'rgba(255,255,255,0.04)',
          backdropFilter: 'blur(40px)',
          border: '1px solid rgba(255,255,255,0.10)',
          boxShadow: '0 40px 80px rgba(0,0,0,0.5)',
        }}
      >
        <div className="text-5xl mb-4">👤</div>
        <h1 className="text-2xl font-black text-white mb-2">My Account</h1>
        <p className="text-slate-400 text-sm mb-8">
          {currentUser?.displayName ?? currentUser?.email}
        </p>
        <div className="flex gap-3 justify-center">
          <a href="/"
            className="px-5 py-3 rounded-xl text-white text-sm font-semibold border border-white/10 hover:border-white/20 transition-all"
            style={{ background: 'rgba(255,255,255,0.05)' }}>
            ← Home
          </a>
          <button onClick={logout}
            className="px-5 py-3 rounded-xl text-white text-sm font-semibold"
            style={{ background: 'linear-gradient(135deg, #FF4D00, #FF6A00)' }}>
            Sign Out
          </button>
        </div>
      </motion.div>
    </div>
  );
};

// ─────────────────────────────────────────────────
// 404 Page
// ─────────────────────────────────────────────────

const NotFound: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center p-4" style={{ background: '#030712' }}>
    <div className="text-center">
      <div className="text-8xl mb-4">🎬</div>
      <h1 className="text-4xl font-black text-white mb-2">404</h1>
      <p className="text-slate-400 mb-6">This scene wasn't in the script.</p>
      <a href="/"
        className="px-6 py-3 rounded-xl text-white font-bold inline-flex items-center gap-2"
        style={{ background: 'linear-gradient(135deg, #FF4D00, #FF6A00)' }}>
        <Film size={16} />
        Back to CineBook
      </a>
    </div>
  </div>
);

// ─────────────────────────────────────────────────
// App Component
// ─────────────────────────────────────────────────

/**
 * Root App — BrowserRouter, AuthProvider, and all routes.
 */
const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* ── Public Routes ── */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* ── Protected Routes ── */}
          <Route
            path="/booking"
            element={
              <ProtectedRoute>
                <BookingPlaceholder />
              </ProtectedRoute>
            }
          />
          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <AccountPlaceholder />
              </ProtectedRoute>
            }
          />

          {/* ── 404 ── */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
