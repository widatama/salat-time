// Use the exact same webpack config by requiring it
// but make sure to delete the normal entry
var webpackConf = require("./webpack.config");

delete webpackConf.entry;
webpackConf.node = {
  fs: "empty"
};

module.exports = function (config) {
  config.set({
    plugins: [
      require("karma-chrome-launcher"),
      require("karma-tap"),
      require("karma-tap-pretty-reporter"),
      require("karma-webpack")
    ],
    // PhantomJS has too many missing functions :(
    browsers: ["ChromeCanary"],
    frameworks: ["tap"],
    reporters:  ["tap-pretty"],
    tapReporter: {
      prettifier: "faucet",
      separator: "====="
    },
    files: [  // entry file for all tests.
      "../test/bundle.js"
    ],
    preprocessors: { // pass the entry file to webpack for bundling.
      "../test/bundle.js": ["webpack"]
    },
    client: {
      captureConsole: false
    },
    webpack: webpackConf,
    webpackMiddleware: {
      noInfo: true
    },
    singleRun: true,
    colors: true
  });
};
