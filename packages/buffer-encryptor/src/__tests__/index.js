import * as bufferEncryptor from '..'

describe('bufferEncryptor', () => {
  it('should encrypt and decrypt to the same buffer with correct passphrase', async () => {
    const passphrase = 'passphrase'
    const originalContent = Buffer.from('hello world')
    const encryptedContent = await bufferEncryptor.encrypt(originalContent, passphrase)
    const decryptedContent = await bufferEncryptor.decrypt(encryptedContent, passphrase)
    expect(decryptedContent).toEqual(originalContent)
  })
  it('should encrypt and decrypt to the same buffer with different passphrases', async () => {
    const encryptPassphrase = 'encryptPassphrase'
    const decryptPassphrase = 'decryptPassphrase'
    const originalContent = Buffer.from('hello world')
    const encryptedContent = await bufferEncryptor.encrypt(originalContent, encryptPassphrase)
    const decryptedContent = await bufferEncryptor.decrypt(encryptedContent, decryptPassphrase)
    expect(decryptedContent).not.toEqual(originalContent)
  })
})
