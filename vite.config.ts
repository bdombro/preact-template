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
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        // Comment out manualChunks for default code-splitting

        /**
         * Manual chunks is a key/val or function that returns an answer
         * of which bundle a module should be placed in for splitting.
         * Returning undefined will use the default strategy.
         *
         * @param {string} id - The module id aka the path to the module
         *
         * @returns {string | undefined} - The name of the chunk to place the module in or undefined to use default
         */
        manualChunks: (/* id */) => {
          /**
           * ATM we're better off without icon splitting. Tree shaking already saves us a TON.
           * - Each icon is ~100B
           * - Bundled together = ~520B
           * - Bundled with main = ~390B
           */
          // if (id.includes('mdi-paths-split')) {
          //   return 'icons'
          // }

          // ATM we're better off without page splitting
          // if (!id.includes('pages')) {
          //   return
          // }

          return 'main'
        },
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
