module.exports = {
  root: true,
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false,
  },
  env: {
    browser: true,
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/recommended',
    'plugin:prettier/recommended',
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    // 'standard'
  ],
  // required to lint *.vue files
  plugins: ['vue'],
  // add your custom rules here
  rules: {
    indent: ['off', 4],
    // allow async-await
    'generator-star-spacing': 'off',
    eqeqeq: ['off'],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'space-before-function-paren': 'off',
    'import/export': 0,
    'vue/no-use-v-if-with-v-for': 0,
    'vue/multi-word-component-names': 0,
  },
}
