import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  test: {
    globals: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@pkg': path.resolve(__dirname, './pkg'),
    },
  },
})
