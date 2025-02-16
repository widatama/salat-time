/* eslint-env node */
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcssImport = require('postcss-import');
const postcssNested = require('postcss-nested');
const tailwindcss = require('@tailwindcss/postcss');

module.exports = {
  plugins: [
    postcssImport({
      path: ['./node_modules', './src'],
    }),
    postcssNested,
    tailwindcss,
    autoprefixer,
    cssnano,
  ],
};
