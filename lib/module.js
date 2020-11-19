const { resolve } = require('path')

module.exports = function (moduleOptions) {
  const options = {
    ...this.options.analytics,
    ...moduleOptions
  }

  this.addPlugin({
    src: resolve(__dirname, 'plugin.js'),
    fileName: 'analytics.js',
    options
  })
}

module.exports.meta = require('../package.json')
