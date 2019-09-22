/* eslint-disable import/no-extraneous-dependencies */
const karmaFirefoxLauncher = require('karma-firefox-launcher');
const karmaTap = require('karma-tap');
const karmaTapPrettyReporter = require('karma-tap-pretty-reporter');
const karmaWebpack = require('karma-webpack');
/* eslint-enable import/no-extraneous-dependencies */

// Use the exact same webpack config by requiring it
// but make sure to delete the normal entry
const webpackConf = require('./webpack.config');

delete webpackConf.entry;
delete webpackConf.plugins;
webpackConf.node = {
  fs: 'empty',
};

webpackConf.stats = 'none';

module.exports = config => {
  config.set({
    plugins: [karmaFirefoxLauncher, karmaTap, karmaTapPrettyReporter, karmaWebpack],
    browsers: ['FirefoxHeadless'],
    frameworks: ['tap'],
    reporters: ['tap-pretty'],
    tapReporter: {
      prettifier: 'tap-summary',
    },
    files: [
      // entry file for all tests
      '../src/javascripts/test_entry.js',
    ],
    preprocessors: {
      // pass the entry file to webpack for bundling
      '../src/javascripts/test_entry.js': ['webpack'],
    },
    client: {
      captureConsole: true,
    },
    webpack: webpackConf,
    webpackMiddleware: {
      noInfo: true,
    },
    port: 9899,
    autoWatch: false,
    singleRun: true,
    colors: true,
  });
};
