

module.exports = {
    entry: './index.js',
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets:[
                            [
                                "@babel/preset-env",
                                {
                                    targets: {
                                        chrome: "40",
                                    },
                                    useBuiltIns: "usage"
                                }
                            ]
                        ]
                    }
                }
            }
        ]
    }
};