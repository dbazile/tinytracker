'use strict';

const webpack = require('webpack');
const path = require('path');
const package_ = require('./package.json');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const __environment = process.env.NODE_ENV || 'development'

module.exports = {
  context: __dirname,
  entry: './app/index.js',
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
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(__environment)
    }),
    new HtmlWebpackPlugin({
      title: `${package_.name} v${package_.version}`,
      favicon: 'app/images/favicon.png',
      hash: true,
    })
  ]
};

if (process.env.NODE_ENV === 'production') {
  const plugins = module.exports.plugins;
  plugins.push(new webpack.optimize.UglifyJsPlugin());
}
