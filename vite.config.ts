// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference types="vitest" />

import path from 'node:path'
import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react-swc'
import linaria from '@linaria/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), linaria()],
  resolve: {
    alias: {
      react: 'preact/compat',
      'react-dom': 'preact/compat',
      // eslint-disable-next-line @typescript-eslint/naming-convention, unicorn/prefer-module
      '~': path.resolve(__dirname, './src'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
  },
})
