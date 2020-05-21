module.exports = {
  parser: 'babel-eslint',
  env: {
    node: true,
    es6: true,
    jest: true,
  },
  plugins: ['jest'],
  extends: ['eslint:recommended', 'plugin:jest/recommended'],
  rules: {
    'semi': ['warn', 'always'],
    'quotes': ['warn', 'single'],
    'no-unused-vars': 'warn',
    'no-case-declarations': 'off'
  }
};
