module.exports = function createPackage () {
  return {
    gitignore: ['lib', 'tmp'],
    info: {
      files: ['lib'],
      scripts: {
        clean: 'rimraf lib',
        build: 'babel src -d lib --ignore \'**/__tests__\'',
        prepublishOnly: 'npm run clean && npm run build',
        lint: 'standard --fix',
        test: 'jest',
        posttest: 'npm run lint -s',
        ci: 'jest --coverage',
        postci: 'standard'
      },
      jest: {
        testEnvironment: 'node',
        clearMocks: true,
        collectCoverageFrom: [
          'src/**/*.js'
        ]
      },
      babel: {
        presets: [
          ['@babel/preset-env', {
            targets: {
              node: '6'
            },
            shippedProposals: true
          }]
        ]
      },
      standard: {
        env: {
          jest: true
        }
      }
    }
  }
}
