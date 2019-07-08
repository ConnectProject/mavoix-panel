module.exports = {
  presets: [
    '@quasar/babel-preset-app'
  ],
  plugins: [
    ['module-resolver', {
      'alias': {
        '~': './src'
      }
    }]
  ]
}
