module.exports = {
  root: true,
  extends: '@react-native-community',
  rules: {
    'prettier/prettier': 0,
    'react-native/no-inline-styles': 0,
    'indent': ['error', 2, {
      'SwitchCase': 1,
    }],
    'no-unreachable': 0,
    '@typescript-eslint/no-unused-vars': 0,
    'curly': 0,
  },
};
