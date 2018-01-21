import fs from 'fs-extra'

export default function writeFile (filePath, content) {
  return fs.writeFile(filePath, content)
}
