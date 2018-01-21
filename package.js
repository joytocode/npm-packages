const rootPackage = require('./packages/monorepo/config/root')()

module.exports = Object.assign(rootPackage, {
  author: 'Hackello <team@hackello.com>',
  license: 'MIT'
})
