const minimist = require('minimist');
const { resolve } = require('path');
const { build } = require('esbuild');

const args = minimist(process.argv.slice(2));

const target = args._[0]
if(!target) throw new Error('please specify the target!')

const format = args['f'] || 'global'

const pkg = require(resolve(__dirname, `./packages/${target}/package.json`));
const options = pkg.buildOptions;

const outputConfig = {
  'esm': {
    file: resolve(__dirname, `./packages/${target}/dist/${target}.esm-bundler.js`),
    format: 'es'
  },
  'cjs': {
    file: resolve(__dirname, `./packages/${target}/dist/${target}.cjs.js`),
    format: 'cjs'
  },
  'global': {
    file: resolve(__dirname, `./packages/${target}/dist/${target}.global.js`),
    format: 'iife'
  }
}

const outputFormat = outputConfig[format].format;
const outfile = outputConfig[format].file;

build({
  entryPoints: [resolve(__dirname, `./packages/${target}/src/index.ts`)],
  outfile,
  bundle: true, 
  sourcemap: true,
  format: outputFormat,
  globalName: options.name,
  platform: outputFormat === 'cjs' ? 'node' : 'browser',
  watch: {
    onRebuild(error) {
      if (!error) console.log('重打包：', target)
    }
  }
}).then(res => {
  console.log(' 监听 ：', target)
});