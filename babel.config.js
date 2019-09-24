module.exports = {
  presets: [[
    '@quasar/babel-preset-app', {
      "targets": {
        "node": "current"
      }
    }
  ]],
  plugins: [
    ['module-resolver', {
      'alias': {
        '~': './src'
      }
    }]
  ]
}
