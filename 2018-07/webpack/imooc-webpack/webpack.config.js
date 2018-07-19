const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        main: './src/main.js',
        a: './src/a.js'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'js/[name].[chunkhash].js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html',
            inject: 'head',
            title: 'hello title',
            date: new Date()
        }),
        new CleanWebpackPlugin('dist')
    ]
};
