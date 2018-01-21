import spawn from 'cross-spawn'

export default function runCommand (command, args, options) {
  return new Promise((resolve, reject) => {
    spawn(command, args, { stdio: ['pipe', process.stdout, process.stderr], env: process.env, ...options })
      .on('close', resolve)
      .on('error', reject)
  })
}
