import path from 'path'
import writeFile from '../write-file'
import fs from 'fs'

describe('writeFile', () => {
  const dirTestPath = path.join(__dirname, 'writeFile')

  beforeEach((done) => {
    fs.mkdir(dirTestPath, done)
  })

  afterEach(async (done) => {
    fs.unlinkSync(path.join(dirTestPath, 'filePath'))
    fs.rmdir(dirTestPath, done)
  })

  it('should write content into filePath', async () => {
    const filePath = path.join(dirTestPath, 'filePath')
    const content = 'content'
    await writeFile(filePath, content)
    expect(fs.readFileSync(filePath, 'utf8')).toBe(content)
  })
})
