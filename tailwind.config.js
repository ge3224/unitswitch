/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: colors.black,
      "black-usw": "hsl(190,100%,13%)",
      white: colors.white,
      slate: colors.slate,
      gray: colors.gray,
      "gray-usw-50": "hsl(165, 15%, 90%)",
      "gray-usw-100": "hsl(164, 15%, 86%)",
      "gray-usw-200": "hsl(166, 18%, 68%)",
      zinc: colors.zinc,
      neutral: colors.neutral,
      stone: colors.stone,
      red: colors.red,
      orange: colors.orange,
      amber: colors.amber,
      yellow: colors.yellow,
      lime: colors.lime,
      green: colors.green,
      "green-usw-50": "hsl(100, 100, 99%)",
      "green-usw-100": "hsl(100, 100%, 95%)",
      "green-usw-200": "hsl(141, 39%, 75%)",
      "green-usw-300": "hsl(99, 84%, 85%)",
      "green-usw-400": "hsl(150, 46%, 52%)",
      "green-usw-500": "hsl(159, 78%, 30%)",
      "green-usw-600": "hsl(180, 65%, 24%)",
      emerald: colors.emerald,
      teal: colors.teal,
      "teal-usw-500":"hsl(180, 52%, 82%)",
      cyan: colors.cyan,
      sky: colors.sky,
      blue: colors.blue,
      indigo: colors.indigo,
      "indigo-spot": "hsl(242, 20%, 27%)",
      violet: colors.violet,
      purple: colors.purple,
      "purple-usw-400": "hsl(281, 69%, 65%)",
      "purple-usw-500": "hsl(234, 46%, 64%)",
      fuchsia: colors.fuchsia,
      pink: colors.pink,
      rose: colors.rose,
      "brown-100":"hsl(40, 50%, 70%)",
      "brown-200":"hsl(40, 25%, 43%)",
    },
    extend: {
      fontFamily: {
        "serif": ["Georgia", "Times", "Times New Roman", "serif"],
        "sans": ["Segoe UI", "Roboto", "Helvetica", "Arial", "sans-serif", "Apple Color Emoji", "Segoe UI Emoji"],
        "plex": ["IBM Plex Sans", "sans-serif"],
        "plex-narrow": ["IBM Plex Sans Condensed", "sans-serif"],
        "space" :["Space Grotesk", "sans-serif"],
        "space-code" :["Space Mono", "monospace"],
      },
    },
  },
  plugins: [],
}
