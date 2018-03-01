import path from 'path'
import ensureDir from '@hackello/fs/lib/ensure-dir'
import writeFile from '@hackello/fs/lib/write-file'
import logError from '@hackello/log/lib/log-error'
import isArray from 'lodash.isarray'
import debounce from 'lodash.debounce'
import chokidar from 'chokidar'
import minimatch from 'minimatch'
import { transformFileSync } from '@babel/core'
import commondir from 'commondir'

export default function watchSrc ({ name = 'src', srcPath, outPath, events = ['change', 'add'],
  filePattern, modulePattern }) {
  const clearRequireCache = debounce(() => {
    Object.keys(require.cache)
      .forEach((moduleKey) => {
        if (modulePattern && !matchPattern(moduleKey, modulePattern)) {
          return
        }
        delete require.cache[moduleKey]
      })
    console.log(`${name} reloaded`)
  }, 100)
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
        if (outPath) {
          const outputPath = path.join(outPath, path.relative(srcPath, filePath))
          const { code: outputCode } = transformFileSync(filePath)
          await ensureDir(path.dirname(outputPath))
          await writeFile(outputPath, outputCode)
          const commonPath = commondir([srcPath, outPath])
          console.log(`${path.relative(commonPath, filePath)} -> ${path.relative(commonPath, outputPath)}`)
        }
        clearRequireCache()
      } catch (err) {
        logError(err)
      }
    })
  })
}

function matchPattern (path, pattern) {
  if (isArray(pattern)) {
    return pattern.every((subPattern) => matchPattern(path, subPattern))
  }
  return minimatch(path, pattern)
}
