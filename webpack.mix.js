const mix = require('laravel-mix')
const fs = require('fs')

mix.setPublicPath('public')
  .js('resources/js/main.js', 'public/js')
  .webpackConfig({
    output: {
      publicPath: '/vendor/water-antd/',
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
fs.access('../ripple-test', error => {
  if (!error) {
    mix.then(() => {
      // Run Laravel Mix copy file method
      new (require('laravel-mix/src/tasks/CopyFilesTask'))({
        from: 'public',
        to: new File('../ripple-test/public/vendor/water-antd')
      }).run()
    })
  }
})
