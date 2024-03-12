import { resolve } from 'path'
import { defineConfig } from 'vite'
import benLoader from '../src/Plugins/ben'

export default defineConfig({
  base: './',
  server: {
    host: "0.0.0.0",
    port: 5174,
  },
  build: {
    // rollupOptions: {
    //   input: {
    //     main: resolve(__dirname, 'index.html'),
    //     nested: resolve(__dirname, 'pages/test.htm'),
    //   },
    // },
    lib: {
      entry: resolve(__dirname, 'src/main.js'),
      name: 'demo',
      fileName: 'demo'
    },
  },
  plugins: [benLoader()],
  assetsInclude: ["**/*.htm"]
})