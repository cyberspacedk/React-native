После инициализации проекта 

```js
npm install --save-dev 
eslint@^5.15.3 
babel
babel-eslint
eslint-config-airbnb@^17.1.0 
eslint-plugin-react@^7.12.4 
eslint-plugin-react-native
eslint-plugin-import@^2.18.0 
eslint-plugin-jsx-a11y@^6.2.1 
eslint-plugin-react-hooks@^1.7.0 
```


[eslint-plugin-react-native](https://www.npmjs.com/package/eslint-plugin-react-native)

После сетапа инитим eslint `npx eslint --init`

В конфиге 

```js 

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
    "react-native/no-raw-text": 2,
    "react-native/no-single-element-style-arrays": 2,
  },
  plugins: ['react', "react-native", 'jsx-a11y', 'import'],  
};

```

Правила прописываем какие нужны.