import path from 'path'
import readDir from '../read-dir'
import fs from 'fs'

describe('readDir', () => {
  const dirTestPath = path.join(__dirname, 'tmp')

  beforeEach((done) => {
    fs.mkdir(dirTestPath, done)
  })

  afterEach(async (done) => {
    const filePaths = ['filePath1', 'filePath2', 'filePath3']
    filePaths.forEach((filePath) => fs.unlinkSync(path.join(dirTestPath, filePath)))
    fs.rmdir(dirTestPath, done)
  })

  it('should list all files in dirPath', async () => {
    const filePaths = ['filePath1', 'filePath2', 'filePath3']
    filePaths.forEach((filePath) => fs.writeFileSync(path.join(dirTestPath, filePath), 'content'))
    await expect(readDir(dirTestPath)).resolves.toEqual(expect.arrayContaining(filePaths))
  })
})
