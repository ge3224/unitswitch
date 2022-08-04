/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    colors: {
      "white": "#ffffff",
      "black": "#003641",
      "gray-50": "#E1E9E7",
      "green-50": "#FBFFF9",
      "green-100": "#EFFFE7",
      "green-400": "#4EBD85",
      "green-500": "#118A5F",
      "green-600": "#156363",
      "purple": "#626584",
      "teal":"#B9E9E9",
    },
    fontFamily: {
      sans:["Space Grotesk", "sans-serif"],
      code:["Space Mono", "monospace"],
    },
    extend: {},
  },
  plugins: [],
}
