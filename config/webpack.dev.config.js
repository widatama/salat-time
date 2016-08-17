var config = require("./webpack.config");

config.entry.dev = "./app/javascripts/dev.js";

config.output = {
  path:       "./",
  publicPath: "/",
  filename:   "assets/javascripts/[name].js"
};

config.devtool = "eval-source-map";

config.devServer = {
  noInfo:      false,
  hot:         true,
  contentBase: "public/"
};

module.exports = config;
