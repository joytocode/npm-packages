import path from 'path'
import writeJson from '../write-json'
import fs from 'fs'
import jsonStringify from 'json-stringify-pretty-compact'

describe('writeJson', () => {
  const dirTestPath = path.join(__dirname, 'tmp')

  beforeEach((done) => {
    fs.mkdir(dirTestPath, done)
  })

  afterEach(async (done) => {
    fs.unlinkSync(path.join(dirTestPath, 'filePath'))
    fs.rmdir(dirTestPath, done)
  })

  it('should write json object into filePath', async () => {
    const filePath = path.join(dirTestPath, 'filePath')
    const jsonObject = { content: 'content' }
    await writeJson(filePath, jsonObject)
    expect(fs.readFileSync(filePath, 'utf8')).toBe(`${jsonStringify(jsonObject)}\n`)
  })
})
