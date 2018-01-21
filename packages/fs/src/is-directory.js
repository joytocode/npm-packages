const fs = require('fs-extra')

export default async function isDirectory (filePath) {
  try {
    return (await fs.stat(filePath)).isDirectory()
  } catch (e) {
    return false
  }
}
