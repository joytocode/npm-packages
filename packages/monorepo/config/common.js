module.exports = function createPackage () {
  return {
    gitignore: ['lib', 'dist', '*.zip'],
    info: {
      files: ['lib'],
      scripts: {
        clean: 'rimraf lib dist coverage node_modules *.zip *.tgz',
        build: 'babel src -d lib --ignore \'**/__tests__\'',
        lint: 'standard --fix',
        test: 'jest --passWithNoTests',
        posttest: 'npm run lint -s',
        ci: 'jest --passWithNoTests --coverage',
        preci: 'standard'
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
              node: '8'
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
