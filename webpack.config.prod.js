const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const webpackBundleAnalyizer = require('webpack-bundle-analyzer')
require('custom-env').env()

process.env.NODE_ENV = 'production';

module.exports = {
  mode: 'production',
  target: 'web',
  devtool: 'source-map',
  entry: './src/index',
  output: {
    path: path.resolve(__dirname, "build"),
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
    new webpackBundleAnalyizer.BundleAnalyzerPlugin({ analyzerMode: "static" }),

    new MiniCSSExtractPlugin({
      filename: "[name].[contenthash].css"
    }),

    new webpack.DefinePlugin({
      "process.env.API_URL": JSON.stringify(`https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}`), // `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}`
      "process.env.AIRTABLE_API_KEY": JSON.stringify(process.env.AIRTABLE_API_KEY)
    }),
    new HtmlWebpackPlugin({
      template: "src/index.html",
      favicon: "src/favicon.ico",
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      }
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /(\.css)$/,
        use: [
          MiniCSSExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          },
          {
            loader: "postcss-loader",
            options: {
              plugins: () => [require("cssnano")],
              sourceMap: true
            }
          }
        ]
      }
    ]
  }
}