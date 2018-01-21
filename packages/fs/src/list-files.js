import recursive from 'recursive-readdir'

export default function listFiles (dirPath, ignoreList) {
  return recursive(dirPath, ignoreList)
}
