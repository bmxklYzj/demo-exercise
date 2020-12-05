const { merge } = require('webpack-merge');

const devConfig = require('./webpack.config.base');

module.exports = merge(devConfig, {
  devServer: {
    port: 8080,
    open: true,
    hot: true,
    compress: true,
    stats: 'errors-only',
    overlay: true,
  }
});
