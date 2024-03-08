import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  base: './',
  server: {
    host: "0.0.0.0",
    port: 5174,
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        nested: resolve(__dirname, 'demo/test.html'),
      },
    },
  },
})