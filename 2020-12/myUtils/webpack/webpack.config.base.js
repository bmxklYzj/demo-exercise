const path = require('path');
const webpack = require('webpack');

const env = 'development';

process.env.NODE_ENV = env;
console.log('yzj', path.join(__dirname, 'src/index.ts'))
const config = {
  mode: env,
  entry: {
    index: path.join(__dirname, '../src/index.ts'),
  },
  output: {
    path: path.join(__dirname, '../dist'),
    filename: '[name].js',
  },
  resolve: {
    extensions: ['ts'],
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        exclude: /node_modules/,
        loader: require.resolve('babel-loader'),
      },
    ],
  },
  plugins: [
  ],
};

module.exports = config;
