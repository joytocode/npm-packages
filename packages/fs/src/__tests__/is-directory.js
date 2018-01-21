import path from 'path'
import isDirectory from '../is-directory'

describe('isDirectory', () => {
  it('should return true if filePath is a directory', async () => {
    await expect(isDirectory(__dirname)).resolves.toBe(true)
  })
  it('should return true if filePath is not a directory', async () => {
    await expect(isDirectory(path.join(__dirname, 'is-directory.js'))).resolves.toBe(false)
  })
  it('should return true if filePath does not exist', async () => {
    await expect(isDirectory(path.join(__dirname, 'abc'))).resolves.toBe(false)
  })
})
