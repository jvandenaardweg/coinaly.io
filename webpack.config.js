const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MinifyPlugin = require('babel-minify-webpack-plugin')
const HtmlCriticalPlugin = require("html-critical-webpack-plugin")

const extractSass = new ExtractTextPlugin({
  filename: 'css/[name].[hash].css',
  disable: process.env.NODE_ENV === 'development'
})

const config = {
  mode: 'development',
  context: path.resolve(__dirname, 'src'),
  entry: {
    app: './js/app.js'
  },
  output: {
    filename: 'js/[name]-[hash].js'
  },
  externals: path.resolve(__dirname, 'node_modules'),
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 3000,
    stats: {
      children: false,
      chunks: false,
      hash: false,
      modules: false,
      publicPath: false,
      version: false,
      warnings: true
    }
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                url: false,
                minimize: true,
                sourceMap: true
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            }
          ]
        })
      },
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['env']
            }
          }
        ],
        exclude: [/node_modules/]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              limit: 8000, // Convert images < 8kb to base64 strings
              name: '[path][hash]-[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader']
      },
      {
        test: /\.html$/,
        use: [ {
          loader: 'html-loader',
          options: {
            minimize: true
          }
        }]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    extractSass,
    new MinifyPlugin(),
    new HtmlWebpackPlugin({
      filename: './index.html',
      template: './index.html'
    }),
    new CopyWebpackPlugin([
      { from: './images/social/social.png', to: './images/social/social.png' }
    ])
    // new HtmlCriticalPlugin({
    //   base: path.resolve(__dirname, 'dist'),
    //   src: 'index.html',
    //   dest: 'index.html',
    //   inline: true,
    //   minify: true,
    //   extract: true,
    //   width: 375,
    //   height: 565,
    //   penthouse: {
    //     blockJSRequests: false,
    //   }
    // })
  ]
}

module.exports = config
