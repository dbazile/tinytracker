'use strict';

const webpack = require('webpack');
const path = require('path');
const package_ = require('./package.json');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: path.join(__dirname, 'app'),
  entry: './index.js',
  devtool: 'source-map',

  resolve: {
    extensions: ['', '.js', '.jsx']
  },

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },

  module: {
    preLoaders: [
      {test: /\.jsx?$/, loader: 'eslint', exclude: /node_modules/}
    ],
    loaders: [
      {test: /\.jsx?$/, loader: 'babel', exclude: /node_modules/},
      {test: /\.css$/, loader: 'style!css?modules&localIdentName=[name]__[local]'},
      {test: /\.(png|jpg|gif)$/, loader: 'file'}
    ]
  },

  plugins: [
    new webpack.EnvironmentPlugin(['NODE_ENV']),
    new HtmlWebpackPlugin({
      title: `${package_.name} v${package_.version}`,
      favicon: path.join(__dirname, 'app/images/favicon.png')
    })
  ]
};

if (process.env.NODE_ENV === 'production') {
  const plugins = module.exports.plugins;
  plugins.push(new webpack.optimize.UglifyJsPlugin());
}
