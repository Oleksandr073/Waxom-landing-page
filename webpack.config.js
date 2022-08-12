const path = require('path');

module.exports = {
    // mode: 'development',
    mode: 'production',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'js'),
        filename: 'script.js',
    },
    // watch: true,
    devtool: 'source-map',
};