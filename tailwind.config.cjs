/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  // theme: {
  //   extend: {},
  // },
  plugins: [require("daisyui")],
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
