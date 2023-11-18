import vitePluginRequire from "vite-plugin-require";
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import { defineConfig } from 'vite';


export default defineConfig({
	plugins: [
		nodePolyfills({
			include: ["buffer", "process"],
			globals: {
				Buffer: true,
				process: true,
			},
			protocolImports: false,
		}),
		// nodePolyfills({
		// 	include: ["buffer", "stream", "util", "crypto", "process"],
		// 	globals: {
		// 		Buffer: true,
		// 		global: true,
		// 		process: true,
		// 	},
		// 	protocolImports: false,
		// }),
		// vitePluginRequire.default()
	],
	server: {
		hmr: false,
	},

	build: {
		emptyOutDir: true,
		sourcemap: true,
		outDir: './build',
		// minify: "esbuild",
		rollupOptions: {
			input: {
				internal: "index.html",
				offlineframe: "offlineframe/index.html"
			},
			output: {
				compact: true,
			},
		},
	},
	base: './',
	root: './',
	// css: {
	//   postcss: {
	//     plugins: [
	//       autoprefixer()
	//     ]
	//   }
	// },
});
