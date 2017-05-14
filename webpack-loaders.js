const path = require('path');
const webpack = require('webpack');
const PATHS = require('./webpack-paths');

exports.devServer = function(options) {
  return {
    devServer:{
      historyApiFallback: true,
      hot: true,
      inline: true,
      stats: 'errors-only',
      host: options.host,
      port: options.port,
      contentBase: './client/dist',
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin({
        multistep: true
      })
    ]
  };
}

exports.css = {
  test: /\.css$/,
  use: ['style-loader', 'css-loader'],
  include: PATHS.css
};

exports.font = {
  test: /\.ttf$/,
  loaders: ['file-loader']
};

exports.babel = {
  test: /\.js?$/,
  exclude: path.resolve(__dirname, 'node_modules'),
  loader: 'babel-loader'
};

exports.eslint = {
  test : /\.js$/,
  enforce: 'pre',
  loader: 'eslint-loader',
  exclude : path.resolve(__dirname, 'node_modules'),
  options: {
    configFile: './.eslintrc'
  }
};
