import fs from 'fs-extra'

export default function readJson (filePath) {
  return fs.readJson(filePath)
}
