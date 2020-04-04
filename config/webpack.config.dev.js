const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const root = path.join(__dirname, '../examples/src');

module.exports = {
    entry: path.join(root, 'index.js'),
    output: {
        path: path.join(__dirname, '../examples/dist'),
        filename: 'bundle.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(root, 'index.html'),
            filename: './index.html'
        })
    ],
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: [{loader: 'babel-loader'}],
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: 'dropdown_[local]',
                            },
                            importLoaders: 1,
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            // Prefer `dart-sass`
                            implementation: require('sass'),
                        },
                    },
                ],
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ],
            },
        ]
    },
    devtool: 'source-map',
    devServer: {
        hot: true,
    }
};