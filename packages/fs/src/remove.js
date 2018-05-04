import fs from 'fs-extra'

export default function remove (path) {
  return fs.remove(path)
}
