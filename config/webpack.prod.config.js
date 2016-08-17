var webpack = require("webpack");

var OptimizeCSSPlugin = require("optimize-css-assets-webpack-plugin");

var config = require("./webpack.config");

config.output = {
  path:       "./public/",
  publicPath: "",
  filename:   "assets/javascripts/[name].js"
};

config.plugins = (config.plugins || []).concat([
  new OptimizeCSSPlugin({
    cssProcessorOptions: {discardComments: {removeAll: true}}
  }),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  }),
  new webpack.optimize.OccurenceOrderPlugin()
]);

module.exports = config;
