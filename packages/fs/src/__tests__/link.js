import path from 'path'
import link from '../link'
import fs from 'fs'

describe('link', () => {
  const dirTestPath = path.join(__dirname, 'tmp')

  beforeEach((done) => {
    fs.mkdir(dirTestPath, done)
  })

  afterEach(async (done) => {
    fs.unlinkSync(path.join(dirTestPath, 'filePath'))
    fs.unlinkSync(path.join(dirTestPath, 'targetDirPath', 'filePath'))
    fs.rmdirSync(path.join(dirTestPath, 'targetDirPath'))
    fs.rmdir(dirTestPath, done)
  })

  it('should make link of filePath in targetDirPath', async () => {
    const filePath = path.join(dirTestPath, 'filePath')
    const targetPath = path.join(dirTestPath, 'targetDirPath')
    const content = 'content'
    fs.writeFileSync(filePath, content)
    await link(filePath, targetPath)
    expect(fs.readFileSync(path.join(dirTestPath, 'filePath'), 'utf8')).toBe(content)
  })
})
