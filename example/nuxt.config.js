const { resolve } = require('path')

module.exports = {
  rootDir: resolve(__dirname, '..'),
  buildDir: resolve(__dirname, '.nuxt'),
  srcDir: __dirname,
  modules: [{ handler: require('../') }],
  analytics: {
    disabled: false,
    baidu: 'asdsadasdasd12312313123sadqdwadsad',
    google: 'UA-123123123444-1',
    isDebug: false
  }
}
