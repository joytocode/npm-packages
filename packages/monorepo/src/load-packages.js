import path from 'path'
import readDir from '@hackello/fs/lib/read-dir'
import isDirectory from '@hackello/fs/lib/is-directory'
import exists from '@hackello/fs/lib/exists'
import readJson from '@hackello/fs/lib/read-json'
import config from './config'

const { packageContainer } = config

export default async function loadPackages () {
  const packages = []
  const childNames = await readDir(path.resolve(packageContainer))
  for (const childName of childNames) {
    const childPath = path.resolve(packageContainer, childName)
    if (await isDirectory(childPath) && await exists(path.join(childPath, 'package.js'))) {
      const info = await readJson(path.join(childPath, 'package.json'))
      const packageNameParts = info.name.split('/')
      const scope = packageNameParts.slice(0, packageNameParts.length - 1).join('/')
      packages.push({
        scope,
        info,
        name: childName,
        path: childPath,
        config: require(path.join(childPath, 'package.js'))
      })
    }
  }
  return packages
}
