import runCommand from '@hackello/process/lib/run-command'
import loadPackages from './load-packages'

export default async function run (argv) {
  const scriptNameParts = argv[1].split('/')
  const packageFilter = scriptNameParts.length > 1 ? scriptNameParts[0] : null
  const scriptName = scriptNameParts[scriptNameParts.length > 1 ? 1 : 0]
  const packages = await loadPackages()
  for (const repoPackage of packages) {
    if (packageFilter && repoPackage.name.indexOf(packageFilter) === -1) {
      continue
    }
    const exitCode = await runInPackage(repoPackage, scriptName, argv)
    if (exitCode) {
      return exitCode
    }
  }
  return 0
}

async function runInPackage (repoPackage, scriptName, argv) {
  if (repoPackage.info.scripts && repoPackage.info.scripts[scriptName]) {
    const command = 'npm'
    const args = ['run', scriptName].concat(argv.slice(2))
    return runCommand(command, args, { cwd: repoPackage.path })
  }
}
