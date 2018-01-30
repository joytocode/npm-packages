import crypto from 'crypto'

const hashAlg = 'sha256'
const cipherAlg = 'aes256'

export function encrypt (buffer, passphrase) {
  const cryptoKey = createCryptoKey(passphrase)
  const iv = crypto.randomBytes(16)
  const cipher = crypto.createCipheriv(cipherAlg, cryptoKey, iv)
  return Buffer.concat([iv, cipher.update(buffer), cipher.final()])
}

export function decrypt (buffer, passphrase) {
  const cryptoKey = createCryptoKey(passphrase)
  const offset = [0]
  const iv = buffer.slice(offset[0], 16)
  offset[0] += 16
  const bufferContent = buffer.slice(offset[0])
  const decipher = crypto.createDecipheriv(cipherAlg, cryptoKey, iv)
  return Buffer.concat([decipher.update(bufferContent), decipher.final()])
}

function createCryptoKey (passphrase) {
  return crypto.createHash(hashAlg).update(passphrase || '').digest()
}
