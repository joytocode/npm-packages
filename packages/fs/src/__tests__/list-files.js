import path from 'path'
import listFiles from '../list-files'
import fs from 'fs'

describe('listFiles', () => {
  const dirTestPath = path.join(__dirname, 'tmp')

  beforeEach((done) => {
    fs.mkdir(dirTestPath, done)
  })

  afterEach(async (done) => {
    const dirPaths = ['dirPath1', 'dirPath2', 'dirPath3']
    const filePaths = ['filePath1', 'filePath2', 'filePath3']
    dirPaths.forEach((dirPath) => {
      filePaths.forEach((filePath) => fs.unlinkSync(path.join(dirTestPath, dirPath, filePath)))
      fs.rmdirSync(path.join(dirTestPath, dirPath))
    })
    fs.rmdir(dirTestPath, done)
  })

  it('should list full paths of all files recursively in dirPath', async () => {
    const dirPaths = ['dirPath1', 'dirPath2', 'dirPath3']
    const filePaths = ['filePath1', 'filePath2', 'filePath3']
    const fullPaths = []
    dirPaths.forEach((dirPath) => {
      fs.mkdirSync(path.join(dirTestPath, dirPath))
      filePaths.forEach((filePath) => {
        fs.writeFileSync(path.join(dirTestPath, dirPath, filePath), 'content')
        fullPaths.push(path.join(dirTestPath, dirPath, filePath))
      })
    })
    await expect(listFiles(dirTestPath)).resolves.toEqual(expect.arrayContaining(fullPaths))
  })
})
