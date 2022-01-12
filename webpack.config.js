const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');


module.exports = {
    mode: 'development',
    entry: {
        index: './src/js/first_page/index.js',
        game: './src/js/game/game.js',
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
        filename: 'index.html',
        chunks: ['index']
    }),
    new HtmlWebpackPlugin({
        template: 'src/game.html',
        filename: 'game.html',
        chunks:['game']
    }),
    new CleanWebpackPlugin()
    ],
    output: {
        filename: '[name].js',
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