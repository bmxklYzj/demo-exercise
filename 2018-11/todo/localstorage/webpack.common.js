/**
 * @file webpack common
 *
 * @author yangzongjun
 * @date 2018-11-12
 */

const path = require('path');
const Webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    index: './src/index/index.js'
  },
  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
        {
            test: /\.js$/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: [
                        '@babel/preset-env'
                    ]
                }
            },
            exclude: /node_modules/
        },
        {
            test: /\.css$/,
            use: [
                'style-loader',
                'css-loader'
            ]
        },
        {
            test: /\.less$/,
            use: [
                'style-loader',
                'css-loader',
                'less-loader'
            ]
        },
        {
            test: /\.(png|jpg|jpeg|svg|gif|webp)$/,
            use: [
                {
                    loader: 'file-loader',
                    options: {
                        name: 'assets/img/[name].[hash:6].[ext]'
                    }
                }
            ]
        },
        {
            test: /\.(woff|woff2|eot|ttf|otf)$/,
            use: [
                'file-loader'
            ]
        },
        {
            test: /\.html$/,
            use: [
                'html-loader'
            ]
        }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist'])
    // new CopyWebpackPlugin([
    //     {
    //         context: './src',
    //         from: 'assets/**'
    //     }
    // ])
  ]
};