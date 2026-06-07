import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/**
 * Vite Configuration — CineBook
 * Plugins:
 * - @vitejs/plugin-react: React JSX transform + Fast Refresh
 * - @tailwindcss/vite: Tailwind CSS v4 native Vite integration
 */
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})
