import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  // Development server configuration
  server: {
    port: 3000,
    host: true, // Allow external connections
    open: true, // Auto-open browser
    cors: true,
  },

  // Build configuration
  build: {
    outDir: 'dist',
    sourcemap: true,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          bootstrap: ['bootstrap', 'react-bootstrap'],
          maps: ['@react-google-maps/api', '@vis.gl/react-google-maps'],
          charts: ['highcharts', 'highcharts-react-official']
        }
      }
    }
  },

  // Preview server configuration  
  preview: {
    port: 3000,
    host: true,
    cors: true,
  },

  // Define aliases for cleaner imports
  resolve: {
    alias: {
      '@': '/src'
    }
  },

  // Environment variables configuration
  envPrefix: 'VITE_',
})
