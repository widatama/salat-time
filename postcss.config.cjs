/* eslint-env node */
const postcssImport = require('postcss-import');
const postcssNested = require('postcss-nested');
const postcssPresetEnv = require('postcss-preset-env');

module.exports = {
  plugins: [
    postcssImport({
      path: ['./node_modules', './src'],
    }),
    postcssPresetEnv({
      features: {
        'nesting-rules': false,
      },
    }),
    postcssNested,
  ],
};
