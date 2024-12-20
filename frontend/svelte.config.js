import adapterStatic from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte'],
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: [vitePreprocess()],

	vitePlugin: {
		inspector: true,
	},
	kit: {
		adapter: adapterStatic({ fallback: "404.html", strict: false, precompress: true }),
		paths: { relative: true, base: '/rov-web' },
		prerender: {},
		serviceWorker: {
			// files: "service-worker.ts"
		},
		// typescript: {
		// 	// ignoreBuildErrors: true,
		// 	config: (config) => {
		// 		config.compilerOptions = Object.assign(config.compilerOptions, {
		// 			"allowJs": true,
		// 			"checkJs": false,
		// 			"esModuleInterop": true,
		// 			"noEmit": true,
		// 			"useDefineForClassFields": true,
		// 			"forceConsistentCasingInFileNames": false,
		// 			"resolveJsonModule": true,
		// 			"skipLibCheck": true,
		// 			"sourceMap": false,
		// 			"isolatedModules": false,
		// 			"strict": false,
		// 			"lib": [
		// 				"esnext",
		// 				"DOM",
		// 				"DOM.Iterable",
		// 				"WebWorker"
		// 			],
		// 			// "baseUrl": "./",
		// 			// "noEmit": true,
		// 		});
		// 		log(config);
		// 		return config
		// 	}
		// },

	}
};
export default config;
