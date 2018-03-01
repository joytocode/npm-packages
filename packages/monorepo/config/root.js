module.exports = function createPackage () {
  return {
    rootPackage: true,
    gitignoreio: ['node', 'linux', 'macos', 'windows', 'visualstudiocode', 'eclipse', 'intellij'],
    packageContainer: 'packages'
  }
}
