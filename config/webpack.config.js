var Webpack =           require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");

var postcssImport =     require("postcss-import");
var postcssNext =       require("postcss-cssnext");
var postcssNested =     require("postcss-nested");

var environment = process.env.NODE_ENV;

var htmlWebpackPluginConfig = {
  title: "Salat Time",
  template: "!!pug!app/templates/index.pug",
  environment: environment
};

if (environment !== "development") {
  htmlWebpackPluginConfig.excludeChunks = ["dev"];
}

module.exports = {
  entry: {
    app: "./app/javascripts/main.js"
  },
  module: {
    loaders: [
      {
        test:   /\.(png|jpg)$/,
        loader: "file-loader?name=assets/images/[name].[ext]"
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader!postcss-loader")
      },
      {
        test:    /\.js$/,
        loader:  "babel",
        exclude: /node_modules/
      },
      {
        test:   /\.vue$/,
        loader: "vue"
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
    postcssNested()
  ],
  plugins: [
    new Webpack.DefinePlugin({
      "process.env": {
        "NODE_ENV": JSON.stringify(environment)
      }
    }),
    new Webpack.ProvidePlugin({
      "fetch": "imports?this=>global!exports?global.fetch!whatwg-fetch"
    }),
    new HtmlWebpackPlugin(htmlWebpackPluginConfig),
    new ExtractTextPlugin("assets/stylesheets/[name].css")
  ]
};
