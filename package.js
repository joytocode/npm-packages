const rootPackage = require('./packages/monorepo/config/root')()

module.exports = Object.assign({}, rootPackage, {
  gitPath: 'tree/master',
  info: {
    repository: 'https://github.com/hackello/npm-packages',
    author: 'Hackello <team@hackello.com>',
    license: 'MIT'
  }
})
