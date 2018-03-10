const commonPackage = require('./config/common')()

module.exports = Object.assign({}, commonPackage, {
  deps: [
    '@babel/cli', '@babel/core', '@babel/preset-env', '@babel/preset-stage-2',
    'babel-core', 'babel-jest', 'jest', 'standard'
  ],
  info: Object.assign({}, commonPackage.info, {
    files: commonPackage.info.files.concat(['config'])
  })
})
