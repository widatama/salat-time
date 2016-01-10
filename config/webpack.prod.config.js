var webpack = require("webpack");
var baseConfig = require("./webpack.base.config");

baseConfig.output = {
  path:       "./public/asset",
  publicPath: "/public/asset",
  filename:   "./javascript/app.js"
};

baseConfig.plugins = (baseConfig.plugins || []).concat([
  new webpack.DefinePlugin({
    "process.env": {
      NODE_ENV: "'production'"
    }
  }),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  }),
  new webpack.optimize.OccurenceOrderPlugin()
]);

module.exports = baseConfig;
