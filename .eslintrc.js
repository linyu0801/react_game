module.exports = {
  env: {
    node: true,
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: true,
    tsconfigRootDir: __dirname,
  },
  plugins: ['react', 'react-hooks', '@typescript-eslint'],
  root: true,
  rules: {
    camelcase: 'error',
    'spaced-comment': 'error',
    'react-hooks/rules-of-hooks': 'warn',
    'react-hooks/exhaustive-deps': 'warn',
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off', // 是否需要 import React
    'no-unused-vars': 'warn',
    // '@typescript-eslint/no-use-before-define': [
    // 	'error',
    // 	{ functions: false, classes: true, variables: true, typedefs: true },
    // ],
  },
  types: {
    '{}': false,
  },
  //   settings: {
  //     'import/resolver': {
  //       typescript: {},
  //     },
  //   },

  // extendDefaults: true,
};
