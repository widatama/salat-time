import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { includeIgnoreFile } from '@eslint/compat';
import eslintJS from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import vue from 'eslint-plugin-vue';
import globals from 'globals';
import eslintTS from 'typescript-eslint';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const gitignoreFilePath = path.resolve(__dirname, '.gitignore');

// styling related rules, so code formatter is not needed
const styleConfig = {
  jsx: false, semi: true, arrowParens: true, braceStyle: '1tbs',
};
const eslintStyleJS = stylistic.configs.customize({ ...styleConfig, ts: false });
const eslintStyleTS = stylistic.configs.customize(styleConfig);

const pluginsJS = { ...eslintStyleJS.plugins };
const pluginsTS = {
  '@typescript-eslint': eslintTS.plugin,
  ...eslintStyleJS.plugins,
  ...eslintStyleTS.plugins,
};
const rulesJS = { ...eslintJS.configs.recommended.rules, ...eslintStyleJS.rules };
const rulesTS = {
  ...eslintJS.configs.recommended.rules,
  ...eslintStyleJS.rules,
  ...eslintTS.configs.recommended[1].rules,
  ...eslintTS.configs.recommended[2].rules,
  ...eslintStyleTS.rules,
  '@stylistic/indent': ['error', 2, { ignoreComments: true }],
};

const eslintVue = vue.configs['flat/recommended'];

export default [
  {
    // for config files
    files: ['**/*.config.{ts|cjs}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'commonjs',
      globals: { ...globals.node },
    },
    plugins: pluginsJS,
    rules: rulesJS,
  },
  {
    // for typescript files
    files: ['**/*.ts', '**/*.cts', '**/*.mts'],
    ignores: ['**/*.config.*'],
    languageOptions: {
      ecmaVersion: 'latest',
      parser: eslintTS.parser,
      parserOptions: {
        projectService: true,
      },
      sourceType: 'module',
    },
    plugins: pluginsTS,
    rules: rulesTS,
  },
  // for vue files
  {
    files: ['*.vue', '**/*.vue'],
    languageOptions: eslintVue[1].languageOptions,
    plugins: eslintVue[1].plugins,
    processor: eslintVue[1].processor,
    rules: {
      ...eslintVue[1].rules,
      ...eslintVue[2].rules,
      ...eslintVue[3].rules,
      ...eslintVue[4].rules,
      'vue/multi-word-component-names': 'warn',
    },
  },
  {
    // for typescript inside vue files
    files: ['*.vue', '**/*.vue'],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        extraFileExtensions: ['.vue'],
        parser: eslintTS.parser,
        projectService: true,
      },
    },
    plugins: pluginsTS,
    rules: rulesTS,
  },
  // ignore everything inside .gitignore
  fs.existsSync(gitignoreFilePath) ? includeIgnoreFile(gitignoreFilePath) : {},
];
