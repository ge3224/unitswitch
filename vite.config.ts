import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  test: {
    exclude: ['pkg'],
    globals: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@pkg': path.resolve(__dirname, './pkg'),
    },
  },
  esbuild: {
    jsx: 'transform',
    jsxFactory: 'createDomElement',
    jsxFragment: 'createDomFragment',
  },
})
