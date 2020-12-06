const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
    entry: '/src/app/index.js',
    output: {
        path: path.join(__dirname, 'src/public/js'),
        filename: 'bundle.js'
    },
    module: {
        rules:[
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader'
                },
                exclude: /node_modules/
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin()
    ]
}