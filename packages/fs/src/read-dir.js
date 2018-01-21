import fs from 'fs-extra'

export default function readDir (dirPath) {
  return fs.readdir(dirPath)
}
