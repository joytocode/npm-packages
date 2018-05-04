import path from 'path'
import ensureDir from '../ensure-dir'
import fs from 'fs'

describe('ensureDir', () => {
  const dirTestPath = path.join(__dirname, 'ensureDir')

  beforeEach((done) => {
    fs.mkdir(dirTestPath, done)
  })

  afterEach(async (done) => {
    fs.rmdirSync(path.join(dirTestPath, 'fs', 'ensureDir'))
    fs.rmdirSync(path.join(dirTestPath, 'fs'))
    fs.rmdir(dirTestPath, done)
  })

  it('should return true if dirPath is valid', async () => {
    const dirPath = path.join(dirTestPath, 'fs', 'ensureDir')
    await ensureDir(dirPath)
    expect(fs.existsSync(dirPath)).toBe(true)
  })
})
