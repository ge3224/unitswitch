import { defineConfig } from 'vite'
import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@pkg": path.resolve(__dirname, "./pkg"),
      "@lib": path.resolve(__dirname, "./src/lib"),
    },
  },
  esbuild: {
    jsx: 'transform',
    jsxFactory: 'createDomElement',
    jsxFragment: 'createDomFragment',
  },
})
