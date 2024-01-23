const path = require('path');
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-typescript',
    'prettier',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint', 'import', 'react'],
  rules: {
    'react/jsx-props-no-spreading': 'off',
    '@typescript-eslint/no-var-requires': 0,
  },
  settings: {
    // 'import/resolver': {
    //   webpack: {
    //     config: {
    //       resolve: {
    //         alias: {
    //           '@': path.join(__dirname, 'src'),
    //         },
    //         extensions: ['.js', '.jsx', '.ts', '.tsx'],
    //       },
    //     },
    //   },
    // },
  },
};
