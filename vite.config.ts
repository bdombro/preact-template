/// <reference types="vitest" />
import preact from '@preact/preset-vite'
import react from '@vitejs/plugin-react-swc'
import {merge} from 'merge-anything'
import {resolve} from 'node:path'
import {UserConfigExport, defineConfig} from 'vite'
import mkcert from 'vite-plugin-mkcert'
import {VitePWA as vitePWA} from 'vite-plugin-pwa'

const invokation = process.argv[1].split('/').at(-1) // i.e. vite, vitest or storybook

const prodConfig: UserConfigExport = {
  plugins: [
    /*
     * The react plugin works too, but HMR breaks and you loose some dev features.
     * Pro tip: you can use vanilla react and react dev tools if you swap the preact
     * plugin with react and disable the preact alias. Sometimes useful for debugging,
     * and React dev tools are little more feature rich.
     */
    preact(),
    mkcert(),
    vitePWA({registerType: 'autoUpdate'}),
  ],
  resolve: {
    alias: {
      react: 'preact/compat',
      'react-dom': 'preact/compat',
      '~': resolve(__dirname, 'src'),
    },
  },
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
            return 'icons/' + id.split('/').at(-1).slice(0, -3)
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
}

const storybookConfig: UserConfigExport = merge(prodConfig, {
  // storybook doesn't like preact plugin but is fine with alias.
  // But, let's undo alias anyways so HMR works.
  plugins: [react(), ...prodConfig.plugins.slice(1)],
  resolve: {
    alias: {
      react: 'react',
      'react-dom': 'react-dom',
    },
  },
})

const vitestconfig: UserConfigExport = merge(prodConfig, {
  // vitest doesn't like preact plugin or alias
  plugins: [react(), ...prodConfig.plugins.slice(1)],
  resolve: {
    alias: {
      react: 'react',
      'react-dom': 'react-dom',
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
  },
})

// https://vitejs.dev/config/
export default defineConfig(
  invokation === 'vitest' ? vitestconfig : invokation === 'storybook' ? storybookConfig : prodConfig
)
