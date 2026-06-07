import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { initAnalytics } from './services/firebase.ts'

/**
 * CineBook — Application Entry Point
 *
 * Renders the root React application and lazily initializes
 * Firebase Analytics after mount (browser-environment-safe).
 */
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Initialize Firebase Analytics (browser-only, non-blocking)
initAnalytics().catch(console.error)
