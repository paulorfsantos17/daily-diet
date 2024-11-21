import swc from 'unplugin-swc'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  test: {
    globals: true,
    root: './',
    include: ['./src/**/*.spec.ts'],
    exclude: ['./data/*'],
  },
  plugins: [
    swc.vite({
      module: { type: 'es6' },
    }),
  ],
})
