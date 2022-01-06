const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');


module.exports = {
    mode: 'development',
    entry: {
        app: './src/index.js',
        profile: './src/profile.js',
    },
    devServer: {
        static : {
            directory : path.join(__dirname, "dist")
        },
        port: 3000
    },
    plugins: [
    new HtmlWebpackPlugin(),
    new HtmlWebpackPlugin({
        template: 'src/template.html',
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