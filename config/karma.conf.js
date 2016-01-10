// we can just use the exact same webpack config by requiring it
// but make sure to delete the normal entry
var webpackConf = require("./webpack.base.config");
delete webpackConf.entry;
webpackConf.node = {
  fs: "empty"
};

module.exports = function (config) {
  config.set({
    plugins: [
      require("karma-phantomjs-launcher"),
      require("karma-tap"),
      require("karma-tape-reporter"),
      require("karma-webpack")
    ],
    browsers: ["PhantomJS"],
    frameworks: ["tap"],
    reporters: ["tape"],
    // this is the entry file for all our tests.
    files: ["../test/unit/components/*.js"],
    // we will pass the entry file to webpack for bundling.
    preprocessors: {
      "../test/**/*.js": ["webpack"]
    },
    webpack: webpackConf,
    webpackMiddleware: {
      noInfo: true
    },
    singleRun: true,
    colors: true
  });
};
