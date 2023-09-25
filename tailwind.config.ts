import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        app: {
          black: "hsl(190,100%,13%)",
          gray: {
            50: "hsl(165, 15%, 90%)",
            100: "hsl(164, 15%, 86%)",
            200: "hsl(166, 18%, 68%)",
          },
          green: {
            50: "hsl(100, 100, 99%)",
            100: "hsl(100, 100%, 95%)",
            200: "hsl(141, 39%, 75%)",
            300: "hsl(99, 84%, 85%)",
            400: "hsl(150, 46%, 52%)",
            500: "hsl(159, 78%, 30%)",
            600: "hsl(180, 65%, 24%)",
          },
          purple: {
            400: "hsl(281, 69%, 65%)",
            500: "hsl(234, 46%, 64%)",
          },
        }
      },
    },
  },
  plugins: [],
}
export default config
