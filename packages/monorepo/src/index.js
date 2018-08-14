import run from './run'
import boot from './boot'
import make from './make'
import syncConfig from './sync-config'

const commands = { run, boot, make, syncConfig }

export default function monorepo (argv) {
  const commandName = argv[0]
  const command = commands[commandName]
  return command ? command(argv) : run([commandName].concat(argv))
}
