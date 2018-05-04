import path from 'path'
import download from '../download'
import fs from 'fs'

describe('download', () => {
  const dirTestPath = path.join(__dirname, 'download')

  beforeEach((done) => {
    fs.mkdir(dirTestPath, done)
  })

  afterEach(async (done) => {
    fs.unlinkSync(path.join(dirTestPath, 'dstPath', 'filename'))
    fs.rmdirSync(path.join(dirTestPath, 'dstPath'))
    fs.rmdir(dirTestPath, done)
  })

  it('should download url into dstPath', async () => {
    const url = 'https://rawgit.com/joytocode/npm-packages/master/README.md'
    const dstPath = path.join(dirTestPath, 'dstPath')
    const options = { filename: 'filename' }
    await download(url, dstPath, options)
    expect(fs.readFileSync(path.join(dstPath, 'filename'), 'utf8').indexOf('npm-packages')).not.toBe(-1)
  })
})
