/// <reference types="vitest" />

import path from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import Astroturf from 'astroturf/vite-plugin.js'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const astroturf = (Astroturf as any).default()

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), astroturf],
  resolve: {
    alias: {
      react: 'preact/compat',
      'react-dom': 'preact/compat',
      '~': path.resolve(__dirname, './src'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    // Use react for vitest bc it's having issues with preact
    alias: {
      react: 'react',
      'react-dom': 'react-dom',
    },
  },
})
