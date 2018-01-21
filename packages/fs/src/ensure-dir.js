import fs from 'fs-extra'

export default function ensureDir (dirPath) {
  return fs.ensureDir(dirPath)
}
