module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended',
    'vuetify',
    'prettier',
    'prettier/vue'
  ],
  // add your custom rules here
  rules: {
    'no-prototype-builtins': 'warn'
  },
  plugins: [
    'prettier',
    'vuetify'
  ]
}
