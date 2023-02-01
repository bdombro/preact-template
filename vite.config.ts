/// <reference types="vitest" />
import react from '@vitejs/plugin-react-swc'
import path from 'node:path'
import {defineConfig} from 'vite'
import mkcert from 'vite-plugin-mkcert'
import {VitePWA as vitePWA} from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), mkcert(), vitePWA({registerType: 'autoUpdate'})],
  build: {
    rollupOptions: {
      output: {
        // Disable code-splitting if so desired
        manualChunks: () => 'all',
      },
    },
  },
  resolve: {
    alias: {
      react: 'preact/compat',
      'react-dom': 'preact/compat',
      '~': path.resolve(__dirname, './src'),
    },
  },
  test: {
    alias: {
      // Use react for vitest bc it's having issues with preact
      react: 'react',
      'react-dom': 'react-dom',
    },
    environment: 'jsdom',
    globals: true,
  },
})
