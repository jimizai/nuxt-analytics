module.exports = {
  dev: true,
  rootDir: __dirname,
  buildModules: [{ handler: require('../../../') }],
  analytics: {
    disabled: true,
    baidu: '123123',
    google: 'UA-XXX'
  }
}
