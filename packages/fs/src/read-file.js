import fs from 'fs-extra'

export default function readFile (filePath, options = 'utf8') {
  return fs.readFile(filePath, options)
}
