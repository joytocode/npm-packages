import path from 'path'
import logError from '@joytocode/log/lib/log-error'
import runCommand from '@joytocode/process/lib/run-command'
import debounce from 'lodash.debounce'
import chokidar from 'chokidar'
import minimatch from 'minimatch'

const babelBinPath = require.resolve('@babel/cli/bin/babel')

export default function watchSrc ({ name = 'src', basePath, paths, events = ['change', 'add'],
  filePattern, modulePattern, handler }) {
  const clearRequireCache = debounce(() => {
    Object.keys(require.cache)
      .forEach((moduleKey) => {
        if (modulePattern && !matchPattern(moduleKey, modulePattern)) {
          return
        }
        delete require.cache[moduleKey]
      })
    if (handler) {
      handler()
    }
    console.log(`${name} reloaded`)
  }, 100)
  paths.forEach(({ base, src, out }) => {
    const srcPath = path.join(base, src)
    const watcher = chokidar.watch(srcPath)
    watcher.on('ready', () => {
      watcher.on('all', async (event, filePath) => {
        try {
          if (events.indexOf(event) === -1) {
            return
          }
          if (filePattern && !matchPattern(filePath, filePattern)) {
            return
          }
          if (out) {
            const outputPath = path.join(base, out, path.relative(srcPath, filePath))
            await runCommand(babelBinPath, [filePath, '-o', outputPath], { cwd: base })
            console.log(`${path.relative(basePath, filePath)} -> ${path.relative(basePath, outputPath)}`)
          }
          clearRequireCache()
        } catch (err) {
          logError(err)
        }
      })
    })
  })
}

function matchPattern (path, pattern) {
  if (Array.isArray(pattern)) {
    return pattern.every((subPattern) => matchPattern(path, subPattern))
  }
  return minimatch(path, pattern)
}
