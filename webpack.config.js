'use strict';

var webpack = require('webpack'),
    jsPath  = 'app/assets/javascripts',
    path = require('path'),
    srcPath = path.join(__dirname, 'app/assets/javascripts');

var config = {
    target: 'web',
    entry: {
        app: path.join(srcPath, 'main.tsx')
        //, common: ['react-dom', 'react']
    },
    resolve: {
        alias: {},
        root: srcPath,
        extensions: ['', ".ts", ".tsx", ".js", ".json"],
        modulesDirectories: ['node_modules', jsPath]
    },
    output: {
        path:path.resolve(__dirname, jsPath, 'build'),
        publicPath: '',
        filename: '[name].js',
        pathInfo: true
    },

    devtool: "source-map",
    
    module: {
        noParse: [],
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel'
            },
            {
                test: /\.scss$/,
                loader: 'style!css!sass'
            },
            { 
            	test: /\.css$/, 
            	loader: 'style-loader!css-loader' 
            },
            { test: /\.tsx?$/, loader: "babel!awesome-typescript-loader" },
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
            { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=100000000000" },
            { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000000000" },
            { test: /\.png$/, loader: "url-loader?limit=100000000" },
            { test: /\.jpg$/, loader: "url-loader?limit=100000000" }
        ]
    },
    sassLoader: {
        includePaths: [path.resolve(__dirname, '\/app\/assets')]
    }
};

module.exports = config;