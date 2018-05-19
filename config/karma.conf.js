const karmaChromeLauncher = require('karma-chrome-launcher');
const karmaTap = require('karma-tap');
const karmaTapPrettyReporter = require('karma-tap-pretty-reporter');
const karmaWebpack = require('karma-webpack');

// Use the exact same webpack config by requiring it
// but make sure to delete the normal entry
const webpackConf = require('./webpack.config');

delete webpackConf.entry;
delete webpackConf.plugins;
webpackConf.node = {
  fs: 'empty',
};

webpackConf.stats = 'none';

module.exports = (config) => {
  config.set({
    plugins: [
      karmaChromeLauncher,
      karmaTap,
      karmaTapPrettyReporter,
      karmaWebpack,
    ],
    browsers: ['Chrome'],
    frameworks: ['tap'],
    reporters: ['tap-pretty'],
    tapReporter: {
      prettifier: 'tap-summary',
    },
    files: [ // entry file for all tests
      '../src/javascripts/test_entry.js',
    ],
    preprocessors: { // pass the entry file to webpack for bundling
      '../src/javascripts/test_entry.js': ['webpack'],
    },
    client: {
      captureConsole: false,
    },
    webpack: webpackConf,
    webpackMiddleware: {
      noInfo: true,
    },
    singleRun: true,
    colors: true,
  });
};
