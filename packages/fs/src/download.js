import doDownload from 'download'

export default function download (url, dstPath, options) {
  return doDownload(url, dstPath, options)
}
