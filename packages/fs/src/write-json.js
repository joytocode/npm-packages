import jsonStringify from 'json-stringify-pretty-compact'
import writeFile from './write-file'

export default function writeJson (filePath, object) {
  return writeFile(filePath, `${jsonStringify(object)}\n`)
}
