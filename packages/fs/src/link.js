import lnk from 'lnk'

export default function link (filePath, targetDirPath) {
  return lnk([filePath], targetDirPath)
}
