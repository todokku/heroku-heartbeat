module.exports = {
  parser: 'babel-eslint',
  env: {
    node: true,
    browser: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  plugins: ['react'],
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  rules: {
    'semi': ['warn', 'always'],
    'quotes': ['warn', 'single'],
    'no-unused-vars': 'warn',
    'no-case-declarations': 'off',
    'react/prop-types': 'off',
    'react/no-deprecated': 'warn',
    'react/display-name': 'off',
  },
};
