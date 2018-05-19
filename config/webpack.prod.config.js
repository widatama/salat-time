const path = require('path');

const OptimizeCSSPlugin = require("optimize-css-assets-webpack-plugin");
const WebpackStylish = require('webpack-stylish');

const webpackConfig = require('./webpack.config');
const appConfig = require('./app.config');

webpackConfig.mode = 'production';
webpackConfig.stats = 'none';

webpackConfig.output = {
  path: path.resolve('', `./${appConfig.paths.dist.path}/`),
  publicPath: '',
  filename: `${appConfig.paths.dist.javascriptsPath}/${appConfig.bundleNames.js}`,
};

webpackConfig.plugins = (webpackConfig.plugins || []).concat([
  new OptimizeCSSPlugin({
    cssProcessorOptions: { discardComments: { removeAll: true } },
  }),
  new WebpackStylish(),
]);

module.exports = webpackConfig;
