import pathExists from 'path-exists'

export default function exists (filePath) {
  return pathExists(filePath)
}
