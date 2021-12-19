/* eslint-disable import/no-extraneous-dependencies, @typescript-eslint/no-var-requires */
const isDocker = require('is-docker');
const karmaChromeLauncher = require('karma-chrome-launcher');
const karmaTap = require('karma-tap');
const karmaTapPrettyReporter = require('karma-tap-pretty-reporter');
const karmaWebpack = require('karma-webpack');
/* eslint-enable import/no-extraneous-dependencies, @typescript-eslint/no-var-requires */

if (isDocker()) {
  /* eslint-disable import/no-extraneous-dependencies, import/no-unresolved */
  /* eslint-disable global-require, @typescript-eslint/no-var-requires */
  process.env.CHROME_BIN = require('puppeteer').executablePath();
  /* eslint-enable global-require, @typescript-eslint/no-var-requires */
  /* eslint-enable import/no-extraneous-dependencies, import/no-unresolved */
}

// Use the exact same webpack config by requiring it
// but make sure to delete the normal entry
// eslint-disable-next-line @typescript-eslint/no-var-requires
const webpackConf = require('./node_modules/@vue/cli-service/webpack.config.js');

delete webpackConf.entry;
delete webpackConf.plugins;
webpackConf.node = {
  fs: 'empty',
};
webpackConf.stats = 'none';

module.exports = (config) => {
  config.set({
    plugins: [karmaChromeLauncher, karmaTap, karmaTapPrettyReporter, karmaWebpack],
    browsers: ['ChromeCustom'],
    customLaunchers: {
      ChromeCustom: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox', '--disable-setuid-sandbox'],
      },
    },
    frameworks: ['tap'],
    reporters: ['tap-pretty'],
    tapReporter: {
      prettifier: 'tap-summary',
    },
    files: [
      // entry file for all tests
      './test/entries.js',
    ],
    preprocessors: {
      // pass the entry file to webpack for bundling
      './test/entries.js': ['webpack'],
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
