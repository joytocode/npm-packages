module.exports = function createPackage () {
  return {
    gitignore: ['lib'],
    info: {
      files: ['lib'],
      scripts: {
        clean: 'rimraf lib',
        build: 'babel src -d lib --ignore \'**/__tests__\'',
        lint: 'standard --fix',
        test: 'jest --passWithNoTests',
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
