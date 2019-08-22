const path = require('path')
const root = path.resolve(__dirname, '..') // 当前目录的上级找到根路径
const vueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    mode: 'development',
    entry: path.join(root, 'entry/server-entry.js'),
    output: {
        libraryTarget: 'commonjs2', // node环境 
        path: path.join(root, 'dist'),
        filename: 'bundle.server.js'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            }
        ]
    },
    target: 'node', // 告诉是在node下处理的
    plugins: [new vueLoaderPlugin()] // 要用一下这个插件，装了vue-loader就能找到
    // 注意还要再装一个这个 cnpm install vue-template-compiler --save
    // 尝试打包webpack --config ./webpack/webpack.server.js
}

