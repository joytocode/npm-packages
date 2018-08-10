import path from 'path'
import ensureDir from '@joytocode/fs/lib/ensure-dir'
import exists from '@joytocode/fs/lib/exists'
import link from '@joytocode/fs/lib/link'
import readJson from '@joytocode/fs/lib/read-json'
import readFile from '@joytocode/fs/lib/read-file'
import writeJson from '@joytocode/fs/lib/write-json'
import writeFile from '@joytocode/fs/lib/write-file'
import copy from '@joytocode/fs/lib/copy'
import download from '@joytocode/fs/lib/download'
import config from './config'
import loadPackages from './load-packages'
import findDepedencies from './find-dependencies'

const { packageContainer, gitPath, info: { repository, author, license }, gitignoreio } = config

export default async function boot () {
  const packages = await loadPackages()
  const rootDepVersions = await getRootDepVersions(packages)
  await download(`https://www.gitignore.io/api/${gitignoreio.join(',')}`, path.resolve(), { filename: '.gitignore' })
  if (config.gitignore) {
    await writeFile(path.resolve('.gitignore'), `${await readFile(path.resolve('.gitignore'))}\n${config.gitignore.join('\n')}\n`)
  }
  const rootInfo = await readJson(path.resolve('package.json'))
  await writeJson(path.resolve('package.json'), {
    ...rootInfo,
    repository,
    author,
    license
  })
  for (const repoPackage of packages) {
    await linkPackage(repoPackage)
    const dependencies = await getDepedencies(repoPackage, rootDepVersions)
    await updateFiles(repoPackage, dependencies)
  }
}

async function getRootDepVersions (packages) {
  const rootInfo = await readJson(path.resolve('package.json'))
  const rootDepVersions = { ...rootInfo.dependencies }
  for (const repoPackage of packages) {
    rootDepVersions[repoPackage.info.name] = `^${repoPackage.info.version}`
  }
  return rootDepVersions
}

async function linkPackage (repoPackage) {
  const targetDirPath = path.resolve(packageContainer, 'node_modules', repoPackage.scope)
  if (await exists(path.join(targetDirPath, repoPackage.name))) {
    return Promise.resolve()
  }
  await ensureDir(targetDirPath)
  return link(repoPackage.path, targetDirPath)
}

async function getDepedencies (repoPackage, rootDepVersions) {
  const deps = await findDepedencies(repoPackage.path, repoPackage.config.depIgnores)
  if (repoPackage.config.deps) {
    for (const dep of repoPackage.config.deps) {
      if (deps.indexOf(dep) === -1) {
        deps.push(dep)
      }
    }
  }
  deps.sort()
  return deps
    .reduce((depVersions, dep) => {
      const version = rootDepVersions[dep]
      if (version) {
        depVersions[dep] = version
      }
      return depVersions
    }, {})
}

async function updateFiles (repoPackage, dependencies) {
  const { gitignore, info } = repoPackage.config
  const repoUrl = `${repository}/${gitPath}/${packageContainer}/${repoPackage.name}`
  const repoInfo = {
    ...repoPackage.info,
    repository: repoUrl,
    author,
    license,
    dependencies,
    ...info
  }
  await writeJson(path.join(repoPackage.path, 'package.json'), repoInfo)
  await writeFile(path.join(repoPackage.path, '.gitignore'), gitignore.concat(['']).join('\n'))
  if (await exists(path.resolve('LICENSE'))) {
    await copy(path.resolve('LICENSE'), path.join(repoPackage.path, 'LICENSE'))
  }
}
