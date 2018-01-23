import Jimp from 'jimp'
import readFile from '@hackello/fs/lib/read-file'
import writeFile from '@hackello/fs/lib/write-file'

const metaLength = 4

export async function encode (binPath, pngPath) {
  const binBuffer = await readFile(binPath, null)
  const dataLength = Math.ceil((binBuffer.length + metaLength) / 4) * 4
  const dataBuffer = Buffer.alloc(dataLength)
  const offset = [0]
  offset[0] = dataBuffer.writeInt32BE(binBuffer.length, offset[0])
  binBuffer.copy(dataBuffer, offset[0])
  const width = Math.round(Math.sqrt(dataLength / 4))
  const height = Math.ceil(dataLength / 4 / width)
  const image = new Jimp(width, height)
  image.scan(0, 0, width, height, (x, y, bitmapIndex) => {
    const dataIndex = (y * width + x) * 4
    image.bitmap.data[bitmapIndex] = dataBuffer[dataIndex]
    image.bitmap.data[bitmapIndex + 1] = dataBuffer[dataIndex + 1]
    image.bitmap.data[bitmapIndex + 2] = dataBuffer[dataIndex + 2]
    image.bitmap.data[bitmapIndex + 3] = dataBuffer[dataIndex + 3]
  })
  return new Promise((resolve, reject) => {
    image.write(pngPath, (err) => {
      if (err) {
        reject(err)
        return
      }
      resolve()
    })
  })
}

export async function decode (pngPath, binPath) {
  const image = await Jimp.read(pngPath)
  const width = image.bitmap.width
  const height = image.bitmap.height
  const dataBuffer = Buffer.alloc(width * height * 4)
  image.scan(0, 0, width, height, (x, y, bitmapIndex) => {
    const dataIndex = (y * width + x) * 4
    dataBuffer[dataIndex] = image.bitmap.data[bitmapIndex]
    dataBuffer[dataIndex + 1] = image.bitmap.data[bitmapIndex + 1]
    dataBuffer[dataIndex + 2] = image.bitmap.data[bitmapIndex + 2]
    dataBuffer[dataIndex + 3] = image.bitmap.data[bitmapIndex + 3]
  })
  const offset = [0]
  const binLength = dataBuffer.readInt32BE(offset[0])
  offset[0] += 4
  const binBuffer = dataBuffer.slice(offset[0], offset[0] + binLength)
  await writeFile(binPath, binBuffer)
}
