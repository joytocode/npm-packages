import * as bufferEncryptor from '..'

describe('bufferEncryptor', () => {
  it('should encrypt and decrypt to the same buffer with same passphrase', () => {
    const passphrase = 'passphrase'
    const originalContent = Buffer.from('hello world')
    const encryptedContent = bufferEncryptor.encrypt(originalContent, passphrase)
    const decryptedContent = bufferEncryptor.decrypt(encryptedContent, passphrase)
    expect(decryptedContent).toEqual(originalContent)
  })
  it('should throw if decrypting with a different passphrase', () => {
    const encryptPassphrase = 'encryptPassphrase'
    const decryptPassphrase = 'decryptPassphrase'
    const originalContent = Buffer.from('hello world')
    const encryptedContent = bufferEncryptor.encrypt(originalContent, encryptPassphrase)
    expect(() => bufferEncryptor.decrypt(encryptedContent, decryptPassphrase)).toThrow()
  })
})
