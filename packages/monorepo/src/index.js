import run from './run'
import boot from './boot'

const commands = { run, boot }

export default function monorepo (argv) {
  const commandName = argv[0]
  const command = commands[commandName]
  return command ? command(argv) : run([commandName].concat(argv))
}
