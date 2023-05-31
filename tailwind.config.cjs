const daisyui = require('daisyui')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: ["forest", "winter"],
    styled: true,
    themes: true,
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    darkTheme: "forest",
  },
}
