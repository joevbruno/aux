'use strict';
var path = require('path');
var webpack = require('webpack');

module.exports = {
    debug: true,
    devtool: '#source-map', //'#source-map'
    context: path.resolve(__dirname), //  __dirname,
    entry: [
        './src/index.js'
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        pathinfo: true
    },

    module: {
        loaders: [
            { test: /\.js?$/, exclude: /node_modules/, loader: "babel-loader" },
        ],
    },
    progress: true,
};
