import path from 'path'
import ensureDir from '@hackello/fs/lib/ensure-dir'
import exists from '@hackello/fs/lib/exists'
import link from '@hackello/fs/lib/link'
import readJson from '@hackello/fs/lib/read-json'
import writeJson from '@hackello/fs/lib/write-json'
import writeFile from '@hackello/fs/lib/write-file'
import copy from '@hackello/fs/lib/copy'
import download from '@hackello/fs/lib/download'
import config from './config'
import loadPackages from './load-packages'
import findDepedencies from './find-dependencies'

const { packageContainer, gitPath, info: { repository, author, license }, gitignoreio } = config

export default async function boot () {
  const packages = await loadPackages()
  const allDepVersions = await getAllDepVersions(packages)
  await download(`https://www.gitignore.io/api/${gitignoreio.join(',')}`, path.resolve(), { filename: '.gitignore' })
  const rootInfo = await readJson(path.resolve('package.json'))
  await writeJson(path.resolve('package.json'), {
    ...rootInfo,
    repository,
    author,
    license
  })
  for (const repoPackage of packages) {
    await linkPackage(repoPackage)
    const dependencies = await getDepedencies(repoPackage, allDepVersions)
    await updateFiles(repoPackage, dependencies)
  }
}

async function getAllDepVersions (packages) {
  const rootInfo = await readJson(path.resolve('package.json'))
  const allDepVersions = { ...rootInfo.dependencies }
  for (const repoPackage of packages) {
    allDepVersions[repoPackage.info.name] = `^${repoPackage.info.version}`
  }
  return allDepVersions
}

async function linkPackage (repoPackage) {
  const targetDirPath = path.resolve(packageContainer, 'node_modules', repoPackage.scope)
  if (repoPackage.info.private || (await exists(path.join(targetDirPath, repoPackage.name)))) {
    return Promise.resolve()
  }
  await ensureDir(targetDirPath)
  return link(repoPackage.path, targetDirPath)
}

async function getDepedencies (repoPackage, allDepVersions) {
  const deps = await findDepedencies(repoPackage.path)
  deps.sort()
  return deps
    .reduce((depVersions, dep) => {
      const version = allDepVersions[dep]
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
