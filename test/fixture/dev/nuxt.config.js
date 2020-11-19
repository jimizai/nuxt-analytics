module.exports = {
  dev: true,
  rootDir: __dirname,
  buildModules: [{ handler: require('../../../') }],
  analytics: {
    baidu: '123123',
    google: 'UA-XXX'
  }
}
