/** ====================================================================================
    ====================================================================================
    WEBPACK CONFIGURATION - SEE BROWSERSYNC WHERE THIS IS PULLED IN AS MIDDLEWARE
    ====================================================================================
    ==================================================================================== */

var webpack = require('webpack');
var path = require('path');

module.exports = {
  debug: false,
  devtool: '#eval',
  context: path.resolve(__dirname),
  entry: [
    './src/index.js'
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/', // this is basically store in memory
    pathinfo: true
  },

  module: {
    loaders: [
      { test: /\.js?$/, exclude: /node_modules/, loader: 'babel-loader' }
    ],
  },
  progress: true,
  plugins: [
    new webpack.NoErrorsPlugin(),
  ]
};
