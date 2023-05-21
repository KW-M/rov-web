import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { join, parse, resolve } from "path";

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
  alias: {
    // "@": resolve(__dirname, './assets'), // will resolve to `/assets/`
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        backend: resolve(__dirname, "backend/index.html"),
        frontend: resolve(__dirname, "frontend/index.html"),
        offlineframe: resolve(__dirname, "offlineframe/index.html"),
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
