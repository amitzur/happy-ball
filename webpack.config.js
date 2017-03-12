module.exports = {
    devtool: "source-map",
    entry: './client/index.js',
    output: {
        filename: './dist/happy-ball.js'
    },
    module: {
        rules: [
            {test: /\.(js|jsx)$/, use: 'babel-loader'}
        ]
    }
};