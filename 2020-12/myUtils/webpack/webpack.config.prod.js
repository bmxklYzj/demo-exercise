const { merge } = require('webpack-merge');

const devConfig = require('./webpack.config.base');

process.env.NODE_ENV = 'production'
module.exports = merge(devConfig, {
  mode: 'production'
});
