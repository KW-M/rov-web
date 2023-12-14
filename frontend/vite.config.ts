import { purgeCss } from 'vite-plugin-tailwind-purgecss';
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import vitePluginRequire from "vite-plugin-require";
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';


export default defineConfig({
	plugins: [
		nodePolyfills({
			include: ["buffer", "stream", "util", "crypto","process"],
			globals: {
				Buffer: true,
				global: true,
				process: true,
			},
			protocolImports: false,
		}), vitePluginRequire.default(), sveltekit() ],
		//purgeCss()
	server: {
		hmr: true,
	},
	build: {
		emptyOutDir: true,
		sourcemap: true,
		rollupOptions: {
			output: {
				compact: true,
			},
		},
	},
	// css: {
	//   postcss: {
	//     plugins: [
	//       autoprefixer()
	//     ]
	//   }
	// },
});
