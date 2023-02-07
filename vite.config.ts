/// <reference types="vitest" />
import react from '@vitejs/plugin-react-swc'
import {resolve} from 'node:path'
import {defineConfig} from 'vite'
import mkcert from 'vite-plugin-mkcert'
import {VitePWA as vitePWA} from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), mkcert(), vitePWA({registerType: 'autoUpdate'})],
  build: {
    cssCodeSplit: false,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
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
        manualChunks: id => {
          if (id.includes('mdi-paths-split')) {
            return
          }

          // ATM we're better off without page splitting
          // if (!id.includes('pages')) {
          //   return
          // }

          if (id.includes('workbox')) {
            return 'workbox'
          }

          return 'main'
        },
      },
    },
  },
  resolve: {
    alias: {
      react: 'preact/compat',
      'react-dom': 'preact/compat',
      '~': resolve(__dirname, 'src'),
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
