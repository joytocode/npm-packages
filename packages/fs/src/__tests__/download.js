import path from 'path'
import download from '../download'
import fs from 'fs'

describe('download', () => {
  const dirTestPath = path.join(__dirname, 'tmp')

  beforeEach((done) => {
    fs.mkdir(dirTestPath, done)
  })

  afterEach(async (done) => {
    fs.unlinkSync(path.join(dirTestPath, 'dstPath', 'filename'))
    fs.rmdirSync(path.join(dirTestPath, 'dstPath'))
    fs.rmdir(dirTestPath, done)
  })

  it('should download url into dstPath', async () => {
    const url = 'https://httpbin.org/robots.txt'
    const dstPath = path.join(dirTestPath, 'dstPath')
    const options = { filename: 'filename' }
    const content = 'User-agent: *\nDisallow: /deny\n'
    await download(url, dstPath, options)
    expect(fs.readFileSync(path.join(dstPath, 'filename'), 'utf8')).toBe(content)
  })
})
