import { resolve } from 'path'
import { defineConfig } from 'vite'
import benLoader from '../src/Plugins/ben'


console.log(resolve(__dirname, 'pages/test.html'))

export default defineConfig({
  // base: './',
  server: {

    port: 5174,
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'pages/index/index.html'),
        nested: resolve(__dirname, 'pages/test/index.html'),
      },
    },
    // lib: {
    //   entry: resolve(__dirname, 'src/main.js'),
    //   name: 'demo',
    //   fileName: 'demo'
    // },
  },
  plugins: [benLoader()],
  assetsInclude: ["**/*.htm"]
})