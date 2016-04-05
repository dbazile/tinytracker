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
      {test: /\.css$/, loader: 'style!css'},
      {test: /\.less$/, loader: 'style!css?modules&localIdentName=[name]__[local]!less'},
      {test: /\.(png|jpg|gif)$/, loader: 'file'}
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: `${package_.name} v${package_.version}`,
      favicon: path.join(__dirname, 'app/images/favicon.png')
    })
  ]
};

if (process.env.IS_PROD_BUILD) {
  const plugins = module.exports.plugins;
  plugins.push(new webpack.DefinePlugin({'process.env.NODE_ENV': '"production"'}));
  plugins.push(new webpack.UglifyJsPlugin());
}
