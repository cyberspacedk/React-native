module.exports = {
  extends: [
    "airbnb",
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-native/all"
  ],
  parser: 'babel-eslint', 
  parserOptions: {
    ecmaVersion: 8,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      experimentalObjectRestSpread: true,
      modules: true
    }
  },
  env: {
    node: true,
    jest: true,
    browser: true, 
    "react-native/react-native": true
  },
  rules: {
    'comma-dangle': ['error', 'never'],

    'react/jsx-filename-extension': 0,
    "react/display-name": [0, { "ignoreTranspilerName": false }],

    'jsx-a11y/anchor-is-valid': 0,
    'jsx-a11y/label-has-associated-control': 0,
    'jsx-a11y/label-has-for': 0,

    'import/no-extraneous-dependencies': 0,
    'import/prefer-default-export': 0,

    "no-multiple-empty-lines": [2, {"max": 1}],

    "react-native/no-unused-styles": 2,
    "react-native/split-platform-components": 2,
    "react-native/no-inline-styles": 2,
    "react-native/no-color-literals": 2,
    "react-native/no-raw-text": 1,
    "react-native/no-single-element-style-arrays": 2,
  },
  plugins: ['react', "react-native", 'jsx-a11y', 'import'],  
};
