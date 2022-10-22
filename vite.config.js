import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
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
  plugins: [svelte()]
})
