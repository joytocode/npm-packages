import path from 'path'
import readDir from '@joytocode/fs/lib/read-dir'
import ensureDir from '@joytocode/fs/lib/ensure-dir'
import writeJson from '@joytocode/fs/lib/write-json'
import loadPackages from './load-packages'
import rootConfig from './config'

const { configDir } = rootConfig

export default async function syncConfig () {
  const configByName = await loadConfigByName()
  const packages = await loadPackages()
  for (const repoPackage of packages) {
    if (!repoPackage.config.configKeys) {
      continue
    }
    await syncConfigInPackage(repoPackage, configByName)
  }
}

async function syncConfigInPackage (repoPackage, configByName) {
  const names = Object.keys(configByName)
  for (const name of names) {
    const config = configByName[name]
    const packageConfig = {}
    repoPackage.config.configKeys.map((key) => { packageConfig[key] = config[key] })
    await ensureDir(path.join(repoPackage.path, configDir))
    await writeJson(path.join(repoPackage.path, configDir, `${name}.json`), packageConfig)
    console.log(`Copied [${name}] config to package [${repoPackage.name}]`)
  }
}

async function loadConfigByName () {
  const configFiles = await readDir(path.resolve(configDir))
  const configByName = {}
  for (const configFile of configFiles) {
    const name = path.basename(configFile, path.extname(configFile))
    configByName[name] = require(path.resolve(configDir, configFile))
  }
  return configByName
}
