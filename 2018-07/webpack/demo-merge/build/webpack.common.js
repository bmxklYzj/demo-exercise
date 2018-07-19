const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].bundle.js'
    },
    plugins: [
        new CleanWebpackPlugin(['/dist']),
        new HtmlWebpackPlugin({
            title: 'test',
            template: 'index.html'
        })
    ]
};
