var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var isProduction = process.argv.indexOf('--production') != -1;
var path = require('path');

var isRunningOnServer = process.argv.find(v => v.includes('webpack-dev-server'))

var plugins = [];

var entryPoints = [
    './src/devIndex.tsx',
    './styles/react-datetime.css'
];

if (isProduction) {
    // Adding Production environment specific features.

    plugins.push(
        new webpack.optimize.UglifyJsPlugin({  // Used for minification of .js and .css files.
            minimize: true,
            compress: {
                warnings: false
            }
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        })
    );
} else {
    // Adding Development environment specific features.
    entryPoints.push(
        'webpack/hot/only-dev-server'  // Used to enable hot reloading in webpack.
    );

    new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify('development')
        }
    })
}

plugins.push(
    new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'index.ejs'
    }),
    new ExtractTextPlugin({filename: 'style.css', allChunks: true}),
    new webpack.optimize.ModuleConcatenationPlugin()
);

var config = {
    entry: entryPoints,
    output: {
        path: path.join(__dirname, 'dist'),
        filename: isProduction ? 'bundle.[hash].min.js' : 'bundle.js',
        publicPath: '/'
    },
    devServer: {
        historyApiFallback: true
    },
    devtool: 'source-map',
    resolve: {
        modules: [
            path.resolve('./src'),
            "node_modules"
        ],
        extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.css', '.json', '.ejs'],
        enforceExtension: false
    },
    module: {
        loaders: [
            {test: /\.tsx?$/, loader: 'tslint-loader', exclude: /node_modules/, enforce: 'pre'},
            {test: /\.tsx?$/, exclude: /node_modules/, loaders: ['react-hot-loader/webpack', 'ts-loader']},
            {test: /\.css$/, loader: ExtractTextPlugin.extract({fallback: 'style-loader', use: 'css-loader'})},
            {test: /.(png|woff(2)?|eot|ttf|svg)(\?[a-z0-9=\.]+)?$/, loader: 'url-loader?limit=100000'},
            {test: /\.json$/, loader: 'json-loader' }
        ]
    },
    plugins: plugins
};

module.exports = config;
