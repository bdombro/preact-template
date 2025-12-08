import { resolve } from "node:path"
import preact from "@preact/preset-vite"
import { defineConfig, UserConfigExport } from "vite"
import mkcert from "vite-plugin-mkcert"
import { VitePWA as vitePWA } from "vite-plugin-pwa"

// https://vitejs.dev/config/

export default defineConfig({
	plugins: [
		/*
		 * The react plugin works too, but HMR breaks and you loose some dev features.
		 * Pro tip: you can use vanilla react and react dev tools if you swap the preact
		 * plugin with react and disable the preact alias. Sometimes useful for debugging,
		 * and React dev tools are little more feature rich.
		 */
		preact(),
		!process.env.NOSSL && mkcert(),
		vitePWA({ registerType: "autoUpdate" }),
	],
	resolve: {
		alias: {
			react: "preact/compat",
			"react-dom": "preact/compat",
			"~": resolve(__dirname, "src"),
		},
	},
	build: {
		// cssCodeSplit: false,
		modulePreload: {
			// Disable module preload bc it disrupts lazy loading, and the service worker
			// will download them in the background anyways.
			resolveDependencies: () => [],
		},
		rollupOptions: {
			input: {
				main: resolve(__dirname, "index.html"),
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
				// manualChunks: id => {
				//   const fileNameNoExt = id.split('/').at(-1).split('.').slice(0, -1).join('.')
				//   if (id.includes('@slimr/mdi-paths') && !id.includes('component')) {
				//     return 'icons/' + fileNameNoExt
				//   }
				//   if (id.includes('highlight.js') && !id.includes('lazy')) {
				//     return 'highlightjs'
				//   }
				//   // if (id.includes('@slimr')) {
				//   //   return 'slimr'
				//   // }
				//   // if (id.includes('pages') && !id.includes('pages/index')) {
				//   //   return 'pages/' + fileNameNoExt
				//   // }
				//   if (id.includes('workbox')) {
				//     return 'workbox'
				//   }
				//   // return 'main'
				// },
			},
		},
	},
})
