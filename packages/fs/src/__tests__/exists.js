import path from 'path'
import exists from '../exists'

describe('exists', () => {
  it('should return true if filePath exists', async () => {
    await expect(exists(__dirname)).resolves.toBe(true)
  })
  it('should return true if filePath does not exist', async () => {
    await expect(exists(path.join(__dirname, 'abc'))).resolves.toBe(false)
  })
})
