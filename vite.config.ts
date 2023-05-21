import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  // resolve: {
  //   alias: [
  //     {
  //       find: /^(.*)\.js$/,
  //       replacement: '$1',
  //     }
  //   ]
  // },
  server: {
    hmr: {
      protocol: 'ws',
    }
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        internal: resolve(__dirname, "rov-backend/internal_webpages/index.html"),
        offlineframe: resolve(__dirname, "rov-backend/internal_webpages/offlineframe/index.html"),
        serviceworker: resolve(__dirname, "serviceworker.ts")
      },
      output: {
        globals: {
          livekitServerSDK: "livekitServerSDK"
        }
      }
    },
  }
})
