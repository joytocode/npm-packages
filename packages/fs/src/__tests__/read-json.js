import path from 'path'
import readJson from '../read-json'
import fs from 'fs'

describe('readJson', () => {
  const dirTestPath = path.join(__dirname, 'readJson')

  beforeEach((done) => {
    fs.mkdir(dirTestPath, done)
  })

  afterEach(async (done) => {
    fs.unlinkSync(path.join(dirTestPath, 'filePath'))
    fs.rmdir(dirTestPath, done)
  })

  it('should return json object from filePath', async () => {
    const filePath = path.join(dirTestPath, 'filePath')
    const jsonObject = { content: 'content' }
    fs.writeFileSync(filePath, JSON.stringify(jsonObject))
    await expect(readJson(filePath)).resolves.toEqual(jsonObject)
  })
})
