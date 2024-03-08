import path from 'path'

// @ts-check
const { defineConfig } = require('eslint-define-config')

/// <reference types="@eslint-types/typescript-eslint" />

module.exports = defineConfig({
  root: true,
  extends: [
    'eslint:recommended',
    // 'plugin:n/recommended',
    // 'plugin:vue/recommended',
    // 'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  env: {
    es6: true,
    node: true,
    browser: true,
  },
  plugins: ['@typescript-eslint'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2022,
  },

  rules: {
    eqeqeq: ['warn', 'always', { null: 'never' }],
    'no-debugger': ['error'],
    'no-empty': ['warn', { allowEmptyCatch: true }],
    'no-process-exit': 'off',
    'no-useless-escape': 'off',
    'prefer-const': [
      'warn',
      {
        destructuring: 'all',
      },
    ],
    '@typescript-eslint/ban-ts-comment': 'error',
    '@typescript-eslint/ban-types': 'off', // TODO: we should turn this on in a new PR
    '@typescript-eslint/explicit-module-boundary-types': [
      'error',
      { allowArgumentsExplicitlyTypedAsAny: true },
    ],
    '@typescript-eslint/no-empty-function': ['error', { allow: ['arrowFunctions'] }],
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-explicit-any': 'off', // maybe we should turn this on in a new PR
    'no-extra-semi': 'off',
    '@typescript-eslint/no-extra-semi': 'off', // conflicts with prettier
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/no-unused-vars': 'off', // maybe we should turn this on in a new PR
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/consistent-type-imports': [
      'error',
      { prefer: 'type-imports', disallowTypeAnnotations: false },
    ],
    // disable rules set in @typescript-eslint/stylistic v6 that wasn't set in @typescript-eslint/recommended v5 and which conflict with current code
    // maybe we should turn them on in a new PR
    '@typescript-eslint/array-type': 'off',
    '@typescript-eslint/ban-tslint-comment': 'off',
    '@typescript-eslint/consistent-generic-constructors': 'off',
    '@typescript-eslint/consistent-indexed-object-style': 'off',
    '@typescript-eslint/consistent-type-definitions': 'off',
    '@typescript-eslint/prefer-for-of': 'off',
    '@typescript-eslint/prefer-function-type': 'off',

    'sort-imports': [
      'error',
      {
        ignoreCase: false,
        ignoreDeclarationSort: true,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
        allowSeparatedGroups: false,
      },
    ],
  },
  overrides: [
    // 兼容一下 vue2 + js
    {
      files: ['*.vue'],
      parser: 'vue-eslint-parser',
      parserOptions: {
        parser: '@babel/eslint-parser',
        babelOptions: {
          configFile: path.resolve(__dirname, './babel.config.js'),
        },
        extends: ['plugin:vue/recommended'],
      },
    },
  ],
})
