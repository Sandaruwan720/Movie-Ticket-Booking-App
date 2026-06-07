/**
 * ==================================================
 * App.tsx — Root Application Component
 * --------------------------------------------------
 * Configures the React Router routes and wraps the
 * entire application with the AuthProvider context.
 *
 * Routes:
 * - /login           → Login page
 * - /signup          → Signup page
 * - /forgot-password → ForgotPassword page
 * - /                → Protected Dashboard (placeholder)
 * - *                → Redirect to /login
 * ==================================================
 */

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Film } from 'lucide-react';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import ForgotPassword from './pages/auth/ForgotPassword';

// ─────────────────────────────────────────────────
// Dashboard Placeholder
// ─────────────────────────────────────────────────

/**
 * Temporary protected dashboard shown after authentication.
 * Replace with your actual Dashboard component when ready.
 */
const DashboardPlaceholder: React.FC = () => {
  const { currentUser, logout } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'linear-gradient(135deg, #030712, #0F172A)' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center p-8 rounded-3xl max-w-md w-full"
        style={{
          background: 'rgba(255,255,255,0.04)',
          backdropFilter: 'blur(40px)',
          border: '1px solid rgba(255,255,255,0.10)',
          boxShadow: '0 40px 80px rgba(0,0,0,0.5)',
        }}
      >
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, #FF4D00, #FF6A00)',
              boxShadow: '0 0 30px rgba(255,77,0,0.4)',
            }}
          >
            <Film size={30} className="text-white" />
          </div>
        </div>

        <h1 className="text-2xl font-black text-white mb-2">Welcome to CineBook!</h1>
        <p className="text-slate-400 text-sm mb-1">
          Signed in as:{' '}
          <span className="text-white font-medium">{currentUser?.displayName ?? currentUser?.email}</span>
        </p>
        <p className="text-slate-500 text-xs mb-8">
          Authentication successful ✅ Dashboard coming soon...
        </p>

        <button
          onClick={logout}
          className="w-full py-3.5 rounded-xl text-white text-sm font-semibold transition-all duration-200 hover:opacity-85 hover:-translate-y-0.5 active:translate-y-0"
          style={{
            background: 'linear-gradient(135deg, #FF4D00, #FF6A00)',
            boxShadow: '0 0 20px rgba(255,77,0,0.3)',
          }}
        >
          Sign Out
        </button>
      </motion.div>
    </div>
  );
};

// ─────────────────────────────────────────────────
// App Component
// ─────────────────────────────────────────────────

/**
 * Root App component — sets up BrowserRouter, AuthProvider,
 * and all application routes.
 */
const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* ── Public Auth Routes ── */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* ── Protected Routes ── */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <DashboardPlaceholder />
              </ProtectedRoute>
            }
          />

          {/* ── Catch-all: redirect to login ── */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
