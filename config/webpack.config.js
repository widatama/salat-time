const path = require('path');

const Webpack = require('webpack');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackExcludeAssetsPlugin = require('html-webpack-exclude-assets-plugin');
const WebappWebpackPlugin = require('webapp-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const postcssImport = require('postcss-import');
const postcssNext = require('postcss-cssnext');
const postcssNested = require('postcss-nested');

const environment = process.env.NODE_ENV;
const appConfig = require('./app.config');

const htmlWebpackPluginConfig = {
  title: appConfig.title,
  template: `${appConfig.paths.src.templatePath}/index.pug`,
  environment,
};

if (environment !== 'development') {
  htmlWebpackPluginConfig.excludeChunks = ['dev'];
  htmlWebpackPluginConfig.excludeAssets = [/dev/];
}

const WebappWebpackPluginConfig = {
  logo: `./${appConfig.paths.asset.imagesPath}/favicon.png`,
  cache: 'tmp/.wwp-cache',
  favicons: {
    appName: appConfig.title,
    appDescription: 'Daily salat schedule',
    background: '#fff',
    theme_color: '#fff',
    dir: 'auto',
    lang: 'en-US',
    display: 'standalone',
    orientation: 'portrait',
    icons: {
      android: true,
      appleIcon: true,
      appleStartup: true,
      coast: false,
      favicons: true,
      firefox: true,
      opengraph: false,
      twitter: false,
      yandex: false,
      windows: false,
    },
  },
};

module.exports = {
  context: path.resolve('', `./${appConfig.paths.src.path}`),
  entry: {
    app: './javascripts/main.js',
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          environment === 'production' ? MiniCSSExtractPlugin.loader : 'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins() {
                return [
                  postcssImport({
                    path: ['node_modules', './src'],
                  }),
                  postcssNext,
                  postcssNested,
                ];
              },
            },
          },
        ],
      },
      {
        test: /\.pug$/,
        oneOf: [
          // this applies to `<template lang="pug">` in Vue components
          {
            resourceQuery: /^\?vue/,
            use: ['pug-plain-loader'],
          },
          // this applies to pug imports inside JavaScript
          {
            use: ['pug-loader'],
          },
        ],
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: file => (/node_modules/.test(file) && !/\.vue\.js/.test(file)),
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
    ],
  },
  target: 'web',
  plugins: [
    new Webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(environment),
      },
    }),
    new MiniCSSExtractPlugin({ filename: `${appConfig.paths.dist.stylesheetsPath}/${appConfig.bundleNames.css}` }),
    new HtmlWebpackPlugin(htmlWebpackPluginConfig),
    new HtmlWebpackExcludeAssetsPlugin(),
    new WebappWebpackPlugin(WebappWebpackPluginConfig),
    new VueLoaderPlugin(),
  ],
};
