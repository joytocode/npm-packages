import spawn from 'cross-spawn'

export default function runCommandInBackground (command, args, options) {
  spawn(command, args, { detached: true, stdio: 'ignore', env: process.env, ...options }).unref()
}
