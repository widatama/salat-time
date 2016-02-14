var webpack =           require("webpack");
var postcssImport =     require("postcss-import");
var postcssNext =       require("postcss-cssnext");
var postcssNested =     require("postcss-nested");
var postcssAutoprefix = require("autoprefixer");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: "./app/javascript/main.js",
  module: {
    loaders: [
      {
        test:   /\.vue$/,
        loader: "vue"
      },
      {
        test:    /\.js$/,
        loader:  "babel",
        exclude: /node_modules/
      },
      {
        test:   /\.(png|jpg)$/,
        loader: "file-loader?name=/img/[name].[ext]"
      },
      {
        test:   /\.css$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader!postcss-loader")
      }
    ]
  },
  vue: {
    loaders: {
      js: "babel"
    }
  },
  postcss: [
    postcssImport({
      path: ["node_modules", "./app"]
    }),
    postcssNext(),
    postcssNested(),
    postcssAutoprefix({
      browsers: ["last 2 versions"]
    })
  ],
  plugins: [
    new ExtractTextPlugin("./stylesheet/app.css"),
    new webpack.ProvidePlugin({
      "fetch":   "imports?this=>global!exports?global.fetch!whatwg-fetch"
    })
  ]
};
