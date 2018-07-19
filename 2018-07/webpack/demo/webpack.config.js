const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
console.log(1, process.env.NODE_ENV);

module.exports = {
    mode: 'development',
    entry: {
        app: './src/demo.js',
        vendor: [
            'lodash'
        ]
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].[chunkhash].js',
    },
    devServer: {
        contentBase: './dist',
        hot: true
    },
    // devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(png|gif|jpg|jpeg)$/,
                use: [
                    'file-loader'
                ]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': 'production'
        }),
        new HtmlWebpackPlugin({
            title: 'output management'
        }),
        new CleanWebpackPlugin('dist'),
        new webpack.NamedModulesPlugin(),
        // new webpack.HotModuleReplacementPlugin(),


    ]
};
