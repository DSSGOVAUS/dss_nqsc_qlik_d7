import webpack from 'webpack'
import CleanWebpackPlugin from 'clean-webpack-plugin'
import path from 'path'

export default {
  entry: path.join(__dirname, 'src/index.js'),
  output: {
    library: 'QlikApp',
    path: path.join(__dirname, 'dist'),
    filename: 'qlik_search_app.js'
  },
  module: {
    rules: [{
      test: /\.js/,
      exclude: /(node_modules|bower_components)/,
      use: [{
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                debug: false,
                targets: {
                  ie: '10'
                },
                useBuiltIns: 'entry'
              }
            ]
          ]
        }
      }]
    }]
  },
  plugins: [
    new CleanWebpackPlugin()
  ],
  externals: {
    'js/qlik': 'commonjs js/qlik'
  },
  stats: {
    colors: true
  },
  devtool: 'source-map',
  watch: true
}
