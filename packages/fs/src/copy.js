import fs from 'fs-extra'

export default function copy (srcPath, dstPath) {
  return fs.copy(srcPath, dstPath)
}
