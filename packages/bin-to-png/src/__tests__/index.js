import path from 'path'
import fs from 'fs'
import readFile from '@hackello/fs/lib/read-file'
import * as binToPng from '..'

describe('binToPng', () => {
  it('should encode and decode to the same file', async () => {
    await binToPng.encode(path.join(__dirname, '../../LICENSE'), path.join(__dirname, 'out.png'))
    await binToPng.decode(path.join(__dirname, 'out.png'), path.join(__dirname, 'LICENSE'))
    const originalContent = await readFile(path.join(__dirname, '../../LICENSE'))
    const decodedContent = await readFile(path.join(__dirname, 'LICENSE'))
    expect(decodedContent).toBe(originalContent)
    fs.unlinkSync(path.join(__dirname, 'out.png'))
    fs.unlinkSync(path.join(__dirname, 'LICENSE'))
  })
  it('should encode and decode to the same file with correct passphrase', async () => {
    const passphrase = 'passphrase'
    await binToPng.encode(path.join(__dirname, '../../LICENSE'), path.join(__dirname, 'out.png'), passphrase)
    await binToPng.decode(path.join(__dirname, 'out.png'), path.join(__dirname, 'LICENSE'), passphrase)
    const originalContent = await readFile(path.join(__dirname, '../../LICENSE'))
    const decodedContent = await readFile(path.join(__dirname, 'LICENSE'))
    expect(decodedContent).toBe(originalContent)
    fs.unlinkSync(path.join(__dirname, 'out.png'))
    fs.unlinkSync(path.join(__dirname, 'LICENSE'))
  })
  it('should not encode and decode to the same file with different passphrases', async () => {
    const encodePassphrase = 'encodePassphrase'
    const decodePassphrase = 'decodePassphrase'
    await binToPng.encode(path.join(__dirname, '../../LICENSE'), path.join(__dirname, 'out.png'), encodePassphrase)
    await binToPng.decode(path.join(__dirname, 'out.png'), path.join(__dirname, 'LICENSE'), decodePassphrase)
    const originalContent = await readFile(path.join(__dirname, '../../LICENSE'))
    const decodedContent = await readFile(path.join(__dirname, 'LICENSE'))
    expect(decodedContent).not.toBe(originalContent)
    fs.unlinkSync(path.join(__dirname, 'out.png'))
    fs.unlinkSync(path.join(__dirname, 'LICENSE'))
  })
})
