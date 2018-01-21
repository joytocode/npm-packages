import VError from 'verror'

export default function logError (err) {
  const info = VError.info(err)
  if (Object.keys(info).length) {
    console.error('Error Info', info)
  }
  console.error(VError.fullStack(err))
}
