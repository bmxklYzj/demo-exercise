const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // extract-text-plugin 已不适用于webpack4
const CleanWebpackPlugin = require('clean-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development';

let config = {
    mode: 'development',
    target: 'web',
    entry: path.join(__dirname, 'src/index.js'),
    output: {
        filename: '[name].[hash].js',
        path: path.join(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: ['vue-loader']
            },
            {
                test: /\.jsx$/,
                use: ['babel-loader']
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|gif|jpg|jpeg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 5000,
                            name: '[name].[hash:8].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': isDev ? '"development"' : '"production"'
        })
    ]
};

if (isDev) {
    config.devtool = 'eval-source-map',
    config.devServer = {
        port: 8088,
        host: '0.0.0.0',
        overlay: {
            errors: true
        },
        hot: true
    };
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
    );
    config.module.rules.push(
        {
            test: /\.less$/,
            use: [
                'style-loader',
                'css-loader',
                {
                    loader: 'postcss-loader',
                    options: {
                        sourceMap: true
                    }
                },
                'less-loader'
            ]
        }
    );
}
else {
    config.mode = 'production';
    config.entry = {
        app: path.join(__dirname, 'src/index.js'),
        vendor: ['vue']
    };
    config.optimization = {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    name: 'vendor'
                }
            }
        }
    };
    config.module.rules.push(
        {
            test: /\.less$/,
            use: [
                MiniCssExtractPlugin.loader,
                'css-loader',
                {
                    loader: 'postcss-loader',
                    options: {
                        sourceMap: true
                    }
                },
                'less-loader'
            ]
        }
    );
    config.plugins.push(
        new MiniCssExtractPlugin({
            filename: 'style.[contentHash:8].css'
        }),
        new CleanWebpackPlugin('dist')
    );
    config.output.filename = '[name].[chunkHash:8].js';
}

module.exports = config;
