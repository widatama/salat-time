var baseConfig = require("./webpack.base.config");

baseConfig.output = {
  path:       "./asset",
  publicPath: "/asset",
  filename:   "./javascript/app.js"
};

baseConfig.devtool = "eval-source-map";

baseConfig.devServer = {
  noInfo: true
};

module.exports = baseConfig;
