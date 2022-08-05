/// <reference types="vitest" />

import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      api: resolve(__dirname, './src/api'),
    },
  },
  plugins: [Vue()],
  test: {
    globals: true,
    environment: 'jsdom',
  },
})
