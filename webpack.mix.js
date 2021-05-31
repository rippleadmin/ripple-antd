const mix = require('laravel-mix')
const fs = require('fs')

mix.setPublicPath('public')
  .js('resources/js/main.js', 'public/js')
  .webpackConfig({
    output: {
      publicPath: '/vendor/ingor-antd/',
      chunkFilename: 'js/[name].js?id=[chunkhash]'
    },
    externals: {
      vue: 'Vue'
    },
    resolve: {
      alias: {
        vue$: 'vue/dist/vue.runtime.esm.js',
        '@': path.resolve('resources/js')
      }
    },
    module: {
      rules: [
        {
          test: /\.less$/,
          loader: 'less-loader',
          options: {
            lessOptions: {
              javascriptEnabled: true
            }
          }
        },
        {
          test: /\.svg$/,
          loader: 'vue-svg-icon-loader'
        }
      ]
    }
  })
  .sourceMaps()
  .version()

// Auto copy assets to test Laravel project
fs.access('../ingor-test', error => {
  if (!error) {
    mix.then(() => {
      // Run Laravel Mix copy file method
      new (require('laravel-mix/src/tasks/CopyFilesTask'))({
        from: 'public',
        to: new (require('laravel-mix/src/File'))('../ingor-test/public/vendor/ingor-antd')
      }).run()
    })
  }
})
