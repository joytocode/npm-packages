import run from './run'
import boot from './boot'
import make from './make'

const commands = { run, boot, make }

export default function monorepo (argv) {
  const commandName = argv[0]
  const command = commands[commandName]
  return command ? command(argv) : run([commandName].concat(argv))
}
