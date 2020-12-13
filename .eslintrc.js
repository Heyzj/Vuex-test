module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'space-before-function-paren': 0,
    'no-multiple-empty-lines': 0,
    'semi': 0,
    'comma-dangle': 0,
    'no-undef': 0,
    'padded-blocks': 0,
    'object-curly-spacing':0
  }
}
