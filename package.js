const rootPackage = require('./packages/monorepo/config/root')()

module.exports = Object.assign({}, rootPackage, {
  gitPath: 'tree/master',
  info: {
    repository: 'https://github.com/joytocode/npm-packages',
    author: 'JoyToCode <team@joytocode.com>',
    license: 'MIT'
  }
})
