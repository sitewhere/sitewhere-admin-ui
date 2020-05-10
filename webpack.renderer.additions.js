module.exports = {
    module: {
        rules: [
            {
                test: /\.styl$/,
                use: [
                    {
                        loader: "css-loader" // translates CSS into CommonJS
                    },
                    {
                        loader: "stylus-loader" // compiles Stylus to CSS
                    }
                ]
            }
        ]
    }
};