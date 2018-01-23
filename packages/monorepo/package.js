const commonPackage = require('./config/common')()

module.exports = Object.assign({}, commonPackage, {
  info: Object.assign({}, commonPackage.info, {
    files: commonPackage.info.files.concat(['config'])
  })
})
