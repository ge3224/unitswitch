/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    colors: {
      "black": "#003641",
      "gray-100": "#D6E1DE",
      "gray-200": "#9FBCB5",
      "gray-50": "#E1E9E7",
      "green-100": "#EFFFE7",
      "green-200": "#A8D9B9",
      "green-300": "#CFF9B9",
      "green-400": "#4EBD85",
      "green-50": "#FBFFF9",
      "green-500": "#118A5F",
      "green-600": "#156363",
      "orange-500": "#F27B57",
      "purple-400": "#BB66E3",
      "purple-500": "#7982CD",
      "teal":"#B9E9E9",
      "white": "#ffffff",
    },
    fontFamily: {
      sans:["Space Grotesk", "sans-serif"],
      code:["Space Mono", "monospace"],
    },
    extend: {},
  },
  plugins: [],
}
