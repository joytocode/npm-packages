import path from 'path'
import readFile from '../read-file'
import fs from 'fs'

describe('readFile', () => {
  const dirTestPath = path.join(__dirname, 'tmp')

  beforeEach((done) => {
    fs.mkdir(dirTestPath, done)
  })

  afterEach(async (done) => {
    fs.unlinkSync(path.join(dirTestPath, 'filePath'))
    fs.rmdir(dirTestPath, done)
  })

  it('should read content from filePath', async () => {
    const filePath = path.join(dirTestPath, 'filePath')
    const content = 'content'
    fs.writeFileSync(filePath, content)
    await expect(readFile(filePath)).resolves.toBe(content)
  })
})
