/**
 * ==================================================
 * useAuth Hook
 * --------------------------------------------------
 * Convenience re-export of the useAuth hook from
 * AuthContext for cleaner import paths.
 *
 * Usage:
 *   import { useAuth } from '../hooks/useAuth';
 *   const { currentUser, login } = useAuth();
 * ==================================================
 */

export { useAuth } from '../context/AuthContext';
