const commonConfig = require('./webpack.common');
const merge = require('webpack-merge');
const Webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(commonConfig, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist'
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index/index.html',
      chunks: ['index']
    }),
    new HtmlWebpackPlugin({
      filename: 'detail.html',
      template: 'src/detail/detail.html',
      chunks: ['detail']
    }),
    new Webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ]
});