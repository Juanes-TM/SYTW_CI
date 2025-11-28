import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'happy-dom', // Cambia de jsdom a happy-dom
    setupFiles: './src/setupTests.js',
    css: true,
    testTimeout: 30000,
    hookTimeout: 30000,
  },
})