const common = require('./webpack.common');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglify-js-plugin');

module.exports = merge(common, {
    devtool: 'source-map',
    plugins: [
        new UglifyJSPlugin()
    ]
});
