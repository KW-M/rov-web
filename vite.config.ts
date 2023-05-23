import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { ViteEntrypointRewritePlugin } from './tooling/vite-plugin-mp'
// import resolve from 'vite-plugin-resolve'
// import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  // appType: 'mpa',
  publicDir: 'frontend/public',
  plugins: [
    svelte(),
    ViteEntrypointRewritePlugin({
      "index.html": "frontend/index.html",
      "internal/index.html": "rov-backend/internal_webpages/index.html",
      "offlineframe/index.html": "rov-backend/internal_webpages/offlineframe/index.html",
      "serviceworker.ts": "shared/js/serviceworker/serviceworker.ts"
    }),
  ],
  // css: {
  //   postcss: {
  //     plugins: [
  //       autoprefixer()
  //     ]
  //   }
  // },
  build: {
    emptyOutDir: true,
    sourcemap: true,
    outDir: './dist',
    rollupOptions: {
      output: {
        globals: {
          livekitServerSDK: "livekitServerSDK"
        },
        compact: true,
      },
    },

  },
})
