const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');


module.exports = {
    mode: 'development',
    entry: {
        index: './src/js/index.js',
        game: './src/js/game.js',
    },
    devServer: {
        static : {
            directory : path.join(__dirname, "dist")
        },
        port: 3000
    },
    plugins: [
    new HtmlWebpackPlugin({
        template: 'src/index.html',
        filename: 'index.html'
    }),
    new HtmlWebpackPlugin({
        template: 'src/game.html',
        filename: 'game.html'
    }),
    new CleanWebpackPlugin()
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname,'dist')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    }
};