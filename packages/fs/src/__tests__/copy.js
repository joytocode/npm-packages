import path from 'path'
import copy from '../copy'
import fs from 'fs'

describe('copy', () => {
  const dirTestPath = path.join(__dirname, 'tmp')

  beforeEach((done) => {
    fs.mkdir(dirTestPath, done)
  })

  afterEach(async (done) => {
    fs.unlinkSync(path.join(dirTestPath, 'srcPath'))
    fs.unlinkSync(path.join(dirTestPath, 'dstPath'))
    fs.rmdir(dirTestPath, done)
  })

  it('should copy srcPath to dstPath', async () => {
    const srcPath = path.join(dirTestPath, 'srcPath')
    const dstPath = path.join(dirTestPath, 'dstPath')
    const content = 'content'
    fs.writeFileSync(srcPath, content)
    await copy(srcPath, dstPath)
    expect(fs.readFileSync(dstPath, 'utf8')).toBe(content)
  })
})
