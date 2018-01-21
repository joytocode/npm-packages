const commonPackage = require('./config/common')()

module.exports = Object.assign({}, commonPackage, {
  npminclude: commonPackage.npminclude.concat(['config'])
})
