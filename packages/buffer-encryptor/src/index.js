import crypto from 'crypto'

export async function encrypt (buffer, passphrase, algorithm = 'aes256') {
  const cryptoKey = crypto.createHash('sha256').update(passphrase).digest()
  const iv = crypto.randomBytes(16)
  const cipher = crypto.createCipheriv(algorithm, cryptoKey, iv)
  return Buffer.concat([iv, cipher.update(buffer), cipher.final()])
}

export async function decrypt (buffer, passphrase, algorithm = 'aes256') {
  const cryptoKey = crypto.createHash('sha256').update(passphrase).digest()
  const offset = [0]
  const iv = buffer.slice(offset[0], 16)
  offset[0] += 16
  const bufferContent = buffer.slice(16)
  const decipher = crypto.createDecipheriv(algorithm, cryptoKey, iv)
  try {
    return Buffer.concat([decipher.update(bufferContent), decipher.final()])
  } catch (error) {
    return null
  }
}
