/** ====================================================================================
    ====================================================================================
    WEBPACK CONFIGURATION - SEE BROWSERSYNC WHERE THIS IS PULLED IN AS MIDDLEWARE
    ====================================================================================
    ==================================================================================== */

import webpack from 'webpack';
import path from 'path';

const devServer = {
  contentBase: path.resolve(__dirname, '../../public'),
  colors: true,
  quiet: false,
  noInfo: false,
  publicPath: '/static/',
  historyApiFallback: true,
  host: '127.0.0.1',
  port: 4000,
  hot: true
};

module.exports = {
  debug: true,
  devServer: devServer,
  devtool: '#source-map',
  context: path.resolve(__dirname, '../../' ),
  entry: [
    'webpack/hot/dev-server',
    'webpack-hot-middleware/client',
    './example/src/scripts/index.js'
  ],
  output: {
    path: path.resolve(__dirname, '../../example/public/js'),
    filename: 'bundle.js',
    publicPath: '/static/', // this is basically store in memory
    pathinfo: true
  },

  module: {
    loaders: [
      { test: /\.js?$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.html$/, loader: 'html-loader' },
    ],
  },
  progress: true,
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.OldWatchingPlugin(),
    new webpack.optimize.DedupePlugin(),
  ]
};
