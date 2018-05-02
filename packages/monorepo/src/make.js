import path from 'path'
import ensureDir from '@joytocode/fs/lib/ensure-dir'
import writeJson from '@joytocode/fs/lib/write-json'
import decompress from '@joytocode/fs/lib/decompress'
import copy from '@joytocode/fs/lib/copy'
import isDirectory from '@joytocode/fs/lib/is-directory'
import remove from '@joytocode/fs/lib/remove'
import runCommand from '@joytocode/process/lib/run-command'
import boot from './boot'
import run from './run'
import loadPackages from './load-packages'

export default async function make (argv) {
  try {
    const packageFilters = argv.slice(1)
    if (!packageFilters.length) {
      return
    }
    await run(['run', 'clean'])
    await run(['run', 'build'])
    await boot()
    const packages = await loadPackages()
    const localPackageByName = {}
    for (const repoPackage of packages) {
      localPackageByName[repoPackage.info.name] = repoPackage
    }
    for (const repoPackage of packages) {
      const updatedDependencies = { ...repoPackage.info.dependencies }
      Object.keys(updatedDependencies).forEach((dep) => {
        const localPackage = localPackageByName[dep]
        if (!localPackage) {
          return
        }
        updatedDependencies[dep] = `file:../${localPackage.name}`
      })
      await writeJson(path.join(repoPackage.path, 'package.json'), {
        ...repoPackage.info,
        dependencies: updatedDependencies
      })
    }
    for (const repoPackage of packages) {
      const matchedFilters = packageFilters.filter((packageFilter) => repoPackage.name.indexOf(packageFilter) !== -1)
      if (matchedFilters.length) {
        await makePackage(repoPackage)
      }
    }
  } finally {
    await boot()
  }
}

async function makePackage (repoPackage) {
  console.log(`Making package ${repoPackage.name}...`)
  const distPath = path.join(repoPackage.path, 'dist')
  await ensureDir(distPath)
  await runCommand('npm', ['install', '--production', '--no-package-lock'], { cwd: repoPackage.path })
  await runCommand('zip', ['node_modules.zip', '-r', 'node_modules'], { cwd: repoPackage.path })
  await decompress(path.join(repoPackage.path, 'node_modules.zip'), distPath)
  const files = repoPackage.config.info.files.concat(['package.json', 'LICENSE'])
  for (const file of files) {
    const filePath = path.join(repoPackage.path, file)
    if (await isDirectory(filePath)) {
      await ensureDir(path.join(distPath, file))
    }
    await copy(filePath, path.join(distPath, file))
  }
  await remove(path.join(repoPackage.path, 'node_modules'))
  await remove(path.join(repoPackage.path, 'node_modules.zip'))
}
